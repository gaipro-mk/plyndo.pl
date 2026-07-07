/**
 * Shoper cart handoff helper.
 *
 * Cross-origin fetch (plyndo.pl → sklep.plyndo.pl) cannot share cookies/session,
 * so we do NOT call the basket API here.
 *
 * Strategy:
 * 1. Build ?add=stockId:qty,stockId:qty query string.
 * 2. Navigate to sklep.plyndo.pl with that query string.
 * 3. GTM tag on sklep.plyndo.pl intercepts the parameter and
 *    calls POST /api/basket/{basket_id}/item/{stock_id} same-origin
 *    using the basket_id from localStorage.
 */

const SHOPER_STORE_URL = 'https://sklep.plyndo.pl';

export function createShoperBasketAndRedirect(items) {
  if (!items || items.length === 0) {
    window.open(SHOPER_STORE_URL, '_blank');
    return;
  }

  const totalQty = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  let promoParam = '';
  if (totalQty === 12) {
    promoParam = '&promo=PlynDo_x12';
  } else if (totalQty === 8) {
    promoParam = '&promo=PlynDo_x8';
  } else if (totalQty === 4) {
    promoParam = '&promo=PlynDo_x4';
  }

  const stockParams = items
    .filter((item) => item.stockId)
    .map((item) => `${item.stockId}:${parseInt(item.quantity || 1, 10)}`)
    .join(',');

  window.open(`${SHOPER_STORE_URL}/?add=${stockParams}${promoParam}`, '_blank');
}
