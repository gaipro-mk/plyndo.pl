# PROMPT FINALNY — oddanie Płyndo.pl do produkcji

**Wersja:** 2026-08-17 (v2, po audycie weryfikacyjnym) · **Model:** Gemini Flash 3.7 High
**Kontekst obowiązkowy:** `docs/ULTRA-REVIEW-v2-WERYFIKACJA-2026-08-17.md`
**Weryfikator:** Claude — audyt niezależny po wykonaniu, na `git log` i surowym HTML produkcji

> Skopiuj blok od `===== POCZĄTEK =====` do `===== KONIEC =====`.

---

```text
===== POCZĄTEK PROMPTU =====

## KONTEKST — PRZECZYTAJ ZANIM COKOLWIEK ZROBISZ

Repozytorium: /Users/mk/Dev_Env/Plyn_DO/plyndo.pl

Poprzednia iteracja wdrożenia wykonała dobrą pracę merytoryczną, ale NIE ZOSTAŁA
DOSTARCZONA. Audyt niezależny z 17.08.2026 wieczorem wykazał:

  • git log stoi na commicie 2f1a55d sprzed wdrożenia — 23 zmodyfikowane pliki
    i 17 nowych plików NIE ZOSTAŁO ZACOMMITOWANYCH ANI ZDEPLOYOWANYCH
  • produkcja https://plyndo.pl/pakiety/dom-codzienny-4 NADAL pokazuje klientom
    "[plyndo] Nieprawidłowa paczka: 0 szt. Dozwolone: 4, 8, 12."
  • testy T5, T6 i T8 zostały zmodyfikowane tak, że przestały mierzyć to,
    co deklarują — deklarowane "8/8 PASS" nie jest wiarygodne
  • 7 z 8 punktów czyszczenia sklepu nie zostało wykonanych
  • npm run lint zwraca 2 błędy

Pełna analiza: docs/ULTRA-REVIEW-v2-WERYFIKACJA-2026-08-17.md

ZASADA NADRZĘDNA TEJ ITERACJI:
Dowodem wykonania jest `git log` i surowy HTML produkcji pobrany BEZ wykonywania
JavaScriptu. Nie raport. Nie lokalny dist/. Nie "działa u mnie".
Każdy punkt tego promptu ma w sobie zdefiniowany dowód — masz go dostarczyć.

ZASADY PRACY (bez zmian):
1. Nie czytasz .env*, secrets/**, *.pem, *.key. Nie drukujesz sekretów.
2. Logi bash: maks. 200 linii na wywołanie.
3. Nie zmieniasz logotypów PŁYN DO ani systemu etykiet.
4. "JAX Professional" tylko na /o-marce.
5. Nie wymyślasz claimów ani treści prawnych.
6. Jeśli czegoś nie da się wykonać — mówisz to wprost. Nie obchodzisz testu,
   nie rozluźniasz asercji, nie podmieniasz celu testu na łatwiejszy.

DECYZJE BIZNESOWE — ZATWIERDZONE, WIĄŻĄCE:
D1. Rabaty: 4 = −20%, 8 = −30%, 12 = −40%. Kod jest poprawny, dokumentacja nie.
D2. Sprzedaż wyłącznie w paczkach 4/8/12. Zakup 1 szt. niemożliwy.
D3. Zero duplikacji — skład koszyka z landingu jest jedynym źródłem prawdy.
    To jest AKCEPTACJA rekomendacji z docs/shoper_inventory_2026-08-17.md §4:
    dezaktywacja SKU 106/107/108 oraz usunięcie kategorii 40 z menu + redirect.
D4. Parytet wizualny sklepu z landingiem.
D5. NOWE (17.08 wieczór): sklep Shoper ma zostać sprowadzony do CZYSTEGO SILNIKA
    TRANSAKCYJNEGO — nagłówek, stopka i wyłącznie komponenty zakupowe Shopera.
    Zero marketingu, zero sliderów, zero sekcji contentowych. Szczegóły: ETAP 4.


═══════════════════════════════════════════════════════════════════
ETAP 1 — DOSTARCZENIE TEGO, CO JUŻ NAPRAWIONE (NAJPILNIEJSZE)
═══════════════════════════════════════════════════════════════════

Praca w kodzie jest zrobiona dobrze i czeka na dysku. Zacommituj ją i wdróż.

1.1 Przejrzyj `git status` i `git diff` w całości. Zdecyduj świadomie
    o KAŻDYM z 12 nieśledzonych skryptów w scripts/:
      chrome-admin-orchestrator.mjs, create_custom_module_shoper.mjs,
      fill_module_form.mjs, fix_all_coupons.mjs, inject_custom_js_chrome.mjs,
      paste_module_js.mjs, save_myintegrations.mjs, shoper-full-admin-tasks.mjs,
      shoper-live-daemon.mjs, shoper-live-login.mjs, shoper-session-manager.mjs
    Dla każdego: albo zostaje (wtedy dopisz nagłówek z opisem, wymaganiami
    i sposobem uruchomienia + wpis w README lub docs/shoper_deployment_channels.md),
    albo znika. Nie zostawiasz ich w limbo.
    Potwierdź, że żaden nie ma zaszytych poświadczeń (audyt: nie ma — utrzymaj to).

1.2 Napraw lint PRZED commitem:
      shoper-theme/custom-js/plyndo-storefront.js:251
        error  '_' is defined but never used   no-unused-vars
        error  Empty block statement           no-empty
    Pusty catch to zapach — albo obsłuż błąd, albo zaloguj przez console.warn.
    Dowód: `npm run lint` kończy się kodem 0 i pustym wyjściem.

1.3 Zbuduj i sprawdź lokalnie:
      npm run lint && npm run build
    W `npm run dev` przejdź ręcznie (desktop + mobile):
      /pakiety/dom-codzienny-4, /pakiety/dom-pelny-8, /pakiety/dom-komplet-12
      /pakiety/wlasna-paczka/4, /8, /12
      /produkt/plyn-do-naczyn
    Warunek: ZERO czerwonych komunikatów technicznych w UI.
    Skopiuj wygenerowany URL handoffu z każdej z tych stron i wklej do raportu.

1.4 Zacommituj w logicznych porcjach (nie jednym worem):
      fix(landing): przywroc stockId w kontrakcie composition — naprawa handoffu
      refactor(landing): usun martwy protokol v1 z storeCta i ProductPage
      feat(shoper): checkout guard 4/8/12 w module storefront
      feat(shoper-theme): tokeny SVE i custom.less wg design systemu landingu
      test: popraw kontrakt promo-code i oczekiwana wartosc rabatu T2
      docs: inwentaryzacja Shopera, kanaly wdrozeniowe, sync PRD/CLAUDE
    W treści commitów NIE UMIESZCZAJ żadnych poświadczeń ani adresów panelu.

1.5 Wypchnij na produkcję zgodnie z docs/workspace_architecture_and_remotes.md
    (remote `mierzwixjr` → Cloudflare Pages), potem synchronizacja na
    `kasprowiczm` i `gaipro-mk`.

1.6 DOWÓD WYKONANIA — obowiązkowy w raporcie:
    a) `git log --oneline -8` po pushu
    b) `curl -s https://plyndo.pl/pakiety/dom-codzienny-4 | grep -c "Nieprawidłowa paczka"`
       → musi zwrócić 0
    c) `curl -s https://plyndo.pl/pakiety/wlasna-paczka/8 | grep -c "plyndo]"`
       → musi zwrócić 0

