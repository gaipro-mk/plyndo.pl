# PRD: Płyndo.pl - sprzedaż chemii domowej i firmowej w pakietach

## 1. Status dokumentu

Ten dokument definiuje obowiązujące założenia sprzedaży pakietowej Płyndo.pl.

Obowiązujące decyzje produktowe:

- marka publiczna to **Płyndo.pl**,
- docelowa domena techniczna i adres URL to `plyndo.pl`, bez polskiego znaku `ł`,
- landing page prezentuje markę, produkty, pakiety i przejścia do zakupu,
- zakup odbywa się wyłącznie w pakietach i paczkach, nie jako sprzedaż pojedynczej butelki,
- oferta landing page'a jest pakietowa od pierwszego CTA do handoffu Shopera,
- Shoper będzie docelowym sklepem i checkoutem,
- obecne CTA do Shopera na landingu jest nieaktywnym placeholderem,
- po integracji gotowy pakiet i paczka własna przekazują do Shopera pełny skład koszyka oraz rabat pakietowy,
- do czasu uruchomienia Shopera frontend korzysta z jawnie oznaczonych danych tymczasowych,
- segment domu i segment firmy są równorzędne od pierwszego pełnego wdrożenia,
- język polski jest podstawowy, ale architektura treści musi wspierać angielski i kolejne języki.

Konwencja nazewnicza:

- gdy publiczne copy nazywa markę lub domenę, używamy `Płyndo.pl`,
- skrót `Płyndo` jest dopuszczalny dopiero po pierwszym pełnym przedstawieniu marki w danym widoku i tylko wtedy, gdy zdanie brzmi naturalniej bez `.pl`,
- w URL-ach, kodzie, SEO slugach i adresach e-mail używamy ASCII `plyndo.pl` lub `plyndo`,
- znak słowny `Płyn DO` pozostaje częścią obecnego logo i systemu etykiet; poza logo, etykietą albo nazwą zasobu nie jest tekstowym zamiennikiem marki `Płyndo.pl`.

### 1.1 Rozróżnienie MVP i celu docelowego

Aktualny katalog frontendowy zawiera 10 gotowych produktów. Dlatego pierwsza wersja strony i pakietu startowego ma pracować na **Starter 10**.

Docelowa architektura oferty zakłada 12 produktów i **Starter 12**. Starter 12 jest zgodny z logistycznym modelem paczek po 4 i 8 sztuk, bo może być realizowany jako komplet `4 + 8`.

Zasada wdrożeniowa:

- nie pokazujemy jako kupowalnych dwóch produktów, których jeszcze nie ma,
- nie udajemy pełnego `Starter 12` przed finalizacją dwóch brakujących produktów,
- projekt UI, dane i copy mają umożliwić prostą migrację z `Starter 10` do `Starter 12`.

## 2. Product Summary

`plyndo.pl` jest docelową domeną polskiego landing page'a i warstwą sprzedażowo-edukacyjną marki **Płyndo.pl** kierowanej do domów, małych firm i średnich firm.

Płyndo nie ma być zwykłym katalogiem losowych środków czystości. Ma pokazać prosty system zakupu:

1. Klient poznaje produkty i ich zastosowania.
2. Wybiera gotowy pakiet albo komponuje własną paczkę.
3. Kupuje karton produktów dopasowany do zużycia.
4. Przy kolejnych zakupach uzupełnia tylko te płyny, które schodzą najszybciej.

Główna obietnica produktu:

> Dobra chemia do domu i firmy, kupowana wygodnie w paczkach, bez noszenia ciężkich płynów z marketu i bez przepłacania za logistykę pojedynczych butelek.

## 3. Problem I Szansa

### 3.1 Problem klienta

Zakup chemii gospodarczej jest powtarzalny, ciężki logistycznie i zwykle mało angażujący:

- klienci przypominają sobie o płynie dopiero wtedy, gdy się kończy,
- duże markety rozbijają zakup na wiele kategorii, promocji i marek,
- porównanie jakości, pojemności i ceny jest męczące,
- płyny są ciężkie, zajmują miejsce w koszyku i wymagają noszenia,
- małe firmy często kupują podobne produkty doraźnie, bez sensownego standardu zapasu.

### 3.2 Problem biznesowy

Sprzedaż pojedynczej butelki słabo działa przy tej kategorii:

- koszt wysyłki i pakowania może być nieproporcjonalny do wartości jednego produktu,
- pojedyncze zamówienia gorzej wykorzystują gotowe kartony i proces magazynowy,
- klient nie poznaje pełnego systemu produktów,
- checkout z pojedynczymi płynami konkurowałby ceną z każdą chwilową promocją marketu.

### 3.3 Szansa

Płyndo może zająć pozycję pomiędzy marketem a specjalistyczną chemią:

- pełna linia do najważniejszych zastosowań,
- pakiety dopasowane do domu i firmy,
- oszczędność liczona na całej paczce,
- polska marka z bezpośrednim doświadczeniem produktowym,
- premium, ale użytkowa prezentacja,
- prosta droga: obejrzyj, wybierz paczkę, kup w Shoperze.

