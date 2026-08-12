import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('🚀 Wstrzykiwanie skryptu do site_body...');
  const jsPath = path.resolve(__dirname, '../shoper-theme/custom-js/plyndo-storefront.js');
  const jsCode = fs.readFileSync(jsPath, 'utf8');
  const scriptTag = `<script>\n${jsCode}\n</script>`;

  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin/webmaster', { waitUntil: 'load' });
  console.log('URL:', page.url());

  const siteBodyField = page.locator('#site_body, textarea[name="site_body"]');
  if (await siteBodyField.count() > 0) {
    console.log('Wypełniam pole site_body...');
    await siteBodyField.first().fill(scriptTag);

    const saveBtn = page.locator('button[type="submit"], input[type="submit"]').first();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
      saveBtn.click()
    ]);
    console.log('🎉 POMYŚLNIE ZAPISANO SKRYPT W SITE_BODY!');
    await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/webmaster-success.png'), fullPage: true });
  } else {
    console.error('❌ Nie znaleziono pola #site_body!');
  }

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
