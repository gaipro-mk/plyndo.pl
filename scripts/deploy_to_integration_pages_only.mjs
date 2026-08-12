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

if (fs.existsSync(codeFile)) fs.unlinkSync(codeFile);

async function run() {
  console.log('🚀 Wstrzykiwanie skryptu wyłącznie na stronach integracyjnych Shoper...');
  const jsPath = path.resolve(__dirname, '../shoper-theme/custom-js/plyndo-storefront.js');
  const jsCode = fs.readFileSync(jsPath, 'utf8');
  const scriptTag = `<script>\n${jsCode}\n</script>`;

  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'networkidle' });

  if (await page.locator('input[name="login"]').isVisible()) {
    await page.locator('input[name="login"]').fill(user);
    await page.locator('input[name="password"]').fill(pass);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(3000);
  }

  console.log('Oczekiwanie na pole 2FA (#code)...');
  await page.waitForSelector('#code, input[name="code"]', { timeout: 10000 });
  const codeInput = page.locator('#code, input[name="code"]');

  console.log('📧 Wysłałem nowy kod 2FA na Twój e-mail!');
  console.log('Oczekiwanie na kod 2FA w scratch_code.txt (max 120 sek)...');

  let code = null;
  const start = Date.now();
  while (Date.now() - start < 120000) {
    if (fs.existsSync(codeFile)) {
      code = fs.readFileSync(codeFile, 'utf8').trim();
      if (code.length >= 4) break;
    }
    await new Promise(r => setTimeout(r, 1000));
  }

  if (!code) {
    console.error('❌ Czas na podanie kodu minął.');
    await context.close();
    process.exit(1);
  }

  console.log(`🔑 Wprowadzam kod 2FA (${code})...`);
  await codeInput.fill(code);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
    page.locator('button[type="submit"]').first().click()
  ]);

  console.log('🎉 ZALOGOWANO! URL:', page.url());

  const integrationUrls = [
    'https://sklep562393.shoparena.pl/admin/myintegrations',
    'https://sklep562393.shoparena.pl/admin/other-integrations',
    'https://sklep562393.shoparena.pl/admin/additionalCodes',
    'https://sklep562393.shoparena.pl/admin/webmaster',
    'https://sklep562393.shoparena.pl/admin/config/appearance'
  ];

  for (const url of integrationUrls) {
    console.log(`\nSprawdzanie strony integracyjnej: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(2000);

    const count = await page.locator('textarea').count();
    console.log(`Textarea count na ${url}: ${count}`);

    if (count > 0) {
      console.log(`🎉 ZNALEZIONO STRONĘ INTEGRACJI Z POLAMI KODU! URL: ${url}`);
      await page.screenshot({ path: path.resolve(__dirname, `../docs/screenshots/integration-found-${url.split('/').pop()}.png`), fullPage: true });

      const fieldsInfo = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('textarea')).map(t => ({
          id: t.id,
          name: t.name,
          label: t.closest('div, tr, label, td')?.innerText?.slice(0, 100)
        }));
      });
      console.log('Pola na stronie:', JSON.stringify(fieldsInfo, null, 2));

      await page.evaluate((code) => {
        const textareas = Array.from(document.querySelectorAll('textarea'));
        const target = textareas.find(t => t.id === 'site_body' || t.name === 'site_body') || textareas[textareas.length - 1];
        target.value = code;
        target.dispatchEvent(new Event('input', { bubbles: true }));
        target.dispatchEvent(new Event('change', { bubbles: true }));
      }, scriptTag);

      const saveBtn = page.locator('button[type="submit"], input[type="submit"]').first();
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
        saveBtn.click()
      ]);

      console.log('🎉 SKRYPT ZOSTAŁ ZAPISANY W WŁAŚCIWYM POLU INTEGRACJI!');
      await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/integration-saved-success.png'), fullPage: true });
      await context.close();
      return;
    }
  }

  console.error('❌ Żadna ze stron integracyjnych nie zawierała widocznych pól textarea.');
  await context.close();
}

run().catch(err => {
  console.error('Wyjątek:', err);
  process.exit(1);
});
