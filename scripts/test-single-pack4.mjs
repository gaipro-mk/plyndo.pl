import { chromium } from 'playwright';

async function run() {
  console.log('🧪 Testowanie bezpośredniego dodawania zestawu Pack 4 i kuponu...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://sklep.plyndo.pl/pl/basket', { waitUntil: 'networkidle' });

  const result = await page.evaluate(async () => {
    return new Promise((resolve) => {
      window.useStorefront(async ({ getApi }) => {
        const overall = await getApi('basketOverallApi');
        const updater = await getApi('basketUpdaterApi');
        const promo = await getApi('basketPromotionsApi');

        await overall.cleanBasket();

        await updater.addItem({ variantId: 182, quantity: 1, showAddedModal: false, bundleItems: [] });
        await updater.addItem({ variantId: 186, quantity: 1, showAddedModal: false, bundleItems: [] });
        await updater.addItem({ variantId: 189, quantity: 1, showAddedModal: false, bundleItems: [] });
        await updater.addItem({ variantId: 190, quantity: 1, showAddedModal: false, bundleItems: [] });

        const pRes = await promo.add('PLYNDO-PACK-4');
        const count = await overall.getProductsCount();
        const hasPromo = await promo.getHasPromotionCode();
        const total = await overall.getFormattedTotal();

        resolve({ pRes, count, hasPromo, total });
      });
    });
  });

  console.log('RESULT PACK 4:', JSON.stringify(result, null, 2));
  await browser.close();
}

run().catch(err => {
  console.error('ERROR:', err);
  process.exit(1);
});