## 4. Cele Produktu

### 4.1 Cele biznesowe

- sprzedać nową markę przez model pakietowy,
- budować koszyk opłacalny logistycznie,
- zwiększać udział gotowych paczek `4`, `8` i startera,
- ułatwić powracające zakupy przez własne paczki uzupełniające,
- obsłużyć od początku segment domu i firmy,
- kierować ruch do docelowego checkoutu Shoper bez budowania osobnego sklepu w landingu.

### 4.2 Cele UX

- w kilka sekund wyjaśnić, że nie kupuje się pojedynczych butelek,
- pokazać oszczędność na pakiecie w sposób uczciwy i łatwy do policzenia,
- ułatwić wybór gotowego pakietu lub konfigurację własnej paczki,
- pokazać szczegóły każdego produktu bez przeładowania landing page'a,
- przygotować miejsce na video, QR i fotografie butelek,
- pozwolić doradcy zaproponować zapas bez zasłaniania podstawowej oferty.

### 4.3 Poza zakresem

Nie budujemy w landingu:

- własnego checkoutu,
- pełnego ERP, WMS ani synchronizacji stanów magazynowych,
- niepotwierdzonych porównań cenowych z konkretnymi sieciami detalicznymi.

## 5. Zasady Produktowe

- **Pakiet przed SKU**: podstawową jednostką zakupu jest paczka, nie pojedynczy płyn.
- **Cena całej paczki**: rabat komunikujemy dla kompletnego pakietu.
- **Gotowy wybór i własny wybór**: klient może kupić rekomendowany zestaw albo ułożyć własny karton.
- **Dom i firma**: oba scenariusze mają własne treści, gotowe paczki i rekomendacje doradcy.
- **Dowód przed hiperbolą**: claims mają być konkretne, spójne z etykietami i zgodne z dokumentacją produktu.
- **Landing edukuje, Shoper finalizuje**: frontend ma przygotować decyzję zakupową i przekazać ją do sklepu.
- **Skalowalne dane**: ceny, SKU, URL-e Shopera, QR i media nie mogą być zaszyte przypadkowo w copy.

## 6. Użytkownicy

### 6.1 Dom

Główne profile:

- osoba lub para, która chce uzupełnić podstawowe płyny bez nadmiaru,
- rodzina z większym zużyciem naczyń, prania, łazienki i podłóg,
- dom z dziećmi,
- dom ze zwierzętami,
- mieszkanie lub dom z dużą liczbą szyb i powierzchni do regularnego sprzątania.

Potrzeby:

- szybkie zrozumienie, co warto kupić na start,
- możliwość późniejszego zamówienia kilku najczęściej zużywanych płynów,
- pewność co do zastosowania i bezpieczeństwa,
- dostawa do drzwi zamiast noszenia ciężkich produktów.

### 6.2 Firma

Główne profile:

- małe biuro,
- lokal usługowy,
- gabinet lub recepcja,
- firma z zapleczem kuchennym i sanitariatami,
- średnia przestrzeń z częstym sprzątaniem podłóg, WC i powierzchni wspólnych.

Potrzeby:

- gotowy pakiet bez płynów typowo domowych, gdy nie są potrzebne,
- możliwość zwiększenia liczby płynów szybko zużywanych,
- przewidywalny zapas do sprzątania powierzchni i sanitariatów,
- czytelna rekomendacja ilości dla metrażu i natężenia użytkowania.

## 7. Pozycjonowanie Marki

### 7.1 Rdzeń komunikacji

Płyndo ma być postrzegane jako:

- polska marka chemii użytkowej,
- jakość oparta o realne doświadczenie recepturowe i produkcyjne,
- wygodny model paczek dla ciężkich, powtarzalnych zakupów,
- estetyczny i czytelny system produktów do konkretnych zadań,
- oferta dla domu i dla codziennej pracy firmy.

### 7.2 Relacja Płyndo I JAX Professional

Płyndo jest osobną marką i osobną linią oferty dla litrowych produktów kupowanych bezpośrednio w paczkach przez domy oraz mniejsze firmy. Publiczne dane podmiotu i producenta zachowują informacje EmiChem obecne już w repo. Na stronie `O marce` można kontrolowanie wyjaśnić, że linia Płyndo jest produkowana dla EmiChem przez **JAX Professional**.

Ta relacja ma być komunikowana tak, aby:

- Płyndo zyskiwało wiarygodność jakościową dzięki doświadczeniu producenta środków utrzymania czystości,
- klient rozumiał, że marka jest projektowana do wygodnego zakupu bezpośredniego w paczkach 4, 8 i starterze,
- kanał Płyndo nie wyglądał jak zastępnik profesjonalnej oferty JAX Professional dla dystrybutorów, dużych odbiorców i dużych formatów opakowań,
- marka Płyndo miała własny język, własny landing page i własną ścieżkę do Shopera.

