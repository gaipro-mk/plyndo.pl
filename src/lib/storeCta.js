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

export function getLeadCaptureHref(lang = 'pl') {
  const subject = encodeURIComponent(
    lang === 'en' ? 'PŁYN DO – notify me when the store opens' : 'PŁYN DO – powiadom o starcie sklepu',
  );
  return `mailto:kontakt@plyndo.pl?subject=${subject}`;
}
