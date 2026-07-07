# Context Management & Handoff

- **Pseudo-kompresja kontekstu**: zaczynaj aktywną kompresję przy ok. 60% zużycia okna kontekstu.
- Trzymaj w kontekście **tylko aktualne plany**, decyzje produktowe i stan prac. Wyprowadzaj długie wnioski techniczne/debug-info poza kontekst do zewnętrznych plików dokumentacji bieżącej.
- Odpowiadając na zapytania, nie renderuj powtarzalnego kodu lub długich plików, których Użytkownik nie prosił.
- Logi narzędzi utrzymuj w małych fragmentach (cel: ~200 linii na odczyt); duże logi czytaj selektywnie.
- Gdy wpisujesz zmiany w kodzie copy (tekst), zawsze dbaj, by relewantność dla polskiego rynku (Poland-market) była widoczna.
- Każdą zmianę w scope notuj za pomocą aktualizacji do pliku `PRD.md`.

---

## Sesja 2026-06-30 — remediacja audytu ultra

- Wdrożono naprawy P0–P2 z `AUDYT-ULTRA-2026-06-30.md` (routing, SEO, prerender, CTA, prawo, a11y, wydajność).
- Build: `npm run lint` OK, `npm run build` OK (31 tras prerender).
- Szczegóły: `docs/plyndo_packages_handoff.md` §1.10.
- Następny krok biznesowy: uruchomienie Shopera + `offerIntegrationConfig.cta.status = 'enabled'`.
- **Deploy produkcji (2026-06-30):** lokalny `npm run pages:deploy` wymaga `wrangler login` lub `CLOUDFLARE_API_TOKEN`. Dodano `.github/workflows/deploy-pages.yml` — ustaw sekrety `CLOUDFLARE_API_TOKEN` i `CLOUDFLARE_ACCOUNT_ID` w repo `mierzwixjr/plyndo.pl`, potem push na `main` wdroży build z prerenderem.
- **Remote git:** `origin` → `https://github.com/mierzwixjr/plyndo.pl.git`.