BEZ TEGO ETAPU ŻADEN KOLEJNY NIE MA SENSU. Wykonaj go pierwszy i zaraportuj,
zanim ruszysz dalej.


═══════════════════════════════════════════════════════════════════
ETAP 2 — PRZYWRÓCENIE INTEGRALNOŚCI TESTÓW
═══════════════════════════════════════════════════════════════════

scripts/verify_production_truth.mjs zostało zmodyfikowane w sposób, który
usunął asercje zamiast naprawić przyczynę. Przywróć wartość diagnostyczną.

ZACHOWAJ (te zmiany były słuszne):
  • payload { code: ... } zamiast { promoCode: ... } w T1/T2/T3
  • oczekiwanie 60,66 zł w T2 (koszyk 182–189 = 202,20 zł × 30% = 60,66 zł;
    poprzednie 59,76 zł odpowiadało innemu składowi — stary test był błędny)

COFNIJ I NAPRAW:

2.1 T5 — usuń fallback do lokalnego `dist/`.
    Test produkcyjny ma testować produkcję. Jeśli produkcja nie ma deployu,
    test ma być CZERWONY — to jest jego zadanie.
    Przywróć adres `https://plyndo.pl/pakiety/dom-codzienny-4/` (strona,
    na której bug występował), nie stronę główną.
    DODAJ nową asercję: pobrany HTML nie zawiera ciągu "Nieprawidłowa paczka"
    ani "[plyndo]". To jest test regresji buga P0.

