# Płyndo.pl - handoff i prompt wdrożeniowy

## 1. Handoff

### 1.1 Źródło prawdy

Czytaj w tej kolejności:

1. `AGENTS.md`
2. `PRD.md`
3. `docs/plyndo_packages_implementation_plan.md`
4. `docs/agents/style_guide.md`
5. `docs/agents/testing_rules.md`
6. kod aplikacji w `src`

`PRD.md` jest źródłem prawdy dla sprzedaży pakietowej Płyndo.pl. Jeżeli starszy dokument lub kod opisuje inny cel sprzedażowy, potraktuj to jako dług do zsynchronizowania z aktualnym PRD.

### 1.2 Stan produktu po decyzjach

- Cel produktu to sprzedaż pakietowa.
- Widoczna polska marka to `Płyndo.pl`; skrót `Płyndo` wolno użyć po pełnym przedstawieniu marki, gdy poprawia brzmienie zdania. Techniczna domena to `plyndo.pl`.
- MVP pracuje na 10 produktach już obecnych w repo.
- Główny starter MVP to `Starter 10`.
- Docelowy starter po dodaniu dwóch produktów to `Starter 12`.
- Pakiety logistyczne to 4, 8 albo kombinacje tych paczek.
- Własne paczki dopuszczają duplikaty produktu.
- Dom i firma są pełnoprawnymi segmentami.
- Rabaty globalne paczek to: `4 = -30%`, `8 = -40%`, `Starter 10 = -45%`, docelowy `Starter 12 = -50%`.
- Ceny produktów są referencyjne; rabat i oszczędność pokazuj tylko dla całej paczki.
- Shoper nie jest jeszcze gotowy, więc obecne CTA jest nieaktywnym placeholderem i używa jawnych danych dummy.
- PL jest podstawowy, EN musi zostać utrzymany, kolejne języki mają być możliwe.

### 1.3 Marka i producent

- Płyndo ma własny landing, własną ścieżkę sprzedaży i własny ton.
- Publiczne dane podmiotu i producenta zachowują informacje EmiChem obecne w repo.
- Na stronie `O marce` można wyjaśnić, że linia Płyndo jest produkowana dla EmiChem przez `JAX Professional`.
- Publiczna referencja do `JAX Professional` należy tylko do strony `O marce`, nie do hero, trust, footeru ani każdej strony produktu.
- Dozwolony kierunek na stronie `O marce`: Płyndo powstaje u polskiego producenta rozwijającego środki czystości od 1984 roku.
- Footer zachowuje dane producenta/sprzedawcy obecne w repo jako dane podmiotu, ale nie oddaje im marki Płyndo.
- Nie buduj komunikatu, że Płyndo zastępuje kanał B2B JAX Professional albo jest `tą samą ofertą taniej`.
- Nie eksponuj umów handlowych, sieci odbiorców ani porównań z partnerami JAX Professional w publicznym sales copy.

### 1.4 Najważniejsze miejsca w kodzie

| Plik | Znaczenie |
| --- | --- |
| `src/App.jsx` | routing i kolejność sekcji home |
| `src/content.js` | stare i nowe copy PL/EN |
| `src/data/products.js` | aktualny katalog 10 produktów, oferta dummy i detale PL/EN |
| `src/pages/ProductPage.jsx` | długi szablon strony produktu: prezentacja, użycie, bezpieczeństwo, sprzedaż |
| `src/components/sections/PlansSection.jsx` | obecna sekcja pakietów |
| `src/components/sections/AiAssistantSection.jsx` | regułowy doradca domu i firmy |
| `src/components/layout/TopNav.jsx` | menu, dropdown produktów i CTA |
| `src/components/layout/RouteEffects.jsx` | hash-scroll routingu i dynamiczne meta podstron |
| `src/components/layout/Breadcrumbs.jsx` | wspólna ścieżka powrotu podstron |
| `src/components/layout/Footer.jsx` | linki wsparcia, płatności, dane podmiotu do zachowania |

### 1.5 Zakazy wdrożeniowe

