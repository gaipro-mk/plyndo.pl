# PRD: Plyndo.pl / Puendo Platform

## 1. Product Summary

`plyndo.pl` is the digital channel for **Puendo**, a Polish direct-to-consumer household chemistry brand built on a recurring replenishment model. The platform is not meant to behave like a generic online store. Its job is to package recurring household chemistry as a managed service: the customer gets the right products, in the right quantities, at the right cadence, without having to remember what to buy.

The business case from the source materials is consistent:

- the manufacturer already has formulations, production capability, and category know-how,
- household chemistry has predictable, low-emotion repeat demand,
- direct distribution removes intermediary margin,
- a subscription model creates more stable revenue and stronger customer retention than one-off basket ecommerce,
- product fit improves when the system knows the household profile and learns usage over time.

For implementation purposes, the product should be treated as a **phased platform**:

- **Phase 0: landing and demand validation**
- **Phase 1: MVP commerce for Family & Friends**
- **Phase 2: full subscription platform**

The current delivery target is **only the landing page**, but this PRD defines the full platform so design and content decisions support later rollout instead of creating throwaway marketing pages.

## 2. Business Context

Puendo is positioned as a modern D2C layer on top of a mature production base. The platform must express three strategic advantages from the source documents:

- **Quality**: proprietary or inherited proven formulations, real production experience, control over ingredients, concentration, and fragrance.
- **Price efficiency**: fewer intermediaries than wholesale and retail, allowing competitive pricing without lowering quality.
- **Premium aesthetics**: packaging, tone, and fragrance profile that feel contemporary and display-worthy, not industrial or cheap.

The platform must present household chemistry not as “8 random liquids” but as a **home maintenance operating system**:

- always stocked,
- simpler than supermarket shopping,
- personalized to the household,
- adjustable over time,
- operationally calm and premium.

## 3. Problem Statement

Current category behavior is broken for the intended customer:

- customers buy reactively when a product runs out,
- households overbuy some items and underbuy others,
- retail forces too much choice for a low-interest category,
- no traditional channel knows the actual home profile,
- existing products rarely combine trusted performance, fair price, and premium presentation.

The platform must solve for continuity first, not novelty.

## 4. Product Vision

Create the default Polish D2C platform for recurring household chemistry by combining:

- curated bundled product logic,
- household-profile-based replenishment,
- future AI-assisted recommendation and adjustment,
- premium brand presentation,
- logistics and payments adapted to Polish expectations.

## 5. Product Principles

- **Service over catalog**: lead with continuity and household fit, not SKU overload.
- **Operational trust over hype**: prove competence through clarity, not exaggerated claims.
- **Personalization without friction**: collect only the minimum information needed at each step.
- **Polish-market native**: language, delivery, payments, and trust patterns must feel local.
- **Upgrade path by design**: the landing page must already reflect the eventual subscription platform structure.
- **Retention over extraction**: the business wins through long-term fit and low churn, not overconsumption.

## 6. Target Users

### Primary segment

Busy Polish households buying household chemistry regularly and wanting fewer shopping decisions.

Characteristics:

- buy online or are comfortable doing so,
- value convenience and predictability,
- respond to quality and clean design,
- dislike supermarket overload,
- are likely to appreciate recurring delivery.

### Core high-value segment

Families with children and/or pets.

Why this segment matters:

- most predictable and highest recurring consumption,
- strongest pain from running out,
- strongest fit for the `MIDI / Family` offer, which source materials define as the commercial core.

### Secondary segment

Small offices and companies needing regular supply.

Important:

- this segment exists in source materials,
- it should be represented in platform architecture,
- it should not dominate the initial landing page unless explicitly tested,
- it may be a separate acquisition path later.

## 7. Product Offer

### Initial product line

The source documents consistently define a launch assortment of 8 core 1-liter products:

- floor cleaner,
- glass cleaner,
- bathroom cleaner,
- hand wash,
- laundry detergent,
- fabric softener,
- dishwashing liquid,
- dishwasher liquid/product.

The product model assumes shipment in recurring bundles and, in later phases, the ability to top up individual items.

### Package tiers

Normalized product architecture for the platform:

- **MINI**: 1-2 people, lower consumption, longer cycle
- **MIDI**: family household, default/high-volume segment, monthly cycle
- **MAXI**: large household or business/high-convenience segment

Source naming differs slightly between documents (`Basic/Family/Max` vs `Mini/Midi/Maxi` and `Single/Rodzina/Firma`). For platform consistency:

- public-facing naming should standardize on **MINI / MIDI / MAXI**
- copy can explain audience fit in plain language
- internal data model should support audience tags: `single`, `family`, `business`

### Subscription cadence

The platform must support:

- every 1 month,
- every 2 months,
- every 3 months.

For MVP recommendation logic:

- `MINI` defaults to every 2 months,
- `MIDI` defaults to every 1 month,
- `MAXI` defaults to every 1 month,
- recommended cadence may be adjusted by household profile and later by usage feedback.

## 8. Core Value Proposition

The user promise should be expressed as:

“Puendo keeps your home stocked with the right chemistry, matched to how your household actually lives.”

