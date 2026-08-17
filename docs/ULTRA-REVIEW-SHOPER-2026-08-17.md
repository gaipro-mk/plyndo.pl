# ULTRA REVIEW — dokończenie wdrożenia Landing → Shoper

**Data:** 17 sierpnia 2026 r.
**Autor:** Claude (orkiestrator / advisor — bez zmian w kodzie)
**Wykonawca wdrożenia:** Gemini (prompt: `docs/prompts/GEMINI-WDROZENIE-SHOPER-2026-08-17.md`)
**Zakres:** weryfikacja konta Shoper Premium, audyt stanu integracji, plan pełnego domknięcia do produkcji, parytet wizualny sklepu z landingiem.

---

## 0. Executive summary

| Obszar | Stan | Werdykt |
|---|---|---|
| Konto Shoper Premium | Potwierdzone (pośrednio, badge storefrontu) | ✅ |
| Protokół handoffu v2 na landingu (`pd_v=2`) | Kod jest, **ale zwraca błąd na produkcji** | 🔴 P0 |
| Skrypt storefrontu w Shoperze (`plyndo-storefront.js`) | **Nie wdrożony i niewdrażalny obecnym kanałem** | 🔴 P0 |
| Kupony `PLYNDO-PACK-4/8/12` | Niezweryfikowane (brak dostępu POST) | 🟡 |
| Sklep: treści demo szablonu (Frusento) | **Żywe na produkcji** | 🔴 P0 |
| Sprzedaż pojedynczej butelki w Shoperze | Możliwa — łamie model pakietowy | 🔴 P1 |
| Parytet wizualny sklep ↔ landing | Rozjechany na poziomie tokenów | 🟠 P1 |
| Dokumentacja (PRD vs kod) | Sprzeczna macierz rabatów | 🟠 P1 |

**Jedno zdanie:** architektura jest dobra i przemyślana, ale **żaden z dwóch końców handoffu nie działa na produkcji** — landing renderuje komunikat błędu zamiast przycisku, a sklep nie ma skryptu, który miałby ten handoff odebrać.

---

## 1. Weryfikacja konta Shoper Premium — co sprawdziłem sam

### 1.1 Metoda i jej ograniczenia

Chciałem uderzyć bezpośrednio w `webapi/rest` z `.env.local`, ale **sandbox nie ma trasy sieciowej do `sklep562393.shoparena.pl`** (DNS fail, proxy allowlist). Nie było też podłączonej przeglądarki, więc E2E przez Chrome odpadło. Weryfikację oparłem więc na tym, co dało się pobrać publicznie (GET) plus na dokumentacji Shopera.

**Świadomie nie mogę potwierdzić:** działania kuponów, limitów WebAPI konkretnie na tym koncie, ani odpowiedzi `/api/basket` (wymaga POST/PUT + sesji). To zostaje do wykonania przez Gemini z Twojej maszyny — jest w prompcie jako blok T0.

### 1.2 Co potwierdziłem

**Premium — TAK.** Stopka `sklep.plyndo.pl` na wszystkich sprawdzonych stronach (`/`, `/pl/c/Pakiety/40`, `/pl/p/Plyn-do-naczyn/94`) renderuje badge:

> `Sklep internetowy **Shoper Premium**` → link `https://www.shoper.pl/premium/`

Shoper wystawia ten wariant badge'a tylko dla abonamentu Premium. Weryfikacja Gemini była trafna.

### 1.3 Co Premium realnie odblokowuje — i czego nam brakowało

To jest sedno sprawy, bo tłumaczy, dlaczego wdrożenie stanęło:

| Funkcja | Wymaga | Potrzebna nam do |
|---|---|---|
| **Moduły własne w Storefront** (Twig + JS + JSON config + tłumaczenia) | **Shoper Premium** | **Wdrożenia `plyndo-storefront.js`** — to jedyny legalny kanał na własny JS w szablonie Storefront |
| Zaawansowana edycja szablonu / macra | Premium | Sekcje w stylu landingu |
| Autoskalowanie + Premium Cache | Premium | Kampanie reklamowe |
| REST WebAPI (`/webapi/rest`) | Dostępne szerzej, Premium podnosi limity | `sync-shoper-catalog.mjs` |
| Storefront JS API (`useStorefront`) | Dostępne w szablonie Storefront | Logika koszyka |

