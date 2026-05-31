const productCatalog = [
  {
    id: 1,
    slug: 'naczynia',
    name: 'PŁYN DO naczyń',
    subtitle: 'Skutecznie usuwa tłuszcz – bez kompromisów',
    description: 'Skoncentrowany płyn do ręcznego mycia naczyń skutecznie usuwa tłuszcz oraz zabrudzenia spożywcze, nie pozostawiając smug ani zacieków. Sprawdza się przy myciu szkła, ceramiki, stali i plastiku oraz wszelkich przyborów kuchennych, zapewniając czystość i wygodę codziennego użytkowania.',
    howToUse: '1-2 krople płynu wycisnąć na wilgotną gąbkę, przetrzeć nią naczynia i spłukać pod bieżącą wodą, lub rozpuścić 1 łyżkę płynu w 5 l ciepłej wody. W tak przygotowanym roztworze umyć naczynia, następnie spłukać pod bieżącą wodą i pozostawić do wyschnięcia.',
    ingredients: '15-30% anionowe środki powierzchniowo czynne, <5% amfoteryczne i niejonowe środki powierzchniowo czynne, kompozycja zapachowa (Citral), substancje konserwujące (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'H315 Działa drażniąco na skórę. H319 Działa drażniąco na oczy. P264 Dokładnie umyć ręce...',
    scent: 'O zapachu arbuza',
    color: { bg: '#276142', fg: '#1c623b', text: '#FFFFFF', pattern: '#40725a' },
    iconType: 'naczynia',
    bgPattern: 'monstera',
    image: '/labels/front-01-naczyn.webp'
  },
  {
    id: 2,
    slug: 'zmywarka',
    name: 'PŁYN DO zmywarki',
    subtitle: 'Czyste naczynia bez osadów',
    description: 'Środek do zmywarek z aktywnym chlorem skutecznie usuwa tłuszcz, białko, skrobię oraz osady po kawie i herbacie. Zapewnia dokładne mycie naczyń i pomaga utrzymać ich estetyczny wygląd przy regularnym stosowaniu.',
    howToUse: 'Otwórz butelkę i wlej płyn do dozownika na detergent w zmywarce. Zamknij dozownik i wybierz program zmywania. Rekomendowane dozowanie płynu do zmywarki do każdego stopnia wody: do lekko zabrudzonych naczyń 20 ml; do średnio zabrudzonych naczyń 25 ml; do bardzo zabrudzonych naczyń 30 ml.',
    ingredients: '5-15% związki wybielające na bazie chloru, fosforany.',
    safety: 'H314 Powoduje poważne oparzenia skóry oraz uszkodzenia oczu. H400 Działa bardzo toksycznie na organizmy wodne...',
    producer: '',
    scent: 'Nabłyszczacz',
    color: { bg: '#a7444b', fg: '#72242b', text: '#FFFFFF', pattern: '#bd6266' },
    iconType: 'zmywarka',
    bgPattern: 'geometry',
    image: '/labels/front-02-zmywarki.webp'
  },
  {
    id: 3,
    slug: 'pranie',
    name: 'PŁYN DO prania',
    subtitle: 'Czystość i świeżość tkanin',
    description: 'Skutecznie usuwa zabrudzenia z tkanin, pozostawiając je czyste i odświeżone. Odpowiedni do codziennego prania różnych rodzajów odzieży.',
    howToUse: '- Najlepiej prać w temperaturze 20-60°C.\n- Do zastosowań profesjonalnych i domowych.\n- Nie przelewać produktu do niewłaściwych pojemników, butelek itp.\n- Należy przestrzegać zaleceń producentów pralek.',
    ingredients: '<5% EDTA i jego sole, enzymy, kompozycja zapachowa, substancje konserwujące (Methylisothiazolinone, Methylchloroisothiazolinone), 5-15% anionowe środki powierzchniowo czynne, niejonowe środki powierzchniowo czynne.',
    safety: 'H315 Działa drażniąco na skórę. P264 Dokładnie umyć ręce...',
    producer: '',
    scent: 'O zapachu świeżości',
    color: { bg: '#a5c7eb', fg: '#60A5D8', text: '#1E4C7A', pattern: '#bed5f0' },
    iconType: 'pranie',
    bgPattern: 'brush',
    image: '/labels/front-03-prania.webp'
  },
  {
    id: 4,
    slug: 'plukanie',
    name: 'PŁYN DO płukania',
    subtitle: 'Miękkość i świeży zapach',
    description: 'Ułatwia płukanie tkanin, nadając im miękkość i przyjemny zapach. Sprawia, że ubrania są bardziej komfortowe w użytkowaniu. Opracowana formuła ułatwia prasowanie, a składniki antystatyczne zawarte w płynie zapobiegają elektryzowaniu się ubrań. Do płukania tkanin naturalnych i syntetycznych.',
    howToUse: 'Pranie automatyczne - 40 ml / 4-5 kg prania.\nPranie ręczne - 20 ml / 10 l wody.',
    ingredients: '5-15% kationowe środki powierzchniowo czynne, <5% kompozycja zapachowa.',
    safety: 'Chronić przed dziećmi.',
    producer: '',
    scent: 'O zapachu Wooly Blizz',
    color: { bg: '#A692C6', fg: '#725CA6', text: '#FFFFFF', pattern: '#8F7BB5' },
    iconType: 'plukanie',
    bgPattern: 'flowers',
    image: '/labels/front-04-plukania.webp'
  },
  {
    id: 5,
    slug: 'podlogi',
    name: 'PŁYN DO podłóg',
    subtitle: 'Świeżość na każdej powierzchni',
    description: 'Dokładnie czyści podłogi, usuwając codzienne zabrudzenia i pozostawiając je czyste oraz odświeżone. Nie tworzy smug ani zacieków, dzięki czemu powierzchnie zachowują estetyczny wygląd.',
    howToUse: 'Stosować 30-50 ml płynu na 10 l wody. Czyścić powierzchnię przy użyciu mopa. UWAGA: przed zastosowaniem należy sprawdzić działanie produktu w niewidocznym miejscu. Postępowanie według powyższych zaleceń producenta gwarantuje czyste powierzchnie bez smug.',
    ingredients: '<5% anionowe i niejonowe środki powierzchniowo czynne, fosforany, EDTA i jego sole, kompozycja zapachowa (Citral), substancje konserwujące (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'H319 Działa drażniąco na oczy. P264 Dokładnie umyć ręce...',
    producer: '',
    scent: 'O zapachu pomarańczy',
    color: { bg: '#784638', fg: '#542E24', text: '#FFFFFF', pattern: '#8E5A4B' },
    iconType: 'podlogi',
    bgPattern: 'wood',
    image: '/labels/front-05-podlog.webp'
  },
  {
    id: 6,
    slug: 'wc',
    name: 'PŁYN DO WC',
    subtitle: 'Higiena, która działa',
    description: 'Skutecznie usuwa kamień, osady i zabrudzenia w toalecie, docierając również do trudno dostępnych miejsc. Pomaga utrzymać czystość i świeżość przy regularnym stosowaniu.',
    howToUse: 'Ścisnąć nakrętkę w oznaczonych miejscach i odkręcić. Polać wnętrze muszli klozetowej. Spłukać po ok. 15 min. Po użyciu zakręcić do momentu kliknięcia.',
    ingredients: '<5% anionowe i niejonowe środki powierzchniowo czynne, fosfoniany, kompozycja zapachowa (Citral), substancje konserwujące (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'Działa drażniąco na oczy i skórę. Chronić przed dziećmi.',
    producer: '',
    scent: 'O zapachu cytryny',
    color: { bg: '#E0E0E0', fg: '#A3A3A3', text: '#1A1A1A', pattern: '#D1D1D1' },
    iconType: 'wc',
    bgPattern: 'waves',
    image: '/labels/front-06-wc.webp'
  },
  {
    id: 7,
    slug: 'rece',
    name: 'PŁYN DO mycia rąk',
    subtitle: 'Codzienna higiena i komfort',
    description: 'Delikatny, a jednocześnie skuteczny płyn do mycia rąk, usuwa zabrudzenia i pozostawia skórę czystą oraz odświeżoną. Odpowiedni do częstego stosowania, sprawdza się w domu i miejscach publicznych.',
    howToUse: 'Nanieść niewielką ilość preparatu na dłonie. Mycie rąk przeprowadzać zgodnie ze standardową procedurą, następnie spłukać ręce czystą wodą i osuszyć je.',
    ingredients: 'Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Propylene Glycol, Glycerin, Parfum (Citronellol, Hexyl Cinnamal, Linalool), Styrene/Acrylates Copolymer, Coco-Glucoside (and) Glyceryl Oleate, Sodium Benzoate, Sodium Chloride, Potassium Sorbate, Polyquaternium-7, Citric Acid, Sodium Lauryl Sulfate.',
    safety: 'Tylko do użytku zewnętrznego. Unikać kontaktu z oczami.',
    producer: '',
    scent: 'O zapachu Oud Wood',
    color: { bg: '#eac973', fg: '#9f7849', text: '#3E341B', pattern: '#eac973' },
    iconType: 'rece',
    bgPattern: 'topo',
    image: '/labels/front-07-rece.webp'
  },
  {
    id: 8,
    slug: 'szyby',
    name: 'PŁYN DO mycia szyb',
    subtitle: 'Krystaliczna czystość bez smug',
    description: 'Skutecznie usuwa zabrudzenia, kurz i ślady palców, pozostawiając powierzchnie szklane idealnie przejrzyste. Szybko odparowuje i nie pozostawia smug, przywracając naturalny połysk.',
    howToUse: 'Niewielką ilość płynu nanieść na zabrudzoną powierzchnię przez naciśnięcie spryskiwacza. Następnie wytrzeć powierzchnię przy pomocy ściereczki z mikrofibry lub papierowego ręcznika do uzyskania idealnego połysku. Czyszczenie monitorów i ekranów: nanieść preparat na papierowy ręcznik lub ścierkę z mikrofibry, następnie wytrzeć powierzchnię.',
    ingredients: '<5% anionowe środki powierzchniowo czynne, kompozycja zapachowa (Citral). Zawiera: alkohol etylowy.',
    safety: 'Chronić przed dziećmi. Wysoce łatwopalna ciecz i pary.',
    producer: '',
    scent: 'O zapachu cytryny',
    color: { bg: '#A7CFEA', fg: '#2A7F96', text: '#114455', pattern: '#BDE0F5' },
    iconType: 'szyby',
    bgPattern: 'floral',
    image: '/labels/front-08-szyby.webp'
  },
  {
    id: 9,
    slug: 'lazienka',
    name: 'PŁYN DO łazienki',
    subtitle: 'Usuwa kamień i przywraca blask',
    description: 'Skutecznie usuwa osady z wody, kamień oraz pozostałości mydła, przywracając powierzchniom czystość i połysk. Sprawdza się w czyszczeniu armatury i płytek.',
    howToUse: 'Niewielką ilość płynu nanieść na zabrudzoną powierzchnię przez naciśnięcie spryskiwacza i pozostawić na około 5 minut. Następnie spłukać i zetrzeć powierzchnię przy pomocy ściereczki z mikrofibry lub ręcznika papierowego do uzyskania idealnego połysku.',
    ingredients: '<5% anionowe i niejonowe środki powierzchniowo czynne, fosfoniany, kompozycja zapachowa (Citral), substancje konserwujące (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'H315 Działa drażniąco na skórę. H319 Działa drażniąco na oczy.',
    producer: '',
    scent: 'O zapachu cytryny',
    color: { bg: '#5c77b7', fg: '#3f5398', text: '#FFFFFF', pattern: '#3f5398' },
    iconType: 'lazienka',
    bgPattern: 'blobs',
    image: '/labels/front-09-lazienki.webp'
  },
  {
    id: 10,
    slug: 'dezynfekcja',
    name: 'PŁYN DO dezynfekcji',
    subtitle: 'Natychmiastowa ochrona',
    description: 'Preparat przeznaczony do dezynfekcji dłoni i powierzchni, skutecznie eliminuje bakterie, wirusy i grzyby. Działa szybko i nie pozostawia lepkiej warstwy, zapewniając wysoki poziom higieny w codziennym użytkowaniu.',
    howToUse: 'Nanieść niewielką ilość preparatu na czyste i suche dłonie, wcierać w skórę rąk w czasie 30 sekund, pozostawić do wyschnięcia. Cała dezynfekowana powierzchnia rąk musi być wilgotna przez co najmniej 30 sekund.',
    ingredients: 'Substancja czynna: etanol WE 200-578-6 CAS 64-17-5, zawartość: 800g/kg.',
    safety: 'H225 Wysoce łatwopalna ciecz i pary. P210 Przechowywać z dala od źródeł ciepła...',
    producer: '',
    scent: 'Bez zapachu',
    color: { bg: '#ececec', fg: '#C7C7C7', text: '#1A1A1A', pattern: '#FFFFFF' },
    iconType: 'dezynfekcja',
    bgPattern: 'confetti',
    image: '/labels/front-10-dezynfekcji.webp'
  }
];

