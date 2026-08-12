/**
 * PŁYN DO — Handoff Protocol v2 Module for Shoper Storefront
 * Handles seamless cart initialization from plyndo.pl landing page links.
 */

(function () {
  'use strict';

  const URL_PARAMS = new URLSearchParams(window.location.search);
  const isV2 = URL_PARAMS.get('pd_v') === '2';
  const rawItems = URL_PARAMS.get('pd_items');
  const packSize = URL_PARAMS.get('pd_pack');
  const sessionId = URL_PARAMS.get('pd_sid');

  if (!isV2 || !rawItems || !sessionId) {
    return;
  }

  // Prevent duplicate execution for the same handoff session
  const STORAGE_KEY = 'pd_processed_' + sessionId;
  if (sessionStorage.getItem(STORAGE_KEY)) {
    cleanUrlParams();
    return;
  }

  // Coupon code mapping
  const COUPON_MAP = {
    '4': 'PLYNDO-PACK-4',
    '8': 'PLYNDO-PACK-8',
    '12': 'PLYNDO-PACK-12'
  };

  const couponCode = COUPON_MAP[packSize];

  // Show loading overlay
  const overlay = createLoadingOverlay();
  document.body.appendChild(overlay);

  // Poll for window.useStorefront availability (up to 10 seconds)
  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    if (typeof window.useStorefront === 'function') {
      clearInterval(interval);
      window.useStorefront(async ({ eventBus, getApi }) => {
        try {
          await executeHandoff(getApi, eventBus);
        } catch (err) {
          console.error('[PŁYN DO Handoff Error]', err);
          removeLoadingOverlay(overlay);
        }
      });
    } else if (attempts > 100) {
      clearInterval(interval);
      console.warn('[PŁYN DO Handoff] Timeout waiting for useStorefront API.');
      removeLoadingOverlay(overlay);
    }
  }, 100);

  async function executeHandoff(getApi, eventBus) {
    const overallApi = await getApi('basketOverallApi');
    const updaterApi = await getApi('basketUpdaterApi');
    const promoApi = await getApi('basketPromotionsApi');

    // 1. Clean current basket
    if (overallApi && typeof overallApi.cleanBasket === 'function') {
      await overallApi.cleanBasket();
    }

    // 2. Parse items and add sequentially
    const items = parseItems(rawItems);
    for (const item of items) {
      if (updaterApi && typeof updaterApi.addItem === 'function') {
        await updaterApi.addItem({
          variantId: item.variantId,
          quantity: item.quantity,
          showAddedModal: false,
          bundleItems: []
        });
      }
    }

    // 3. Apply promo code if applicable
    if (couponCode && promoApi && typeof promoApi.add === 'function') {
      await promoApi.add(couponCode);
    }

    // 4. Register event bus listener to re-apply coupon on basket updates
    if (eventBus && couponCode && promoApi) {
      eventBus.on('basket.updated', async () => {
        const hasPromo = await promoApi.getHasPromotionCode();
        if (!hasPromo) {
          await promoApi.add(couponCode);
        }
      });
    }

    // 5. Mark session as processed
    sessionStorage.setItem(STORAGE_KEY, 'true');

    // 6. Clean URL parameters and reload view
    cleanUrlParams();
    setTimeout(() => {
      removeLoadingOverlay(overlay);
      window.location.reload();
    }, 500);
  }

  function parseItems(str) {
    return str.split(',').map(pair => {
      const [variantId, quantity] = pair.split(':').map(Number);
      return { variantId, quantity: quantity || 1 };
    }).filter(i => !isNaN(i.variantId) && i.variantId > 0);
  }

  function cleanUrlParams() {
    const url = new URL(window.location.href);
    url.searchParams.delete('pd_v');
    url.searchParams.delete('pd_items');
    url.searchParams.delete('pd_pack');
    url.searchParams.delete('pd_sid');
    window.history.replaceState({}, document.title, url.pathname + url.search);
  }

  function createLoadingOverlay() {
    const el = document.createElement('div');
    el.id = 'plyndo-handoff-overlay';
    el.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(255, 255, 255, 0.96);
      z-index: 999999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #111827;
      transition: opacity 0.3s ease;
    `;

    el.innerHTML = `
      <div style="width: 48px; height: 48px; border: 3px solid #E5E7EB; border-top-color: #004D40; border-radius: 50%; animation: pd-spin 0.8s linear infinite; margin-bottom: 20px;"></div>
      <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 8px 0; color: #004D40;">PŁYN DO</h2>
      <p style="font-size: 15px; color: #4B5563; margin: 0;">Przygotowujemy Twój zestaw PŁYN DO...</p>
      <style>
        @keyframes pd-spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;

    return el;
  }

  function removeLoadingOverlay(el) {
    if (el && el.parentNode) {
      el.style.opacity = '0';
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 300);
    }
  }
})();
