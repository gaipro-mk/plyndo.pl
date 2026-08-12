const productCatalog = [
  {
    id: 1,
    stockId: 182,
    slug: 'naczyn',
    urlSlug: 'plyn-do-naczyn',
    name: 'PŁYN DO naczyń',
    shoperStockId: 182, // np. 184 (ID wariantu z Shopera dla: PŁYN DO naczyń)
    subtitle: 'Skutecznie usuwa tłuszcz – bez kompromisów',
    description: 'Skoncentrowany płyn do ręcznego mycia naczyń skutecznie usuwa tłuszcz oraz zabrudzenia spożywcze, nie pozostawiając smug ani zacieków. Sprawdza się przy myciu szkła, ceramiki, stali i plastiku oraz wszelkich przyborów kuchennych, zapewniając czystość i wygodę codziennego użytkowania.',
    howToUse: '1-2 krople płynu wycisnąć na wilgotną gąbkę, przetrzeć nią naczynia i spłukać pod bieżącą wodą, lub rozpuścić 1 łyżkę płynu w 5 l ciepłej wody. W tak przygotowanym roztworze umyć naczynia, następnie spłukać pod bieżącą wodą i pozostawić do wyschnięcia.',
    ingredients: '15-30% anionowe środki powierzchniowo czynne, <5% amfoteryczne i niejonowe środki powierzchniowo czynne, kompozycja zapachowa (Citral), substancje konserwujące (Methylisothiazolinone, Methylchloroisothiazolinone). Zawiera: Alkohole, C12-14, etoksylowane, siarczany, sole sodowe. Kwas alkilobenzosulfonowy, sól sodowa.',
    safety: 'H315 Działa drażniąco na skórę. H319 Działa drażniąco na oczy. P264 Dokładnie umyć ręce i dotknięte części ciała po użyciu. P305+P351+P338 W PRZYPADKU DOSTANIA SIĘ DO OCZU: Ostrożnie płukać wodą przez kilka minut. Wyjąć soczewki kontaktowe, jeżeli są i można je łatwo usunąć. Nadal płukać. P337+P313 W przypadku utrzymywania się działania drażniącego na oczy: Zasięgnąć porady/zgłosić się pod opiekę lekarza. P362 Zdjąć zanieczyszczoną odzież. UFI: 2H97-GUCW-N208-CFYX',
    warningWord: 'UWAGA',
    pictograms: ['GHS07'],
    scent: 'O zapachu arbuza',
    color: { bg: '#276142', fg: '#1c623b', text: '#FFFFFF', pattern: '#40725a' },
    iconType: 'naczynia',
    bgPattern: 'monstera',
    image: '/labels/front-01-naczyn.webp'
  },
  {
    id: 2,
    stockId: 183,
    slug: 'zmywarki',
    urlSlug: 'plyn-do-zmywarki',
    name: 'PŁYN DO zmywarki',
    shoperStockId: 183, // np. 185 (ID wariantu z Shopera dla: PŁYN DO zmywarki)
    subtitle: 'Czyste naczynia bez osadów',
    description: 'Środek do zmywarek z aktywnym chlorem skutecznie usuwa tłuszcz, białko, skrobię oraz osady po kawie i herbacie. Zapewnia dokładne mycie naczyń i pomaga utrzymać ich estetyczny wygląd przy regularnym stosowaniu.',
    howToUse: 'Otwórz butelkę i wlej płyn do dozownika na detergent w zmywarce. Zamknij dozownik i wybierz program zmywania. Rekomendowane dozowanie płynu do zmywarki do każdego stopnia wody: do lekko zabrudzonych naczyń 20 ml; do średnio zabrudzonych naczyń 25 ml; do bardzo zabrudzonych naczyń 30 ml.',
    ingredients: '15-30% niejonowe środki powierzchniowo czynne.',
    safety: 'H314 Powoduje poważne oparzenia skóry oraz uszkodzenia oczu. P260 Nie wdychać pyłu/dymu/gazu/mgły/par/rozpylonej cieczy. P280 Stosować rękawice ochronne/odzież ochronną/ochronę oczu/ochronę twarzy. P301+P330+P331 W PRZYPADKU POŁKNIĘCIA: wypłukać usta. NIE wywoływać wymiotów. P303+P361+P353 W PRZYPADKU KONTAKTU ZE SKÓRĄ (lub z włosami): Natychmiast zdjąć całą zanieczyna całą zanieczyszczoną odzież. Spłukać skórę pod strumieniem wody lub prysznicem. P305+P351+P338 W PRZYPADKU DOSTANIA SIĘ DO OCZU: Ostrożnie płukać wodą przez kilka minut. Wyjąć soczewki kontaktowe, jeżeli są i można je łatwo usunąć. Nadal płukać. P310 Natychmiast skontaktować się z lekarzem. P391 Zebrać wyciek. UFI: 7940-80AU-T00N-WX4J',
    warningWord: 'Niebezpieczeństwo',
    pictograms: ['GHS05', 'GHS09'],
    producer: '',
    scent: 'Nabłyszczacz',
    color: { bg: '#a7444b', fg: '#72242b', text: '#FFFFFF', pattern: '#bd6266' },
    iconType: 'zmywarka',
    bgPattern: 'geometry',
    image: '/labels/front-02-zmywarki.webp'
  },
  {
    id: 3,
    stockId: 184,
    slug: 'prania',
    urlSlug: 'plyn-do-prania',
    name: 'PŁYN DO prania',
    shoperStockId: 184, // np. 186 (ID wariantu z Shopera dla: PŁYN DO prania)
    subtitle: 'Czystość i świeżość tkanin',
    description: 'Skutecznie usuwa zabrudzenia z tkanin, pozostawiając je czyste i odświeżone. Odpowiedni do codziennego prania różnych rodzajów odzieży.',
    howToUse: '- Najlepiej prać w temperaturze 20-60°C.\n- Do zastosowań profesjonalnych i domowych.\n- Nie przelewać produktu do niewłaściwych pojemników, butelek itp.\n- Należy przestrzegać zaleceń producentów pralek.',
    ingredients: '<5% EDTA i jego sole, enzymy, kompozycja zapachowa, substancje konserwujące (Methylisothiazolinone, Methylchloroisothiazolinone), 5-15% anionowe środki powierzchniowo czynne, niejonowe środki powierzchniowo czynne. Zawiera: Alkohole, C12-14, etoksylowane, siarczany, sole sodowe.',
    safety: 'H315 Działa drażniąco na skórę. P264 Dokładnie umyć ręce i dotknięte części ciała po użyciu. P280 Stosować ochronę oczu. P302+P352 W PRZYPADKU KONTAKTU ZE SKÓRĄ: Umyć dużą ilością wody i mydła. P305+P351+P338 W PRZYPADKU DOSTANIA SIĘ DO OCZU: Ostrożnie płukać wodą przez kilka minut. Wyjąć soczewki kontaktowe, jeżeli są i można je łatwo usunąć. Nadal płukać. P310 Natychmiast skontaktować się z lekarzem. P321 Zastosować określone leczenie. EUH208 Zawiera celulaza, Lipaza, Triacyloglicerol, α-amylaza. Może powodować wystąpienie reakcji alergicznej. UFI: 0D10-10VC-D00U-EAAC',
    warningWord: 'UWAGA',
    pictograms: ['GHS07'],
    producer: '',
    scent: 'O zapachu świeżości',
    color: { bg: '#a5c7eb', fg: '#60A5D8', text: '#1E4C7A', pattern: '#bed5f0' },
    iconType: 'pranie',
    bgPattern: 'brush',
    image: '/labels/front-03-prania.webp'
  },
  {
    id: 4,
    stockId: 185,
    slug: 'plukania',
    urlSlug: 'plyn-do-plukania',
    name: 'PŁYN DO płukania',
    shoperStockId: 185, // np. 187 (ID wariantu z Shopera dla: PŁYN DO płukania)
    subtitle: 'Miękkość i świeży zapach',
    description: 'Ułatwia płukanie tkanin, nadając im miękkość i przyjemny zapach. Sprawia, że ubrania są bardziej komfortowe w użytkowaniu. Opracowana formuła ułatwia prasowanie, a składniki antystatyczne zawarte w płynie zapobiegają elektryzowaniu się ubrań. Do płukania tkanin naturalnych i syntetycznych.',
    howToUse: 'Pranie automatyczne - 40 ml / 4-5 kg prania.\nPranie ręczne - 20 ml / 10 l wody.',
    ingredients: '5-15% kationowe środki powierzchniowo czynne, <5% kompozycja zapachowa.',
    safety: 'Produkt nie jest klasyfikowany jako niebezpieczny.',
    warningWord: '',
    pictograms: [],
    producer: '',
    scent: 'O zapachu Wooly Blizz',
    color: { bg: '#F37B91', fg: '#D7526B', text: '#FFFFFF', pattern: '#F6A9B8' },
    iconType: 'plukanie',
    bgPattern: 'flowers',
    image: '/labels/front-04-plukania.webp'
  },
  {
    id: 5,
    stockId: 186,
    slug: 'podlog',
    urlSlug: 'plyn-do-podlog',
    name: 'PŁYN DO podłóg',
    shoperStockId: 186, // np. 188 (ID wariantu z Shopera dla: PŁYN DO podłóg)
    subtitle: 'Świeżość na każdej powierzchni',
    description: 'Dokładnie czyści podłogi, usuwając codzienne zabrudzenia i pozostawiając je czyste oraz odświeżone. Nie tworzy smug ani zacieków, dzięki czemu powierzchnie zachowują estetyczny wygląd.',
    howToUse: 'Stosować 30-50 ml płynu na 10 l wody. Czyścić powierzchnię przy użyciu mopa. UWAGA: przed zastosowaniem należy sprawdzić działanie produktu w niewidocznym miejscu. Postępowanie według powyższych zaleceń producenta gwarantuje czyste powierzchnie bez smug.',
    ingredients: '<5% anionowe i niejonowe środki powierzchniowo czynne, fosforany, EDTA i jego sole, kompozycja zapachowa (Citral), substancje konserwujące (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'H319 Działa drażniąco na oczy. P264 Dokładnie umyć ręce i dotknięte części ciała po użyciu. P280 Stosować ochronę oczu. P305+P351+P338 W PRZYPADKU DOSTANIA SIĘ DO OCZU: Ostrożnie płukać wodą przez kilka minut. Wyjąć soczewki kontaktowe, jeżeli są i można je łatwo usunąć. Nadal płukać. P337+P313 W przypadku utrzymywania się działania drażniącego na oczy: Zasięgnąć porady/zgłosić się pod opiekę lekarza. UFI: 6WD0-V0CJ-F005-12E0',
    warningWord: 'Uwaga',
    pictograms: ['GHS07'],
    producer: '',
    scent: 'O zapachu pomarańczy',
    color: { bg: '#784638', fg: '#542E24', text: '#FFFFFF', pattern: '#8E5A4B' },
    iconType: 'podlogi',
    bgPattern: 'wood',
    image: '/labels/front-05-podlog.webp'
  },
  {
    id: 6,
    stockId: 187,
    slug: 'wc',
    urlSlug: 'plyn-do-wc',
    name: 'PŁYN DO WC',
    shoperStockId: 187, // np. 189 (ID wariantu z Shopera dla: PŁYN DO WC)
    subtitle: 'Higiena, która działa',
    description: 'Skutecznie usuwa kamień, osady i zabrudzenia w toalecie, docierając również do trudno dostępnych miejsc. Pomaga utrzymać czystość i świeżość przy regularnym stosowaniu.',
    howToUse: 'Ścisnąć nakrętkę w oznaczonych miejscach i odkręcić. Polać wnętrze muszli klozetowej. Spłukać po ok. 15 min. Po użyciu zakręcić do momentu kliknięcia.',
    ingredients: '<5% anionowe i niejonowe środki powierzchniowo czynne, fosfoniany, kompozycja zapachowa (Citral), substancje konserwujące (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'Produkt nie jest klasyfikowany jako niebezpieczny.',
    warningWord: '',
    pictograms: [],
    producer: '',
    scent: 'O zapachu cytryny',
    color: { bg: '#E0E0E0', fg: '#A3A3A3', text: '#1A1A1A', pattern: '#D1D1D1' },
    iconType: 'wc',
    bgPattern: 'waves',
    image: '/labels/front-06-wc.webp'
  },
  {
    id: 7,
    stockId: 188,
    slug: 'myciarak',
    urlSlug: 'plyn-do-mycia-rak',
    name: 'PŁYN DO mycia rąk',
    shoperStockId: 188, // np. 190 (ID wariantu z Shopera dla: PŁYN DO mycia rąk)
    subtitle: 'Codzienna higiena i komfort',
    description: 'Delikatny, a jednocześnie skuteczny płyn do mycia rąk, usuwa zabrudzenia i pozostawia skórę czystą oraz odświeżoną. Odpowiedni do częstego stosowania, sprawdza się w domu i miejscach publicznych.',
    howToUse: 'Nanieść niewielką ilość preparatu na dłonie. Mycie rąk przeprowadzać zgodnie ze standardową procedurą, następnie spłukać ręce czystą wodą i osuszyć je.',
    ingredients: 'Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Propylene Glycol, Glycerin, Parfum (Citronellol, Hexyl Cinnamal, Linalool), Styrene/Acrylates Copolymer, Coco-Glucoside (and) Glyceryl Oleate, Sodium Benzoate, Sodium Chloride, Potassium Sorbate, Polyquaternium-7, Citric Acid, Sodium Lauryl Sulfate.',
    safety: '',
    warningWord: '',
    pictograms: [],
    producer: '',
    scent: 'O zapachu Oud Wood',
    color: { bg: '#eac973', fg: '#9f7849', text: '#3E341B', pattern: '#eac973' },
    iconType: 'rece',
    bgPattern: 'topo',
    image: '/labels/front-07-rece.webp'
  },
  {
    id: 8,
    stockId: 189,
    slug: 'myciaszyb',
    urlSlug: 'plyn-do-mycia-szyb',
    name: 'PŁYN DO mycia szyb',
    shoperStockId: 189, // np. 191 (ID wariantu z Shopera dla: PŁYN DO mycia szyb)
    subtitle: 'Krystaliczna czystość bez smug',
    description: 'Skutecznie usuwa zabrudzenia, kurz i ślady palców, pozostawiając powierzchnie szklane idealnie przejrzyste. Szybko odparowuje i nie pozostawia smug, przywracając naturalny połysk.',
    howToUse: 'Niewielką ilość płynu nanieść na zabrudzoną powierzchnię przez naciśnięcie spryskiwacza. Następnie wytrzeć powierzchnię przy pomocy ściereczki z mikrofibry lub papierowego ręcznika do uzyskania idealnego połysku. Czyszczenie monitorów i ekranów: nanieść preparat na papierowy ręcznik lub ścierkę z mikrofibry, następnie wytrzeć powierzchnię.',
    ingredients: '<5% anionowe środki powierzchniowo czynne, kompozycja zapachowa (Citral). Zawiera: alkohol etylowy.',
    safety: 'Produkt nie jest klasyfikowany jako niebezpieczny.',
    warningWord: '',
    pictograms: [],
    producer: '',
    scent: 'O zapachu cytryny',
    color: { bg: '#A7CFEA', fg: '#2A7F96', text: '#114455', pattern: '#BDE0F5' },
    iconType: 'szyby',
    bgPattern: 'floral',
    image: '/labels/front-08-szyby.webp'
  },
  {
    id: 9,
    stockId: 190,
    slug: 'lazienki',
    urlSlug: 'plyn-do-lazienki',
    name: 'PŁYN DO łazienki',
    shoperStockId: 190, // np. 192 (ID wariantu z Shopera dla: PŁYN DO łazienki)
    subtitle: 'Usuwa kamień i przywraca blask',
    description: 'Skutecznie usuwa osady z wody, kamień oraz pozostałości mydła, przywracając powierzchniom czystość i połysk. Sprawdza się w czyszczeniu armatury i płytek.',
    howToUse: 'Niewielką ilość płynu nanieść na zabrudzoną powierzchnię przez naciśnięcie spryskiwacza i pozostawić na około 5 minut. Następnie spłukać i zetrzeć powierzchnię przy pomocy ściereczki z mikrofibry lub ręcznika papierowego do uzyskania idealnego połysku.',
    ingredients: '<5% anionowe i niejonowe środki powierzchniowo czynne, fosfoniany, kompozycja zapachowa (Citral), substancje konserwujące (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'H315 Działa drażniąco na skórę. H319 Działa drażniąco na oczy. P264 Dokładnie umyć ręce i dotknięte części ciała po użyciu. P280 Stosować ochronę oczu. P302+P352 W PRZYPADKU KONTAKTU ZE SKÓRĄ: Umyć dużą ilością wody i mydła. P305+P351+P338 W PRZYPADKU DOSTANIA SIĘ DO OCZU: Ostrożnie płukać wodą przez kilka minut. Wyjąć soczewki kontaktowe, jeżeli są i można je łatwo usunąć. Nadal płukać. P321 Zastosować określone leczenie. P337+P313 W przypadku utrzymywania się działania drażniącego na oczy: Zasięgnąć porady/zgłosić się pod opiekę lekarza. UFI: YVG5-50D0-000R-66MQ',
    warningWord: 'UWAGA',
    pictograms: ['GHS07'],
    producer: '',
    scent: 'O zapachu cytryny',
    color: { bg: '#5c77b7', fg: '#3f5398', text: '#FFFFFF', pattern: '#3f5398' },
    iconType: 'lazienka',
    bgPattern: 'blobs',
    image: '/labels/front-09-lazienki.webp'
  },
  {
    id: 10,
    stockId: 191,
    slug: 'nablyszczania',
    urlSlug: 'plyn-do-nablyszczania',
    name: 'PŁYN DO nabłyszczania',
    shoperStockId: 191, // np. 193 (ID wariantu z Shopera dla: PŁYN DO nabłyszczania)
    subtitle: 'Błysk i szybkie schnięcie bez zacieków',
    description: 'Skoncentrowany płyn do nabłyszczania naczyń w zmywarkach gastronomicznych. Sprawia, że naczynia są lśniące, szybciej schną i nie pozostają na nich smugi ani zacieki. Pomaga usunąć resztki po myciu i zapobiega ponownemu osadzaniu się tłuszczu oraz brudu. Regularne stosowanie wspiera również ochronę zmywarki przed osadzaniem się kamienia.',
    howToUse: 'Otwórz butelkę i wlej płyn do dozownika na nabłyszczacz w zmywarce. Zamknij dozownik i wybierz program zmywania. Nie mieszać z innymi produktami myjącymi. Przestrzegać zaleceń producenta zmywarki. Przechowywać w temperaturze od 0°C do 30°C.',
    ingredients: '15-30% niejonowe środki powierzchniowo czynne.',
    safety: 'H314 Powoduje poważne oparzenia skóry oraz uszkodzenia oczu. P260 Nie wdychać pyłu/dymu/gazu/mgły/par/rozpylonej cieczy. P280 Stosować rękawice ochronne/odzież ochronną/ochronę oczu/ochronę twarzy. P301+P330+P331 W PRZYPADKU POŁKNIĘCIA: wypłukać usta. NIE wywoływać wymiotów. P303+P361+P353 W PRZYPADKU KONTAKTU ZE SKÓRĄ (lub z włosami): Natychmiast zdjąć całą zanieczyszczoną odzież. Spłukać skórę pod strumieniem wody lub prysznicem. P305+P351+P338 W PRZYPADKU DOSTANIA SIĘ DO OCZU: Ostrożnie płukać wodą przez kilka minut. Wyjąć soczewki kontaktowe, jeżeli są i można je łatwo usunąć. Nadal płukać. P310 Natychmiast skontaktować się z lekarzem. P391 Zebrać wyciek. UFI: 7940-80AU-T00N-WX4J',
    warningWord: 'Niebezpieczeństwo',
    pictograms: ['GHS05'],
    producer: '',
    scent: 'Bez zapachu',
    color: { bg: '#B63244', fg: '#8C2535', text: '#FFFFFF', pattern: '#CD5360' },
    iconType: 'nablyszczanie',
    bgPattern: 'geometry',
    image: '/labels/front-10-nablyszczania.webp'
  },
  {
    id: 11,
    stockId: 192,
    slug: 'odkamieniania',
    urlSlug: 'plyn-do-odkamieniania',
    name: 'PŁYN DO odkamieniania',
    shoperStockId: 192, // np. 194 (ID wariantu z Shopera dla: PŁYN DO odkamieniania)
    subtitle: 'Skutecznie usuwa kamień i osady',
    description: 'Skoncentrowany płyn do usuwania kamienia, osadów mineralnych oraz śladów po wodzie z urządzeń i powierzchni odpornych na działanie kwasów. Pomaga usunąć także tłuszcz i pozostałości białka, przywracając czystość oraz sprawność urządzeń takich jak czajniki, ekspresy do kawy, warniki i pralki, a także armatury łazienkowej i kuchennej. Nie zawiera substancji zapachowych ani barwników i może być stosowany do powierzchni mających kontakt z żywnością.',
    howToUse: 'Przygotuj roztwór ok. 10% (100 ml płynu uzupełnić wodą do 1 l). Napełnij urządzenie i uruchom je na 10-15 minut. Po zakończeniu usuń roztwór i dokładnie spłucz całe urządzenie czystą wodą. Ekspresy do kawy czyść zgodnie z instrukcją producenta.',
    ingredients: 'Skoncentrowany roztwór kwasów organicznych (m.in. kwas cytrynowy). Nie zawiera substancji zapachowych ani barwników. Zawiera: Kwas cytrynowy.',
    safety: 'H319 Działa drażniąco na oczy. H335 Może powodować podrażnienie dróg oddechowych. P261 Unikać wdychania mgły/par/rozpylonej cieczy. P280 Stosować ochronę oczu/rękawice ochronne. P305+P351+P338 W PRZYPADKU DOSTANIA SIĘ DO OCZU: Ostrożnie płukać wodą przez kilka minut. Wyjąć soczewki kontaktowe, jeżeli są i można je łatwo usunąć. Nadal płukać. P312 W przypadku złego samopoczucia skontaktować się z OŚRODKIEM ZATRUĆ. P337+P313 W przypadku utrzymywania się działania drażniącego na oczy: Zasięgnąć porady/zgłosić się pod opiekę lekarza. P501 Zawartość/pojemnik usuwać do autoryzowanego punktu utylizacji odpadów lub zwrócić dostawcy. UFI: 3V00-00QY-J00V-F8TY',
    warningWord: 'Uwaga',
    pictograms: ['GHS07'],
    producer: '',
    scent: 'Bez zapachu',
    color: { bg: '#E9E9E9', fg: '#C7C7C7', text: '#1A1A1A', pattern: '#3F56AF' },
    iconType: 'odkamienianie',
    bgPattern: 'confetti',
    image: '/labels/front-11-odkamieniania.webp'
  },
  {
    id: 12,
    stockId: 193,
    slug: 'udraznianiarur',
    urlSlug: 'plyn-do-udrazniania-rur',
    name: 'PŁYN DO udrażniania rur',
    shoperStockId: 193, // np. 195 (ID wariantu z Shopera dla: PŁYN DO udrażniania rur)
    subtitle: 'Szybko usuwa zatory i nieprzyjemne zapachy',
    description: 'Skuteczny żel do udrażniania rur, odpływów i zlewów, który rozpuszcza włosy, tłuszcz, resztki mydła oraz inne zanieczyszczenia powodujące zapchania. Działa również w zimnej i stojącej wodzie, pomagając szybko przywrócić drożność instalacji. Pomaga usuwać nieprzyjemne zapachy i jest bezpieczny dla rur oraz uszczelek przy prawidłowym stosowaniu.',
    howToUse: 'Wlać produkt bezpośrednio do odpływu i pozostawić na kilkanaście minut, następnie przepłukać dużą ilością gorącej wody. Do zastosowań profesjonalnych i domowych. Nie mieszać z innymi produktami czyszczącymi. Przechowywać w temperaturze od 0°C do 30°C.',
    ingredients: '<5% niejonowe środki powierzchniowo czynne. Zawiera wodorotlenek potasu.',
    safety: 'H314 Powoduje poważne oparzenia skóry oraz uszkodzenia oczu. P260 Nie wdychać pyłu/dymu/gazu/mgły/par/rozpylonej cieczy. P280 Stosować rękawice ochronne/odzież ochronną/ochronę oczu/ochronę twarzy. P301+P330+P331 W PRZYPADKU POŁKNIĘCIA: wypłukać usta. NIE wywoływać wymiotów. P303+P361+P353 W PRZYPADKU KONTAKTU ZE SKÓRĄ (lub z włosami): Natychmiast zdjąć całą zanieczyszczoną odzież. Spłukać skórę pod strumieniem wody lub prysznicem. P305+P351+P338 W PRZYPADKU DOSTANIA SIĘ DO OCZU: Ostrożnie płukać wodą przez kilka minut. Wyjąć soczewki kontaktowe, jeżeli są i można je łatwo usunąć. Nadal płukać. P310 Natychmiast skontaktować się z lekarzem.',
    warningWord: 'Niebezpieczeństwo',
    pictograms: ['GHS05'],
    producer: '',
    scent: 'Bez zapachu',
    color: { bg: '#4D8D9A', fg: '#336873', text: '#FFFFFF', pattern: '#A6D5F2' },
    iconType: 'udraznianie',
    bgPattern: 'blobs',
    image: '/labels/front-12-udraznianie.webp'
  }
];

