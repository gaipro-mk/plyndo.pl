# Dokonanie Integracji i Handoff Projektu: PŁYN DO → Shoper (sklep.plyndo.pl)

Data przekazania: 12 sierpnia 2026 r.  
Projekt: **PŁYN DO** (`plyndo.pl` → `sklep.plyndo.pl` / `sklep562393.shoparena.pl`)

---

## 1. Cel i Koncepcja Architektoniczna ("Lean Checkout Engine")

Sklep `sklep.plyndo.pl` został przygotowany i zintegrowany jako **odchudzony silnik zakupowy i koszyk (Lean Checkout Engine)**.

* **Landing Page (`plyndo.pl`):** Główny portal sprzedażowy, zawierający pełne opisy produktów, sekcje pakietowe, konfigurator 4/8/12 sztuk, wideo Exploded, FAQ oraz informacje o marce.
* **Sklep Shoper (`sklep.plyndo.pl`):** Pełni rolę kasy. Obsługuje koszyk sesyjny, automatyczne kupony rabatowe (20%, 30%, 40%) oraz bramki dostawy i płatności.
* **Układ Nagłówka i Szablonu:** Logo `PŁYN DO` z lewej strony, menu na środku, ikony koszyka po prawej. Wycięto blogi, slidery, karuzele oraz zbędne boksy. Linki w nawigacji sklepu odsyłają ruch z powrotem na landing page.

---

## 2. Dane Dostępowe i Konta (Zapisane w .env.local)

