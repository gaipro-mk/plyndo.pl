import { useEffect, useMemo, useState } from 'react'

import { copy } from './content'

const THEME_OPTIONS = ['light', 'dark', 'system']
const FONT_SCALE_OPTIONS = ['sm', 'md', 'lg']
const LANGUAGE_OPTIONS = ['pl', 'en']
const NAV_SECTIONS = ['product', 'plans', 'operations', 'standard', 'faq', 'waitlist']

function resolveTheme(theme) {
  if (theme !== 'system') return theme

  if (typeof window === 'undefined') return 'light'

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('plyndo-language') || 'pl')
  const [theme, setTheme] = useState(() => localStorage.getItem('plyndo-theme') || 'system')
  const [fontScale, setFontScale] = useState(() => localStorage.getItem('plyndo-font-scale') || 'md')
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const content = useMemo(() => copy[language] || copy.pl, [language])

  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = () => {
      root.dataset.theme = resolveTheme(theme)
    }

    applyTheme()
    root.dataset.fontScale = FONT_SCALE_OPTIONS.includes(fontScale) ? fontScale : 'md'
    root.lang = content.htmlLang
    document.title = content.title

    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', content.description)

    if (theme === 'system') {
      media.addEventListener('change', applyTheme)
      return () => media.removeEventListener('change', applyTheme)
    }

    return undefined
  }, [content.description, content.htmlLang, content.title, fontScale, theme])

  useEffect(() => {
    localStorage.setItem('plyndo-language', language)
  }, [language])

  useEffect(() => {
    localStorage.setItem('plyndo-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('plyndo-font-scale', fontScale)
  }, [fontScale])

  const handleWaitlistSubmit = (event) => {
    event.preventDefault()

    if (!email.trim()) return

    setSubmitted(true)
    setEmail('')
  }

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage)
    setMenuOpen(false)
  }

  return (
    <div className="relative overflow-hidden">
      <div className="ambient-orb ambient-orb-left" />
      <div className="ambient-orb ambient-orb-right" />

      <header className="section-shell pt-4 sm:pt-5">
        <div className="nav-shell glass-panel">
          <div className="flex items-center justify-between gap-4">
            <a className="brand-lockup" href="#top">
              <span className="brand-dot" />
              <span className="font-display text-lg font-semibold tracking-[0.08em] sm:text-xl">
                {content.brand}
              </span>
            </a>

            <nav className="hidden items-center gap-6 lg:flex">
              {NAV_SECTIONS.map((section) => (
                <a key={section} className="nav-link" href={`#${section}`}>
                  {content.nav[section]}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-2 xl:flex">
              <PreferenceGroup
                label={content.controls.language}
                options={LANGUAGE_OPTIONS}
                value={language}
                onChange={handleLanguageChange}
                labels={{ pl: 'PL', en: 'EN' }}
              />
              <PreferenceGroup
                label={content.controls.theme}
                options={THEME_OPTIONS}
                value={theme}
                onChange={setTheme}
                labels={{
                  light: content.controls.light,
                  dark: content.controls.dark,
                  system: content.controls.system,
                }}
              />
              <PreferenceGroup
                label={content.controls.fontSize}
                options={FONT_SCALE_OPTIONS}
                value={fontScale}
                onChange={setFontScale}
                labels={{
                  sm: content.controls.small,
                  md: content.controls.medium,
                  lg: content.controls.large,
                }}
              />
            </div>

            <button
              aria-expanded={menuOpen}
              className="menu-button xl:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              type="button"
            >
              {menuOpen ? content.nav.close : content.nav.menu}
            </button>
          </div>

          {menuOpen ? (
            <div className="mobile-menu xl:hidden">
              <nav className="mobile-menu-links">
                {NAV_SECTIONS.map((section) => (
                  <a key={section} className="mobile-nav-link" href={`#${section}`}>
                    {content.nav[section]}
                  </a>
                ))}
              </nav>
              <div className="mobile-control-stack">
                <PreferenceGroup
                  label={content.controls.language}
                  options={LANGUAGE_OPTIONS}
                  value={language}
                  onChange={handleLanguageChange}
                  labels={{ pl: 'PL', en: 'EN' }}
                />
                <PreferenceGroup
                  label={content.controls.theme}
                  options={THEME_OPTIONS}
                  value={theme}
                  onChange={setTheme}
                  labels={{
                    light: content.controls.light,
                    dark: content.controls.dark,
                    system: content.controls.system,
                  }}
                />
                <PreferenceGroup
                  label={content.controls.fontSize}
                  options={FONT_SCALE_OPTIONS}
                  value={fontScale}
                  onChange={setFontScale}
                  labels={{
                    sm: content.controls.small,
                    md: content.controls.medium,
                    lg: content.controls.large,
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main id="top">
        <section className="section-shell pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-20 lg:pt-14">
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 className="hero-title">{content.hero.title}</h1>
              <p className="hero-lead">{content.hero.lead}</p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a className="primary-button" href="#waitlist">
                  {content.hero.primary}
                </a>
                <a className="secondary-button" href="#operations">
                  {content.hero.secondary}
                </a>
              </div>

              <ul className="proof-grid mt-8">
                {content.hero.proof.map((item) => (
                  <li key={item} className="proof-chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hero-aside">
              <div className="glass-panel hero-panel">
                <div className="grid gap-3 sm:grid-cols-2">
                  {content.hero.metrics.map((metric) => (
                    <article key={metric.label} className="metric-card">
                      <p className="text-3xl font-display font-semibold sm:text-4xl">{metric.value}</p>
                      <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{metric.label}</p>
                    </article>
                  ))}
                </div>

                <div className="inner-sheet mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
                    {content.hero.panelTitle}
                  </p>
                  <div className="mt-5 space-y-4">
                    {content.hero.panelRows.map(([label, value]) => (
                      <div
                        key={label}
                        className="flex flex-col gap-2 border-b border-[var(--line-soft)] pb-4 text-sm last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                      >
                        <span className="text-[var(--muted)]">{label}</span>
                        <span className="font-semibold text-[var(--ink)]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-6 max-w-xl text-sm leading-6 text-[var(--ink-soft)]">
                  {content.hero.sideNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell section-gap" id="product">
          <div className="section-heading">
            <p className="eyebrow">{content.value.eyebrow}</p>
            <h2 className="section-title">{content.value.title}</h2>
            <p className="section-lead">{content.value.lead}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {content.value.items.map((item) => (
              <article key={item.title} className="glass-panel value-card">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-copy">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell section-gap" id="plans">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">{content.plans.eyebrow}</p>
              <h2 className="section-title">{content.plans.title}</h2>
            </div>
            <p className="section-lead max-w-2xl">{content.plans.lead}</p>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.35fr_0.95fr]">
            <div className="grid gap-5 lg:grid-cols-3">
              {content.plans.cards.map((plan, index) => (
                <article
                  key={plan.name}
                  className={index === 1 ? 'plan-card-active' : 'plan-card'}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
                    {plan.audience}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-semibold">{plan.name}</h3>
                  <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">{plan.cadence}</p>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-[var(--ink)]">
                    {plan.bullets.map((bullet) => (
                      <li key={bullet} className="feature-line">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="glass-panel scope-panel">
              <p className="eyebrow">{content.plans.modulesTitle}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {content.plans.modules.map((module) => (
                  <div key={module} className="scope-chip">
                    {module}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell section-gap" id="operations">
          <div className="section-heading">
            <p className="eyebrow">{content.operations.eyebrow}</p>
            <h2 className="section-title">{content.operations.title}</h2>
            <p className="section-lead">{content.operations.lead}</p>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.25fr_0.95fr]">
            <div className="grid gap-5 md:grid-cols-3">
              {content.operations.steps.map((step) => (
                <article key={step.step} className="glass-panel step-card">
                  <p className="step-index">{step.step}</p>
                  <h3 className="card-title">{step.title}</h3>
                  <p className="card-copy">{step.copy}</p>
                </article>
              ))}
            </div>

            <div className="grid gap-5">
              {content.operations.rails.map((item) => (
                <article key={item.title} className="glass-panel rail-card">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-copy">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-gap" id="standard">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">{content.standard.eyebrow}</p>
              <h2 className="section-title">{content.standard.title}</h2>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr]">
            <div className="grid gap-5 sm:grid-cols-2">
              {content.standard.features.map((feature) => (
                <article key={feature.title} className="glass-panel value-card">
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-copy">{feature.copy}</p>
                </article>
              ))}
            </div>

            <div className="glass-panel compare-panel">
              <div className="compare-head compare-grid">
                <span />
                <span>{content.brand}</span>
                <span>Retail</span>
              </div>
              {content.standard.comparison.map((row) => (
                <div key={row.label} className="compare-row compare-grid">
                  <span className="compare-label">{row.label}</span>
                  <span className="compare-good">{row.left}</span>
                  <span className="compare-alt">{row.right}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-gap">
          <div className="glass-panel narrative-panel">
            <div className="section-heading max-w-3xl">
              <p className="eyebrow">{content.proof.eyebrow}</p>
              <h2 className="section-title">{content.proof.title}</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {content.proof.items.map((item) => (
                <div key={item} className="inner-sheet narrative-card">
                  <p className="text-sm leading-7 text-[var(--ink)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-gap" id="faq">
          <div className="section-heading">
            <p className="eyebrow">{content.faq.eyebrow}</p>
            <h2 className="section-title">{content.faq.title}</h2>
          </div>
          <div className="grid gap-4">
            {content.faq.items.map((item) => (
              <article key={item.question} className="glass-panel faq-card">
                <h3 className="card-title">{item.question}</h3>
                <p className="card-copy">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell pb-16 pt-4 sm:pb-20 lg:pb-24" id="waitlist">
          <div className="cta-shell">
            <div className="max-w-3xl">
              <p className="eyebrow text-white/80">{content.waitlist.eyebrow}</p>
              <h2 className="section-title mt-4 text-white">{content.waitlist.title}</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
                {content.waitlist.lead}
              </p>
            </div>

            <form className="waitlist-form" onSubmit={handleWaitlistSubmit}>
              <input
                aria-label={content.waitlist.placeholder}
                className="waitlist-input"
                onChange={(event) => setEmail(event.target.value)}
                placeholder={content.waitlist.placeholder}
                type="email"
                value={email}
              />
              <button className="primary-button-inverse" type="submit">
                {content.waitlist.submit}
              </button>
            </form>

            <p className="mt-4 text-sm leading-7 text-white/76">
              {submitted ? content.waitlist.success : content.waitlist.note}
            </p>
          </div>
        </section>
      </main>

      <footer className="section-shell pb-10">
        <div className="footer-shell">
          <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">{content.footer}</p>
        </div>
      </footer>
    </div>
  )
}

function PreferenceGroup({ label, labels, onChange, options, value }) {
  return (
    <div className="control-group">
      <span className="control-label">{label}</span>
      {options.map((option) => (
        <button
          key={option}
          className={option === value ? 'control-chip control-chip-active' : 'control-chip'}
          onClick={() => onChange(option)}
          type="button"
        >
          {labels[option]}
        </button>
      ))}
    </div>
  )
}

export default App
