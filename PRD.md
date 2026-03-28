# Plyndo.pl PRD

## Overview
Plyndo.pl is the landing and validation layer for a premium D2C household chemistry subscription brand for Poland. The product strategy positions household chemistry as a home operating system rather than a reactive supermarket purchase. The MVP is designed to validate demand, capture early access leads, and prepare for a subscription ecommerce launch built around curated chemistry bundles, configurable delivery cadence, and future AI-assisted plan fitting.

## Product Vision
- Turn household chemistry from ad hoc purchasing into a predictable subscription routine.
- Offer premium, performance-first household liquids in a cleaner, more structured buying model.
- Build a Polish-market-first direct-to-consumer brand with strong delivery and replenishment logic.

## MVP Goals
- Validate category resonance and waitlist demand.
- Test positioning for premium household chemistry subscription in Poland.
- Prepare the content and UX foundation for future ecommerce and subscription flows.
- Support a pilot launch for a limited early cohort, initially family-and-friends scale.

## Target Audience
- Busy Polish households that value control, convenience, and product quality.
- Families with children or pets who consume cleaning products more predictably and at higher volume.
- Households frustrated by reactive store runs, cluttered cabinets, and unclear product selection.
- Secondary long-term segment: small business or office supply needs, but not primary MVP focus.

## Core User Problems
- Essentials run out at inconvenient times.
- Households overbuy or accumulate the wrong products.
- It is difficult to map product choice to actual household usage.
- Existing buying flows are reactive, inconsistent, and operationally noisy.

## Value Proposition
- Premium household chemistry delivered before you run out.
- Curated product logic instead of supermarket overwhelm.
- Delivery cadence that can adapt to real usage.
- A future AI-assisted fitting layer for quantity, bundle composition, and replenishment frequency.

## MVP Scope

### In Scope
- Marketing landing page for early access and waitlist capture.
- Brand and offer articulation for the Polish market.
- Presentation of package logic: Mini, Midi, Maxi.
- Explanation of replenishment cadence: every 1, 2, or 3 months.
- UX framing for AI-assisted household-fit questionnaire.
- Messaging for future customer account controls: pause, change cadence, change plan.
- Polish logistics framing including InPost and courier delivery.

### Future Product Scope
- Full ecommerce storefront.
- AI questionnaire backed by OpenAI API.
- Stripe subscriptions and recurring billing.
- Customer account with subscription management.
- Product catalog and operational product data.
- InPost GeoWidget and shipment-label generation.
- Subscription-lite flow with prefilled reorder and BLIK-compatible payment path.
- Fakturownia integration and invoice automation.

### Out of Scope for This Build
- Live checkout.
- Live subscription billing.
- Customer authentication.
- Real CRM or email workflow.
- Real product database.
- Real logistics integration.
- Real AI questionnaire backend.

## Product Model
- Core assortment: 8 household chemistry product categories.
- Offer structure: curated package tiers with personalization.
- Subscription frequency: 1, 2, or 3 month cycles.
- Market: Poland only in MVP.
- Currency and delivery assumptions: PLN, domestic logistics, InPost and courier.

## User Journey
1. User lands on Plyndo.pl and understands the category thesis.
2. User sees why household chemistry should be treated as a managed home system.
3. User explores package logic and replenishment model.
4. User understands the future household-fit and cadence logic.
5. User joins the waitlist for early access.
6. In later phases, user would move into AI questionnaire, plan recommendation, order, and subscription management.

## Key Experience Principles
- Premium rather than discount retail.
- Structured rather than SKU-heavy.
- Calm, operational, and credible rather than loud or gimmicky.
- Polish-market relevance rather than global-generic D2C language.

## Landing Page Requirements
- Strong premium hero with clear value proposition.
- Explanation of the core problem and category tension.
- Pillars: always stocked, performance-first, adaptive by design.
- Clear process section.
- Offer architecture section for Mini, Midi, Maxi.
- Comparison framing against supermarket and generic ecommerce behavior.
- Trust and FAQ sections.
- Single primary conversion path: waitlist / early access.

## Metrics
- Waitlist signups.
- Waitlist-to-pilot conversion.
- Active subscription count in later phases.
- AOV target around 100 PLN.
- Churn once subscriptions launch.
- MRR in post-MVP scale phases.

## Growth Levers
- Educational content and usage guides.
- Referral loops during early pilot.
- Seasonal chemistry bundles.
- Clear category education around performance and replenishment logic.

## Retention Levers
- Auto-replenishment convenience.
- Better fit over time through usage-informed adjustment.
- Clear customer controls for pause, change, and modify.
- Post-purchase education and replenishment reminders.

## Dependencies
- Product specs, packaging, and label data from the business side.
- Future integrations: Stripe, OpenAI, InPost, customer account system, invoicing stack.
- Delivery and packaging viability for heavy liquids.
- Subscription operations and support readiness.

## Risks
- Shipping damage and logistics complexity for liquid products.
- Compliance constraints for chemical products and transport.
- Limited B2C operational experience.
- Cost volatility in logistics, energy, and packaging.
- Need to balance premium positioning with understandable mass-market value.

## Open Questions
- How much of the first launch should be waitlist-first vs pilot commerce enabled?
- What exact products and pack sizes belong in each initial package?
- When should full recurring billing go live versus reminder-based reorders?
- How much AI fitting is truly needed in MVP versus post-MVP?
- Should the home/business split appear in the first public version or be deferred?

## Current Implementation
- Premium landing page built with React, Vite, and Tailwind.
- Static waitlist interaction for prototype validation.
- No backend or live integrations yet.
