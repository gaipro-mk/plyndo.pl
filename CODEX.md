# CODEX.md

## Repository Guidance
- Main app entry: `src/App.jsx`
- Global styling and Tailwind import: `src/index.css`
- Vite config: `vite.config.js`
- Product strategy reference: `PRD.md`

## Design Intent
- premium consumer brand, not SaaS
- Polish-market first
- calm, precise, expensive-looking UI
- serif display + restrained sans body
- muted mineral palette, not bright eco green

## Editing Guidance
- keep sections content-rich and conversion-focused
- prefer refining structure and typography over adding more generic cards
- preserve one primary conversion goal per page state
- avoid introducing unused dependencies
- use Tailwind utilities plus a small number of shared CSS classes in `src/index.css`

## Deployment Intent
- intended target domain: `plyndo.64bit.site`
- Vercel is the expected hosting platform

## Known Gaps
- no live waitlist backend
- no analytics wiring
- no product detail or account pages yet
- brand naming may still need confirmation between `Plyndo` and `Puendo`
