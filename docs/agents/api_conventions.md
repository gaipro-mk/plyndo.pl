# API Conventions & Integrations

- **Architektura integracji:** Landing page (`plyndo.pl`) konfiguruje koszyk i przekazuje pełny skład paczki do Shopera (`sklep.plyndo.pl`) via protokół v2.
- **Protokół v2:** Przekazanie koszyka multi-item z precyzyjnymi `stockId` (182–193) produktów fizycznych oraz kodem rabatowym `promo` (`PLYNDO-PACK-4/8/12`).
- **Sklep Shoper (Checkout Engine):**
  - Storefront API: skrypt integracyjny w Module własnym (`custom-js/plyndo-storefront.js`) zarządza sesją koszyka, debounce zdarzeń oraz blokadą checkoutu poza pakietami 4/8/12 sztuk.
  - SVE Theme: pliki stylów `shoper-theme/styles/custom.less` i `shoper-theme/styles/settings.json` wdrażane przez `@shoper/cli`.
  - REST WebAPI: autoryzacja OAuth Bearer token z uprawnieniami do odczytu/zapisu produktów, stanów magazynowych i kuponów.
- **Zasada rabatowa:** Ceny produktów są referencyjne; kontrakt rabatu i oszczędności dotyczy wyłącznie całej paczki (20%/30%/40%).
- **Sekrety i bezpieczeństwo:** Tokeny API oraz zmienne `.env*` pozostają poza repozytorium gita.
