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

function updateEnvLocal(key, value) {
  const envPath = path.resolve(__dirname, '../.env.local');
  let content = fs.readFileSync(envPath, 'utf8');
  if (content.includes(`${key}=`)) {
    content = content.replace(new RegExp(`${key}=.*`), `${key}=${value}`);
  } else {
    content += `\n${key}=${value}\n`;
  }
  fs.writeFileSync(envPath, content, 'utf8');
  console.log(`✅ Zapisano ${key} w .env.local!`);
}

async function addCoupon(page, { code, discount, minSum }) {
  console.log(`➕ Dodawanie kuponu: ${code} (${discount}%, min. ${minSum} zł)...`);
  await page.goto('https://sklep562393.shoparena.pl/admin/coupons/add', { waitUntil: 'networkidle' });

  // Fill coupon form fields
  // Let's inspect input names on coupons/add
  const codeInput = page.locator('input[name="code"], #code, input[name="promo_code"], input[name*="code"]').first();
  if (await codeInput.isVisible()) {
    await codeInput.fill(code);
  }

  // Type: percentage (procentowy)
  const discountInput = page.locator('input[name="discount"], input[name*="discount"], input[name*="value"]').first();
  if (await discountInput.isVisible()) {
    await discountInput.fill(String(discount));
  }

  // Min order amount
  const minSumInput = page.locator('input[name="min_sum"], input[name*="min"]').first();
  if (await minSumInput.isVisible()) {
    await minSumInput.fill(String(minSum));
  }

  // Save form
  const saveBtn = page.locator('button[type="submit"], input[type="submit"], button:has-text("Zapisz")').first();
  if (await saveBtn.isVisible()) {
    await saveBtn.click();
    await page.waitForTimeout(2000);
  }

  console.log(`   Zapisano kupon ${code}. URL: ${page.url()}`);
}

async function run() {
  console.log('🚀 Rozpoczynanie automatyzacji Fazy 1 w panelu Shoper Admin...');
  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  await page.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'networkidle' });

  if (await page.locator('input[name="login"]').isVisible()) {
    console.log(`Wprowadzanie danych logowania dla konta: ${user}...`);
    await page.locator('input[name="login"]').fill(user);
    await page.locator('input[name="password"]').fill(pass);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(3000);
  }

  const codeInput = page.locator('#code, input[name="code"]');
  if (await codeInput.isVisible()) {
    console.log('📧 Oczekiwanie na zapis kody 2FA w scratch_code.txt (max 120s)...');
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
      console.error('❌ Czas oczekiwania na kod minął.');
      await context.close();
      process.exit(1);
    }

    console.log(`🔑 Wprowadzanie kodu 2FA: ${code}...`);
    await codeInput.fill(code);
    const submitBtn = page.locator('button:has-text("Weryfikuj"), button[type="submit"]').first();
    await submitBtn.click();
    await page.waitForTimeout(5000);
  }

  console.log(`🎉 Zalogowano! URL: ${page.url()}`);

  // 1. Inspect /admin/coupons/add form fields
  console.log('--- Inspecting /admin/coupons/add ---');
  await page.goto('https://sklep562393.shoparena.pl/admin/coupons/add', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/coupon-add-form.png') });
  
  const formInputs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input, select, textarea')).map(i => ({
      name: i.getAttribute('name'),
      id: i.getAttribute('id'),
      type: i.getAttribute('type'),
      tagName: i.tagName,
      value: i.value
    }));
  });
  console.log('Form inputs on /admin/coupons/add:');
  console.log(JSON.stringify(formInputs, null, 2));

  // 2. Inspect Shoper CLI tab / page
  console.log('--- Inspecting /admin/configSkins ---');
  await page.goto('https://sklep562393.shoparena.pl/admin/configSkins', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/skins-page.png') });
  const skinLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') }));
  });
  console.log('Skin page links:');
  console.log(JSON.stringify(skinLinks.filter(l => l.href && (l.href.includes('cli') || l.href.includes('skin') || l.href.includes('edit'))), null, 2));

  await context.close();
}

run().catch(err => {
  console.error('Błąd:', err);
  process.exit(1);
});