Fakty producenta dopuszczone jako baza wiarygodności po zatwierdzeniu copy:

- JAX Professional prowadzi działalność od 1984 roku,
- producent opisuje się jako wytwórca środków utrzymania czystości dla gospodarstw domowych, motoryzacji i przemysłu,
- doświadczenie produkcyjne, sprawdzone technologie oraz standard jakości są istotnym źródłem zaufania dla nowej linii.

Poziom ekspozycji w publicznym UI:

- strona `O marce` jest jedynym miejscem publicznej referencji do `JAX Professional`,
- hero, moduły trust, footer i strony produktów mają mówić marką Płyndo bez powtarzania tej referencji,
- na stronie `O marce` można po zatwierdzeniu copy powiedzieć: `Linia Płyndo jest produkowana dla EmiChem przez JAX Professional, polskiego producenta rozwijającego środki czystości od 1984 roku`,
- footer zachowuje dane producenta lub sprzedawcy obecne w repo jako dane podmiotu, ale nie ma oddawać pierwszego planu marce innej niż Płyndo.

### 7.3 Claims zaakceptowane do kierunku kreatywnego

Copy może rozwijać następujące osie:

- polska marka,
- produkt od polskiego producenta z wieloletnim doświadczeniem,
- rodzinne zaplecze firmy po zatwierdzeniu dokładnego brzmienia,
- zaplecze producenta opisane wyłącznie na stronie `O marce` po zatwierdzeniu dokładnego brzmienia,
- jakość i skuteczność,
- odpowiedzialne oraz ekologiczne podejście do receptur i komunikacji,
- wygoda dostawy ciężkich płynów,
- oszczędność przy zakupie pakietowym,
- jasne instrukcje użycia i bezpieczeństwa,
- produkty do domu i firmy,
- sprzedaż w opłacalnych logistycznie paczkach.

### 7.4 Dodatkowe claims do rozważenia

Po potwierdzeniu treści prawnych i etykiet można rozwijać:

- `1 litr realnego zapasu` tam, gdzie pojemność produktu to potwierdza,
- `jedna marka do najważniejszych zadań`,
- `gotowe pakiety zamiast przypadkowego koszyka`,
- `opakowanie dobrane do wysyłki płynów`,
- `dokupujesz to, co naprawdę zużywasz`,
- `czytelna oszczędność na całym kartonie`,
- `od podłóg i łazienki po pranie, naczynia i higienę`.

### 7.5 Ograniczenia komunikacyjne

- nie eksponujemy umów handlowych, warunków dystrybucji ani list odbiorców producenta w sprzedażowym copy Płyndo,
- nie komunikujemy Płyndo jako `tej samej profesjonalnej oferty JAX Professional taniej`,
- nie pozycjonujemy pakietów Płyndo jako zamiennika dużych formatów i kanałów B2B JAX Professional,
- poza stroną `O marce` nie powielamy w publicznym UI referencji do `JAX Professional`,
- nie mieszamy nazw `JAX Professional`, `EmiChem`, `Płyndo` i `Płyn DO` tak, aby klient nie wiedział, od kogo kupuje i jaka marka jest ofertą,
- nie budujemy przekazu na agresywnym ataku na Lidl, Biedronkę, Rossmann ani inne sieci,
- konkretne porównania cenowe z konkurencją wymagają aktualnego źródła i daty,
- claims biobójcze, dezynfekcyjne, ekologiczne i bezpieczeństwa muszą odpowiadać dokumentacji konkretnego produktu.

## 8. Oferta Produktowa

### 8.1 Aktualny katalog MVP

Pierwsza wersja oferty pracuje na 10 istniejących produktach:

| Slug | Produkt | Segment główny |
| --- | --- | --- |
| `naczynia` | Płyn do naczyń | dom, firma z kuchnią |
| `zmywarka` | Płyn do zmywarki | dom, firma ze zmywarką |
| `pranie` | Płyn do prania | dom |
| `plukanie` | Płyn do płukania | dom |
| `podlogi` | Płyn do podłóg | dom, firma |
| `wc` | Płyn do WC | dom, firma |
| `rece` | Płyn do mycia rąk | dom, firma |
| `szyby` | Płyn do mycia szyb | dom, firma |
| `lazienka` | Płyn do łazienki | dom, firma |
| `dezynfekcja` | Płyn do dezynfekcji | dom, firma |

### 8.2 Docelowy katalog

Docelowo linia ma liczyć 12 produktów.

Wymagania dla dwóch przyszłych produktów:

- nie rozbijają modelu paczek,
- mają metadane, ceny, instrukcje, media i zasady doradcy tak samo jak obecne produkty,
- mogą zostać dodane do `Starter 12` bez przebudowy całej strony.

## 9. Architektura Pakietów

### 9.1 Jednostki sprzedaży

Płyndo sprzedaje:

- paczki po 4 sztuki,
- paczki po 8 sztuk,
- kombinacje tych paczek,
- starter całej linii.