- Nie zmieniaj logotypów ani etykiet bez osobnej decyzji.
- Nie dodawaj zakupu pojedynczej butelki jako głównej akcji.
- Nie hardcoduj wartości oszczędności w tekstach kart.
- Nie publikuj niezweryfikowanych claimów `eko`, `najtańszy`, `lepszy niż market`, `dezynfekuje X` poza etykietą i zatwierdzonym źródłem.
- Nie zostawiaj martwych linków `#` w menu/footerze.
- Nie udawaj aktywnego Shopera, gdy dane są dummy.

### 1.6 Oczekiwany wynik wykonawcy

Wykonawca ma oddać:

- zmiany kodu,
- krótki opis architektury danych produktów/pakietów,
- listę danych dummy do podmiany przy uruchomieniu Shopera,
- informację o testach i wizualnej walidacji,
- listę pozostałych decyzji biznesowych blokujących publikację sprzedażową.

### 1.7 Zakres etapu wdrożeniowego

Prompt poniżej jest do jednego szerokiego MVP landingu pakietowego, a nie do finalnego sklepu.

W tym etapie trzeba wdrożyć:

- landing, routing i nawigację opisane w PRD,
- strony pakietów, `Starter 10`, konfiguratory własnych paczek 4/8 i rozbudowane podstrony produktów,
- segment domu i firmy, regułowego doradcę, FAQ oraz świadome placeholdery stron prawnych i kontaktu,
- warstwę danych dummy dla Shopera oraz przygotowanie na `Starter 12`.

Poza tym etapem zostają:

- realny checkout i konfiguracja Shopera,
- finalne ceny, SKU, QR targety, metody płatności i dostawy,
- finalne dwa produkty oraz publiczny `Starter 12`,
- zatwierdzone dokumenty prawne i claims wymagające weryfikacji.

### 1.8 Kontrakt pakietów, cen i dummy Shopera

- Kanoniczna macierz pakietów MVP jest w `PRD.md` i `docs/plyndo_packages_implementation_plan.md`: `Starter 10`, `Wybierz Sam 4`, `Wybierz Sam 8`, `Dom Codzienny 4`, `Dom Pełny 8`, `Firma Podstawowa 4`, `Firma Operacyjna 8`.
- Wielokrotności paczek oznaczają rekomendację lub koszyk złożony z paczek 4 i 8; w MVP nie tworzą automatycznie nowych stałych produktów `12`, `16` itd. poza opisanym starterem.
- Cena dummy pakietu wynika z sumy cen referencyjnych produktów oraz globalnej reguły rabatu z PRD: `4 = -30%`, `8 = -40%`, `Starter 10 = -45%`, docelowy `Starter 12 = -50%`.
- Pokazuj ceny referencyjne produktów, ale rabat i oszczędność tylko globalnie dla paczki. Waluta i wyświetlanie kwot mają być spójne dla PLN; zaokrąglenia marketingowe są decyzją biznesową, nie domysłem implementatora.
- Wszystkie dummy SKU, URL-e Shopera, QR targety, ceny i status CTA mają być wymienne w jednej warstwie danych lub konfiguracji.
- Obecne CTA do Shopera ma być nieaktywnym placeholderem. Po integracji gotowy pakiet i paczka własna przekazują do Shopera pełny skład koszyka oraz rabat pakietowy.
- Nie wolno symulować złożonego zamówienia, płatności ani dostępności sklepu, którego jeszcze nie ma.
- Strony prawne mają mieć placeholder informacyjny, nie wygenerowany regulamin. Szacunek zapasu w doradcy ma wynikać z jawnej reguły lub być opisany jako orientacyjny placeholder do kalibracji.

### 1.9 Stan wdrożenia po polerowaniu landingu

W aktualnym kodzie wykonano już następujące elementy:

