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
  console.log('🚀 Poszukiwanie działającego URL integracji w panelu Shoper...');
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
    await page.waitForTimeout(3000);
  }

  const codeInput = page.locator('#code, input[name="code"]');
  if (await codeInput.isVisible()) {
    let code = fs.existsSync(codeFile) ? fs.readFileSync(codeFile, 'utf8').trim() : '';
    console.log(`🔑 Wprowadzam kod 2FA (${code})...`);
    await codeInput.fill(code);
    await page.locator('button:has-text("Weryfikuj"), button[type="submit"]').first().click();
    await page.waitForTimeout(5000);
  }

  console.log('Zalogowano! URL:', page.url());

  // 1. Visit /admin/config (Ustawienia) and collect all links
  await page.goto('https://sklep562393.shoparena.pl/admin/config', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/config-page.png'), fullPage: true });

  const configLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href]')).map(a => ({
      text: a.innerText.trim().replace(/\s+/g, ' '),
      href: a.href
    })).filter(a => a.href.includes('/admin/'));
  });

  console.log('Linki na stronie Ustawienia (/admin/config):\n', JSON.stringify(configLinks, null, 2));

  // 2. Visit /admin/skins/list and collect links
  await page.goto('https://sklep562393.shoparena.pl/admin/skins/list', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/skins-page.png'), fullPage: true });

  const skinsLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href]')).map(a => ({
      text: a.innerText.trim().replace(/\s+/g, ' '),
      href: a.href
    })).filter(a => a.href.includes('/admin/'));
  });

  console.log('Linki na stronie Wygląd (/admin/skins/list):\n', JSON.stringify(skinsLinks, null, 2));

  await context.close();
}

run().catch(err => {
  console.error('Błąd:', err);
  process.exit(1);
});