Pojedynczy produkt:

- ma swoją cenę referencyjną,
- może mieć własną podstronę i link docelowy,
- nie jest kupowany samodzielnie przez landing.

### 9.2 Pakiety MVP

| Pakiet | Liczba sztuk | Skład MVP | Cel |
| --- | ---: | --- | --- |
| `Starter 10` | 10 | po 1 sztuce każdego obecnego produktu | poznanie pełnej aktualnej linii |
| `Wybierz Sam 4` | 4 | dowolne produkty i duplikaty | małe uzupełnienie lub wejście bez startera |
| `Wybierz Sam 8` | 8 | dowolne produkty i duplikaty | główny pakiet uzupełniający |
| `Dom Codzienny 4` | 4 | naczynia, podłogi, WC, łazienka | szybki pakiet domu |
| `Dom Pełny 8` | 8 | naczynia, pranie, płukanie, podłogi, WC, ręce, szyby, łazienka | gotowy domowy koszyk |
| `Firma Podstawowa 4` | 4 | podłogi, WC, ręce, łazienka | małe biuro lub lokal |
| `Firma Operacyjna 8` | 8 | podłogi x2, WC, łazienka, ręce, szyby, dezynfekcja, naczynia | częste sprzątanie firmy |

### 9.3 Pakiet docelowy

Po finalizacji katalogu:

| Pakiet | Liczba sztuk | Skład | Cel |
| --- | ---: | --- | --- |
| `Starter 12` | 12 | po 1 sztuce każdego produktu docelowej linii | pełny pierwszy zakup |

Migracja:

- karta i strona `Starter 10` powinny mieć architekturę umożliwiającą zmianę liczby produktów,
- layout musi wspierać 10 i 12 pozycji,
- ceny i oszczędności muszą być obliczane z zawartości pakietu, nie z hardcoded tekstu.

### 9.4 Zasady kompozycji

- gotowe pakiety mają jawny skład,
- własne paczki pozwalają na duplikaty, np. `8 x podłogi`,
- pakiet biznesowy domyślnie nie zawiera prania i płukania,
- doradca może zasugerować kilka paczek jednocześnie,
- starter nie jest obowiązkowym pierwszym zakupem.

## 10. Ceny I Oszczędności

### 10.1 Model cenowy

Każdy produkt ma własną cenę referencyjną.

Na stronie pakietu pokazujemy:

1. listę produktów i ich ceny referencyjne,
2. sumę wartości produktów,
3. cenę pakietu,
4. kwotę oszczędności,
5. procent oszczędności.

Rabat i oszczędność są komunikowane tylko globalnie dla pakietu. Pozycja produktu nie dostaje osobnego rabatu ani osobnej oszczędności, a podstrona produktu pokazuje wyłącznie cenę referencyjną i drogę do paczki.

Nie pokazujemy przycisku zakupu pojedynczej butelki jako podstawowej akcji handlowej.

### 10.2 Robocze dane cenowe

Poniższe wartości są danymi tymczasowymi do projektu UX i testów frontendowych. Nie są finalnym cennikiem.

| Produkt | Cena referencyjna dummy |
| --- | ---: |
| Płyn do naczyń | 19,90 zł |
| Płyn do zmywarki | 29,90 zł |
| Płyn do prania | 34,90 zł |
| Płyn do płukania | 24,90 zł |
| Płyn do podłóg | 22,90 zł |
| Płyn do WC | 19,90 zł |
| Płyn do mycia rąk | 27,90 zł |
| Płyn do mycia szyb | 21,90 zł |
| Płyn do łazienki | 24,90 zł |
| Płyn do dezynfekcji | 39,90 zł |

Wartość `Starter 10` przy tym dummy cenniku:

- suma cen referencyjnych: `267,00 zł`,
- globalny rabat pakietowy `45%`: `120,15 zł`,
- cena wynikająca z rabatu: `146,85 zł` przed ewentualną decyzją o finalnym cenniku.

### 10.3 Architektura rabatów

Rabat jest liczony od sumy cen referencyjnych całej paczki:

| Typ paczki | Globalny rabat pakietowy |
| --- | ---: |
| Paczka 4 | 30% od sumy cen wybranych produktów |
| Paczka 8 | 40% od sumy cen wybranych produktów |
| Starter 10 | 45% od sumy cen produktów w pakiecie |
| Starter 12 | 50% od sumy cen produktów w pakiecie |

Finalny cennik musi uwzględnić:

- koszt receptury i opakowania każdego produktu,
- koszt kartonu 4, 8 i układu startera,
- koszt kompletacji,
- koszt wysyłki płynów,
- prowizje płatnicze i Shoper,
- marżę minimalną dla gotowych i własnych paczek,
- wpływ duplikatów droższych produktów w paczce `Wybierz Sam`.

### 10.4 Reguła uczciwej prezentacji i przekazania koszyka

