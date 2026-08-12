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
  console.log('🚀 Sprawdzanie sesji administratora...');
  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'networkidle' });

  if (await page.locator('input[name="login"]').isVisible()) {
    console.log('Logowanie w toku (wprowadzam login i hasło)...');
    await page.locator('input[name="login"]').fill(user);
    await page.locator('input[name="password"]').fill(pass);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(3000);
  }

  const codeInput = page.locator('#code, input[name="code"]');
  if (await codeInput.isVisible()) {
    console.log('📧 Wymagana autoryzacja 2FA. Oczekiwanie na kod z scratch_code.txt...');
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
      console.error('❌ Brak kodu 2FA w scratch_code.txt przed upływem limitu czasu.');
      await context.close();
      process.exit(1);
    }
    console.log(`🔑 Wprowadzam kod 2FA (${code})...`);
    await codeInput.fill(code);
    await page.locator('button:has-text("Weryfikuj"), button[type="submit"]').first().click();
    await page.waitForTimeout(4000);
  }

  console.log('Nawigacja do listy kodów rabatowych...');
  await page.goto('https://sklep562393.shoparena.pl/admin/promoCodes/list', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/promocodes-list.png'), fullPage: true });

  const rows = await page.evaluate(() => {
    const trs = Array.from(document.querySelectorAll('table.default-table tbody tr, table.grid tbody tr'));
    return trs.map(tr => tr.innerText);
  });
  console.log('Znalezione kupony w panelu:\n', rows.join('\n'));

  await context.close();

  console.log('\n--- WERYFIKACJA API ---');
  const pack4 = await testCouponAPI('PLYNDO-PACK-4', {182:1, 186:1, 189:1, 190:1});
  console.log('Pack 4 API:', JSON.stringify(pack4, null, 2));

  const pack8 = await testCouponAPI('PLYNDO-PACK-8', {182:1, 183:1, 184:1, 185:1, 186:1, 187:1, 188:1, 189:1});
  console.log('Pack 8 API:', JSON.stringify(pack8, null, 2));

  const pack12 = await testCouponAPI('PLYNDO-PACK-12', {182:1, 183:1, 184:1, 185:1, 186:1, 187:1, 188:1, 189:1, 190:1, 191:1, 192:1, 193:1});
  console.log('Pack 12 API:', JSON.stringify(pack12, null, 2));
}

run().catch(err => {
  console.error('Błąd:', err);
  process.exit(1);
});
