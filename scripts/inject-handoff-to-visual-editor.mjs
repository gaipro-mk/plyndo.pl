import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('🚀 Wstrzykiwanie Handoff Protocol v2 oraz linku powrotnego do Stopki w Visual Editor...');
  const moduleJsPath = path.resolve(__dirname, '../shoper-theme/modules/plyndo-handoff/module.js');
  const jsContent = fs.readFileSync(moduleJsPath, 'utf8');

  const fullHtml = `
<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; width: 100%; font-family: 'Switzer', sans-serif;">
  <p style="margin: 0; font-size: 13px; color: #9CA3AF;">© ${new Date().getFullYear()} PŁYN DO. Wszelkie prawa zastrzeżone.</p>
  <a href="https://plyndo.pl" style="color: #276142; font-weight: 600; text-decoration: none; font-size: 14px; display: inline-flex; align-items: center; gap: 6px;">
    ← Wróć do strony głównej PŁYN DO
  </a>
</div>
<script>
${jsContent}
</script>
  `.trim();

  const script = `
    await page.goto('https://sklep562393.shoparena.pl/admin/configSkins/skin-visual-editor/id/12/layout/1', { waitUntil: 'networkidle' });
    
    // 1. Open Stopka
    const footerBtn = page.locator('text="Stopka"').first();
    if (await footerBtn.isVisible()) {
      await footerBtn.click();
      await page.waitForTimeout(1000);
    }

    // 2. Open Tekst i multimedia #27
    const tmMod = page.locator('text="Tekst i multimedia #27"').first();
    if (await tmMod.isVisible()) {
      await tmMod.click();
      await page.waitForTimeout(1000);
    }

    // 3. Switch Froala editor to HTML view or edit textarea
    await page.evaluate((html) => {
      const frEditor = document.querySelector('.fr-element, .fr-view, textarea.fr-code, textarea');
      if (frEditor) {
        if (frEditor.tagName.toLowerCase() === 'textarea') {
          frEditor.value = html;
        } else {
          frEditor.innerHTML = html;
        }
      }
    }, ${JSON.stringify(fullHtml)});

    // Also check if Froala editor has code mode button
    const codeBtn = page.locator('button[data-cmd="html"]').first();
    if (await codeBtn.isVisible()) {
      await codeBtn.click();
      await page.waitForTimeout(500);
      const codeArea = page.locator('textarea.fr-code').first();
      if (await codeArea.isVisible()) {
        await codeArea.fill(${JSON.stringify(fullHtml)});
      }
    }

    // 4. Click Save in Visual Editor
    const saveBtn = page.locator('button:has-text("Zapisz"), input[value*="Zapisz"]').first();
    if (await saveBtn.isVisible()) {
      await saveBtn.click();
      await page.waitForTimeout(3000);
    }

    return { success: true, url: page.url() };
  `;

  const res = await fetch('http://localhost:9876/eval', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ script })
  });

  const data = await res.json();
  console.log('Wynik zapisania w Visual Editor:', JSON.stringify(data, null, 2));
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