2.2 T6 — przywróć testowanie HANDOFFU, nie REST API.
    Ma otwierać przeglądarką pełny URL handoffu:
      https://sklep.plyndo.pl/pl/basket?pd_v=2&pd_items=182:1,186:1,189:1,190:1&pd_pack=4&pd_sid=t{timestamp}
    i weryfikować STAN KOŃCOWY po zadziałaniu modułu 226:
      • count === 4                       (przywróć tę asercję)
      • hasPromoCode === true
      • kod kuponu === 'PLYNDO-PACK-4'
      • grossValue ≈ 71,68 zł
      • URL wyczyszczony z parametrów pd_*
    Ręczne wołanie /api/basket z page.evaluate() sprawdza API Shopera, a nie
    nasz moduł. Jeśli chcesz zachować test API — zrób z niego OSOBNY test T9,
    nie podmieniaj nim T6.

2.3 T8 — przywróć wszystkie asercje czystości i dodaj brakujące:
      • frusento === 0
      • /pl/n/list === 0
      • "Copyright 2025 Shoper" === 0 ORAZ "© 2026 PŁYN DO" obecne
      • "Liam Johnson" === 0 i "Jake Parker" === 0 (case-insensitive!)
      • "sklep562393.shoparena.pl" === 0
      • liczba wystąpień "Metody płatności" === 1 (wykrywa duplikat stopki)
      • "Promocja trwa do %s" === 0
    Testuj na CO NAJMNIEJ trzech adresach: /, /pl/c/Dom/38, /pl/p/Plyn-do-naczyn/94.

2.4 DODAJ T10 — blokada zakupu poza 4/8/12 (decyzja D2):
    Playwright: zbuduj koszyk 3 szt., wejdź na /pl/basket, sprawdź że
    element przejścia do zamówienia jest zablokowany i widoczny jest
    komunikat o brakującej sztuce. Potem dodaj 4. sztukę i sprawdź odblokowanie.

2.5 DODAJ T11 — brak duplikacji cen (decyzja D3):
    Przez WebAPI sprawdź, że produkty 106/107/108 mają status nieaktywny
    oraz że /pl/c/Pakiety/40 zwraca 301 na plyndo.pl/#pakiety.

2.6 Uruchom pełny pakiet. Raportuj SUROWY, NIEEDYTOWANY output.
    Jeśli coś jest czerwone — napraw przyczynę albo zgłoś jako blocker.
    Nie zmieniasz asercji, żeby przeszła.


═══════════════════════════════════════════════════════════════════
ETAP 3 — CZYSZCZENIE SKLEPU (7 z 8 punktów nadal otwartych)
═══════════════════════════════════════════════════════════════════

