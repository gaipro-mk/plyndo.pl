import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('🚀 Przeszukiwanie zalogowanego panelu admina...');
  const jsPath = path.resolve(__dirname, '../shoper-theme/custom-js/plyndo-storefront.js');
  const jsCode = fs.readFileSync(jsPath, 'utf8');
  const scriptTag = `<script>\n${jsCode}\n</script>`;

  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin/dashboard', { waitUntil: 'networkidle' });
  console.log('Dashboard URL:', page.url());

  // Click on "Dodatki i integracje" / "Wygląd i treści" / "Ustawienia" menu items
  const menuLinks = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    return anchors.map(a => ({
      text: a.innerText.trim().replace(/\s+/g, ' '),
      href: a.href
    })).filter(a => a.href.includes('/admin/'));
  });

  console.log('Menu links on dashboard:', JSON.stringify(menuLinks, null, 2));

  // Test potential URLs
  const candidateUrls = [
    'https://sklep562393.shoparena.pl/admin/webmaster',
    'https://sklep562393.shoparena.pl/admin/additionalCodes',
    'https://sklep562393.shoparena.pl/admin/integrations',
    'https://sklep562393.shoparena.pl/admin/config/appearance',
    'https://sklep562393.shoparena.pl/admin/skins/list',
    'https://sklep562393.shoparena.pl/admin/configSkins/list',
    'https://sklep562393.shoparena.pl/admin/snippet',
    'https://sklep562393.shoparena.pl/admin/settings'
  ];

  for (const url of candidateUrls) {
    console.log(`\nVisiting: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
    console.log(`Current page URL: ${page.url()}`);
    const tas = await page.locator('textarea').count();
    console.log(`Textareas count: ${tas}`);

    if (tas > 0) {
      console.log(`🎉 ZNALEZIONO STRONĘ Z POLAMI TEXTAREA! URL: ${page.url()}`);
      await page.screenshot({ path: path.resolve(__dirname, `../docs/screenshots/found-${url.split('/').pop()}.png`), fullPage: true });

      const fields = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('textarea')).map(t => ({
          id: t.id,
          name: t.name,
          class: t.className,
          placeholder: t.placeholder,
          parentText: t.closest('div, label, tr, td')?.innerText?.slice(0, 100)
        }));
      });
      console.log('Pola textarea:', JSON.stringify(fields, null, 2));

      // Inject scriptTag into the last or site_body textarea!
      await page.evaluate((code) => {
        const textareas = Array.from(document.querySelectorAll('textarea'));
        if (textareas.length > 0) {
          // Find site_body or footer or last textarea
          const target = textareas.find(t => t.id === 'site_body' || t.name === 'site_body') || textareas[textareas.length - 1];
          target.value = code;
          target.dispatchEvent(new Event('input', { bubbles: true }));
          target.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }, scriptTag);

      const saveBtn = page.locator('button[type="submit"], input[type="submit"]').first();
      if (await saveBtn.isVisible()) {
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
          saveBtn.click()
        ]);
        console.log('🎉 ZAPISANO SKRYPT NA STRONIE!');
      }
    }
  }

  await context.close();
}

run().catch(console.error);
