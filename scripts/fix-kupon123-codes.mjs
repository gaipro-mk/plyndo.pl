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
  console.log('🚀 Aktualizacja Kuponów ID 1, 2, 3 na kody PLYNDO-PACK-4, 8, 12...');
  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'networkidle' });

  if (await page.locator('input[name="login"]').isVisible()) {
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

  const coupons = [
    { id: 1, name: 'Rabat PŁYN DO 4x', code: 'PLYNDO-PACK-4', discount: 20, minAmount: 0 },
    { id: 2, name: 'Rabat PŁYN DO 8x', code: 'PLYNDO-PACK-8', discount: 30, minAmount: 150 },
    { id: 3, name: 'Rabat PŁYN DO 12x', code: 'PLYNDO-PACK-12', discount: 40, minAmount: 230 }
  ];

  for (const c of coupons) {
    console.log(`✏️ Konfiguracja kuponu ID ${c.id} (kod: ${c.code})...`);
    await page.goto(`https://sklep562393.shoparena.pl/admin/promoCodes/edit/id/${c.id}`, { waitUntil: 'networkidle' });

    await page.locator('#name, input[name="name"]').fill(c.name);
    await page.locator('#code, input[name="code"]').fill(c.code);

    await page.evaluate(({ discount, minAmount }) => {
      const dt1 = document.querySelector('#discount_type_1');
      if (dt1) {
        dt1.checked = true;
        dt1.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const dp = document.querySelector('#discount_percent');
      if (dp) dp.value = String(discount);

      const active = document.querySelector('#active');
      if (active) active.checked = true;

      const glob1 = document.querySelector('#global_1');
      if (glob1) glob1.checked = true;

      const ass0 = document.querySelector('#assortment_0');
      if (ass0) ass0.checked = true;

      const timeLimit = document.querySelector('#time_limit');
      if (timeLimit) timeLimit.checked = false;

      const userLimit = document.querySelector('#peruser_limit_set');
      if (userLimit) userLimit.checked = false;

      const usageLimit = document.querySelector('#usage_limit_set');
      if (usageLimit) usageLimit.checked = false;

      if (minAmount > 0) {
        const valLimit = document.querySelector('#value_limit');
        if (valLimit) valLimit.checked = true;
        const minAmt = document.querySelector('#min_amount');
        if (minAmt) minAmt.value = String(minAmount);
      } else {
        const valLimit = document.querySelector('#value_limit');
        if (valLimit) valLimit.checked = false;
      }
    }, { discount: c.discount, minAmount: c.minAmount });

    const saveBtn = page.locator('button[type="submit"]').first();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
      saveBtn.click()
    ]);
    console.log(`   ✔ Zapisano kupon ID ${c.id}!`);
  }

  console.log('--- TEST 1.2 REST API DLA PLYNDO-PACK-4 ---');
  const res = await verifyCouponAPI('PLYNDO-PACK-4');
  console.log('Wynik API PLYNDO-PACK-4:', JSON.stringify(res, null, 2));

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