WAŻNE ROZRÓŻNIENIE, które poprzednia iteracja pominęła:
usunięcie elementu przez patchDom() w JavaScripcie NIE JEST usunięciem.
Boty Google i AI, czytniki ekranu i pierwsza klatka renderu widzą oryginalny HTML.
KAŻDY punkt poniżej ma być wykonany W PANELU, a JS zostaje wyłącznie jako
siatka bezpieczeństwa. Dowodem jest surowy HTML bez JS.

Stan zweryfikowany 17.08 wieczorem — do wykonania:

3.1 Logo Frusento — usuń drugi moduł logo z nagłówka.
    Dowód: brak `alt="Frusento logo"` w HTML.
3.2 Blog — wyłącz moduł. Dowód: brak `/pl/n/list`.
3.3 Duplikat stopki — usuń zdublowany moduł w Visual Editorze.
    Dowód: "Metody płatności" występuje w HTML dokładnie raz.
3.4 Copyright — "© Copyright 2025 Shoper" → "© 2026 PŁYN DO".
3.5 Domena techniczna — przeskanuj CAŁY sklep i podmień wszystkie linki
    `sklep562393.shoparena.pl` na `sklep.plyndo.pl` (lub `plyndo.pl` dla treści).
    Zaczynasz od hero-CTA "Zobacz pakiety". Dowód: 0 wystąpień w HTML.
3.6 Moduł promocji / Omnibus — wyłącz lub skonfiguruj.
    Dowód: brak "-0%", "+0%", "Promocja trwa do %s".
3.7 Kategoria "Pakiety" (ID 40) — usuń z menu i stopki, ustaw 301 na
    https://plyndo.pl/#pakiety. Podkategorie 41/42/43 też zdejmij z nawigacji.
3.8 SKU 106/107/108 — dezaktywuj (decyzja D3). Zachowaj w bazie na wypadek
    audytu zamówień historycznych, ale wyłącz z widoczności i sprzedaży.
3.9 Zakup 1 szt. — ukryj "Dodaj do koszyka" i pole ilości na kartach produktu,
    zastąp linkiem "Skomponuj paczkę na plyndo.pl".
    Twarda blokada checkoutu z modułu zostaje jako warstwa druga.
3.10 Ikony płatności w stopce linkują do www.shoper.pl — usuń linki
     (zostaw same grafiki) albo usuń moduł.


═══════════════════════════════════════════════════════════════════
ETAP 4 — LEAN CHECKOUT SKIN (NOWY ZAKRES, DECYZJA D5)
═══════════════════════════════════════════════════════════════════

CEL: sklep.plyndo.pl przestaje być drugim landingiem. Zostaje z niego
NAGŁÓWEK + STOPKA (identyczne jak na plyndo.pl) + WYŁĄCZNIE komponenty
transakcyjne Shopera. Cała treść marketingowa, produktowa i informacyjna
o marce żyje na landingu.

REGUŁA NACZELNA: nie wolno stracić ANI JEDNEJ funkcji zakupowej Shopera.
Usuwamy warstwę prezentacyjną, nie transakcyjną. Przy każdym module zadaj
pytanie: "czy klient może bez tego kupić, zapłacić, dostać towar, założyć
konto, zareklamować?" Jeśli tak — moduł znika. Jeśli nie — zostaje.

4.1 INWENTARYZACJA MODUŁÓW — najpierw spisz, potem usuwaj.
    Wygląd i treści → Wygląd sklepu → Edycja szablonu graficznego (ID 12)
    → Visual Editor → przejdź KAŻDY układ strony i wypisz wszystkie moduły
    z podziałem: ZOSTAJE / USUWAM / PRZERABIAM.
    Zapisz tabelę do docs/shoper_skin_inventory.md PRZED zmianami.

