# Płyndo.pl - implementation plan dla sprzedaży pakietowej

## 1. Cel planu

Ten dokument przekłada `PRD.md` na plan wdrożenia sprzedaży chemii domowej i firmowej wyłącznie w pakietach na obecnym landingu React/Vite.

Plan obejmuje:

- aktualne 10 produktów,
- `Starter 10` jako starter MVP,
- paczki własne `4` i `8`,
- gotowe pakiety domu i firmy,
- pełny segment firmy,
- strony pakietów, produktów, informacyjne i kontaktowe,
- regułowego doradcę pakietu,
- dane dummy dla Shopera, QR, cen i SKU,
- polski jako język podstawowy oraz utrzymaną wersję angielską.

Plan nie obejmuje finalnego sklepu Shoper, finalnych cen, finalnych dokumentów prawnych ani dodania dwóch przyszłych produktów.

## 2. Decyzje bazowe

### 2.1 Marka i domena

- Widoczna polska marka: `Płyndo.pl`.
- Skrót `Płyndo` może pojawić się po pełnym przedstawieniu marki, jeżeli poprawia brzmienie zdania. `Płyn DO` zostaje w logo i etykietach, nie jako zamiennik tekstowy marki.
- Domena, kod, slug i URL: `plyndo.pl` lub `plyndo`.
- Obecne logo `Płyn DO` i etykiety zostają. Nie projektujemy nowego logotypu.
- Publiczne dane podmiotu i producenta zachowują informacje EmiChem obecne w repo; strona `O marce` może wyjaśnić, że linia Płyndo jest produkowana dla EmiChem przez `JAX Professional`.

### 2.2 Oferta

- Nie ma cykli dostaw, pauzowania planu ani zarządzania abonamentem.
- CTA prowadzą do pakietów, produktów, doradcy albo jawnych placeholderów Shopera.
- Nie ma sprzedaży pojedynczej butelki z landing page'a.
- Jednostką zakupu jest pakiet: gotowy starter, gotowy zestaw albo własna paczka.
- Podstawowe wielkości logistyczne to paczki 4 i 8 oraz ich wielokrotności.
- `Starter 10` jest wyjątkiem przejściowym na obecnym katalogu; docelowo ma zostać zastąpiony przez `Starter 12`, który mieści się w modelu `4 + 8`.
- Globalne rabaty paczek: `4 = -30%`, `8 = -40%`, `Starter 10 = -45%`, docelowy `Starter 12 = -50%`.

### 2.3 Integracje

- Landing edukuje, liczy i kieruje dalej.
- Shoper ma docelowo przejąć checkout, płatności, dostawę, SKU i prawdziwe URL-e.
- Obecne CTA do Shopera na landingu pozostaje nieaktywnym placeholderem.
- Po integracji gotowy pakiet i paczka własna przekazują do Shopera pełny skład koszyka oraz rabat pakietowy.
- Do uruchomienia Shopera implementacja korzysta z jawnych danych dummy i nie udaje realnego checkoutu.

## 3. Wynik audytu repo

### 3.1 Co już istnieje

- React, Vite, Tailwind v4 i obecny design system w `src/index.css`.
- 10 produktów oraz etykiety w `src/data/products.js`.
- Landing z hero, trust, product grid, value, plans, FAQ i footerem.
- Podstrona produktu pod `/product/:slug`.
- Przełączanie języka PL/EN w jednej warstwie copy.

### 3.2 Co wymagało synchronizacji z PRD

- kompozycja home, copy oraz doradca wymagały jednoznacznego przejścia na paczki,
- historyczne warianty oferty i CTA rozpraszały główną drogę do pakietu,
- instrukcje repo wymagały zsynchronizowania opisu produktu z PRD,
- `TopNav.jsx` i `Footer.jsx` mają linki, które trzeba zamienić na realne sekcje lub podstrony.
- `Footer.jsx` pokazuje metody płatności i dane podmiotu jako twarde copy; metody płatności wymagają konfiguracji, a istniejące dane producenta/sprzedawcy trzeba zachować jako dane podmiotu.
- `ProductPage.jsx` informuje o użyciu i składzie, ale nie sprzedaje modelu pakietowego, nie pokazuje oszczędności, QR ani video placeholderów.
- Dane produktów nie mają warstwy cen, wolumenu, SKU, URL Shopera, segmentów, media slots ani powiązań z pakietami.

## 4. Kierunek UX i UI

### 4.1 Teza wizualna

