# Product Constraints & Workflow

## Core Product
- Treat the current page as a waitlist-first MVP landing page, not a checkout flow.
- Preserve the single primary CTA strategy unless product requirements change.
- Current implementation is landing-page only. No backend, no live checkout, no live subscription engine.
- Waitlist interaction is prototype-only unless explicitly upgraded.

## File Ownership
- App UI: `src/App.jsx`
- Global theme and Tailwind tokens: `src/index.css`
- Build config: `vite.config.js`
- Product documentation: `PRD.md`

## Future Scope (Do not build yet unless requested)
- Add real waitlist backend or CRM integration.
- Add analytics and event tracking.
- Add bilingual Polish/English content strategy if needed.
- Add ecommerce and subscription backend only after product validation.
