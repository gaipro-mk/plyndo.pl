# PROMPT WDROŻENIOWY DLA GEMINI — domknięcie integracji Płyndo.pl ↔ Shoper

**Wersja:** 2026-08-17 · **Model docelowy:** Gemini Flash 3.7 (High) · **Rola:** wykonawca
**Weryfikator:** Claude (orkiestrator) — po wykonaniu przeprowadzi audyt każdego punktu
**Kontekst wejściowy:** `docs/ULTRA-REVIEW-SHOPER-2026-08-17.md` — przeczytaj w całości przed pierwszą zmianą

> Skopiuj cały blok poniżej (od linii `===== POCZĄTEK =====` do `===== KONIEC =====`) do Gemini.

---

```text
===== POCZĄTEK PROMPTU =====

## ROLA I ZASADY PRACY

Jesteś wykonawcą wdrożenia w repozytorium React/Vite/Tailwind v4:
/Users/mk/Dev_Env/Plyn_DO/plyndo.pl

Pracujesz zgodnie z zasadami Agentic OS opisanymi w AGENTS.md, CLAUDE.md i docs/agents/*.

TWARDE REGUŁY:
1. PLANNING RULE: nie zmieniasz kodu, dopóki nie masz ≥95% pewności co do zakresu. Najpierw czytasz, weryfikujesz założenia, dopiero potem edytujesz.
2. Nie czytasz .env*, secrets/**, *.pem, *.key. Sekrety wczytujesz przez istniejące skrypty (scripts/shoper-api-client.mjs ładuje .env.local sam) i NIGDY nie drukujesz ich wartości w logach ani w commit message.
3. Logi bash: maks. 200 linii na wywołanie. Dłuższe → do pliku, czytasz fragmentami.
4. Nie zmieniasz logotypów PŁYN DO ani systemu etykiet.
5. Referencja do "JAX Professional" wolno tylko na stronie /o-marce. Nigdzie indziej.
6. Nie dodajesz zakupu pojedynczej butelki jako akcji sprzedażowej.
7. Nie wymyślasz claimów eko/biobójczych/porównań cenowych.
8. Każdy etap kończysz raportem: co zmieniłeś, jakie testy uruchomiłeś, co zostało otwarte.

KOLEJNOŚĆ CZYTANIA ŹRÓDEŁ:
1. docs/ULTRA-REVIEW-SHOPER-2026-08-17.md   ← najświeższe, nadrzędne
2. AGENTS.md, CLAUDE.md
3. docs/agents/product_constraints.md, style_guide.md, testing_rules.md, handoff.md
4. PRD.md  ← UWAGA: zawiera nieaktualną macierz rabatów, patrz Etap 5
5. docs/plyndo_shoper_handoff.md, docs/shoper_integration_guide.md  ← opisują protokół v1, ARCHIWALNY
6. kod: src/lib/, src/data/, src/components/bundles/, shoper-theme/, scripts/

REGUŁA KONFLIKTU: przy rozbieżności obowiązuje ULTRA REVIEW z 17.08.2026, potem stan faktyczny kodu, na końcu starsza dokumentacja. Starsze dokumenty traktujesz jako dług do spłaty w Etapie 5, nie jako wymaganie.


## DECYZJE BIZNESOWE — ZATWIERDZONE 17.08.2026, NIE PODLEGAJĄ DYSKUSJI

D1. Rabaty pakietowe: paczka 4 = −20%, paczka 8 = −30%, paczka 12 = −40%.
    Kod (bundlePricing.js, bundles.js) jest POPRAWNY. To PRD.md, CLAUDE.md i handoffy
    są nieaktualne (mówią 30/40/45/50) — poprawiasz dokumentację, nie kod.
    Nie ma i nie było produktu "Starter 10" ani "Starter 12". Repo ma 12 produktów
    (stockId 182–193) i pakiety 4/8/12.

D2. Sprzedaż tylko w paczkach 4/8/12. Checkout w Shoperze ma być twardo zablokowany,
    gdy liczba butelek w koszyku ≠ 4, 8, 12. Komunikat ma mówić, ile brakuje.

D3. Zero duplikacji: skład koszyka komponowany na landingu jest JEDYNYM źródłem prawdy
    i w całości przekazywany do Shopera. Nie budujemy równoległych "produktów-pakietów"
    w Shoperze, które opisują to samo innymi cenami.

D4. Parytet wizualny: szablon Shopera ma wyglądać maksymalnie zbliżenie do landingu
    plyndo.pl. Klient nie może odczuć, że trafił do innego serwisu.

D5. Podział ról: plyndo.pl = źródło informacji o produktach, paczkach, firmie.
    sklep.plyndo.pl = wyłącznie narzędzie do dokonania zakupu.


## ARCHITEKTURA DOCELOWA

Landing (plyndo.pl)                          Sklep (sklep.plyndo.pl)
─────────────────────                        ───────────────────────
Klient komponuje paczkę 4/8/12
        │
        │ buildShoperHandoffUrl()
        ▼
/pl/basket?pd_v=2
  &pd_items=182:2,186:1,...                  Moduł własny (JS) czyta parametry
  &pd_pack=8                          ──►    → cleanBasket() jeśli mode=replace
  &pd_mode=replace                           → addItem() × N
  &pd_sid=<8 znaków>                         → promo.add('PLYNDO-PACK-8')
  &pd_label=<nazwa paczki>                   → weryfikacja count + hasPromotionCode
                                             → cleanUrl() + redirect /pl/basket
                                             → guard sessionStorage (anty-dubel)

Stały nasłuch: basket.updated → auto-sync kuponu do rozmiaru koszyka
                             → blokada checkoutu gdy count ∉ {4,8,12}


═══════════════════════════════════════════════════════════════════
ETAP 0 — INWENTARYZACJA (BLOKUJE WSZYSTKIE POZOSTAŁE ETAPY)
═══════════════════════════════════════════════════════════════════

Cel: ustalić stan faktyczny konta Shoper. Nie zmieniasz NICZEGO w tym etapie.

0.1 Potwierdź Premium twardo — nie po badge'u w stopce:
    Zaloguj się do https://sklep562393.shoparena.pl/admin i sprawdź, czy istnieje:
    Wygląd i treści → Wygląd sklepu → Edycja szablonu graficznego → MODUŁY WŁASNE
    Jeśli tej sekcji NIE MA — Premium nie jest aktywne mimo badge'a. ZATRZYMAJ SIĘ
    i zaraportuj. Bez modułów własnych całe wdrożenie jest niewykonalne.

0.2 REST API — wykonaj i zapisz surowe wyniki (bez sekretów) do pliku:
    node scripts/shoper-api-client.mjs --test          > /tmp/shoper_auth.txt
    node scripts/shoper-api-client.mjs --list-products > /tmp/shoper_products.json
    Odczytaj nagłówki x-shop-api-limit / x-shop-api-calls / x-shop-api-bandwidth
    i zanotuj realne limity tego konta.

0.3 Zinwentaryzuj przez REST API lub panel:
    a) Kupony rabatowe — pełna lista. Sprawdź w szczególności, czy istnieją
       RÓWNOLEGLE dwa komplety: PlynDo_x4/x8/x12 (protokół v1, archiwalny)
       oraz PLYNDO-PACK-4/8/12 (protokół v2, obowiązujący).
       Dla każdego zanotuj: kod, wartość %, warunki (min. liczba sztuk), status.
    b) Produkty 94–105 (12 płynów) — czy wszystkie aktywne, ceny, stockId 182–193.
    c) Produkty 106/107/108 (Pakiet 4x/8x/12x z docs/plyndo_shoper_handoff.md) —
       czy nadal istnieją, czy są aktywne, do jakiej kategorii przypisane.
    d) Kategoria "Pakiety" (id 40) — dlaczego jest pusta.
    e) Formy dostawy i płatności — czy skonfigurowane i aktywne.

0.4 Zweryfikuj Storefront Basket API (to podstawa całego handoffu):
    GET  https://sklep.plyndo.pl/api/basket          → zapisz strukturę odpowiedzi
    POST https://sklep.plyndo.pl/api/basket/{id}/item/182  body {"quantity":1}
    PUT  https://sklep.plyndo.pl/api/basket/{id}/promo-code body {"promoCode":"PLYNDO-PACK-4"}
    Potwierdź, że hasPromoCode:true i że discounts.sum.grossValue się nalicza.
    (Ten sam przepływ testuje scripts/verify_production_truth.mjs T1–T3 — możesz
     uruchomić: node scripts/verify_production_truth.mjs i użyć wyniku jako baseline.)

0.5 Uruchom pełny baseline testów i zapisz wynik PRZED zmianami:
    node scripts/verify_production_truth.mjs 2>&1 | tee /tmp/verify_before.txt
    Oczekiwane na wejściu: T4, T6, T8 FAIL. Jeśli T1–T3 też FAIL — problem
    z kuponami, rozwiąż to zanim ruszysz dalej.

DELIVERABLE ETAPU 0:
  docs/shoper_inventory_2026-08-17.md — tabela stanu faktycznego + rekomendacje
  co do kuponów-duplikatów, SKU 106/107/108 i kategorii "Pakiety".
  ZATRZYMAJ SIĘ i poczekaj na akceptację rekomendacji przed Etapem 3.


═══════════════════════════════════════════════════════════════════
ETAP 1 — NAPRAWA LANDINGU (P0, KOD)
═══════════════════════════════════════════════════════════════════

BUG KRYTYCZNY, ŻYWY NA PRODUKCJI:
Na https://plyndo.pl/pakiety/dom-codzienny-4 (i na każdej innej stronie pakietu
oraz w konfiguratorze) pod przyciskiem "Przejdź do sklepu" renderuje się
czerwony komunikat deweloperski:
    "[plyndo] Nieprawidłowa paczka: 0 szt. Dozwolone: 4, 8, 12."

PRZYCZYNA (zweryfikowana):
src/lib/bundlePricing.js → calculateBundlePricing() zwraca:
    composition: lineItems.map(({ productSlug, quantity }) => ({ productSlug, quantity }))
czyli odcina obiekt `product`, a razem z nim `stockId`.
src/components/bundles/BundlePricePanel.jsx czyta właśnie `pricing.composition`:
    stockId: c.product?.stockId ?? c.stockId    // oba undefined
→ buildShoperHandoffUrl() odfiltrowuje wszystkie pozycje → total 0 → throw.

1.1 Napraw kontrakt danych (preferowane rozwiązanie):
    W calculateBundlePricing() rozszerz zwracane `composition` o stockId i product,
    ALBO zmień BundlePricePanel, by czytał `pricing.lineItems`.
    Wybierz rozwiązanie, które NIE wymaga, żeby konsument wiedział, którego z dwóch
    pól użyć. Jedno pole = jedno źródło prawdy. Uzasadnij wybór w raporcie.

1.2 Żaden komunikat techniczny nie może trafić do UI klienta.
    W src/components/bundles/StoreButton.jsx: handoffError loguj przez console.error,
    a użytkownikowi pokaż neutralny komunikat PL/EN
    (np. "Nie udało się przygotować paczki. Odśwież stronę lub napisz do nas.")
    plus działający fallback do /#pakiety.

1.3 Usuń martwy protokół v1:
    src/lib/storeCta.js → getBundleStoreHref() buduje URL "?add=182:1&promo=PlynDo_x4".
    Nikt tej funkcji nie woła. Usuń ją w całości razem z logiką promoParam.
    Sprawdź grep -rn "PlynDo_x\|?add=" src/ — po zmianie ma nie być trafień.

1.4 Ścieżka pojedynczego produktu (decyzja D2):
    src/pages/ProductPage.jsx renderuje StoreButton z jedną pozycją
    (getProductCartItems zwraca 1 szt.) → to zawsze wywoła handoffError.
    Zmień: CTA na karcie produktu ma prowadzić do konfiguratora paczki
    (/pakiety/wlasna-paczka/4) z tym produktem wstępnie dodanym, ALBO do listy
    pakietów zawierających ten produkt. Nigdy bezpośrednio do sklepu z 1 szt.

1.5 Walidacja:
    npm run lint
    npm run build
    Ręcznie sprawdź w npm run dev, desktop + mobile:
      /pakiety/dom-codzienny-4          → CTA aktywne, bez czerwonego tekstu
      /pakiety/dom-pelny-8              → j.w.
      /pakiety/dom-komplet-12           → j.w.
      /pakiety/wlasna-paczka/4          → CTA nieaktywne przy 1–3 szt., aktywne przy 4
      /pakiety/wlasna-paczka/8 i /12    → j.w.
      /produkt/plyn-do-naczyn           → CTA prowadzi do konfiguratora, nie do błędu
    Skopiuj wygenerowany URL handoffu i zweryfikuj, że ma postać:
      https://sklep.plyndo.pl/pl/basket?pd_v=2&pd_items=182:1,186:1,189:1,190:1&pd_pack=4&pd_mode=replace&pd_sid=...

1.6 Deploy: git push na main (remote mierzwixjr) → Cloudflare Pages.
    Po wdrożeniu potwierdź, że test T5 w verify_production_truth.mjs przechodzi.


═══════════════════════════════════════════════════════════════════
ETAP 2 — WDROŻENIE SKRYPTU STOREFRONTU JAKO MODUŁ WŁASNY (P0)
═══════════════════════════════════════════════════════════════════

USTALENIE KRYTYCZNE — przeczytaj zanim cokolwiek zrobisz:
Plik shoper-theme/custom-js/plyndo-storefront.js NIGDY nie trafił na produkcję
i NIE MOŻE trafić przez `theme push`, ponieważ:
  • shoper-theme/.shoperignore zawiera wpis `custom-js/`
  • shoper-theme/.shoper/filesStructure.json (manifest uprawnień synchronizacji)
    nie zawiera ŻADNEJ ścieżki JS — pushowalne są wyłącznie:
    settings/settings.json, settings/details.json, settings/thumbnail.jpg,
    styles/custom.less, styles/settings.json, filesList.json
Dowód empiryczny: funkcje patchDom() demonstracyjnie nie działają na produkcji
(logo Frusento obecne, link /pl/n/list obecny, stopka zduplikowana, © 2025 Shoper).

JEDYNY POPRAWNY KANAŁ: Moduły własne (wymaga Shoper Premium).

2.1 Rozszerz źródło skryptu w repo — shoper-theme/custom-js/plyndo-storefront.js:
    a) Dodaj TWARDĄ BLOKADĘ CHECKOUTU (decyzja D2):
       W handlerze basket.updated, gdy count ∉ {4, 8, 12}:
         - zablokuj przycisk przejścia do zamówienia (disabled + pointer-events:none),
         - pokaż komunikat: ile brakuje do najbliższego progu, np.
           "Dobierz jeszcze 2 szt., aby skompletować paczkę 8 i zamówić."
         - dla count > 12 zaproponuj rozbicie na paczki (np. 12 + 4).
       Gdy count wróci do 4/8/12 — odblokuj i zsynchronizuj kupon.
       Blokada musi działać także po przeładowaniu strony koszyka i na /pl/order.
    b) Zabezpiecz przed wyścigiem: obecny `syncing` flag chroni tylko przed
       równoległym wywołaniem — dodaj debounce ~150 ms na basket.updated.
    c) Ostrzeżenie o `promo.remove()`: obecny kod usuwa KAŻDY kupon, gdy count
       nie pasuje. Jeśli sklep kiedykolwiek będzie miał inne kupony (np. newsletter),
       to je skasuje. Ogranicz usuwanie wyłącznie do kodów zaczynających się od
       "PLYNDO-PACK-".
    d) Ukrywanie pola kodu rabatowego: obecny selektor
       [class*="promo-code"], [data-section="promo-code"] został napisany na ślepo.
       Zweryfikuj go na żywym DOM koszyka Shopera i popraw, jeśli nie trafia.
    e) Usuń z patchDom() te operacje, które lepiej wykonać raz w panelu
       (usunięcie logo Frusento, bloga, duplikatów stopki) — patrz Etap 3.
       JS ma być siatką bezpieczeństwa, nie podstawowym mechanizmem czyszczenia.
    f) Dopisz na górze pliku komentarz:
       /* ŹRÓDŁO PRAWDY dla modułu własnego "PlynDo Handoff" w panelu Shoper.
          Ten plik NIE jest wdrażany przez `theme push` — jest wykluczony przez
          .shoperignore i nieobecny w .shoper/filesStructure.json.
          Po każdej zmianie: skopiuj zawartość do panelu ręcznie.
          Wygląd i treści → Wygląd sklepu → Edycja szablonu graficznego
          → Moduły własne → PlynDo Handoff → pole JS. */

2.2 Utwórz moduł w panelu:
    Wygląd i treści → Wygląd sklepu → Edycja szablonu graficznego
    → Moduły własne → Dodaj moduł
      Nazwa:         PlynDo Handoff
      Rodzaj:        Moduł integracji
      Zasięg:        dowolna strona
      Możliwość wyłączenia przez użytkownika: NIE
      Pole Twig:     puste (moduł jest czysto logiczny)
      Pole JS:       cała zawartość plyndo-storefront.js (bez tagów <script>)
      Konfiguracja JSON / Tłumaczenia JSON: wypełnij, jeśli wynosisz komunikaty
                     PL/EN poza kod — to zalecane, ułatwia późniejsze zmiany copy
    ZAPISZ, a następnie w Shoper Visual Editor → Integracje upewnij się,
    że moduł jest WŁĄCZONY.

2.3 Weryfikacja wdrożenia skryptu:
    node scripts/verify_production_truth.mjs
    Musi przejść T4 (pd_items obecne w JS pod /userdata/public/storefront/js/).
    Jeśli T4 nadal FAIL — moduł nie jest aktywny albo nie jest przypisany
    do żadnej strony. Sprawdź artykuł "Storefront: dlaczego moduł się nie wyświetla".

2.4 Weryfikacja E2E handoffu:
    Otwórz w trybie incognito:
    https://sklep.plyndo.pl/pl/basket?pd_v=2&pd_items=182:1,186:1,189:1,190:1&pd_pack=4&pd_sid=test01
    Oczekiwane: overlay "Przygotowujemy Twoją paczkę", 4 pozycje w koszyku,
    kupon PLYNDO-PACK-4 naliczony, wartość 71,68 zł, URL wyczyszczony z parametrów.
    Powtórz dla pd_pack=8 (oczekiwane 139,44 zł) i pd_pack=12 (185,28 zł).
    Odśwież stronę po handoffie — koszyk NIE MOŻE się zdublować (guard pd_sid).
    Test negatywny: usuń 1 butelkę z koszyka 4 → kupon ma zniknąć, checkout ma się
    zablokować z komunikatem o brakującej sztuce.


═══════════════════════════════════════════════════════════════════
ETAP 3 — CZYSZCZENIE SKLEPU (P0, PANEL)
═══════════════════════════════════════════════════════════════════

Wszystkie poniższe elementy są ŻYWE na produkcji i dyskwalifikują sklep
z uruchomienia kampanii.

3.1 Treści demo obcego szablonu — USUŃ:
    Na / , /pl/c/Pakiety/40 i każdej karcie produktu renderuje się sekcja
    "PRAWDZIWE OPINIE" / "@PLYNDO_PL" z opiniami o napojach bezalkoholowych:
      LIAM JOHNSON — "It's not just a drink. It's a vibe..."
      JAKE PARKER  — "Frusento changed how I think about non-alcoholic drinks."
    To fałszywe opinie konsumenckie pod marką PŁYN DO — ryzyko prawne (Omnibus/UOKiK).
    Usuń moduł opinii w Shoper Visual Editor albo podmień na prawdziwe treści.
    Jeśli nie ma prawdziwych opinii — moduł ma zniknąć, nie zostać z placeholderem.

3.2 Logo Frusento w nagłówku — USUŃ.
    Obok logo PłynDo renderuje się drugi moduł logo z grafiką "Frusento logo"
    (userdata/public/storefront/images/ced5aa2a-...svg). Usuń moduł w Visual Editorze.

3.3 Blog — USUŃ.
    Link "View all posts" → https://sklep.plyndo.pl/pl/n/list jest nadal na stronie
    głównej. Wyłącz moduł bloga w układzie strony.

3.4 Stopka — NAPRAW DUPLIKACJĘ.
    Każda grupa linków ("O nas", "Obsługa klienta", "Pomoc", "Moje konto")
    renderuje się DWA RAZY. To duplikat modułu w układzie, nie błąd CSS.
    Usuń zdublowany moduł stopki w Visual Editorze.

3.5 Copyright — ZMIEŃ.
    "© Copyright 2025 Shoper" → "© 2026 PŁYN DO".
    Ustawienia stopki w panelu, nie patch JS.

3.6 Hero CTA — NAPRAW DOMENĘ.
    Przycisk "Zobacz pakiety" na stronie głównej sklepu prowadzi na DOMENĘ TECHNICZNĄ:
      https://sklep562393.shoparena.pl/pl/c/Dom/38
    To rozwala sesję koszyka (inne cookies), psuje SEO i wygląda nieprofesjonalnie.
    Przeskanuj CAŁY sklep pod kątem linków do sklep562393.shoparena.pl i podmień
    na sklep.plyndo.pl (lub na plyndo.pl tam, gdzie to treść informacyjna).

3.7 Kategoria "Pakiety" (id 40) — jest PUSTA, a wisi w menu głównym, w stopce
    i w hero. Klient klika i trafia w komunikat "brak produktów".
    Zgodnie z D3 i D5 REKOMENDACJA: usuń kategorię z menu sklepu i przekieruj
    /pl/c/Pakiety/40 → https://plyndo.pl/#pakiety.
    Jeśli inwentaryzacja z Etapu 0 wykaże inny stan — przedstaw alternatywę
    przed wykonaniem.

3.8 SKU 106/107/108 (Pakiet 4x / 8x / 12x) — zgodnie z D3 nie mogą duplikować
    tego, co landing przekazuje jako skład koszyka. Na podstawie inwentaryzacji
    z Etapu 0: dezaktywuj je albo usuń, tak by w sklepie istniało jedno źródło
    prawdy dla ceny paczki (skład 182–193 + kupon PLYNDO-PACK-*).
    Jeśli mają zostać jako fallback — muszą mieć ceny 1:1 zgodne z kalkulacją
    z bundlePricing.js i nie mogą być kupowalne razem z kuponem.

3.9 Kupony — usuń duplikaty.
    Jeśli Etap 0 wykazał istnienie PlynDo_x4/x8/x12 (protokół v1) obok
    PLYNDO-PACK-4/8/12 — dezaktywuj komplet v1. Ryzyko: podwójny rabat.
    Potwierdź warunki kuponów v2: 20% / 30% / 40%, minimalna liczba sztuk
    odpowiednio 4 / 8 / 12, zastosowanie do całego koszyka.

3.10 Moduł promocji / Omnibus — na karcie produktu renderuje się:
     "Cena 19,90 zł / -0% / Najniższa cena z 30 dni przed obniżką: 19,90 zł
      / +0% / Promocja trwa do %s"
     Niepodstawiony placeholder %s i zera procent. Wyłącz moduł promocji
     albo skonfiguruj go poprawnie.

3.11 Zablokuj zakup pojedynczej butelki (D2) także na poziomie UI:
     Ukryj/wyłącz przycisk "Dodaj do koszyka" i pole ilości na kartach produktu,
     zastępując je linkiem "Skomponuj paczkę na plyndo.pl". Twarda blokada
     checkoutu z Etapu 2.1a zostaje jako warstwa bezpieczeństwa.


═══════════════════════════════════════════════════════════════════
ETAP 4 — PARYTET WIZUALNY SKLEP ↔ LANDING (P1)
═══════════════════════════════════════════════════════════════════

CEL (D4): klient przechodzący z plyndo.pl do sklep.plyndo.pl nie ma odczuć,
że trafił do innego serwisu. Nie ścigamy pixel-perfect — ścigamy
"ta sama marka, ta sama typografia, ten sam rytm".

DIAGNOZA: sklep ma dziś DWIE niezależne warstwy stylu, które się nie znają.
  Warstwa A — tokeny SVE (shoper-theme/styles/settings.json):
    primaryColor #000000, secondaryColor #2f6844 (ZIELONY — nie ma go w landingu),
    baseFontFamilyName "Inter", headersFont "Playfair Display",
    globalFontColor #333333, btnBorderRadius 24
  Warstwa B — custom.less (75 linii), która nadpisuje A siłowo przez !important
    i deklaruje Switzer / Lora / --pd-cobalt #5c77b7.
Wszystko, czego custom.less nie zdążył nadpisać, renderuje się w Inter/Playfair/zieleni.
Stąd wrażenie "innego środowiska".

ZASADA NAPRAWY: najpierw tokeny (warstwa A), potem CSS (warstwa B).
Odwrotna kolejność to wieczna walka z !important.

4.1 Ustaw tokeny w shoper-theme/styles/settings.json wg mapy z landingu
    (źródło: src/index.css, sekcja :root):

    | Landing                          | Wartość                    | Klucz w settings.json      |
    |----------------------------------|----------------------------|----------------------------|
    | --n-900 / --color-fg             | #1a1918                    | globalFontColor, primaryColor |
    | --n-0 / --color-bg               | #ffffff                    | globalBodyBackgroundColor  |
    | --plyndo-cobalt / --color-accent | #5c77b7                    | secondaryColor  ← DZIŚ #2f6844 |
    | --n-700 / --color-fg-muted       | #555452                    | neutralColor               |
    | font tekstowy                    | Switzer (Fontshare)        | baseFontFamilyName ← DZIŚ Inter |
    | font nagłówków                   | Lora, italic               | headersFont ← DZIŚ Playfair Display |
    | --radius-pill                    | 9999                       | btnBorderRadius ← DZIŚ 24  |
    | rozmiar bazowy / interlinia      | 16 / 24                    | baseFontSize / baseLineHeight (OK) |

    Jeśli Shoper nie pozwala wpisać dowolnego fontu w headersFont/baseFontFamilyName,
    ustaw najbliższy dostępny, a właściwy krój wymuś w custom.less przez @import
    z Fontshare (Switzer) i Google Fonts (Lora) — tak jak robi to landing.

4.2 Przebuduj shoper-theme/styles/custom.less.
    Dziś ma 75 linii i pokrywa ułamek sklepu. Rozbuduj go, zachowując strukturę
    zmiennych --pd-*, o co najmniej:
      • pełną mapę neutralnej rampy z landingu (--n-0…--n-1000)
      • cienie: --shadow-sm/md/lg 1:1 z src/index.css
      • przyciski: pill 9999px, primary = #1a1918 na białym tekście,
        outline = border rgba(0,0,0,.15), hover = #2e2d2b
      • karty i kontenery: radius 24px, border rgba(0,0,0,.08), shadow-md
      • inputy i selecty: radius 10px, border rgba(0,0,0,.08), focus outline #5c77b7
      • nagłówki: Lora italic, letter-spacing -.015em, kolor #1a1918
      • tabele koszyka, podsumowanie, kroki checkoutu
      • stopka: tło #1a1918, tekst #faf9f6, linki #e7e6e3 / hover #fff
    Nie stosuj !important tam, gdzie token z 4.1 już załatwia sprawę.

4.3 Priorytet ścieżek (rób w tej kolejności — 1 jest najważniejsza):
    1) KOSZYK I CHECKOUT (/pl/basket, /pl/order) — klient spędza tu 100% czasu.
       Typografia, przyciski, karty, podsumowanie paczki, kroki dostawy/płatności.
    2) NAGŁÓWEK I STOPKA — widoczne wszędzie. Jedno logo PłynDo, menu odwzorowujące
       landing (Jak to działa / Pakiety / Produkty / Dla domu / Dla firm / O marce / FAQ),
       stopka z danymi EmiChem i © 2026 PŁYN DO.
    3) KARTA PRODUKTU — galeria, cena referencyjna, plus blok informacyjny
       "Ten płyn kupisz w paczce 4, 8 lub 12" z linkiem powrotnym na landing.
    4) STRONA GŁÓWNA SKLEPU — zgodnie z D5 zredukuj do minimum. Sklep nie ma być
       drugim landingiem. Rozważ moduł własny z jednym ekranem: logo, krótki tekst
       i przycisk "Wróć do plyndo.pl, żeby skomponować paczkę".

4.4 Elementy, których nie da się ostylować przez custom.less — zbuduj jako
    moduły własne (Premium, typ "Moduł układu strony"), z Twigiem i JS.
    Nie wstawiaj HTML-owych hacków w opisy produktów ani strony informacyjne.

4.5 Wdrożenie i weryfikacja:
    Push tokenów i stylów przez Shoper CLI (theme push). Pamiętaj, że pushowalne
    są tylko settings/*, styles/custom.less, styles/settings.json — nic więcej.
    Zrób zrzuty ekranu (desktop 1440px + mobile 390px) pary:
      plyndo.pl/pakiety/dom-pelny-8   vs   sklep.plyndo.pl/pl/basket
      plyndo.pl (nagłówek/stopka)     vs   sklep.plyndo.pl (nagłówek/stopka)
    Załącz je do raportu. Test T7 w verify_production_truth.mjs sprawdza obecność
    --pd-, Switzer i #5c77b7 w CSS produkcyjnym — musi przejść.


═══════════════════════════════════════════════════════════════════
ETAP 5 — SYNCHRONIZACJA DOKUMENTACJI (P1, KOD)
═══════════════════════════════════════════════════════════════════

Dokumentacja repo opisuje dziś produkt, który nie istnieje. Doprowadź ją
do stanu faktycznego. To nie jest kosmetyka — kolejny agent czytający
CLAUDE.md jako źródło prawdy dostanie fałszywy obraz i powtórzy błędy.

5.1 PRD.md — popraw:
    • macierz rabatów na 4 = −20%, 8 = −30%, 12 = −40% (usuń 30/40/45/50)
    • usuń koncepcję "Starter 10" i "Starter 12" — nie istnieją w kodzie
    • zaktualizuj: 12 produktów aktywnych (stockId 182–193)
    • dopisz sekcję o protokole handoffu v2 i o tym, że CTA jest AKTYWNE

5.2 CLAUDE.md — sekcja "Aktualny zakres produktu":
    • usuń "Starter 10" / "Starter 12"
    • zaktualizuj opis CTA: nie jest już nieaktywnym placeholderem
    • dopisz macierz rabatów 20/30/40
    • dopisz jedno zdanie o kanałach wdrożeniowych Shopera (moduł własny vs theme push)

5.3 docs/agents/product_constraints.md i docs/agents/api_conventions.md:
    • usuń twierdzenia "CTA musi pozostać nieaktywnym placeholderem" i
      "brak live Shoper checkout" — są sprzeczne z offerIntegrationConfig.cta.status='enabled'
    • przenieś integrację Shopera z "Future Scope" do zakresu aktywnego

5.4 docs/plyndo_shoper_handoff.md i docs/shoper_integration_guide.md:
    • oznacz je jako ARCHIWALNE (protokół v1, kupony PlynDo_x*) — nagłówkiem
      na górze pliku, nie usuwaj (mają wartość historyczną)
    • dodaj odsyłacz do ULTRA REVIEW i do tego promptu jako aktualnego źródła

5.5 Utwórz docs/shoper_deployment_channels.md — tabela z §5 ULTRA REVIEW:
    które zadanie robimy przez CLI (theme push), które przez REST API,
    a które WYŁĄCZNIE ręcznie w panelu. To dokument, którego brak
    spowodował, że wdrożenie utknęło na trzy tygodnie.

5.6 Zaktualizuj docs/agents/handoff.md — dopisz sesję 2026-08-17
    z podsumowaniem tego wdrożenia.


═══════════════════════════════════════════════════════════════════
ETAP 6 — WERYFIKACJA KOŃCOWA
═══════════════════════════════════════════════════════════════════

6.1 Automatyczna:
    node scripts/verify_production_truth.mjs
    WYMAGANE: 8/8 PASS. Jeśli którykolwiek FAIL — nie raportujesz sukcesu.
    Uwaga: T1–T3 sprawdzają kwoty rabatu 17,92 / 59,76 / 123,52 zł.
    Zweryfikuj, czy te wartości nadal odpowiadają koszykom testowym
    po ewentualnych zmianach cen; jeśli nie — popraw test, nie obchodź go.
    Uwaga: T8 sprawdza obecność "2026" w HTML — po naprawie copyrightu przejdzie.

    npm run lint
    npm run build

6.2 Ręczna, w trybie incognito, desktop + mobile:
    a) plyndo.pl → pakiet gotowy 4 → "Przejdź do sklepu" → koszyk 4 szt.,
       kupon −20%, 71,68 zł → przejście do zamówienia działa
    b) plyndo.pl → własna paczka 8 (z duplikatami!) → koszyk 8 szt., −30%, 139,44 zł
    c) plyndo.pl → własna paczka 12 → koszyk 12 szt., −40%, 185,28 zł
    d) w koszyku usuń 1 szt. → kupon znika, checkout ZABLOKOWANY, komunikat o brakach
    e) dodaj z powrotem → kupon wraca, checkout odblokowany
    f) odśwież stronę po handoffie → koszyk się NIE dubluje
    g) wejdź na kartę produktu w sklepie → nie da się kupić 1 szt.
    h) przeskanuj cały sklep: zero "Frusento", zero "LIAM JOHNSON",
       zero linków do sklep562393.shoparena.pl, zero /pl/n/list
    i) porównaj wizualnie koszyk sklepu z panelem paczki na landingu —
       ta sama typografia, te same przyciski, ten sam kolor akcentu

6.3 Test na urządzeniu mobilnym (realnym, nie emulatorze): pełna ścieżka
    od landingu do ekranu płatności.


═══════════════════════════════════════════════════════════════════
FORMAT RAPORTU KOŃCOWEGO
═══════════════════════════════════════════════════════════════════

Zwróć strukturę:

1. STAN KONTA SHOPER — wynik inwentaryzacji z Etapu 0 (Premium tak/nie,
   moduły własne dostępne tak/nie, limity API, stan kuponów, stan SKU 106-108)
2. ZMIANY W KODZIE — lista plików z jednozdaniowym uzasadnieniem każdej zmiany
3. ZMIANY W PANELU SHOPER — lista operacji wykonanych ręcznie, ze ścieżkami
   w panelu, żeby dało się je odtworzyć
4. WYNIK TESTÓW — pełna tabela verify_production_truth.mjs (przed i po),
   wynik lint i build, lista przypadków ręcznych z 6.2 ze statusem
5. ZRZUTY EKRANU — pary landing/sklep z 4.5
6. CO POZOSTAŁO OTWARTE — decyzje biznesowe blokujące start kampanii
   (analityka, Omnibus, dostawa/płatności, NIP, SDS/CLP, prawdziwe opinie)
7. RYZYKA — co może się zepsuć i jak to wykryć

Jeżeli którykolwiek etap zablokuje się na decyzji biznesowej — ZATRZYMAJ SIĘ,
zaraportuj i poczekaj. Nie zgaduj cen, rabatów ani treści prawnych.

===== KONIEC PROMPTU =====
```