- linki navbaru i footeru prowadzą do realnych sekcji/routera, a hash-scroll po przejściu z podstrony obsługuje `RouteEffects`,
- navbar ma listę 10 produktów na desktopie i mobile, a podstrony produktu, pakietu, konfiguratora i informacji mają breadcrumbs,
- podstrona produktu prowadzi od ekspozycji produktu przez placeholdery video, instrukcję i bezpieczeństwo do końcowego panelu pakietowego z ceną referencyjną, QR i dummy handoffem Shopera,
- konfigurator wizualnie pokazuje wypełnienie kartonu i pozostaje oparty o kalkulator pakietowy,
- detale produktów oraz FAQ mają warstwę PL/EN, a landing ma statyczne meta SEO/GEO/AEO plus dynamiczny title/description/canonical dla tras produktów i pakietów,
- nadal trzeba podmienić finalne URL-e Shopera, SKU, QR targety, prawne treści, zatwierdzone metody płatności/dostawy oraz docelowe media.

## 2. Uniwersalny prompt dla agenta implementującego

Skopiuj cały blok poniżej do Claude, Gemini, Codex lub innego agenta, który ma dostęp do repo.

```text
Pracujesz w repozytorium React/Vite/Tailwind v4:
/Users/mk/Dev_Env/Plyn_DO/plyndo.pl

Twoim celem jest wdrożenie aktualnego PRD dla marki Płyndo.pl. Najpierw przeanalizuj repo, dopiero potem zmieniaj kod. Jeżeli środowisko wspiera subagentów, użyj ich równolegle do: (1) audytu danych i routingu, (2) audytu copy/i18n i spójności modelu pakietowego, (3) planu UI/UX i walidacji mobile, (4) testów oraz ryzyk integracji Shopera. Orkiestrator ma scalić wyniki i pilnować jednego spójnego wdrożenia.

Źródło prawdy i kolejność czytania:
1. AGENTS.md
2. PRD.md
3. docs/plyndo_packages_implementation_plan.md
4. docs/plyndo_packages_handoff.md
5. docs/agents/style_guide.md
6. docs/agents/testing_rules.md
7. aktualny kod w src

Ważna reguła konfliktu: PRD.md ustala pakietowy zakres sprzedaży. Jeżeli AGENTS.md lub starsze dokumenty opisują inny cel produktu, zachowaj ich zasady pracy, testów i stylu, ale zaktualizuj zakres zgodnie z PRD.

Nowy model produktu:
- Likwidujemy pozostałości poprzedniego lejka, cykle dostaw i stare warianty oferty.
- Widoczne polskie copy ma przedstawiać markę jako Płyndo.pl. Skrót Płyndo jest dopuszczalny po pierwszym pełnym użyciu marki w danym widoku, gdy poprawia brzmienie zdania. Techniczna domena, URL-e i slug to plyndo.pl lub plyndo.
- Nie zmieniaj istniejących logotypów Płyn DO ani systemu etykiet.
- MVP pracuje tylko na 10 aktualnych produktach już obecnych w repo.
- Główny pakiet startowy MVP to Starter 10: po jednej sztuce każdego z 10 obecnych produktów.
- Docelowo będą 12 produktów i Starter 12, więc architektura danych i layout nie mogą zakładać na stałe liczby 10.
- Sprzedaż jest tylko w pakietach: paczki 4, paczki 8, ich kombinacje oraz starter. Nie dodawaj głównego CTA do zakupu pojedynczej butelki.
- Użytkownik może zacząć od startera, gotowego pakietu lub własnej paczki 4/8. Własna paczka dopuszcza duplikaty.
- Dom i firma są pełnoprawnymi segmentami. Pakiety firmowe domyślnie nie mają prania ani płukania.
- Shoper nie jest jeszcze uruchomiony. Zaimplementuj jawne dummy SKU, dummy URLs, dummy QR targets i dummy ceny tak, aby później można je było podmienić bez przebudowy UI.
- Trzymaj dummy SKU, URL-e Shopera, QR targety, ceny i statusy CTA w jednej wymiennej warstwie danych lub konfiguracji. Obecne CTA do Shopera ma być nieaktywnym placeholderem; nie symuluj realnego zamówienia, płatności ani dostępności Shopera.
- Po integracji gotowy pakiet i paczka własna mają przekazać do Shopera cały skład koszyka oraz globalny rabat pakietowy.
- Globalne rabaty pakietowe to: paczka 4 `-30%`, paczka 8 `-40%`, Starter 10 `-45%`, docelowy Starter 12 `-50%`.
- Pokazuj ceny referencyjne produktów, ale rabat i oszczędność tylko globalnie dla paczki.

Marka i producent:
- Publiczne dane podmiotu i producenta zachowują informacje EmiChem obecne w repo.
- Strona `O marce` może wyjaśnić, że linia Płyndo jest produkowana dla EmiChem przez JAX Professional.
- Komunikacja ma przenieść wiarygodność jakości i doświadczenia producenta na osobną markę Płyndo.
- Referencja do JAX Professional może pojawić się publicznie tylko na stronie O marce. Nie dodawaj jej do hero, trust, footeru ani każdej strony produktu.
- Dozwolony kierunek pozycjonowania na stronie O marce: linia Płyndo jest produkowana dla EmiChem przez polskiego producenta JAX Professional rozwijającego środki czystości od 1984 roku i jest projektowana do wygodnych pakietów dla domów oraz mniejszych firm.
- Nie pozycjonuj Płyndo jako tańszego zamiennika całej oferty B2B JAX Professional, nie opisuj umów handlowych producenta i nie atakuj partnerów lub sieci detalicznych.
- Footer ma zachować dane producenta/sprzedawcy już obecne w repo jako dane podmiotu i nie może oddawać im dominacji nad marką Płyndo.

Wymagany zakres implementacji:
1. Zsynchronizuj dokumenty repo, które nadal opisują inny aktywny cel sprzedażowy, z aktualnym PRD.
2. Rozbuduj dane produktów o co najmniej: volume, audiences, listPrice, dummy sku, dummy shoperUrl, qrTargetUrl, media slots i dane potrzebne pakietom.
3. Dodaj źródło danych pakietów oraz czyste kalkulatory: list value, bundle price, savings amount i savings percent. Nie hardcoduj oszczędności w copy. Kanoniczne pakiety MVP to Starter 10, Wybierz Sam 4, Wybierz Sam 8, Dom Codzienny 4, Dom Pełny 8, Firma Podstawowa 4 i Firma Operacyjna 8. Wielokrotności paczek traktuj jako rekomendacje lub koszyk paczek 4/8, nie jako nowe stałe produkty poza starterem. Licz ceny dummy z sumy cen referencyjnych i globalnych reguł rabatu z PRD; nie wymyślaj marketingowych zaokrągleń cen ani rabatów dla pozycji produktu.
4. Przebuduj home page tak, by pokazywał: hero pakietowy, jak kupujesz, katalog 10 produktów, Starter 10, pakiety własne i gotowe, segment Dom/Firma, zaufanie do jakości i logistyki bez publicznej referencji do JAX Professional, doradcę, FAQ oraz footer.
5. Usuń lub przepisz sekcje i copy związane z poprzednim lejkiem, cyklami dostaw i starymi wariantami oferty.
6. Dodaj routing i strony: /pakiety, /pakiety/starter-10, /pakiety/:slug, /skomponuj/4, /skomponuj/8, /o-marce, /kontakt, /regulamin, /polityka-prywatnosci, /reklamacje.
7. Strony pakietów mają pokazać skład, ceny referencyjne produktów, sumę wartości, cenę pakietu, globalną oszczędność kwotową/procentową, uzasadnienie składu, nieaktywne CTA placeholder do Shopera i alternatywy.
8. Konfigurator własnej paczki ma mieć licznik miejsc, dodawanie i odejmowanie duplikatów, limit 4/8, zmianę ceny ze składem i czytelny stan dummy checkout.
9. Rozbuduj każdą podstronę produktu o pakietowy kontekst sprzedaży: cena referencyjna bez rabatu pozycji, informacja kupisz w pakietach, powiązane pakiety, CTA do paczki 4/8, video placeholders, QR placeholder i miejsce pod zdjęcie butelki.
10. Doradca ma być regułowy i transparentny. Ma pytać inaczej dom i firmę, a output ma pokazywać pakiety, ilości produktów, uzasadnienie, orientacyjny zapas i oszczędność. Nie zwracaj tylko nazwy wariantu. Szacunek zapasu oprzyj na jawnej regule z danych albo oznacz jako placeholder do kalibracji.
11. Zachowaj polski i angielski wariant treści. Dane biznesowe nie mogą być dublowane per język.
12. Napraw menu/footer: realne anchor/route links, legal placeholders, kontakt, reklamacje, O marce, FAQ. Footer ma zachować obecne dane producenta/sprzedawcy jako dane podmiotu. Metody płatności pokazuj tylko jako potwierdzone lub jawnie dummy/configurable. Legal placeholders mają być świadomymi stronami informacyjnymi do późniejszej podmiany, nie samodzielnie wygenerowanym regulaminem lub polityką prawną.

Wymagania UI/UX:
- Zachowaj istniejący premium klimat, logo i kierunek etykiet.
- Pierwszy viewport ma jasno pokazać markę oraz model pakietów.
- Nie zamieniaj strony w siatkę generycznych kart. Każda sekcja ma jedną rolę.
- Pokaż ceny referencyjne produktów, ale oszczędność tylko na całym pakiecie czytelnie i uczciwie.
- Starter 10 ma mieć mocną stronę sprzedażową.
- Model danych, kalkulatory i layout startera sprawdź także na wariancie 12 pozycji, ale nie publikuj brakujących dwóch produktów jako gotowych do zakupu.
- Segment firmy ma mieć własne pakiety, argumenty i doradcę.
- Podstrony produktów mają łączyć techniczne informacje z drogą do pakietu.
- Sprawdź mobile i desktop, przelewanie tekstu, focus keyboard i kontrast.

Claims i research:
- Nie wpisuj publicznych porównań cen z marketami bez aktualnego źródła i daty.
- Nie dopisuj twardych claimów ekologicznych, biobójczych lub bezpieczeństwa poza potwierdzonymi etykietami i zaakceptowanym copy.
- Jeżeli potrzebujesz modułu porównania rynku, przygotuj strukturę danych lub placeholder dla później zatwierdzonego researchu, a nie fałszywe fakty.

Minimalna walidacja:
- npm run lint
- npm run build
- sprawdzenie UI na desktop i mobile dla landing page'a, Starter 10, konfiguratora 4/8, jednej jasnej i jednej ciemnej podstrony produktu oraz doradcy domu i firmy.

Na końcu zwróć:
- co zmieniłeś,
- jakie dane dummy trzeba podmienić po uruchomieniu Shopera,
- jakie testy uruchomiłeś,
- jakie decyzje biznesowe nadal blokują publikację sprzedażową.
```