Wszystkie parametry zostały zapisane w pliku [plyndo.pl/.env.local](file:///Users/mk/Dev_Env/Plyn_DO/plyndo.pl/.env.local):

```env
# Shoper Store Configuration
SHOPER_STORE_URL=https://sklep.plyndo.pl
SHOPER_TECHNICAL_DOMAIN=sklep562393.shoparena.pl
SHOPER_API_URL=https://sklep562393.shoparena.pl/webapi/rest

# Shoper Credentials
SHOPER_API_USER=mkapi
SHOPER_API_PASSWORD=rizfyk-bukhi8-qecZyx
SHOPER_WEB_ADMIN_USER=mk
SHOPER_WEB_ADMIN_PASSWORD=rizfyk-bukhi8-qecZyx
```

* **REST API:** Łączność potwierdzona i aktywna (`HTTP 200 / Bearer Token`). Służy do automatycznych zapytań w tle bez udziału przeglądarki.
* **Panel Web Admin:** Logowanie na adresie `https://sklep562393.shoparena.pl/admin`.

---

## 3. Wykaz 12 Produktów i 3 Pakietów (Baza danych Shoper REST API)

| Product ID | Stock ID | Kod SKU | Nazwa Produktu w Shoper | Cena PLN | Wideo Exploded MP4 / Opis |
|---|---|---|---|---|---|
| **94** | **182** | `plyndo_naczyn` | **PŁYN DO naczyń** | 19,90 zł | `https://plyndo.pl/video/vid_exploaded_naczynia.mp4` |
| **95** | **183** | `plyndo_zmywarki` | **PŁYN DO zmywarki** | 29,90 zł | `https://plyndo.pl/video/vid_zmywarka.mp4` |
| **96** | **184** | `plyndo_prania` | **PŁYN DO prania** | 34,90 zł | `https://plyndo.pl/video/vid_pranie.mp4` |
| **97** | **185** | `plyndo_plukania` | **PŁYN DO płukania** | 24,90 zł | `https://plyndo.pl/video/vid_plukanie.mp4` |
| **98** | **186** | `plyndo_podlog` | **PŁYN DO podłóg** | 22,90 zł | `https://plyndo.pl/video/vid_podlogi.mp4` |
| **99** | **187** | `plyndo_wc` | **PŁYN DO WC** | 19,90 zł | `https://plyndo.pl/video/vid_wc.mp4` |
| **100** | **188** | `plyndo_mycia_rak` | **PŁYN DO mycia rąk** | 27,90 zł | `https://plyndo.pl/video/vid_rece.mp4` |
| **101** | **189** | `plyndo_mycia_szyb` | **PŁYN DO mycia szyb** | 21,90 zł | `https://plyndo.pl/video/vid_szyby.mp4` |
| **102** | **190** | `plyndo_lazienki` | **PŁYN DO łazienki** | 24,90 zł | `https://plyndo.pl/video/vid_lazienka.mp4` |
| **103** | **191** | `plyndo_nablyszczania` | **PŁYN DO nabłyszczania** | 24,90 zł | `https://plyndo.pl/video/vid_nablyszczanie.mp4` |
| **104** | **192** | `plyndo_odkamieniania` | **PŁYN DO odkamieniania** | 26,90 zł | `https://plyndo.pl/video/vid_odkamienianie.mp4` |
| **105** | **193** | `plyndo_udrazniania_rur` | **PŁYN DO udrażniania rur** | 29,90 zł | `https://plyndo.pl/video/vid_udraznianie.mp4` |
| **106** | **194** | `plyndo_pakiet_4x_starter` | **Pakiet 4x – Starter** | 71,68 zł | Zestaw 4 szt. (Naczyń, Podłóg, Szyb, Łazienki) |
| **107** | **195** | `plyndo_pakiet_8x_dom` | **Pakiet 8x – Dom na co dzień** | 139,44 zł | Zestaw 8 szt. (Podstawowy zapas domowy) |
| **108** | **196** | `plyndo_pakiet_12x_firma` | **Pakiet 12x – Dom + firma** | 185,28 zł | Pełny komplet 12 wariantów |

---

## 4. Utworzone Pliki Wdrożeniowe (Injected Assets)

| Plik | Ścieżka w Projekcie | Miejsce Wklejenia w Shoper Admin | Opis Funkcji |
|---|---|---|---|
| **Stylizacja CSS** | [shoper_injected_styles.css](file:///Users/mk/Dev_Env/Plyn_DO/plyndo.pl/docs/shoper_injected_styles.css) | *Integracje własne (Sekcja Nagłówek)* | Układ Logo Lewo / Menu Środek, fonty Switzer/Lora, przyciski Pill 1:1, ukrycie bloga i sliderów. |
| **Skrypt JS Koszyka** | [shoper_injected_footer.js](file:///Users/mk/Dev_Env/Plyn_DO/plyndo.pl/docs/shoper_injected_footer.js) | *Integracje własne (Sekcja Stopka)* | Przekierowania nawigacji, automatyczny Handoff koszyka `?add=...&promo=...` oraz osadzanie wideo Exploded. |
| **Synchronizacja API** | [sync-shoper-catalog.mjs](file:///Users/mk/Dev_Env/Plyn_DO/plyndo.pl/scripts/sync-shoper-catalog.mjs) | CLI Terminal | Masowa aktualizacja 12 produktów i 3 pakietów w Shoper REST API. |
| **Klient REST API** | [shoper-api-client.mjs](file:///Users/mk/Dev_Env/Plyn_DO/plyndo.pl/scripts/shoper-api-client.mjs) | CLI Terminal | Zapytania OAuth 2.0 / Basic Auth. |
| **Automatyzacja Przeglądarki** | [shoper-browser-automation.mjs](file:///Users/mk/Dev_Env/Plyn_DO/plyndo.pl/scripts/shoper-browser-automation.mjs) | CLI Terminal | Testowanie renderingu w przeglądarce i zrzutów ekranu. |

---

## 5. Konfiguracja Kuponów Rabatowych w Shoper

W panelu Shoper w zakładce **Zwiększaj sprzedaż → Kupony rabatowe** utworzono 3 kody rabatowe:
1. `PlynDo_x4` – **20% rabatu** na cały koszyk (wymagane min. 4 szt.)
2. `PlynDo_x8` – **30% rabatu** na cały koszyk (wymagane min. 8 szt.)
3. `PlynDo_x12` – **40% rabatu** na cały koszyk (wymagane min. 12 szt.)

---

## 6. Szybkie Polecenia dla Zespołu (CLI Quick Reference)

```bash
# Pełna synchronizacja bazy produktów i pakietów w Shoper REST API
node plyndo.pl/scripts/sync-shoper-catalog.mjs

# Test połączenia REST API
node plyndo.pl/scripts/shoper-api-client.mjs --test

# Wykaz produktów z bazy Shoper API
node plyndo.pl/scripts/shoper-api-client.mjs --list-products

# Test przeglądarkowy przepływu koszyka i zrzut ekranu
node plyndo.pl/scripts/shoper-browser-automation.mjs --test-cart
```
