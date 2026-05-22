# Product Constraints & Workflow

## Core Product
- Treat the current product as a package-first landing page for ready bundles and custom packs, not a checkout flow.
- Subscription and waitlist models are out of scope for the product.
- Current implementation is landing-page only. No backend and no live Shoper checkout yet.
- The current landing CTA to Shoper must remain an inactive placeholder until the integration is ready.
- Product prices may be shown as reference prices. Discount and savings belong only to the whole pack.
- The public `JAX Professional` reference belongs only on the About page. Do not repeat it in hero, trust, footer, or every product page.
- Keep existing footer producer/seller entity data from the repo as entity data without making it dominate the Płyndo brand.

## File Ownership
- App UI: `src/App.jsx`
- Global theme and Tailwind tokens: `src/index.css`
- Build config: `vite.config.js`
- Product documentation: `PRD.md`

## Future Scope (Do not build yet unless requested)
- Connect ready bundles and custom packs to Shoper with the full cart composition and package discount.
- Add analytics and event tracking.
- Add bilingual Polish/English content strategy if needed.
- Add ecommerce integration only after product validation.
