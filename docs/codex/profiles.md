# Codex Profiles (CLI + App)

## Active profile hierarchy
- `default-worker`: `gpt-5.3-codex`, reasoning `medium`, profil domyślny do implementacji.
- `orchestrator`: `gpt-5.3-codex`, reasoning `high`, planowanie i delegacja.
- `advisor`: `gpt-5.4`, reasoning `high`, sandbox `read-only`, approval `untrusted`.
- `worker-fast`: `gpt-5.4-mini`, reasoning `low`, szybkie taski.
- `worker-tests`: `gpt-5.2`, reasoning `medium`, testy i walidacja.
- `worker-docs`: `gpt-5.1-codex-mini`, reasoning `medium`, lekkie aktualizacje dokumentacji.

## Usage
- CLI interactive: `codex -p default-worker`, `codex -p orchestrator`, `codex -p advisor`.
- CLI non-interactive: `codex exec -p worker-fast "<prompt>"`.
- App Codex: wybierz identyczny profil z listy profili sesji.
