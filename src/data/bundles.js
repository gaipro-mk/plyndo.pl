import { createOfferIntegration, products } from './products.js';

export const bundleDiscountRules = {
  komplet12: {
    type: 'percentage',
    rate: 0.4
  },
  box4: {
    type: 'percentage',
    rate: 0.2
  },
  box8: {
    type: 'percentage',
    rate: 0.3
  },
  box12: {
    type: 'percentage',
    rate: 0.4
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
      pl: {
        displayName: 'Pakiet 4x – Starter',
        description: 'Zestaw 4 płynów PŁYN DO na start. Dobry wybór do domu, mieszkania albo małego biura, kiedy chcesz zacząć od podstaw. Pakiet 4x Starter to najmniejszy gotowy pakiet PŁYN DO. Powstał dla osób, które chcą sprawdzić nasze produkty w praktyce i zacząć od najważniejszych zastosowań bez zamawiania dużego kartonu. Cztery butelki pozwalają ogarnąć codzienne zadania w domu albo małym miejscu pracy. To wygodny wybór na pierwsze zamówienie, do mniejszego mieszkania, kawalerki, home office albo niewielkiego biura. Jeśli po czasie okaże się, że potrzebujesz większego zapasu, możesz łatwo przejść na pakiet 8x lub 12x i zyskać lepszą cenę za butelkę.',
        benefits: [
          'Dobry wybór na start dla osób, które chcą poznać PŁYN DO w praktyce, zanim sięgną po większy zapas.',
          'Idealny do mniejszego mieszkania, kawalerki albo małego biura, gdzie liczy się prosty zakup i brak nadmiaru w szafce.',
          'To pakiet dla klientów, którzy chcą sprawdzić jakość producenta bez kupowania większej ilości niż faktycznie potrzebują.',
          'Wygodny sposób, żeby zacząć od podstaw i zobaczyć, jak produkty PŁYN DO sprawdzają się na co dzień.',
          'Dla osób, które wolą rozsądny pierwszy zakup zamiast przypadkowego kompletowania środków czystości.'
        ]
      },
    },
    audience: 'home',
    size: 4,
    composition: [
      { productSlug: 'naczyn', quantity: 1 },
      { productSlug: 'podlog', quantity: 1 },
      { productSlug: 'myciaszyb', quantity: 1 },
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
      pl: {
        displayName: 'Pakiet 8x – Dom na co dzień',
        description: 'Najczęściej wybierany pakiet 8 płynów PŁYN DO. Wygodny zapas do regularnego sprzątania domu, mieszkania i małej firmy. Pakiet 8x Dom na co dzień to najbardziej uniwersalny zestaw PŁYN DO. Osiem butelek daje wygodny zapas środków do codziennych zadań w domu, mieszkaniu, domowym biurze albo małej firmie. To pakiet dla tych, którzy chcą mieć pod ręką podstawowe produkty do kuchni, łazienki, podłóg, prania i bieżącego utrzymania porządku. Nie za mało, nie za dużo — po prostu rozsądny zapas na regularne użycie. Pakiet 8x dobrze łączy wygodę z ceną. Daje korzystniejszy koszt za butelkę niż mniejsze zamówienie, a jednocześnie nie wymaga przechowywania bardzo dużej liczby produktów.',
        benefits: [
          'Najbardziej uniwersalny wybór do domu, bo daje zapas, który realnie wystarcza na codzienne używanie.',
          'Dobrze sprawdza się tam, gdzie środki czystości schodzą regularnie, ale nadal chcesz utrzymać porządek i kontrolę nad zapasami.',
          'To pakiet dla rodzin, osób pracujących z domu i mieszkań, w których liczy się wygoda jednego zamówienia.',
          'Dobry także do małego biura lub gabinetu, jeśli potrzebujesz pewnego zestawu do codziennego utrzymania czystości.',
          'Wybór dla klientów, którzy chcą połączyć komfort, opłacalność i brak częstego dokupowania tych samych produktów.'
        ]
      },
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
      pl: {
        displayName: 'Pakiet 12x – Dom + firma',
        description: 'Największy pakiet PŁYN DO 12 butelek. Jeden wybór, większy zapas i najlepsza cena za butelkę w całej ofercie. Pakiet 12x Dom + firma to największy gotowy zestaw PŁYN DO dla tych, którzy chcą mieć temat chemii gospodarczej ogarnięty na dłużej. To dobry wybór, gdy jednym zamówieniem chcesz zadbać o dom, miejsce pracy albo oba te obszary naraz. Dwanaście butelek pozwala zbudować pełniejszy zapas do kuchni, łazienki, podłóg, prania, zmywarki i codziennego sprzątania. Ten pakiet szczególnie dobrze sprawdza się tam, gdzie zużycie jest większe albo gdzie ważna jest regularność i przewidywalność. To także najbardziej opłacalny wariant pod względem ceny za butelkę. Rzadziej wracasz do tematu zakupów, a częściej po prostu korzystasz z gotowego zapasu.',
        benefits: [
          'Najmocniejsza opcja dla tych, którzy chcą zrobić większy zapas i mieć spokój na dłużej.',
          'Stworzony do domu i firmy, gdzie środki czystości są używane intensywnie i nie mogą się kończyć w najmniej odpowiednim momencie.',
          'To pakiet dla biur, gabinetów, salonów usługowych i małych firm, które wolą kupić raz niż regularnie wracać do zakupów.',
          'Najlepszy wybór, gdy liczy się jedna dostawa, pełniejszy zapas i najwyższa opłacalność w przeliczeniu na butelkę.',
          'Dla klientów, którzy chcą połączyć wygodę, jakość producenta i zakup, który realnie oszczędza czas.'
        ]
      },
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