const productDetailEn = {
  naczyn: {
    subtitle: 'Cuts through grease without compromise',
    description: 'A concentrated liquid for hand washing dishes. It removes grease and food soil without streaks or residue and works on glass, ceramics, steel, plastic, and everyday kitchen utensils.',
    howToUse: 'Apply 1-2 drops to a damp sponge, wash the dishes, then rinse under running water. You can also dissolve 1 tablespoon in 5 l of warm water, wash in the solution, rinse, and leave to dry.',
    ingredients: '15-30% anionic surfactants, <5% amphoteric and non-ionic surfactants, fragrance composition (Citral), preservatives (Methylisothiazolinone, Methylchloroisothiazolinone). Contains: Alcohols, C12-14, ethoxylated, sulfates, sodium salts. Alkylbenzenesulfonic acid, sodium salt.',
    safety: 'H315 Causes skin irritation. H319 Causes serious eye irritation. P264 Wash hands and affected body parts thoroughly after handling. P305+P351+P338 IF IN EYES: Rinse cautiously with water for several minutes. Remove contact lenses, if present and easy to do. Continue rinsing. P337+P313 If eye irritation persists: Get medical advice/attention. P362 Take off contaminated clothing. UFI: 2H97-GUCW-N208-CFYX',
    warningWord: 'WARNING',
    scent: 'Watermelon scent',
  },
  zmywarki: {
    subtitle: 'Clean dishes without deposits',
    description: 'A dishwasher detergent with active chlorine for grease, protein, starch, coffee, and tea deposits. It supports thorough cleaning and helps dishes keep a clean appearance with regular use.',
    howToUse: 'Pour the liquid into the dishwasher detergent dispenser, close it, and select a wash program. Recommended dose: 20 ml for lightly soiled dishes, 25 ml for medium soil, and 30 ml for heavy soil.',
    ingredients: '15-30% non-ionic surfactants.',
    safety: 'H314 Causes severe skin burns and eye damage. P260 Do not breathe dust/fume/gas/mist/vapours/spray. P280 Wear protective gloves/protective clothing/eye protection/face protection. P301+P330+P331 IF SWALLOWED: Rinse mouth. Do NOT induce vomiting. P303+P361+P353 IF ON SKIN (or hair): Take off immediately all contaminated clothing. Rinse skin with water or shower. P305+P351+P338 IF IN EYES: Rinse cautiously with water for several minutes. Remove contact lenses, if present and easy to do. Continue rinsing. P310 Immediately call a POISON CENTER/doctor. P391 Collect spillage. UFI: 7940-80AU-T00N-WX4J',
    warningWord: 'DANGER',
    scent: 'Rinse-aid finish',
  },
  prania: {
    subtitle: 'Clean and fresh fabrics',
    description: 'A liquid detergent for everyday laundry that removes common soil from fabrics and leaves clothing clean and refreshed.',
    howToUse: '- Best used at 20-60 C.\n- Suitable for home and professional use.\n- Do not transfer the product into unsuitable containers.\n- Follow the washing machine manufacturer instructions.',
    ingredients: '<5% EDTA and its salts, enzymes, fragrance composition, preservatives (Methylisothiazolinone, Methylchloroisothiazolinone), 5-15% anionic and non-ionic surfactants. Contains: Alcohols, C12-14, ethoxylated, sulfates, sodium salts.',
    safety: 'H315 Causes skin irritation. P264 Wash hands and affected body parts thoroughly after handling. P280 Wear eye protection. P302+P352 IF ON SKIN: Wash with plenty of water and soap. P305+P351+P338 IF IN EYES: Rinse cautiously with water for several minutes. Remove contact lenses, if present and easy to do. Continue rinsing. P310 Immediately call a POISON CENTER/doctor. P321 Specific treatment. EUH208 Contains cellulase, lipase, triacylglycerol, α-amylase. May produce an allergic reaction. UFI: 0D10-10VC-D00U-EAAC',
    warningWord: 'WARNING',
    scent: 'Fresh scent',
  },
  plukania: {
    subtitle: 'Softness and a fresh scent',
    description: 'A fabric softener for natural and synthetic textiles. It improves softness and comfort, supports easier ironing, and helps reduce static.',
    howToUse: 'Automatic wash: 40 ml per 4-5 kg load.\nHand wash: 20 ml per 10 l of water.',
    ingredients: '5-15% cationic surfactants, <5% fragrance composition.',
    safety: 'The product is not classified as hazardous.',
    warningWord: '',
    scent: 'Wooly Blizz scent',
  },
  podlog: {
    subtitle: 'Freshness across surfaces',
    description: 'A floor cleaner for everyday soil. It leaves floors clean and refreshed without streaks or residue when used as directed.',
    howToUse: 'Use 30-50 ml per 10 l of water and clean with a mop. Test the product in an inconspicuous place before use.',
    ingredients: '<5% anionic and non-ionic surfactants, phosphates, EDTA and its salts, fragrance composition (Citral), preservatives (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'H319 Causes serious eye irritation. P264 Wash hands and affected body parts thoroughly after handling. P280 Wear eye protection. P305+P351+P338 IF IN EYES: Rinse cautiously with water for several minutes. Remove contact lenses, if present and easy to do. Continue rinsing. P337+P313 If eye irritation persists: Get medical advice/attention. UFI: 6WD0-V0CJ-F005-12E0',
    warningWord: 'WARNING',
    scent: 'Orange scent',
  },
  wc: {
    subtitle: 'Hygiene that works',
    description: 'A toilet cleaner for scale, deposits, and everyday soil, including hard-to-reach areas. It helps keep the bowl clean and fresh with regular use.',
    howToUse: 'Press and open the cap, apply inside the toilet bowl, leave for about 15 minutes, then flush. Close the cap until it clicks after use.',
    ingredients: '<5% anionic and non-ionic surfactants, phosphonates, fragrance composition (Citral), preservatives (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'The product is not classified as hazardous.',
    warningWord: '',
    scent: 'Lemon scent',
  },
  myciarak: {
    subtitle: 'Everyday hygiene and comfort',
    description: 'A gentle and effective hand wash for frequent use at home or in shared spaces. It removes common soil and leaves hands clean and refreshed.',
    howToUse: 'Apply a small amount to hands, wash following a standard hand washing routine, rinse with clean water, and dry.',
    ingredients: 'Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Propylene Glycol, Glycerin, Parfum (Citronellol, Hexyl Cinnamal, Linalool), Styrene/Acrylates Copolymer, Coco-Glucoside (and) Glyceryl Oleate, Sodium Benzoate, Sodium Chloride, Potassium Sorbate, Polyquaternium-7, Citric Acid, Sodium Lauryl Sulfate.',
    safety: '',
    warningWord: '',
    scent: 'Gentle fragrance',
  },
  myciaszyb: {
    subtitle: 'Clear glass without streaks',
    description: 'A liquid for glass, mirrors, and glossy surfaces. It removes everyday marks and helps leave a clean, transparent finish.',
    howToUse: 'Spray a small amount onto the surface, wipe with a microfiber cloth or paper towel, and polish until clear.',
    ingredients: '<5% anionic surfactants, fragrance composition (Citral). Contains: ethyl alcohol.',
    safety: 'The product is not classified as hazardous.',
    warningWord: '',
    scent: 'Fresh scent',
  },
  lazienki: {
    subtitle: 'Removes scale and restores shine',
    description: 'A bathroom cleaner for water deposits, limescale, and soap residue on fittings and tiles.',
    howToUse: 'Spray a small amount on the soiled surface, leave for about 5 minutes, rinse, and wipe with a microfiber cloth or paper towel until glossy.',
    ingredients: '<5% anionic and non-ionic surfactants, phosphonates, fragrance composition (Citral), preservatives (Methylisothiazolinone, Methylchloroisothiazolinone).',
    safety: 'H315 Causes skin irritation. H319 Causes serious eye irritation. P264 Wash hands and affected body parts thoroughly after handling. P280 Wear eye protection. P302+P352 IF ON SKIN: Wash with plenty of water and soap. P305+P351+P338 IF IN EYES: Rinse cautiously with water for several minutes. Remove contact lenses, if present and easy to do. Continue rinsing. P321 Specific treatment. P337+P313 If eye irritation persists: Get medical advice/attention. UFI: YVG5-50D0-000R-66MQ',
    warningWord: 'WARNING',
    scent: 'Lemon scent',
  },
  nablyszczania: {
    subtitle: 'Shine and fast drying without streaks',
    description: 'A concentrated rinse aid for commercial dishwasher machines. It leaves dishes glossy, helps them dry faster, and prevents streaks and water spots. With regular use it also supports dishwasher protection against limescale build-up.',
    howToUse: 'Pour the liquid into the dishwasher rinse-aid dispenser, close it, and select a wash program. Do not mix with other detergents. Follow the dishwasher manufacturer instructions. Store between 0 C and 30 C.',
    ingredients: '15-30% non-ionic surfactants.',
    safety: 'H314 Causes severe skin burns and eye damage. P260 Do not breathe dust/fume/gas/mist/vapours/spray. P280 Wear protective gloves/protective clothing/eye protection/face protection. P301+P330+P331 IF SWALLOWED: Rinse mouth. Do NOT induce vomiting. P303+P361+P353 IF ON SKIN (or hair): Take off immediately all contaminated clothing. Rinse skin with water or shower. P305+P351+P338 IF IN EYES: Rinse cautiously with water for several minutes. Remove contact lenses, if present and easy to do. Continue rinsing. P310 Immediately call a POISON CENTER/doctor. P391 Collect spillage. UFI: 7940-80AU-T00N-WX4J',
    warningWord: 'DANGER',
    scent: 'Unscented',
  },
  odkamieniania: {
    subtitle: 'Removes limescale and deposits effectively',
    description: 'A concentrated descaler for limescale, mineral deposits, and water marks on acid-resistant devices and surfaces. It also helps remove grease and protein residue, restoring kettles, coffee machines, water boilers, washing machines, and bathroom or kitchen fittings. Free from fragrances and dyes; suitable for surfaces that contact food.',
    howToUse: 'Prepare a ~10% solution (100 ml of liquid topped up to 1 l with water). Fill the appliance and run it for 10-15 minutes, then remove the solution and rinse thoroughly with clean water. Clean coffee machines according to the manufacturer instructions.',
    ingredients: 'Concentrated organic-acid solution (including citric acid). Free from fragrances and dyes. Contains: Citric acid.',
    safety: 'H319 Causes serious eye irritation. H335 May cause respiratory irritation. P261 Avoid breathing mist/vapours/spray. P280 Wear eye protection/protective gloves. P305+P351+P338 IF IN EYES: Rinse cautiously with water for several minutes. Remove contact lenses, if present and easy to do. Continue rinsing. P312 Call a POISON CENTER/doctor if you feel unwell. P337+P313 If eye irritation persists: Get medical advice/attention. P501 Dispose of contents/container to authorized waste disposal facility or return to supplier. UFI: 3V00-00QY-J00V-F8TY',
    warningWord: 'WARNING',
    scent: 'Unscented',
  },
  udraznianiarur: {
    subtitle: 'Clears blockages and odours fast',
    description: 'An effective gel for unclogging pipes, drains, and sinks that dissolves hair, grease, soap residue, and other matter causing blockages. It works even in cold and standing water to quickly restore flow. It helps remove unpleasant odours and is safe for pipes and seals when used as directed.',
    howToUse: 'Pour directly into the drain, leave for several minutes, then flush with plenty of hot water. For professional and home use. Do not mix with other cleaning products. Store between 0 C and 30 C.',
    ingredients: '<5% non-ionic surfactants. Contains potassium hydroxide.',
    safety: 'H314 Causes severe skin burns and eye damage. P260 Do not breathe dust/fume/gas/mist/vapours/spray. P280 Wear protective gloves/protective clothing/eye protection/face protection. P301+P330+P331 IF SWALLOWED: Rinse mouth. Do NOT induce vomiting. P303+P361+P353 IF ON SKIN (or hair): Take off immediately all contaminated clothing. Rinse skin with water or shower. P305+P351+P338 IF IN EYES: Rinse cautiously with water for several minutes. Remove contact lenses, if present and easy to do. Continue rinsing. P310 Immediately call a POISON CENTER/doctor.',
    warningWord: 'DANGER',
    scent: 'Unscented',
  },
};

