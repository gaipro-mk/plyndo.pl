# Plyndo.pl

Premium landing page and product documentation for Polish D2C household chemistry sold in ready bundles and custom packs.

## Stack
- React
- Vite
- Tailwind CSS v4

## Scripts
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Included Docs
- `PRD.md` for product scope and strategy synthesis
- `AGENTS.md` for future agent guidance
- `CODEX.md` for repo-specific implementation guidance

## Current Scope
- Premium package-first landing page for products, packs `4` and `8`, current `Starter 10`, and the future `Starter 12`
- Product reference prices with discount and savings shown only for the whole pack
- Synchronized checkout & pricing parity with Shoper Storefront (`sklep.plyndo.pl`)

## Shoper Theme (`shoper-theme/`)
Official Shoper Storefront skin repository (Skin ID `12` - `PlynDo.PL - Szablon Własny`).
- `styles/`: Custom LESS stylesheet definitions (`custom.less`).
- `settings/`: Storefront skin configuration settings.
- `.shoper/`: Theme metadata & checksum verification (`metadata.json`).

### Shoper CLI Workflow
- Pull theme: `npx @shoper/cli theme pull 12`
- Push theme: `npx @shoper/cli theme push 12`
- Watch changes: `npx @shoper/cli theme watch`

