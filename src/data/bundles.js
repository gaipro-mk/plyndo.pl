import { createOfferIntegration, products } from './products.js';

export const bundleDiscountRules = {
  starter10: {
    type: 'percentage',
    rate: 0.45
  },
  box4: {
    type: 'percentage',
    rate: 0.3
  },
  box8: {
    type: 'percentage',
    rate: 0.4
  }
};

const starter10Composition = products.map((product) => ({
  productSlug: product.slug,
  quantity: 1
}));

const bundleDefinitions = [
  {
    id: 'starter-10',
    slug: 'starter-10',
    name: 'Starter 10',
    i18n: {
      pl: { displayName: 'Starter 10' },
      en: { displayName: 'Starter 10' }
    },
    audience: 'all',
    size: starter10Composition.length,
    composition: starter10Composition,
    isCustomizable: false,
    allowsDuplicates: false,
    discountRule: bundleDiscountRules.starter10
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
      { productSlug: 'pranie', quantity: 1 },
      { productSlug: 'plukanie', quantity: 1 },
      { productSlug: 'podlogi', quantity: 1 },
      { productSlug: 'wc', quantity: 1 },
      { productSlug: 'rece', quantity: 1 },
      { productSlug: 'szyby', quantity: 1 },
      { productSlug: 'lazienka', quantity: 1 }
    ],
    isCustomizable: false,
    allowsDuplicates: false,
    discountRule: bundleDiscountRules.box8
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
      { productSlug: 'dezynfekcja', quantity: 1 },
      { productSlug: 'naczynia', quantity: 1 }
    ],
    isCustomizable: false,
    allowsDuplicates: true,
    discountRule: bundleDiscountRules.box8
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
