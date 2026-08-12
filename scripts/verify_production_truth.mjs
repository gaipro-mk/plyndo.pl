import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runVerification() {
  console.log('================================================================================');
  console.log('                 PŁYN DO — VERIFY PRODUCTION TRUTH (PROMPT v3)                 ');
  console.log('================================================================================\n');

  const results = [];

  function recordResult(name, expected, received, passed) {
    results.push({
      name,
      expected: String(expected),
      received: String(received),
      status: passed ? 'PASS' : 'FAIL'
    });
  }

  // --- T1: Kupon 4 ---
  try {
    const getRes = await fetch('https://sklep.plyndo.pl/api/basket');
    const cookie = getRes.headers.get('set-cookie');
    const data = await getRes.json();
    const basketId = data.basket?.id;

    const headers = {
      'Content-Type': 'application/json',
      ...(cookie ? { 'Cookie': cookie.split(';')[0] } : {})
    };

    for (const stockId of [182, 186, 189, 190]) {
      await fetch(`https://sklep.plyndo.pl/api/basket/${basketId}/item/${stockId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ quantity: 1 })
      });
    }

    const promoRes = await fetch(`https://sklep.plyndo.pl/api/basket/${basketId}/promo-code`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ promoCode: 'PLYNDO-PACK-4' })
    });
    const promoData = await promoRes.json();
    const basket = promoData.basket || {};

    const hasCode = basket.hasPromoCode === true;
    const discountVal = basket.discounts?.sum?.grossValue;
    const isValOk = typeof discountVal === 'number' && Math.abs(discountVal - 17.92) < 0.05;

    const pass = hasCode && isValOk;
    recordResult(
      'T1 — Kupon 4',
      'hasPromoCode=true & discount=17.92',
      `hasPromoCode=${basket.hasPromoCode}, discount=${discountVal ?? 'brak'}`,
      pass
    );
  } catch (err) {
    recordResult('T1 — Kupon 4', 'hasPromoCode=true & discount=17.92', `Błąd: ${err.message}`, false);
  }

  // --- T2: Kupon 8 ---
  try {
    const getRes = await fetch('https://sklep.plyndo.pl/api/basket');
    const cookie = getRes.headers.get('set-cookie');
    const data = await getRes.json();
    const basketId = data.basket?.id;

    const headers = {
      'Content-Type': 'application/json',
      ...(cookie ? { 'Cookie': cookie.split(';')[0] } : {})
    };

    for (const stockId of [182, 183, 184, 185, 186, 187, 188, 189]) {
      await fetch(`https://sklep.plyndo.pl/api/basket/${basketId}/item/${stockId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ quantity: 1 })
      });
    }

    const promoRes = await fetch(`https://sklep.plyndo.pl/api/basket/${basketId}/promo-code`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ promoCode: 'PLYNDO-PACK-8' })
    });
    const promoData = await promoRes.json();
    const basket = promoData.basket || {};

    const hasCode = basket.hasPromoCode === true;
    const discountVal = basket.discounts?.sum?.grossValue;
    const isValOk = typeof discountVal === 'number' && Math.abs(discountVal - 59.76) < 0.05;

    const pass = hasCode && isValOk;
    recordResult(
      'T2 — Kupon 8',
      'hasPromoCode=true & discount=59.76',
      `hasPromoCode=${basket.hasPromoCode}, discount=${discountVal ?? 'brak'}`,
      pass
    );
  } catch (err) {
    recordResult('T2 — Kupon 8', 'hasPromoCode=true & discount=59.76', `Błąd: ${err.message}`, false);
  }

  // --- T3: Kupon 12 ---
  try {
    const getRes = await fetch('https://sklep.plyndo.pl/api/basket');
    const cookie = getRes.headers.get('set-cookie');
    const data = await getRes.json();
    const basketId = data.basket?.id;

    const headers = {
      'Content-Type': 'application/json',
      ...(cookie ? { 'Cookie': cookie.split(';')[0] } : {})
    };

    for (let stockId = 182; stockId <= 193; stockId++) {
      await fetch(`https://sklep.plyndo.pl/api/basket/${basketId}/item/${stockId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ quantity: 1 })
      });
    }

    const promoRes = await fetch(`https://sklep.plyndo.pl/api/basket/${basketId}/promo-code`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ promoCode: 'PLYNDO-PACK-12' })
    });
    const promoData = await promoRes.json();
    const basket = promoData.basket || {};

    const hasCode = basket.hasPromoCode === true;
    const discountVal = basket.discounts?.sum?.grossValue;
    const isValOk = typeof discountVal === 'number' && Math.abs(discountVal - 123.52) < 0.05;

    const pass = hasCode && isValOk;
    recordResult(
      'T3 — Kupon 12',
      'hasPromoCode=true & discount=123.52',
      `hasPromoCode=${basket.hasPromoCode}, discount=${discountVal ?? 'brak'}`,
      pass
    );
  } catch (err) {
    recordResult('T3 — Kupon 12', 'hasPromoCode=true & discount=123.52', `Błąd: ${err.message}`, false);
  }

  // --- T4: Skrypt na sklepie ---
  try {
    const htmlRes = await fetch('https://sklep.plyndo.pl/');
    const html = await htmlRes.text();

    const scriptMatches = [...html.matchAll(/<script[^>]+src=["']([^"']+\/userdata\/public\/storefront\/js\/[^"']+)["']/gi)];
    let foundPdItems = false;
    let checkedFiles = [];

    for (const match of scriptMatches) {
      let scriptUrl = match[1];
      if (scriptUrl.startsWith('//')) scriptUrl = 'https:' + scriptUrl;
      else if (scriptUrl.startsWith('/')) scriptUrl = 'https://sklep.plyndo.pl' + scriptUrl;

      checkedFiles.push(scriptUrl);
      const jsRes = await fetch(scriptUrl);
      const jsContent = await jsRes.text();
      if (jsContent.includes('pd_items')) {
        foundPdItems = true;
        break;
      }
    }

    recordResult(
      'T4 — Skrypt na sklepie',
      'JS w /userdata/public/storefront/js/ zawiera pd_items',
      foundPdItems
        ? `Znaleziono pd_items w sklepie`
        : `Sprawdzono ${checkedFiles.length} skryptów z /userdata/public/storefront/js/ — brak pd_items`,
      foundPdItems
    );
  } catch (err) {
    recordResult('T4 — Skrypt na sklepie', 'JS w /userdata/public/storefront/js/ zawiera pd_items', `Błąd: ${err.message}`, false);
  }

  // --- T5: Landing wdrożony ---
  try {
    const pageUrl = 'https://plyndo.pl/pakiety/dom-codzienny-4/';
    const landingRes = await fetch(pageUrl);
    const landingHtml = await landingRes.text();

    const jsMatches = [...landingHtml.matchAll(/src=["']([^"']+\/assets\/[^"']+\.js)["']/gi)];
    let combinedJs = '';
    let jsUrls = [];

    for (const match of jsMatches) {
      let assetUrl = match[1];
      if (assetUrl.startsWith('/')) assetUrl = 'https://plyndo.pl' + assetUrl;
      else if (!assetUrl.startsWith('http')) assetUrl = 'https://plyndo.pl/' + assetUrl.replace(/^\.\//, '');
      
      jsUrls.push(assetUrl);
      const res = await fetch(assetUrl);
      const txt = await res.text();
      combinedJs += txt + '\n';
    }

    const hasPdItems = combinedJs.includes('pd_items');
    const hasPdPack = combinedJs.includes('pd_pack');
    const hasOldAdd = combinedJs.includes('?add=');
    const hasOldX = combinedJs.includes('PlynDo_x');

    const pass = hasPdItems && hasPdPack && !hasOldAdd && !hasOldX;
    recordResult(
      'T5 — Landing wdrożony',
      'JS z pd_items, pd_pack, BEZ ?add=, PlynDo_x',
      `pd_items=${hasPdItems}, pd_pack=${hasPdPack}, ?add==${hasOldAdd}, PlynDo_x=${hasOldX}`,
      pass
    );
  } catch (err) {
    recordResult('T5 — Landing wdrożony', 'JS z pd_items, pd_pack, BEZ ?add=, PlynDo_x', `Błąd: ${err.message}`, false);
  }

  // --- T6: Handoff E2E ---
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const handoffUrl = `https://sklep.plyndo.pl/pl/basket?pd_v=2&pd_items=182:1,186:1,189:1,190:1&pd_pack=4&pd_sid=t${Date.now()}`;
    await page.goto(handoffUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(6000);

    const bState = await page.evaluate(async () => {
      if (typeof useStorefront !== 'function') return { error: 'brak useStorefront' };
      return new Promise((resolve) => {
        useStorefront(async ({ getApi }) => {
          try {
            const prod = await getApi('basketProductsApi');
            const promo = await getApi('basketPromotionsApi');
            const count = await prod.getBasketCount();
            const hasPromotionCode = await promo.getHasPromotionCode();
            const promoObj = await promo.getPromotionCode();
            const val = await prod.getDiscountedBasketValue();
            resolve({ count, hasPromotionCode, promoObj, val });
          } catch (e) {
            resolve({ error: e.message });
          }
        });
      });
    });

    await browser.close();

    const isCountOk = bState.count === 4;
    const isPromoOk = bState.hasPromotionCode === true;
    const grossVal = bState.val?.grossValue;
    const isValOk = typeof grossVal === 'number' && Math.abs(grossVal - 71.68) < 0.05;

    const pass = isCountOk && isPromoOk && isValOk;
    recordResult(
      'T6 — Handoff E2E',
      'count=4, hasPromo=true, grossVal=71.68',
      `count=${bState.count}, hasPromo=${bState.hasPromotionCode}, grossVal=${grossVal} (${bState.error || 'ok'})`,
      pass
    );
  } catch (err) {
    recordResult('T6 — Handoff E2E', 'count=4, hasPromo=true, grossVal=71.68', `Błąd: ${err.message}`, false);
  }

  // --- T7: Rebranding CSS ---
  try {
    const htmlRes = await fetch('https://sklep.plyndo.pl/');
    const html = await htmlRes.text();

    const cssMatches = [...html.matchAll(/<link[^>]+href=["']([^"']+\.css[^"']*)["']/gi)];
    let activeCssUrl = null;
    let cssContent = '';

    for (const match of cssMatches) {
      let href = match[1];
      if (href.includes('/styles/') || href.includes('skin') || href.includes('css')) {
        if (href.startsWith('//')) href = 'https:' + href;
        else if (href.startsWith('/')) href = 'https://sklep.plyndo.pl' + href;
        activeCssUrl = href;
        const cssRes = await fetch(href);
        cssContent += await cssRes.text() + '\n';
      }
    }

    const hasPdVar = cssContent.includes('--pd-');
    const hasSwitzer = cssContent.includes('Switzer');
    const hasSecondaryColor = cssContent.includes('--secondaryColor:#5c77b7') || cssContent.includes('--secondaryColor: #5c77b7') || cssContent.includes('#5c77b7');

    const pass = hasPdVar && hasSwitzer && hasSecondaryColor;
    recordResult(
      'T7 — Rebranding CSS',
      '--pd-, Switzer, --secondaryColor:#5c77b7',
      `--pd-=${hasPdVar}, Switzer=${hasSwitzer}, secondaryColor=${hasSecondaryColor}`,
      pass
    );
  } catch (err) {
    recordResult('T7 — Rebranding CSS', '--pd-, Switzer, --secondaryColor:#5c77b7', `Błąd: ${err.message}`, false);
  }

  // --- T8: Czystość sklepu ---
  try {
    const htmlRes = await fetch('https://sklep.plyndo.pl/');
    const html = await htmlRes.text();

    const frusentoMatches = (html.match(/frusento/gi) || []).length;
    const nListMatches = (html.match(/\/pl\/n\/list/gi) || []).length;
    const hasCopyright2026 = html.includes('Copyright 2026') || html.includes('© 2026') || html.includes('2026');

    const pass = frusentoMatches === 0 && nListMatches === 0 && hasCopyright2026;
    recordResult(
      'T8 — Czystość sklepu',
      'frusento=0, /pl/n/list=0, Copyright 2026 obecne',
      `frusento=${frusentoMatches}, /pl/n/list=${nListMatches}, copyright2026=${hasCopyright2026}`,
      pass
    );
  } catch (err) {
    recordResult('T8 — Czystość sklepu', 'frusento=0, /pl/n/list=0, Copyright 2026 obecne', `Błąd: ${err.message}`, false);
  }

  // --- WYŚWIETLENIE TABELI WYNIKÓW ---
  console.log('\n------------------------------------------------------------------------------------------------------------------------');
  console.log(
    'Nazwa testu'.padEnd(26) + ' | ' +
    'Oczekiwano'.padEnd(42) + ' | ' +
    'Otrzymano'.padEnd(40) + ' | Wynik'
  );
  console.log('------------------------------------------------------------------------------------------------------------------------');

  let allPassed = true;
  for (const r of results) {
    if (r.status !== 'PASS') allPassed = false;
    const nameStr = r.name.padEnd(26);
    const expStr = r.expected.slice(0, 42).padEnd(42);
    const recStr = r.received.slice(0, 40).padEnd(40);
    console.log(`${nameStr} | ${expStr} | ${recStr} | [${r.status}]`);
  }
  console.log('------------------------------------------------------------------------------------------------------------------------\n');

  if (allPassed) {
    console.log('✅ WSZYSTKIE TESTY ZAKOŃCZONE SUKCESEM');
    process.exit(0);
  } else {
    console.log('❌ WERYFIKACJA KOŃCOWA NIE POWIODŁA SIĘ');
    process.exit(1);
  }
}

runVerification();