Cytat z dokumentacji Shopera: *„Tworzenie modułów własnych możliwe jest jedynie w sklepach działających w abonamencie Shoper Premium."*

**Wniosek:** Premium było brakującym klockiem. Teraz jest — droga wdrożeniowa jest otwarta.

---

## 2. Znaleziska krytyczne (P0)

### 2.1 🔴 Landing pokazuje klientom komunikat błędu zamiast przycisku zakupu

**To jest na żywo, teraz, na produkcji.** Zrzut treści z `https://plyndo.pl/pakiety/dom-codzienny-4`:

```
Przejdź do sklepu
[plyndo] Nieprawidłowa paczka: 0 szt. Dozwolone: 4, 8, 12.
```

Czerwony tekst błędu deweloperskiego pod nieaktywnym CTA. Na **każdej** stronie gotowego pakietu i w konfiguratorze własnej paczki.

**Root cause — precyzyjnie:**

`src/lib/bundlePricing.js`, `calculateBundlePricing()` zwraca:

```js
composition: lineItems.map(({ productSlug, quantity }) => ({ productSlug, quantity }))
```

czyli **odcina obiekt `product`** (i tym samym `stockId`). Tymczasem `src/components/bundles/BundlePricePanel.jsx` buduje pozycje koszyka właśnie z `pricing.composition`:

```js
const items = (pricing?.composition || []).map((c) => ({
  stockId: c.product?.stockId ?? c.stockId,   // ← oba undefined
  quantity: c.quantity || 1,
}));
```

Efekt: `items = [{stockId: undefined, quantity: 1} × 4]` → `buildShoperHandoffUrl` filtruje wszystko po walidacji zakresu 182–193 → `total = 0` → `throw` → `handoffError` renderuje się jako czerwony tekst.

**Fix (1 linia):** `BundlePricePanel` ma czytać `pricing.lineItems` (tam `product` jest zachowany), albo `calculateBundlePricing` ma dokładać `stockId` do `composition`. Rekomendacja: to drugie — kontrakt danych powinien być samowystarczalny, a nie zależny od tego, którego pola konsument użyje.

**Dodatkowo:** komunikat błędu technicznego nigdy nie powinien trafiać do UI klienta. `StoreButton` ma logować do konsoli, a użytkownikowi pokazywać neutralny fallback.

### 2.2 🔴 Skrypt storefrontu nigdy nie trafił do Shopera — i nie mógł

`shoper-theme/custom-js/plyndo-storefront.js` (245 linii: handoff v2, auto-sync kuponu, DOM patch) jest w repo, ale **na produkcji go nie ma**. Dowody:

1. `shoper-theme/.shoperignore` zawiera wprost `custom-js/` → plik jest wykluczony z każdego `theme push`.
2. `shoper-theme/.shoper/filesStructure.json` — manifest uprawnień synchronizacji — **nie zawiera żadnej ścieżki JS**. Pushowalne są wyłącznie:
   - `settings/settings.json`, `settings/details.json`, `settings/thumbnail.jpg`
   - `styles/custom.less`, `styles/settings.json`
   - `filesList.json`
   `modules/`, `macros/`, `styles/src/` mają `canAdd:false, canEdit:false`.
3. Skutki widoczne w HTML produkcji — funkcje `patchDom()` demonstracyjnie nie działają:
   - logo **Frusento** nadal w nagłówku (miało zostać usunięte),
   - link **„View all posts"** → `/pl/n/list` nadal obecny (blog miał zniknąć),
   - stopka **zduplikowana** — każda grupa linków renderuje się dwa razy (dedup miał to złapać),
   - **`© Copyright 2025 Shoper`** zamiast `© 2026 PŁYN DO`.

**Wniosek:** `theme push` to ślepa uliczka dla JS. Właściwy kanał to **Wygląd i treści → Wygląd sklepu → Edycja szablonu graficznego → Moduły własne → Dodaj moduł**, typ **„Moduł integracji"**, zasięg **„dowolna strona"**, kod wklejony w pole **JS**. To wymaga Premium — i dlatego dopiero teraz da się to domknąć.

