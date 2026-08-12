import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('🚀 Badanie dynamicznego renderowania pola kodu na /admin/webmaster i innych...');
  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  const pagesToTest = [
    'https://sklep562393.shoparena.pl/admin/webmaster',
    'https://sklep562393.shoparena.pl/admin/integrations',
    'https://sklep562393.shoparena.pl/admin/additionalCodes',
    'https://sklep562393.shoparena.pl/admin/config/appearance',
    'https://sklep562393.shoparena.pl/admin/skins/list'
  ];

  for (const url of pagesToTest) {
    console.log(`\nNavigating to: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded' }).catch(() => {});
    await page.waitForTimeout(4000);

    console.log(`Current URL: ${page.url()}`);
    const pageTitle = await page.title();
    console.log(`Title: ${pageTitle}`);

    const info = await page.evaluate(() => {
      const tas = Array.from(document.querySelectorAll('textarea'));
      const inps = Array.from(document.querySelectorAll('input'));
      const forms = Array.from(document.querySelectorAll('form'));
      const text = document.body.innerText.slice(0, 300);
      return {
        textareas: tas.map(t => ({ id: t.id, name: t.name, class: t.className })),
        inputs: inps.map(i => ({ id: i.id, name: i.name, type: i.type, class: i.className })),
        formsCount: forms.length,
        textSnippet: text
      };
    });

    console.log('DOM info:', JSON.stringify(info, null, 2));
    const name = url.split('/').pop();
    await page.screenshot({ path: path.resolve(__dirname, `../docs/screenshots/dyn-${name}.png`), fullPage: true });
  }

  await context.close();
}

run().catch(console.error);
