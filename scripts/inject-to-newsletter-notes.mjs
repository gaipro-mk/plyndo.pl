import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('🚀 Wstrzykiwanie Handoff Protocol v2 do newsletter_legal_notes na /admin/configShopping...');
  const moduleJsPath = path.resolve(__dirname, '../shoper-theme/modules/plyndo-handoff/module.js');
  const jsContent = fs.readFileSync(moduleJsPath, 'utf8');

  const scriptTag = `<script>\n${jsContent}\n</script>`;

  const script = `
    await page.goto('https://sklep562393.shoparena.pl/admin/configShopping', { waitUntil: 'networkidle' });
    
    await page.evaluate((code) => {
      const field = document.querySelector('#newsletter_legal_notes, textarea[name="newsletter_legal_notes"]');
      if (field) {
        if (!field.value.includes('PŁYN DO — Handoff Protocol v2')) {
          field.value = field.value + '\\n' + code;
          field.dispatchEvent(new Event('input', { bubbles: true }));
          field.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }, ${JSON.stringify(scriptTag)});

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