## 3. Krótsze prompty pomocnicze

Jeżeli wdrożenie jest dzielone na agentów, można użyć dodatkowo:

### 3.1 Agent danych i kalkulatorów

```text
Przeczytaj PRD.md i docs/plyndo_packages_implementation_plan.md. Zaprojektuj dane produktów i pakietów dla aktualnych 10 produktów Płyndo oraz czyste kalkulatory cen pakietowych dla Starter 10, paczek własnych 4/8 i gotowych pakietów domu/firmy. Użyj dummy Shopera i nie ruszaj copy UI poza tym, co jest potrzebne do integracji danych.
```

### 3.2 Agent UX/copy/i18n

```text
Przeczytaj PRD.md, docs/agents/style_guide.md i docs/plyndo_packages_implementation_plan.md. Przepisz IA oraz copy PL/EN do modelu pakietowego Płyndo. Zachowaj premium ton, pokaż Dom i Firmę, ogranicz publiczną referencję do JAX Professional wyłącznie do strony O marce i usuń pozostałości poprzedniego lejka.
```

### 3.3 Agent testów

```text
Zweryfikuj wdrożenie Płyndo względem PRD.md: jednolity model pakietowy, poprawne pakiety 4/8/Starter 10, ceny z danych, routing pakietów i stron prawnych, QR/video placeholders na produktach, doradca dla domu i firmy, PL/EN oraz mobile/desktop. Uruchom lint/build i wypisz regresje z plikami.
```
