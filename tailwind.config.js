/* global module */
/** @type {import('tailwindcss').Config}
 *
 *  Tailwind v4 preset that mirrors the Płyndo design system tokens.
 *  Import in your project's tailwind.config.js:
 *
 *      const plyndoPreset = require('./design-system/tailwind.config.js');
 *      module.exports = { presets: [plyndoPreset], content: ['./src/**\/*.{js,jsx,ts,tsx,html}'] };
 *
 *  Token source of truth: ./tokens.json + ./colors_and_type.css.
 *  Keep all three in sync.
 */

const labelHues = {
  dish:    { bg: '#276142', deep: '#1c623b', pat: '#40725a', on: '#ffffff' },
  dw:      { bg: '#a7444b', deep: '#72242b', pat: '#bd6266', on: '#ffffff' },
  laundry: { bg: '#a5c7eb', deep: '#60a5d8', pat: '#bed5f0', on: '#1e4c7a' },
  rinse:   { bg: '#a692c6', deep: '#725ca6', pat: '#8f7bb5', on: '#ffffff' },
  floor:   { bg: '#784638', deep: '#542e24', pat: '#8e5a4b', on: '#ffffff' },
  wc:      { bg: '#e0e0e0', deep: '#a3a3a3', pat: '#d1d1d1', on: '#1a1a1a' },
  hand:    { bg: '#eac973', deep: '#9f7849', pat: '#eac973', on: '#3e341b' },
  glass:   { bg: '#a7cfea', deep: '#2a7f96', pat: '#bde0f5', on: '#114455' },
  bath:    { bg: '#5c77b7', deep: '#3f5398', pat: '#3f5398', on: '#ffffff' },
  sani:    { bg: '#ececec', deep: '#c7c7c7', pat: '#ffffff', on: '#1a1a1a' },
};

module.exports = {
  theme: {
    extend: {
      colors: {
        ink:    '#231f20',
        bone:   '#f6f4ef',
        paper:  '#ffffff',
        cobalt: { DEFAULT: '#2550a4', ink: '#14316a' },
        citron: { DEFAULT: '#e4c969', deep: '#b3912e' },

        // Per-SKU colour groups (e.g. `bg-label-dish` / `text-label-dish-on`).
        ...Object.fromEntries(Object.entries(labelHues).map(([k, v]) => [
          `label-${k}`, { DEFAULT: v.bg, deep: v.deep, pat: v.pat, on: v.on },
        ])),

        // Material-You-derived neutral ramp.
        n: {
          0:    '#ffffff', 50:   '#f6f4ef', 100:  '#f3f4f5', 150:  '#edeeef',
          200:  '#e7e8e9', 300:  '#e1e3e4', 400:  '#c1c6d7', 500:  '#717786',
          700:  '#414755', 800:  '#2e3132', 900:  '#111111', 1000: '#000000',
        },

        // Semantic aliases (preferred — switch on light/dark via CSS vars in
        // production rather than hard-coded hex).
        bg:           'var(--color-bg, #ffffff)',
        'bg-muted':   'var(--color-bg-muted, #f3f4f5)',
        fg:           'var(--color-fg, #000000)',
        'fg-muted':   'var(--color-fg-muted, #414755)',
        'fg-subtle':  'var(--color-fg-subtle, #717786)',
        border:       'var(--color-border, rgba(193,198,215,.6))',
        'border-strong': 'var(--color-border-strong, #c1c6d7)',
      },

      fontFamily: {
        sans:    ['Switzer', 'ui-sans-serif', 'system-ui', '-apple-system', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Switzer', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif:   ['Lora', '"Cormorant Garamond"', 'Georgia', 'Times New Roman', 'serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'JetBrains Mono', 'Consolas', 'monospace'],
      },

      fontSize: {
        xs:   ['12px', { lineHeight: 1.4 }],
        sm:   ['14px', { lineHeight: 1.55 }],
        base: ['16px', { lineHeight: 1.55 }],
        md:   ['18px', { lineHeight: 1.55 }],
        lg:   ['20px', { lineHeight: 1.55 }],
        xl:   ['24px', { lineHeight: 1.2 }],
        '2xl':['30px', { lineHeight: 1.2 }],
        '3xl':['36px', { lineHeight: 1.2 }],
        '4xl':['48px', { lineHeight: 1.05 }],
        '5xl':['64px', { lineHeight: 1.05 }],
        '6xl':['88px', { lineHeight: 1.05 }],
      },

      letterSpacing: {
        tight: '-0.025em',
        snug:  '-0.015em',
        wide:  '0.05em',
        wider: '0.12em',
      },

      borderRadius: {
        xs:  '4px',  sm:   '6px',  md: '10px',
        lg:  '16px', xl:   '24px',
        '2xl':'32px', pill: '9999px',
      },

      boxShadow: {
        xs:  '0 1px 2px rgba(17,17,17,.06)',
        sm:  '0 2px 6px rgba(17,17,17,.08)',
        md:  '0 8px 24px rgba(17,17,17,.10)',
        lg:  '0 18px 48px rgba(17,17,17,.14)',
        cta: '0 10px 26px rgba(0,0,0,.22)',
      },

      spacing: {
        1: '4px',  2: '8px',   3: '12px',  4: '16px',  5: '20px',  6: '24px',
        8: '32px', 10: '40px', 12: '48px', 16: '64px', 20: '80px', 24: '96px',
        32: '128px',
      },

      transitionTimingFunction: {
        'soft-spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      maxWidth: {
        container: '1280px',
      },
    },
  },
};