---

## Dla weryfikatora (Claude) — checklista audytu po wykonaniu

| # | Sprawdzenie | Metoda |
|---|---|---|
| 1 | Brak komunikatu błędu na stronach pakietów | fetch `plyndo.pl/pakiety/*`, grep `Nieprawidłowa paczka` |
| 2 | Brak protokołu v1 w kodzie | `grep -rn "PlynDo_x\|?add=" src/` → 0 trafień |
| 3 | Skrypt aktywny w sklepie | T4 w `verify_production_truth.mjs` |
| 4 | Handoff działa E2E | T6 + ręczny przelot 4/8/12 |
| 5 | Blokada checkoutu poza 4/8/12 | ręcznie: koszyk 3 szt. → checkout niedostępny |
| 6 | Sklep czysty | fetch, grep `Frusento`, `LIAM JOHNSON`, `/pl/n/list`, `shoparena.pl` |
| 7 | Copyright | grep `© 2026 PŁYN DO`, brak `Copyright 2025 Shoper` |
| 8 | Parytet wizualny | T7 + porównanie zrzutów |
| 9 | Dokumentacja spójna | grep `Starter 10`, `Starter 12`, `30%`/`45%`/`50%` w PRD i CLAUDE.md |
| 10 | Brak duplikacji cen | inwentaryzacja SKU 106–108 + kupony |