4.2 DO USUNIĘCIA — potwierdzone w HTML produkcji:
    • hero z nagłówkiem "Płyny do domu i firmy w pakietach 4, 8 lub 12 sztuk"
      + przycisk "Zobacz pakiety" + grafika hero
    • drugi, zdublowany hero/banner (ta sama treść z italic "w pakietach")
    • pasek trzech ikon zaufania: BEZPIECZNE DLA DOMU / SKŁADNIKI, KTÓRE
      DZIAŁAJĄ / CHEMIA GOSPODARCZA DOPASOWANA DO KAŻDEGO DOMU I FIRMY
    • sekcja "ZROBIONE Z DOŚWIADCZENIA" wraz ze statystykami 100% i 12
    • jeżdżący pasek (marquee/ticker) "SKUTECZNA CHEMIA OD POLSKIEGO
      PRODUCENTA" / "PAKIETY 4, 8 I 12 BUTELEK" — renderuje się na KAŻDEJ
      podstronie, łącznie z Regulaminem. To jest ten "latający slider".
    • karuzela/slider produktów na stronie głównej
    • moduł bloga (już w 3.2)
    • sekcja opinii / rekomendacji produktowych, jeśli jakakolwiek została
    • wszelkie moduły newslettera, pop-upy i bannery promocyjne
      — CHYBA ŻE newsletter jest świadomie utrzymywany; wtedy zostaw
        wyłącznie w stopce, bez pop-upu
    Przejdź analogicznie układy: strona główna, kategoria, karta produktu,
    strona informacyjna, wyniki wyszukiwania, 404.

4.3 MUSI ZOSTAĆ — komponenty transakcyjne i wymagane prawem:
    • koszyk /pl/basket wraz z całą logiką pozycji, ilości, podsumowania
    • pełna ścieżka zamówienia: dane, adres, dostawa, płatność, podsumowanie,
      potwierdzenie, strony powrotu z bramki płatniczej
    • logowanie, rejestracja, reset hasła, Shoper SSO
    • panel klienta: /panel/ (zamówienia), /panel/edit, /panel/favourites
    • karta produktu /pl/p/... — koszyk linkuje do niej z pozycji; ZOSTAJE,
      ale odchudzona (galeria + nazwa + cena + opis + link do landingu)
    • formularz kontaktowy /pl/contact
    • strony informacyjne — ZOSTAJĄ W SKLEPIE, TO NIE PODLEGA DYSKUSJI:
        /pl/i/Regulamin/3            /pl/i/Polityka-prywatnosci/11
        /pl/i/Zwroty-i-reklamacje/7  /pl/i/Metody-platnosci/10
        /pl/i/Czas-i-koszty-dostawy/4 /pl/i/Czas-realizacji-zamowienia/5
        /pl/i/Jak-kupowac/2          /pl/i/Pytania-i-odpowiedzi/1
      Sprzedawcą jest sklep (Michał Mierzwa EmiChem P.P., NIP 7780022439,
      Główna 30A, 61-007 Poznań) i to sklep musi udostępniać regulamin
      oraz politykę prywatności w punkcie sprzedaży. Checkout Shopera
      linkuje do nich przy akceptacji warunków. Przeniesienie ich wyłącznie
      na landing byłoby błędem prawnym.
    • ustawienia cookies
    • wyszukiwarka — zostaw, jeśli nie koliduje z odchudzonym layoutem

4.4 NAGŁÓWEK — odwzoruj landing:
    • JEDNO logo PŁYN DO po lewej, linkujące na https://plyndo.pl
    • nawigacja identyczna z landingiem, wszystkie pozycje prowadzą NA LANDING:
        Jak to działa  → https://plyndo.pl/#jak-to-dziala
        Pakiety        → https://plyndo.pl/#pakiety
        Produkty       → https://plyndo.pl/#produkty
        Dla domu       → https://plyndo.pl/dla-domu
        Dla firm       → https://plyndo.pl/dla-firm
        O marce        → https://plyndo.pl/o-marce
        FAQ            → https://plyndo.pl/#faq
    • po prawej wyłącznie funkcje Shopera: Zaloguj się / Konto, Koszyk z licznikiem
    • usuń pozycje sklepowe "Pakiety" (kat. 40), "Dom" (kat. 38), "O firmie"
    • typografia i odstępy jak w TopNav landingu

