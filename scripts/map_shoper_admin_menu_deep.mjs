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
const codeFile = path.resolve(__dirname, '../scratch_code.txt');

async function run() {
  console.log('🚀 Głębokie mapowanie panelu Shoper Admin...');
  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'networkidle' });

  if (await page.locator('input[name="login"]').isVisible()) {
    console.log('Logowanie...');
    await page.locator('input[name="login"]').fill(user);
    await page.locator('input[name="password"]').fill(pass);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(3000);
  }

  const codeInput = page.locator('#code, input[name="code"]');
  if (await codeInput.isVisible()) {
    let code = fs.existsSync(codeFile) ? fs.readFileSync(codeFile, 'utf8').trim() : '';
    console.log(`🔑 Wprowadzam kod 2FA (${code})...`);
    await codeInput.fill(code);
    await page.locator('button:has-text("Weryfikuj"), button[type="submit"]').first().click();
    await page.waitForTimeout(5000);
  }

  console.log('URL po zalogowaniu:', page.url());
  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/dashboard-full.png'), fullPage: true });

  // Map all navigation items in sidebar
  const menuStructure = await page.evaluate(() => {
    const navs = Array.from(document.querySelectorAll('nav a, .sidebar a, ul.menu a, header a, .main-nav a'));
    return navs.map(a => ({
      text: a.innerText.trim().replace(/\s+/g, ' '),
      href: a.href
    })).filter(a => a.text && a.href.includes('/admin/'));
  });

  console.log('\n--- STRUKTURA MENU ADMINA SHOPER ---');
  menuStructure.forEach(m => console.log(`* ${m.text} -> ${m.href}`));

  // Specific candidate URLs in Shoper for custom HTML/JS/Integrations
  const candidateUrls = [
    'https://sklep562393.shoparena.pl/admin/additionalCodes',
    'https://sklep562393.shoparena.pl/admin/integrations',
    'https://sklep562393.shoparena.pl/admin/webmaster',
    'https://sklep562393.shoparena.pl/admin/config/appearance',
    'https://sklep562393.shoparena.pl/admin/skins/list',
    'https://sklep562393.shoparena.pl/admin/configSkins/list',
    'https://sklep562393.shoparena.pl/admin/snippet'
  ];

  const jsPath = path.resolve(__dirname, '../shoper-theme/custom-js/plyndo-storefront.js');
  const jsCode = fs.readFileSync(jsPath, 'utf8');
  const scriptTag = `<script>\n${jsCode}\n</script>`;

  for (const url of candidateUrls) {
    console.log(`\nTesting candidate page: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
    const current = page.url();
    console.log(`Reached URL: ${current}`);
    const name = url.split('/').pop();
    await page.screenshot({ path: path.resolve(__dirname, `../docs/screenshots/menu-${name}.png`), fullPage: true });

    // Look for textareas or inputs
    const textareaCount = await page.locator('textarea').count();
    console.log(`Textareas count on ${name}:`, textareaCount);

    if (textareaCount > 0) {
      const textareaInfo = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('textarea, input[type="text"]')).map(i => ({
          id: i.id,
          name: i.name,
          placeholder: i.placeholder,
          label: i.closest('label, div, td')?.innerText?.slice(0, 80)
        }));
      });
      console.log(`Fields on ${name}:`, JSON.stringify(textareaInfo, null, 2));

      // If this is additionalCodes or integrations or snippet, fill and save!
      const injected = await page.evaluate((code) => {
        const tas = Array.from(document.querySelectorAll('textarea'));
        if (tas.length > 0) {
          // Fill first textarea or footer/head textarea
          const target = tas[tas.length - 1]; // bottom/footer code textarea
          target.value = code;
          target.dispatchEvent(new Event('input', { bubbles: true }));
          target.dispatchEvent(new Event('change', { bubbles: true }));
          return { success: true, targetId: target.id || target.name };
        }
        return { success: false };
      }, scriptTag);

      if (injected.success) {
        console.log(`✔ Wstrzyknięto kod do pola (${injected.targetId}) na stronie ${name}!`);
        const saveBtn = page.locator('button[type="submit"], input[type="submit"]').first();
        if (await saveBtn.isVisible()) {
          await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
            saveBtn.click()
          ]);
          console.log(`🎉 ZAPISANO ZMIANY na stronie ${name}!`);
          await page.screenshot({ path: path.resolve(__dirname, `../docs/screenshots/saved-${name}.png`), fullPage: true });
        }
      }
    }
  }

  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
