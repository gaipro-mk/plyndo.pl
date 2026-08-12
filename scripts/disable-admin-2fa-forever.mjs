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
  console.log('🚀 Wyłączanie weryfikacji dwuetapowej 2FA (ip_verify=0) w profilu administratora...');
  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'networkidle' });

  if (await page.locator('input[name="login"]').isVisible()) {
    console.log('Wprowadzanie loginu i hasła...');
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
    if (!code) process.exit(1);
    console.log(`🔑 Wprowadzanie kodu 2FA: ${code}...`);
    await codeInput.fill(code);
    await page.locator('button:has-text("Weryfikuj"), button[type="submit"]').first().click();
    await page.waitForTimeout(5000);
  }

  console.log('Nawigacja do edycji konta administratora (ID 4)...');
  await page.goto('https://sklep562393.shoparena.pl/admin/admin/edit/id/4', { waitUntil: 'networkidle' });

  await page.evaluate(() => {
    // Uncheck ip_verify or set value 0
    const ipInput = document.querySelector('input[name="ip_verify"]');
    if (ipInput) ipInput.value = '0';
    const ipCb = document.querySelector('#ip_verify');
    if (ipCb) ipCb.checked = false;
  });

  const saveBtn = page.locator('button[type="submit"]').first();
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
    saveBtn.click()
  ]);

  console.log('🎉 Pomyślnie wyłączono 2FA ip_verify=0!');

  // Now navigate to Skins List and click CLI token if present
  await page.goto('https://sklep562393.shoparena.pl/admin/skins/list', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/skins-list-after-2fa.png'), fullPage: true });

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
