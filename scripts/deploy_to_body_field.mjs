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
  console.log('🚀 Bezpośrednie wstrzykiwanie w pole #text2 na stronie myintegrations...');
  const jsPath = path.resolve(__dirname, '../shoper-theme/custom-js/plyndo-storefront.js');
  const jsCode = fs.readFileSync(jsPath, 'utf8');
  const scriptTag = `<script>\n${jsCode}\n</script>`;

  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'networkidle' });

  if (await page.locator('input[name="login"]').isVisible()) {
    console.log('Logowanie...');
    await page.locator('input[name="login"]').fill(user);
    await page.locator('input[name="password"]').fill(pass);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(4000);
  }

  console.log('Oczekiwanie na pole 2FA (#code)...');
  await page.waitForSelector('#code, input[name="code"]', { timeout: 30000 });
  const codeInput = page.locator('#code, input[name="code"]');

  console.log('📧 Wysłałem nowy kod 2FA na Twój e-mail!');
  console.log('Oczekiwanie na kod 2FA w scratch_code.txt (max 120 sek)...');

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
    console.error('❌ Czas na podanie kodu minął.');
    await context.close();
    process.exit(1);
  }

  console.log(`🔑 Wprowadzam kod 2FA (${code})...`);
  await codeInput.fill(code);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }).catch(() => {}),
    page.locator('button[type="submit"]').first().click()
  ]);

  console.log('🎉 ZALOGOWANO! Przechodzę do https://sklep562393.shoparena.pl/admin/myintegrations...');
  await page.goto('https://sklep562393.shoparena.pl/admin/myintegrations', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const res = await page.evaluate((code) => {
    const text2 = document.querySelector('#text2') || document.querySelector('textarea[name="body"]') || document.querySelectorAll('textarea')[1];
    if (text2) {
      text2.value = code;
      text2.dispatchEvent(new Event('input', { bubbles: true }));
      text2.dispatchEvent(new Event('change', { bubbles: true }));
      return { success: true, id: text2.id || text2.name };
    }
    return { success: false };
  }, scriptTag);

  if (res.success) {
    console.log(`✔ Wypełniono pole #${res.id} w DOM! Klikam przycisk Zapisz...`);
    const saveBtn = page.locator('button[type="submit"], input[type="submit"]').first();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }).catch(() => {}),
      saveBtn.click()
    ]);
    console.log('🎉 SKRYPT ZOSTAŁ POPRAWNIE ZAPISANY W POLE BODY ZESTAWU WŁASNYCH INTEGRACJI!');
    await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/myintegrations-saved.png'), fullPage: true });
  } else {
    console.error('❌ Nie odnaleziono pola w DOM.');
  }

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
