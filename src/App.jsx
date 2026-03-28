import { useMemo, useState } from 'react'

const proofItems = [
  '8-category household chemistry system',
  'Flexible delivery every 1, 2, or 3 months',
  'Designed for Polish households and delivery logic',
  'Built around premium performance and calmer routines',
]

const operatingPains = [
  {
    title: 'Reactive purchasing',
    copy:
      'Essentials run out exactly when they are needed most, forcing rushed supermarket decisions and inconsistent results.',
  },
  {
    title: 'Cabinet sprawl',
    copy:
      'Households accumulate random bottles with unclear purpose, duplicated function, and no replenishment logic.',
  },
  {
    title: 'No usage intelligence',
    copy:
      'Most cleaning purchases ignore home size, household rhythm, children, pets, and actual consumption patterns.',
  },
]

const pillars = [
  {
    eyebrow: 'Always stocked',
    title: 'Recurring supply without emergency store runs',
    copy:
      'Plyndo is built to keep core household chemistry in rotation before your cabinets hit zero.',
  },
  {
    eyebrow: 'Performance first',
    title: 'A curated product system instead of bottle chaos',
    copy:
      'The offer focuses on essential household jobs with a clean operating model, not infinite SKU noise.',
  },
  {
    eyebrow: 'Adaptive by design',
    title: 'Cadence and bundle logic matched to real usage',
    copy:
      'The model is designed around configurable cycles, adjustable plans, and AI-assisted household fitting.',
  },
]

const journeySteps = [
  {
    step: '01',
    title: 'Choose your household profile',
    copy:
      'Start with a home profile and define how your household actually functions: size, rhythm, children, pets, and intensity of use.',
  },
  {
    step: '02',
    title: 'Receive a chemistry set built for routine',
    copy:
      'Plyndo packages core liquids into a considered subscription offer with room for personalization and future AI fit.',
  },
  {
    step: '03',
    title: 'Refine delivery as your usage becomes clear',
    copy:
      'Adjust cadence, pause, switch plan size, and evolve the set as your real-home consumption data becomes visible.',
  },
]

const plans = [
  {
    name: 'Mini',
    audience: 'For compact households',
    cadence: 'Best for lighter weekly usage and lower storage footprint.',
    includes: [
      'Core chemistry starter selection',
      'Suggested 2- or 3-month cadence',
      'Waitlist priority for AI matching',
    ],
  },
  {
    name: 'Midi',
    audience: 'For active everyday homes',
    cadence: 'Balanced volume for steady family routines and mixed surfaces.',
    includes: [
      'Expanded cross-room essentials',
      'Recommended 1- or 2-month cadence',
      'Bundle personalization pathway',
    ],
  },
  {
    name: 'Maxi',
    audience: 'For larger or high-usage households',
    cadence: 'Built for households that need operational consistency at scale.',
    includes: [
      'Full-home replenishment framing',
      'Priority delivery planning logic',
      'Future subscription management upgrades',
    ],
  },
]

const systemModules = [
  'Kitchen care',
  'Bathroom care',
  'Floor and surface care',
  'Laundry support',
  'Dishwashing essentials',
  'Refill and replenishment logic',
  'Delivery orchestration across Poland',
  'Subscription-lite fallback for lower-friction reorders',
]

const comparisonRows = [
  {
    label: 'Buying pattern',
    plyndo: 'Planned replenishment matched to household rhythm',
    alt: 'Reactive top-ups when something runs out',
  },
  {
    label: 'Product logic',
    plyndo: 'Curated system with role clarity',
    alt: 'Overwhelming shelf choice and duplicated functions',
  },
  {
    label: 'Operational fit',
    plyndo: 'Cadence flexibility and future AI fit',
    alt: 'Static purchases with no usage memory',
  },
  {
    label: 'Home experience',
    plyndo: 'Cleaner, calmer, more controlled',
    alt: 'Ad hoc, cluttered, and purchase-heavy',
  },
]

const trustPoints = [
  'Transparent subscription and pause logic',
  'Polish delivery context with InPost and courier flows in scope',
  'Premium brand standard over discount-market positioning',
  'Customer account model for plan and cadence management',
]

