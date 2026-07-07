# Codex Workflow

## Architect / Orchestrator / Workers
- `orchestrator` przyjmuje zadanie wysokopoziomowe, rozbija je na kroki i ustala priorytety.
- `advisor` wykonuje analizę architektury, audyt ryzyk i review zmian bez modyfikacji kodu.
- Workery (`default-worker`, `worker-fast`, `worker-tests`, `worker-docs`) realizują implementację.

## Context and token policy
- Traktuj 60% okna kontekstu jako próg uruchomienia ręcznej kompresji.
- Zachowuj tylko: aktualny plan, decyzje, status wykonania i otwarte ryzyka.
- Usuwaj z aktywnego kontekstu długie logi i powtarzalne outputy narzędzi.

## Log policy
- Docelowo trzymaj output narzędzi na poziomie ok. 200 linii na wywołanie.
- Używaj poleceń selektywnych: `head -n 200`, `tail -n 200`, `sed -n 'start,endp'`.
- Przy dużych logach: zapis do pliku, potem selektywny odczyt i krótkie podsumowanie.
