import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.substring(0, eqIdx).trim();
        const val = trimmed.substring(eqIdx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}

loadEnv();

const user = process.env.SHOPER_WEB_ADMIN_USER || process.env.SHOPER_API_USER;
const pass = process.env.SHOPER_WEB_ADMIN_PASSWORD || process.env.SHOPER_API_PASSWORD;
const codeFile = path.resolve(__dirname, '../scratch_code.txt');

if (fs.existsSync(codeFile)) fs.unlinkSync(codeFile);

async function run() {
  console.log('🚀 Uruchamianie sesji logowania Shoper...');
  const jsPath = path.resolve(__dirname, '../shoper-theme/custom-js/plyndo-storefront.js');
  const jsCode = fs.readFileSync(jsPath, 'utf8');
  const scriptTag = `<script>\n${jsCode}\n</script>`;

  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  console.log('1. Otwieranie strony logowania...');
  await page.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'networkidle' });

  if (await page.locator('input[name="login"]').isVisible()) {
    console.log('2. Wprowadzanie danych konta (mk)...');
    await page.locator('input[name="login"]').fill(user);
    await page.locator('input[name="password"]').fill(pass);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(3000);
  }

  const codeInput = page.locator('#code, input[name="code"]');
  if (await codeInput.isVisible()) {
    console.log('📧 E-mail z kodem 2FA został właśnie wysłany na Twój e-mail!');
    console.log('Oczekiwanie na zapisanie kodu w scratch_code.txt (max 120 sek)...');

    let code = null;
    const start = Date.now();
    while (Date.now() - start < 120000) {
      if (fs.existsSync(codeFile)) {
        code = fs.readFileSync(codeFile, 'utf8').trim();
        if (code.length >= 4) break;
      }
      await new Promise(r => setTimeout(r, 1000));
    }

    if (!code) {
      console.error('❌ Nie podano kodu w wyznaczonym czasie.');
      await context.close();
      process.exit(1);
    }

    console.log(`🔑 Otrzymano kod 2FA (${code}). Wprowadzam w aktywnej sesji...`);
    await codeInput.fill(code);
    const submitBtn = page.locator('button[type="submit"]').first();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
      submitBtn.click()
    ]);
  }

  console.log('URL po weryfikacji 2FA:', page.url());

  if (page.url().includes('auth')) {
    console.error('❌ Błąd autoryzacji 2FA.');
    await context.close();
    process.exit(1);
  }

  console.log('Nawigacja do /admin/webmaster...');
  await page.goto('https://sklep562393.shoparena.pl/admin/webmaster', { waitUntil: 'networkidle' });

  const siteBodyField = page.locator('#site_body, textarea[name="site_body"]');
  if (await siteBodyField.count() > 0) {
    console.log('Wklejanie skryptu do pola site_body...');
    await siteBodyField.first().fill(scriptTag);

    const saveBtn = page.locator('button[type="submit"]').first();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
      saveBtn.click()
    ]);
    console.log('🎉 POMYŚLNIE ZAPISANO SKRYPT W SITE_BODY NA SKLEPIE!');
  } else {
    console.error('❌ Nie znaleziono pola #site_body!');
  }

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