const faqs = [
  {
    question: 'What exactly is Plyndo?',
    answer:
      'Plyndo is a premium D2C household chemistry subscription concept for Poland, designed to simplify recurring cleaning-product purchasing through curated plans and delivery cadence control.',
  },
  {
    question: 'What would be included in the MVP offer?',
    answer:
      'The MVP strategy centers on an 8-product household chemistry system, package tiers such as Mini, Midi, and Maxi, and a waitlist-first path into recurring replenishment.',
  },
  {
    question: 'Can customers change delivery timing?',
    answer:
      'Yes. The operating model assumes configurable delivery cycles every 1, 2, or 3 months, with pause and change controls in the customer account.',
  },
  {
    question: 'Is this already live for purchase?',
    answer:
      'This landing page is built as the launch and validation layer for the MVP. The primary conversion is early access and waitlist enrollment, not broad public checkout.',
  },
  {
    question: 'Will the product be tailored to different households?',
    answer:
      'Yes. The strategy includes an AI-assisted questionnaire to fit set composition and replenishment frequency based on home size, household makeup, and lifestyle.',
  },
  {
    question: 'Do you deliver across Poland?',
    answer:
      'The strategy is built for the Polish market, including PLN payments and local delivery expectations, with InPost and courier logistics in scope.',
  },
]

function SectionLabel({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-mineral">
      <span className="h-px w-10 bg-mineral/30" />
      {children}
    </div>
  )
}

