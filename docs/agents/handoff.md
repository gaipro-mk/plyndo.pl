# Context Management & Handoff

- **Pseudo-kompresja kontekstu**: zaczynaj aktywną kompresję przy ok. 60% zużycia okna kontekstu.
- Trzymaj w kontekście **tylko aktualne plany**, decyzje produktowe i stan prac. Wyprowadzaj długie wnioski techniczne/debug-info poza kontekst do zewnętrznych plików dokumentacji bieżącej.
- Odpowiadając na zapytania, nie renderuj powtarzalnego kodu lub długich plików, których Użytkownik nie prosił.
- Logi narzędzi utrzymuj w małych fragmentach (cel: ~200 linii na odczyt); duże logi czytaj selektywnie.
- Gdy wpisujesz zmiany w kodzie copy (tekst), zawsze dbaj, by relewantność dla polskiego rynku (Poland-market) była widoczna.
- Każdą zmianę w scope notuj za pomocą aktualizacji do pliku `PRD.md`.
