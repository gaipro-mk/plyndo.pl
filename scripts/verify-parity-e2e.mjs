import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTest() {
  console.log('🧪 Rozpoczynanie automatycznych testów parytetowych FAZA 6 (Handoff Protocol v2)...');

  const moduleJsPath = path.resolve(__dirname, '../shoper-theme/modules/plyndo-handoff/module.js');
  const handoffScriptCode = fs.readFileSync(moduleJsPath, 'utf8');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Inject Handoff script automatically
  await page.addInitScript({ content: handoffScriptCode });

  const testCases = [
    {
      name: 'Pakiet 4 produktów (Kupon PLYNDO-PACK-4 -20%)',
      url: 'https://sklep.plyndo.pl/pl/basket?pd_v=2&pd_items=182:1,186:1,189:1,190:1&pd_pack=4&pd_sid=e2epack4_' + Date.now(),
      expectedCount: 4,
      expectedCoupon: 'PLYNDO-PACK-4'
    },
    {
      name: 'Pakiet 8 produktów (Kupon PLYNDO-PACK-8 -30%)',
      url: 'https://sklep.plyndo.pl/pl/basket?pd_v=2&pd_items=182:1,183:1,184:1,185:1,186:1,187:1,189:1,190:1&pd_pack=8&pd_sid=e2epack8_' + Date.now(),
      expectedCount: 8,
      expectedCoupon: 'PLYNDO-PACK-8'
    },
    {
      name: 'Pakiet 12 produktów (Kupon PLYNDO-PACK-12 -40%)',
      url: 'https://sklep.plyndo.pl/pl/basket?pd_v=2&pd_items=182:1,183:1,184:1,185:1,186:1,187:1,188:1,189:1,190:1,191:1,192:1,193:1&pd_pack=12&pd_sid=e2epack12_' + Date.now(),
      expectedCount: 12,
      expectedCoupon: 'PLYNDO-PACK-12'
    }
  ];

  let passedTests = 0;

  for (const tc of testCases) {
    console.log(`\n--- Test: ${tc.name} ---`);
    await page.goto(tc.url, { waitUntil: 'domcontentloaded' });
    
    // Wait until URL becomes clean (without pd_v)
    await page.waitForURL(url => !url.toString().includes('pd_v='), { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000);

    const currentUrl = page.url();
    const hasCleanUrl = !currentUrl.includes('pd_v=') && !currentUrl.includes('pd_items=');
    console.log(`  [1] URL po przetwarzaniu: ${currentUrl}`);
    console.log(`  [2] Czy URL jest wyczyszczony z pd_*: ${hasCleanUrl ? 'TAK (PASS)' : 'NIE (FAIL)'}`);

    const cartInfo = await page.evaluate(async () => {
      if (typeof window.useStorefront === 'function') {
        return new Promise(resolve => {
          window.useStorefront(async ({ getApi }) => {
            const overallApi = await getApi('basketOverallApi');
            const promoApi = await getApi('basketPromotionsApi');

            const count = overallApi ? await overallApi.getProductsCount() : 0;
            const hasPromo = promoApi ? await promoApi.getHasPromotionCode() : false;
            const total = overallApi ? await overallApi.getFormattedTotal() : '';

            resolve({ count, hasPromo, total });
          });
        });
      }
      return { count: 0, hasPromo: false, total: '' };
    });

    const isCountPass = cartInfo.count === tc.expectedCount;
    const isPromoPass = cartInfo.hasPromo;

    console.log(`  [3] Liczba produktów w koszyku: ${cartInfo.count} (Oczekiwano: ${tc.expectedCount}) -> ${isCountPass ? 'PASS' : 'FAIL'}`);
    console.log(`  [4] Kupon rabatowy obecny w koszyku: ${cartInfo.hasPromo ? 'TAK (PASS)' : 'NIE (FAIL)'}`);
    console.log(`  [5] Łączna kwota koszyka: ${cartInfo.total}`);

    if (hasCleanUrl && isCountPass && isPromoPass) {
      passedTests++;
    }
  }

  await browser.close();

  console.log(`\n========================================`);
  console.log(`📊 Wynik testów E2E: ${passedTests}/${testCases.length} PASS`);
  console.log(`========================================\n`);

  if (passedTests !== testCases.length) {
    process.exit(1);
  }
}

runTest().catch(err => {
  console.error('Błąd testu:', err);
  process.exit(1);
});
