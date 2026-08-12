# Dokumentacja Integracji Shoper: Panel Administracyjny Web vs REST API (sklep.plyndo.pl / sklep562393.shoparena.pl)

Data aktualizacji: 12 sierpnia 2026 r.  
Projekt: **PŁYN DO** (`plyndo.pl` → `sklep.plyndo.pl`)

---

## 1. Wstęp i Koncepcja "Lean Checkout Engine"

Celem integracji jest sprowadzenie sklepu `sklep.plyndo.pl` (Shoper) do roli **odchudzonego silnika zakupowego i koszyka (Checkout Engine)**. Wszystkie treści marketingowe, prezentacja produktów, FAQ i informacje o marce znajdują się na landing page `plyndo.pl`. Sklep Shoper służy wyłącznie do przeliczania koszyka, naliczania kuponów rabatowych oraz finalizacji płatności i dostawy.

---

## 2. Porównanie Możliwości: Panel Administracyjny Web vs REST API

| Obszar Funkcjonalny | Panel Web (Przeglądarka) | REST API (Skrypty CLI) | Zalecane Podejście |
|---|---|---|---|
| **Usuwanie Bloga i Wpisów** | ✅ Tak (*Wygląd sklepu → Moduły*) | ✅ Tak (`/webapi/rest/news`) | **Zunifikowane (CSS/JS Injection + REST API)** |
| **Edycja Plików Szablonu Twig (`.twig`)** | ✅ Tak (*Wygląd sklepu → Edytor szablonów*) | ❌ Brak endpointów CRUD | **Panel Web / Edytor Szablonów** |
| **Układ Modułów i Boksów (Drag & Drop)** | ✅ Tak (*Wygląd sklepu → Moduły*) | ❌ Brak edycji wizualnej | **Panel Web** |
| **Iniekcja Stylów CSS i Skryptów JS** | ✅ Tak (*Integracje własne / Edytor szablonów*) | ❌ Brak direct CSS endpoint | **Panel Web (Integracje własne)** |
| **Modyfikacja Menu i Nawigacji** | ✅ Tak (*Wygląd sklepu → Menu*) | ⚠️ Ograniczone | **Panel Web** (podmiana na URLs `plyndo.pl`) |
| **Tworzenie/Usuwanie Stron CMS** | ✅ Tak (*Wygląd sklepu → Strony informacyjne*) | ✅ Tak (`/webapi/rest/pages`) | **REST API** (dla masowych zmian) lub **Web** |
| **Masowa Obsługa Produktów i Cen** | ⚠️ Czasochłonne ręcznie | ✅ Tak (`/webapi/rest/products`, `/stocks`) | **REST API** (`shoper-api-client.mjs`) |
| **Zarządzanie Kuponami Rabatowymi** | ✅ Tak (*Zwiększaj sprzedaż → Kupony*) | ✅ Tak (`/webapi/rest/discounts`) | **Panel Web** lub **REST API** |

---

## 3. Procedura Całkowitego Usunięcia Bloga ze Sklepu

Aby usunąć blog oraz odnośniki do wpisów z nagłówka i stopki sklepu `sklep.plyndo.pl`, zastosowano **dwustopniowe czyszczenie**:

### A. Weryfikacja Bazy danych przez REST API
W bazie API Shoper endpoint `/webapi/rest/news` wykazuje brak aktywnych postów (`count: 0`).

### B. Usunięcie ze Szablonu (CSS & JS Injection)
1. **Reguły CSS ([shoper_injected_styles.css](file:///Users/mk/Dev_Env/Plyn_DO/plyndo.pl/docs/shoper_injected_styles.css)):**
   Ukrywają wszystkie boksy wpisów blogowych, przyciski *"View all posts"* oraz linki do listy artykułów `/pl/n/list`:
   ```css
   a[href*="/n/"],
   a[href*="blog"],
   a[href*="news"],
   .box_news,
   .box_blog,
   #box_news,
   #box_blog,
   li:has(a[href*="/n/"]),
   li:has(a[href*="blog"]) {
     display: none !important;
     visibility: hidden !important;
   }
   ```

2. **Skrypt JS ([shoper_injected_footer.js](file:///Users/mk/Dev_Env/Plyn_DO/plyndo.pl/docs/shoper_injected_footer.js)):**
   Po załadowaniu drzewa DOM dynamicznie usuwa węzły HTML odpowiadające pozycji *"Blog"*, *"View all posts"* oraz zbędnym odnośnikom w kolumnach stopki.

---

## 4. Co i Jak Robimy z Poziomu Panelu Administracyjnego Web (Web UI)

### A. Wygląd sklepu → Edytor szablonów i CSS
* **Ścieżka:** *Wygląd sklepu → Edytor szablonów*
* **Zastosowanie:** Modyfikacja kodu struktury plików `.twig` lub dodanie własnego arkusza stylów `custom.css`.
* **Działanie:** Wklejenie przygotowanego arkusza stylów [shoper_injected_styles.css](file:///Users/mk/Dev_Env/Plyn_DO/plyndo.pl/docs/shoper_injected_styles.css).

### B. Wygląd sklepu → Moduły (Układ stron)
* **Ścieżka:** *Wygląd sklepu → Moduły / Układ modułów*
* **Zastosowanie:** Odchudzenie układu stron.
* **Działanie:** Wyłączenie z widoku boksów: *Blog / Aktualności*, *Nowości*, *Promocje*, *Kategorie*, *Newsletter*.

### C. Wygląd sklepu → Menu i Nawigacja
* **Ścieżka:** *Wygląd sklepu → Menu (Menu główne i Stopka)*
* **Działanie:** Podmiana adresów URL w menu na `https://plyndo.pl` oraz usunięcie pozycji *Blog*.

### D. Ustawienia → Dodatki i integracje → Integracje własne
* **Ścieżka:** *Ustawienia → Dodatki i integracje → Integracje własne*
* **Działanie:** Wklejenie w sekcji **Stopka (Footer)** kodu z pliku [shoper_injected_footer.js](file:///Users/mk/Dev_Env/Plyn_DO/plyndo.pl/docs/shoper_injected_footer.js).

---

## 5. Co i Jak Robimy przez REST API (`shoper-api-client.mjs`)

Dane dostępowe w pliku [plyndo.pl/.env.local](file:///Users/mk/Dev_Env/Plyn_DO/plyndo.pl/.env.local):
```env
SHOPER_STORE_URL=https://sklep.plyndo.pl
SHOPER_TECHNICAL_DOMAIN=sklep562393.shoparena.pl
SHOPER_API_URL=https://sklep562393.shoparena.pl/webapi/rest
SHOPER_API_USER=mkapi
SHOPER_API_PASSWORD=twoje_haslo
```

### Wykonywanie Zapytań Masowych

1. **Test Autoryzacji i Tokena Bearer:**
   ```bash
   node plyndo.pl/scripts/shoper-api-client.mjs --test
   ```

2. **Zarządzanie Produktami i Wariantami (`/webapi/rest/products`, `/webapi/rest/stocks`):**
   ```bash
   node plyndo.pl/scripts/shoper-api-client.mjs --list-products
   ```
