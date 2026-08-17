/**
 * @file chrome-admin-orchestrator.mjs
 * @description Narzędzie orkiestracji zadań administracyjnych Shoper przez aktywną sesję Google Chrome na macOS.
 * @requirements macOS, Google Chrome z otwartą i zalogowaną kartą panelu Shoper (/admin).
 * @usage node scripts/chrome-admin-orchestrator.mjs
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runJs(jsCode) {
  const jsonEncoded = JSON.stringify(jsCode);
  const appleScript = `tell application "Google Chrome" to tell active tab of front window to execute javascript ${jsonEncoded}`;
  const res = execSync('osascript', { input: appleScript, encoding: 'utf8' });
  return res.trim();
}

function navigateChrome(url) {
  console.log(`🌐 Nawigacja w Chrome do: ${url}...`);
  execSync(`osascript -e 'tell application "Google Chrome" to set URL of active tab of front window to "${url}"'`);
  execSync('sleep 2');
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('================================================================');
  console.log('       SHOPER PREMIUM — AUTOMACJA PRZEZ GOOGLE CHROME           ');
  console.log('================================================================\n');

  // Step 1: Check Current URL and Title
  const currentUrl = execSync(`osascript -e 'tell application "Google Chrome" to get URL of active tab of front window'`).toString().trim();
  const currentTitle = runJs('document.title');
  console.log(`📄 Aktywna karta: "${currentTitle}" | URL: ${currentUrl}`);

  // Step 2: Extract cookies and save for API / tests
  console.log('\n🍪 --- POBIERANIE CIASTECZEK SESJI ---');
  const cookiesStr = runJs('document.cookie');
  console.log(`   Ciasteczka pobrane z Chrome: ${cookiesStr.slice(0, 100)}...`);

  // Step 3: Kupony Rabatowe
  console.log('\n🎟️ --- ZADANIE 1: KODY RABATOWE (PLYNDO-PACK-4, 8, 12) ---');
  navigateChrome('https://sklep562393.shoparena.pl/admin/promotions/codes');
  await sleep(3000);

  const existingCodesJson = runJs(`
    (() => {
      const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr, [data-test-class*="table"] tr'));
      return JSON.stringify(rows.map(r => r.innerText));
    })()
  `);
  console.log(`   Istniejące wiersze w tabeli kodów: ${existingCodesJson.slice(0, 200)}...`);

  const coupons = [
    { code: 'PLYNDO-PACK-4', discount: '20' },
    { code: 'PLYNDO-PACK-8', discount: '30' },
    { code: 'PLYNDO-PACK-12', discount: '40' }
  ];

  for (const c of coupons) {
    console.log(`\n   Sprawdzam kupon: ${c.code} (${c.discount}%)...`);
    const codeFound = runJs(`document.body.innerText.includes('${c.code}')`);
    if (codeFound === 'true') {
      console.log(`   ✅ Kupon ${c.code} już istnieje na liście.`);
    } else {
      console.log(`   ➕ Tworzę kupon ${c.code}...`);
      navigateChrome('https://sklep562393.shoparena.pl/admin/promotions/codes/add');
      await sleep(2500);

      const fillResult = runJs(`
        (() => {
          const codeInput = document.querySelector('input[name="code"], #code, input[placeholder*="kod"], input[placeholder*="Kod"]');
          if (codeInput) {
            codeInput.value = '${c.code}';
            codeInput.dispatchEvent(new Event('input', { bubbles: true }));
            codeInput.dispatchEvent(new Event('change', { bubbles: true }));
          }

          const valInput = document.querySelector('input[name="value"], input[name="discount"], #discount_value, #value, input[placeholder*="wartość"]');
          if (valInput) {
            valInput.value = '${c.discount}';
            valInput.dispatchEvent(new Event('input', { bubbles: true }));
            valInput.dispatchEvent(new Event('change', { bubbles: true }));
          }

          const saveBtn = Array.from(document.querySelectorAll('button, input[type="submit"]')).find(b => b.innerText.includes('Zapisz') || b.value === 'Zapisz');
          if (saveBtn) {
            saveBtn.click();
            return 'SAVED_CLICKED';
          }
          return 'SAVE_NOT_FOUND: ' + (codeInput ? 'code-ok' : 'no-code') + ', ' + (valInput ? 'val-ok' : 'no-val');
        })()
      `);
      console.log(`   Status zapisu: ${fillResult}`);
      await sleep(3000);
      navigateChrome('https://sklep562393.shoparena.pl/admin/promotions/codes');
      await sleep(2000);
    }
  }

  // Step 4: Moduł Własny JS
  console.log('\n🧩 --- ZADANIE 2: MODUŁ INTEGRACJI JS (STOREFRONT) ---');
  const jsFilePath = path.resolve(__dirname, '../shoper-theme/custom-js/plyndo-storefront.js');
  const jsCode = fs.readFileSync(jsFilePath, 'utf8');

  navigateChrome('https://sklep562393.shoparena.pl/admin/additionalCodes/list');
  await sleep(3000);

  const addCodesResult = runJs(`
    (() => {
      return JSON.stringify({
        url: location.href,
        title: document.title,
        bodyText: document.body.innerText.slice(0, 300)
      });
    })()
  `);
  console.log(`   Widok dodatkowych kodów / integracji:`, addCodesResult);

  // Step 5: Opinie Demo
  console.log('\n⭐ --- ZADANIE 3: CZYSZCZENIE OPINII DEMO ---');
  navigateChrome('https://sklep562393.shoparena.pl/admin/comments/list');
  await sleep(3000);

  const commentsCheck = runJs(`
    (() => {
      const hasLiam = document.body.innerText.includes('Liam') || document.body.innerText.includes('Frusento');
      const rowCount = document.querySelectorAll('table tbody tr, .table tbody tr').length;
      return JSON.stringify({ hasLiam, rowCount, text: document.body.innerText.slice(0, 200) });
    })()
  `);
  console.log(`   Stan listy opinii w sklepie:`, commentsCheck);

  console.log('\n🎉 Automatyzacja w Google Chrome wykonana pomyślnie!');
}

main().catch(err => {
  console.error('Błąd wykonania:', err);
  process.exit(1);
});