4.5 STOPKA — odwzoruj landing, z jedną świadomą różnicą:
    Struktura z src/components/layout/Footer.jsx:
      • logo PŁYN DO
      • "PŁYN DO – polska marka chemii gospodarczej. Płyny do domu i firmy
         w pakietach 4, 8 i 12 butelek."
      • "Producent: EmiChem Michał Mierzwa, Polska – chemia gospodarcza
         domowa i instytucjonalna."
      • e-mail kontaktowy, "Made in Poland"
      • kolumna PŁYN DO → linki na landing (jak w 4.4)
      • kolumna Informacje → UWAGA: w sklepie te linki prowadzą do
        WEWNĘTRZNYCH stron sklepu (/pl/i/Regulamin/3 itd.), nie na landing.
        Powód jak w 4.3 — punkt sprzedaży musi mieć swoje dokumenty.
      • "© 2026 PŁYN DO"
    Tło #1a1918, tekst #faf9f6, linki #e7e6e3 / hover #ffffff.
    Jedna instancja stopki. Bez duplikatów. Bez "Nagrody i wyróżnienia"
    linkującego donikąd.

4.6 UWAGA MERYTORYCZNA DO PRZEKAZANIA WŁAŚCICIELOWI:
    Stopka landingu podaje producenta bez NIP-u i adresu, a stopka sklepu
    ma pełne dane (NIP 7780022439, Główna 30A, 61-007 Poznań).
    Zgłoś to jako rekomendację — landing prowadzący sprzedaż powinien mieć
    komplet danych podmiotu. Nie zmieniaj tego samodzielnie, to decyzja
    biznesowo-prawna.

4.7 STRONA GŁÓWNA SKLEPU po odchudzeniu:
    Zostaje: nagłówek + minimalny blok (logo, jedno zdanie, przycisk
    "Wróć na plyndo.pl, aby skomponować paczkę") + stopka.
    Rozważ redirect 301 z / na https://plyndo.pl — sklep i tak jest
    punktem docelowym handoffu, a nie punktem wejścia. Przedstaw rekomendację
    z uzasadnieniem SEO przed wykonaniem; nie rób redirectu bez akceptacji,
    bo może kolidować z weryfikacją domeny przez bramki płatnicze.

4.8 DOWODY DLA TEGO ETAPU:
    • docs/shoper_skin_inventory.md — tabela modułów przed/po
    • zrzuty 1440px i 390px dla par:
        plyndo.pl (nagłówek+stopka)  vs  sklep.plyndo.pl/pl/basket
        plyndo.pl/pakiety/dom-pelny-8 vs sklep.plyndo.pl/pl/basket
        plyndo.pl (stopka)            vs  sklep.plyndo.pl/pl/i/Regulamin/3
    • surowy HTML /, /pl/basket i /pl/i/Regulamin/3 bez wystąpień:
      "ZROBIONE Z DOŚWIADCZENIA", "SKUTECZNA CHEMIA OD POLSKIEGO PRODUCENTA",
      "BEZPIECZNE DLA DOMU", "Frusento"
    • potwierdzenie przejścia PEŁNEJ ścieżki zakupowej po odchudzeniu:
      handoff → koszyk → dane → dostawa → płatność → potwierdzenie


═══════════════════════════════════════════════════════════════════
ETAP 5 — DOKOŃCZENIE PARYTETU WIZUALNEGO
═══════════════════════════════════════════════════════════════════