export const offerIntegrationConfig = {
  status: 'dummy',
  skuPrefixes: {
    product: 'DUMMY-PRODUCT-',
    bundle: 'DUMMY-BUNDLE-'
  },
  storePaths: {
    product: '/store-placeholder/products/',
    bundle: '/store-placeholder/bundles/'
  },
  qrPaths: {
    product: 'https://plyndo.pl/produkt/',
    bundle: '/qr-placeholder/bundles/'
  },
  cta: {
    status: 'enabled',
    kind: 'store',
    isPlaceholder: false,
    label: {
      pl: 'Przejdź do sklepu',
      en: 'Go to store'
    }
  }
};

const productOfferFields = {
  naczyn: {
    shortName: 'Naczyń',
    i18n: {
      pl: { displayName: 'Płyn do naczyń', shortName: 'Naczyń' },
      en: { displayName: 'Dishwashing liquid', shortName: 'Dishes' }
    },
    audiences: ['home', 'business'],
    listPrice: 19.9
  },
  zmywarki: {
    shortName: 'Zmywarki',
    i18n: {
      pl: { displayName: 'Płyn do zmywarki', shortName: 'Zmywarki' },
      en: { displayName: 'Dishwasher detergent', shortName: 'Dishwasher' }
    },
    audiences: ['home', 'business'],
    listPrice: 29.9
  },
  prania: {
    shortName: 'Prania',
    i18n: {
      pl: { displayName: 'Płyn do prania', shortName: 'Prania' },
      en: { displayName: 'Laundry detergent', shortName: 'Laundry' }
    },
    audiences: ['home'],
    listPrice: 34.9
  },
  plukania: {
    shortName: 'Płukania',
    i18n: {
      pl: { displayName: 'Płyn do płukania', shortName: 'Płukania' },
      en: { displayName: 'Fabric softener', shortName: 'Softener' }
    },
    audiences: ['home'],
    listPrice: 24.9
  },
  podlog: {
    shortName: 'Podłóg',
    i18n: {
      pl: { displayName: 'Płyn do podłóg', shortName: 'Podłóg' },
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
  myciarak: {
    shortName: 'Mycia rąk',
    i18n: {
      pl: { displayName: 'Płyn do mycia rąk', shortName: 'Mycia rąk' },
      en: { displayName: 'Hand wash', shortName: 'Hands' }
    },
    audiences: ['home', 'business'],
    listPrice: 27.9
  },
  myciaszyb: {
    shortName: 'Mycia szyb',
    i18n: {
      pl: { displayName: 'Płyn do mycia szyb', shortName: 'Mycia szyb' },
      en: { displayName: 'Glass cleaner', shortName: 'Glass' }
    },
    audiences: ['home', 'business'],
    listPrice: 21.9
  },
  lazienki: {
    shortName: 'Łazienki',
    i18n: {
      pl: { displayName: 'Płyn do łazienki', shortName: 'Łazienki' },
      en: { displayName: 'Bathroom cleaner', shortName: 'Bathroom' }
    },
    audiences: ['home', 'business'],
    listPrice: 24.9
  },
  nablyszczania: {
    shortName: 'Nabłyszczania',
    i18n: {
      pl: { displayName: 'Płyn do nabłyszczania', shortName: 'Nabłyszczania' },
      en: { displayName: 'Rinse aid', shortName: 'Rinse aid' }
    },
    audiences: ['home', 'business'],
    listPrice: 24.9
  },
  odkamieniania: {
    shortName: 'Odkamieniania',
    i18n: {
      pl: { displayName: 'Płyn do odkamieniania', shortName: 'Odkamieniania' },
      en: { displayName: 'Descaler', shortName: 'Descaler' }
    },
    audiences: ['home', 'business'],
    listPrice: 26.9
  },
  udraznianiarur: {
    shortName: 'Udrażniania rur',
    i18n: {
      pl: { displayName: 'Płyn do udrażniania rur', shortName: 'Udrażniania rur' },
      en: { displayName: 'Drain unblocker', shortName: 'Drains' }
    },
    audiences: ['home', 'business'],
    listPrice: 29.9
  }
};

function toSkuToken(slug) {
  return slug.toUpperCase().replace(/-/g, '_');
}

export function productUrlSlug(product) {
  return product?.urlSlug ?? product?.slug;
}

export function productRoutePath(product) {
  return `/produkt/${productUrlSlug(product)}`;
}

export function createOfferIntegration(kind, slug) {
  const skuPrefix = offerIntegrationConfig.skuPrefixes[kind];
  const storePath = offerIntegrationConfig.storePaths[kind];
  const qrPath = offerIntegrationConfig.qrPaths[kind];

  return {
    status: offerIntegrationConfig.status,
    sku: `${skuPrefix}${toSkuToken(slug)}`,
    storeUrl: `${storePath}${slug}`,
    qrTargetUrl: kind === 'product' ? `${qrPath}${slug}` : `${qrPath}${slug}`,
    qrImage: kind === 'product' ? `/qr/${slug}.png` : null,
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

  switch (product.slug) {
    case 'naczyn':
      videoSrc = '/video/vid_exploaded_naczynia.mp4';
      bottleFront = '/images/bottles/bottle-front-naczynia.webp';
      bottleBack = '/images/bottles/bottle-back-naczynia.webp';
      break;
    case 'zmywarki':
      videoSrc = '/video/vid_zmywarka.mp4';
      bottleFront = '/images/bottles/bottle-front-zmywarka.webp';
      bottleBack = '/images/bottles/bottle-back-zmywarka.webp';
      break;
    case 'prania':
      videoSrc = '/video/vid_pranie.mp4';
      bottleFront = '/images/bottles/bottle-front-pranie.webp';
      bottleBack = '/images/bottles/bottle-back-pranie.webp';
      break;
    case 'plukania':
      videoSrc = '/video/vid_plukanie.mp4';
      bottleFront = '/images/bottles/bottle-front-plukanie.webp';
      bottleBack = '/images/bottles/bottle-back-plukanie.webp';
      break;
    case 'podlog':
      videoSrc = '/video/vid_podlogi.mp4';
      bottleFront = '/images/bottles/bottle-front-podlogi.webp';
      bottleBack = '/images/bottles/bottle-back-podlogi.webp';
      break;
    case 'wc':
      videoSrc = '/video/vid_wc.mp4';
      bottleFront = '/images/bottles/bottle-front-wc.webp';
      bottleBack = '/images/bottles/bottle-back-wc.webp';
      break;
    case 'myciarak':
      videoSrc = '/video/vid_rece.mp4';
      bottleFront = '/images/bottles/bottle-front-rece.webp';
      bottleBack = '/images/bottles/bottle-back-rece.webp';
      break;
    case 'myciaszyb':
      videoSrc = '/video/vid_szyby.mp4';
      bottleFront = '/images/bottles/bottle-front-szyby.webp';
      bottleBack = '/images/bottles/bottle-back-szyby.webp';
      break;
    case 'lazienki':
      videoSrc = '/video/vid_lazienka.mp4';
      bottleFront = '/images/bottles/bottle-front-lazienka.webp';
      bottleBack = '/images/bottles/bottle-back-lazienka.webp';
      break;
    case 'nablyszczania':
      videoSrc = '/video/vid_nablyszczanie.mp4';
      bottleFront = '/images/bottles/bottle-front-nablyszczania.webp';
      bottleBack = '/images/bottles/bottle-back-nablyszczania.webp';
      break;
    case 'odkamieniania':
      videoSrc = '/video/vid_odkamienianie.mp4';
      bottleFront = '/images/bottles/bottle-front-odkamieniania.webp';
      bottleBack = '/images/bottles/bottle-back-odkamieniania.webp';
      break;
    case 'udraznianiarur':
      videoSrc = '/video/vid_udraznianie.mp4';
      bottleFront = '/images/bottles/bottle-front-udraznianie.webp';
      bottleBack = '/images/bottles/bottle-back-udraznianie.webp';
      break;
  }

  return {
    ...product,
    ...offer,
    videoSrc,
    bottleFront,
    bottleBack,
    labelFront: product.image,
    labelBack: product.image.replace('/front-', '/back-'),
    labelBackPanel: product.image.replace('/front-', '/back-panels/back-panel-'),
    i18n: {
      pl: {
        ...offer.i18n.pl,
        name: product.name,
        subtitle: product.subtitle,
        description: product.description,
        howToUse: product.howToUse,
        ingredients: product.ingredients,
        safety: product.safety,
        warningWord: product.warningWord,
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
    ...createOfferIntegration('product', productUrlSlug(product))
  };
});

export function getProductByRouteSlug(slug) {
  return products.find((product) => product.slug === slug || productUrlSlug(product) === slug);
}
