import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('🚀 Tworzenie 3 kuponów rabatowych w aktywnej sesji...');
  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  const coupons = [
    { code: 'PLYNDO-PACK-4', discount: 20, minSum: 0 },
    { code: 'PLYNDO-PACK-8', discount: 30, minSum: 150 },
    { code: 'PLYNDO-PACK-12', discount: 40, minSum: 230 }
  ];

  for (const c of coupons) {
    console.log(`➕ Tworzenie kuponu: ${c.code} (${c.discount}%, min. ${c.minSum} zł)...`);
    await page.goto('https://sklep562393.shoparena.pl/admin/promoCodes/add', { waitUntil: 'networkidle' });

    // Fill code
    await page.locator('#code').fill(c.code);

    // Fill discount percentage
    await page.locator('#discount_type_1').check({ force: true });
    await page.locator('#discount_percent').fill(String(c.discount));

    // Fill min sum if > 0
    if (c.minSum > 0) {
      await page.locator('#value_limit').check({ force: true });
      await page.locator('#min_amount').fill(String(c.minSum));
    }

    // Submit
    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click();
    await page.waitForTimeout(3000);

    console.log(`   Zapisano kupon ${c.code}! URL po zapisie: ${page.url()}`);
    await page.screenshot({ path: path.resolve(__dirname, `../docs/screenshots/coupon-${c.code}-SUCCESS.png`) });
  }

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
