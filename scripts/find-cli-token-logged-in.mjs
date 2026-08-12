import { getAdminPage } from './shoper-admin-session.mjs';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('🚀 Wyszukiwanie tokenu Shoper CLI po autologowaniu...');
  const { context, page } = await getAdminPage();

  await page.goto('https://sklep562393.shoparena.pl/admin/skins/list', { waitUntil: 'networkidle' });

  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/skins-list-loggedin.png'), fullPage: true });

  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Długość tekstu strony:', bodyText.length);
  console.log('Fragment tekstu:', bodyText.substring(0, 500));

  // Search all buttons or links with 'CLI' or 'Własny'
  const cliButtons = page.locator('text="Shoper CLI", text="CLI", text="Wygeneruj token", text="Własny styl"');
  const count = await cliButtons.count();
  console.log('Liczba znalezionych przycisków CLI:', count);

  for (let i = 0; i < count; i++) {
    const text = await cliButtons.nth(i).innerText().catch(() => '');
    console.log(`Przycisk ${i}: "${text}"`);
  }

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