Płyndo ma wyglądać jak spokojna, premium linia chemii użytkowej z laboratoryjną wiarygodnością i domową wygodą, nie jak promocyjna gazetka marketu ani dashboard e-commerce.

### 4.2 Teza treści

Pierwszy ekran ma sprzedać jedną rzecz: `Płyndo` dostarcza dobre płyny do domu i firmy w paczkach, które opłaca się wysłać i łatwo uzupełniać.

Sekcje niżej mają kolejno:

1. wyjaśnić model pakietów,
2. pokazać produkty,
3. dać szybki wybór gotowych zestawów,
4. dać własny wybór 4/8,
5. rozdzielić dom i firmę,
6. zbudować zaufanie przez jakość i logistykę bez rozpraszania marki Płyndo,
7. pomóc doradcą,
8. zamknąć FAQ i ścieżkami kontaktowymi.

### 4.3 Wymagania doświadczenia

- Brand i model pakietów są czytelne przed pierwszym scrollowaniem.
- Karty pakietów pokazują oszczędność na całym zestawie, nie obiecują rabatu na pojedynczej butelce.
- `Starter 10` ma własną mocną stronę sprzedażową, bo jest głównym wejściem w linię.
- Paczka własna ma wyglądać jak realne układanie kartonu: licznik miejsc, duplikaty i jasny bilans ceny.
- Segment firmy ma własne argumenty i zestawy, nie jest dopiskiem do treści domowych.
- Publiczna referencja do `JAX Professional` należy tylko do strony `O marce`; hero, trust, footer i strony produktów pozostają komunikacją Płyndo.
- Podstrona produktu prowadzi z informacji technicznej do pakietów.

## 5. Architektura treści

### 5.1 Landing

Rekomendowana kolejność:

1. `Hero`: Płyndo, pakiety, CTA do startera i katalogu.
2. `Jak kupujesz`: starter, paczka 4, paczka 8.
3. `Katalog produktów`: 10 produktów z wejściem do szczegółów.
4. `Starter 10`: pełna linia, referencyjna wartość, cena dummy i oszczędność.
5. `Pakiety`: własne paczki oraz gotowe zestawy domu i firmy.
6. `Dom / Firma`: porównanie zastosowań, typowe zużycie i rekomendowane paczki.
7. `Dlaczego Płyndo`: wygoda dostawy, jakość, polska produkcja, model logistyczny.
8. `Doradca`: regułowy dobór pakietów.
9. `Media`: miejsce na filmy działania produktów.
10. `FAQ`.
11. `Footer`.

### 5.2 Strony pakietów

Wdrożyć:

- indeks `/pakiety`,
- `/pakiety/starter-10`,
- `/pakiety/:slug` dla gotowych zestawów,
- `/skomponuj/4`,
- `/skomponuj/8`.

Każda strona pakietu ma mieć:

- tytuł i segment,
- skład oraz ilości,
- ceny referencyjne pozycji i sumę list value,
- cenę pakietu, kwotę oszczędności i procent,
- uzasadnienie składu,
- nieaktywne CTA placeholder do Shopera do czasu integracji,
- CTA po integracji przekazujące pełny skład koszyka i rabat pakietowy,
- powiązane produkty i alternatywę własnej paczki.

### 5.3 Strony produktów

Rozbudować istniejący szablon o:

- krótkie USP i pojemność,
- cenę referencyjną z adnotacją, że zakup jest pakietowy,
- zestawy zawierające produkt,
- CTA do `Wybierz Sam 4` i `Wybierz Sam 8`,
- placeholder filmu skuteczności,
- placeholder filmu instruktażowego,
- QR placeholder sterowany danymi.

### 5.4 Strony informacyjne

Wdrożyć route i treść placeholder dla:

- `/o-marce`,
- `/kontakt`,
- `/regulamin`,
- `/polityka-prywatnosci`,
- `/reklamacje`.

Placeholder prawny ma jawnie mówić, że finalna treść zostanie podmieniona przed startem sprzedaży. Nie może być martwym `#`.

## 6. Architektura oferty

### 6.1 Pakiety MVP

| Typ | Pakiet | Skład |
| --- | --- | --- |
| Starter | `Starter 10` | po 1 sztuce każdego obecnego produktu |
| Własny | `Wybierz Sam 4` | dowolne 4 sztuki, duplikaty dozwolone |
| Własny | `Wybierz Sam 8` | dowolne 8 sztuk, duplikaty dozwolone |
| Dom | `Dom Codzienny 4` | naczynia, podłogi, WC, łazienka |
| Dom | `Dom Pełny 8` | naczynia, pranie, płukanie, podłogi, WC, ręce, szyby, łazienka |
| Firma | `Firma Podstawowa 4` | podłogi, WC, ręce, łazienka |
| Firma | `Firma Operacyjna 8` | podłogi x2, WC, łazienka, ręce, szyby, dezynfekcja, naczynia |