Jeżeli cena własnej paczki jest zależna od składu, frontend musi liczyć ją ze struktury danych:

`suma cen referencyjnych - rabat pakietowy = cena paczki`.

Do czasu integracji CTA do Shopera na landingu pozostaje nieaktywne i jawnie placeholderowe.

Po integracji handoff do Shopera ma przekazać:

- dokładny skład gotowego pakietu albo paczki własnej,
- ilości wszystkich produktów w koszyku,
- globalny rabat pakietowy dla tej paczki.

## 11. Docelowa Architektura Informacji

### 11.1 Landing page

Rekomendowana kolejność sekcji:

1. Hero z marką i komunikatem zakupu w paczkach.
2. Krótki blok `Jak kupujesz`: Starter, paczka 4, paczka 8.
3. Katalog 10 produktów z wejściem do szczegółów.
4. Pakiety gotowe i paczki własne.
5. Rozwinięcie `Dom` i `Firma`.
6. Oszczędność, wygoda i jakość.
7. Doradca pakietu.
8. Filmy i zastosowania, gdy materiały będą gotowe.
9. FAQ.
10. Footer z realnymi ścieżkami informacyjnymi.

### 11.2 Trasy i strony

Docelowy frontend powinien wspierać:

- `/` - landing page,
- `/pakiety` - indeks pakietów,
- `/pakiety/starter-10` - strona startera MVP,
- `/pakiety/starter-12` - strona startera docelowego po gotowości oferty,
- `/pakiety/:slug` - pozostałe gotowe pakiety,
- `/skomponuj/4` - paczka własna 4,
- `/skomponuj/8` - paczka własna 8,
- `/product/:slug` lub docelowy odpowiednik i18n dla produktu,
- `/o-marce`,
- `/kontakt`,
- `/regulamin`,
- `/polityka-prywatnosci`,
- `/reklamacje`.

### 11.3 Nawigacja

Menu główne powinno prowadzić do:

- Produkty,
- Pakiety,
- Dom i Firma,
- Doradca,
- FAQ,
- CTA `Wybierz pakiet`.

Footer powinien zawierać:

- linki prawne,
- kontakt,
- reklamacje,
- o marce,
- FAQ,
- dane producenta lub sprzedawcy już obecne w repo jako dane podmiotu,
- obsługiwane metody płatności dopiero po potwierdzeniu konfiguracji Shopera.

## 12. Wymagania Dla Landing Page'a

### 12.1 Hero

Hero musi:

- pokazać nazwę marki jako pierwszy sygnał,
- od razu wyjaśnić model paczek,
- prowadzić do pakietów,
- zachować obecny premium klimat i istniejący system logo.
- nie zawierać referencji do `JAX Professional`; ta należy tylko do strony `O marce`.

Przykładowy kierunek copy:

> Płyny do domu i firmy kupowane w paczkach, które mają sens.

CTA:

- `Zobacz pakiety`,
- `Poznaj produkty`.

### 12.2 Katalog produktów

Katalog ma:

- pokazać wszystkie dostępne produkty,
- odróżnić zastosowania,
- prowadzić do podstron produktu,
- nie sugerować zakupu jednej butelki.

### 12.3 Sekcja pakietów

Każda karta pakietu ma pokazać:

- nazwę,
- liczbę sztuk,
- audience,
- skrócony skład lub zasadę wyboru,
- wartość referencyjną,
- cenę pakietu,
- oszczędność,
- CTA.

### 12.4 Dom i Firma

Segment domu ma eksponować:

- pranie i płukanie,
- kuchnię,
- łazienkę,
- podłogi,
- wygodne uzupełnianie tego, co schodzi najszybciej.

Segment firmy ma eksponować:

- podłogi,
- sanitariaty,
- mycie rąk,
- szyby i powierzchnie,
- dezynfekcję tam, gdzie jest zasadna,
- opcjonalną kuchnię i zmywarkę.

### 12.5 FAQ

FAQ musi odpowiedzieć co najmniej na:

- dlaczego nie sprzedajecie jednej butelki,
- czym różni się paczka 4 od paczki 8,
- czy można kupić starter bez późniejszych zobowiązań,
- czy można wziąć kilka sztuk tego samego płynu,
- które pakiety są dla firmy,
- jak działa oszczędność na pakiecie,
- gdzie finalizowany jest zakup,
- jak będą obsługiwane płatności i dostawa po uruchomieniu Shopera,
- gdzie znaleźć skład i sposób użycia.

## 13. Wymagania Dla Stron Pakietów

### 13.1 Strona startera

Strona `Starter 10` musi zawierać:

- hero pakietu,
- listę 10 produktów,
- ceny referencyjne produktów,
- sumę wartości,
- cenę pakietu,
- oszczędność kwotową i procentową,
- uzasadnienie pierwszego zakupu,
- informację, że później można kupować paczki uzupełniające 4 i 8,
- nieaktywne CTA placeholder do Shopera do czasu integracji,
- CTA do Shopera po integracji przekazujące cały skład startera oraz rabat pakietowy.

