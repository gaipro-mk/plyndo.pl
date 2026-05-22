# CLAUDE.md — Płyndo.pl (Claude Code)

**CEL:** Premium landing page + dokumentacja sprzedaży pakietowej chemii gospodarczej (Polska).

## Stack & Commands
- React + Vite + Tailwind CSS v4 (`@tailwindcss/vite`)
- `npm install` | `npm run dev` | `npm run build` | `npm run preview` | `npm run lint`
- App UI: `src/App.jsx` · Styl: `src/index.css` · Config: `vite.config.js`

## Aktualny zakres produktu
- Jedynym zakresem sprzedażowym landingu są gotowe pakiety i paczki własne.
- Oferta landing page'a opiera się na pakietach gotowych, paczkach własnych `4` i `8`, aktualnym `Starter 10` oraz docelowym `Starter 12`.
- Pokazuj ceny referencyjne produktów, ale rabat i oszczędność tylko dla całej paczki.
- Obecne CTA do Shopera jest nieaktywnym placeholderem; docelowo gotowy pakiet i paczka własna przekazują pełny skład koszyka oraz rabat pakietowy.
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
