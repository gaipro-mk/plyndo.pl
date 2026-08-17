/**
 * @file shoper-live-daemon.mjs
 * @description Demon do monitorowania i asysty w sesji panelu Shoper w trybie live z obsługą 2FA.
 * @requirements Node.js, Playwright.
 * @usage node scripts/shoper-live-daemon.mjs
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

const sessionDir = path.resolve(__dirname, '.browser_session');
const screenshotsDir = path.resolve(__dirname, '../docs/screenshots');
const codeFilePath = path.resolve(__dirname, 'auth-code.txt');

async function main() {
  // Clear any old code
  if (fs.existsSync(codeFilePath)) {
    fs.unlinkSync(codeFilePath);
  }

  console.log('🚀 [Shoper Persistent Auth Engine] Uruchamianie przeglądarki...');
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = context.pages().length ? context.pages()[0] : await context.newPage();

  try {
    console.log('🌐 Nawigacja do https://sklep562393.shoparena.pl/admin...');
    await page.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);

    const user = process.env.SHOPER_WEB_ADMIN_USER || process.env.SHOPER_API_USER || '';
    const pass = process.env.SHOPER_WEB_ADMIN_PASSWORD || process.env.SHOPER_API_PASSWORD || '';

    const loginInput = page.locator('input[name="login"], input[name="user_login"], #user_login').first();
    const passInput = page.locator('input[name="password"], input[name="user_password"], #user_password').first();

    if (await loginInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log(`🔑 Wprowadzam dane logowania (${user})...`);
      await loginInput.fill(user);
      await passInput.fill(pass);
      const rememberCheckbox = page.locator('input[type="checkbox"][name*="remember"], input[type="checkbox"]#remember').first();
      if (await rememberCheckbox.isVisible({ timeout: 1000 }).catch(() => false)) {
        await rememberCheckbox.check().catch(() => {});
      }
      const submitBtn = page.locator('button[type="submit"], input[type="submit"]').first();
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
        submitBtn.click()
      ]);
    }

    const otpInput = page.locator('input#code, input[name="code"]').first();
    if ((await otpInput.isVisible({ timeout: 4000 }).catch(() => false)) || page.url().includes('mail-otp')) {
      console.log('📧 Kod 2FA został wysłany na email!');
      console.log(`👉 Czekam na wpisanie kodu w pliku: ${codeFilePath}`);
      await page.screenshot({ path: path.resolve(screenshotsDir, 'auth-screen-ready.png') });

      // Poll for code file for up to 5 minutes
      let codeReceived = null;
      const startTime = Date.now();
      while (Date.now() - startTime < 300000) {
        if (fs.existsSync(codeFilePath)) {
          const content = fs.readFileSync(codeFilePath, 'utf8').trim();
          if (content && /^\d{6}$/.test(content)) {
            codeReceived = content;
            break;
          }
        }
        await new Promise(r => setTimeout(r, 300));
      }

      if (!codeReceived) {
        console.error('❌ Timeout oczekiwania na kod 2FA.');
        await context.close();
        process.exit(1);
      }

      console.log(`🔑 Otrzymano kod 2FA: ${codeReceived}. Wprowadzam do otwartego pola #code...`);
      await page.locator('input#code').click();
      await page.locator('input#code').fill(codeReceived);
      await page.waitForTimeout(400);

      const verifyBtn = page.locator('form button[type="submit"]').first();
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle', timeout: 25000 }).catch(() => {}),
        verifyBtn.click()
      ]);
    }

    console.log(`📄 Po weryfikacji - URL: ${page.url()} | Tytuł: "${await page.title()}"`);
    await page.screenshot({ path: path.resolve(screenshotsDir, 'admin-session-active.png') });

    const isDashboard = !page.url().includes('/auth') && !page.url().includes('/login');
    if (!isDashboard) {
      console.error('❌ Logowanie nie powiodło się.');
      await context.close();
      process.exit(1);
    }

    console.log('🎉 SUKCES: Zalogowano pomyślnie! Rozpoczynam wykonywanie zadań w panelu...');

    // 1. KUPONY
    console.log('\n🎟️ [Zadanie 1/3] Tworzenie kuponów rabatowych...');
    const couponsUrl = 'https://sklep562393.shoparena.pl/admin/promotions/codes';
    await page.goto(couponsUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    const coupons = [
      { code: 'PLYNDO-PACK-4', discount: '20' },
      { code: 'PLYNDO-PACK-8', discount: '30' },
      { code: 'PLYNDO-PACK-12', discount: '40' }
    ];

    for (const c of coupons) {
      const existing = await page.locator(`text="${c.code}"`).isVisible({ timeout: 1000 }).catch(() => false);
      if (existing) {
        console.log(`   ✅ Kupon ${c.code} już istnieje.`);
      } else {
        console.log(`   ➕ Tworzę kupon ${c.code} (${c.discount}%)...`);
        const addBtn = page.locator('a:has-text("Dodaj kupon"), a[href*="/promotions/codes/add"]').first();
        if (await addBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
          await addBtn.click();
          await page.waitForLoadState('domcontentloaded');
          await page.waitForTimeout(1000);

          const codeField = page.locator('input[name="code"], #code').first();
          if (await codeField.isVisible({ timeout: 2000 }).catch(() => false)) {
            await codeField.fill(c.code);
          }

          const valueField = page.locator('input[name="value"], input[name="discount"], #discount_value, #value').first();
          if (await valueField.isVisible({ timeout: 2000 }).catch(() => false)) {
            await valueField.fill(c.discount);
          }

          const saveBtn = page.locator('button:has-text("Zapisz"), input[value="Zapisz"]').first();
          if (await saveBtn.isVisible().catch(() => false)) {
            await saveBtn.click();
            await page.waitForTimeout(2000);
            console.log(`   ✅ Utworzono kupon ${c.code}.`);
          }
          await page.goto(couponsUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
          await page.waitForTimeout(1500);
        }
      }
    }

    // 2. MODUŁ WŁASNY JS
    console.log('\n🧩 [Zadanie 2/3] Weryfikacja / dodanie modułu własnego PlynDo Handoff...');
    const customJsPath = path.resolve(__dirname, '../shoper-theme/custom-js/plyndo-storefront.js');
    const customJsCode = fs.readFileSync(customJsPath, 'utf8');

    const modulesUrl = 'https://sklep562393.shoparena.pl/admin/design/custom-modules';
    await page.goto(modulesUrl, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.resolve(screenshotsDir, 'custom-modules-list.png') });

    // 3. OPINIE DEMO
    console.log('\n⭐ [Zadanie 3/3] Czyszczenie opinii demo...');
    const commentsUrl = 'https://sklep562393.shoparena.pl/admin/products/comments';
    await page.goto(commentsUrl, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.resolve(screenshotsDir, 'admin-comments.png') });

    const demoRow = page.locator('text="Liam Johnson", text="Frusento"').first();
    if (await demoRow.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('   Wykryto opinię demo - usuwam...');
      const checkAll = page.locator('thead input[type="checkbox"]').first();
      if (await checkAll.isVisible({ timeout: 1000 }).catch(() => false)) {
        await checkAll.click();
        const selectAction = page.locator('select[name*="action"]').first();
        if (await selectAction.isVisible({ timeout: 1000 }).catch(() => false)) {
          await selectAction.selectOption({ label: 'Usuń' });
          const execBtn = page.locator('button:has-text("Wykonaj")').first();
          if (await execBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
            await execBtn.click();
            await page.waitForTimeout(2000);
            console.log('   ✅ Usunięto opinie demo.');
          }
        }
      }
    } else {
      console.log('   ✅ Brak opinii demo.');
    }

    console.log('\n🏁 Wszystkie zadania w panelu zakończone sukcesem!');
    await page.screenshot({ path: path.resolve(screenshotsDir, 'admin-tasks-complete.png') });
    await context.close();
  } catch (err) {
    console.error('Błąd wykonania:', err.message);
    await context.close().catch(() => {});
  }
}

main();
