import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('🚀 Zapisywanie userjs pod zakładką Zaawansowane...');
  const moduleJsPath = path.resolve(__dirname, '../shoper-theme/modules/plyndo-handoff/module.js');
  const jsContent = fs.readFileSync(moduleJsPath, 'utf8');

  const script = `
    await page.goto('https://sklep562393.shoparena.pl/admin/configSkins/skin-edit/id/12', { waitUntil: 'networkidle' });
    
    // Click Zaawansowane tab
    const advTab = page.locator('text="Zaawansowane"').first();
    if (await advTab.isVisible()) {
      await advTab.click();
      await page.waitForTimeout(1000);
    }

    // Fill userjs
    await page.evaluate((jsText) => {
      const ujs = document.querySelector('#userjs');
      if (ujs) {
        ujs.value = jsText;
        ujs.dispatchEvent(new Event('input', { bubbles: true }));
        ujs.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, ${JSON.stringify(jsContent)});

    // Submit form
    const saveBtn = page.locator('button[type="submit"], input[type="submit"]').first();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
      saveBtn.click()
    ]);

    return { url: page.url(), success: true };
  `;

  const res = await fetch('http://localhost:9876/eval', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ script })
  });

  const data = await res.json();
  console.log('Wynik:', JSON.stringify(data, null, 2));
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
