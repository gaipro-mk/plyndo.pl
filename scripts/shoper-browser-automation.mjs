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

export async function runBrowserAutomation(options = {}) {
  const isHeadless = options.headless !== false;
  const isAdminMode = options.admin === true;
  const targetUrl = options.url || (isAdminMode ? 'https://sklep562393.shoparena.pl/admin' : 'https://sklep.plyndo.pl/');
  const screenshotName = options.screenshot || `screenshot-${Date.now()}.png`;
  const screenshotPath = path.resolve(screenshotsDir, screenshotName);

  console.log(`🚀 Uruchamianie automatyzacji przeglądarki...`);
  console.log(`   URL: ${targetUrl}`);
  console.log(`   Tryb: ${isAdminMode ? 'PANEL ADMINISTRACYJNY (WEB)' : 'SKLEP FRONTEND'}`);

  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: isHeadless,
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = context.pages().length ? context.pages()[0] : await context.newPage();

  try {
    console.log(`🌐 Nawigacja do: ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log(`📄 Tytuł: "${await page.title()}" | URL: ${page.url()}`);

    if (isAdminMode) {
      const user = process.env.SHOPER_WEB_ADMIN_USER || process.env.SHOPER_API_USER || '';
      const pass = process.env.SHOPER_WEB_ADMIN_PASSWORD || process.env.SHOPER_API_PASSWORD || '';
      const verificationCode = options.code;

      const loginInput = page.locator('input[name="login"], input[name="user_login"], #user_login').first();
      const passInput = page.locator('input[name="password"], input[name="user_password"], #user_password').first();

      // Step 1: If login form is present, fill user/pass and submit
      if (await loginInput.isVisible({ timeout: 2000 }).catch(() => false)) {
        console.log(`🔑 Formularz logowania widoczny - wprowadzam konto: ${user}`);
        await loginInput.fill(user);
        await passInput.fill(pass);

        const submitBtn = page.locator('button[type="submit"], input[type="submit"]').first();
        if (await submitBtn.isVisible().catch(() => false)) {
          console.log('   Wysyłam formularz logowania...');
          await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {}),
            submitBtn.click()
          ]);
        } else {
          await page.keyboard.press('Enter');
          await page.waitForTimeout(3000);
        }
        console.log(`📄 Po zaimplementowaniu loginu - URL: ${page.url()}`);
      }

      // Step 2: Check for 2FA OTP code input
      const otpInput = page.locator('input[name="code"], input[name="verification_code"], input[placeholder*="weryfikacyjny"], #code, #otp, input[type="text"]').first();
      const isOtpScreen = (await otpInput.isVisible({ timeout: 3000 }).catch(() => false)) || page.url().includes('mail-otp');

      if (isOtpScreen) {
        console.log('📧 Wykryto ekran weryfikacji 2FA.');

        if (verificationCode) {
          console.log(`🔑 Wprowadzam podany kod 2FA: ${verificationCode}`);
          await otpInput.fill(verificationCode);
          await page.waitForTimeout(300);

          const verifyBtn = page.locator('button:has-text("Weryfikuj"), button:has-text("Zaloguj"), button[type="submit"]').first();
          if (await verifyBtn.isVisible().catch(() => false)) {
            console.log('   Klikam "Weryfikuj"...');
            await Promise.all([
              page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }).catch(() => {}),
              verifyBtn.click()
            ]);
          } else {
            await page.keyboard.press('Enter');
            await page.waitForTimeout(4000);
          }
          console.log(`📄 Po weryfikacji 2FA - Tytuł: "${await page.title()}" | URL: ${page.url()}`);
        } else {
          console.log(`📌 Oczekuję na kod 2FA e-mail z konta ${user}. Podaj kod w czacie!`);
          const adminShot = path.resolve(screenshotsDir, `shoper-admin-waiting-2fa.png`);
          await page.screenshot({ path: adminShot, fullPage: false });
          await context.close();
          return { title: await page.title().catch(() => ''), url: page.url(), waitingFor2FA: true };
        }
      }

      // Final Dashboard check
      const isDashboard = !page.url().includes('/auth') && !page.url().includes('/login');
      if (isDashboard) {
        console.log(`🎉 Pomyślnie zalogowano w przeglądarce do Panelu Shoper Admin kontem ${user}!`);
        const adminShot = path.resolve(screenshotsDir, `shoper-admin-dashboard-SUCCESS.png`);
        await page.screenshot({ path: adminShot, fullPage: false });
        console.log(`📸 Zapisano zrzut ekranu pulpitu: ${adminShot}`);
      } else {
        const adminShot = path.resolve(screenshotsDir, `shoper-admin-status-${Date.now()}.png`);
        await page.screenshot({ path: adminShot, fullPage: false });
        console.log(`📸 Zapisano zrzut ekranu statusu: ${adminShot}`);
      }
    }

    if (options.testCart) {
      console.log('🛒 Testowanie koszyka...');
      const cartUrl = `https://sklep.plyndo.pl/?add=182:10,183:2&promo=PlynDo_x12`;
      await page.goto(cartUrl, { waitUntil: 'networkidle', timeout: 30000 });
      const cartScreenshot = path.resolve(screenshotsDir, `cart-handoff-${Date.now()}.png`);
      await page.screenshot({ path: cartScreenshot, fullPage: true });
      console.log(`📸 Zapisano zrzut ekranu koszyka: ${cartScreenshot}`);
    }

    await context.close();
    return { title: await page.title().catch(() => ''), url: page.url() };
  } catch (err) {
    console.error('❌ Błąd automatyzacji przeglądarki:', err.message);
    await context.close().catch(() => {});
    throw err;
  }
}

if (process.argv[1] && process.argv[1].endsWith('shoper-browser-automation.mjs')) {
  const args = process.argv.slice(2);
  const options = {
    headless: !args.includes('--headful'),
    testCart: args.includes('--test-cart'),
    admin: args.includes('--admin')
  };

  const codeIdx = args.indexOf('--code');
  if (codeIdx !== -1 && args[codeIdx + 1]) {
    options.code = args[codeIdx + 1];
  }

  const urlIdx = args.indexOf('--url');
  if (urlIdx !== -1 && args[urlIdx + 1]) {
    options.url = args[urlIdx + 1];
  }

  runBrowserAutomation(options)
    .then(() => console.log('✅ Automatyzacja zakończona sukcesem!'))
    .catch(() => process.exit(1));
}
