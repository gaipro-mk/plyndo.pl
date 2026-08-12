/* plyndo-storefront.js — handoff v2 + coupon sync + DOM patch */
(function () {
  'use strict';

  const PACKS   = { 4: 'PLYNDO-PACK-4', 8: 'PLYNDO-PACK-8', 12: 'PLYNDO-PACK-12' };
  const ALLOWED = new Set([182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193]);
  const LANDING = 'https://plyndo.pl';
  let syncing = false;

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

  function patchDom() {
    // 1. Usuń drugi moduł logo (Frusento)
    const frusentoImg = document.querySelector('img[alt*="Frusento" i]');
    if (frusentoImg) {
      const logoModule = frusentoImg.closest('.module[data-module-name="logo"]');
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
    const copyrightEls = document.querySelectorAll('.footer-group, .copyright, footer');
    copyrightEls.forEach(el => {
      if (el.innerText && el.innerText.includes('Shoper')) {
        el.innerHTML = el.innerHTML.replace(/©\s*[0-9]{4}\s*Shoper/gi, '© 2026 PŁYN DO');
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
    const promoCodeSecs = document.querySelectorAll('[class*="promo-code"], [data-section="promo-code"]');
    promoCodeSecs.forEach(sec => {
      sec.style.display = 'none';
    });
  }

  if (typeof useStorefront !== 'function') return;

  useStorefront(async ({ eventBus, getApi }) => {

    /* ── A. HANDOFF ────────────────────────────────────────── */
    eventBus.on('basket.initialized', async () => {
      const cfg = parseHandoff();
      if (!cfg) return;
      if (cfg.error) {
        console.error('[plyndo] błąd handoffu', cfg.error);
        showError(cfg.error);
        return;
      }

      const guard = 'pd_done_' + cfg.sid;
      if (cfg.sid && sessionStorage.getItem(guard)) {
        cleanUrl();
        return;
      }

      const ui = showOverlay();
      try {
        const [updater, promo, prod, overall, pm] = await Promise.all([
          getApi('basketUpdaterApi'),
          getApi('basketPromotionsApi'),
          getApi('basketProductsApi'),
          getApi('basketOverallApi'),
          getApi('pageManagerApi')
        ]);

        if (cfg.mode === 'replace') {
          await overall.cleanBasket();
        }

        for (const it of cfg.items) {
          await updater.addItem({
            variantId: it.variantId,
            quantity: it.quantity,
            showAddedModal: false,
            bundleItems: []
          });
        }

        await promo.add(PACKS[cfg.pack]);

        let count = await prod.getBasketCount();
        let ok    = await promo.getHasPromotionCode();

        if (count !== cfg.pack || !ok) {
          // 1x retry
          await promo.add(PACKS[cfg.pack]);
          count = await prod.getBasketCount();
          ok    = await promo.getHasPromotionCode();
        }

        if (count !== cfg.pack || !ok) {
          console.error('[plyndo] weryfikacja handoffu nieudana', { count, expected: cfg.pack, ok });
          ui.remove();
          showError('Nie udało się przygotować paczki.');
          return;
        }

        if (cfg.label) {
          await overall.setComment('Paczka z plyndo.pl: ' + cfg.label);
        }

        if (cfg.sid) {
          sessionStorage.setItem(guard, '1');
        }

        cleanUrl();
        ui.remove();
        pm.visit('/pl/basket');
      } catch (e) {
        console.error('[plyndo] handoff error', e);
        ui.remove();
        showError('Wystąpił błąd podczas przygotowywania paczki.');
      }
    });

    /* ── B. AUTO-SYNC KUPONU (zawsze) ──────────────────────── */
    eventBus.on('basket.updated', async () => {
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

        if (want && have !== want) {
          await promo.add(want);
        } else if (!want && have) {
          await promo.remove();
          flash.addFlashMessage({
            isError: true,
            message: 'Rabat obowiązuje dla paczek 4, 8 lub 12 butelek. Uzupełnij koszyk, aby go odzyskać.'
          });
        }
      } catch (e) {
        console.warn('[plyndo] coupon sync', e);
      } finally {
        syncing = false;
      }
    });

    /* ── C. DOM PATCH (zawsze) ─────────────────────────────── */
    eventBus.on('PageManager.loaded', () => {
      try { patchDom(); } catch (e) { console.warn('[plyndo] dom patch', e); }
    });
    try { patchDom(); } catch (e) { console.warn('[plyndo] dom patch init', e); }
  });
})();