`scripts/verify_production_truth.mjs` (test T4) szuka `pd_items` w plikach pod `/userdata/public/storefront/js/` — czyli test od początku zakładał kanał modułów własnych. Intencja była dobra, brakowało uprawnień.

### 2.3 🔴 Treści demo obcego szablonu na produkcji

Sklep sprzedaje chemię gospodarczą, a na stronie głównej, w kategorii i na każdej karcie produktu wisi sekcja „PRAWDZIWE OPINIE" z opiniami o napojach bezalkoholowych:

> LIAM JOHNSON — *„It's not just a drink. It's a vibe. I sip it when I want to slow down."*
> JAKE PARKER — *„Frusento changed how I think about non-alcoholic drinks."*

Plus logo **Frusento** obok logo PłynDo w nagłówku i `@PLYNDO_PL` jako podpis pod cudzymi opiniami. To dyskwalifikuje sklep z uruchomienia kampanii — i jest jednocześnie ryzykiem prawnym (fałszywe opinie konsumenckie, dyrektywa Omnibus / UOKiK).

### 2.4 🔴 Kategoria „Pakiety" jest pusta, a wisi w menu głównym

`https://sklep.plyndo.pl/pl/c/Pakiety/40` → *„W tej kategorii nie ma obecnie żadnych produktów"*. Link jest w nagłówku sklepu, w stopce i w hero („Zobacz pakiety"). Klient klika i trafia w nic.

Dodatkowo hero-CTA prowadzi na **domenę techniczną** `https://sklep562393.shoparena.pl/pl/c/Dom/38` zamiast `sklep.plyndo.pl` — to rozwala sesję koszyka (inne cookies), psuje SEO i wygląda niepoważnie.

---

## 3. Znaleziska ważne (P1)

### 3.1 Dwa sprzeczne protokoły handoffu w jednym pliku

W `src/lib/storeCta.js` żyje **martwa implementacja v1**: `getBundleStoreHref()` buduje `https://sklep.plyndo.pl/?add=182:1,...&promo=PlynDo_x4`. Nikt jej nie woła (tree-shaking usuwa ją z builda), ale:

- kupony `PlynDo_x4/x8/x12` z tej wersji są opisane jako obowiązujące w `docs/shoper_integration_guide.md` i `docs/plyndo_shoper_handoff.md`,
- kupony faktycznie używane przez v2 to `PLYNDO-PACK-4/8/12`,
- jeśli w panelu Shopera istnieją **oba komplety**, mamy realne ryzyko podwójnego rabatu albo rabatu bez kompletnej paczki.

To musi zostać rozstrzygnięte w panelu, nie tylko w kodzie.

### 3.2 Sprzedaż pojedynczej butelki wyłamuje się z modelu

Karta produktu w Shoperze ma pełny `Dodaj do koszyka` z polem ilości. Klient może kupić 1 butelkę za 19,90 zł, ominąć cały model pakietowy i landing. **Decyzja biznesowa (Twoja, 17.08):** blokujemy — checkout tylko dla 4/8/12.

Uwaga implementacyjna: `src/lib/storeCta.js::getProductCartItems()` zwraca jedną pozycję, a `buildShoperHandoffUrl` rzuca wyjątkiem dla `pack ∉ {4,8,12}` — czyli `ProductPage` też dostaje `handoffError`. Po decyzji o blokadzie ta ścieżka ma prowadzić do konfiguratora paczki, nie do sklepu.

### 3.3 Rozjazd macierzy rabatów — rozstrzygnięty

| Źródło | 4 szt. | 8 szt. | 12 szt. |
|---|---|---|---|
| `src/lib/bundlePricing.js` + `src/data/bundles.js` | −20% | −30% | −40% |
| Kupony v2 w Shoperze | −20% | −30% | −40% |
| `PRD.md`, `docs/plyndo_packages_handoff.md`, `CLAUDE.md` | −30% | −40% | −45/50% (Starter 10/12) |

**Decyzja (Twoja, 17.08): obowiązuje 20/30/40. Dokumentacja jest długiem do spłaty.** PRD, handoff i CLAUDE.md idą do poprawki — razem z nieaktualnym konceptem „Starter 10 / Starter 12" (w repo jest 12 produktów i pakiety 4/8/12, nie ma żadnego Startera 10).

