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
  console.log(`✅ Zapisano ${key} w .env.local!`);
}

async function run() {
  console.log('🚀 Rozpoczynanie kompletnej automatyzacji Fazy 1...');
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
    console.log('📧 Oczekiwanie na kod 2FA w scratch_code.txt (max 120s)...');
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

  console.log(`Zalogowano! Aktualny URL: ${page.url()}`);

  // STEP 1: Generate & Save Shoper CLI Token
  console.log('--- KROK 1: Generowanie tokena Shoper CLI ---');
  await page.goto('https://sklep562393.shoparena.pl/admin/admin/edit/id/4', { waitUntil: 'networkidle' });
  const genBtn = page.locator('button:has-text("Wygeneruj token"), a:has-text("Wygeneruj token")').first();
  if (await genBtn.isVisible()) {
    console.log('   Klikam "Wygeneruj token"...');
    await genBtn.click();
    await page.waitForTimeout(3000);
  }

  const tokenVal = await page.evaluate(() => {
    const el = document.querySelector('input[readonly], textarea[readonly], .token-value, code');
    if (el) return el.value || el.innerText;
    return null;
  });

  if (tokenVal && tokenVal.length > 20) {
    console.log(`   Pobrano token CLI: ${tokenVal}`);
    updateEnvLocal('SHOPER_CLI_TOKEN', tokenVal);
  } else {
    const bodyText = await page.locator('body').innerText();
    const tokenMatch = bodyText.match(/[a-f0-9]{32,64}|eyJ[a-zA-Z0-9_\-.]+/);
    if (tokenMatch) {
      console.log(`   Dopasowano token CLI z treści: ${tokenMatch[0]}`);
      updateEnvLocal('SHOPER_CLI_TOKEN', tokenMatch[0]);
    } else {
      console.log('   Nie udało się automatycznie zczytać ciągu tokena. Sprawdź zrzut ekranu.');
      await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/cli-token-failed.png') });
    }
  }

  // STEP 2: Create 3 Coupons
  console.log('--- KROK 2: Tworzenie 3 kuponów rabatowych ---');
  const coupons = [
    { code: 'PLYNDO-PACK-4', discount: 20, minSum: 0 },
    { code: 'PLYNDO-PACK-8', discount: 30, minSum: 150 },
    { code: 'PLYNDO-PACK-12', discount: 40, minSum: 230 }
  ];

  for (const c of coupons) {
    console.log(`   ➕ Tworzenie kuponu: ${c.code} (${c.discount}%, min. ${c.minSum} zł)...`);
    await page.goto('https://sklep562393.shoparena.pl/admin/promoCodes/add', { waitUntil: 'networkidle' });

    await page.locator('#code, input[name="code"]').fill(c.code);
    await page.locator('#discount_type_1').check({ force: true });
    await page.locator('#discount_percent').fill(String(c.discount));

    if (c.minSum > 0) {
      await page.locator('#value_limit').check({ force: true });
      await page.locator('#min_amount').fill(String(c.minSum));
    }

    const saveBtn = page.locator('button[type="submit"]').first();
    await saveBtn.click();
    await page.waitForTimeout(2500);

    console.log(`   ✔ Zapisano kupon ${c.code}! URL: ${page.url()}`);
    await page.screenshot({ path: path.resolve(__dirname, `../docs/screenshots/coupon-${c.code}-OK.png`) });
  }

  console.log('🎉 FAZA 1 ZAKOŃCZONA SUKCESEM!');
  await context.close();
}

run().catch(err => {
  console.error('❌ Błąd podczas wykonywania Fazy 1:', err);
  process.exit(1);
});