Supporting claims:

- fewer shopping decisions,
- no emergency restocks,
- manufacturer-grade quality,
- premium look and fragrance,
- predictable delivery,
- flexible subscription management.

## 9. Scope by Phase

### Phase 0: landing and validation

Goal:

- validate demand and brand/message fit,
- explain the offer structure,
- prepare users for the full platform model,
- capture leads and early-access intent.

In scope:

- premium landing page,
- positioning and category education,
- package tier explanation,
- “how it works” flow,
- early access / lead capture,
- FAQ,
- placeholders for personalization, subscription control, and delivery model.

Out of scope:

- live checkout,
- payments,
- account creation,
- real subscription engine,
- working AI personalization,
- real logistics integrations.

### Phase 1: MVP commerce for Family & Friends

Goal:

- validate order flow and operational readiness on a controlled cohort.

In scope:

- responsive ecommerce site,
- product and package presentation,
- simple purchase flow,
- package selection,
- limited personalization flow,
- order capture,
- delivery option selection,
- basic payment,
- basic customer communication.

The MVP may start with:

- one featured package,
- limited cohort,
- limited shipping days,
- tighter operational control.

### Phase 2: full subscription platform

Goal:

- deliver full recurring D2C model with learning system and subscription management.

In scope:

- recurring billing,
- subscription management,
- AI-assisted recommendation,
- household profile persistence,
- reorder adjustments,
- account dashboard,
- invoice automation,
- logistics automation,
- analytics and retention tooling.

## 10. Landing Page Requirements

This is the only implementation target right now, so requirements here are stricter.

### Landing page objectives

- communicate what Puendo is in under 5 seconds,
- frame the category problem clearly,
- make the subscription model feel practical and premium,
- build trust through production credibility,
- show the future personalization and delivery model without overselling fake functionality,
- capture early access intent.

### Required sections

1. **Hero**
- clear value proposition,
- premium visual tone,
- primary CTA,
- optional secondary CTA to learn how it works.

2. **Why this exists**
- explain pain of reactive household chemistry shopping,
- emphasize continuity, predictability, and reduced decision fatigue.

3. **Why Puendo**
- quality,
- direct price efficiency,
- premium aesthetics and fragrance,
- family production heritage / manufacturing credibility.

4. **How it works**
- choose household profile,
- get package recommendation,
- receive recurring deliveries,
- adjust anytime.

5. **Package logic**
- MINI / MIDI / MAXI,
- who each package is for,
- indicative replenishment rhythm,
- flexibility of upgrades, downgrades, pauses.

6. **Household-fit personalization**
- show the inputs the system uses:
  - household size,
  - number of bathrooms,
  - children,
  - pets,
  - cleaning frequency / lifestyle.
- communicate that AI is used to simplify decisions, not to create complexity.

7. **Product universe**
- present the 8 core categories,
- frame them as a complete home-care system.

8. **Logistics and convenience**
- InPost and courier expectations,
- one-box operational simplicity,
- predictable deliveries.

9. **Trust / credibility**
- manufacturing background,
- practical quality claims,
- polish-market suitability,
- no hype-based greenwashing.

10. **FAQ**
- what is in a package,
- how often deliveries arrive,
- can I pause or change,
- is it a regular shop,
- when does commerce launch,
- how pricing works.

11. **Lead capture / early access**
- one clear conversion action,
- no cluttered multi-goal CTA setup.

### Landing page content rules

- tone must be adult, premium, calm, and operational,
- copy must avoid “startup AI magic” language,
- copy must not present unavailable commerce features as if they are live,
- visual system must support later migration to full product flows.

## 11. Platform Functional Requirements

These define the full product target beyond the current landing page.

### 11.1 Product catalog

The system must support:

- 8 core products at launch,
- package composition by tier,
- single-product top-ups,
- product metadata:
  - name,
  - category,
  - description,
  - usage,
  - volume,
  - fragrance,
  - imagery,
  - ingredient/compliance content.

### 11.2 Package and recommendation engine

The system must:

- model package tiers,
- store household profile inputs,
- generate recommended package size and cadence,
- offer 3 output variants:
  - minimal,
  - optimal,
  - extended.

Version 1 of the engine should be rule-based.

Later versions may use AI to:

- interpret user responses,
- refine recommendations,
- explain recommendations conversationally,
- suggest corrections based on historical usage.

### 11.3 Subscription management

The platform must eventually support:

- create subscription,
- set cadence,
- pause,
- resume,
- upgrade,
- downgrade,
- skip shipment,
- cancel,
- manage payment method,
- notify before dispatch,
- download invoices,
- view order history.

### 11.4 Customer account

The account area must support:

- profile and household configuration,
- current subscription state,
- next delivery date,
- product composition,
- order history,
- billing and delivery data,
- support entry points.

### 11.5 Admin and operations

The internal system must support:

- product management,
- package rules,
- order monitoring,
- subscription monitoring,
- customer records,
- invoice generation,
- shipment tracking,
- basic reporting:
  - MRR,
  - active subscriptions,
  - churn,
  - AOV,
  - top products,
  - conversion.

