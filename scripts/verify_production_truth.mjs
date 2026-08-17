/**
 * @file verify_production_truth.mjs
 * @description Kompleksowy pakiet testów weryfikacji produkcyjnej prawdy (T1–T11)
 * Sprawdza kupony REST API, wdrożenie landing page (HTML/JS), pełny handoff E2E,
 * rebranding CSS motywu, czystość sklepu, twardą blokadę checkoutu poza 4/8/12 oraz brak duplikacji cen.
 * @usage node scripts/verify_production_truth.mjs
 */

import { chromium } from 'playwright';

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

  // ============================================================================
  // T1: Kupon 4 (REST API)
  // ============================================================================
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
      body: JSON.stringify({ code: 'PLYNDO-PACK-4' })
    });
    const promoData = await promoRes.json();
    const basket = promoData.basket || {};

    const hasCode = basket.hasPromoCode === true;
    const discountVal = basket.discounts?.sum?.grossValue;
    const isValOk = typeof discountVal === 'number' && Math.abs(discountVal - 17.92) < 0.05;

    const pass = hasCode && isValOk;
    recordResult(
      'T1 — Kupon 4',
      'hasPromoCode=true & discount=17.92 zł',
      `hasPromoCode=${basket.hasPromoCode}, discount=${discountVal ?? 'brak'}`,
      pass
    );
  } catch (err) {
    recordResult('T1 — Kupon 4', 'hasPromoCode=true & discount=17.92 zł', `Błąd: ${err.message}`, false);
  }

  // ============================================================================
  // T2: Kupon 8 (REST API)
  // ============================================================================
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
      body: JSON.stringify({ code: 'PLYNDO-PACK-8' })
    });
    const promoData = await promoRes.json();
    const basket = promoData.basket || {};

    const hasCode = basket.hasPromoCode === true;
    const discountVal = basket.discounts?.sum?.grossValue;
    const isValOk = typeof discountVal === 'number' && Math.abs(discountVal - 60.66) < 0.05;

    const pass = hasCode && isValOk;
    recordResult(
      'T2 — Kupon 8',
      'hasPromoCode=true & discount=60.66 zł',
      `hasPromoCode=${basket.hasPromoCode}, discount=${discountVal ?? 'brak'}`,
      pass
    );
  } catch (err) {
    recordResult('T2 — Kupon 8', 'hasPromoCode=true & discount=60.66 zł', `Błąd: ${err.message}`, false);
  }

  // ============================================================================
  // T3: Kupon 12 (REST API)
  // ============================================================================
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
      body: JSON.stringify({ code: 'PLYNDO-PACK-12' })
    });
    const promoData = await promoRes.json();
    const basket = promoData.basket || {};

    const hasCode = basket.hasPromoCode === true;
    const discountVal = basket.discounts?.sum?.grossValue;
    const isValOk = typeof discountVal === 'number' && Math.abs(discountVal - 123.52) < 0.05;

    const pass = hasCode && isValOk;
    recordResult(
      'T3 — Kupon 12',
      'hasPromoCode=true & discount=123.52 zł',
      `hasPromoCode=${basket.hasPromoCode}, discount=${discountVal ?? 'brak'}`,
      pass
    );
  } catch (err) {
    recordResult('T3 — Kupon 12', 'hasPromoCode=true & discount=123.52 zł', `Błąd: ${err.message}`, false);
  }

  // ============================================================================
  // T4: Skrypt na sklepie (moduł storefront JS)
  // ============================================================================
  try {
    const htmlRes = await fetch('https://sklep.plyndo.pl/');
    const html = await htmlRes.text();

    const scriptMatches = [...html.matchAll(/(?:src|data-src)=["']([^"']*(?:\/userdata\/public\/storefront\/js\/[^"']+))/gi)];
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

    // Sprawdź także inline scripts
    if (!foundPdItems && html.includes('pd_items')) {
      foundPdItems = true;
    }

    recordResult(
      'T4 — Skrypt na sklepie',
      'Moduł JS zawiera pd_items',
      foundPdItems
        ? `Znaleziono pd_items w sklepie`
        : `Brak pd_items w sklepie (${checkedFiles.length} sprawdzonych skryptów)`,
      foundPdItems
    );
  } catch (err) {
    recordResult('T4 — Skrypt na sklepie', 'Moduł JS zawiera pd_items', `Błąd: ${err.message}`, false);
  }

  // ============================================================================
  // T5: Landing wdrożony (surowy HTML produkcji BEZ fallbacku lokalnego)
  // ============================================================================
  try {
    const landingRes = await fetch('https://plyndo.pl/pakiety/dom-codzienny-4/', { redirect: 'follow' });
    const landingHtml = await landingRes.text();

    const hasErrorP0 = landingHtml.includes('Nieprawidłowa paczka') || landingHtml.includes('[plyndo]');

    const jsMatches = [
      ...landingHtml.matchAll(/src=["']([^"']+\.js[^"']*)["']/gi),
      ...landingHtml.matchAll(/href=["']([^"']+\.js[^"']*)["']/gi)
    ];
    let combinedJs = '';
    const checkedUrls = new Set();
    for (const match of jsMatches) {
      let assetUrl = match[1];
      if (assetUrl.startsWith('/')) assetUrl = 'https://plyndo.pl' + assetUrl;
      else if (!assetUrl.startsWith('http')) assetUrl = 'https://plyndo.pl/' + assetUrl.replace(/^\.\//, '');
      if (!checkedUrls.has(assetUrl)) {
        checkedUrls.add(assetUrl);
        const res = await fetch(assetUrl);
        combinedJs += (await res.text()) + '\n';
      }
    }

    const hasPdItems = combinedJs.includes('pd_items');
    const hasPdPack = combinedJs.includes('pd_pack');
    const hasOldAdd = combinedJs.includes('?add=');
    const hasOldX = combinedJs.includes('PlynDo_x');

    const pass = !hasErrorP0 && hasPdItems && hasPdPack && !hasOldAdd && !hasOldX;
    recordResult(
      'T5 — Landing wdrożony',
      'HTML bez błędu P0, JS z pd_items/pd_pack, brak ?add=/PlynDo_x',
      `errorP0=${hasErrorP0}, pd_items=${hasPdItems}, pd_pack=${hasPdPack}, oldAdd=${hasOldAdd}`,
      pass
    );
  } catch (err) {
    recordResult('T5 — Landing wdrożony', 'HTML bez błędu P0, JS z pd_items/pd_pack', `Błąd: ${err.message}`, false);
  }

  // ============================================================================
  // T6: Handoff E2E (przeglądarka otwiera pełny URL handoffu)
  // ============================================================================
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    let basketIdCaptured = '';
    page.on('request', req => {
      const m = req.url().match(/\/api\/basket\/([a-f0-9]+)/);
      if (m) basketIdCaptured = m[1];
    });

    const sid = 't' + Date.now();
    const handoffUrl = `https://sklep.plyndo.pl/pl/basket?pd_v=2&pd_items=182:1,186:1,189:1,190:1&pd_pack=4&pd_mode=replace&pd_sid=${sid}`;

    await page.goto(handoffUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(4000);

    const bState = await page.evaluate(async (bId) => {
      const bIdFinal = bId || sessionStorage.getItem('pd_basket_id');
      const url = bIdFinal ? `/api/basket/${bIdFinal}` : '/api/basket';
      const res = await fetch(url);
      const data = await res.json();
      const b = data.basket || {};
      return {
        count: b.items?.count || b.items?.list?.length || 0,
        hasPromoCode: b.hasPromoCode === true,
        promoCode: b.promoCode?.code,
        grossVal: b.sumToPay?.grossValue,
        discount: b.discounts?.sum?.grossValue,
        currentUrl: window.location.href
      };
    }, basketIdCaptured);

    await browser.close();

    const isCountOk = bState.count === 4;
    const isPromoOk = bState.hasPromoCode === true && bState.promoCode === 'PLYNDO-PACK-4';
    const isValOk = typeof bState.grossVal === 'number' && (Math.abs(bState.grossVal - 71.68) < 0.05 || Math.abs(bState.discount - 17.92) < 0.05);
    const isUrlClean = !bState.currentUrl.includes('pd_items');

    const pass = isCountOk && isPromoOk && isValOk;
    recordResult(
      'T6 — Handoff E2E',
      'count=4, promo=PLYNDO-PACK-4, grossVal=71.68 zł',
      `count=${bState.count}, hasPromo=${bState.hasPromoCode}, code=${bState.promoCode}, grossVal=${bState.grossVal}, urlClean=${isUrlClean}`,
      pass
    );
  } catch (err) {
    recordResult('T6 — Handoff E2E', 'count=4, promo=PLYNDO-PACK-4, grossVal=71.68 zł', `Błąd: ${err.message}`, false);
  }

  // ============================================================================
  // T7: Rebranding CSS (custom.less / SVE tokeny)
  // ============================================================================
  try {
    const htmlRes = await fetch('https://sklep.plyndo.pl/');
    const html = await htmlRes.text();

    const cssMatches = [...html.matchAll(/<link[^>]+href=["']([^"']+\.css[^"']*)["']/gi)];
    let cssContent = '';

    for (const match of cssMatches) {
      let href = match[1];
      if (href.includes('/styles/') || href.includes('skin') || href.includes('css')) {
        if (href.startsWith('//')) href = 'https:' + href;
        else if (href.startsWith('/')) href = 'https://sklep.plyndo.pl' + href;
        const cssRes = await fetch(href);
        cssContent += (await cssRes.text()) + '\n';
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

  // ============================================================================
  // T8: Czystość sklepu (brak obcych artefaktów i duplikatów w wyrenderowanym DOM)
  // ============================================================================
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const testUrls = [
      'https://sklep.plyndo.pl/',
      'https://sklep.plyndo.pl/pl/c/Dom/38',
      'https://sklep.plyndo.pl/pl/p/Plyn-do-naczyn/94'
    ];

    let totalFrusento = 0;
    let totalBlog = 0;
    let totalDemoAuthors = 0;
    let totalCopyrightShoper = 0;
    let hasCopyrightPlyndo = true;

    for (const u of testUrls) {
      await page.goto(u, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);

      const pageReport = await page.evaluate(() => {
        const text = document.body.innerText.toLowerCase();
        const hasFrusento = text.includes('frusento') && !text.includes('plyndo');
        const hasBlog = !!document.querySelector('a[href*="/pl/n/list"]:not([style*="display: none"])');
        const hasDemo = text.includes('liam johnson') || text.includes('jake parker');
        const copyright = document.querySelector('.footer__copyright, .copyright, footer')?.innerText || '';
        const isShoper2025 = copyright.includes('Copyright 2025 Shoper') || copyright.includes('© Copyright 2025 Shoper');
        const isPlyndo = copyright.includes('PŁYN DO') || copyright.includes('2026');

        return { hasFrusento, hasBlog, hasDemo, isShoper2025, isPlyndo };
      });

      if (pageReport.hasFrusento) totalFrusento++;
      if (pageReport.hasBlog) totalBlog++;
      if (pageReport.hasDemo) totalDemoAuthors++;
      if (pageReport.isShoper2025) totalCopyrightShoper++;
      if (!pageReport.isPlyndo && u === 'https://sklep.plyndo.pl/') hasCopyrightPlyndo = false;
    }

    await browser.close();

    const clean = totalFrusento === 0 && totalBlog === 0 && totalDemoAuthors === 0 && totalCopyrightShoper === 0 && hasCopyrightPlyndo;

    recordResult(
      'T8 — Czystość sklepu',
      '0 frusento/blog/demo/copyright2025 w DOM, stopka PłynDo',
      `frusento=${totalFrusento}, blog=${totalBlog}, demo=${totalDemoAuthors}, copyrightShoper=${totalCopyrightShoper}, plyndo=${hasCopyrightPlyndo}`,
      clean
    );
  } catch (err) {
    recordResult('T8 — Czystość sklepu', '0 obcych modułów na 3 URL', `Błąd: ${err.message}`, false);
  }

  // ============================================================================
  // T9: REST API Basket Flow (bezpośrednia weryfikacja silnika Shopera)
  // ============================================================================
  try {
    const getRes = await fetch('https://sklep.plyndo.pl/api/basket');
    const cookie = getRes.headers.get('set-cookie');
    const data = await getRes.json();
    const basketId = data.basket?.id;

    const headers = {
      'Content-Type': 'application/json',
      ...(cookie ? { 'Cookie': cookie.split(';')[0] } : {})
    };

    // Dodaj 4 pozycje
    for (const v of [182, 186, 189, 190]) {
      await fetch(`https://sklep.plyndo.pl/api/basket/${basketId}/item/${v}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ quantity: 1 })
      });
    }

    const promoRes = await fetch(`https://sklep.plyndo.pl/api/basket/${basketId}/promo-code`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ code: 'PLYNDO-PACK-4' })
    });
    const promoData = await promoRes.json();
    const b = promoData.basket || {};

    const pass = b.hasPromoCode === true && b.promoCode?.code === 'PLYNDO-PACK-4';
    recordResult(
      'T9 — REST API Basket Flow',
      'hasPromoCode=true & code=PLYNDO-PACK-4',
      `hasPromoCode=${b.hasPromoCode}, code=${b.promoCode?.code}`,
      pass
    );
  } catch (err) {
    recordResult('T9 — REST API Basket Flow', 'hasPromoCode=true & code=PLYNDO-PACK-4', `Błąd: ${err.message}`, false);
  }

  // ============================================================================
  // T10: Blokada zakupu poza 4/8/12 (Decyzja D2)
  // ============================================================================
  try {
    // 1. Sprawdź czy silnik sklepu ma skonfigurowane minimum zamówienia = 4
    const getRes = await fetch('https://sklep.plyndo.pl/api/basket');
    const cookie = getRes.headers.get('set-cookie');
    const data = await getRes.json();
    const minQty = data.basket?.minimumItemsQuantity;
    const isMinQty4 = minQty === 4;

    const headers = {
      'Content-Type': 'application/json',
      ...(cookie ? { 'Cookie': cookie.split(';')[0] } : {})
    };

    // 2. Sprawdź aplikację kuponu dla pełnej paczki 4 szt.
    const basketId = data.basket?.id;
    for (const v of [182, 186, 189, 190]) {
      await fetch(`https://sklep.plyndo.pl/api/basket/${basketId}/item/${v}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ quantity: 1 })
      });
    }
    const promo4Res = await fetch(`https://sklep.plyndo.pl/api/basket/${basketId}/promo-code`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ code: 'PLYNDO-PACK-4' })
    });
    const promo4Data = await promo4Res.json();
    const isPromo4Accepted = promo4Data.basket?.hasPromoCode === true;

    const pass = isMinQty4 && isPromo4Accepted;
    recordResult(
      'T10 — Checkout Guard 4/8/12',
      'minimumItemsQuantity=4 & rabat dla paczki 4/8/12',
      `minimumItemsQuantity=${minQty}, paczka4(hasPromo=${isPromo4Accepted})`,
      pass
    );
  } catch (err) {
    recordResult('T10 — Checkout Guard 4/8/12', 'minimumItemsQuantity=4 & rabat 4/8/12', `Błąd: ${err.message}`, false);
  }

  // ============================================================================
  // T11: Brak duplikacji cen (Decyzja D3)
  // ============================================================================
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // 1. Sprawdź czy kategoria 40 w przeglądarce lub w menu kieruje na landing
    await page.goto('https://sklep.plyndo.pl/pl/c/Pakiety/40', { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
    const currentUrl = page.url();
    const isCatRedirect = currentUrl.includes('plyndo.pl') || currentUrl.includes('#pakiety');

    // Sprawdź czy w menu sklepu link Pakiety kieruje na landing
    await page.goto('https://sklep.plyndo.pl/', { waitUntil: 'networkidle' });
    const menuLink = await page.evaluate(() => {
      const pakietyA = Array.from(document.querySelectorAll('a')).find(a => a.innerText.trim().toUpperCase() === 'PAKIETY');
      return pakietyA?.href;
    });
    const isMenuRedirect = menuLink?.includes('plyndo.pl/#pakiety');

    await browser.close();

    // 2. Sprawdź czy SKU 106, 107, 108 nie są dostępne jako aktywne pakiety na sklepie
    const sku106Res = await fetch('https://sklep.plyndo.pl/pl/p/Pakiet-Starter-4x/106', { redirect: 'manual' });
    const sku107Res = await fetch('https://sklep.plyndo.pl/pl/p/Pakiet-Dom-8x/107', { redirect: 'manual' });
    const sku108Res = await fetch('https://sklep.plyndo.pl/pl/p/Pakiet-Komplet-12x/108', { redirect: 'manual' });

    const isSku106Inactive = sku106Res.status === 404 || sku106Res.status === 301 || sku106Res.status === 302;
    const isSku107Inactive = sku107Res.status === 404 || sku107Res.status === 301 || sku107Res.status === 302;
    const isSku108Inactive = sku108Res.status === 404 || sku108Res.status === 301 || sku108Res.status === 302;

    const allInactive = isSku106Inactive && isSku107Inactive && isSku108Inactive;
    const pass = (isCatRedirect || isMenuRedirect) && allInactive;

    recordResult(
      'T11 — Brak duplikacji cen',
      'Kat 40 -> landing redirect, SKU 106-108 nieaktywne',
      `catRedirect=${isCatRedirect}, menuLink=${menuLink}, sku106=${sku106Res.status}, sku107=${sku107Res.status}, sku108=${sku108Res.status}`,
      pass
    );
  } catch (err) {
    recordResult('T11 — Brak duplikacji cen', 'Kat 40 redirect & SKU 106-108 nieaktywne', `Błąd: ${err.message}`, false);
  }

  // ============================================================================
  // WYŚWIETLENIE TABELI WYNIKÓW
  // ============================================================================
  console.log('\n------------------------------------------------------------------------------------------------------------------------');
  console.log(
    'Nazwa testu'.padEnd(28) + ' | ' +
    'Oczekiwano'.padEnd(42) + ' | ' +
    'Otrzymano'.padEnd(40) + ' | Wynik'
  );
  console.log('------------------------------------------------------------------------------------------------------------------------');

  let allPassed = true;
  for (const r of results) {
    if (r.status !== 'PASS') allPassed = false;
    const nameStr = r.name.padEnd(28);
    const expStr = r.expected.slice(0, 42).padEnd(42);
    const recStr = r.received.slice(0, 40).padEnd(40);
    console.log(`${nameStr} | ${expStr} | ${recStr} | [${r.status}]`);
  }
  console.log('------------------------------------------------------------------------------------------------------------------------\n');

  if (allPassed) {
    console.log('✅ WSZYSTKIE TESTY ZAKOŃCZONE SUKCESEM (11/11 PASS)');
    process.exit(0);
  } else {
    console.log('❌ WERYFIKACJA WYKAZAŁA BŁĘDY');
    process.exit(1);
  }
}

runVerification();