### 3.4 CLAUDE.md opisuje nieistniejący produkt

Sekcja „Aktualny zakres produktu" mówi o `Starter 10` jako głównym pakiecie MVP i `Starter 12` jako docelowym. W kodzie: 12 produktów (`stockId` 182–193) i 10 pakietów w `bundles.js` (`komplet-12`, `wybierz-sam-4/8/12`, `dom-codzienny-4`, `dom-pelny-8`, `dom-komplet-12`, `firma-podstawowa-4`, `firma-operacyjna-8`, `firma-gastro-12`). Żadnego Startera 10. Agent czytający CLAUDE.md jako źródło prawdy dostaje fałszywy obraz produktu.

Podobnie `docs/agents/product_constraints.md` i `api_conventions.md` twierdzą, że *„CTA do Shopera musi pozostać nieaktywnym placeholderem"*, podczas gdy `offerIntegrationConfig.cta.status === 'enabled'`. Instrukcje dla agentów są sprzeczne ze stanem faktycznym.

### 3.5 Ceny i Omnibus wyglądają na niedokończone

Karta produktu renderuje:

```
Cena 19,90 zł
-0%
Najniższa cena z 30 dni przed obniżką: 19,90 zł
+0%
Promocja trwa do %s
```

`-0%`, `+0%` i niepodstawiony placeholder `%s` — moduł promocji jest włączony bez aktywnej promocji. Do wyłączenia lub skonfigurowania.

---

## 4. Parytet wizualny sklep ↔ landing (nowy zakres, 17.08)

### 4.1 Diagnoza: dwa niezależne systemy designu

Sklep ma **dwie warstwy stylu, które się nie znają**:

**Warstwa A — tokeny SVE** (`shoper-theme/styles/settings.json`, pushowalne):
```json
"primaryColor": "#000000",
"secondaryColor": "#2f6844",      ← zielony, nie ma go w landingu
"baseFontFamilyName": "Inter",     ← landing używa Switzer
"headersFont": "Playfair Display", ← landing używa Lora italic
"globalFontColor": "#333333",      ← landing: #1a1918
"btnBorderRadius": "24"            ← landing: pill 9999px
```

**Warstwa B — `custom.less`** (75 linii, nadpisuje warstwę A przez `!important`):
```less
--pd-cobalt: #5c77b7;
--secondaryColor: #5c77b7;    ← walczy z #2f6844 z warstwy A
--pd-sans: 'Switzer', ...;
--pd-serif: 'Lora', Georgia, serif;
```

Warstwa B łata warstwę A siłowo. Wszystko, czego `custom.less` nie zdążył nadpisać (a to dużo — 75 linii na cały sklep), renderuje się w Inter/Playfair/zieleni. Stąd wrażenie „innego środowiska".

### 4.2 Kanoniczna mapa tokenów landing → Shoper

Landing (`src/index.css`) jest źródłem prawdy. Mapowanie do wypełnienia przez wykonawcę:

| Token landingu | Wartość | Docelowo w Shoperze |
|---|---|---|
| `--n-900` / `--color-fg` | `#1a1918` | `globalFontColor`, `primaryColor` |
| `--n-0` / `--color-bg` | `#ffffff` | `globalBodyBackgroundColor` |
| `--plyndo-cobalt` / `--color-accent` | `#5c77b7` | `secondaryColor` **(dziś `#2f6844` — do zmiany)** |
| `--n-50` / `--color-bg-muted` | `#faf9f6` | tła sekcji w `custom.less` |
| `--n-700` / `--color-fg-muted` | `#555452` | tekst pomocniczy |
| `--color-border` | `rgba(0,0,0,.08)` | ramki kart/inputów |
| font tekstowy | **Switzer** (Fontshare) | `baseFontFamilyName` |
| font nagłówków | **Lora italic** | `headersFont` **(dziś Playfair Display)** |
| `--radius-pill` | `9999px` | `btnBorderRadius` **(dziś 24)** |
| `--radius-xl` | `24px` | radius kart |
| `--shadow-md` | `0 8px 24px rgba(0,0,0,.06)` | cienie kart |

