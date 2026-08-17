# CLAUDE.md — Płyndo.pl (Claude Code)

**CEL:** Premium landing page + dokumentacja sprzedaży pakietowej chemii gospodarczej (Polska).

## Stack & Commands
- React + Vite + Tailwind CSS v4 (`@tailwindcss/vite`)
- `npm install` | `npm run dev` | `npm run build` | `npm run preview` | `npm run lint`
- App UI: `src/App.jsx` · Styl: `src/index.css` · Config: `vite.config.js`

## Aktualny zakres produktu
- Jedynym zakresem sprzedażowym landingu są gotowe pakiety i paczki własne (4, 8 oraz 12 sztuk).
- Katalog produktów: 12 fizycznych produktów (stockId 182–193).
- Rabaty pakietowe: Paczka 4 (−20%), Paczka 8 (−30%), Paczka 12 (−40%).
- Pokazuj ceny referencyjne produktów, ale rabat i oszczędność tylko dla całej paczki.
- Przekazanie do Shopera: protokół v2 (WebAPI multi-item handoff + kupon `PLYNDO-PACK-*`). Twarda blokada na Shoperze poza 4/8/12 sztuk.
- `JAX Professional` może być publicznie przywołane tylko na stronie `O marce`, nie w hero, trust, footerze ani na każdej stronie produktu.

## Hierarchia Modeli (Claude Code)

| Profil | Model | Rola | Użycie |
|---|---|---|---|
| **domyślny** | Sonnet 4.6 | Orkiestrator | Codzienne zadania, PR-y, planowanie |
| `advisor` | Opus 4.7 | Architekt (read-only) | Audyty, złożona architektura |
| `worker-haiku` | Haiku 4.6 | Worker/Subagent | Boilerplate, testy, formatowanie |

> **Opus Advisor NIE pisze kodu.** Zwraca plany i rekomendacje → Sonnet implementuje.

---

> [!IMPORTANT]
> **PLANNING RULE:** Nie wprowadzaj zmian w kodzie, dopóki nie masz ≥95% pewności co do zakresu.
> Eksploruj kod, zadawaj pytania, weryfikuj założenia — zanim przejdziesz do implementacji.

---

## Zasady Tokenów i Kontekstu
- Monitoruj okno kontekstowe; przy ~60% pojemności zacznij aktywne podsumowania.
- Logi bash: max 200 linii na wywołanie. Dłuższe logi → zapisuj do pliku, czytaj fragmenty.
- Unikaj poleceń generujących gigantyczne outputy bez `| head -n 200` lub redirect do pliku.

## Sekrety i Bezpieczeństwo
- Nigdy nie czytaj `.env*`, `secrets/**`, `*.pem`, `*.key`.
- Sekrety nie powinny w ogóle trafiać do repo.

## Dokumentacja Szczegółowa (Progressive Disclosure)
Czytaj te pliki TYLKO gdy potrzebujesz konkretnych wytycznych:

- `@docs/agents/style_guide.md` — paleta barw, brand tone, design direction
- `@docs/agents/product_constraints.md` — granice MVP, ownership plików, out-of-scope
- `@docs/agents/handoff.md` — zarządzanie kontekstem, co logować, jak tworzyć handoff