function App() {
  const [activeFaq, setActiveFaq] = useState(0)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const stats = useMemo(
    () => [
      { value: '8', label: 'core chemistry categories in MVP scope' },
      { value: '1-3', label: 'month delivery cycles planned' },
      { value: 'PL', label: 'market focus and logistics context' },
      { value: 'AI', label: 'assisted fitting model in product plan' },
    ],
    [],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-porcelain text-charcoal">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-12rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-sage/40 blur-3xl" />
        <div className="absolute right-[-8rem] top-[24rem] h-[26rem] w-[26rem] rounded-full bg-foam/70 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-7xl px-6 pb-24 pt-6 sm:px-10 lg:px-12">
        <header className="mb-12 flex flex-col gap-6 border-b border-charcoal/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="font-display text-3xl tracking-[0.14em] text-mineral">
              plyndo.pl
            </div>
            <p className="mt-2 max-w-xl text-sm text-charcoal/70">
              Premium household chemistry subscription strategy for modern homes
              in Poland.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-5 text-sm text-charcoal/70">
            <a className="transition hover:text-charcoal" href="#system">
              System
            </a>
            <a className="transition hover:text-charcoal" href="#plans">
              Plans
            </a>
            <a className="transition hover:text-charcoal" href="#difference">
              Differentiation
            </a>
            <a className="transition hover:text-charcoal" href="#faq">
              FAQ
            </a>
          </nav>
        </header>

        <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="max-w-3xl">
            <SectionLabel>Clinical clarity meets elevated home care</SectionLabel>
            <h1 className="max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.04em] text-charcoal sm:text-6xl lg:text-8xl">
              Home chemistry, rebuilt as a premium operating system.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-charcoal/75 sm:text-xl">
              Plyndo turns household chemistry from reactive shopping into a
              performance-led subscription model: curated liquids, flexible
              replenishment, calmer cabinets, and fewer emergency store runs.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-xl bg-mineral px-6 py-3.5 text-sm font-semibold text-porcelain transition hover:bg-mineral/90"
              >
                Join the waitlist
              </a>
              <a
                href="#journey"
                className="inline-flex items-center justify-center rounded-xl border border-charcoal/15 bg-white/60 px-6 py-3.5 text-sm font-semibold text-charcoal transition hover:border-charcoal/30 hover:bg-white"
              >
                See how it works
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {proofItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-charcoal/10 bg-white/50 px-4 py-4 text-sm text-charcoal/75 shadow-[0_12px_40px_rgba(34,42,37,0.05)] backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-charcoal/10 bg-white/70 p-6 shadow-[0_20px_80px_rgba(20,28,24,0.08)] backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-sage/35 p-5"
                  >
                    <div className="font-display text-5xl tracking-[-0.05em] text-mineral">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-charcoal/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[1.75rem] bg-charcoal px-6 py-6 text-porcelain">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-porcelain/60">
                  Launch logic
                </div>
                <div className="mt-4 grid gap-4 border-t border-white/10 pt-4 text-sm text-porcelain/80">
                  <div className="flex items-start justify-between gap-4">
                    <span>Offer architecture</span>
                    <span className="text-right">Mini / Midi / Maxi</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span>Delivery model</span>
                    <span className="text-right">InPost + courier</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span>Retention hook</span>
                    <span className="text-right">automated replenishment</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden max-w-xs rounded-[1.5rem] border border-copper/20 bg-copper/10 p-5 text-sm leading-6 text-charcoal/75 lg:block">
              <div className="font-semibold uppercase tracking-[0.22em] text-copper">
                Positioning
              </div>
              <p className="mt-3">
                Not another cleaning-products store. A premium domestic brand
                built around replenishment logic, confidence, and home
                operations.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Category tension</SectionLabel>
            <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-charcoal sm:text-5xl">
              Household chemistry is still managed like a chore.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {operatingPains.map((pain) => (
              <article
                key={pain.title}
                className="rounded-[1.75rem] border border-charcoal/10 bg-white/55 p-6"
              >
                <h3 className="font-display text-2xl text-charcoal">
                  {pain.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-charcoal/72">
                  {pain.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="system"
          className="mt-24 rounded-[2rem] border border-charcoal/10 bg-mineral px-6 py-10 text-porcelain sm:px-10"
        >
          <SectionLabel>Core promise</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-porcelain sm:text-5xl">
                One system for a cleaner, better-run home.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-porcelain/75">
                The strategy is built around turning essential chemistry into a
                structured routine: fewer decisions, clearer product roles, and
                replenishment aligned to real usage rather than shelf anxiety.
              </p>
            </div>
            <div className="grid gap-4">
              {pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/6 p-6"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.26em] text-sage">
                    {pillar.eyebrow}
                  </div>
                  <h3 className="mt-3 font-display text-2xl text-porcelain">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-porcelain/72">
                    {pillar.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="journey"
          className="mt-24 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"
        >
          <div>
            <SectionLabel>How it works</SectionLabel>
            <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-charcoal sm:text-5xl">
              Built around real household routines, not generic bundles.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-charcoal/72">
              The NotebookLM strategy points to a simple MVP flow: understand the
              home, configure a plan, and make replenishment manageable from a
              customer account.
            </p>
          </div>
          <div className="grid gap-4">
            {journeySteps.map((item) => (
              <article
                key={item.step}
                className="grid gap-4 rounded-[1.75rem] border border-charcoal/10 bg-white/60 p-6 shadow-[0_18px_60px_rgba(25,34,29,0.05)] sm:grid-cols-[90px_1fr]"
              >
                <div className="font-display text-5xl tracking-[-0.05em] text-copper">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-display text-2xl text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal/72">
                    {item.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="plans"
          className="mt-24 rounded-[2rem] border border-charcoal/10 bg-white/60 px-6 py-10 sm:px-10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionLabel>Offer architecture</SectionLabel>
              <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-charcoal sm:text-5xl">
                Subscription packages designed as operating formats.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-charcoal/72">
              The MVP strategy suggests pre-defined package tiers with
              personalization rather than open-ended catalog chaos. Start with
              essentials, then expand into a fuller replenishment system.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <article
                key={plan.name}
                className={`rounded-[1.75rem] border p-6 ${
                  index === 1
                    ? 'border-mineral bg-mineral text-porcelain'
                    : 'border-charcoal/10 bg-porcelain/80 text-charcoal'
                }`}
              >
                <div
                  className={`text-xs font-semibold uppercase tracking-[0.26em] ${
                    index === 1 ? 'text-sage' : 'text-copper'
                  }`}
                >
                  {plan.audience}
                </div>
                <h3 className="mt-4 font-display text-4xl tracking-[-0.05em]">
                  {plan.name}
                </h3>
                <p
                  className={`mt-4 text-sm leading-7 ${
                    index === 1 ? 'text-porcelain/74' : 'text-charcoal/72'
                  }`}
                >
                  {plan.cadence}
                </p>
                <ul className="mt-6 grid gap-3 text-sm">
                  {plan.includes.map((item) => (
                    <li
                      key={item}
                      className={`rounded-xl px-4 py-3 ${
                        index === 1 ? 'bg-white/8' : 'bg-white/70'
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {systemModules.map((module) => (
              <div
                key={module}
                className="rounded-2xl border border-charcoal/10 bg-white px-4 py-4 text-sm text-charcoal/75"
              >
                {module}
              </div>
            ))}
          </div>
        </section>

        <section
          id="difference"
          className="mt-24 grid gap-10 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div>
            <SectionLabel>Differentiation</SectionLabel>
            <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-charcoal sm:text-5xl">
              Why Plyndo is not another cleaning-products store.
            </h2>
            <p className="mt-6 text-base leading-8 text-charcoal/72">
              The model positions chemistry as household infrastructure:
              predictable, performance-driven, and managed with the same
              intentionality as any other critical home system.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-charcoal/10 bg-white/75">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-4 border-b border-charcoal/10 px-6 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/55">
              <div>Dimension</div>
              <div>Plyndo</div>
              <div>Typical buying</div>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.2fr_1fr_1fr] gap-4 border-b border-charcoal/8 px-6 py-5 text-sm last:border-b-0"
              >
                <div className="font-semibold text-charcoal">{row.label}</div>
                <div className="text-charcoal/78">{row.plyndo}</div>
                <div className="text-charcoal/56">{row.alt}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[2rem] border border-charcoal/10 bg-copper/10 p-8">
            <SectionLabel>Trust architecture</SectionLabel>
            <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-charcoal">
              Built for households that value standards, not noise.
            </h2>
            <div className="mt-8 grid gap-3">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl bg-white/75 px-4 py-4 text-sm leading-7 text-charcoal/74"
                >
                  {point}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-charcoal/10 bg-charcoal p-8 text-porcelain">
            <SectionLabel>Launch thesis</SectionLabel>
            <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-porcelain">
              A sharper start than generic ecommerce expansion.
            </h2>
            <div className="mt-8 grid gap-5 text-sm leading-7 text-porcelain/76">
              <p>
                The NotebookLM strategy frames the MVP as a focused Polish pilot:
                premium household chemistry, direct-to-consumer economics, a
                waitlist-led launch, and room for AI-assisted fit.
              </p>
              <p>
                Growth is expected to come from educational content, referrals,
                and seasonal activation rather than aggressive discounting or
                broad catalog bloat.
              </p>
              <p>
                The page therefore sells control, consistency, and confidence,
                not cheap chemicals or generic eco clichés.
              </p>
            </div>
          </article>
        </section>

        <section
          id="faq"
          className="mt-24 grid gap-10 lg:grid-cols-[0.78fr_1.22fr]"
        >
          <div>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-charcoal sm:text-5xl">
              Operational clarity for early customers.
            </h2>
          </div>
          <div className="grid gap-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index
              return (
                <button
                  key={faq.question}
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? -1 : index)}
                  className="rounded-[1.5rem] border border-charcoal/10 bg-white/65 p-6 text-left transition hover:border-charcoal/20 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-2xl text-charcoal">
                      {faq.question}
                    </span>
                    <span className="mt-1 text-xl text-copper">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  {isOpen ? (
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-charcoal/72">
                      {faq.answer}
                    </p>
                  ) : null}
                </button>
              )
            })}
          </div>
        </section>

        <section
          id="waitlist"
          className="mt-24 rounded-[2rem] border border-charcoal/10 bg-gradient-to-br from-mineral via-mineral to-charcoal px-6 py-10 text-porcelain shadow-[0_24px_90px_rgba(18,31,27,0.18)] sm:px-10"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <SectionLabel>Early access</SectionLabel>
              <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-porcelain sm:text-6xl">
                Stop managing chemistry bottle by bottle.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-porcelain/74">
                Join the first wave of Polish households following the Plyndo
                launch. This page is designed as the MVP landing layer: one
                clear conversion path, strong value framing, and room for the
                subscription engine behind it.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[1.75rem] border border-white/10 bg-white/8 p-6 backdrop-blur"
            >
              <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-sage">
                Pilot waitlist
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@company.pl"
                className="mt-4 w-full rounded-xl border border-white/12 bg-white/10 px-4 py-3 text-base text-porcelain outline-none placeholder:text-porcelain/35 focus:border-sage"
              />
              <button
                type="submit"
                className="mt-4 w-full rounded-xl bg-porcelain px-5 py-3.5 text-sm font-semibold text-mineral transition hover:bg-white"
              >
                Get early access
              </button>
              <p className="mt-4 text-sm leading-7 text-porcelain/66">
                {submitted
                  ? `Thanks. ${email} is marked for launch updates in this prototype flow.`
                  : 'Current prototype conversion captures launch intent, package interest, and future subscription-fit demand.'}
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
