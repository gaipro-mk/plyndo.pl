import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('🚀 Otwieranie menu Wygląd i treści...');
  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://sklep562393.shoparena.pl/admin/dashboard', { waitUntil: 'networkidle' });

  // Click on "Wygląd i treści" sidebar menu item
  const wygladMenu = page.locator('text="Wygląd i treści"').first();
  if (await wygladMenu.isVisible()) {
    await wygladMenu.click();
    await page.waitForTimeout(2000);
  }

  // Also try clicking "Aplikacje i integracje"
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href')
    })).filter(l => l.text);
  });

  console.log('Znalezione linki w menu:', JSON.stringify(links, null, 2));

  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/wyglad-menu-open.png'), fullPage: true });

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
