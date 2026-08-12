import { chromium } from 'playwright';

async function runVerification() {
  console.log('🚀 Rozpoczynanie automatycznej weryfikacji Tury 1...');

  // 1. Sprawdzenie, czy skrypt jest serwowany w HTML sklepu
  const resHtml = await fetch('https://sklep.plyndo.pl/');
  const html = await resHtml.text();
  const hasPlyndoScript = html.includes('plyndo') || html.includes('pd_v') || html.includes('PLYNDO-PACK');
  console.log('Czy skrypt plyndo jest widoczny w HTML sklepu:', hasPlyndoScript);

  const jsFiles = Array.from(html.matchAll(/\/userdata\/public\/storefront\/js\/[^"]+\.js/g)).map(m => m[0]);
  console.log('Znalezione pliki JS w HTML:', Array.from(new Set(jsFiles)));

  // 2. Weryfikacja Handoff End-to-End w przeglądarce (Playwright)
  console.log('\n--- TEST HANDOFFU W PRZEGLĄDARCE ---');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const testUrl = 'https://sklep.plyndo.pl/pl/basket?pd_v=2&pd_items=182:1,186:1,189:1,190:1&pd_pack=4&pd_sid=test01';
  console.log('Nawigacja pod URL testowy:', testUrl);
  await page.goto(testUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  console.log('Końcowy URL w przeglądarce:', page.url());

  const state = await page.evaluate(async () => {
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
        } catch(e) {
          resolve({ error: e.message });
        }
      });
    });
  });

  console.log('Stan koszyka po handoffie:', JSON.stringify(state, null, 2));

  await browser.close();

  const okCount = state.count === 4;
  const okCode = state.hasCode === true;
  const okVal = state.val?.grossValueFormatted === '71,68 zł' || state.val?.grossValue === 71.68;

  console.log('\n--- WYNIKI TURY 1 ---');
  console.log('Skrypt w HTML:', hasPlyndoScript ? 'PASS' : 'FAIL');
  console.log('Liczba pozycji (4):', okCount ? 'PASS' : 'FAIL');
  console.log('Kupon aktywny:', okCode ? 'PASS' : 'FAIL');
  console.log('Suma końcowa 71,68 zł:', okVal ? 'PASS' : 'FAIL');
}

runVerification().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
