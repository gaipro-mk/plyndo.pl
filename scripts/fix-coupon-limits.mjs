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
  console.log('🚀 Wyłączanie limitów użyć (peruser_limit, usage_limit) na kuponach 4, 5, 6...');
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

  for (const id of [4, 5, 6]) {
    console.log(`✏️ Odblokowywanie limitów dla kuponu ID ${id}...`);
    await page.goto(`https://sklep562393.shoparena.pl/admin/promoCodes/edit/id/${id}`, { waitUntil: 'networkidle' });

    // Uncheck limit checkboxes
    for (const selector of ['#peruser_limit_set', '#usage_limit_set', '#coupons_limit', '#time_limit']) {
      const cb = page.locator(selector).first();
      if (await cb.isVisible() && await cb.isChecked()) {
        await cb.uncheck({ force: true });
      }
    }

    // Ensure active is checked
    const activeCb = page.locator('#active, input[name="active"]').first();
    if (await activeCb.isVisible() && !(await activeCb.isChecked())) {
      await activeCb.check({ force: true });
    }

    // Ensure assortment_0 (all products) is checked
    const ass0 = page.locator('#assortment_0').first();
    if (await ass0.isVisible()) {
      await ass0.check({ force: true });
    }

    const saveBtn = page.locator('button[type="submit"]').first();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
      saveBtn.click()
    ]);
    console.log(`   ✔ Odblokowano kupon ID ${id}!`);
  }

  console.log('--- TEST 1.2 REST API DLA PLYNDO-PACK-4 ---');
  const res = await verifyCouponAPI('PLYNDO-PACK-4');
  console.log('Wynik API:', JSON.stringify(res, null, 2));

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
