import { useMemo, useState } from 'react'

const proofItems = [
  '8 kluczowych kategorii chemii domowej',
  'Dostawy co 1, 2 lub 3 miesiące',
  'Model zaprojektowany dla polskich gospodarstw domowych',
  'Premium skuteczność i spokojniejsza codzienność',
]

const operatingPains = [
  {
    title: 'Zakupy w trybie awaryjnym',
    copy:
      'Essentials run out exactly when they are needed most, forcing rushed supermarket decisions and inconsistent results.',
  },
  {
    title: 'Chaos w szafkach',
    copy:
      'Households accumulate random bottles with unclear purpose, duplicated function, and no replenishment logic.',
  },
  {
    title: 'Brak dopasowania do realnego zużycia',
    copy:
      'Większość zakupów ignoruje metraż, rytm domu, dzieci, zwierzęta i realne wzorce zużycia.',
  },
]

const pillars = [
  {
    eyebrow: 'Zawsze pod ręką',
    title: 'Regularne uzupełnianie bez awaryjnych wizyt w sklepie',
    copy:
      'Plyndo ma utrzymywać kluczową chemię domową w obiegu, zanim Twoje szafki się wyzerują.',
  },
  {
    eyebrow: 'Najpierw skuteczność',
    title: 'Przemyślany system produktów zamiast przypadkowych butelek',
    copy:
      'Oferta koncentruje się na najważniejszych zadaniach domowych, a nie na nieskończonym chaosie SKU.',
  },
  {
    eyebrow: 'Elastyczny model',
    title: 'Częstotliwość i zestaw dopasowane do realnego rytmu domu',
    copy:
      'Model opiera się na konfigurowalnych cyklach, elastycznych planach i dopasowaniu wspieranym przez AI.',
  },
]

const journeySteps = [
  {
    step: '01',
    title: 'Porozmawiaj z doradcą AI',
    copy:
      'Zacznij od profilu domu i określ, jak naprawdę funkcjonuje Twoje gospodarstwo: metraż, rytm, dzieci, zwierzęta i intensywność użycia.',
  },
  {
    step: '02',
    title: 'Odbierz swój zestaw',
    copy:
      'Plyndo układa kluczowe płyny w przemyślaną ofertę subskrypcyjną z miejscem na personalizację i przyszłe dopasowanie AI.',
  },
  {
    step: '03',
    title: 'Zautomatyzuj porządek',
    copy:
      'Adjust cadence, pause, switch plan size, and evolve the set as your real-home consumption data becomes visible.',
  },
]

const plans = [
  {
    name: 'Mini',
    audience: 'Dla singli i par',
    cadence: 'Skoncentrowany na podstawowych potrzebach przy mniejszym metrażu.',
    includes: [
      'Podstawowy zestaw chemii domowej',
      'Cykl dostaw co 2 lub 3 miesiące',
      'Pierwszeństwo do dopasowania AI',
    ],
  },
  {
    name: 'Midi',
    audience: 'Dla rodziny',
    cadence: 'Pełen wachlarz 8 kluczowych produktów dla domów z dziećmi.',
    includes: [
      'Pełniejszy zestaw do wielu stref domu',
      'Standardowe dostawy co miesiąc',
      'Możliwość personalizacji zestawu',
    ],
  },
  {
    name: 'Maxi',
    audience: 'Dla firm',
    cadence: 'Duże pojemności i regularne dostawy dla biur i małych firm.',
    includes: [
      'Rozwiązanie dla wysokiego standardu higieny',
      'Priorytetowa logika dostaw',
      'Gotowość pod rozbudowaną obsługę subskrypcji',
    ],
  },
]

const systemModules = [
  'Pielęgnacja kuchni',
  'Pielęgnacja łazienki',
  'Podłogi i powierzchnie',
  'Wsparcie prania',
  'Zmywanie',
  'Logika uzupełniania zapasów',
  'Dostawy na terenie Polski',
  'Subskrypcja Lite dla szybkich ponowień',
]

