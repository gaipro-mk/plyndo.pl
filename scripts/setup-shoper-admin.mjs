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
const otpCode = process.argv[2];

if (!otpCode) {
  console.error('Błąd: Podaj kod 2FA jako argument scriptu!');
  process.exit(1);
}

const sessionDir = path.resolve(__dirname, '.browser_session');

async function run() {
  console.log('🚀 Logowanie do Shoper Admin z kodem 2FA...');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'networkidle' });

  // If login form is shown first
  if (await page.locator('input[name="login"]').isVisible()) {
    console.log('Wprowadzam login i hasło...');
    await page.locator('input[name="login"]').fill(user);
    await page.locator('input[name="password"]').fill(pass);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(2000);
  }

  // Check 2FA input
  const codeInput = page.locator('#code, input[name="code"]');
  if (await codeInput.isVisible()) {
    console.log(`Wprowadzam kod 2FA: ${otpCode}...`);
    await codeInput.fill(otpCode);
    await page.locator('button[type="submit"]').click();
    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }).catch(() => {});
  }

  console.log(`URL po zaimplementowaniu 2FA: ${page.url()}`);
  if (page.url().includes('/auth') || page.url().includes('/login')) {
    console.error('❌ Nie udało się zalogować. Logi/błędny kod OTP.');
    await context.close();
    process.exit(1);
  }

  console.log('🎉 Pomyślnie zalogowano do Panelu Shoper Admin!');
  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/shoper-dashboard.png') });

  await context.close();
}

run().catch(err => {
  console.error('Błąd:', err);
  process.exit(1);
});
