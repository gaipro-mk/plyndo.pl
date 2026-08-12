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

async function testCouponAPI(code, items) {
  const cookieJar = {};
  function getHeaders() {
    const cookies = Object.entries(cookieJar).map(([k,v])=>`${k}=${v}`).join('; ');
    return { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0', ...(cookies ? { Cookie: cookies } : {}) };
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
  const bid = data1.basket?.id;

  for (const [stockId, qty] of Object.entries(items)) {
    res = await fetch(`https://sklep.plyndo.pl/api/basket/${bid}/item/${stockId}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ quantity: qty })
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
    promoCode: data3.basket?.promoCode,
    grossValue: data3.basket?.sum?.grossValue,
    discountGrossFormatted: data3.basket?.discounts?.sum?.grossValueFormatted,
    flashMessages: data3.flashMessages
  };
}

async function run() {
  console.log('🚀 Logowanie do panelu Shoper i głęboka naprawa kuponów...');
  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'networkidle' });

  if (await page.locator('input[name="login"]').isVisible()) {
    console.log('Wprowadzam login i hasło...');
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

  console.log('Nawigacja do listy kodów rabatowych...');
  await page.goto('https://sklep562393.shoparena.pl/admin/promoCodes/list', { waitUntil: 'networkidle' });
  console.log('Obecny URL:', page.url());

  // Collect links to edit coupons or find coupons by code
  const couponLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/admin/promoCodes/edit/id/"]'));
    return links.map(a => ({ href: a.href, text: a.innerText.trim() }));
  });
  console.log('Znalezione linki edycji kuponów:', couponLinks);

  // We need to inspect every coupon, fix fields and save!
  // Target coupon definitions:
  // 1: PLYNDO-PACK-4 (20%, no min limit, no max limit)
  // 2: PLYNDO-PACK-8 (30%, min limit 150, no max limit)
  // 3: PLYNDO-PACK-12 (40%, min limit 230, no max limit)
  
  for (const item of couponLinks) {
    console.log(`\n--- Inspecting ${item.href} ---`);
    await page.goto(item.href, { waitUntil: 'networkidle' });
    
    // Dump all form field values to see why it's inactive!
    const fields = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
      return inputs.map(i => ({
        name: i.getAttribute('name'),
        id: i.getAttribute('id'),
        type: i.getAttribute('type'),
        value: i.value,
        checked: i.checked,
        disabled: i.disabled
      }));
    });
    console.log('Fields:', JSON.stringify(fields, null, 2));

    const codeVal = await page.evaluate(() => {
      const el = document.querySelector('input[name="code"], input[name="promo_code"], #code');
      return el ? el.value : '';
    });
    console.log('Coupon Code in form:', codeVal);

    // FIXES IN FORM:
    // 1. Ensure Active checkbox is CHECKED!
    await page.evaluate(() => {
      const activeCb = document.querySelector('input[name="active"], #active, input[name="is_active"]');
      if (activeCb && !activeCb.checked) activeCb.checked = true;
    });

    // 2. Uncheck Max Basket Value limit or clear max value field if 0.00
    await page.evaluate(() => {
      const maxInput = document.querySelector('input[name="max_basket_value"], input[name="basket_max"]');
      if (maxInput && maxInput.value === '0.00') maxInput.value = '';
      
      const timeLimit = document.querySelector('input[name="time_limit"]');
      if (timeLimit && timeLimit.checked) timeLimit.checked = false;

      // Fix coupon max value when range limit is checked
      const maxRangeInput = document.querySelector('input[name="basket_value_max"]');
      if (maxRangeInput && (maxRangeInput.value === '0.00' || maxRangeInput.value === '0')) maxRangeInput.value = '';
    });

    // Save
    const saveBtn = page.locator('button[type="submit"]').first();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
      saveBtn.click()
    ]);
    console.log('✔ Zapisano kupon!');
  }

  await context.close();

  console.log('\n--- PONOWNA WERYFIKACJA API ---');
  const pack4 = await testCouponAPI('PLYNDO-PACK-4', {182:1, 186:1, 189:1, 190:1});
  console.log('Pack 4 API:', JSON.stringify(pack4, null, 2));

  const pack8 = await testCouponAPI('PLYNDO-PACK-8', {182:1, 183:1, 184:1, 185:1, 186:1, 187:1, 188:1, 189:1});
  console.log('Pack 8 API:', JSON.stringify(pack8, null, 2));

  const pack12 = await testCouponAPI('PLYNDO-PACK-12', {182:1, 183:1, 184:1, 185:1, 186:1, 187:1, 188:1, 189:1, 190:1, 191:1, 192:1, 193:1});
  console.log('Pack 12 API:', JSON.stringify(pack12, null, 2));
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
