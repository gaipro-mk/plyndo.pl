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
  console.log('🚀 Wyszukiwanie generatora tokenu Shoper CLI w panelu...');
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

  // Find all links containing 'skin', 'cli', 'token', 'edit', 'list'
  const navLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href')
    })).filter(l => l.href && (l.href.includes('skin') || l.href.includes('cli') || l.href.includes('token') || l.href.includes('integration') || l.href.includes('developer')));
  });

  console.log('Znalezione linki w panelu:', JSON.stringify(navLinks, null, 2));

  // Search skin edit links
  const skinEditLinks = navLinks.filter(l => l.href.includes('skin') || l.href.includes('edit'));
  for (const link of skinEditLinks) {
    console.log(`Checking link: ${link.text} (${link.href})...`);
    await page.goto(`https://sklep562393.shoparena.pl${link.href}`, { waitUntil: 'networkidle' }).catch(() => {});
    const title = await page.title();
    const hasCliText = await page.evaluate(() => document.body.innerText.includes('CLI') || document.body.innerText.includes('token') || document.body.innerText.includes('Token'));
    console.log(`   Title: ${title}, Has CLI/Token text: ${hasCliText}`);
    if (hasCliText) {
      await page.screenshot({ path: path.resolve(__dirname, `../docs/screenshots/cli-page-${Date.now()}.png`), fullPage: true });
    }
  }

  await context.close();
}

run().catch(err => {
  console.error('Błąd:', err);
  process.exit(1);
});
