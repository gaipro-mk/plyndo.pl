# Inwentaryzacja stanu faktycznego Shoper (sklep.plyndo.pl / sklep562393.shoparena.pl)

**Data audytu:** 17 sierpnia 2026 r.  
**Projekt:** PŁYN DO (`plyndo.pl` → `sklep.plyndo.pl`)  
**Status wdrożenia:** Etap 0 — Inwentaryzacja bazowa

---

## 1. Status konta Shoper i narzędzi operacyjnych

| Element | Stan faktyczny | Werdykt |
|---|---|---|
| **Abonament sklepu** | **Shoper Premium** (potwierdzony badge'em oraz tokenem CLI) | ✅ Potwierdzone |
| **Dostęp Shoper CLI (`@shoper/cli`)** | Aktywny token `PlyndoCLI` (Store: `https://sklep562393.shoparena.pl`, Scope: `Edit store themes`, ważny do 12.08.2027) | ✅ Działa |
| **Dostęp WebAPI REST** | Autoryzacja OAuth Bearer (`/webapi/rest/auth`), ważność tokena: 30 dni (2 592 000 s) | ✅ Działa |
| **Limity REST API** | `x-shop-api-limit: 10`, `x-shop-api-bandwidth: 2`, `x-shop-api-calls: 1` | ✅ Stabilne |
| **Aktywny motyw Storefront** | Szablon własny: ID `12` (`PlynDo.PL - Szablon Własny`) | ✅ Działa |

---

## 2. Inwentaryzacja zasobów sklepu

### A. Produkty podstawowe (12 płynów: stockId 182–193)
Wszystkie 12 produktów fizycznych znajduje się w bazie sklepu w kategorii `Dom` (ID 38), z poprawnymi cenami jednostkowymi i stockId zgodnymi z konfiguracją landingu:

| ID Produktu | Kod | Nazwa | Kategoria | Cena brutto | StockID |
|---|---|---|---|---|---|
| 94 | `plyndo_naczyn` | Płyn do naczyń | Dom (38) | 19,90 zł | **182** |
| 95 | `plyndo_zmywarki` | Płyn do zmywarki | Dom (38) | 29,90 zł | **183** |
| 96 | `plyndo_prania` | Płyn do prania | Dom (38) | 34,90 zł | **184** |
| 97 | `plyndo_plukania` | Płyn do płukania | Dom (38) | 24,90 zł | **185** |
| 98 | `plyndo_podlog` | Płyn do podłóg | Dom (38) | 22,90 zł | **186** |
| 99 | `plyndo_wc` | Płyn do WC | Dom (38) | 19,90 zł | **187** |
| 100 | `plyndo_mycia_rak` | Płyn do mycia rąk | Dom (38) | 27,90 zł | **188** |
| 101 | `plyndo_mycia_szyb` | Płyn do mycia szyb | Dom (38) | 21,90 zł | **189** |
| 102 | `plyndo_lazienki` | Płyn do łazienki | Dom (38) | 24,90 zł | **190** |
| 103 | `plyndo_nablyszczania` | Płyn do nabłyszczania | Dom (38) | 24,90 zł | **191** |
| 104 | `plyndo_odkamieniania` | Płyn do odkamieniania | Dom (38) | 26,90 zł | **192** |
| 105 | `plyndo_udrazniania_rur` | Płyn do udrażniania rur | Dom (38) | 29,90 zł | **193** |

### B. Produkty archiwalne / Pakiety v1 (SKU 106, 107, 108)
W bazie wykryto 3 produkty utworzone podczas wcześniejszej integracji protokołu v1:
- **ID 106:** `Pakiet 4x – Starter` (Kod: `AF3B-531C7`, Kategoria 41, Cena: 71,68 zł, StockID: 194)
- **ID 107:** `Pakiet 8x – Dom na co dzień` (Kod: `332D-374F0`, Kategoria 42, Cena: 139,44 zł, StockID: 195)
- **ID 108:** `Pakiet 12x – Dom + firma` (Kod: `7522-55066`, Kategoria 43, Cena: 185,28 zł, StockID: 196)

### C. Kategorie
- **ID 38:** `Dom` — zawiera 12 produktów podstawowych (94–105).
- **ID 39:** `Firma` — brak produktów.
- **ID 40:** `Pakiety` — **PUSTA kategoria nadrzędna** (brak bezpośrednio przypisanych produktów).
- **ID 41, 42, 43:** Podkategorie pakietów v1 z przypisanymi produktami 106, 107, 108.

### D. Kupony rabatowe w koszyku
Testy uderzające w endpoint `/api/basket/{id}/promo-code` dla kodów `PLYNDO-PACK-4`, `PLYNDO-PACK-8`, `PLYNDO-PACK-12` oraz `PlynDo_x4`, `PlynDo_x8`, `PlynDo_x12` zwracają `hasPromoCode: false` i rabat `0,00 zł`.  
**Wniosek:** Kupony rabatowe nie są obecnie aktywne / skonfigurowane w module rabatów Shopera.

---

## 3. Wyniki testów bazowych (Baseline — `verify_production_truth.mjs`)

```text
------------------------------------------------------------------------------------------------------------------------
Nazwa testu                | Oczekiwano                                 | Otrzymano                                | Wynik
------------------------------------------------------------------------------------------------------------------------
T1 — Kupon 4               | hasPromoCode=true & discount=17.92         | hasPromoCode=false, discount=0           | [FAIL]
T2 — Kupon 8               | hasPromoCode=true & discount=59.76         | hasPromoCode=false, discount=0           | [FAIL]
T3 — Kupon 12              | hasPromoCode=true & discount=123.52        | hasPromoCode=false, discount=0           | [FAIL]
T4 — Skrypt na sklepie     | JS w /userdata/public/storefront/js/ zawie | Sprawdzono 0 skryptów z /userdata/public | [FAIL]
T5 — Landing wdrożony      | JS z pd_items, pd_pack, BEZ ?add=, PlynDo_ | pd_items=false, pd_pack=false, ?add==fal | [FAIL]
T6 — Handoff E2E           | count=4, hasPromo=true, grossVal=71.68     | count=undefined, hasPromo=undefined, gro | [FAIL]
T7 — Rebranding CSS        | --pd-, Switzer, --secondaryColor:#5c77b7   | --pd-=true, Switzer=true, secondaryColor | [PASS]
T8 — Czystość sklepu       | frusento=0, /pl/n/list=0, Copyright 2026 o | frusento=3, /pl/n/list=1, copyright2026= | [FAIL]
------------------------------------------------------------------------------------------------------------------------
```

---

## 4. Rekomendacje architektoniczne do akceptacji

1. **Rekomendacja dot. SKU 106, 107, 108:**
   - **Dezaktywacja (lub usunięcie):** Zgodnie z decyzją **D3 (Zero duplikacji)** skład koszyka komponowany na landingu jest jedynym źródłem prawdy. Sprzedaż w Shoperze ma odbywać się wyłącznie poprzez dodanie butelek 182–193 i naliczenie kuponu `PLYNDO-PACK-*`. Utrzymywanie równoległych produktów-pakietów (106–108) tworzy ryzyko rozjazdu cenowego oraz ominięcia konfiguratora.
2. **Rekomendacja dot. kategorii „Pakiety” (ID 40):**
   - **Usunięcie z menu sklepu i przekierowanie:** Kategoria 40 jest pusta. Rekomendujemy usunięcie jej z nagłówka i stopki sklepu oraz ustawienie przekierowania 301 z `/pl/c/Pakiety/40` na `https://plyndo.pl/#pakiety`.
3. **Rekomendacja dot. kuponów rabatowych:**
   - Skonfigurować w panelu Shoper (*Zwiększaj sprzedaż → Kupony rabatowe*) wyłącznie kupony zgodne z protokołem v2:
     - `PLYNDO-PACK-4` (20% rabatu, min. 4 szt.)
     - `PLYNDO-PACK-8` (30% rabatu, min. 8 szt.)
     - `PLYNDO-PACK-12` (40% rabatu, min. 12 szt.)
   - Usunąć/wyłączyć wszelkie stare kupony `PlynDo_x*`.