const productDetailEn = {
  naczynia: {
    subtitle: 'Cuts through grease without compromise',
    description: 'A concentrated liquid for hand washing dishes. It removes grease and food soil without streaks or residue and works on glass, ceramics, steel, plastic, and everyday kitchen utensils.',
    howToUse: 'Apply 1-2 drops to a damp sponge, wash the dishes, then rinse under running water. You can also dissolve 1 tablespoon in 5 l of warm water, wash in the solution, rinse, and leave to dry.',
    ingredients: '15-30% anionic surfactants, <5% amphoteric and non-ionic surfactants, fragrance composition (Citral), preservatives (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'H315 Causes skin irritation. H319 Causes serious eye irritation. Wash hands thoroughly after handling.',
    scent: 'Watermelon scent',
  },
  zmywarka: {
    subtitle: 'Clean dishes without deposits',
    description: 'A dishwasher detergent with active chlorine for grease, protein, starch, coffee, and tea deposits. It supports thorough cleaning and helps dishes keep a clean appearance with regular use.',
    howToUse: 'Pour the liquid into the dishwasher detergent dispenser, close it, and select a wash program. Recommended dose: 20 ml for lightly soiled dishes, 25 ml for medium soil, and 30 ml for heavy soil.',
    ingredients: '5-15% chlorine-based bleaching agents, phosphates.',
    safety: 'H314 Causes severe skin burns and eye damage. H400 Very toxic to aquatic life.',
    scent: 'Rinse-aid finish',
  },
  pranie: {
    subtitle: 'Clean and fresh fabrics',
    description: 'A liquid detergent for everyday laundry that removes common soil from fabrics and leaves clothing clean and refreshed.',
    howToUse: '- Best used at 20-60 C.\n- Suitable for home and professional use.\n- Do not transfer the product into unsuitable containers.\n- Follow the washing machine manufacturer instructions.',
    ingredients: '<5% EDTA and its salts, enzymes, fragrance composition, preservatives (Methylisothiazolinone, Methylchloroisothiazolinone), 5-15% anionic and non-ionic surfactants.',
    safety: 'H315 Causes skin irritation. Wash hands thoroughly after handling.',
    scent: 'Fresh scent',
  },
  plukanie: {
    subtitle: 'Softness and a fresh scent',
    description: 'A fabric softener for natural and synthetic textiles. It improves softness and comfort, supports easier ironing, and helps reduce static.',
    howToUse: 'Automatic wash: 40 ml per 4-5 kg load.\nHand wash: 20 ml per 10 l of water.',
    ingredients: '5-15% cationic surfactants, <5% fragrance composition.',
    safety: 'Keep out of reach of children.',
    scent: 'Wooly Blizz scent',
  },
  podlogi: {
    subtitle: 'Freshness across surfaces',
    description: 'A floor cleaner for everyday soil. It leaves floors clean and refreshed without streaks or residue when used as directed.',
    howToUse: 'Use 30-50 ml per 10 l of water and clean with a mop. Test the product in an inconspicuous place before use.',
    ingredients: '<5% anionic and non-ionic surfactants, phosphates, EDTA and its salts, fragrance composition (Citral), preservatives (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'H319 Causes serious eye irritation. Wash hands thoroughly after handling.',
    scent: 'Orange scent',
  },
  wc: {
    subtitle: 'Hygiene that works',
    description: 'A toilet cleaner for scale, deposits, and everyday soil, including hard-to-reach areas. It helps keep the bowl clean and fresh with regular use.',
    howToUse: 'Press and open the cap, apply inside the toilet bowl, leave for about 15 minutes, then flush. Close the cap until it clicks after use.',
    ingredients: '<5% anionic and non-ionic surfactants, phosphonates, fragrance composition (Citral), preservatives (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'Irritating to eyes and skin. Keep out of reach of children.',
    scent: 'Lemon scent',
  },
  rece: {
    subtitle: 'Everyday hygiene and comfort',
    description: 'A gentle and effective hand wash for frequent use at home or in shared spaces. It removes common soil and leaves hands clean and refreshed.',
    howToUse: 'Apply a small amount to hands, wash following a standard hand washing routine, rinse with clean water, and dry.',
    ingredients: 'Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Propylene Glycol, Glycerin, Parfum, and other label-listed cosmetic ingredients.',
    safety: 'Use as directed and avoid contact with eyes.',
    scent: 'Gentle fragrance',
  },
  szyby: {
    subtitle: 'Clear glass without streaks',
    description: 'A liquid for glass, mirrors, and glossy surfaces. It removes everyday marks and helps leave a clean, transparent finish.',
    howToUse: 'Spray a small amount onto the surface, wipe with a microfiber cloth or paper towel, and polish until clear.',
    ingredients: '<5% anionic surfactants, fragrance composition, preservatives according to the product label.',
    safety: 'Use as directed. Keep out of reach of children.',
    scent: 'Fresh scent',
  },
  lazienka: {
    subtitle: 'Removes scale and restores shine',
    description: 'A bathroom cleaner for water deposits, limescale, and soap residue on fittings and tiles.',
    howToUse: 'Spray a small amount on the soiled surface, leave for about 5 minutes, rinse, and wipe with a microfiber cloth or paper towel until glossy.',
    ingredients: '<5% anionic and non-ionic surfactants, phosphonates, fragrance composition (Citral), preservatives (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'H315 Causes skin irritation. H319 Causes serious eye irritation.',
    scent: 'Lemon scent',
  },
  dezynfekcja: {
    subtitle: 'Fast hygiene support',
    description: 'A preparation intended for hand and surface disinfection. It acts quickly and does not leave a sticky layer when used correctly.',
    howToUse: 'Apply to clean, dry hands, rub for 30 seconds, and leave to dry. The disinfected hand surface must stay wet for at least 30 seconds.',
    ingredients: 'Active substance: ethanol EC 200-578-6 CAS 64-17-5, content: 800 g/kg.',
    safety: 'H225 Highly flammable liquid and vapour. Keep away from heat and ignition sources.',
    scent: 'Unscented',
  },
};

