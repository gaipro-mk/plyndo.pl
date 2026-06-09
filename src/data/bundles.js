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
    i18n: {
      pl: { displayName: 'Dom Codzienny 4' },
      en: { displayName: 'Everyday Home 4' }
    },
    audience: 'home',
    size: 4,
    composition: [
      { productSlug: 'naczynia', quantity: 1 },
      { productSlug: 'podlogi', quantity: 1 },
      { productSlug: 'wc', quantity: 1 },
      { productSlug: 'lazienka', quantity: 1 }
    ],
    isCustomizable: false,
    allowsDuplicates: false,
    discountRule: bundleDiscountRules.box4
  },
  {
    id: 'dom-pelny-8',
    slug: 'dom-pelny-8',
    name: 'Dom Pełny 8',
    i18n: {
      pl: { displayName: 'Dom Pełny 8' },
      en: { displayName: 'Complete Home 8' }
    },
    audience: 'home',
    size: 8,
    composition: [
      { productSlug: 'naczynia', quantity: 1 },
      { productSlug: 'zmywarka', quantity: 1 },
      { productSlug: 'pranie', quantity: 1 },
      { productSlug: 'plukanie', quantity: 1 },
      { productSlug: 'podlogi', quantity: 1 },
      { productSlug: 'wc', quantity: 1 },
      { productSlug: 'szyby', quantity: 1 },
      { productSlug: 'lazienka', quantity: 1 }
    ],
    isCustomizable: false,
    allowsDuplicates: false,
    discountRule: bundleDiscountRules.box8
  },
  {
    id: 'dom-komplet-12',
    slug: 'dom-komplet-12',
    name: 'Dom Komplet 12',
    i18n: {
      pl: { displayName: 'Dom Komplet 12' },
      en: { displayName: 'Full Home 12' }
    },
    audience: 'home',
    size: 12,
    composition: [
      { productSlug: 'naczynia', quantity: 1 },
      { productSlug: 'zmywarka', quantity: 1 },
      { productSlug: 'nablyszczanie', quantity: 1 },
      { productSlug: 'pranie', quantity: 1 },
      { productSlug: 'plukanie', quantity: 1 },
      { productSlug: 'podlogi', quantity: 1 },
      { productSlug: 'wc', quantity: 1 },
      { productSlug: 'lazienka', quantity: 1 },
      { productSlug: 'szyby', quantity: 1 },
      { productSlug: 'rece', quantity: 1 },
      { productSlug: 'odkamienianie', quantity: 1 },
      { productSlug: 'udraznianie-rur', quantity: 1 }
    ],
    isCustomizable: false,
    allowsDuplicates: false,
    discountRule: bundleDiscountRules.box12
  },
  {
    id: 'firma-podstawowa-4',
    slug: 'firma-podstawowa-4',
    name: 'Firma Podstawowa 4',
    i18n: {
      pl: { displayName: 'Firma Podstawowa 4' },
      en: { displayName: 'Business Essentials 4' }
    },
    audience: 'business',
    size: 4,
    composition: [
      { productSlug: 'podlogi', quantity: 1 },
      { productSlug: 'wc', quantity: 1 },
      { productSlug: 'rece', quantity: 1 },
      { productSlug: 'lazienka', quantity: 1 }
    ],
    isCustomizable: false,
    allowsDuplicates: false,
    discountRule: bundleDiscountRules.box4
  },
  {
    id: 'firma-operacyjna-8',
    slug: 'firma-operacyjna-8',
    name: 'Firma Operacyjna 8',
    i18n: {
      pl: { displayName: 'Firma Operacyjna 8' },
      en: { displayName: 'Business Operations 8' }
    },
    audience: 'business',
    size: 8,
    composition: [
      { productSlug: 'podlogi', quantity: 2 },
      { productSlug: 'wc', quantity: 1 },
      { productSlug: 'lazienka', quantity: 1 },
      { productSlug: 'rece', quantity: 1 },
      { productSlug: 'szyby', quantity: 1 },
      { productSlug: 'odkamienianie', quantity: 1 },
      { productSlug: 'naczynia', quantity: 1 }
    ],
    isCustomizable: false,
    allowsDuplicates: true,
    discountRule: bundleDiscountRules.box8
  },
  {
    id: 'firma-gastro-12',
    slug: 'firma-gastro-12',
    name: 'Firma Gastro 12',
    i18n: {
      pl: { displayName: 'Firma Gastro 12' },
      en: { displayName: 'Business Gastro 12' }
    },
    audience: 'business',
    size: 12,
    composition: [
      { productSlug: 'naczynia', quantity: 1 },
      { productSlug: 'zmywarka', quantity: 1 },
      { productSlug: 'nablyszczanie', quantity: 1 },
      { productSlug: 'odkamienianie', quantity: 1 },
      { productSlug: 'udraznianie-rur', quantity: 1 },
      { productSlug: 'podlogi', quantity: 2 },
      { productSlug: 'wc', quantity: 1 },
      { productSlug: 'lazienka', quantity: 1 },
      { productSlug: 'rece', quantity: 2 },
      { productSlug: 'szyby', quantity: 1 }
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
