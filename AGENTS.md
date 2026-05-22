# AGENTS.md (Plyndo.pl)

Cel projektu: premium landing page i dokumentacja sprzedaży chemii gospodarczej na rynek polski w gotowych pakietach i paczkach własnych.

## Aktualny zakres produktu
- Jedynym zakresem sprzedażowym landingu są gotowe pakiety i paczki własne.
- Landing pokazuje produkty, paczki `4` i `8`, aktualny `Starter 10` oraz docelową migrację do `Starter 12`.
- Bieżące CTA do Shopera jest nieaktywnym placeholderem; docelowo gotowy pakiet i paczka własna przekazują do Shopera pełny skład koszyka oraz rabat pakietowy.
- Ceny produktów są referencyjne. Rabat i oszczędność komunikujemy tylko globalnie dla paczki.
- Publiczna referencja do `JAX Professional` należy tylko do strony `O marce`; nie powielaj jej w hero, trust, footerze ani na każdej stronie produktu.

## Stack & Commands
- Stack: React, Vite, Tailwind CSS v4 (`@tailwindcss/vite`)
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

---
> [!IMPORTANT]
> **PLANNING RULE:** Nie wprowadzaj zmian i nie pisz kodu, dopóki nie masz co najmniej 95% pewności, co należy zbudować; najpierw eksploruj kod, zadawaj pytania doprecyzowujące i wielokrotnie weryfikuj założenia.
---

## Referencje (Progressive Disclosure)
- `@CODEX.md` - zasady pracy Codex i profile orchestrator/advisor/workers.
- `@CLAUDE.md` - zasady wspólne dla przepływu Claude w tym repo.
- `@docs/agents/style_guide.md` - kierunek wizualny, ton marki i zasady UI.
- `@docs/agents/product_constraints.md` - granice zakresu MVP, ownership plików, out-of-scope.
- `@docs/agents/testing_rules.md` - minimalny workflow testów i walidacji.
- `@docs/agents/api_conventions.md` - konwencje API i integracji (dla przyszłych rozszerzeń).
- `@docs/agents/handoff.md` - zarządzanie kontekstem, handoff i kompresja historii.
