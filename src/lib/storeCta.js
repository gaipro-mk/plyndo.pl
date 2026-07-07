import { offerIntegrationConfig, products } from '../data/products.js';

export function isStoreLive() {
  return offerIntegrationConfig.cta.status === 'enabled';
}

export function getStoreLabel(lang = 'pl') {
  if (isStoreLive()) {
    return lang === 'en' ? 'Go to store' : 'Przejdź do sklepu';
  }
  return offerIntegrationConfig.cta.label?.[lang]
    ?? offerIntegrationConfig.cta.label?.pl
    ?? (lang === 'en' ? 'Store coming soon' : 'Wkrótce w sklepie');
}

export function getStoreHref(path = '') {
  if (!isStoreLive()) {
    return null;
  }
  const base = 'https://sklep.plyndo.pl';
  return path ? `${base}${path.startsWith('/') ? path : `/${path}`}` : base;
}

export function getPackagesHref() {
  if (isStoreLive()) {
    return getStoreHref();
  }
  return '/#pakiety';
}

export function getProductCartItems(product) {
  if (product?.shoperStockId) {
    return [{ stockId: product.shoperStockId, quantity: 1 }];
  }
  return [];
}

export function getProductStoreHref(product) {
  if (!isStoreLive()) {
    return product?.urlSlug ? `/produkt/${product.urlSlug}` : '/#produkty';
  }
  if (product?.shoperUrl) {
    return product.shoperUrl;
  }
  if (product?.shoperStockId) {
    return `https://sklep.plyndo.pl/pl/basket/add/${product.shoperStockId}`;
  }
  return 'https://sklep.plyndo.pl';
}

export function getBundleCartItems(bundle) {
  if (bundle?.shoperStockId) {
    return [{ stockId: bundle.shoperStockId, quantity: 1 }];
  }
  if (bundle?.composition && Array.isArray(bundle.composition) && bundle.composition.length > 0) {
    const items = [];
    bundle.composition.forEach((item) => {
      const prod = products.find((p) => p.slug === item.productSlug);
      const stockId = prod?.shoperStockId ?? item.shoperStockId;
      if (stockId) {
        items.push({ stockId, quantity: item.quantity || 1 });
      }
    });
    return items;
  }
  return [];
}

export function getBundleStoreHref(bundle) {
  if (!isStoreLive()) {
    return bundle?.slug ? `/pakiety/${bundle.slug}` : '/#pakiety';
  }
  if (bundle?.shoperStockId) {
    return `https://sklep.plyndo.pl/pl/basket/add/${bundle.shoperStockId}`;
  }
  if (bundle?.shoperUrl) {
    return bundle.shoperUrl;
  }

  if (bundle?.composition && Array.isArray(bundle.composition) && bundle.composition.length > 0) {
    const items = [];
    let totalQty = 0;
    bundle.composition.forEach((item) => {
      const prod = products.find((p) => p.slug === item.productSlug);
      const stockId = prod?.shoperStockId ?? item.shoperStockId;
      if (stockId) {
        const qty = item.quantity || 1;
        items.push(`${stockId}:${qty}`);
        totalQty += qty;
      }
    });

    if (items.length > 0) {
      let promoParam = '';
      if (totalQty === 12) {
        promoParam = '&promo=PlynDo_x12';
      } else if (totalQty === 8) {
        promoParam = '&promo=PlynDo_x8';
      } else if (totalQty === 4) {
        promoParam = '&promo=PlynDo_x4';
      }
      return `https://sklep.plyndo.pl/?add=${items.join(',')}${promoParam}`;
    }
  }

  return 'https://sklep.plyndo.pl';
}

export function getLeadCaptureHref(lang = 'pl') {
  const subject = encodeURIComponent(
    lang === 'en' ? 'PŁYN DO – notify me when the store opens' : 'PŁYN DO – powiadom o starcie sklepu',
  );
  return `mailto:kontakt@plyndo.pl?subject=${subject}`;
}
