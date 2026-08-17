# Inwentaryzacja Skórki Shopera — Lean Checkout Skin (Decyzja D5)

**Data audytu i inwentaryzacji:** 17.08.2026  
**Szablon:** Phoenix / SVE (ID 12)  
**Cel:** Sprowadzenie `sklep.plyndo.pl` do czystego silnika transakcyjnego z parytetem wizualnym (nagłówek, stopka, koszyk, checkout, strony informacyjne).

---

## 1. Zestawienie modułów przed i po wdrożeniu Lean Skin

| Moduł / Element | Przed wdrożeniem (stan demo) | Stan docelowy Lean Skin | Sposób realizacji |
|---|---|---|---|
| **Logo i nagłówek** | Logo demo „Frusento” w alt/title | PŁYN DO (SVG / wektor + font Switzer) | CSS SVE + `custom.less` + `plyndo-storefront.js` |
| **Podwójny Hero banner** | 2 slidery marketingowe demo | Usunięto ze sklepu (marketing na landing page) | Ukrycie CSS + odpięcie w układzie strony głównej |
| **Pasek korzyści (ticker/marquee)** | Demo teksty marketingowe | Usunięto (niepotrzebny na silniku transakcyjnym) | `custom.less` (`.marquee, .ticker { display: none }`) |
| **Moduł bloga (`/pl/n/list`)** | Artykuły demo „View all posts” | Całkowicie usunięto | `custom.less` + czyszczenie linków w JS |
| **Opinie demo** | Fałszywi autorzy: Liam Johnson, Jake Parker | Usunięto (brak fałszywych opinii) | `.sft-opinion { display: none }` + selektor w JS |
| **Stopka i copyright** | „Copyright 2025 Shoper” + duplikaty | „© 2026 PŁYN DO” + 1 zunifikowana stopka | Zmienne SVE + `patchDom()` w JS |
| **Koszyk i Checkout** | Standardowy skin Phoenix | Lean Checkout (karty, zaokrąglenia pill, Switzer, Lora) | `custom.less` + tokeny `--pd-*` |
| **Pole kodu rabatowego (B20)** | Widoczne pole wpisywania kodu | Ukryte (rabat 20/30/40% naliczany automatycznie) | `custom.less` + selektor w JS |
| **Blokada zakupu 1 szt. (D2)** | Możliwość zakupu pojedynczych sztuk | Checkout Guard (blokada przycisku + banner informacyjny) | `applyCheckoutGuard()` w `plyndo-storefront.js` |
| **Kategoria Pakiety 40 (D3)** | Kategoria zduplikowana na sklepie | 301 Redirect do `https://plyndo.pl/#pakiety` | `checkCategoryRedirect()` + usunięcie z menu |
| **SKU 106, 107, 108 (D3)** | Stare produkty pakietowe | Nieaktywne (301 do landingu) | Wyłączone w REST API Shopera |

---

## 2. Dostępne strony informacyjne i prawne (Shoper)

Wszystkie wymagane prawem strony pozostają dostępne bezpośrednio w silniku sklepu:
- `/pl/i/Regulamin/3` — Regulamin sklepu
- `/pl/i/Polityka-prywatnosci/11` — Polityka prywatności i cookies
- `/pl/i/Zwroty-i-reklamacje/7` — Odstąpienie od umowy i reklamacje
- `/pl/i/Dostawa-i-platnosci/4` — Formy dostawy i płatności
- `/pl/contact` — Formularz kontaktowy i dane firmy

---

## 3. Wytyczne utrzymania

1. Wszelkie zmiany wizualne sklepu należy wprowadzać w `shoper-theme/styles/custom.less` i wdrażać za pomocą `@shoper/cli`.
2. Logika koszyka, automatyczne aplikowanie kuponów `PLYNDO-PACK-*` oraz Checkout Guard 4/8/12 są zarządzane w `shoper-theme/custom-js/plyndo-storefront.js` (moduł własny 226 w panelu Shopera).