### 6.2 Ceny

Pierwsza implementacja ma użyć funkcji wyliczających:

- sumę cen referencyjnych produktów w pakiecie,
- rabat według `discountRule`,
- cenę pakietu,
- oszczędność kwotową,
- oszczędność procentową.

Nie hardcodować kwot oszczędności w copy ani kartach komponentów.

`discountRule` jest globalne dla paczki:

| Typ paczki | Rabat |
| --- | ---: |
| Paczka 4 | `30%` |
| Paczka 8 | `40%` |
| `Starter 10` | `45%` |
| docelowy `Starter 12` | `50%` |

Produkty pokazują ceny referencyjne. Rabat i oszczędność nie są rozbijane na pozycje produktu, tylko pokazywane dla całej paczki.

### 6.3 Dane dummy

Każdy produkt i pakiet powinien móc mieć:

- `status`: `dummy`, `ready`, `hidden` lub równoważny wariant,
- `sku`,
- `shoperUrl`,
- dane przekazania do Shopera dla pełnego składu koszyka i rabatu pakietowego,
- `qrTargetUrl`,
- `listPrice`,
- media placeholders,
- pole opisujące, czy CTA jest nieaktywnym placeholderem czy gotowym przekazaniem do Shopera.

## 7. Doradca pakietu

### 7.1 Zakres MVP

Doradca ma być regułowy. Nie trzeba generatywnego AI, aby spełnić wymaganie produktu.

### 7.2 Flow domu

Minimalne wejścia:

- metraż,
- liczba osób,
- liczba łazienek/WC,
- zmywarka,
- pranie i płukanie,
- dzieci,
- zwierzęta,
- duże przeszklenia,
- częstotliwość sprzątania.

### 7.3 Flow firmy

Minimalne wejścia:

- metraż,
- typ przestrzeni,
- liczba użytkowników,
- sanitariaty,
- aneks kuchenny,
- zmywarka,
- duże przeszklenia,
- częstotliwość sprzątania,
- podwyższona potrzeba dezynfekcji.

### 7.4 Output

Doradca ma zwrócić:

- rekomendowany pakiet startowy lub własny,
- ewentualne dodatkowe paczki 4/8,
- tabelę ilości produktów,
- uzasadnienie w języku użytkowym,
- orientacyjny czas zapasu bez twardej gwarancji,
- cenę, wartość referencyjną i oszczędność z tych samych kalkulatorów co strony pakietów.

## 8. Research marketingowy i SWOT

### 8.1 Badanie konkurencji przed publikacją claims

Przy implementacji nie wpisywać niezweryfikowanego copy typu `tańsze niż Rossmann`. Najpierw przygotować arkusz lub plik badawczy z datą:

- produkty porównywalne po zastosowaniu i pojemności,
- cena regularna oraz promocyjna, jeżeli jest rozróżniona,
- cena za litr,
- pojemność i koncentracja, jeżeli wpływa na porównanie,
- źródło URL i data odczytu,
- ograniczenia porównania jakościowego.

Kanały do sprawdzenia:

- dyskonty i drogerie dostępne dla polskiego klienta,
- marketplace tylko jako sygnał ceny, nie wzorzec wiarygodności,
- oferty profesjonalne tylko dla kontekstu jakości i formatów, nie do prostego porównania 1:1.

### 8.2 Wstępny SWOT

| Obszar | Wnioski |
| --- | --- |
| Strengths | Jeden system produktów, pakiety zoptymalizowane logistycznie, jakość producenta JAX Professional, polski kontekst, czytelne etykiety, dostawa ciężkich płynów. |
| Weaknesses | Nowa marka bez własnej historii konsumenckiej, wyższy próg koszyka niż jedna butelka, zależność od finalnego Shopera, ograniczony obecnie katalog 10 zamiast 12. |
| Opportunities | Domy i małe firmy potrzebują prostego zapasu, doradca może zmniejszyć paraliż wyboru, video może pokazać skuteczność, a pakiety uzupełniające wspierają powroty. |
| Threats | Promocje marketowe, nieuczciwe lub nieaktualne porównania cen, ryzyko claims prawnych przy dezynfekcji i ekologii, koszt wysyłki płynów, pomieszanie kanału Płyndo z ofertą B2B producenta. |

