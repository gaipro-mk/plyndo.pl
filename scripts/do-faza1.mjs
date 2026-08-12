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

async function verifyCouponAPI(code) {
  const cookieJar = {};
  function getHeaders() {
    const cookies = Object.entries(cookieJar).map(([k,v])=>`${k}=${v}`).join('; ');
    return { 'Content-Type': 'application/json', ...(cookies ? { Cookie: cookies } : {}) };
  }
  function saveCookies(res) {
    const setCookie = res.headers.getSetCookie ? res.headers.getSetCookie() : [res.headers.get('set-cookie')].filter(Boolean);
    for (const sc of setCookie) {
      const parts = sc.split(';')[0].split('=');
      if (parts.length >= 2) cookieJar[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
  }

  let res = await fetch('https://sklep.plyndo.pl/api/basket', { headers: getHeaders() });
  saveCookies(res);
  const data1 = await res.json();
  const bid = data1.basket?.id || data1.basket?.basket_id;

  for (const s of [182, 186, 189, 190]) {
    res = await fetch(`https://sklep.plyndo.pl/api/basket/${bid}/item/${s}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ quantity: 1 })
    });
    saveCookies(res);
  }

  res = await fetch(`https://sklep.plyndo.pl/api/basket/${bid}/promo-code`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ promoCode: code })
  });
  saveCookies(res);
  const data3 = await res.json();
  return {
    hasPromoCode: data3.basket?.hasPromoCode,
    discount: data3.basket?.discounts?.sum?.grossValueFormatted,
    sum: data3.basket?.sum?.grossValueFormatted,
    flashMessages: data3.flashMessages
  };
}

async function run() {
  console.log('🚀 Rozpoczynanie konfiguracji kuponów w Shoper Admin...');
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

  console.log(`URL po zaimplementowaniu auth: ${page.url()}`);

  const coupons = [
    { name: 'Rabat PŁYN DO 4x', code: 'PLYNDO-PACK-4', discount: 20, minSum: 0 },
    { name: 'Rabat PŁYN DO 8x', code: 'PLYNDO-PACK-8', discount: 30, minSum: 150 },
    { name: 'Rabat PŁYN DO 12x', code: 'PLYNDO-PACK-12', discount: 40, minSum: 230 }
  ];

  for (const c of coupons) {
    console.log(`➕ Tworzenie kuponu: ${c.code}...`);
    await page.goto('https://sklep562393.shoparena.pl/admin/promoCodes/add', { waitUntil: 'networkidle' });

    // Name / Title
    if (await page.locator('#name, input[name="name"]').isVisible()) {
      await page.locator('#name, input[name="name"]').fill(c.name);
    }

    // Code
    await page.locator('#code, input[name="code"]').fill(c.code);

    // Active
    const activeCb = page.locator('#active, input[name="active"]').first();
    if (await activeCb.isVisible()) {
      await activeCb.check({ force: true });
    }

    // Discount percentage
    await page.locator('#discount_type_1').check({ force: true });
    await page.locator('#discount_percent').fill(String(c.discount));

    // Min sum
    if (c.minSum > 0) {
      await page.locator('#value_limit').check({ force: true });
      await page.locator('#min_amount').fill(String(c.minSum));
    }

    // Submit
    const saveBtn = page.locator('button[type="submit"], input[type="submit"], #save, .btn_primary').first();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
      saveBtn.click()
    ]);

    console.log(`   Zapisano kupon ${c.code}! URL po zapisie: ${page.url()}`);
  }

  console.log('--- WERYFIKACJA API KUPONU PLYNDO-PACK-4 ---');
  const testResult = await verifyCouponAPI('PLYNDO-PACK-4');
  console.log('Wynik API:', JSON.stringify(testResult, null, 2));

  await context.close();
}

run().catch(err => {
  console.error('Błąd:', err);
  process.exit(1);
});
