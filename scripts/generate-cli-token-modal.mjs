import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.substring(0, eqIdx).trim();
        const val = trimmed.substring(eqIdx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}

loadEnv();

const user = process.env.SHOPER_WEB_ADMIN_USER || process.env.SHOPER_API_USER;
const pass = process.env.SHOPER_WEB_ADMIN_PASSWORD || process.env.SHOPER_API_PASSWORD;

async function run() {
  console.log('🚀 Wyszukiwanie opcji Shoper CLI w menu szablonów...');
  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin/skins/list', { waitUntil: 'networkidle' });

  if (await page.locator('input[name="login"]').isVisible()) {
    await page.locator('input[name="login"]').fill(user);
    await page.locator('input[name="password"]').fill(pass);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(4000);
  }

  // Dump all button titles and text on /admin/skins/list
  const elements = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a, button, div.action-item, span')).map(e => ({
      tagName: e.tagName,
      text: e.innerText ? e.innerText.trim() : '',
      title: e.getAttribute('title'),
      href: e.getAttribute('href'),
      onclick: e.getAttribute('onclick')
    })).filter(e => e.text.includes('CLI') || e.text.includes('Edytuj') || e.text.includes('Szablon') || (e.title && e.title.includes('CLI')));
  });

  console.log('Znalezione elementy CLI/Edycja:', JSON.stringify(elements, null, 2));

  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/skins-list-full.png'), fullPage: true });

  await context.close();
}

run().catch(err => {
  console.error('Błąd:', err);
  process.exit(1);
});
