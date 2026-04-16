# AGENTS.md (Plyndo.pl Rules Index)

CEL PROJEKTU: Premium landing page i dokumentacja dla koncepcji subskrypcji chemii gospodarczej w Polsce.

## Stack & Commands
- Stack: React, Vite, Tailwind CSS v4 (`@tailwindcss/vite`)
- `npm install` | `npm run dev` | `npm run build` | `npm run preview` | `npm run lint`

## Hierarchia Modeli
- Domyślny model: `low-pro` (Gemini 3 Pro ze standardowym / low reasoning) - używaj rutynowo do niższych kosztów.
- Profil `orchestrator`: Gemini Pro 3.1 High (high reasoning) - używaj WYŁĄCZNIE do zaawansowanego planowania, złożonych problemów architektonicznych i delegowania prac.
- Profil `advisor`: Gemini Pro 3.1 High - czysty doradca, ma wyłączony profil modyfikacji kodu. Służy tylko i wyłącznie do głębokiej analizy i recenzji (audytowania) bez tworzenia zmian w zasobach.
- Profil `flash-worker`: Gemini 3 Flash - uderzaj, jeśli trzeba wykonać szybki zestaw powtarzalnych tasków.

---
> [!IMPORTANT]
> **PLANNING RULE:** Nie wprowadzaj żadnych zmian w kodzie, dopóki nie poznasz kodu i wymagań na tyle, aby mieć co najmniej 95% pewności, co trzeba zbudować. Zawsze zadawaj pytania doprecyzowujące i kilkukrotnie weryfikuj swoje założenia, zanim przejdziesz z trybu planowania do implementacji. Ta zasada jest krytyczna zwłaszcza dla modelu Pro 3.1 High (`orchestrator` / `advisor`).
---

## Dokumentacja / Zasady Szczegółowe (Progressive Disclosure)
Przeczytaj poniższe pliki podrzędne TYLKO, gdy potrzebujesz konkretnych wytycznych wykonawczych, by redukować objętość promptu:
- @docs/agents/style_guide.md - wizualna strona wizytówki, paleta barw, brand tone
- @docs/agents/product_constraints.md - granice prac dev, ograniczenia backendu/waitlisty, ownershps plików
- @docs/agents/handoff.md - reguły zarządzania rozmiarem kontekstu, co logować, a czego unikać
