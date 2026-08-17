/* global useStorefront */
/* ŹRÓDŁO PRAWDY dla modułu własnego "PlynDo Handoff" w panelu Shoper.
   Ten plik NIE jest wdrażany przez `theme push` — jest wykluczony przez
   .shoperignore i nieobecny w .shoper/filesStructure.json.
   Po każdej zmianie: skopiuj zawartość do panelu ręcznie.
   Wygląd i treści → Wygląd sklepu → Edycja szablonu graficznego
   → Moduły własne → PlynDo Handoff → pole JS. */

(function () {
  'use strict';

  const PACKS   = { 4: 'PLYNDO-PACK-4', 8: 'PLYNDO-PACK-8', 12: 'PLYNDO-PACK-12' };
  const ALLOWED = new Set([182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193]);
  const LANDING = 'https://plyndo.pl';
  let syncing = false;
  let syncDebounceTimer = null;

  function parseHandoff() {
    const q = new URLSearchParams(location.search);
    if (q.get('pd_v') !== '2') return null;
    const pack = parseInt(q.get('pd_pack'), 10);
    if (!PACKS[pack]) return { error: 'Nieprawidłowy rozmiar paczki.' };
    const itemsRaw = q.get('pd_items') || '';
    if (!itemsRaw) return { error: 'Paczka jest pusta.' };
    const items = itemsRaw.split(',').map(s => {
      const [id, qty] = s.split(':').map(Number);
      return { variantId: id, quantity: qty || 1 };
    });
    if (!items.length || items.some(i => !ALLOWED.has(i.variantId) || i.quantity < 1 || i.quantity > 12)) {
      return { error: 'Paczka zawiera nieprawidłowy produkt.' };
    }
    const sumQty = items.reduce((s, i) => s + i.quantity, 0);
    if (sumQty !== pack) {
      return { error: 'Liczba butelek nie zgadza się z rozmiarem paczki.' };
    }
    return {
      items,
      pack,
      sid:   q.get('pd_sid') || '',
      label: (q.get('pd_label') || '').slice(0, 120),
      mode:  q.get('pd_mode') === 'append' ? 'append' : 'replace'
    };
  }

  function showOverlay() {
    const el = document.createElement('div');
    el.id = 'pd-handoff-overlay';
    el.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: #faf9f6; z-index: 999999; display: flex; flex-direction: column;
      align-items: center; justify-content: center; font-family: 'Switzer', ui-sans-serif, system-ui, sans-serif;
      color: #1a1918; text-align: center; padding: 24px; box-sizing: border-box;
    `;
    el.innerHTML = `
      <div style="width: 48px; height: 48px; border: 4px solid rgba(26,25,24,0.15); border-top-color: #1a1918; border-radius: 50%; animation: pd-spin 0.8s linear infinite; margin-bottom: 24px;"></div>
      <div style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: #1a1918;">Przygotowujemy Twoją paczkę...</div>
      <div style="font-size: 14px; color: #555452;">Za chwilę nastąpi przekierowanie do koszyka</div>
      <style>@keyframes pd-spin { to { transform: rotate(360deg); } }</style>
    `;
    document.body.appendChild(el);
    return {
      remove: () => el.remove()
    };
  }

  function showError(msg) {
    const existing = document.getElementById('pd-handoff-overlay');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.id = 'pd-handoff-overlay';
    el.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: #faf9f6; z-index: 999999; display: flex; flex-direction: column;
      align-items: center; justify-content: center; font-family: 'Switzer', ui-sans-serif, system-ui, sans-serif;
      color: #1a1918; text-align: center; padding: 24px; box-sizing: border-box;
    `;
    el.innerHTML = `
      <div style="font-size: 24px; font-weight: 600; margin-bottom: 12px; color: #1a1918;">Wystąpił błąd handoffu</div>
      <div style="font-size: 15px; color: #555452; margin-bottom: 24px; max-width: 480px;">${msg}</div>
      <a href="${LANDING}" style="display: inline-block; background: #1a1918; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: 500; font-size: 14px;">Wróć do serwisu PŁYN DO</a>
    `;
    document.body.appendChild(el);
  }

  function cleanUrl() {
    try {
      const u = new URL(location.href);
      ['pd_v','pd_items','pd_pack','pd_sid','pd_label','pd_mode'].forEach(k => u.searchParams.delete(k));
      history.replaceState({}, document.title, u.pathname + u.search);
    } catch (e) { console.warn('[plyndo] cleanUrl', e); }
  }

  function applyCheckoutGuard(count) {
    const isAllowed = count === 4 || count === 8 || count === 12;
    const checkoutBtns = document.querySelectorAll(
      'a[href*="/pl/order"], a[href*="/basket/step"], button.checkout, .btn_to-checkout, [class*="to-checkout"], [data-action="checkout"], .btn-checkout'
    );

    let lockBox = document.getElementById('pd-checkout-lock-msg');

    if (!isAllowed) {
      checkoutBtns.forEach(btn => {
        btn.setAttribute('data-pd-disabled', 'true');
        btn.style.setProperty('pointer-events', 'none', 'important');
        btn.style.setProperty('opacity', '0.35', 'important');
        btn.style.setProperty('cursor', 'not-allowed', 'important');
      });

      let msg = '';
      if (count === 0) {
        msg = 'Twój koszyk jest pusty. Skompletuj paczkę 4, 8 lub 12 butelek.';
      } else if (count < 4) {
        msg = `Dobierz jeszcze ${4 - count} szt., aby skompletować paczkę 4 i złożyć zamówienie.`;
      } else if (count < 8) {
        msg = `Masz ${count} szt. Dobierz jeszcze ${8 - count} szt. do paczki 8 lub usuń ${count - 4} szt. do paczki 4.`;
      } else if (count < 12) {
        msg = `Masz ${count} szt. Dobierz jeszcze ${12 - count} szt. do paczki 12 lub usuń ${count - 8} szt. do paczki 8.`;
      } else {
        msg = `Masz ${count} szt. Maksymalny rozmiar pojedynczej paczki to 12 szt. Zmniejsz ilość lub skompletuj wielokrotność (np. 12 + 4).`;
      }

      if (!lockBox) {
        lockBox = document.createElement('div');
        lockBox.id = 'pd-checkout-lock-msg';
        lockBox.style.cssText = `
          margin: 16px 0; padding: 14px 18px; border-radius: 12px;
          background: #fff8eb; border: 1px solid #fed7aa; color: #9a3412;
          font-family: 'Switzer', sans-serif; font-size: 13px; font-weight: 500;
          line-height: 1.5; text-align: center;
        `;
        const summaryContainer = document.querySelector('.basket-summary, .basket__summary, .summary, .cart-summary') || document.querySelector('.basket-table');
        if (summaryContainer && summaryContainer.parentNode) {
          summaryContainer.parentNode.insertBefore(lockBox, summaryContainer);
        }
      }
      if (lockBox) lockBox.innerText = msg;
    } else {
      checkoutBtns.forEach(btn => {
        btn.removeAttribute('data-pd-disabled');
        btn.style.removeProperty('pointer-events');
        btn.style.removeProperty('opacity');
        btn.style.removeProperty('cursor');
      });
      if (lockBox) lockBox.remove();
    }
  }

  function patchDom() {
    // 1. Usuń drugi moduł logo (Frusento)
    const frusentoImg = document.querySelector('img[alt*="Frusento" i], img[src*="Frusento" i], img[src*="ced5aa2a"]');
    if (frusentoImg) {
      const logoModule = frusentoImg.closest('.module[data-module-name="logo"]') || frusentoImg.parentElement;
      if (logoModule) logoModule.remove();
    }

    // 2. Usuń moduł bloga oraz linki /pl/n/
    const blogModule = document.querySelector('.module[data-module-name="blog_articles_slider"]');
    if (blogModule) blogModule.remove();
    const blogLinks = document.querySelectorAll('a[href*="/pl/n/"]');
    blogLinks.forEach(a => {
      const li = a.closest('li, .list__item');
      if (li) li.remove(); else a.remove();
    });

    // 3. Deduplikacja stopki
    const footers = document.querySelectorAll('.footer-groups');
    if (footers.length > 1) {
      for (let i = 1; i < footers.length; i++) {
        if (footers[i].innerHTML === footers[0].innerHTML) {
          footers[i].remove();
        }
      }
    }

    // 4. Copyright podmień na © 2026 PŁYN DO
    const copyrightEls = document.querySelectorAll('.footer-group, .copyright, footer, .footer__copyright');
    copyrightEls.forEach(el => {
      if (el.innerText && (el.innerText.includes('Shoper') || el.innerText.includes('2025'))) {
        el.innerHTML = el.innerHTML.replace(/©\s*[0-9]{4}\s*Shoper/gi, '© 2026 PŁYN DO').replace(/2025/g, '2026');
      }
    });

    // 5. Linki nawigacji na landing
    const linkMap = [
      { text: 'Pakiety', href: LANDING + '/#pakiety' },
      { text: 'Dom', href: '/dla-domu' },
      { text: 'Dla firm', href: '/dla-firm' },
      { text: 'O firmie', href: '/o-marce' },
      { text: 'O marce', href: '/o-marce' },
      { text: 'FAQ', href: LANDING + '/#faq' }
    ];
    const navLinks = document.querySelectorAll('a.link, .main-navigation a, nav a');
    navLinks.forEach(a => {
      const txt = a.innerText.trim();
      const match = linkMap.find(m => m.text.toLowerCase() === txt.toLowerCase());
      if (match) a.href = match.href;
    });

    // 6. Ukryj pole kodu rabatowego w koszyku (B20)
    const promoCodeSecs = document.querySelectorAll('[class*="promo-code"], [data-section="promo-code"], .basket-summary__promo-code, .basket-promocode');
    promoCodeSecs.forEach(sec => {
      sec.style.setProperty('display', 'none', 'important');
    });

    // 7. Usuń opinie demo Frusento / Liam Johnson
    const opinionSections = document.querySelectorAll('.module[data-module-name="opinions"], .opinions, .sft-opinions');
    opinionSections.forEach(sec => {
      if (sec.innerText && (sec.innerText.includes('Liam Johnson') || sec.innerText.includes('Frusento') || sec.innerText.includes('Jake Parker'))) {
        sec.remove();
      }
    });
  }

  /* ── A. FAST DIRECT HANDOFF VIA STOREFRONT REST API ─────── */
  async function executeDirectHandoff() {
    console.log('[plyndo-direct] checking handoff URL params...');
    const cfg = parseHandoff();
    if (!cfg) {
      console.log('[plyndo-direct] no handoff params in URL');
      return;
    }
    console.log('[plyndo-direct] handoff params detected:', cfg);
    if (cfg.error) {
      console.error('[plyndo-direct] handoff validation error:', cfg.error);
      showError(cfg.error);
      return;
    }

    const guard = 'pd_done_' + cfg.sid;
    if (cfg.sid && sessionStorage.getItem(guard)) {
      console.log('[plyndo-direct] guard already processed');
      cleanUrl();
      return;
    }

    console.log('[plyndo-direct] displaying overlay and calling /api/basket...');
    const ui = showOverlay();
    try {
      // 1. Pobierz / zainicjuj bieżący stan koszyka i sesję
      let basketId = null;
      let data = null;
      try {
        const initRes = await fetch('/api/basket/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        });
        data = await initRes.json();
      } catch (err) {
        console.warn('[plyndo-direct] init basket attempt failed:', err);
      }

      if (!basketId) {
        const getRes = await fetch('/api/basket');
        data = await getRes.json();
        basketId = data.basket?.id;
      }

      console.log('[plyndo-direct] got basketId:', basketId);
      if (!basketId) throw new Error('Brak koszyka');

      // 2. Jeśli tryb replace, wyczyść stare pozycje
      const oldItems = data.basket?.items?.list || (Array.isArray(data.basket?.items) ? data.basket.items : []);
      if (cfg.mode === 'replace' && oldItems.length) {
        console.log('[plyndo-direct] cleaning', oldItems.length, 'old items...');
        for (const it of oldItems) {
          const itId = it.itemId || it.id;
          if (itId) {
            await (await fetch(`/api/basket/${basketId}/item/${itId}`, { method: 'DELETE' })).json().catch(() => {});
          }
        }
      }

      // 3. Dodaj pozycje pakietu
      for (const it of cfg.items) {
        console.log('[plyndo-direct] adding variant:', it.variantId, 'qty:', it.quantity);
        const addRes = await fetch(`/api/basket/${basketId}/item/${it.variantId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: it.quantity })
        });
        await addRes.json().catch(() => {});
      }

      // 4. Zaaplikuj kod rabatowy
      console.log('[plyndo-direct] applying promo code:', PACKS[cfg.pack]);
      const promoRes = await fetch(`/api/basket/${basketId}/promo-code`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: PACKS[cfg.pack] })
      });
      await promoRes.json().catch(() => {});

      if (cfg.sid) {
        sessionStorage.setItem(guard, '1');
      }

      cleanUrl();
      console.log('[plyndo-direct] handoff complete, reloading basket view...');
      window.location.href = '/pl/basket';
    } catch (e) {
      console.error('[plyndo] handoff error', e);
      ui.remove();
      showError('Wystąpił błąd podczas przygotowywania paczki.');
    }
  }

  // Uruchom handoff natychmiast, jeśli w URL są parametry pd_v=2
  executeDirectHandoff();

  /* ── B. STOREFRONT HOOKS FOR CART SYNC & DOM ─────────────── */
  if (typeof useStorefront === 'function') {
    useStorefront(async ({ eventBus, getApi }) => {
      eventBus.on('basket.updated', async () => {
        if (syncDebounceTimer) clearTimeout(syncDebounceTimer);
        syncDebounceTimer = setTimeout(async () => {
          if (syncing) return;
          syncing = true;
          try {
            const [promo, prod, flash] = await Promise.all([
              getApi('basketPromotionsApi'),
              getApi('basketProductsApi'),
              getApi('flashMessengerApi')
            ]);
            const count = await prod.getBasketCount();
            const want  = PACKS[count] || null;
            const currentObj = await promo.getPromotionCode();
            const have  = (typeof currentObj === 'string' ? currentObj : currentObj?.code) || null;

            applyCheckoutGuard(count);

            if (want && have !== want) {
              await promo.add(want);
            } else if (!want && have && have.startsWith('PLYNDO-PACK-')) {
              await promo.remove();
              if (flash && typeof flash.addFlashMessage === 'function') {
                flash.addFlashMessage({
                  isError: true,
                  message: 'Rabat pakietowy obowiązuje wyłącznie dla paczek 4, 8 lub 12 butelek.'
                });
              }
            }
          } catch (e) {
            console.warn('[plyndo] coupon sync', e);
          } finally {
            syncing = false;
          }
        }, 150);
      });

      eventBus.on('PageManager.loaded', () => {
        try {
          patchDom();
          getApi('basketProductsApi').then(prod => {
            if (prod) prod.getBasketCount().then(c => applyCheckoutGuard(c)).catch(() => {});
          }).catch(() => {});
        } catch (e) { console.warn('[plyndo] dom patch', e); }
      });
    });
  }

  try { patchDom(); } catch (e) { console.warn('[plyndo] dom patch init', e); }
})();
