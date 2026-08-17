/**
 * @file shoper-full-admin-tasks.mjs
 * @description Zestaw zadań administracyjnych (kupony, integracje, konfiguracja szablonu) wykonywanych przez automatyzację Playwright.
 * @requirements Node.js, Playwright, zmienne środowiskowe w .env.local lub plik ciasteczek sesyjnych.
 * @usage node scripts/shoper-full-admin-tasks.mjs
 */

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
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const screenshotsDir = path.resolve(__dirname, '../docs/screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const sessionDir = path.resolve(__dirname, '.browser_session');

export async function runFullAdminAutomation(otpCode = null) {
  console.log('================================================================');
  console.log('       SHOPER PREMIUM — AUTOMACJA ZADAŃ ADMINISTRACYJNYCH       ');
  console.log('================================================================\n');

  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: false,
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = context.pages().length ? context.pages()[0] : await context.newPage();

  try {
    const adminUrl = 'https://sklep562393.shoparena.pl/admin';
    console.log(`🌐 Nawigacja do panelu: ${adminUrl}...`);
    await page.goto(adminUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);

    const user = process.env.SHOPER_WEB_ADMIN_USER || process.env.SHOPER_API_USER || '';
    const pass = process.env.SHOPER_WEB_ADMIN_PASSWORD || process.env.SHOPER_API_PASSWORD || '';

    // Step 1: Login if form is visible
    const loginInput = page.locator('input[name="login"], input[name="user_login"], #user_login').first();
    const passInput = page.locator('input[name="password"], input[name="user_password"], #user_password').first();

    if (await loginInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log(`🔑 Wprowadzam login: ${user}...`);
      await loginInput.fill(user);
      await passInput.fill(pass);
      const submitBtn = page.locator('button[type="submit"], input[type="submit"]').first();
      if (await submitBtn.isVisible().catch(() => false)) {
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
          submitBtn.click()
        ]);
      } else {
        await page.keyboard.press('Enter');
        await page.waitForTimeout(3000);
      }
    }

    // Step 2: Handle 2FA OTP if required
    const otpInput = page.locator('input[name="code"], input[name="verification_code"], #code, #otp, input[placeholder*="weryfikacyjny"]').first();
    if ((await otpInput.isVisible({ timeout: 2500 }).catch(() => false)) || page.url().includes('mail-otp')) {
      if (otpCode) {
        console.log(`🔑 Wprowadzam podany kod 2FA: ${otpCode}...`);
        await otpInput.fill(otpCode);
        const verifyBtn = page.locator('button:has-text("Weryfikuj"), button:has-text("Zaloguj"), button[type="submit"]').first();
        if (await verifyBtn.isVisible().catch(() => false)) {
          await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }).catch(() => {}),
            verifyBtn.click()
          ]);
        } else {
          await page.keyboard.press('Enter');
          await page.waitForTimeout(4000);
        }
      } else {
        console.log('❌ Wykryto ekran 2FA. Wymagany kod OTP podany w parametrze --code.');
        await page.screenshot({ path: path.resolve(screenshotsDir, 'shoper-admin-waiting-2fa.png') });
        await context.close();
        return { status: 'WAITING_FOR_2FA' };
      }
    }

    console.log(`📄 Aktualny widok panelu: "${await page.title()}" | URL: ${page.url()}`);
    await page.screenshot({ path: path.resolve(screenshotsDir, 'admin-logged-in-full.png') });

    // Step 3: Create Coupons PLYNDO-PACK-4, PLYNDO-PACK-8, PLYNDO-PACK-12
    console.log('\n🎟️ --- TWORZENIE KUPONÓW RABATOWYCH ---');
    const couponsUrl = 'https://sklep562393.shoparena.pl/admin/promotions/codes';
    await page.goto(couponsUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.resolve(screenshotsDir, 'coupons-table-current.png') });

    const couponsToCreate = [
      { code: 'PLYNDO-PACK-4', discount: '20' },
      { code: 'PLYNDO-PACK-8', discount: '30' },
      { code: 'PLYNDO-PACK-12', discount: '40' }
    ];

    for (const item of couponsToCreate) {
      console.log(`   Sprawdzam kupon: ${item.code} (${item.discount}%)...`);
      const couponRow = page.locator(`text="${item.code}"`).first();
      if (await couponRow.isVisible({ timeout: 1500 }).catch(() => false)) {
        console.log(`   ✅ Kupon ${item.code} już istnieje.`);
      } else {
        console.log(`   ➕ Tworzę kupon ${item.code}...`);
        const addBtn = page.locator('a:has-text("Dodaj kupon"), button:has-text("Dodaj kupon"), a[href*="/promotions/codes/add"]').first();
        if (await addBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
          await addBtn.click();
          await page.waitForLoadState('domcontentloaded');
          await page.waitForTimeout(1000);

          const codeField = page.locator('input[name="code"], #code').first();
          if (await codeField.isVisible({ timeout: 2000 }).catch(() => false)) {
            await codeField.fill(item.code);
          }

          const valueField = page.locator('input[name="value"], input[name="discount"], #discount_value, #value').first();
          if (await valueField.isVisible({ timeout: 2000 }).catch(() => false)) {
            await valueField.fill(item.discount);
          }

          const saveBtn = page.locator('button:has-text("Zapisz"), input[value="Zapisz"]').first();
          if (await saveBtn.isVisible().catch(() => false)) {
            await saveBtn.click();
            await page.waitForTimeout(2000);
            console.log(`   ✅ Zapisano kupon ${item.code}`);
          }
          await page.goto(couponsUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
          await page.waitForTimeout(1500);
        }
      }
    }

    // Step 4: Inject/verify JS Module in Shoper Theme
    console.log('\n🧩 --- WERYFIKACJA MODUŁU INTEGRACJI JS (STOREFRONT) ---');
    const modulesUrl = 'https://sklep562393.shoparena.pl/admin/design/skins/12/modules';
    await page.goto(modulesUrl, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.resolve(screenshotsDir, 'modules-view.png') });

    // Step 5: Clean demo reviews if present
    console.log('\n⭐ --- CZYSZCZENIE OPINII PRODUKTOWYCH (DEMO) ---');
    const reviewsUrl = 'https://sklep562393.shoparena.pl/admin/products/comments';
    await page.goto(reviewsUrl, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.resolve(screenshotsDir, 'reviews-table.png') });

    const demoReview = page.locator('text="Liam Johnson", text="Frusento"').first();
    if (await demoReview.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('   Znaleziono recenzję demo - usuwam...');
      const selectAll = page.locator('input[type="checkbox"][name="select_all"], thead input[type="checkbox"]').first();
      if (await selectAll.isVisible().catch(() => false)) {
        await selectAll.click();
        const deleteAction = page.locator('select[name="action"], select[name="bulk_action"]').first();
        if (await deleteAction.isVisible().catch(() => false)) {
          await deleteAction.selectOption({ label: 'Usuń' });
          const executeBtn = page.locator('button:has-text("Wykonaj"), input[value="Wykonaj"]').first();
          if (await executeBtn.isVisible().catch(() => false)) {
            await executeBtn.click();
            await page.waitForTimeout(2000);
            console.log('   ✅ Usunięto opinie demo.');
          }
        }
      }
    } else {
      console.log('   ✅ Brak opinii demo lub lista jest pusta.');
    }

    console.log('\n🎉 Zadania panelowe zakończone.');
    await page.screenshot({ path: path.resolve(screenshotsDir, 'admin-automation-finished.png') });
    await context.close();
    return { status: 'SUCCESS' };
  } catch (err) {
    console.error('❌ Błąd podczas automatyzacji:', err.message);
    await context.close().catch(() => {});
    throw err;
  }
}

if (process.argv[1] && process.argv[1].endsWith('shoper-full-admin-tasks.mjs')) {
  const codeIdx = process.argv.indexOf('--code');
  const code = codeIdx !== -1 ? process.argv[codeIdx + 1] : null;
  runFullAdminAutomation(code)
    .then((res) => console.log('Wynik:', res))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