Po przejściu na `Starter 12` ta sama konstrukcja ma obsłużyć 12 produktów.

### 13.2 Strony gotowych pakietów

Każda strona gotowego pakietu ma zawierać:

- dla kogo jest pakiet,
- jawny skład i ilości,
- uzasadnienie kompozycji,
- ceny i oszczędność,
- alternatywę `Skomponuj własną paczkę`,
- linki do produktów w pakiecie.

### 13.3 Własna paczka

Konfigurator 4/8 ma:

- pokazać licznik wykorzystanych miejsc,
- pozwolić dodawać i odejmować duplikaty,
- pokazać sumę cen referencyjnych,
- pokazać cenę po rabacie,
- blokować przekroczenie limitu paczki,
- umożliwić zmianę z paczki 4 na paczkę 8,
- przygotować przekazanie do Shopera pełnego składu koszyka i globalnego rabatu paczki, gdy integracja będzie gotowa.

## 14. Wymagania Dla Stron Produktów

Każda podstrona produktu ma łączyć informację techniczną ze sprzedażą pakietową.

Wymagane bloki:

- nazwa i zastosowanie,
- etykieta teraz, zdjęcie butelki później,
- USP produktu,
- opis,
- sposób użycia,
- skład i bezpieczeństwo,
- cena referencyjna,
- informacja `kupisz w pakietach`,
- powiązane pakiety,
- CTA do paczki 4 i paczki 8,
- placeholder filmu skuteczności,
- placeholder filmu instruktażowego,
- QR placeholder do docelowego URL-a produktu lub pakietu w Shoperze.

QR w fazie dummy:

- może prowadzić do bezpiecznego placeholder URL-a,
- nie może udawać działającego zakupu, jeśli checkout jeszcze nie istnieje,
- powinien mieć strukturę danych umożliwiającą późniejszą podmianę.

## 15. Doradca Pakietu

### 15.1 Zasada

Pierwsza wersja doradcy ma być regułowa i transparentna. Nie musi być opisana jako AI, jeżeli nie korzysta z modelu generatywnego.

### 15.2 Wejścia

Pytania dla domu:

- metraż,
- liczba osób,
- liczba łazienek i WC,
- dzieci,
- zwierzęta,
- zmywarka,
- potrzeba prania i płukania,
- duże przeszklenia,
- częstotliwość sprzątania.

Pytania dla firmy:

- metraż,
- typ przestrzeni,
- liczba pracowników lub użytkowników dziennie,
- liczba sanitariatów,
- aneks kuchenny,
- zmywarka,
- duże przeszklenia,
- częstotliwość sprzątania,
- wyższa potrzeba dezynfekcji.

### 15.3 Wyjścia

Doradca pokazuje:

- rekomendowany gotowy pakiet albo własną paczkę,
- dodatkowe paczki 4 lub 8, jeżeli profil tego wymaga,
- dokładne ilości produktów,
- uzasadnienie rekomendacji,
- szacunkowy zapas w orientacyjnym przedziale,
- suma wartości referencyjnej,
- cena rekomendacji,
- oszczędność.

### 15.4 Przykładowe reguły

- firma bez prania nie dostaje prania ani płukania,
- duża firma może dostać więcej podłóg, WC, rąk i dezynfekcji,
- dom ze zmywarką może dostać płyn do zmywarki,
- dom z częstym praniem zwiększa wagę prania i płukania,
- duże przeszklenia zwiększają wagę płynu do szyb,
- dzieci i zwierzęta mogą zwiększać rekomendowany wolumen sprzątania powierzchni, ale nie mogą generować niepotwierdzonych claimów medycznych.

## 16. Shoper I Dane Tymczasowe

### 16.1 Rola Shopera

Shoper docelowo obsługuje:

- produkt lub pakiet w sklepie,
- SKU,
- cenę finalną,
- koszyk,
- checkout,
- płatności,
- dostawę,
- regulaminowe elementy sprzedaży.

Landing page obsługuje:

- edukację,
- porównanie pakietów,
- rekomendację,
- skład własnej paczki,
- placeholder przejścia do Shopera przed integracją,
- przekazanie do Shopera pełnego składu koszyka i rabatu pakietowego po integracji.

### 16.2 Dummy data

Do czasu uruchomienia sklepu każdy element integracyjny ma wspierać dane tymczasowe:

- `sku: null` albo czytelny dummy identyfikator,
- `shoperUrl: null` albo placeholder route,
- `qrTargetUrl: null` albo placeholder route,
- ceny oznaczone jako robocze,
- status CTA utrzymujący obecne przejście do Shopera jako nieaktywny placeholder,
- brak udawania realnej dostępności zamówienia.

### 16.3 Minimalny model danych

`Product`:

