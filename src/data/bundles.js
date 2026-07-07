import { createOfferIntegration, products } from './products.js';

export const bundleDiscountRules = {
  komplet12: {
    type: 'percentage',
    rate: 0.5
  },
  box4: {
    type: 'percentage',
    rate: 0.3
  },
  box8: {
    type: 'percentage',
    rate: 0.4
  },
  box12: {
    type: 'percentage',
    rate: 0.5
  }
};

const komplet12Composition = products.map((product) => ({
  productSlug: product.slug,
  quantity: 1
}));

const bundleDefinitions = [
  {
    id: 'komplet-12',
    slug: 'komplet-12',
    name: 'Komplet 12',
    shoperStockId: null, // np. 184 (ID wariantu/zestawu w Shoperze)
    i18n: {
      pl: { displayName: 'Komplet 12' },
      en: { displayName: 'Complete 12' }
    },
    audience: 'all',
    size: komplet12Composition.length,
    composition: komplet12Composition,
    isCustomizable: false,
    allowsDuplicates: false,
    discountRule: bundleDiscountRules.komplet12
  },
  {
    id: 'wybierz-sam-4',
    slug: 'wybierz-sam-4',
    name: 'Wybierz Sam 4',
    shoperStockId: null,
    i18n: {
      pl: { displayName: 'Wybierz Sam 4' },
      en: { displayName: 'Build Your Own 4' }
    },
    audience: 'all',
    size: 4,
    composition: [],
    isCustomizable: true,
    allowsDuplicates: true,
    discountRule: bundleDiscountRules.box4
  },
  {
    id: 'wybierz-sam-8',
    slug: 'wybierz-sam-8',
    name: 'Wybierz Sam 8',
    shoperStockId: null,
    i18n: {
      pl: { displayName: 'Wybierz Sam 8' },
      en: { displayName: 'Build Your Own 8' }
    },
    audience: 'all',
    size: 8,
    composition: [],
    isCustomizable: true,
    allowsDuplicates: true,
    discountRule: bundleDiscountRules.box8
  },
  {
    id: 'wybierz-sam-12',
    slug: 'wybierz-sam-12',
    name: 'Wybierz Sam 12',
    shoperStockId: null,
    i18n: {
      pl: { displayName: 'Wybierz Sam 12' },
      en: { displayName: 'Build Your Own 12' }
    },
    audience: 'all',
    size: 12,
    composition: [],
    isCustomizable: true,
    allowsDuplicates: true,
    discountRule: bundleDiscountRules.box12
  },
  {
    id: 'dom-codzienny-4',
    slug: 'dom-codzienny-4',
    name: 'Dom Codzienny 4',
    shoperStockId: null, // Podaj tu ID wariantu/magazynowy z Shopera dla pakietu Starter 4
    i18n: {
      pl: { displayName: 'Pakiet 4x – Starter' },
    },
    audience: 'home',
    size: 4,
    composition: [
      { productSlug: 'naczyn', quantity: 1 },
      { productSlug: 'podlog', quantity: 1 },
      { productSlug: 'wc', quantity: 1 },
      { productSlug: 'lazienki', quantity: 1 }
    ],
    isCustomizable: false,
    allowsDuplicates: false,
    discountRule: bundleDiscountRules.box4
  },
  {
    id: 'dom-pelny-8',
    slug: 'dom-pelny-8',
    name: 'Dom Pełny 8',
    shoperStockId: null, // Podaj tu ID wariantu/magazynowy z Shopera dla pakietu Dom 8
    i18n: {
      pl: { displayName: 'Pakiet 8x – Dom na co dzień' },
    },
    audience: 'home',
    size: 8,
    composition: [
      { productSlug: 'naczyn', quantity: 1 },
      { productSlug: 'zmywarki', quantity: 1 },
      { productSlug: 'prania', quantity: 1 },
      { productSlug: 'plukania', quantity: 1 },
      { productSlug: 'podlog', quantity: 1 },
      { productSlug: 'wc', quantity: 1 },
      { productSlug: 'myciaszyb', quantity: 1 },
      { productSlug: 'lazienki', quantity: 1 }
    ],
    isCustomizable: false,
    allowsDuplicates: false,
    discountRule: bundleDiscountRules.box8
  },
  {
    id: 'dom-komplet-12',
    slug: 'dom-komplet-12',
    name: 'Dom Komplet 12',
    shoperStockId: null, // Podaj tu ID wariantu/magazynowy z Shopera dla pakietu Dom 12
    i18n: {
      pl: { displayName: 'Pakiet 12x – Dom + firma' },
    },
    audience: 'home',
    size: 12,
    composition: [
      { productSlug: 'naczyn', quantity: 1 },
      { productSlug: 'zmywarki', quantity: 1 },
      { productSlug: 'nablyszczania', quantity: 1 },
      { productSlug: 'prania', quantity: 1 },
      { productSlug: 'plukania', quantity: 1 },
      { productSlug: 'podlog', quantity: 1 },
      { productSlug: 'wc', quantity: 1 },
      { productSlug: 'lazienki', quantity: 1 },
      { productSlug: 'myciaszyb', quantity: 1 },
      { productSlug: 'myciarak', quantity: 1 },
      { productSlug: 'odkamieniania', quantity: 1 },
      { productSlug: 'udraznianiarur', quantity: 1 }
    ],
    isCustomizable: false,
    allowsDuplicates: false,
    discountRule: bundleDiscountRules.box12
  },
  {
    id: 'firma-podstawowa-4',
    slug: 'firma-podstawowa-4',
    name: 'Firma Podstawowa 4',
    shoperStockId: null,
    i18n: {
      pl: { displayName: 'Firma Podstawowa 4' },
      en: { displayName: 'Business Essentials 4' }
    },
    audience: 'business',
    size: 4,
    composition: [
      { productSlug: 'podlog', quantity: 1 },
      { productSlug: 'wc', quantity: 1 },
      { productSlug: 'myciarak', quantity: 1 },
      { productSlug: 'lazienki', quantity: 1 }
    ],
    isCustomizable: false,
    allowsDuplicates: false,
    discountRule: bundleDiscountRules.box4
  },
  {
    id: 'firma-operacyjna-8',
    slug: 'firma-operacyjna-8',
    name: 'Firma Operacyjna 8',
    shoperStockId: null,
    i18n: {
      pl: { displayName: 'Firma Operacyjna 8' },
      en: { displayName: 'Business Operations 8' }
    },
    audience: 'business',
    size: 8,
    composition: [
      { productSlug: 'podlog', quantity: 2 },
      { productSlug: 'wc', quantity: 1 },
      { productSlug: 'lazienki', quantity: 1 },
      { productSlug: 'myciarak', quantity: 1 },
      { productSlug: 'myciaszyb', quantity: 1 },
      { productSlug: 'odkamieniania', quantity: 1 },
      { productSlug: 'naczyn', quantity: 1 }
    ],
    isCustomizable: false,
    allowsDuplicates: true,
    discountRule: bundleDiscountRules.box8
  },
  {
    id: 'firma-gastro-12',
    slug: 'firma-gastro-12',
    name: 'Firma Gastro 12',
    shoperStockId: null,
    i18n: {
      pl: { displayName: 'Firma Gastro 12' },
      en: { displayName: 'Business Gastro 12' }
    },
    audience: 'business',
    size: 12,
    composition: [
      { productSlug: 'naczyn', quantity: 1 },
      { productSlug: 'zmywarki', quantity: 1 },
      { productSlug: 'nablyszczania', quantity: 1 },
      { productSlug: 'odkamieniania', quantity: 1 },
      { productSlug: 'udraznianiarur', quantity: 1 },
      { productSlug: 'podlog', quantity: 2 },
      { productSlug: 'wc', quantity: 1 },
      { productSlug: 'lazienki', quantity: 1 },
      { productSlug: 'myciarak', quantity: 2 },
      { productSlug: 'myciaszyb', quantity: 1 }
    ],
    isCustomizable: false,
    allowsDuplicates: true,
    discountRule: bundleDiscountRules.box12
  }
];

function createBundleMediaSlots() {
  return {
    hero: { status: 'placeholder', src: null },
    composition: { status: 'data', src: null }
  };
}

export const bundles = bundleDefinitions.map((bundle) => ({
  ...bundle,
  currency: 'PLN',
  mediaSlots: createBundleMediaSlots(),
  ...createOfferIntegration('bundle', bundle.slug)
}));

export function getBundleBySlug(slug) {
  return bundles.find((bundle) => bundle.slug === slug);
}
