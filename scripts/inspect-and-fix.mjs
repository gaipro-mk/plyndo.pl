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
  console.log('🚀 Inspekcja kuponów oraz 2FA...');
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

  console.log('--- Wyłączanie 2FA (weryfikacji dwuetapowej) ---');
  await page.goto('https://sklep562393.shoparena.pl/admin/admin/edit/id/4', { waitUntil: 'networkidle' });
  const ipVerifySelect = page.locator('#ip_verify, select[name="ip_verify"], input[name="ip_verify"]');
  if (await ipVerifySelect.isVisible()) {
    console.log('Znaleziono pole weryfikacji dwuetapowej. Zmieniam na wyłączoną...');
    // If select dropdown
    const tagName = await ipVerifySelect.evaluate(el => el.tagName);
    if (tagName === 'SELECT') {
      await ipVerifySelect.selectOption({ value: '0' });
    } else {
      // Check options or radio
      const opt0 = page.locator('option[value="0"], input[value="0"]').first();
      if (await opt0.isVisible()) await opt0.click();
    }
    const saveAdminBtn = page.locator('button[type="submit"]').first();
    await saveAdminBtn.click();
    await page.waitForTimeout(2000);
    console.log('Wyłączono 2FA dla konta admina!');
  }

  console.log('--- Sprawdzanie utworzonych kuponów ---');
  await page.goto('https://sklep562393.shoparena.pl/admin/promoCodes', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/promo-codes-list.png') });

  const promoLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href')
    })).filter(l => l.href && l.href.includes('promoCodes/edit'));
  });

  console.log('Kupony do edycji:', JSON.stringify(promoLinks, null, 2));

  for (const link of promoLinks) {
    console.log(`Edycja kuponu: ${link.text} (${link.href})...`);
    await page.goto(`https://sklep562393.shoparena.pl${link.href}`, { waitUntil: 'networkidle' });
    
    // Ensure active checkbox is checked
    const activeCb = page.locator('#active, input[name="active"]').first();
    if (await activeCb.isVisible() && !(await activeCb.isChecked())) {
      console.log('   Aktywuję kupon (zaznaczam active)...');
      await activeCb.check({ force: true });
    }

    // Save coupon
    const saveBtn = page.locator('button[type="submit"]').first();
    await saveBtn.click();
    await page.waitForTimeout(2000);
  }

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