- `id`,
- `slug`,
- `name`,
- `shortName`,
- `audiences`,
- `description`,
- `howToUse`,
- `ingredients`,
- `safety`,
- `volume`,
- `listPrice`,
- `usageWeights`,
- `image`,
- `bottleImage`,
- `videoSlots`,
- `sku`,
- `shoperUrl`,
- `qrTargetUrl`,
- `i18n`.

`Bundle`:

- `id`,
- `slug`,
- `name`,
- `audience`,
- `size`,
- `composition`,
- `isCustomizable`,
- `discountRule`,
- `listValue`,
- `bundlePrice`,
- `savingsAmount`,
- `savingsPercent`,
- `shoperUrl`,
- `status`,
- `i18n`.

`Recommendation`:

- `segment`,
- `answers`,
- `bundleIds`,
- `productQuantities`,
- `estimatedCoverage`,
- `explanation`,
- `pricing`.

## 17. Wielojęzyczność

### 17.1 Priorytet

- język polski jest źródłem prawdy dla pierwszego wdrożenia,
- wersja angielska ma być utrzymywana równolegle,
- kolejne języki nie powinny wymagać duplikowania logiki komponentów.

### 17.2 Wymagania

- teksty UI, FAQ, strony informacyjne i copy pakietów są w warstwie i18n,
- dane produktu rozdzielają pola językowe od danych biznesowych,
- ceny, SKU, rabaty i reguły doradcy nie są kopiowane per język,
- URL strategy dla kolejnych języków musi zostać ustalona przed publicznym SEO wielojęzycznym.

## 18. Płatności I Logistyka

### 18.1 Płatności

Strona może komunikować szybkie polskie płatności dopiero po potwierdzeniu konfiguracji Shopera.

Kierunek komunikacyjny:

- szybki zakup online,
- popularne lokalne metody płatności,
- checkout prowadzony przez sklep.

Badge konkretnych metod, np. `BLIK`, `Przelewy24`, `Paynow`, `karty`, muszą być sterowane danymi konfiguracyjnymi i zatwierdzone przed publikacją.

### 18.2 Logistyka

Logistyka jest częścią wartości oferty:

- paczki mają uzasadniać zakup kilku ciężkich płynów naraz,
- layout strony ma wyjaśniać wygodę dostawy do domu lub firmy,
- copy nie może obiecywać konkretnego przewoźnika ani terminu bez potwierdzenia w Shoperze,
- kalkulacja startera musi uwzględnić układ fizycznych kartonów dla 10 i docelowo 12 sztuk.

## 19. Treści Informacyjne

Wymagane placeholder strony przed startem sprzedaży:

- Regulamin,
- Polityka prywatności,
- Reklamacje,
- Kontakt,
- O marce.

Wymagane zasady:

- placeholder ma wyglądać jak świadomie przygotowana strona, nie martwy link,
- treści prawne przed publikacją muszą zostać uzupełnione i zatwierdzone,
- sekcja `O marce` ma opowiadać o Płyndo i jest jedynym publicznym miejscem dla kontekstu `JAX Professional`, wyjaśniającego źródło jakości i osobny kanał tej linii bez opisywania umów handlowych producenta.

## 20. Analityka I Sukces

### 20.1 Metryki landingu

- CTR do pakietów,
- CTR do stron produktów,
- CTR do startera,
- ukończenie konfiguratora paczki 4/8,
- ukończenie doradcy,
- przejścia do Shopera po integracji,
- scroll depth,
- engagement video po dodaniu materiałów.

### 20.2 Metryki sprzedaży po Shoperze

- zamówienia startera,
- udział paczek 4 i 8,
- udział gotowych pakietów vs własnych paczek,
- średnia wartość koszyka,
- marża po logistyce,
- powracające zakupy,
- najczęściej duplikowane produkty,
- skuteczność rekomendacji domu i firmy.

### 20.3 Kryteria sukcesu pierwszego wdrożenia

Pierwsza wersja jest gotowa, gdy:

- strona konsekwentnie sprzedaje pakiety, nie pojedyncze butelki,
- publiczne polskie copy przedstawia markę jako `Płyndo.pl`, dopuszcza `Płyndo` tylko jako skrót po przedstawieniu marki, nie używa `Płyn DO` jako tekstowego zamiennika marki poza logo i etykietami, a domena pozostaje `plyndo.pl`,
- strona `O marce` kontroluje referencję do `JAX Professional`, a hero, trust, footer i strony produktów nie powielają jej,
- footer zachowuje dane producenta lub sprzedawcy z repo jako dane podmiotu bez dominowania marki Płyndo,
- klient rozumie paczki 4, 8 i starter,
- Starter 10 pokazuje pełną aktualną zawartość i realne oszczędności z danych,
- gotowe pakiety domu i firmy mają jasny skład,
- własna paczka wspiera wybór duplikatów,
- podstrony produktów pokazują, w jakich pakietach produkt jest kupowany,
- linki prawne i kontaktowe nie są martwe,
- dummy dane integracyjne da się podmienić na Shoper bez przebudowy UI.

## 21. Ryzyka

### 21.1 Biznesowe

