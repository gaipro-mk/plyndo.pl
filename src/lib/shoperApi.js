const MIN_STOCK = 182, MAX_STOCK = 193;
const PACK_SIZES = [4, 8, 12];

export function buildShoperHandoffUrl(items, packSize, { label, mode = 'replace' } = {}) {
  const valid = (items || [])
    .map(i => ({ variantId: Number(i.stockId ?? i.variantId ?? i.id), quantity: Number(i.quantity || 1) }))
    .filter(i => Number.isInteger(i.variantId) && i.variantId >= MIN_STOCK && i.variantId <= MAX_STOCK && i.quantity > 0);

  const total = valid.reduce((s, i) => s + i.quantity, 0);
  const pack  = packSize ?? total;
  if (!PACK_SIZES.includes(pack) || total !== pack) {
    throw new Error(`[plyndo] Nieprawidłowa paczka: ${total} szt. Dozwolone: 4, 8, 12.`);
  }

  const p = new URLSearchParams({
    pd_v: '2',
    pd_items: valid.map(i => `${i.variantId}:${i.quantity}`).join(','),
    pd_pack: String(pack),
    pd_mode: mode,
    pd_sid: (crypto?.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2)).slice(0, 8)
  });
  if (label) p.set('pd_label', label.slice(0, 120));
  return `https://sklep.plyndo.pl/pl/basket?${p}`;
}

export function createShoperBasketAndRedirect(items, packSize, options) {
  try {
    const url = buildShoperHandoffUrl(items, packSize, options);
    window.location.href = url;
  } catch (err) {
    console.error('[plyndo] redirect error:', err);
    window.open('https://sklep.plyndo.pl', '_blank');
  }
}
