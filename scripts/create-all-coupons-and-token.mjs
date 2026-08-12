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

async function run() {
  console.log('🚀 Wykonywanie tworzenia kuponów i pobierania tokena CLI w aktywnej sesji...');
  const sessionDir = path.resolve(__dirname, '.browser_session');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  const page = context.pages()[0] || await context.newPage();

  // Ensure logged in
  await page.goto('https://sklep562393.shoparena.pl/admin/dashboard', { waitUntil: 'networkidle' });
  console.log(`Pulpit URL: ${page.url()}`);

  // STEP 1: Shoper CLI Token
  console.log('--- Step 1: Shoper CLI Token ---');
  await page.goto('https://sklep562393.shoparena.pl/admin/admin/edit/id/4', { waitUntil: 'networkidle' });
  const genBtn = page.locator('button:has-text("Wygeneruj token"), a:has-text("Wygeneruj token")').first();
  if (await genBtn.isVisible()) {
    console.log('Klikam "Wygeneruj token"...');
    await genBtn.click();
    await page.waitForTimeout(3000);
  }
  await page.screenshot({ path: path.resolve(__dirname, '../docs/screenshots/cli-token-page.png') });

  // Read generated token from page or modal
  const tokenVal = await page.evaluate(() => {
    const modal = document.querySelector('.dialog, .modal, .popover, .overlay, .box_layer');
    if (modal) {
      const code = modal.querySelector('input, textarea, code, pre');
      if (code) return code.value || code.innerText;
    }
    const tokenInput = document.querySelector('input[name*="token"], #token, .token-input');
    if (tokenInput) return tokenInput.value;
    return null;
  });

  if (tokenVal && tokenVal !== 'admin') {
    console.log(`🔑 Wygenerowany token CLI: ${tokenVal}`);
    updateEnvLocal('SHOPER_CLI_TOKEN', tokenVal);
  } else {
    console.log('Sprawdzanie tekstu po wygenerowaniu tokena...');
    const bodyText = await page.locator('body').innerText();
    const tokenMatch = bodyText.match(/[a-zA-Z0-9_\-]{32,}/);
    if (tokenMatch) {
      console.log(`Dopasowano token z treści strony: ${tokenMatch[0]}`);
      updateEnvLocal('SHOPER_CLI_TOKEN', tokenMatch[0]);
    }
  }

  // STEP 2: Create 3 Coupons
  console.log('--- Step 2: Creating 3 Coupons ---');
  const coupons = [
    { code: 'PLYNDO-PACK-4', discount: 20, minSum: 0 },
    { code: 'PLYNDO-PACK-8', discount: 30, minSum: 150 },
    { code: 'PLYNDO-PACK-12', discount: 40, minSum: 230 }
  ];

  for (const c of coupons) {
    console.log(`➕ Tworzenie kuponu: ${c.code} (${c.discount}%, min. ${c.minSum} zł)...`);
    await page.goto('https://sklep562393.shoparena.pl/admin/promoCodes/add', { waitUntil: 'networkidle' });

    // 1. Code
    const codeInput = page.locator('input[name="code"]').first();
    await codeInput.fill(c.code);

    // 2. Select discount_type radio (percentage)
    const percRadio = page.locator('#discount_type_1, input[name="discount_type"][value="1"]').first();
    if (await percRadio.isVisible()) {
      await percRadio.check({ force: true });
    }

    // 3. Discount percentage value
    const discountValInputs = page.locator('input[name="discount_value"]');
    for (let i = 0; i < await discountValInputs.count(); i++) {
      const input = discountValInputs.nth(i);
      if (await input.isVisible().catch(() => false)) {
        await input.fill(String(c.discount));
        break;
      }
    }

    // 4. Minimum order sum limit
    if (c.minSum > 0) {
      const valLimitCheckbox = page.locator('#value_limit, input[name="value_limit"]').first();
      if (await valLimitCheckbox.isVisible()) {
        await valLimitCheckbox.check({ force: true });
      }
      const minAmountInput = page.locator('#min_amount, input[name="min_amount"]').first();
      if (await minAmountInput.isVisible()) {
        await minAmountInput.fill(String(c.minSum));
      }
    }

    // 5. Submit form
    const saveBtn = page.locator('button[type="submit"], input[type="submit"]').first();
    await saveBtn.click();
    await page.waitForTimeout(2500);
    console.log(`   Zapisano kupon ${c.code}! Aktualny URL: ${page.url()}`);
    await page.screenshot({ path: path.resolve(__dirname, `../docs/screenshots/coupon-${c.code}-saved.png`) });
  }

  await context.close();
}

run().catch(err => {
  console.error('Błąd:', err);
  process.exit(1);
});
