/**
 * @file shoper-live-login.mjs
 * @description Skrypt interaktywnego logowania do panelu Shoper przez przeglądarkę Playwright z obsługą 2FA/SMS i zapisem ciasteczek sesyjnych.
 * @requirements Node.js, Playwright.
 * @usage node scripts/shoper-live-login.mjs
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

async function main() {
  const code = process.argv[2];
  console.log(`[Shoper Auth] Próba logowania z kodem: ${code || '(brak - generowanie nowego zapytania OTP)'}`);

  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = context.pages().length ? context.pages()[0] : await context.newPage();

  try {
    await page.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    const user = process.env.SHOPER_WEB_ADMIN_USER || process.env.SHOPER_API_USER || '';
    const pass = process.env.SHOPER_WEB_ADMIN_PASSWORD || process.env.SHOPER_API_PASSWORD || '';

    const loginInput = page.locator('input[name="login"], input[name="user_login"], #user_login').first();
    const passInput = page.locator('input[name="password"], input[name="user_password"], #user_password').first();

    if (await loginInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log(`[Shoper Auth] Wprowadzam dane logowania: ${user}`);
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

    const otpInput = page.locator('input[type="text"]').first();
    if ((await otpInput.isVisible({ timeout: 3000 }).catch(() => false)) || page.url().includes('mail-otp')) {
      if (code) {
        console.log(`[Shoper Auth] Wpisuję kod OTP: ${code}`);
        await otpInput.fill(code);
        await page.waitForTimeout(300);

        const rememberDevice = page.locator('input[type="checkbox"]').first();
        if (await rememberDevice.isVisible({ timeout: 1000 }).catch(() => false)) {
          console.log('[Shoper Auth] Zaznaczam zapamiętanie urządzenia...');
          await rememberDevice.check().catch(() => {});
        }

        const verifyBtn = page.locator('button:has-text("Weryfikuj"), button[type="submit"]').first();
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }).catch(() => {}),
          verifyBtn.click()
        ]);
        console.log(`[Shoper Auth] Po zatwierdzeniu URL: ${page.url()} | Tytuł: "${await page.title()}"`);
      } else {
        console.log('[Shoper Auth] Wygenerowano nowy kod OTP. Sprawdź najnowszą wiadomość e-mail.');
      }
    }

    await page.screenshot({ path: path.resolve(screenshotsDir, 'auth-latest-state.png') });
    const isDashboard = !page.url().includes('/auth') && !page.url().includes('/login');
    if (isDashboard) {
      console.log('🎉 SUKCES: Zalogowano do panelu! Sesja została trwale zapisana w .browser_session');
    } else {
      console.log('⏳ Wymagany najnowszy kod 2FA z e-maila.');
    }

    await context.close();
  } catch (err) {
    console.error('Błąd:', err.message);
    await context.close().catch(() => {});
  }
}

main();
