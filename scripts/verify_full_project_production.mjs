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

const baseUrl = process.env.SHOPER_API_URL || 'https://sklep562393.shoparena.pl/webapi/rest';
const user = process.env.SHOPER_API_USER;
const pass = process.env.SHOPER_API_PASSWORD;

async function getToken() {
  const res = await fetch(`${baseUrl}/auth`, {
    method: 'POST',
    headers: { 'Authorization': 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64') }
  });
  if (!res.ok) throw new Error(`Auth failure HTTP ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

async function verifyFullProject() {
  console.log('============================================================');
  console.log('🏁 OSTATECZNA RAPORTO-WERYFIKACJA PRODUKCYJNA PROJEKTU PŁYN DO');
  console.log('============================================================\n');

  let tura0Pass = false;
  let tura1Pass = false;
  let tura2Pass = false;
  let tura3Pass = false;
  let tura4Pass = false;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // --- TURA 1 & 0: STOREFRONT SCRIPT, HANDOFF & COUPON AUTO-SYNC ---
  console.log('--- 1. WERYFIKACJA TURY 1 I TURY 0 (Storefront JS & Handoff v2) ---');
  try {
    const resHtml = await fetch('https://sklep.plyndo.pl/');
    const html = await resHtml.text();
    const hasPlyndoScript = html.includes('plyndo') || html.includes('pd_v') || html.includes('PLYNDO-PACK');
    console.log('Czy skrypt plyndo jest widoczny w HTML sklepu:', hasPlyndoScript);

    const testUrl = `https://sklep.plyndo.pl/pl/basket?pd_v=2&pd_items=182:1,186:1,189:1,190:1&pd_pack=4&pd_sid=final_${Date.now()}`;
    await page.goto(testUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(5000);

    const bState = await page.evaluate(async () => {
      if (typeof useStorefront !== 'function') return { error: 'brak useStorefront' };
      return new Promise((resolve) => {
        useStorefront(async ({ getApi }) => {
          try {
            const prod = await getApi('basketProductsApi');
            const promo = await getApi('basketPromotionsApi');
            const count = await prod.getBasketCount();
            const hasCode = await promo.getHasPromotionCode();
            const codeObj = await promo.getPromotionCode();
            const val = await prod.getDiscountedBasketValue();
            resolve({ count, hasCode, codeObj, val });
          } catch (e) {
            resolve({ error: e.message });
          }
        });
      });
    });

    console.log('Stan koszyka po handoffie:', JSON.stringify(bState, null, 2));
    const okCount = bState.count === 4;
    const okCode = bState.hasCode === true && bState.codeObj?.code === 'PLYNDO-PACK-4';
    const okVal = bState.val?.grossValueFormatted?.includes('71,68') || bState.val?.grossValue === 71.68;

    if (hasPlyndoScript && okCount && okCode && okVal) {
      console.log('✔ Handoff v2 + Auto-Sync kuponu PLYNDO-PACK-4 na żywym sklepie działają w 100%');
      tura0Pass = true;
      tura1Pass = true;
    }
  } catch (e) {
    console.error('❌ Wyjątek Tury 1/0:', e.message);
  }

  // --- TURA 2: LANDING PRODUCTION ---
  console.log('\n--- 2. WERYFIKACJA TURY 2 (Landing plyndo.pl & Cloudflare Pages) ---');
  try {
    const lRes = await fetch('https://plyndo.pl');
    if (lRes.ok) {
      console.log(`✔ Landing plyndo.pl odpowiada ze statusem HTTP ${lRes.status}`);
      tura2Pass = true;
    }
  } catch (e) {
    console.error('❌ Wyjątek Tury 2:', e.message);
  }

  // --- TURA 3: SHOPER REST API CATALOG ---
  console.log('\n--- 3. WERYFIKACJA TURY 3 (Katalog produktów Shoper REST API) ---');
  try {
    const token = await getToken();
    const legacyIds = [106, 107, 108];
    let deactivated = true;

    for (const id of legacyIds) {
      const pRes = await fetch(`${baseUrl}/products/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const pData = await pRes.json();
      if (Number(pData.translations?.pl_PL?.active) !== 0) {
        deactivated = false;
      }
    }

    const activeRes = await fetch(`${baseUrl}/products?limit=50&filters={"translations.active":1}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const activeData = await activeRes.json();
    const count = activeData.list?.length || 0;

    console.log(`Liczba aktywnych produktów w REST API: ${count}`);
    if (deactivated && count === 12) {
      console.log('✔ Produkty zestawowe (106, 107, 108) dezaktywowane, dokładnie 12 produktów wariantowych aktywnych');
      tura3Pass = true;
    }
  } catch (e) {
    console.error('❌ Wyjątek Tury 3:', e.message);
  }

  // --- TURA 4: DOM PATCH & VISUAL REBRANDING ---
  console.log('\n--- 4. WERYFIKACJA TURY 4 (Visual Rebranding & DOM Patch) ---');
  try {
    await page.goto('https://sklep.plyndo.pl/pl/basket', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    const patchState = await page.evaluate(() => {
      const blogLinks = document.querySelectorAll('a[href*="/pl/n/"]');
      const promoInput = document.querySelector('[class*="promo-code"]');
      return {
        blogLinksRemoved: blogLinks.length === 0,
        promoCodeHidden: !promoInput || getComputedStyle(promoInput).display === 'none'
      };
    });

    console.log('Wynik łatek DOM na sklepie:', JSON.stringify(patchState, null, 2));
    if (patchState.blogLinksRemoved && patchState.promoCodeHidden) {
      console.log('✔ Sekcja bloga usunięta, pole kodu rabatowego ukryte');
      tura4Pass = true;
    }
  } catch (e) {
    console.error('❌ Wyjątek Tury 4:', e.message);
  }

  await browser.close();

  console.log('\n============================================================');
  console.log('PODSUMOWANIE ETAPÓW IMPLEMENTACJI (100% PRODUKCJA):');
  console.log('============================================================');
  console.log(`TURA 0 — BRAMKA KUPONÓW:              [${tura0Pass ? 'PASS 100%' : 'FAIL'}]`);
  console.log(`TURA 1 — SKRYPT STOREFRONT & HANDOFF: [${tura1Pass ? 'PASS 100%' : 'FAIL'}]`);
  console.log(`TURA 2 — DEPLOYMENT LANDINGU:         [${tura2Pass ? 'PASS 100%' : 'FAIL'}]`);
  console.log(`TURA 3 — REST API KATALOG PRODUKTÓW:  [${tura3Pass ? 'PASS 100%' : 'FAIL'}]`);
  console.log(`TURA 4 — VISUAL REBRANDING & CSS:     [${tura4Pass ? 'PASS 100%' : 'FAIL'}]`);
  console.log('============================================================');

  const allPassed = tura0Pass && tura1Pass && tura2Pass && tura3Pass && tura4Pass;
  if (allPassed) {
    console.log('\n🎉 PROJEKT W PEŁNI UKOŃCZONY I ZWERYFIKOWANY NA PRODUKCJI! KLIENT MOŻE REALNIE KUPOWAĆ PACZKI!');
  } else {
    console.error('\n❌ WERYFIKACJA KOŃCOWA NIE POWIODŁA SIĘ');
    process.exit(1);
  }
}

verifyFullProject().catch(console.error);
