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

async function run() {
  console.log('🚀 Automatyczne wstrzykiwanie plyndo-storefront.js do site_body...');
  const jsPath = path.resolve(__dirname, '../shoper-theme/custom-js/plyndo-storefront.js');
  const jsCode = fs.readFileSync(jsPath, 'utf8');
  const scriptTag = `<script>\n${jsCode}\n</script>`;

  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin/webmaster', { waitUntil: 'networkidle' });

  if (await page.locator('input[name="login"]').isVisible()) {
    console.log('Logowanie do panelu...');
    await page.locator('input[name="login"]').fill(user);
    await page.locator('input[name="password"]').fill(pass);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
      page.locator('button[type="submit"]').click()
    ]);
  }

  const codeInput = page.locator('#code, input[name="code"]');
  if (await codeInput.isVisible()) {
    let code = fs.existsSync(codeFile) ? fs.readFileSync(codeFile, 'utf8').trim() : '';
    console.log(`🔑 Wprowadzam kod 2FA (${code})...`);
    await codeInput.fill(code);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
      page.locator('button:has-text("Weryfikuj"), button[type="submit"]').first().click()
    ]);
  }

  console.log('Nawigacja do webmaster:', page.url());
  await page.goto('https://sklep562393.shoparena.pl/admin/webmaster', { waitUntil: 'networkidle' });
  console.log('Strona webmaster URL:', page.url());

  const siteBodyField = page.locator('#site_body, textarea[name="site_body"]');
  if (await siteBodyField.count() > 0) {
    console.log('Wypełniam pole site_body...');
    await siteBodyField.first().fill(scriptTag);

    const saveBtn = page.locator('button[type="submit"], input[type="submit"]').first();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
      saveBtn.click()
    ]);
    console.log('🎉 Pomyślnie zapisano skrypt w site_body!');
    await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/webmaster-saved.png'), fullPage: true });
  } else {
    console.error('❌ Nie znaleziono pola #site_body!');
    await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/webmaster-error.png'), fullPage: true });
  }

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
