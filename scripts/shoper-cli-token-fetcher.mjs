import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

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
  console.log('🚀 Pobieranie tokenu Shoper CLI z panelu administracyjnego...');
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
    await codeInput.fill(code);
    await page.locator('button:has-text("Weryfikuj"), button[type="submit"]').first().click();
    await page.waitForTimeout(5000);
  }

  console.log('Strona po zalogowaniu:', page.url());

  // Search for CLI tokens in panel API or pages
  const possibleUrls = [
    'https://sklep562393.shoparena.pl/admin/skins/custom',
    'https://sklep562393.shoparena.pl/admin/skins/cli',
    'https://sklep562393.shoparena.pl/admin/developer/cli',
    'https://sklep562393.shoparena.pl/admin/webapi'
  ];

  let cliToken = null;

  for (const url of possibleUrls) {
    console.log(`Nawigacja do: ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
    const content = await page.content();

    // Check if token string (base64 jwt) is visible in input or pre
    const foundToken = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, textarea, code, pre'));
      for (const i of inputs) {
        const val = i.value || i.innerText || '';
        if (val.length > 50 && (val.startsWith('eyJ') || val.includes('.'))) {
          return val.trim();
        }
      }
      return null;
    });

    if (foundToken) {
      cliToken = foundToken;
      console.log('🎉 ZNALEZIONO TOKEN SHOPER CLI!');
      break;
    }
  }

  if (!cliToken) {
    console.log('Przukiwanie kodu źródłowego stron dla tokenów CLI...');
    // Look in window JS variables or LocalStorage
    cliToken = await page.evaluate(() => {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        const v = localStorage.getItem(k);
        if (v && v.length > 50 && (v.startsWith('eyJ') || v.includes('.'))) return v;
      }
      return null;
    });
  }

  console.log('Wynik wyszukiwania tokena CLI:', cliToken ? 'ZNALEZIONO' : 'NIE ZNALEZIONO PRZEZ SCRIPT');

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
