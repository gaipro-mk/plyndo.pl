# CODEX.md (Plyndo.pl)

Codex jest głównym agentem orkiestrującym planowanie, delegację i implementację zmian w tym repozytorium.

## Profile pracy
- `default-worker` - model `gpt-5.3-codex` z reasoning `medium`; domyślny tryb codziennego kodowania.
- `orchestrator` - model `gpt-5.3-codex` z reasoning `high`; planowanie, podział pracy, koordynacja.
- `advisor` - model `gpt-5.4` z reasoning `high`, `read-only`; analiza, review i architektura bez implementacji.
- `worker-fast` - szybkie i tanie transformacje/refaktory/boilerplate.
- `worker-tests` - testy, walidacja i dokumentacja techniczna.
- `worker-docs` - lekkie zadania dokumentacyjne i porządkowanie instrukcji.

## Zasady operacyjne
- Domyślnie używaj `default-worker`; przełączaj profil tylko gdy zadanie tego wymaga.
- `advisor` nie edytuje plików i nie wykonuje zmian implementacyjnych.
- Przy dłuższych zadaniach kompresuj historię i utrzymuj tylko aktualny plan, decyzje i stan prac.
- Limity logów: czytaj fragmenty (`head`, `tail`, `sed`) zamiast pełnych dumpów.

## Referencje
- `@AGENTS.md` - indeks głównych zasad projektu.
- `@CLAUDE.md` - wspólne zasady i kontekst pracy.
- `@docs/codex/profiles.md` - szczegóły mapowania modeli i użycia profili.
- `@docs/codex/workflow.md` - workflow orchestrator/advisor/workers i zasady kontekstu.
- `@docs/codex/mcp_skills_policy.md` - polityka MCP/plugins/skills dla tego repo.
