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
  console.log('🚀 Wdrażanie plyndo-storefront.js w Shoper Admin (Standard/Non-Premium)...');
  const jsPath = path.resolve(__dirname, '../shoper-theme/custom-js/plyndo-storefront.js');
  const jsCode = fs.readFileSync(jsPath, 'utf8');

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

  console.log('URL po zalogowaniu:', page.url());

  // Search menu for "Wygląd i treści" or "Własny JavaScript"
  await page.goto('https://sklep562393.shoparena.pl/admin/skins/list', { waitUntil: 'networkidle' });
  console.log('Skins list URL:', page.url());
  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/skins-list.png'), fullPage: true });

  // Let's inspect all links under Wygląd i treści
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => ({ text: a.innerText.trim(), href: a.href }));
  });
  console.log('Found links in admin:', links.filter(l => l.href.includes('skin') || l.href.includes('config') || l.href.includes('script')));

  // Try navigating to active skin edit or custom JS settings
  const skinEditUrls = [
    'https://sklep562393.shoparena.pl/admin/skins/edit/id/12',
    'https://sklep562393.shoparena.pl/admin/configSkins/edit/id/12',
    'https://sklep562393.shoparena.pl/admin/configSkins/skin-edit/id/12',
    'https://sklep562393.shoparena.pl/admin/skins/custom-js',
    'https://sklep562393.shoparena.pl/admin/configSkins/custom-js'
  ];

  let targetUrl = null;
  for (const url of skinEditUrls) {
    console.log('Testing URL:', url);
    await page.goto(url, { waitUntil: 'networkidle' });
    console.log('Result URL:', page.url());
    const textareas = await page.locator('textarea').count();
    console.log('Textareas found count:', textareas);
    if (textareas > 0) {
      targetUrl = page.url();
      break;
    }
  }

  if (targetUrl) {
    console.log('Found custom JS target page:', targetUrl);
    await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/custom-js-page.png'), fullPage: true });
    
    // Inject code into textarea
    await page.evaluate((code) => {
      const ta = document.querySelector('textarea');
      if (ta) {
        ta.value = code;
        ta.dispatchEvent(new Event('input', { bubbles: true }));
        ta.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, jsCode);

    const saveBtn = page.locator('button[type="submit"], input[type="submit"]').first();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
      saveBtn.click()
    ]);
    console.log('✔ Zapisano własny JavaScript!');
  } else {
    console.error('❌ Nie znaleziono pola textarea na edycję custom JS.');
  }

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
