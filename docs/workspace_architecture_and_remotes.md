# PłynDO — Architecture, Directory Structure & GitHub Remotes Topology

Data aktualizacji: 13 sierpnia 2026 r.

---

## 1. Topologia Katalogów w Workspace (`~/Dev_Env/Plyn_DO`)

Workspace `~/Dev_Env/Plyn_DO` zawiera kompletny ekosystem projektu PłynDO rozbijający się na następujące katalogi:

* **`plyndo.pl/` (AKTUALNA PRODUKCJA):**
  - Główny projekt i repozytorium git nowej generacji landing page (`plyndo.pl`) oraz integracji Shoper (`sklep.plyndo.pl`).
  - Zaimplementowane: Etap-C Handoff v2 (`pd_v=2`), brak Doradcy AI, rabaty **20% (4 szt.), 30% (8 szt.), 40% (12 szt.)**, 31 pre-renderowanych podstron (z fallbackiem `200.html` dla SPA na Cloudflare Pages), zoptymalizowane pod kątem wydajności i bezpieczeństwa (0 vulnerabilities).

* **`plyndo.pl_v1/` (ARCHIWUM - WERSJA 1):**
  - Pierwsza historyczna wersja strony (gałąź archiwalna).
  - Przechowywana do wglądu i celów referencyjnych. Pozostaje w stanie read-only.

* **`plyndo.pl_v2/` (ARCHIWUM - WERSJA 2):**
  - Druga generacja strony stworzona po zmianach wizualnych i makietach przygotowanych przez grafik Abigail.
  - Przechowywana jako punkt odniesienia dla kreacji graficznych.

* **`Plyndo.PL_DS/` (DESIGN SYSTEM):**
  - Katalog zasobów Design Systemu PłynDO wspólny dla wszystkich wersji projektu (tokens, UI kits, komponenty składowe, makiety Figma/ZIP).
  - Nie stanowi osobnego repozytorium git — jest katalogiem zasobów.

* **`materialy/` (MATERIAŁY ŹRÓDŁOWE OD KLIENTA):**
  - Wszystkie surowe pliki, etykiety (PNG/SVG/ZIP), filmy Exploded butelek (`vid_exploaded_naczynia.mp4`, `film_plyn_do_lazienki.mp4`, itd.), próbki drukarskie, dokumentacja handlowa, kody QR i teksty źródłowe otrzymane od klienta.

---

## 2. Topologia Kont i Repozytoriów GitHub

Projekt PłynDO korzysta z 3 kont GitHub:

| Konto GitHub | Rola | Repozytorium URL | Uwagi |
|---|---|---|---|
| **`mierzwixjr`** | **PRODUKCJA** | `https://github.com/mierzwixjr/plyndo.pl.git` | Połączone bezpośrednio z Cloudflare Pages. Push do `main` wyzwala automatyczne wdrożenie produkcyjne na `plyndo.pl`. |
| **`KasprowiczM`** | **KOPIA / BACKUP** | `https://github.com/KasprowiczM/plyndo.pl.git` | Kopia zapasowa aktualnego repozytorium. |
| **`gaipro-mk`** | **KOPIA / BACKUP** | `https://github.com/gaipro-mk/plyndo.pl.git` | Kopia zapasowa aktualnego repozytorium. |

---

## 3. Procedura Synchronizacji i Pushowania do 3 Kont GitHub

Ze względu na to, że `gh auth git-credential` domyślnie uwierzytelnia bieżące konto w CLI, przy synchronizacji wszystkich 3 kont należy używać odpowiedniego kontekstu uwierzytelniania:

```bash
# 1. Push na konto PRODUKCYJNE (mierzwixjr)
env -u GITHUB_TOKEN gh auth switch --user mierzwixjr
env -u GITHUB_TOKEN git push -f mierzwixjr main:main

# 2. Synchronizacja z kontem KasprowiczM
git push -f kasprowiczm main:main

# 3. Synchronizacja z kontem gaipro-mk (przy użyciu personal access token)
TOKEN=$(env -u GITHUB_TOKEN gh auth token --user gaipro-mk)
git push -f https://gaipro-mk:${TOKEN}@github.com/gaipro-mk/plyndo.pl.git main:main
```