- rabaty mogą być atrakcyjne marketingowo, ale za niskie marżowo dla części składów,
- pakietowy próg wejścia może odstraszyć klienta szukającego jednej taniej butelki,
- segment domu i firmy może wymagać różnego tonu i różnych landing paths.

### 21.2 UX

- zbyt wiele pakietów naraz może utrudnić wybór,
- przejście do zewnętrznego checkoutu może osłabić poczucie ciągłości,
- doradca może wyglądać na skomplikowany, jeżeli będzie pytał o za dużo na raz.

### 21.3 Prawne i komunikacyjne

- konkretne claims produktowe muszą odpowiadać dokumentom i etykietom,
- claim o producencie, historii i kanale Płyndo musi zostać zatwierdzony względem interesów JAX Professional i partnerów dystrybucyjnych,
- użycie QR musi prowadzić do aktualnych miejsc docelowych,
- dane prawne sklepu i reklamacji muszą być kompletne przed sprzedażą.

### 21.4 Operacyjne

- starter 10 jest przejściowy wobec docelowego modelu 12,
- ciężkie płyny wymagają wiarygodnego modelu pakowania i wysyłki,
- własne paczki z drogimi produktami mogą wymagać ograniczeń cenowych lub innego rabatu.

## 22. Roadmap

### Etap A: uporządkowanie oferty

- zatwierdzić pakiety MVP,
- zatwierdzić dummy ceny do projektu,
- zweryfikować marżę przy zatwierdzonych globalnych rabatach pakietowych,
- przygotować model danych produktów, pakietów i rekomendacji.

### Etap B: przebudowa landingu

- usunąć pozostałości poprzedniego lejka sprzedażowego i stare pakiety,
- wprowadzić narrację paczek,
- rozbudować pakiety domu i firmy,
- poprawić FAQ, menu, footer i strony informacyjne.

### Etap C: strony sprzedażowe

- zbudować strony pakietów,
- zbudować `Starter 10`,
- zbudować konfiguratory paczek 4/8,
- rozbudować strony produktów o cenę, QR i video placeholders.

### Etap D: doradca

- uruchomić regułowego doradcę domu i firmy,
- pokazać ilości produktów i oszczędność rekomendacji,
- przygotować model pod dalsze rozszerzenie.

### Etap E: Shoper

- wstawić prawdziwe SKU,
- podmienić URL-e i QR,
- wdrożyć przekazanie pełnego składu koszyka i rabatu pakietowego dla gotowych oraz własnych paczek,
- potwierdzić płatności i dostawę,
- przetestować przejścia z landingu do checkoutu.

### Etap F: Starter 12

- dodać dwa finalne produkty,
- zmigrować katalog i starter do 12 produktów,
- przeliczyć cennik i rabaty,
- zaktualizować strony pakietów i rekomendacje.

## 23. Otwarte Decyzje

Do zatwierdzenia przed kodowaniem finalnej sprzedaży:

- finalne ceny referencyjne każdego produktu,
- margines bezpieczeństwa dla zatwierdzonych rabatów w paczkach z duplikatami,
- fizyczny sposób realizacji `Starter 10` przed wejściem `Starter 12`,
- docelowe nazwy gotowych pakietów domu i firmy,
- lista potwierdzonych metod płatności i dostawy w Shoperze,
- model URL-i dla wielu języków,
- finalne brzmienie modułu `O marce` z jedyną publiczną referencją do `JAX Professional`,
- techniczne mapowanie pełnego koszyka i rabatu pakietowego do Shopera.

## 24. Aktualny Fokus Implementacyjny

Najbliższe wdrożenie ma dostarczyć premium landing page i powiązane widoki, które:

- zachowują istniejący klimat wizualny, logo i kierunek etykiet,
- pokazują obecne 10 produktów,
- sprzedają model paczek 4, 8 i `Starter 10`,
- przygotowują strukturę pod docelowy `Starter 12`,
- obsługują dom i firmę,
- używają dummy danych dla Shopera,
- utrzymują jednolity model sprzedaży pakietowej.

## 25. Źródła I Założenia Do Weryfikacji

Źródła wykorzystane przy aktualizacji PRD:

- wymagania właściciela projektu przekazane w rozmowie,
- aktualny stan repozytorium, w tym katalog 10 produktów i obecne etykiety,
- publiczna strona `O nas` JAX Professional pod `https://jax.com.pl/o-nas`, która opisuje start działalności w 1984 roku i profil producenta.

Przed publicznym wdrożeniem trzeba zatwierdzić:

- finalne dane podmiotu sprzedającego w Shoperze i na stronach prawnych,
- finalne copy strony `O marce`, która jako jedyna publicznie referuje `JAX Professional`,
- finalne copy o rodzinności firmy, jakości, ekologii, dezynfekcji i profesjonalnym zastosowaniu,
- zgodność docelowego polskiego i angielskiego copy z prawem konsumenckim, etykietami i relacją kanałów sprzedaży.
