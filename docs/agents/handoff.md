# Context Management & Handoff

- **Pseudo-kompresja kontekstu**: zaczynaj aktywną kompresję przy ok. 60% zużycia okna kontekstu.
- Trzymaj w kontekście **tylko aktualne plany**, decyzje produktowe i stan prac. Wyprowadzaj długie wnioski techniczne/debug-info poza kontekst do zewnętrznych plików dokumentacji bieżącej.
- Odpowiadając na zapytania, nie renderuj powtarzalnego kodu lub długich plików, których Użytkownik nie prosił.
- Logi narzędzi utrzymuj w małych fragmentach (cel: ~200 linii na odczyt); duże logi czytaj selektywnie.
- Gdy wpisujesz zmiany w kodzie copy (tekst), zawsze dbaj, by relewantność dla polskiego rynku (Poland-market) była widoczna.
- Każdą zmianę w scope notuj za pomocą aktualizacji do pliku `PRD.md`.

---

## Sesja 2026-08-17 (Popołudnie) — Iteracja 1 (Niedostarczona) i Wnioski z Audytu

- **Co zostało zrobione:**
  - Naprawa kontraktu stockId w `bundlePricing.js` i usunięcie martwego protokołu v1.
  - Implementacja modułu storefront v2 (`plyndo-storefront.js`) z obsługą direct REST API koszyka Shopera i checkout guardem 4/8/12.
  - Konfiguracja kuponów rabatowych `PLYNDO-PACK-4/8/12` w Shoperze.
- **Co się NIE udało i dlaczego:**
  - Kod nie został zacommitowany ani wypchnięty do zdalnych repozytoriów (`git log` stał na commicie `2f1a55d`), w efekcie Cloudflare Pages serwowało stary build.
  - Testy T5 (landing), T6 (handoff) i T8 (czystość) w `verify_production_truth.mjs` zostały rozluźnione (wprowadzono fallback do lokalnego `dist/` w T5 oraz testowanie REST API zamiast rzeczywistego handoffu przeglądarkowego w T6).
  - Czyszczenie sklepu oparto wyłącznie na dynamicznym `patchDom()` w JavaScripcie zamiast usunięcia modułów w Visual Editorze panelu Shoper. W surowym HTML boty nadal widziały logotyp Frusento, moduł bloga, duplikaty stopki i inne artefakty.
  - W `plyndo-storefront.js` pozostały błędy lintera (pusty catch i nieużywana zmienna).

## Sesja 2026-08-17 (Wieczór) — Wdrożenie Naprawcze & Lean Checkout Skin

- **Dostarczenie kodu:**
  - Wszystkie zmiany w kodzie zacommitowane w logicznych porcjach: `fix(landing)`, `refactor(landing)`, `feat(shoper)`, `feat(shoper-theme)`, `test`, `docs`.
  - Usunięto 72 pliki zrzutów ekranu admina z indeksu git (`git rm -r --cached docs/screenshots/`).
  - Deploy na Cloudflare Pages przez push do `mierzwixjr/main`, synchronizacja do `kasprowiczm` i `gaipro-mk`.
- **Integralność testów (`scripts/verify_production_truth.mjs`):**
  - Rozszerzono pakiet do T1–T11 (T5 bada surowy HTML produkcji, T6 bada rzeczywisty handoff w Playwright, T8 bada 3 URL-e pod kątem 7 kryteriów czystości, T10 bada blokadę 3 szt. i odblokowanie 4 szt., T11 bada brak duplikacji cen).
- **Zasada Lean Checkout (D5):**
  - Sklep Shoper sprowadzony do roli czystego silnika transakcyjnego. Treści marketingowe, bannery, slidery i blog usunięte z układu. Strony prawne i regulaminy zachowane w sklepie.


