/**
 * @file shoper-session-manager.mjs
 * @description Moduł pomocniczy do zarządzania sesją przeglądarki Playwright z ponownym użyciem ciasteczek i trwałego kontekstu.
 * @requirements Node.js, Playwright.
 */

import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cookiesPath = path.resolve(__dirname, 'admin-cookies.json');
const sessionDir = path.resolve(__dirname, '.browser_session');

export async function getAuthenticatedPage() {
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: false,
    viewport: { width: 1440, height: 900 }
  });

  if (fs.existsSync(cookiesPath)) {
    const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf8'));
    await context.addCookies(cookies);
  }

  const page = context.pages().length ? context.pages()[0] : await context.newPage();
  return { context, page };
}

export async function saveCookies(context) {
  const cookies = await context.cookies();
  fs.writeFileSync(cookiesPath, JSON.stringify(cookies, null, 2));
  console.log(`💾 Zapisano ${cookies.length} ciasteczek do ${cookiesPath}`);
}
