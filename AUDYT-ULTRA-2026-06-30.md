# Audyt Ultra — plyndo.pl

**Data:** 30.06.2026
**Zakres:** pełny przegląd projektu (kod, wydajność, SEO, GEO, UX/dostępność, konwersja, marketing & sprzedaż w branży chemii gospodarczej)
**Repozytorium:** `plyndo.pl` (remote: `github.com/mierzwixjr/plyndo.pl`, branch `main`, ostatni commit `89627c3`)
**Metodyka:** analiza statyczna całego `src/`, lokalny `npm run lint` + `npm run build`, weryfikacja **wersji produkcyjnej na żywo** (`https://plyndo.pl`, nagłówki HTTP, kody odpowiedzi, surowy HTML), audyt wieloagentowy (subagenci: wydajność, SEO/GEO, UX / dostępność WCAG 2.2 / CRO, przegląd kodu full-stack) oraz skills (web-perf, react-best-practices).
**Tryb:** read-only. Ten dokument NIE wprowadza zmian w kodzie — to raport z rekomendacjami.

> ⚠️ **Disclaimer dot. agresywnej szczerości:** raport jest celowo bezkompromisowy, bo o to prosiłeś („dogłębny ultra review"). Projekt ma solidny fundament designerski i dobrze napisaną logikę cen — ale w obecnym stanie **nie da się nim nic kupić, a wyszukiwarki i modele AI widzą pustą, nieaktualną skorupę**. To są problemy egzystencjalne dla strony, której celem jest sprzedaż.

---

## 1. TL;DR — ocena ogólna

| Obszar | Ocena | Komentarz jednozdaniowy |
|---|---|---|
| Architektura / kod | **6.5/10** | Czysty, czytelny kod i bardzo dobra logika cen, ale CSR-SPA bez code-splittingu, prop-drilling i martwy kod. |
| Wydajność | **4/10** | Jeden chunk 507 kB, 12 filmów montowanych naraz na home, fonty render-blocking, 418 kB PNG, ~10 MB osieroconych assetów. |
| SEO | **2.5/10** | Kanoniczne URL-e produktów zwracają **404**, treść niewidoczna w HTML, brak sitemap/robots, sprzeczne encje, nieaktualny `<head>`. |
| GEO (silniki generatywne) | **1.5/10** | Boty AI widzą pusty `<div id="root">` i nieaktualną, sprzeczną tożsamość marki — praktycznie zero szans na cytowanie. |
| UX / dostępność | **5.5/10** | Ładny, spójny system wizualny, ale kontrast poniżej WCAG, brak `prefers-reduced-motion`, linki bez nazw dostępnych. |
| Konwersja / sprzedaż | **2/10** | **Główne CTA prowadzi do nieistniejącej domeny `sklep.plyndo.pl`** — lejek sprzedaży jest fizycznie przerwany. |
| Zgodność prawna (PL) | **2/10** | Regulamin, polityka prywatności i reklamacje to placeholdery; brak cookie-consent; ryzyko dyrektywy Omnibus przy „−50%". |

**Werdykt:** to nie jest gotowy do sprzedaży produkt — to **dopracowany wizualnie prototyp marketingowy** z czterema krytycznymi usterkami, które trzeba naprawić *zanim* cokolwiek innego zacznie mieć znaczenie (patrz sekcja 3).

---

## 2. Stack i architektura (stan faktyczny)

- **Frontend:** React 19 + Vite 8 + Tailwind CSS v4 (`@tailwindcss/vite`), `react-router-dom` v7 (`BrowserRouter`, routing po stronie klienta), `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`.
- **Render:** czysty **CSR (client-side rendering)** — `src/main.jsx` montuje `createRoot` w pustym `<div id="root">`; brak SSR/SSG/prerendera (`vite.config.js` to gołe `react()` + `tailwindcss()`).
- **Hosting:** Cloudflare Pages (`wrangler.toml`, `public/_redirects`). Potwierdzone na żywo: `server: cloudflare`, `cf-cache-status: DYNAMIC`, hash buildu `index-CLw-jyBz.js` zgodny z lokalnym → **produkcja = aktualny stan repo**.
- **Dane:** statyczne moduły JS — `src/data/products.js` (12 produktów, ceny oznaczone `listPriceStatus: 'dummy'`), `src/data/bundles.js` (11 pakietów), logika cen `src/lib/bundlePricing.js`.
- **Model biznesowy:** sprzedaż pakietowa (gotowe zestawy + „wybierz sam" 4/8/12), rabaty 30/40/50% liczone dla całej paczki. Producent: **Michał Mierzwa EmiChem P.P.**, ul. Wójtowska 16, 61-654 Poznań. Marka: **PŁYN DO**. Docelowy sklep: Shoper (placeholder).
- **Skala kodu:** ~5 000 linii (`src/`), 34 pliki JS/JSX/CSS. Brak testów, brak CI, brak TypeScript, brak Prettier.

### Co jest zrobione dobrze (żeby było uczciwie)
- ✅ **`bundlePricing.js`** — pieniądze liczone w groszach (minor units), zaokrąglanie poprawne, walidacja typów, czyste funkcje. Wzorowy moduł.
- ✅ **System designu** w `src/index.css` — spójne tokeny (kolory, typografia, odstępy, cienie, promienie), tryb jasny/ciemny, skala fontów.
- ✅ **Warstwa i18n produktów** (`products.js`) — pełne PL/EN dla nazw/opisów produktów, sensowna struktura.
- ✅ **Realne dane produktowe** — składy, dozowanie, zwroty CLP (H-/P-), co jest świetnym surowcem pod treść i GEO.
- ✅ **Kreator własnej paczki** (`CustomBundlePage.jsx`) — poprawna walidacja limitu, miły UX wypełniania kartonu.
- ✅ Build szybki (~0.4 s), bez sourcemap w produkcji.

---

## 3. 🔴 KRYTYCZNE (P0) — naprawić w pierwszej kolejności

> Te cztery rzeczy sprawiają, że strona nie spełnia swojego celu. Każda z nich osobno jest „stop-shipem".

### P0-1. Główne CTA prowadzi do nieistniejącej domeny — lejek sprzedaży jest przerwany
**Dowód (live):** `curl https://sklep.plyndo.pl` → `Could not resolve host` (brak rekordu DNS).
**Lokalizacja:** `src/components/sections/HeroSection.jsx:71`, `src/components/bundles/StoreButton.jsx:7`, `src/components/layout/TopNav.jsx:127` i `:195`.

Każdy przycisk „Zobacz pakiety" / „Sklep" / „Przejdź do sklepu" linkuje do `https://sklep.plyndo.pl`, która **nie istnieje**. Użytkownik gotowy do zakupu trafia w pustkę. Dodatkowo jest to sprzeczne z modelem danych, który *świadomie* wyłącza CTA:

```js
// src/data/products.js:320-328 — model mówi: CTA wyłączone, „Wkrótce w sklepie"
cta: { status: 'disabled', isPlaceholder: true, label: { pl: 'Wkrótce w sklepie' } }
```

UI ignoruje tę flagę i twardo koduje martwy link. **Rekomendacja:**
1. Krótkoterminowo: dopóki sklep nie żyje, podmień CTA na realne działanie wychwytujące popyt — formularz „Powiadom mnie o starcie" / zapis na newsletter / `mailto:kontakt@plyndo.pl` — i respektuj flagę `cta.status`.
2. Docelowo: postaw `sklep.plyndo.pl` (Shoper) i przekazuj skład koszyka + rabat pakietowy.
3. Dodaj **monitoring martwych linków** (np. test w CI uderzający w domenę sklepu).

---

### P0-2. Kanoniczne URL-e produktów (i kody QR na butelkach!) zwracają HTTP 404
**Dowód (live):**
```
404  /produkt/plyn-do-naczyn     ← URL z siatki, z canonical i z QR
200  /produkt/naczyn             ← krótki slug, do którego nikt nie linkuje
404  /produkt/plyn-do-lazienki
200  /produkt/lazienki
```
**Lokalizacja:** `src/data/products.js:446-452` (`productRoutePath` używa `urlSlug` = `plyn-do-naczyn`) vs `public/_redirects:13-24` (tylko krótkie slugi `/produkt/naczyn`), brak reguły catch-all `/* /index.html 200`.

To jest najgroźniejszy techniczny błąd w projekcie. Cloudflare Pages serwuje SPA tylko dla tras **jawnie wymienionych** w `_redirects`. Aplikacja linkuje, ustawia jako `canonical` i koduje w **kodach QR na etykietach** długie slugi (`/produkt/plyn-do-naczyn`), których na liście nie ma → serwer zwraca `404.html`.

**Konsekwencje:**
- 🔴 **Wszystkie 12 stron produktowych jest nieindeksowalnych** (Googlebot na canonical dostaje 404).
- 🔴 **Fizyczne kody QR z butelek prowadzą do 404** — a to jest sztandarowa funkcja produktu.
- 🔴 Twarde odświeżenie / udostępnienie linku produktu = 404.

**Rekomendacja (wybierz jeden kanoniczny format i trzymaj się go wszędzie):**
- Zalecane: **długi, bogaty w słowa kluczowe slug** jako kanoniczny. Dodaj catch-all i 301 dla wariantów:
```
# public/_redirects — docelowo
/produkt/*            /index.html   200
/product/:slug        /produkt/:slug 301
/produkty/:slug       /produkt/:slug 301
/*                    /index.html   200   # SPA fallback (zamiast enumerowania 59 tras)
```
> Uwaga: catch-all `/* 200` naprawia routing, ale wtedy *wszystko* zwraca 200 (także literówki) — dlatego P0-3 (prerender) jest komplementarny: pozwala oddać prawdziwe 404 i prawdziwą treść.

---

### P0-3. CSR bez prerendera — wyszukiwarki i AI widzą pustą, nieaktualną skorupę
**Dowód (live):** `/` i `/o-marce` są **bajt-w-bajt identyczne** (ten sam md5), oba zawierają pusty `<div id="root">`, ten sam `<title>` i `canonical=https://plyndo.pl/`.
**Lokalizacja:** `src/main.jsx:7-13`, `index.html:88-90`, meta nadpisywane dopiero w `src/components/layout/RouteEffects.jsx:102-119`.

Serwer dla **każdej** trasy zwraca ten sam `index.html`. Tytuł/opis/canonical/OG są podmieniane dopiero przez JS po stronie klienta. Skutki:
- Googlebot renderuje JS, ale z opóźnieniem i „drugą falą" — cała indeksacja podstron wisi na WRS, a `canonical` w surowym HTML wskazuje home dla wszystkich → ryzyko konsolidacji wszystkich podstron do strony głównej.
- Boty AI/scrapery social (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, facebookexternalhit) **nie wykonują JS** → widzą pustkę.

**Rekomendacja:** wdrożyć **prerendering/SSG** dla statycznych tras (home, 12 produktów, 11 pakietów, `/o-marce`, `/dla-domu`, `/dla-firm`). `puppeteer` jest już w `devDependencies` → wykonalny krok post-build (wzorzec react-snap / własny skrypt) generujący per-trasę HTML z treścią, poprawnym `<head>` i JSON-LD. Alternatywnie migracja do frameworka SSG (Astro/Next) — patrz sekcja 12.

---

### P0-4. Tożsamość marki i statyczne meta są nieaktualne i wewnętrznie sprzeczne
**Dowód (live, surowy HTML):** produkcja serwuje `index.html` mówiący o **„Starter 10", „paczki 4 i 8", „10 płynów", marka „Płyndo.pl"** — podczas gdy aplikacja (po JS) mówi **„PŁYN DO", „pakiety 4, 8 i 12", „12 produktów", producent „EmiChem"**.

Trzy nazwy walczą o tę samą encję:
| Gdzie | Nazwa |
|---|---|
| `index.html:24,40,48` (`<title>`, OG, Organization) | „Płyndo.pl" |
| `src/content.js:6` (brand, treść) | „PŁYN DO" |
| `src/components/layout/SchemaMarkup.jsx:22` (Organization) | „EmiChem" |

Do tego **dwa sprzeczne węzły `Organization`** (jeden statyczny w `index.html`, drugi wstrzykiwany Reactem) bez wspólnego `@id`/`sameAs`, oraz statyczny `ItemList` z **10** pozycjami zawierający **widmowy „Płyn do dezynfekcji"** (nie istnieje w katalogu) i pomijający 3 realne produkty (nabłyszczania, odkamieniania, udrażniania rur).

**Rekomendacja:** ustal jeden model encji (sekcja 8.2) i zsynchronizuj statyczny `<head>`:
- `Organization` = producent **EmiChem** (`legalName: "Michał Mierzwa EmiChem P.P."`), z adresem Poznań i telefonem.
- `Brand` = **PŁYN DO**.
- „Płyndo.pl" używać **wyłącznie** jako domeny/`url`, nigdy jako `name`.
- Naprawić `ItemList` (12 realnych pozycji, bez „dezynfekcji").

---

## 4. Wydajność (Core Web Vitals i transfer)

> Pełny audyt wydajnościowy potwierdził build lokalnie: `index-*.js` **507 kB (gzip 153 kB)** w jednym chunku, `index-*.css` 60.8 kB (gzip 12.5 kB), `hero-bg-*.png` **418 kB**. `dist` = 54 MB, `public` = 42 MB.

### 🔴 Krytyczne / 🟠 Wysokie

| # | Problem | Lokalizacja | Wpływ | Fix (skrót) |
|---|---|---|---|---|
| W1 | **Hero montuje 12× `<video src>` naraz**, bez `preload`/`poster`; aktywny auto-pobiera cały MP4, karuzela dociąga kolejne | `HeroSection.jsx:114-148`, `:25-27` | LCP >4 s na 4G, kilka–kilkanaście MB transferu bez interakcji, czarne tło do załadowania klatki | Renderuj tylko aktywny `<video>`, `preload="none"`, lekki `poster` (webp ~20-30 kB), pauza poza ekranem (IntersectionObserver) |
| W2 | **Brak code-splittingu** — cała apka + `framer-motion` + wszystkie strony w jednym chunku 507 kB | `App.jsx:13-19` | Wysoki TBT/INP, wolny TTI na mobile | `React.lazy` + `Suspense` per trasa → initial gzip 153 kB → ~95-110 kB |
| W3 | **Fonty przez `@import`** (Switzer w 8 wagach + Lora), render-blocking, **bez `preconnect`** | `src/index.css:1-2` | +400-1200 ms do FCP/LCP, FOIT | Self-host woff2 tylko używanych wag (Switzer 400/500/600/700, Lora italic 400/500), `font-display: swap`, `preload`; min.: usunąć `@import`, dać `preconnect` + nieblokujący `<link>` |
| W4 | **`hero-bg.png` 418 kB PNG** (LCP na `/dla-domu`, `/dla-firm`), bez wymiarów/responsywności | `HomeAudiencePage.jsx`, `BusinessPage.jsx` | Duży LCP/transfer | WebP/AVIF + resize do ~1200 px + `width`/`height` + `fetchpriority="high"` → ~40-70 kB (−85%) |
| W5 | **Wideo: 26 MB MP4 bez `+faststart`** (potwierdzone: atom `moov` nie na początku); `ProductPage` montuje dwa elementy tego samego klipu | `public/video/*`, `ProductPage.jsx:377,407` | Wolny start odtwarzania, duży transfer | Re-enkodować (`-movflags +faststart -crf 28`, ew. 720p) → ~6-9 MB; docelowo Cloudflare Stream/R2 |
| W6 | **~10 MB osieroconych assetów** w deployu: `public/fragrances/*` (6×1.1-1.5 MB = 7.4 MB, **nieużywane**), `vid_lazienka_2.mp4`, pliki `DSC*.webp` | `public/` | Niepotrzebny transfer/waga repo | Usunąć z `public/`. Uwaga: `optimize.mjs` konwertuje do WebP **bez zmiany wymiarów** — stąd „WebP" po 1.5 MB |
| W7 | **Brak `public/_headers`** — assety bez `immutable`/długiego cache na CF Pages | brak pliku | Gorsze powracające wczytania | Dodać `_headers` (gotowiec w sekcji 9.4) |

### 🟡 Średnie / 🟢 Niskie
- **Brak `loading="lazy"`/`width`/`height` na obrazach** (cały `src/**`): siatka 12 produktów (`ProductGridSection.jsx:75`), miniatury w dropdownie nav (`TopNav.jsx:95,178`), etykiety/butelki na stronie produktu → eager loading poniżej ekranu + ryzyko CLS.
- **QR jako PNG ~132 kB** dla małego podglądu (`QrPlaceholder.jsx`) — wyświetlać SVG lub mały PNG 256 px (~6-10 kB).
- **`framer-motion` w głównym chunku** — rozważyć `LazyMotion`/`m` albo CSS dla prostych `whileInView`.
- **N5 (perf+SEO):** `og:image`/`twitter:image` → `/labels/front-09-lazienki.png`, **który nie istnieje** (jest tylko `.webp`). Potwierdzone live: `.png` → **404**, `.webp` → 200. Podgląd w social = zepsuty obrazek.

### Szacunki przed/po
| Obszar | Przed | Po |
|---|---|---|
| Initial JS (gzip) | 153 kB (1 chunk) | ~95-110 kB + lazy chunki |
| Wideo auto-pobierane na home | ~5-10 MB | ~0 B (poster, on-demand) |
| `hero-bg.png` | 418 kB | ~40-70 kB WebP |
| Wideo (całość) | 26 MB | ~6-9 MB (lub Stream) |
| Osierocone assety | ~10 MB | 0 |

---

## 5. SEO

> Sekcja zweryfikowana statycznie i na żywo. Podsumowanie założeń: CSR ✅, brak SSR ✅, brak robots/sitemap ✅, meta tylko przez JS ✅, 2× Organization ✅, ItemList 10 vs 12 (+widmowy „dezynfekcji") ✅, slug-404 ✅.

### 🔴 Krytyczne (poza P0-2/P0-3/P0-4 wyżej)
- **Brak `robots.txt` (własnego) i `sitemap.xml`.** Live `robots.txt` zwraca domyślny plik Cloudflare z „content-signals" (ambiwalentny wobec AI) — projekt **nie kontroluje** własnego robots. Brak sitemap = jedyny pewny kanał zgłoszenia URL-i nie istnieje. Gotowce w sekcji 9.
- **Canonical zawsze `→ /` w surowym HTML** (`index.html:19`) → wszystkie podstrony jako duplikat home dla botów nierenderujących JS.

### 🟠 Wysokie
- **H1 produktów = jedno słowo bez frazy.** `ProductPage.jsx:304` robi `displayName.replace(/^PŁYN DO\s*/i,'')` → H1 brzmi „naczyń", „WC". Marka „PŁYN DO" jest tylko jako `<img alt>` nad H1. Tracisz najważniejsze frazy („płyn do naczyń"). **Fix:** H1 = pełna fraza, np. `Płyn do naczyń`.
- **Statyczny `<head>` nieaktualny** (Starter 10 / 10 płynów) — patrz P0-4.
- **Duplikacja URL:** 3 prefiksy produktu (`/product/`, `/produkt/`, `/produkty/`) wszystkie 200 + martwe `/pakiety/wybierz-sam-{4,8,12}` (klient robi `Navigate→/#pakiety`, `BundlePage.jsx:53-54`) = thin/duplikat. **Fix:** jeden prefiks kanoniczny, reszta 301; usunąć/301 `wybierz-sam-*`.
- **Strony placeholder indeksowalne** (`InfoPage.jsx`: regulamin, polityka, reklamacje, prasa dziedziczą `index,follow` z `index.html:14`) → thin content / soft-404. **Fix:** `noindex` do czasu uzupełnienia + wykluczyć z sitemap.
- **`hreflang`/EN deklarowane, ale niezaimplementowane.** `index.html:23` (`og:locale:alternate en_GB`) i `:63` (schema `inLanguage en`) obiecują EN, ale `content.js` ma **tylko `pl`** (sekcje home hardcode'ują polski). Przełączenie języka da częściowo polski UI, a deklaracje EN to fałsz wobec Google. **Fix:** albo realny EN z osobnymi URL-ami i `hreflang`, albo usunąć deklaracje EN.

### 🟡 Średnie
- Brak `BreadcrumbList` JSON-LD (UI okruszków jest — `Breadcrumbs.jsx` — schema nie).
- `FAQPage`/`Organization` wstrzykiwane Reactem (`SchemaMarkup.jsx`) → niewidoczne bez JS; przenieść do statycznego HTML/prerenderu.
- Meta `geo.region/placename/ICBM` (`index.html:15-17`) — Google ich nie używa; lokalizacja przez `PostalAddress` + Google Business Profile.
- `og:image` to losowy produkt („łazienki") jako wizytówka całej marki — dać dedykowany brandowy 1200×630.

---

## 6. GEO — Generative Engine Optimization (ChatGPT / Perplexity / Google AI Overviews / Gemini)

GEO to widoczność i **cytowalność** marki w odpowiedziach silników generatywnych. Tu sytuacja jest gorsza niż w klasycznym SEO, bo większość botów AI **nie wykonuje JavaScriptu**.

### Stan obecny: praktycznie zero
- Bot AI pobiera `https://plyndo.pl/` i widzi: pusty `<div id="root">` + nieaktualny `<head>` mówiący „Płyndo.pl / Starter 10 / 10 płynów". **To wszystko, co model „wie" o marce.**
- Tożsamość rozjechana (Płyndo.pl / PŁYN DO / EmiChem) → model nie potrafi ustalić, „kto to jest" i czego dotyczy.
- Brak `llms.txt`, brak treści w HTML, brak spójnych encji, strony produktowe na 404.

### Rekomendacje GEO (po naprawie P0)
1. **Prerender treści do HTML** (P0-3) — warunek konieczny; bez tego reszta GEO jest bezprzedmiotowa.
2. **Spójna, „cytowalna" tożsamość w HTML:** jedno zdanie-definicja na home i `/o-marce`, np. *„PŁYN DO to marka polskiej chemii gospodarczej produkowana przez EmiChem (Poznań), sprzedawana w pakietach 4, 8 i 12 butelek do domu i firmy."* Modele kochają zwięzłe, faktograficzne definicje encji.
3. **`llms.txt` + `llms-full.txt`** (gotowiec w sekcji 9.3) — mapa marki, produktów, FAQ, danych producenta w czystym Markdown.
4. **Polityka botów AI w `robots.txt`** — świadomie zdecyduj: chcesz być cytowany → **zezwól** GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended (gotowiec w 9.1).
5. **Treść faktograficzna i tabelaryczna:** składy (masz!), dozowanie (masz!), tabele porównawcze pakietów, FAQ w surowym HTML, zwroty CLP. To dokładnie materiał, który LLM-y wyciągają i cytują.
6. **Structured data w statycznym HTML** (Organization/Brand/Product/FAQ/Breadcrumb) — ułatwia modelom budowę grafu wiedzy.
7. **Spójny NAP + `sameAs`** (Google Business Profile, social, Allegro, katalogi B2B) — wzmacnia encję dla AI i lokalnego SEO.

---

## 7. Jakość kodu i dług techniczny (przegląd full-stack)

### 🔴 / 🟠 Istotne
- **Martwy kod, który powinien być na stronie:** `src/components/sections/TrustSection.jsx` i `src/components/sections/AiAssistantSection.jsx` **nie są nigdzie importowane** (potwierdzone grepem). Czyli strona główna **nie ma sekcji zaufania** ani **doradcy paczek** — mimo że oba komponenty są napisane. To strata podwójna: martwy kod *i* brakująca konwersja. Co gorsza, `TrustSection` jest **wadliwy**: czyta `copy[lang].heritage` (`TrustSection.jsx:4`), a w `content.js` nie ma klucza `heritage` → po zamontowaniu rzuciłby błędem renderu. Martwy jest też `src/components/DynamicBackground.jsx`. **Decyzja:** naprawić i zamontować w `App.jsx`/`HomePage` albo świadomie usunąć.
- **Sprzeczność danych vs UI w CTA:** model (`products.js:320-328`) mówi „CTA disabled / Wkrótce w sklepie", a komponenty linkują na żywo do martwej domeny (P0-1). Źródło prawdy powinno być jedno.
- **Niespójność slugów** (P0-2) to też dług w danych: `urlSlug` vs `slug` vs `_redirects`.
- **Przełączniki motyw / język / rozmiar fontu są w stanie, ale NIE w UI.** `App.jsx:65-69` przekazuje `setLang/setTheme/setFontScale` do `TopNav`, ale `TopNav.jsx:6` destrukturyzuje wyłącznie `{ activeTheme }` → settery są ignorowane. Skutek: **dark mode, PL/EN i skala fontu są dla użytkownika nieosiągalne** (zostaje `system`/PL/`md`). To jednocześnie martwe propsy *i* regres dostępności. **Fix:** podpiąć kontrolki w UI albo usunąć nieużywany stan.
- **Prop-drilling stanu globalnego** (`lang`, `theme`, `fontScale`) z `App.jsx` przez wiele warstw. `lang` przekazywany jest niekonsekwentnie (np. `<HomePage lang={lang}>` w `App.jsx:74`, ale `HomePage()` w `:29` go nie przyjmuje → ignorowany; sekcje home czytają `copy.pl` na sztywno). **Fix:** `Context` (Theme/Lang/FontScale) zamiast drillingu.
- **Tryb EN jest połowiczny i latentnie wywróciłby apkę:** `content.js` eksportuje `copy` tylko z kluczem `pl`, a `RouteEffects.jsx:16-17` i `HeroSection.jsx:7-8` indeksują `copy[lang]` bez zabezpieczenia. Gdyby `lang==='en'`, `copy['en']` = `undefined` → `TypeError` (biały ekran, bo brak `ErrorBoundary`). Dziś „nie wybucha" tylko dlatego, że brak przełącznika języka (patrz wyżej). **Fix:** `const base = copy[lang] ?? copy.pl;` + decyzja: dokończyć EN (dodać `copy.en`, podpiąć `lang` do `Footer/AboutPage/StoreButton/TopNav`) albo usunąć gałęzie EN.

### 🟡 Średnie
- **Brak `ErrorBoundary`** — `calculateBundlePricing` rzuca `RangeError` przy nieznanym slugu (`bundlePricing.js:116`) i jest wołane w renderze wielu komponentów (`PlansSection`, `BundlePage`, `HomeAudiencePage`, `BusinessPage`). Bez `ErrorBoundary` (nie ma go w `main.jsx`/`App.jsx`) dowolny błąd danych = biały ekran zamiast degradacji. **Fix:** `ErrorBoundary` wokół `<Routes>` + fallback w kartach pakietów.
- **Brak realnego 404 w React** — `App.jsx:83` (`/:page`) to catch-all → `InfoPage`, który dla nieznanej strony robi `Navigate to="/"` (a `ProductPage`/`BundlePage` → `/#pakiety`). Niespójnie z `_redirects` (ścieżki spoza listy → statyczny `404.html`). Brakuje świadomej trasy `*` → komponent 404 z własnym `<title>`.
- **`dangerouslySetInnerHTML` bez ucieczki `</script>`** w `SchemaMarkup.jsx:38-45` — dane są dziś statyczne (`copy.pl.faq`), więc ryzyko XSS niskie, ale sekwencja `</script>` w treści potrafi wyłamać się ze skryptu. **Fix:** `JSON.stringify(x).replace(/</g, '\\u003c')`. (Komponent dodatkowo zawsze używa `copy.pl`, ignorując `lang`.)
- **Duplikacja progów rabatu (DRY):** 30/40/50% w ≥4 miejscach — `bundles.js:3-19` (`bundleDiscountRules`), `bundlePricing.js:3-7` (`packageDiscountTiers`), zaszyte `discount={30/40/50}` w `PlansSection`, oraz magiczne `listPrice * 0.5` („cena w 12×") w `ProductGridSection.jsx:96`, `HomeAudiencePage.jsx:19`, `BusinessPage.jsx:62`. **Fix:** jedno źródło + helper zamiast `* 0.5`.
- **Duplikacja komponentów kart (DRY):** `BundleCard` (`HomeAudiencePage`) ≈ `BusinessBundle` (`BusinessPage`) ≈ `BundleCard` (`PlansSection`); `ProductPill` ≈ `ProductLine`. **Fix:** wspólne `<BundleCard>`/`<ProductPill>` w `src/components/`.
- **Pozostałości boilerplate / sieroty:** `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png` (nieużywany — w grze jest `hero-bg.png`), `public/gallery.html` (sierota, ląduje publicznie na deployu), `.DS_Store` w repo, katalog `_stitch_import/`.
- **Dryf tokenów designu** (dwa źródła prawdy): `tailwind.config.js:18` ma `rinse #a692c6` (fiolet), a `src/index.css:41` `--label-rinse-bg: #f37b91` (róż, zgodny z `products.js`); różni się też rampa neutralna (`tailwind.config.js` `n-50 #f6f4ef` vs `index.css` `--n-50 #faf9f6`). Komentarz w configu mówi „keep in sync" — nie są. **Fix:** jedno źródło tokenów.
- **Dane jakościowo niedopracowane:** `scent` bywa nie-zapachem (np. `zmywarki.scent = 'Nabłyszczacz'`, `plukania.scent = 'O zapachu Wooly Blizz'`), część zwrotów bezpieczeństwa urwana („…"). Dla chemii to istotne (patrz sekcja 11/zgodność).
- **`listPriceStatus: 'dummy'`, `volume.status: 'dummy'`** — ceny i pojemności to placeholdery; nie publikować jako realnych ofert (Product/Offer schema) dopóki nie są prawdziwe.

### 🟢 Drobne (do czyszczenia)
- **Trasy `/pakiety/wybierz-sam-*` są martwe** — `BundlePage` natychmiast przekierowuje pakiety `isCustomizable` na `/#pakiety` (`BundlePage.jsx:53-55`); realny konfigurator to `/pakiety/wlasna-paczka/:size`.
- **`changeCount` korzysta z nieświeżego `itemCount` z domknięcia** (`CustomBundlePage.jsx:57-62`) — przy szybkich kliknięciach teoretycznie można przekroczyć `size`. **Fix:** liczyć sumę z `current`.
- **Martwy ternary** — `qrTargetUrl: kind === 'product' ? … : …` ma identyczne gałęzie (`products.js:463`).
- **`bundleDiscountRules.komplet12` dubluje `box12`** (oba 0.5) (`bundles.js:4-19`).
- **`ValueSection` eyebrow dubluje H2** („Dlaczego warto…" dwa razy) — prawdopodobnie miało być `content.eyebrow` (`ValueSection.jsx:13-17`).
- **`resolveActiveTheme` czyta `matchMedia` w renderze bez nasłuchu** (`App.jsx:22-27`) — zmiana motywu OS w trakcie sesji nie odświeży UI.

### Higiena procesu (DX)
- Brak testów (logika cen w `bundlePricing.js` aż się prosi o testy jednostkowe), brak CI, brak Prettiera, brak hooka pre-commit. `.DS_Store` powinien wpaść do `.gitignore` (jest tam wzorzec, ale pliki były commitowane wcześniej).
- **ESLint nie lintuje `.mjs`** — glob `**/*.{js,jsx}` pomija `optimize.mjs`/`scripts/*.mjs` (używają `process`/`Buffer`); dodatkowo rozjazd `ecmaVersion: 2020` vs `parserOptions: 'latest'` (`eslint.config.js:17,20`). **Fix:** dodać `.mjs` do glob + blok z `globals.node`.
- `npm run lint` / `npm run build` — uruchom w CI jako bramki jakości. **Status: oba przechodzą czysto** (build ostrzega tylko o chunku >500 kB).

---

## 8. Dane strukturalne (JSON-LD) — co naprawić

### 8.1 Problemy
- Dwa niepołączone `Organization` o różnych nazwach (P0-4).
- `ItemList` 10 pozycji + widmowy „dezynfekcji" (`index.html:67-83`).
- Brak `Product`, `BreadcrumbList`; `FAQPage` tylko przez JS.
- Nie dodawać `Offer` z cenami dummy ani `AggregateRating` bez realnych opinii (Google karze fałszywe znaczniki).

### 8.2 Docelowy graf encji (do statycznego `<head>` / prerenderu)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://plyndo.pl/#emichem",
      "name": "EmiChem",
      "legalName": "Michał Mierzwa EmiChem P.P.",
      "url": "https://plyndo.pl/",
      "logo": "https://plyndo.pl/logo-black.svg",
      "address": {"@type": "PostalAddress", "streetAddress": "ul. Wójtowska 16", "postalCode": "61-654", "addressLocality": "Poznań", "addressCountry": "PL"},
      "contactPoint": {"@type": "ContactPoint", "contactType": "sales", "email": "kontakt@plyndo.pl", "telephone": "+48-XXX-XXX-XXX", "areaServed": "PL", "availableLanguage": "pl"},
      "sameAs": ["https://www.facebook.com/...", "https://allegro.pl/uzytkownik/..."]
    },
    {
      "@type": "Brand",
      "@id": "https://plyndo.pl/#brand",
      "name": "PŁYN DO",
      "manufacturer": {"@id": "https://plyndo.pl/#emichem"}
    },
    {
      "@type": "WebSite",
      "@id": "https://plyndo.pl/#website",
      "url": "https://plyndo.pl/",
      "name": "PŁYN DO",
      "inLanguage": "pl-PL",
      "publisher": {"@id": "https://plyndo.pl/#emichem"}
    }
  ]
}
```
Per produkt (po naprawie URL i cen) dodać `Product` z `brand`, `manufacturer`, `category`, opisem i `image`; `Offer` dopiero gdy ceny będą realne. Per strona — `BreadcrumbList`.

---

## 9. Gotowe pliki do wdrożenia (deliverables)

### 9.1 `public/robots.txt`
```
User-agent: *
Allow: /

# Boty AI — świadoma zgoda na cytowanie marki w odpowiedziach generatywnych
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: https://plyndo.pl/sitemap.xml
```

### 9.2 `public/sitemap.xml` (szkielet — generować skryptem z `products.js`/`bundles.js`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://plyndo.pl/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://plyndo.pl/dla-domu</loc></url>
  <url><loc>https://plyndo.pl/dla-firm</loc></url>
  <url><loc>https://plyndo.pl/o-marce</loc></url>
  <!-- 12x produkt (kanoniczny dlugi slug) -->
  <url><loc>https://plyndo.pl/produkt/plyn-do-naczyn</loc></url>
  <!-- ...pozostale 11 produktow... -->
  <!-- pakiety gotowe (komplet-12, dom-*, firma-*) -->
  <url><loc>https://plyndo.pl/pakiety/komplet-12</loc></url>
  <!-- NIE umieszczac: placeholderow (regulamin/polityka/reklamacje/prasa) ani wybierz-sam-* -->
</urlset>
```

### 9.3 `public/llms.txt` (GEO)
```markdown
# PŁYN DO (plyndo.pl)

> PŁYN DO to marka polskiej chemii gospodarczej produkowana przez EmiChem (Poznań),
> sprzedawana w pakietach 4, 8 i 12 butelek do domu i firmy. Im większy pakiet,
> tym niższa cena za butelkę (rabat 30/40/50% dla całej paczki).

## Producent
- Firma: Michał Mierzwa EmiChem P.P., ul. Wójtowska 16, 61-654 Poznań, Polska
- Kontakt: kontakt@plyndo.pl

## Produkty (12)
- Płyn do naczyń, do zmywarki, do prania, do płukania, do podłóg, do WC,
  do mycia rąk, do mycia szyb, do łazienki, do nabłyszczania, do odkamieniania, do udrażniania rur

## Pakiety
- Gotowe zestawy do domu i firmy oraz „Wybierz sam" 4 / 8 / 12 butelek.

## FAQ
- (przeniesione z sekcji FAQ — pytania i odpowiedzi w czystym tekście)
```

### 9.4 `public/_headers` (cache na Cloudflare Pages)
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/video/*
  Cache-Control: public, max-age=2592000
/labels/*
  Cache-Control: public, max-age=2592000
/images/*
  Cache-Control: public, max-age=2592000
/qr/*
  Cache-Control: public, max-age=2592000
```

---

## 10. UX, design i dostępność (WCAG 2.2)

### Design — mocne strony
- Spójny, „edytorialny" system (Switzer + Lora), dobra hierarchia, elegancki tryb dark, przemyślane tokeny. Wizualnie marka wygląda **premium** — to realny atut.

### 🟠 Dostępność (WCAG)
- **Kontrast poniżej AA:** `--color-fg-subtle: #8a8986` na białym ≈ **3.4:1** (norma 4.5:1 dla tekstu). Używany szeroko (`text-fg-subtle`: ceny, metadane, podpisy, często 11 px). W dark mode `#7a7874` ≈ 4.0:1 — też zbyt nisko. **Fix:** przyciemnić subtle do ~`#6b6a67`.
- **Kontrast kolorowych akcentów (twardy fail):** w hero wyraz „w pakietach" jest barwiony kolorem aktywnego SKU na białym tle (`HeroSection.jsx:57`) — dla jasnych produktów np. laundry `#a5c7eb` ≈ **1.76:1**, WC `#e0e0e0` ≈ 1.2:1 (fail nawet dla dużego tekstu). Pigułki z białym tekstem na jasnym akcencie (`PlansSection.jsx:63,71,100`, pakiet 12× na rinse `#f37b91`) ≈ **2.4:1**. Chip zapachu `color/borderColor: product.color.bg` (`ProductPage.jsx:343`) bywa nieczytelny. **Fix:** ciemniejsze warianty akcentów dla tekstu lub tekst na ciemnym tle.
- **Linki bez nazwy dostępnej:** w `CustomBundlePage.jsx:172-178` i kafelkach siatki `<Link>` opakowuje tylko `<img alt="">` (pusty alt) → link nie ma tekstu dla czytnika ekranu. **Fix:** dodać `aria-label` na linku lub sensowny `alt`.
- **`aria-label` z `undefined`:** przyciski +/- w kreatorze używają `product.shortName` w `aria-label` — to pole istnieje, ale warto potwierdzić, że zawsze ustawione (inaczej „Dodaj undefined").
- **Brak `prefers-reduced-motion`:** `framer-motion` animuje wejścia w wielu miejscach + autorotujące wideo/karuzela; brak respektu dla preferencji ograniczenia ruchu (WCAG 2.3.3). **Fix:** globalny `@media (prefers-reduced-motion: reduce)` + `useReducedMotion()` z framer-motion.
- **Menu mobilne/dropdown:** `aria-expanded` jest (dobrze), ale brak zamykania `Esc`, brak `aria-controls`, brak focus-trapu w otwartym menu; hamburger bez `aria-expanded` (`TopNav.jsx:138-145`).
- **Auto-karuzela bez dostępnej pauzy (WCAG 2.2.2):** hero rotuje co 5 s (`HeroSection.jsx:29-34`), pauza tylko na `mouseenter/leave` (`:110-111`) → niedostępna z klawiatury i dotyku; `LabelSlideshow` auto-przewija co 3800 ms (`ProductPage.jsx:175-179`). **Fix:** przycisk pauzy + respekt `prefers-reduced-motion`.
- **Brak skip-linku i klasy `sr-only` (WCAG 2.4.1):** nawigacja jest `fixed`/powtarzalna, brak „Przejdź do treści"; brak też definicji `.sr-only` w `index.css`.
- **Focus-visible niewidoczny (WCAG 2.4.7):** token `--color-border-focus` jest **zdefiniowany, ale nieużywany** (`index.css:104,212`); elementy polegają na domyślnym ringu, słabo widocznym na kolorowych tłach. **Fix:** globalny `:focus-visible` na bazie tego tokenu.
- **FAQ bez semantyki akordeonu:** przyciski pytań nie mają `aria-expanded`/`aria-controls`, pytania nie są nagłówkami (`FaqSection.jsx:30-39`). **Fix:** `<h3><button aria-expanded aria-controls>`.
- **Modal QR bez zarządzania fokusem:** jest `role="dialog" aria-modal` (`QrPlaceholder.jsx:32`), ale brak focus-trapu, `Esc`, powrotu fokusu i zamykania kliknięciem tła.
- **`<h1>` produktu zubożony:** po usunięciu „PŁYN DO" nagłówek to np. „naczyń" (`ProductPage.jsx:354-364`) zamiast pełnego „Płyn do naczyń" — słabe dla SR i SEO.

### 🟡 UX / IA
- **Brak przełączników motyw/język/font w UI** (są w stanie, `TopNav` ich nie odbiera) — patrz sekcja 7. Deklarowane funkcje de facto nie istnieją dla użytkownika.
- **Brak sekcji zaufania i doradcy na stronie** (martwy/wadliwy `TrustSection`, niezamontowany `AiAssistantSection`) — patrz sekcja 7.
- **Konfigurator wypuszcza niepełną paczkę z pełnym rabatem:** `CustomBundlePage` nie wymaga `itemCount === size`; rabat (np. −50%) liczony już przy 1/12 produkcie (`CustomBundlePage.jsx:36,167` + `bundlePricing.js:155-165`). Sprzeczne z zasadą „rabat za pełną paczkę" i mylące. **Fix:** rabat dopiero po skompletowaniu rozmiaru + jasny licznik „dobierz jeszcze N".
- **Niespójne cele CTA dla tej samej intencji:** `TopNav` „Sklep" → root sklepu, hero/`PlansSection` → `/kategoria/pakiety`, `StoreButton` → root **bez przekazania składu i rabatu** (`StoreButton.jsx:7`), choć UI obiecuje „koszyk z tym składem" (`BundlePage.jsx:120-127`). Cały wysiłek konfiguracji paczki przepada.
- **Stany puste/błędów:** nieznany produkt → `Navigate to="/"` (cicha utrata kontekstu zamiast strony 404 z treścią).
- **Footer niekompletny:** brak linku **/reklamacje** (trasa istnieje), brak e-maila, telefonu i NIP (`Footer.jsx:16-25`) — to typowe miejsce sygnałów zaufania.
- **Mega-menu 760 px** (`TopNav.jsx:82`, `-translate-x-1/2`) może wychodzić poza viewport na laptopach 1280–1366 px.
- **Nawigacja:** miks tras hash (`/#pakiety`) i realnych (`/dla-domu`) bywa mylący przy wejściu bezpośrednim; po prerenderze warto, by `/#pakiety` miało odpowiednik strony.
- **Spójność nazwy:** w `InfoPage`/Footer marka miesza „Płyndo.pl" i „PŁYN DO" — ujednolicić w treści UI.

---

## 11. Marketing i sprzedaż — perspektywa branży chemii gospodarczej

> Patrzę na to jak specjalista marketingu/sprzedaży chemii gospodarczej (D2C + B2B). Model „pakiet zamiast przypadkowego koszyka" jest **dobry i różnicujący** — ale obecna realizacja nie buduje zaufania ani nie domyka sprzedaży.

### 11.1 Lejek jest przerwany (najważniejsze)
Nie ma znaczenia, jak dobry jest copy, skoro **nie da się kupić** (P0-1) i strony produktów **są na 404** (P0-2). Priorytet #1 marketingowy = uruchomić sklep albo przechwytywać leady (newsletter/„powiadom o starcie") **już teraz**, żeby nie marnować ruchu i budżetu.

### 11.2 Brak trust signals (krytyczne dla chemii)
Klient kupujący chemię do domu/firmy chce wiedzieć, że to bezpieczne i sprawdzone. Brakuje (a `TrustSection` nawet nie jest wyświetlany!):
- **Karty charakterystyki (SDS) / pełne składy i zwroty CLP** — masz dane w `products.js`, wyeksponuj je (to też świetny content SEO/GEO i wymóg dla B2B).
- **Dowody jakości:** „polski producent 40+ lat", certyfikaty, badania dermatologiczne, atesty PZH (jeśli są), zgodność z rozporządzeniami (detergenty 648/2004/WE).
- **Opinie/oceny** (social proof) — dziś zero. Dodać recenzje produktów i pakietów.
- **Gwarancja satysfakcji / zwroty / dostawa 1 dzień** — eksponowane jako odznaki przy CTA.
- **Logo klientów B2B / case studies** dla segmentu „Dla firm".
- **Dane firmy + telefon** — dziś tylko `kontakt@plyndo.pl`. Brak telefonu mocno obniża zaufanie B2B.

### 11.3 Pozycjonowanie ceny i ryzyko Omnibus
- „−50% w paczce 12" przy `listPrice` oznaczonym jako **dummy** to podwójny problem: (1) prawnie — dyrektywa **Omnibus** wymaga pokazywania najniższej ceny z 30 dni i zakazuje fikcyjnych cen referencyjnych; (2) marketingowo — stały „−50%" uczy klienta, że „prawdziwa" cena to połowa, co **eroduje pozycjonowanie premium**, które budujesz designem.
- **Rekomendacja:** zamiast „przekreślona cena −50%" komunikuj **wartość pakietu** („cena za butelkę spada z X do Y przy 12 szt.") i realne kotwice. Ustal prawdziwe ceny przed publikacją ofert/Offer schema.

### 11.4 Dźwignie wzrostu (po naprawie podstaw)
- **Subskrypcja/auto-dostawa** — chemia to produkt powtarzalny (consumable); dziś FAQ wprost mówi „nie oferujemy abonamentów". To zostawia największą dźwignię LTV na stole. Rozważ opcjonalny „re-order co X tygodni".
- **B2B/hurt:** osobna ścieżka (faktura VAT, większe opakowania 5 L/kanister, progi rabatowe ilościowe, stała obsługa, zapytanie ofertowe). Segment „Dla firm" jest, ale bez realnej oferty hurtowej.
- **Bundling pod „job-to-be-done":** masz dobre gotowe zestawy (Dom Codzienny, Firma Gastro) — wyeksponuj je mocniej z nazwami korzyściowymi i „dla kogo".
- **Content/SEO niszowy:** poradniki dozowania, „czym myć X", bezpieczeństwo, porównania z markami — pod long-tail i GEO.

### 11.4a Wiarygodność i spójność narracji (ryzyko zaufania)
- **Sprzeczna historia producenta / „od 1984":** `AboutSection.jsx:18` mówi „marka stworzona przez EmiChem… od 1984", `AboutPage.jsx:61-64` „produkowana **dla EmiChem przez JAX Professional**… od 1984", `content.js:40` „powstaje w zakładach EmiChem", a hero „40+ lat doświadczenia producenta". Czytelnik nie wie, kto ma 40 lat i kto produkuje. **Fix:** jedna narracja (zgodnie z regułą: JAX tylko na „O marce").
- **Stockowe zdjęcie jako własna produkcja:** `AboutSection.jsx:44` hotlinkuje generyczne laboratorium z Unsplash, podpisane „Produkcja w Polsce / EmiChem od 1984". Ryzyko wiarygodności + zależność/perf/prywatność. **Fix:** realne zdjęcie zakładu albo usunięcie podpisu.
- **Niespójna marka:** „PŁYN DO" / „Płyndo" / „Płyndo.pl" / „EmiChem" używane wymiennie. Ustal: marka **PŁYN DO**, serwis **plyndo.pl**, producent **EmiChem** — i trzymaj konsekwentnie (też w danych strukturalnych, patrz konflikt Organization w sekcji SEO).

### 11.5 Mapa fraz kluczowych (PL, nisza chemii gospodarczej)
| Intencja | Przykładowe frazy | Strona docelowa |
|---|---|---|
| Transakcyjne (produkt) | „płyn do naczyń", „płyn do zmywarki", „płyn do WC", „nabłyszczacz do zmywarki" | strony produktów (z poprawionym H1) |
| Transakcyjne (pakiet/hurt) | „chemia gospodarcza pakiet", „środki czystości do firmy", „płyn do naczyń hurt", „chemia do biura" | `/dla-firm`, pakiety |
| Producent / marka | „polski producent chemii gospodarczej", „chemia gospodarcza od producenta" | home, `/o-marce` |
| Informacyjne | „ile płynu do zmywarki", „czym myć panele", „bezpieczne środki czystości" | blog/poradniki (do stworzenia) |
| Lokalne | „chemia gospodarcza Poznań", „producent środków czystości Poznań" | home + Google Business Profile |

---

## 12. Czego brakuje / rekomendacja strategiczna co do stacku

**Brakujące elementy oczekiwane na profesjonalnym sklepie chemii gospodarczej:**
działający sklep/koszyk, telefon i pełne dane firmy, regulamin + polityka prywatności + RODO + cookie-consent, karty charakterystyki/SDS, opinie, sitemap/robots, prerender, działające kody QR, faktura VAT/B2B, newsletter, blog/poradniki, realne ceny.

**Decyzja architektoniczna (rekomendacja):**
Obecny CSR-SPA jest złym wyborem dla strony, której KPI to widoczność w Google i AI oraz sprzedaż. Dwie drogi:
- **Minimalna (szybka):** zostań na Vite + React, ale **dodaj prerender** (puppeteer/react-snap), `_headers`, code-splitting, napraw routing i assety. Odblokowuje SEO/GEO niskim kosztem.
- **Docelowa (rekomendowana):** migracja do **Astro** (idealne dla content/marketing — zero/minimal JS, natywny SSG, świetny CWV) lub **Next.js** (jeśli planujesz dynamiczny commerce/headless Shoper). Komponenty React i system designu są przenośne.

---

## 13. Plan działania (priorytety)

### P0 — zanim cokolwiek innego (dni, nie tygodnie)
1. **Napraw/zastąp CTA do sklepu** (P0-1) — realny sklep lub przechwytywanie leadów; respektuj `cta.status`.
2. **Napraw routing produktów + catch-all `_redirects`** (P0-2) — odblokuj 12 stron i kody QR.
3. **Wdróż prerender/SSG** (P0-3) — treść i `<head>` widoczne dla Google i AI.
4. **Ujednolić markę + naprawić statyczny `<head>` i JSON-LD** (P0-4).

### P1 — wysoki wpływ (1-2 tygodnie)
5. `robots.txt` + `sitemap.xml` + `noindex` placeholderów + 301 duplikatów URL.
6. Wydajność: code-splitting, hero tylko aktywne wideo + `poster`, fonty self-host/preconnect, `hero-bg` → WebP, `_headers`, usunięcie ~10 MB orphanów, `loading="lazy"`+wymiary obrazów.
7. Napraw `og:image` (`.png`→istniejący plik 1200×630) i podgląd social.
8. Zamontuj lub usuń `TrustSection`/`AiAssistantSection`; dodaj realne trust signals.
9. Strony prawne: Regulamin, Polityka prywatności (RODO), Reklamacje, cookie-consent.

### P2 — GEO, lokalne, treść (2-4 tygodnie)
10. `llms.txt`/`llms-full.txt`, structured data per produkt (Product/Breadcrumb), cytowalne fakty w HTML.
11. Spójny NAP + telefon + Google Business Profile + `sameAs`.
12. Naprawa/ukrycie EN (hreflang vs realny EN); poprawa H1 produktów; dostępność (kontrast, reduced-motion, nazwy linków).

### P3 — wzrost (ongoing)
13. Subskrypcja/auto-dostawa, ścieżka B2B/hurt, blog/poradniki + SDS, opinie, testy jednostkowe `bundlePricing`, CI.

---

## 14. Załącznik — kluczowe referencje plików

| Temat | Plik:linia |
|---|---|
| CSR / brak prerendera | `src/main.jsx:7-13`, `index.html:88-90` |
| Meta tylko przez JS | `src/components/layout/RouteEffects.jsx:102-119` |
| Canonical zawsze `/` | `index.html:19` |
| Slug produktu (404) | `src/data/products.js:446-452`, `public/_redirects:13-24` |
| Martwa domena sklepu | `HeroSection.jsx:71`, `StoreButton.jsx:7`, `TopNav.jsx:127,195` |
| CTA disabled w danych | `src/data/products.js:320-328` |
| 2× Organization / marka | `index.html:45-57`, `src/components/layout/SchemaMarkup.jsx:19-34`, `src/content.js:6` |
| ItemList 10 + „dezynfekcji" | `index.html:67-83` |
| H1 produktu = 1 słowo | `src/pages/ProductPage.jsx:304,359-364` |
| Hero 12× wideo | `src/components/sections/HeroSection.jsx:114-148` |
| Fonty @import | `src/index.css:1-2` |
| Brak code-splittingu | `src/App.jsx:13-19` |
| Martwy kod (trust/advisor) | `src/components/sections/TrustSection.jsx`, `AiAssistantSection.jsx` |
| Strony-placeholdery | `src/pages/InfoPage.jsx:5-8,34-75` |
| Kontrast subtle | `src/index.css:99,208` |

---

*Raport przygotowany w trybie read-only: audyt wieloagentowy (wydajność + SEO/GEO) wsparty analizą własną i weryfikacją produkcji na żywo. Następny krok rekomendowany: implementacja P0 w kolejności 1→2→3→4.*