const comparisonRows = [
  {
    label: 'Sposób kupowania',
    plyndo: 'Planowane uzupełnianie dopasowane do rytmu domu',
    alt: 'Reaktywne dokupywanie po wyczerpaniu zapasu',
  },
  {
    label: 'Logika produktów',
    plyndo: 'Kuratorski system z jasną rolą każdego środka',
    alt: 'Przeładowane półki i dublujące się funkcje',
  },
  {
    label: 'Dopasowanie operacyjne',
    plyndo: 'Elastyczna częstotliwość i przyszłe dopasowanie AI',
    alt: 'Statyczne zakupy bez pamięci zużycia',
  },
  {
    label: 'Doświadczenie domu',
    plyndo: 'Czyściej, spokojniej i pod większą kontrolą',
    alt: 'Chaotycznie, doraźnie i zakupowo',
  },
]

const trustPoints = [
  'Przejrzyste zasady subskrypcji, pauzy i zmian',
  'Polski kontekst dostaw z InPost i kurierem',
  'Standard premium zamiast pozycjonowania dyskontowego',
  'Panel klienta do zarządzania planem i częstotliwością',
]

const faqs = [
  {
    question: 'Czym dokładnie jest Plyndo?',
    answer:
      'Plyndo to premium koncept subskrypcji chemii domowej dla Polski, który upraszcza regularne zakupy dzięki kuratorskim pakietom i kontroli częstotliwości dostaw.',
  },
  {
    question: 'Co obejmuje oferta MVP?',
    answer:
      'Strategia MVP opiera się na 8-kluczowym systemie chemii domowej, pakietach Mini, Midi i Maxi oraz ścieżce waitlist-first prowadzącej do modelu cyklicznego uzupełniania.',
  },
  {
    question: 'Czy można zmieniać częstotliwość dostaw?',
    answer:
      'Tak. Model zakłada dostawy co 1, 2 lub 3 miesiące oraz możliwość pauzy i zmian z poziomu konta klienta.',
  },
  {
    question: 'Czy usługę można już normalnie kupić?',
    answer:
      'Ta strona działa jako warstwa startowa i walidacyjna dla MVP. Główną konwersją jest zapis na wczesny dostęp, a nie pełny publiczny checkout.',
  },
  {
    question: 'Czy zestaw będzie dopasowany do rodzaju gospodarstwa?',
    answer:
      'Tak. Strategia zakłada ankietę wspieraną przez AI, która dopasowuje skład zestawu i częstotliwość uzupełniania do metrażu, domowników i stylu życia.',
  },
  {
    question: 'Czy dostarczacie w całej Polsce?',
    answer:
      'Tak. Strategia jest tworzona z myślą o polskim rynku, płatnościach w PLN oraz lokalnych oczekiwaniach logistycznych, w tym InPost i kurierze.',
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
      { value: '1-3', label: 'miesięczne cykle dostaw w planie MVP' },
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
              Premium subskrypcja chemii domowej dla nowoczesnych gospodarstw w Polsce.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-5 text-sm text-charcoal/70">
            <a className="transition hover:text-charcoal" href="#system">
              System
            </a>
            <a className="transition hover:text-charcoal" href="#plans">
              Pakiety
            </a>
            <a className="transition hover:text-charcoal" href="#difference">
              Różnice
            </a>
            <a className="transition hover:text-charcoal" href="#faq">
              FAQ
            </a>
          </nav>
        </header>

        <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="max-w-3xl">
            <SectionLabel>Profesjonalna skuteczność w domowej cenie</SectionLabel>
            <h1 className="max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.04em] text-charcoal sm:text-6xl lg:text-8xl">
              Twoje zapasy środków czystości mogą uzupełniać się same.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-charcoal/75 sm:text-xl">
              Odkryj Plyndo: profesjonalną skuteczność, kuratorskie pakiety,
              dopasowanie AI i wygodę dostaw prosto od polskiego producenta.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-xl bg-mineral px-6 py-3.5 text-sm font-semibold text-porcelain transition hover:bg-mineral/90"
              >
                Dołącz do listy oczekujących
              </a>
              <a
                href="#journey"
                className="inline-flex items-center justify-center rounded-xl border border-charcoal/15 bg-white/60 px-6 py-3.5 text-sm font-semibold text-charcoal transition hover:border-charcoal/30 hover:bg-white"
              >
                Zobacz, jak to działa
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
                  Logika startu
                </div>
                <div className="mt-4 grid gap-4 border-t border-white/10 pt-4 text-sm text-porcelain/80">
                  <div className="flex items-start justify-between gap-4">
                    <span>Architektura oferty</span>
                    <span className="text-right">Mini / Midi / Maxi</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span>Model dostawy</span>
                    <span className="text-right">InPost + kurier</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span>Mechanizm retencji</span>
                    <span className="text-right">automatyczne uzupełnianie</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden max-w-xs rounded-[1.5rem] border border-copper/20 bg-copper/10 p-5 text-sm leading-6 text-charcoal/75 lg:block">
              <div className="font-semibold uppercase tracking-[0.22em] text-copper">
                Pozycjonowanie
              </div>
              <p className="mt-3">
                To nie kolejny sklep z chemią. To premium marka domowa
                zbudowana wokół logiki uzupełniania zapasów, pewności wyboru
                i spokojniejszych domowych operacji.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Napięcie kategorii</SectionLabel>
            <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-charcoal sm:text-5xl">
              Chemia domowa nadal jest kupowana jak uciążliwy obowiązek.
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
            <SectionLabel>Główna obietnica</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-porcelain sm:text-5xl">
              Jeden system dla czystszego i lepiej działającego domu.
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
            <SectionLabel>Jak to działa</SectionLabel>
            <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-charcoal sm:text-5xl">
              Zbudowane wokół realnych domowych rytmów, a nie przypadkowych pakietów.
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
            <SectionLabel>Architektura oferty</SectionLabel>
            <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-charcoal sm:text-5xl">
              Pakiety subskrypcyjne zaprojektowane jak formaty działania domu.
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
            <SectionLabel>Co nas wyróżnia</SectionLabel>
            <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-charcoal sm:text-5xl">
              Dlaczego Plyndo nie jest kolejnym sklepem z chemią.
            </h2>
            <p className="mt-6 text-base leading-8 text-charcoal/72">
              Model pozycjonuje chemię domową jako infrastrukturę gospodarstwa:
              predictable, performance-driven, and managed with the same
              intentionality as any other critical home system.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-charcoal/10 bg-white/75">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-4 border-b border-charcoal/10 px-6 py-5 text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/55">
              <div>Wymiar</div>
              <div>Plyndo</div>
              <div>Typowy zakup</div>
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
            <SectionLabel>Architektura zaufania</SectionLabel>
            <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-charcoal">
              Zbudowane dla gospodarstw, które cenią standardy, a nie chaos.
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
            <SectionLabel>Teza startowa</SectionLabel>
            <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-porcelain">
              Lepszy start niż generyczne rozszerzenie ecommerce.
            </h2>
            <div className="mt-8 grid gap-5 text-sm leading-7 text-porcelain/76">
              <p>
                The NotebookLM strategy frames the MVP as a focused Polish pilot:
                premium chemię domową, ekonomię direct-to-consumer, start oparty
                na liście oczekujących oraz przestrzeń na dopasowanie wspierane przez AI.
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
              Operacyjna jasność dla pierwszych klientów.
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
            <SectionLabel>Wczesny dostęp</SectionLabel>
            <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] text-porcelain sm:text-6xl">
              Przestań zarządzać chemią butelka po butelce.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-porcelain/74">
                Dołącz do pierwszej fali polskich gospodarstw, które chcą kupować
                chemię domową mądrzej, spokojniej i bez awaryjnych wizyt w sklepie.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[1.75rem] border border-white/10 bg-white/8 p-6 backdrop-blur"
            >
              <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-sage">
                Lista pilotażowa
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
                Poproś o dostęp
              </button>
              <p className="mt-4 text-sm leading-7 text-porcelain/66">
                {submitted
                  ? `Dziękujemy. ${email} zostało zapisane do aktualizacji o starcie w tym prototypowym przepływie.`
                  : 'Ten prototypowy formularz zbiera zainteresowanie startem, pakietami i przyszłym modelem subskrypcyjnym.'}
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
