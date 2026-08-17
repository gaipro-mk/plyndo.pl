# Product Constraints & Workflow

## Core Product
- Treat the current product as a package-first landing page for ready bundles and custom packs (4, 8, 12 items), not individual bottle sales.
- Keep the product scope package-first: ready bundles, custom packs, product education, and Shoper Lean Checkout handoff.
- Landing page `plyndo.pl` is the single source of truth for cart composition and configuration.
- Shoper store (`sklep.plyndo.pl` / `sklep562393.shoparena.pl`) is the checkout engine with hard quantity guard (4, 8, 12 items only).
- Package discounts: Pack 4 (−20%, `PLYNDO-PACK-4`), Pack 8 (−30%, `PLYNDO-PACK-8`), Pack 12 (−40%, `PLYNDO-PACK-12`).
- Product prices may be shown as reference prices. Discount and savings belong only to the whole pack.
- The public `JAX Professional` reference belongs only on the About page. Do not repeat it in hero, trust, footer, or every product page.
- Keep existing footer producer/seller entity data from the repo as entity data without making it dominate the Płyndo brand.

## File Ownership
- App UI: `src/App.jsx`
- Global theme and Tailwind tokens: `src/index.css`
- Build config: `vite.config.js`
- Product documentation: `PRD.md`
- Shoper Theme (SVE): `shoper-theme/styles/custom.less`, `shoper-theme/styles/settings.json`
- Shoper Storefront Integration: `shoper-theme/custom-js/plyndo-storefront.js`

## Production Scope
- Ready bundles and custom packs hand off to Shoper via v2 protocol (WebAPI multi-item cart + promo code).
- Storefront script enforces 4/8/12 checkout restrictions and auto-manages bundle promo codes.

