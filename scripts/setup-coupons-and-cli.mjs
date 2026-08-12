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

function updateEnvLocal(key, value) {
  const envPath = path.resolve(__dirname, '../.env.local');
  let content = fs.readFileSync(envPath, 'utf8');
  if (content.includes(`${key}=`)) {
    content = content.replace(new RegExp(`${key}=.*`), `${key}=${value}`);
  } else {
    content += `\n${key}=${value}\n`;
  }
  fs.writeFileSync(envPath, content, 'utf8');
  console.log(`✅ Zapisano ${key}=${value.slice(0, 10)}... w .env.local!`);
}

async function run() {
  console.log('🚀 Rozpoczynanie konfiguracji kuponów i tokena CLI...');
  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'networkidle' });

  if (await page.locator('input[name="login"]').isVisible()) {
    console.log(`Wprowadzanie danych logowania dla konta: ${user}...`);
    await page.locator('input[name="login"]').fill(user);
    await page.locator('input[name="password"]').fill(pass);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(3000);
  }

  const codeInput = page.locator('#code, input[name="code"]');
  if (await codeInput.isVisible()) {
    console.log('📧 Oczekiwanie na scratch_code.txt...');
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
      console.error('❌ Brak kodu 2FA.');
      await context.close();
      process.exit(1);
    }
    console.log(`🔑 Wprowadzanie kodu 2FA: ${code}...`);
    await codeInput.fill(code);
    await page.locator('button:has-text("Weryfikuj"), button[type="submit"]').first().click();
    await page.waitForTimeout(5000);
  }

  console.log('--- Step 1: Skin Edit & Shoper CLI Token ---');
  await page.goto('https://sklep562393.shoparena.pl/admin/configSkins/skin-edit/id/12', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/skin-12-edit.png') });

  // Check tabs on skin edit page
  const tabs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a, button, li')).map(el => ({
      text: el.innerText.trim(),
      href: el.getAttribute('href'),
      class: el.getAttribute('class')
    })).filter(t => t.text.toLowerCase().includes('cli') || t.text.toLowerCase().includes('shoper') || t.text.toLowerCase().includes('token'));
  });
  console.log('CLI tabs found:', JSON.stringify(tabs, null, 2));

  // Look for Shoper CLI tab or button
  const cliTab = page.locator('text="Shoper CLI"').first();
  if (await cliTab.isVisible()) {
    await cliTab.click();
    await page.waitForTimeout(1000);
  }

  // Look for token input or generate button
  const genBtn = page.locator('button:has-text("Generuj"), a:has-text("Generuj"), button:has-text("token")').first();
  if (await genBtn.isVisible()) {
    console.log('Klikanie przycisku generowania tokena CLI...');
    await genBtn.click();
    await page.waitForTimeout(2000);
  }

  const tokenInput = page.locator('input[readonly], textarea[readonly], input[value*="ey"], #cli_token, input[name*="token"]').first();
  if (await tokenInput.isVisible()) {
    const tokenVal = await tokenInput.inputValue();
    console.log(`Token CLI odczytany: ${tokenVal}`);
    if (tokenVal) updateEnvLocal('SHOPER_CLI_TOKEN', tokenVal);
  } else {
    console.log('Token input nieznaleziony na stronie edycji szablonu. Szukam w treści...');
    const bodyText = await page.locator('body').innerText();
    const tokenMatch = bodyText.match(/[a-zA-Z0-9_\-]{30,}/);
    if (tokenMatch) {
      console.log(`Dopasowano token z treści: ${tokenMatch[0]}`);
    }
  }

  console.log('--- Step 2: Creating Coupons ---');
  const couponsToCreate = [
    { code: 'PLYNDO-PACK-4', discount: 20, minSum: 0 },
    { code: 'PLYNDO-PACK-8', discount: 30, minSum: 150 },
    { code: 'PLYNDO-PACK-12', discount: 40, minSum: 230 }
  ];

  await page.goto('https://sklep562393.shoparena.pl/admin/coupons', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/coupons-list.png') });

  // Dump buttons / links on /admin/coupons
  const couponActions = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a, button')).map(el => ({
      text: el.innerText.trim(),
      href: el.getAttribute('href'),
      onclick: el.getAttribute('onclick'),
      class: el.getAttribute('class')
    })).filter(x => x.text || x.href);
  });
  console.log('Coupon page actions:', JSON.stringify(couponActions.slice(0, 20), null, 2));

  await context.close();
}

run().catch(err => {
  console.error('Błąd:', err);
  process.exit(1);
});