## 9. Plan implementacji

### Faza 0: synchronizacja dokumentacji

Cel: usunąć sprzeczne instrukcje dla kolejnych agentów.

Zakres:

- zsynchronizować `README.md`, `CLAUDE.md`, `docs/agents/product_constraints.md` i `docs/agents/api_conventions.md` z PRD,
- opisać obowiązujący pakietowy zakres sprzedaży,
- zachować zasadę ostrożnego planowania z `AGENTS.md`.

Akceptacja:

- `rg` nie pokazuje starych instrukcji, które nadal każą budować inny scope MVP.

### Faza 1: dane domenowe i kalkulatory

Cel: odłączyć ofertę od hardcoded copy.

Zakres:

- rozbudować dane produktów o ceny, volume, segmenty, dummy SKU/URL/QR i media slots,
- dodać źródło danych pakietów,
- dodać kalkulatory list value, bundle price i savings,
- odseparować teksty PL/EN od danych biznesowych,
- przygotować statusy danych dummy i późniejszego Shopera.

Akceptacja:

- `Starter 10`, pakiety gotowe i własne liczą wartości z danych,
- zmiana ceny produktu aktualizuje wszystkie widoki pakietów,
- model danych i layout strony startera są sprawdzone dla 10 oraz symulowanych 12 pozycji, aby późniejsze przejście na `Starter 12` nie wymagało przebudowy widoku.

### Faza 2: routing i architektura landing page'a

Cel: usunąć stary lej i pokazać nowy model paczek.

Zakres:

- usunąć z kompozycji home sekcje poprzedniego lejka,
- przepisać hero, trust, value, FAQ i navigation copy,
- wprowadzić moduł `Jak kupujesz`,
- przebudować sekcję pakietów z realnym `Starter 10`,
- dodać route informacyjne i realne linki w menu/footerze,
- dodać stronę `O marce` jako jedyne publiczne miejsce referencji do `JAX Professional`.

Akceptacja:

- użytkownik widzi paczki 4/8 i starter bez znajomości starego produktu,
- nie ma martwych linków menu/footeru,
- wszystkie CTA prowadzą do aktualnego modelu pakietowego.

### Faza 3: strony pakietów i konfigurator własnej paczki

Cel: z landing page'a dać realną drogę wyboru pakietu.

Zakres:

- indeks pakietów,
- strona `Starter 10`,
- strony gotowych pakietów domu i firmy,
- konfiguratory 4 i 8 z duplikatami,
- nieaktywne CTA placeholder do docelowego Shopera.

Akceptacja:

- własna paczka blokuje limit miejsc,
- duplikaty wpływają na skład i cenę,
- każdy pakiet ma jawny skład, wartość, cenę i oszczędność.

### Faza 4: rozbudowa podstron produktów

Cel: połączyć informację techniczną z modelem pakietowym.

Zakres:

- ceny referencyjne i segmenty,
- powiązane pakiety,
- CTA do własnych paczek,
- QR placeholder,
- video placeholders,
- miejsce pod fotografie butelek i późniejszy motion asset.

Akceptacja:

- żadna strona produktu nie sugeruje finalnego zakupu jednej sztuki,
- każdy produkt ma widoczną drogę do paczki.

### Faza 5: doradca

Cel: dać rekomendacje dla domu i firmy.

Zakres:

- włączyć lub zastąpić stary komponent advisor,
- zbudować kroki pytań,
- zaimplementować reguły ilości i wykluczeń,
- użyć tych samych danych pakietów oraz kalkulatorów cen,
- dodać wyjaśnienie rekomendacji.

Akceptacja:

- firma bez prania nie dostaje prania ani płukania,
- większe profile mogą dostać kilka paczek,
- output pokazuje produkty i ilości, a nie tylko nazwę wariantu.

### Faza 6: i18n, SEO, access i analytics hooks

Cel: doprowadzić przebudowę do wdrożeniowej jakości.

Zakres:

- utrzymać PL/EN w tekstach, route labels i FAQ,
- zadbać o metadata marki/domeny, GEO/AEO facts i późniejszy hreflang plan,
- dodać dostępne etykiety, focus, keyboard states i sensowny mobile flow,
- zdefiniować event names dla CTA pakietów, doradcy, produktów, video i Shoper outbound.

Akceptacja:

- build/lint przechodzą,
- desktop i mobile są sprawdzone wizualnie,
- teksty nie przelewają się w pakietach, konfiguratorze i FAQ.