export const offerIntegrationConfig = {
  status: 'dummy',
  skuPrefixes: {
    product: 'DUMMY-PRODUCT-',
    bundle: 'DUMMY-BUNDLE-'
  },
  shoperPaths: {
    product: '/shoper-placeholder/products/',
    bundle: '/shoper-placeholder/bundles/'
  },
  qrPaths: {
    product: '/qr-placeholder/products/',
    bundle: '/qr-placeholder/bundles/'
  },
  cta: {
    status: 'disabled',
    kind: 'placeholder',
    isPlaceholder: true,
    label: {
      pl: 'Wkrótce w sklepie',
      en: 'Store link coming soon'
    }
  }
};

const productOfferFields = {
  naczynia: {
    shortName: 'Naczynia',
    i18n: {
      pl: { displayName: 'Płyn do naczyń', shortName: 'Naczynia' },
      en: { displayName: 'Dishwashing liquid', shortName: 'Dishes' }
    },
    audiences: ['home', 'business'],
    listPrice: 19.9
  },
  zmywarka: {
    shortName: 'Zmywarka',
    i18n: {
      pl: { displayName: 'Płyn do zmywarki', shortName: 'Zmywarka' },
      en: { displayName: 'Dishwasher detergent', shortName: 'Dishwasher' }
    },
    audiences: ['home', 'business'],
    listPrice: 29.9
  },
  pranie: {
    shortName: 'Pranie',
    i18n: {
      pl: { displayName: 'Płyn do prania', shortName: 'Pranie' },
      en: { displayName: 'Laundry detergent', shortName: 'Laundry' }
    },
    audiences: ['home'],
    listPrice: 34.9
  },
  plukanie: {
    shortName: 'Płukanie',
    i18n: {
      pl: { displayName: 'Płyn do płukania', shortName: 'Płukanie' },
      en: { displayName: 'Fabric softener', shortName: 'Softener' }
    },
    audiences: ['home'],
    listPrice: 24.9
  },
  podlogi: {
    shortName: 'Podłogi',
    i18n: {
      pl: { displayName: 'Płyn do podłóg', shortName: 'Podłogi' },
      en: { displayName: 'Floor cleaner', shortName: 'Floors' }
    },
    audiences: ['home', 'business'],
    listPrice: 22.9
  },
  wc: {
    shortName: 'WC',
    i18n: {
      pl: { displayName: 'Płyn do WC', shortName: 'WC' },
      en: { displayName: 'Toilet cleaner', shortName: 'Toilet' }
    },
    audiences: ['home', 'business'],
    listPrice: 19.9
  },
  rece: {
    shortName: 'Ręce',
    i18n: {
      pl: { displayName: 'Płyn do mycia rąk', shortName: 'Ręce' },
      en: { displayName: 'Hand wash', shortName: 'Hands' }
    },
    audiences: ['home', 'business'],
    listPrice: 27.9
  },
  szyby: {
    shortName: 'Szyby',
    i18n: {
      pl: { displayName: 'Płyn do mycia szyb', shortName: 'Szyby' },
      en: { displayName: 'Glass cleaner', shortName: 'Glass' }
    },
    audiences: ['home', 'business'],
    listPrice: 21.9
  },
  lazienka: {
    shortName: 'Łazienka',
    i18n: {
      pl: { displayName: 'Płyn do łazienki', shortName: 'Łazienka' },
      en: { displayName: 'Bathroom cleaner', shortName: 'Bathroom' }
    },
    audiences: ['home', 'business'],
    listPrice: 24.9
  },
  dezynfekcja: {
    shortName: 'Dezynfekcja',
    i18n: {
      pl: { displayName: 'Płyn do dezynfekcji', shortName: 'Dezynfekcja' },
      en: { displayName: 'Disinfectant', shortName: 'Disinfection' }
    },
    audiences: ['home', 'business'],
    listPrice: 39.9
  }
};