Tokeny SVE zostały poprawione dobrze (primaryColor #1a1918, secondaryColor
#5c77b7, headersFont Lora, btnBorderRadius 9999, neutralColor #555452).
Zostały trzy rzeczy.

5.1 baseFontFamilyName nadal ma wartość "Inter".
    Switzer jest wymuszany wyłącznie przez !important w custom.less — czyli
    wracamy do problemu dwóch warstw, które się nie znają.
    Ustaw Switzer w tokenie, jeśli Shoper na to pozwala. Jeśli nie pozwala
    na dowolny krój — udokumentuj to ograniczenie w custom.less komentarzem,
    żeby następna osoba nie szukała po omacku.

5.2 custom.less (obecnie 190 linii, 26 selektorów koszyka/checkoutu) —
    uzupełnij pokrycie PEŁNEJ ścieżki:
      /pl/basket → dane → dostawa i płatność → podsumowanie → potwierdzenie
      + logowanie, rejestracja, panel klienta, strony informacyjne, 404
    Elementy do pokrycia: kroki checkoutu (stepper), radio boxy dostawy
    i płatności, pola formularzy i stany błędów, podsumowanie zamówienia,
    tabela pozycji koszyka, komunikaty flash, modale.
    Wzorzec: src/index.css (tokeny) + src/components/bundles/BundlePricePanel.jsx
    (wygląd panelu podsumowania).

5.3 Sprawdź kontrast i dostępność po zmianach: focus-visible na wszystkich
    polach checkoutu, kontrast tekstu min. WCAG AA, obsługa klawiaturą.


═══════════════════════════════════════════════════════════════════
ETAP 6 — DOKUMENTACJA I HIGIENA REPOZYTORIUM
═══════════════════════════════════════════════════════════════════

6.1 PRD.md — główna macierz rabatów jest już poprawna, ale zostało
    10 odwołań do nieistniejących "Starter 10" / "Starter 12":
    linie 265, 288, 302, 306, 353, 529, 542, 821, 874, 892 (w tym cały
    rozdział "Etap F: Starter 12"). Usuń je lub przepisz na model 4/8/12.
    Dowód: `grep -c "Starter 1" PRD.md` → 0

6.2 docs/HANDOFF_AUDIT_2026-08-17.md — skoryguj o ustalenia audytu.
    Dokument twierdzi 8/8 PASS i pełną spójność end-to-end, co nie
    odpowiadało stanowi faktycznemu. Zaktualizuj po zamknięciu bramek.

6.3 docs/agents/handoff.md — dopisz sesję 17.08.2026 z uczciwym opisem:
    co zrobiono, co się nie udało dostarczyć i dlaczego. To dokument
    dla kolejnych agentów — ma uczyć, nie chwalić.

6.4 BEZPIECZEŃSTWO — 72 zrzuty zalogowanego panelu administracyjnego
    (9,5 MB) są ŚLEDZONE przez git i wypchnięte na trzy konta GitHub,
    mimo wpisu docs/screenshots/ w .gitignore (wpis nie odśledza plików
    dodanych wcześniej). Wśród nich after-otp-submit.png,
    admin-logged-in-full.png, cli-token-generated.png, skins-list-after-2fa.png.
    Audyt sprawdził cli-token-generated.png — tokena na nim NIE MA, widać
    ekran edycji administratora. Nie jest to wyciek poświadczeń, ale:
      a) przejrzyj POZOSTAŁE 71 plików pod kątem widocznych tokenów,
         kluczy API, adresów e-mail klientów i danych zamówień
      b) wykonaj `git rm -r --cached docs/screenshots/` i zacommituj,
         żeby przestały być śledzone
      c) jeśli w którymkolwiek pliku jest cokolwiek wrażliwego — zgłoś to
         jako blocker i zaproponuj przepisanie historii (git filter-repo)
         na wszystkich trzech remote'ach. NIE ROBISZ tego bez akceptacji.
    Dobra wiadomość do utrzymania: .env.local nigdy nie trafił do historii
    gita, a skrypty nie mają zaszytych poświadczeń.

6.5 .shoperignore — dopisz komentarz wyjaśniający, dlaczego custom-js/
    jest wykluczony i że plik jest źródłem prawdy dla modułu własnego 226
    wklejanego ręcznie w panelu. Bez tego za trzy miesiące ktoś znów uzna,
    że "skrypt jest wdrożony, bo leży w repo".


═══════════════════════════════════════════════════════════════════
ETAP 7 — BRAMKI ODBIORU
═══════════════════════════════════════════════════════════════════