## 12. User Journeys

### Journey A: landing page lead capture

1. User lands on `plyndo.pl`.
2. Understands the category reframing and value proposition.
3. Sees package logic and personalization model.
4. Builds trust in quality, pricing logic, and logistics.
5. Joins early access or waitlist.

### Journey B: future package selection

1. User explores package tiers.
2. Chooses household segment or starts recommendation flow.
3. Completes short household-fit questionnaire.
4. Receives recommended package and cadence.
5. Adjusts package if needed.
6. Proceeds to checkout.

### Journey C: subscription management

1. User enters account.
2. Sees next shipment and current package.
3. Pauses, skips, upgrades, downgrades, or tops up a product.
4. Receives confirmation.

## 13. AI Personalization Requirements

AI is an internal enabler, not the headline product.

### Must do

- reduce decision load,
- recommend package fit,
- recommend cadence,
- explain why a recommendation fits,
- support later refinement from usage feedback.

### Must not do

- feel gimmicky,
- appear before the user understands the offer,
- force a long questionnaire at first contact,
- become a blocker in the landing-page experience.

### Input signals

- home size,
- number of rooms / bathrooms,
- number of adults,
- number of children,
- pets,
- cleaning habits,
- laundry frequency,
- dishwashing habits where relevant.

### Output

- package recommendation,
- cadence recommendation,
- explanation of fit,
- optional add-on suggestions in later phases.

## 14. Payments and Logistics Requirements

### Payments

Source materials indicate Polish-local payment support is strategically important.

Priority order:

1. **Przelewy24 or Paynow** for local payment expectations and margin efficiency
2. **BLIK** as a critical local payment option
3. **Stripe** where needed for automated recurring card billing

Implication:

- local one-off and local checkout flows matter,
- recurring card logic may still require Stripe or equivalent subscription support,
- the product should not assume a Stripe-only worldview.

### Logistics

The platform must support:

- InPost as the primary consumer delivery option,
- courier as a secondary option,
- shipment data integration,
- carton/gabaryt logic for liquid products,
- one-box operational simplicity where possible.

Operational principle from source documents:

- better slower and correct than fast and chaotic.

## 15. Content and Growth Requirements

The growth model is not only paid acquisition.

The platform should support a long-term educational content strategy around:

- “jaki płyn do...”
- dosing,
- usage best practices,
- household problem/solution pages,
- seasonal cleaning use cases,
- authority-building content.

This content strategy serves:

- SEO,
- trust,
- lower CAC,
- stronger retention,
- better product comprehension.

Referral support should be planned for later phases because source materials identify recommendation loops as category-natural.

## 16. Metrics and Success Criteria

### Landing page phase

- lead conversion rate,
- waitlist count,
- package section engagement,
- scroll depth,
- CTA click-through rate,
- qualitative signal from Family & Friends testing.

### MVP commerce phase

- completed orders,
- repeat purchase / subscription opt-in,
- average order value,
- household-fit completion rate,
- payment completion rate,
- delivery success rate.

### Platform phase

- active subscriptions,
- MRR,
- churn,
- pause-to-reactivation rate,
- downgrade-to-retention rate,
- LTV,
- CAC payback,
- recommendation accuracy proxies,
- top-up rate for single items.

Commercial targets explicitly referenced in source materials:

- indicative AOV: around `100 PLN`,
- directional long-term objective: `1,000` active subscriptions,
- directional MRR target: `100,000 PLN`.

## 17. Non-Functional Requirements

- mobile-first responsive experience,
- premium visual quality,
- fast page load,
- accessible reading hierarchy,
- clear legal/commercial disclosures,
- scalable information architecture,
- architecture prepared for future ecommerce migration.

## 18. Risks and Constraints

### Business risks

- premature scale before operations are stable,
- weak product-market message despite strong production base,
- confusion between one-off ecommerce and service model,
- too much complexity too early.

### Operational risks

- liquid shipping damage,
- packaging and weight constraints,
- delivery cost pressure,
- poor cadence recommendations causing oversupply or stockouts.

### Product risks

- overexposing AI in early messaging,
- forcing long onboarding too early,
- presenting too many package/product choices at first touch,
- landing page feeling generic rather than category-specific.

### Strategic constraint

The D2C channel must complement rather than cannibalize wholesale logic.

## 19. Open Decisions

- whether public brand language should prioritize `Puendo` or `Plyndo/Płyn do` at launch,
- whether `MAXI` is publicly framed as “large household” first and “business” second,
- whether Family & Friends should include live checkout in the first external release,
- when to expose single-product top-ups,
- whether early checkout should be subscription-first or order-first with subscription upgrade later,
- exact price architecture by package,
- exact package composition by segment,
- what level of AI explanation is visible in the UX.

## 20. Current Delivery Focus

The current implementation scope is:

- **fully featured premium landing page only**

That landing page must already encode the future platform model:

- package architecture,
- personalization logic,
- subscription flexibility,
- Polish logistics and payment expectations,
- operational credibility,
- lead capture for early launch.

It must not behave like a disconnected marketing shell. It should function as the first layer of the eventual Puendo platform.