**Zasada:** najpierw ustawiamy tokeny w `styles/settings.json` (żeby Shoper renderował poprawnie **z domyślnych** reguł szablonu), a dopiero potem `custom.less` dopieszcza to, czego tokeny nie obejmują. Odwrotna kolejność — obecna — to wieczna walka z `!important`.

### 4.3 Zakres parytetu — co realnie da się zrobić

Nie obiecujmy pixel-perfect. Realny cel to **„ta sama marka, ta sama typografia, ten sam rytm"** na ścieżce, którą klient faktycznie przechodzi: **koszyk → dane → dostawa/płatność → potwierdzenie**. Karty produktu i kategorie mają być spójne, ale to nie one sprzedają — sprzedaje landing.

Priorytety, w tej kolejności:

1. **Koszyk i checkout** (klient spędza tu 100% czasu) — typografia, przyciski pill, karty, kolory, podsumowanie paczki.
2. **Nagłówek i stopka** (widoczne wszędzie) — jedno logo PłynDo, menu jak na landingu, stopka z danymi EmiChem, `© 2026 PŁYN DO`.
3. **Karta produktu** — galeria, cena referencyjna, blok „to jest część paczki" z linkiem powrotnym na landing.
4. **Strona główna sklepu** — najlepiej zredukować do minimum i przekierowywać na `plyndo.pl`; sklep nie ma być drugim landingiem.

Punkty 1–3 przez `styles/settings.json` + `custom.less` + Shoper Visual Editor. Punkt 4 i wszelkie własne sekcje — przez **moduły własne** (Premium).

---

## 5. Kanały wdrożeniowe — co czym robimy

To jest mapa, której brakowało w dotychczasowej dokumentacji i przez którą wdrożenie utknęło:

| Zadanie | Kanał | Automatyzowalne? |
|---|---|---|
| Skrypt handoffu + sync kuponu + blokada 4/8/12 | **Moduły własne → Moduł integracji → pole JS** (Premium) | ❌ ręcznie w panelu |
| Tokeny designu (kolory, fonty, radius) | `shoper-theme/styles/settings.json` → `theme push` | ✅ CLI |
| CSS marki | `shoper-theme/styles/custom.less` → `theme push` | ✅ CLI |
| Układ stron, moduły, usunięcie sekcji demo | **Shoper Visual Editor** (Wygląd → Edycja szablonu) | ❌ ręcznie |
| Opinie demo Frusento, logo Frusento | Panel: Wygląd → moduły / Grafiki | ❌ ręcznie |
| Kupony rabatowe | Panel: Zwiększaj sprzedaż → Kupony **lub** `/webapi/rest/discounts` | ⚠️ oba |
| Produkty, ceny, kategorie, opisy | `/webapi/rest/products`, `/stocks`, `/categories` | ✅ CLI (`sync-shoper-catalog.mjs`) |
| Menu i linki nagłówka/stopki | Panel: Wygląd → Linki w nagłówku i stopce | ❌ ręcznie |
| Strony informacyjne (regulamin itd.) | `/webapi/rest/pages` | ✅ CLI |

**Konsekwencja dla `.shoperignore`:** wpis `custom-js/` może zostać (plik i tak nie jest pushowalny), ale w repo musi być **jawny komentarz**, że ten plik jest źródłem prawdy dla modułu własnego wklejanego ręcznie w panelu — inaczej za trzy miesiące ktoś znów uzna, że „skrypt jest wdrożony, bo jest w repo".

---

## 6. Plan domknięcia — 6 etapów

### Etap 0 — Inwentaryzacja (blokuje wszystko)
Uruchomić z maszyny z dostępem do sieci: test auth WebAPI, lista kuponów, lista produktów i kategorii, weryfikacja czy istnieją równolegle `PlynDo_x*` i `PLYNDO-PACK-*`, weryfikacja SKU 106/107/108. Wynik → `docs/shoper_inventory_2026-08-17.md`.

### Etap 1 — Naprawa landingu (P0, kod)
Fix `composition`/`stockId`, usunięcie martwego v1 z `storeCta.js`, neutralny fallback zamiast błędu technicznego w UI, ścieżka produktu → konfigurator zamiast błędu. Build + deploy.

### Etap 2 — Wdrożenie skryptu jako moduł własny (P0, panel)
Utworzenie modułu integracji z zawartością `plyndo-storefront.js`, rozszerzonego o twardą blokadę checkoutu poza 4/8/12. Weryfikacja przez T4 i T6.