function toSkuToken(slug) {
  return slug.toUpperCase().replace(/-/g, '_');
}

export function createOfferIntegration(kind, slug) {
  const skuPrefix = offerIntegrationConfig.skuPrefixes[kind];
  const shoperPath = offerIntegrationConfig.shoperPaths[kind];
  const qrPath = offerIntegrationConfig.qrPaths[kind];

  return {
    status: offerIntegrationConfig.status,
    sku: `${skuPrefix}${toSkuToken(slug)}`,
    shoperUrl: `${shoperPath}${slug}`,
    qrTargetUrl: `${qrPath}${slug}`,
    cta: offerIntegrationConfig.cta
  };
}

function createProductMediaSlots(labelImage) {
  const videoSlots = [
    { id: 'effectiveness', status: 'placeholder', src: null },
    { id: 'how-to', status: 'placeholder', src: null }
  ];

  return {
    bottleImage: null,
    videoSlots,
    mediaSlots: {
      label: { status: 'ready', src: labelImage },
      bottle: { status: 'placeholder', src: null },
      videos: videoSlots
    }
  };
}

export const products = productCatalog.map((product) => {
  const offer = productOfferFields[product.slug];

  let videoSrc = null;
  let bottleFront = null;
  let bottleBack = null;

  switch(product.slug) {
    case 'naczynia': 
      videoSrc = '/video/vid_exploaded_naczynia.mp4'; 
      bottleFront = '/images/bottles/bottle-front-naczynia.webp';
      bottleBack = '/images/bottles/bottle-back-naczynia.webp';
      break;
    case 'zmywarka': 
      videoSrc = '/video/vid_zmywarka.mp4'; 
      bottleFront = '/images/bottles/bottle-front-zmywarka.webp';
      bottleBack = '/images/bottles/bottle-back-zmywarka.webp';
      break;
    case 'pranie': 
      videoSrc = '/video/vid_pranie.mp4'; 
      bottleFront = '/images/bottles/bottle-front-pranie.webp';
      bottleBack = '/images/bottles/bottle-back-pranie.webp';
      break;
    case 'plukanie': 
      videoSrc = '/video/vid_plukanie.mp4'; 
      bottleFront = '/images/bottles/bottle-front-plukanie.webp';
      bottleBack = '/images/bottles/bottle-back-plukanie.webp';
      break;
    case 'podlogi': 
      videoSrc = '/video/vid_podlogi.mp4'; 
      bottleFront = '/images/bottles/bottle-front-podlogi.webp';
      bottleBack = '/images/bottles/bottle-back-podlogi.webp';
      break;
    case 'wc': 
      videoSrc = '/video/vid_wc.mp4'; 
      bottleFront = '/images/bottles/bottle-front-wc.webp';
      bottleBack = '/images/bottles/bottle-back-wc.webp';
      break;
    case 'rece': 
      videoSrc = '/video/vid_rece.mp4'; 
      bottleFront = '/images/bottles/bottle-front-rece.webp';
      bottleBack = '/images/bottles/bottle-back-rece.webp';
      break;
    case 'szyby': 
      videoSrc = '/video/vid_szyby.mp4'; 
      bottleFront = '/images/bottles/bottle-front-szyby.webp';
      bottleBack = '/images/bottles/bottle-back-szyby.webp';
      break;
    case 'lazienka': 
      videoSrc = '/video/vid_lazienka.mp4'; 
      bottleFront = '/images/bottles/bottle-front-lazienka.webp';
      bottleBack = '/images/bottles/bottle-back-lazienka.webp';
      break;
    case 'dezynfekcja': 
      videoSrc = null; 
      break;
  }

  return {
    ...product,
    ...offer,
    videoSrc,
    bottleFront,
    bottleBack,
    i18n: {
      pl: {
        ...offer.i18n.pl,
        name: product.name,
        subtitle: product.subtitle,
        description: product.description,
        howToUse: product.howToUse,
        ingredients: product.ingredients,
        safety: product.safety,
        scent: product.scent,
      },
      en: {
        ...offer.i18n.en,
        name: offer.i18n.en.displayName,
        ...productDetailEn[product.slug],
      },
    },
    volume: {
      value: 1,
      unit: 'l',
      status: 'dummy'
    },
    currency: 'PLN',
    listPriceStatus: 'dummy',
    ...createProductMediaSlots(product.image),
    ...createOfferIntegration('product', product.slug)
  };
});