Stan w aktualnym wdrożeniu:

- home, pakiety, konfigurator i produkty utrzymują wariant PL/EN; detale produktu korzystają z danych lokalizowanych przy katalogu produktów,
- `TopNav` zawiera dropdown produktów oraz mobile listę wejść do 10 podstron,
- `RouteEffects` rozwiązuje przewijanie sekcji po hashach w routerze i aktualizuje title, description oraz canonical dla tras pakietowych i produktowych,
- podstrony pakietu, konfiguratora, informacji i produktu korzystają z breadcrumbs,
- `index.html` zawiera kanoniczną domenę `plyndo.pl`, Open Graph/Twitter, podstawowe metadane lokalizacyjne Poznania i JSON-LD `Organization`, `WebSite`, `ItemList`.

### Faza 7: integracja Shopera

Cel: podmienić dummy warstwę bez przebudowy UI.

Zakres:

- wstawić finalne SKU i URL-e,
- podmienić QR targety,
- zatwierdzić płatności, dostawy, regulamin i reklamacje,
- przekazać do Shopera pełny skład gotowego pakietu i paczki własnej wraz z rabatem pakietowym.

Akceptacja:

- każdy outbound zakupowy przekazuje do poprawnego celu cały skład koszyka i rabat pakietowy,
- dummy badges i placeholder checkout nie są widoczne w produkcji sprzedażowej.

## 10. Sugerowana mapa kodu

Nazwy mogą zostać dopasowane do wzorców repo, ale odpowiedzialności powinny być jasne.

| Obszar | Kierunek |
| --- | --- |
| Produkty | rozbudować `src/data/products.js` albo wydzielić katalog i tłumaczenia |
| Pakiety | dodać repozytorium danych pakietów, np. `src/data/bundles.js` |
| Kalkulatory | dodać czyste funkcje domenowe, np. `src/lib/bundlePricing.js` |
| Strony pakietów | nowe route pages w `src/pages` |
| Konfigurator | komponent domain UI z limitem miejsc i duplikatami |
| Doradca | rules engine oddzielony od prezentacji |
| QR/video | reusable placeholders sterowane statusami danych |
| Legal/contact | proste page templates z i18n copy |

## 11. Kryteria ukończenia

Zmiana jest kompletna, gdy:

- landing konsekwentnie sprzedaje pakiety,
- oferta opiera się na `Starter 10`, paczkach 4/8 i gotowych pakietach domu/firmy,
- strona pokazuje oszczędność całego pakietu z danych,
- użytkownik może przejść do szczegółu pakietu, produktu i własnej paczki,
- strony produktów mają QR i video placeholders,
- doradca pokazuje ilości i ekonomię rekomendacji,
- widoczne copy używa `Płyndo.pl`, a techniczne URL-e używają `plyndo.pl`,
- strona `O marce` jest jedynym publicznym miejscem referencji do `JAX Professional`,
- footer zachowuje dane producenta/sprzedawcy obecne w repo jako dane podmiotu bez dominowania marki Płyndo,
- linki prawne, kontaktowe i brandowe nie są martwe,
- PL i EN nie rozjeżdżają się semantycznie,
- finalna warstwa Shoper może zastąpić dummy dane bez przepisywania UI.

## 12. Walidacja

Minimalna walidacja repo:

```bash
npm run lint
npm run build
```

Walidacja UI:

- desktop i mobile dla landing page'a,
- desktop i mobile dla `Starter 10`,
- wariant danych startera z 12 pozycjami do walidacji układu i kalkulatorów przed wejściem finalnego `Starter 12`,
- konfigurator paczki 4 i 8 z pustym, częściowym, pełnym i przepełnionym wyborem,
- podstrona produktu o jasnej i ciemnej etykiecie,
- doradca dla profilu domu i firmy,
- link checker dla menu/footeru i stron informacyjnych.

## 13. Otwarte wejścia biznesowe

Przed sprzedażą potrzebne są:

- finalne ceny referencyjne i marża przy zatwierdzonych globalnych rabatach,
- finalne dwa produkty docelowej linii 12,
- finalne linki Shopera, SKU, QR targety oraz techniczne mapowanie pełnego koszyka i rabatu pakietowego,
- zatwierdzone metody płatności i dostawy,
- finalne regulaminy, polityka prywatności, reklamacje i dane sprzedawcy,
- finalne copy strony `O marce` z referencją do `JAX Professional` oraz copy o rodzinności, ekologii i profesjonalnych zastosowaniach.