### Etap 3 — Czyszczenie sklepu (P0, panel)
Usunięcie opinii demo Frusento, logo Frusento, bloga, duplikatów stopki; naprawa copyrightu; naprawa hero-CTA na domenę techniczną; decyzja o kategorii „Pakiety" (usunąć lub przekierować na `plyndo.pl/#pakiety`); dostosowanie SKU 106/107/108 tak, by nic się nie dublowało z handoffem.

### Etap 4 — Parytet wizualny (P1, CLI + panel)
Tokeny SVE → `custom.less` → Visual Editor, w kolejności z §4.3.

### Etap 5 — Synchronizacja dokumentacji (P1, kod)
PRD.md, CLAUDE.md, `docs/agents/*`, oba handoffy, `shoper_integration_guide.md` — do stanu faktycznego: 12 produktów, rabaty 20/30/40, CTA aktywne, protokół v2, kanały wdrożeniowe z §5.

### Etap 6 — Weryfikacja końcowa
`scripts/verify_production_truth.mjs` — wszystkie 8 testów PASS + ręczny przelot E2E na mobile i desktopie: pakiet gotowy 4, własna paczka 8, własna paczka 12, próba checkoutu z 3 szt. (ma być zablokowana).

---

## 7. Czego świadomie nie sprawdziłem

Uczciwie, żebyś wiedział, gdzie są białe plamy:

- **Nie zweryfikowałem kuponów** — wymaga POST/PUT do `/api/basket`, nie miałem trasy sieciowej.
- **Nie zweryfikowałem limitów WebAPI** na tym koncie — nagłówki `x-shop-api-limit` wymagają autoryzowanego zapytania.
- **Nie zrobiłem E2E handoffu** — brak podłączonej przeglądarki.
- **Nie sprawdziłem, czy SKU 106/107/108 nadal istnieją** — kategoria „Pakiety" jest pusta, ale to może znaczyć, że produkty są nieprzypisane, a nie usunięte.
- **Badge „Shoper Premium"** to dowód mocny, ale pośredni. Twardym potwierdzeniem będzie fakt, że w panelu widać sekcję **Moduły własne** — jeśli jej nie ma, Premium nie jest aktywne mimo badge'a.

Wszystkie te punkty są w Etapie 0 promptu jako blok blokujący.

---

## 8. Decyzje biznesowe podjęte 17.08.2026

1. **Rabaty: 4 = −20%, 8 = −30%, 12 = −40%.** PRD i pozostała dokumentacja do poprawki.
2. **Sprzedaż pojedynczej butelki: zablokowana.** Checkout tylko dla 4/8/12.
3. **Brak duplikacji:** to, co skomponowane na landingu, jest przekazywane do Shopera — jedno źródło prawdy dla składu koszyka.
4. **Parytet wizualny:** szablon Shopera ma wyglądać maksymalnie zbliżenie do landingu.

## 9. Decyzje wciąż otwarte

- Finalna forma kategorii „Pakiety" w sklepie (usunięcie vs redirect na landing).
- Los SKU 106/107/108 po inwentaryzacji.
- Konfiguracja Omnibus / promocji (dziś `-0%` i `%s`).
- Metody dostawy i płatności — czy skonfigurowane i przetestowane.
- Analityka (GA4, Meta Pixel) — brak na obu domenach; cross-domain tracking landing→sklep wymaga osobnej konfiguracji.
- NIP, telefon, SDS/CLP, prawdziwe opinie klientów.

---

## Źródła

- [Shoper Storefront — dokumentacja techniczna](https://storefront.developers.shoper.pl/)
- [Storefront: Moduły własne (Premium)](https://www.shoper.pl/learn/artykul/storefront-moduly-wlasne)
- [Shoper Storefront — Theme development basics](https://storefront.developers.shoper.pl/theme/)
- [Shoper Visual Editor — Theme Style System Configuration](https://storefront.developers.shoper.pl/sve/style-system-configuration/)
- [Shoper Developer Docs — REST API](https://developers.shoper.pl/)
- [Cennik Shoper — Standard vs Premium](https://www.shoper.pl/cennik-sklepu-shoper)
