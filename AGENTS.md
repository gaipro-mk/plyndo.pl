# AGENTS.md (Plyndo.pl — Gemini CLI & Claude Code Index)

CEL PROJEKTU: Premium landing page i dokumentacja dla koncepcji subskrypcji chemii gospodarczej w Polsce.

## Stack & Commands
- Stack: React, Vite, Tailwind CSS v4 (`@tailwindcss/vite`)
- `npm install` | `npm run dev` | `npm run build` | `npm run preview` | `npm run lint`

## Hierarchia Modeli — Gemini CLI (Antigravity)
- Domyślny model: `low-pro` (Gemini 3 Pro, low reasoning) — rutynowe zadania.
- Profil `orchestrator`: Gemini Pro 3.1 High — planowanie, architektura, delegacja.
- Profil `advisor`: Gemini Pro 3.1 High — audyty, analiza. BEZ pisania kodu.
- Profil `flash-worker`: Gemini 3 Flash — szybkie, powtarzalne taski.

## Hierarchia Modeli — Claude Code
- Domyślny: **Sonnet 4.6** — orkiestrator do codziennych zadań.
- Profil `advisor`: **Opus 4.7** — tylko analiza i architektura, NIE pisze kodu.
- Profil `worker-haiku`: **Haiku 4.6** — boilerplate, testy, formatowanie.
- Szczegóły: `@CLAUDE.md`

---
> [!IMPORTANT]
> **PLANNING RULE:** Nie wprowadzaj żadnych zmian w kodzie, dopóki nie poznasz kodu i wymagań na tyle,
> aby mieć co najmniej 95% pewności, co trzeba zbudować. Zawsze zadawaj pytania doprecyzowujące
> i kilkukrotnie weryfikuj swoje założenia, zanim przejdziesz z trybu planowania do implementacji.
---

## Dokumentacja / Zasady Szczegółowe (Progressive Disclosure)
Przeczytaj poniższe pliki podrzędne TYLKO gdy potrzebujesz konkretnych wytycznych:
- @docs/agents/style_guide.md — wizualna strona wizytówki, paleta barw, brand tone
- @docs/agents/product_constraints.md — granice prac dev, ograniczenia backendu/waitlisty, ownership plików
- @docs/agents/handoff.md — reguły zarządzania rozmiarem kontekstu, co logować, a czego unikać