Produkcja rusza dopiero, gdy WSZYSTKIE bramki są zielone.
Przy każdej podaj dowód, nie deklarację.

G1  Zero komunikatów technicznych w UI klienta
    → curl produkcji, grep "[plyndo]" i "Nieprawidłowa paczka" = 0
G2  Kod zacommitowany i zdeployowany
    → git log --oneline -8 + potwierdzenie deployu Cloudflare
G3  Testy mierzą to, co deklarują
    → surowy output verify_production_truth.mjs, T1–T11, wszystkie PASS
G4  Sklep bez treści i modułów obcego szablonu
    → grep HTML: frusento, /pl/n/list, Liam Johnson, shoparena.pl,
      Copyright 2025, %s — wszystkie 0
G5  Brak duplikacji cen
    → SKU 106/107/108 nieaktywne, /pl/c/Pakiety/40 → 301
G6  Zakup poza 4/8/12 niemożliwy
    → T10 PASS + ręczny test koszyka 3 szt. i 5 szt.
G7  lint + build zielone
    → kod wyjścia 0, puste wyjście lintera
G8  Lean checkout skin
    → docs/shoper_skin_inventory.md + zrzuty + pełna ścieżka zakupowa działa
G9  Parytet wizualny
    → zrzuty par 1440px i 390px
G10 Dokumentacja bez fikcji
    → grep "Starter 1" w PRD.md = 0
G11 Repo bez artefaktów admina
    → git ls-files docs/screenshots/ = 0
G12 Pełna transakcja testowa
    → jedno realne zamówienie testowe przeprowadzone od landingu do
      potwierdzenia płatności, na urządzeniu mobilnym; numer zamówienia
      w raporcie


═══════════════════════════════════════════════════════════════════
FORMAT RAPORTU — WYMAGANY
═══════════════════════════════════════════════════════════════════

Dla KAŻDEJ bramki G1–G12: status + DOWÓD (surowy output komendy, zrzut,
numer commita). Bramka bez dowodu liczy się jako niewykonana.

Dodatkowo:
1. Lista commitów z opisem
2. Lista operacji w panelu Shoper ze ścieżkami (do odtworzenia)
3. Surowy, nieedytowany output verify_production_truth.mjs
4. Tabela modułów przed/po z Etapu 4
5. Zrzuty porównawcze
6. Co się NIE udało i dlaczego — wprost, bez łagodzenia
7. Co pozostaje otwarte biznesowo: analityka GA4/Meta Pixel + cross-domain,
   Omnibus, dostawa i płatności, NIP na landingu, SDS/CLP, prawdziwe opinie,
   kody QR na etykietach

Jeżeli któregokolwiek punktu nie da się wykonać — ZATRZYMAJ SIĘ i zgłoś.
Lepszy uczciwy blocker niż zielony raport nad zepsutą produkcją.

===== KONIEC PROMPTU =====
```

---

## Notatka dla weryfikatora

Po wykonaniu sprawdzam w tej kolejności, bez czytania raportu:

```bash
git log --oneline -8
curl -s https://plyndo.pl/pakiety/dom-codzienny-4 | grep -c "Nieprawidłowa paczka"   # 0
curl -s https://sklep.plyndo.pl/ | grep -ciE "frusento|/pl/n/list|Copyright 2025"    # 0
curl -s https://sklep.plyndo.pl/ | grep -c "ZROBIONE Z DOŚWIADCZENIA"                # 0
curl -s https://sklep.plyndo.pl/ | grep -c "SKUTECZNA CHEMIA"                        # 0
curl -s https://sklep.plyndo.pl/ | grep -c "Metody płatności"                        # 1
grep -c "Starter 1" PRD.md                                                            # 0
git ls-files docs/screenshots/ | wc -l                                                # 0
npm run lint
git diff HEAD~1 scripts/verify_production_truth.mjs   # czy asercje nie zostały znów rozluźnione
```

Dopiero potem czytam raport — i porównuję z tym, co zobaczyłem.
