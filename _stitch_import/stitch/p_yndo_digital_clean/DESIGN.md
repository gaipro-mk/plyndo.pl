```markdown
# Design System Document: High-End Digital D2C Cleaning Excellence

## 1. Overview & Creative North Star
### Creative North Star: "The Clinical Editorial"
This design system moves away from the cluttered, "big-box" aesthetic of household cleaners and toward a sophisticated, professional-grade digital experience. We treat professional cleaning products with the same reverence as luxury skincare or high-end tech.

The system breaks the "template" look through **Intentional Asymmetry** and **Tonal Depth**. By utilizing wide horizontal margins (Spacing 16-24) and overlapping high-resolution product photography with bold, editorial typography, we create a sense of "Air and Authority." The interface doesn't just display products; it curates an environment of trust and technical precision.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the purity of water and the energy of modern technology.

*   **Primary (`#0058bc`):** Our "Electric Blue" anchor. Use this for brand moments and primary actions.
*   **Tertiary/Accent (`#ebea00`):** Our "Neon Yellow." Use sparingly for high-energy prompts, urgent alerts, or "Add to Cart" CTAs to break the serene blue/white rhythm.
*   **Neutral/Background (`#f8f9fa`):** The "Technical Off-White" that provides a clean, sterile-yet-inviting canvas.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. Traditional dividers are a sign of "default" design. Instead:
*   **Background Shifts:** Define boundaries by placing a `surface-container-low` section against a `surface` background.
*   **Negative Space:** Use the Spacing Scale (specifically 8, 10, and 12) to create "invisible" barriers.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of frosted glass and premium paper. 
*   **Base:** `surface` (The foundation).
*   **Level 1:** `surface-container-low` (Subtle inset sections).
*   **Level 2:** `surface-container-lowest` (The "Highlight" layer for cards or floating menus).
*   **Level 3:** `surface-container-highest` (Used for persistent navigation or high-contrast sidebars).

### The "Glass & Gradient" Rule
To elevate the "Digital-First" feel, use **Glassmorphism** for floating elements (e.g., sticky headers or mobile navigation). Apply `surface-container-lowest` at 80% opacity with a `20px` backdrop-blur. 
*   **Signature Texture:** Use a subtle linear gradient (from `primary` to `primary-container` at a 135° angle) for hero section buttons to give them a tactile, liquid-like depth.

---

## 3. Typography: The Editorial Voice
Our typography pairing balances geometric modernity with clinical legibility.

*   **Display & Headlines (Plus Jakarta Sans):** These are our "Brand Statements." Use `display-lg` for hero sections with tight letter-spacing (-0.02em) to create a high-fashion, editorial impact. Headlines should feel "heavy" and authoritative.
*   **Body & Labels (Inter):** The "Workhorse." Inter is used for all functional information. Use `body-lg` for product descriptions to ensure a premium reading experience. `label-md` is reserved for technical specs and data-heavy tables.

**Hierarchy Tip:** Never use `headline` and `display` styles in the same viewport without a significant scale difference (at least 2 steps on the scale) to maintain a clear visual narrative.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** rather than structural shadows.

*   **The Layering Principle:** To "lift" a product card, do not add a shadow. Instead, place a `surface-container-lowest` card on top of a `surface-container-low` background. The slight shift in brightness creates a sophisticated, natural lift.
*   **Ambient Shadows:** If a floating element (like a Modal) requires a shadow, it must be "Ambient":
    *   **Y:** 20px, **Blur:** 40px.
    *   **Color:** `on-surface` at 4% opacity. 
    *   This mimics the soft diffusion of light through water.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` at **15% opacity**. A 100% opaque border is considered a design failure in this system.

---

## 5. Components

### Buttons
*   **Primary:** `primary` background with `on-primary` text. Use `Rounded-lg` (1rem). 
*   **CTA (Conversion):** `tertiary-fixed` (Neon Yellow) background with `on-tertiary-fixed` (Deep Charcoal) text. Use for "Checkout" or "Buy Now."
*   **Tertiary:** No background, `primary` text. Use for "Learn More" with a subtle `0.5` spacing underline.

### Cards & Lists
*   **Constraint:** Zero dividers. 
*   **Separation:** Use `spacing-6` between list items. Use background color shifts (`surface-container-low`) for grouped items.
*   **Roundedness:** Apply `DEFAULT` (0.5rem) to small cards and `xl` (1.5rem) to large hero containers to maintain the "Soft Minimalist" feel.

### Input Fields
*   **Style:** `surface-container-lowest` background with a "Ghost Border" (15% opacity `outline-variant`).
*   **Focus State:** Transition the border to 100% `primary` color and add a 4px soft outer glow using the `primary` color at 10% opacity.

### Featured Component: The "Technical Spec" Chip
*   For professional cleaning stats (pH level, dilution ratio).
*   **Style:** `surface-variant` background, `on-surface-variant` text, `Rounded-full`. Small, precise, and tech-focused.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical layouts where text is left-aligned and product imagery bleeds off the right edge of the screen.
*   **Do** prioritize "Breathing Room." If a section feels crowded, increase spacing by 2 steps on the scale.
*   **Do** use high-contrast typography (Very large headers vs. medium body text).

### Don’t
*   **Don't** use pure black (#000000). Always use `on-secondary-fixed` (#1a1c1e) for text to maintain a "soft" premium feel.
*   **Don't** use 1px solid dividers or high-contrast borders.
*   **Don't** use standard drop shadows. If it looks like a "box shadow," it's too heavy.
*   **Don't** crowd the Neon Yellow. It is a "spark," not a "flood." If it covers more than 5% of the screen, reduce it.

---
**Director's Note:** This system is about the balance between "Clinical Tech" and "Premium Lifestyle." Every pixel should feel like it was placed with surgical intent. If an element doesn't serve a clear functional or editorial purpose, remove it.```