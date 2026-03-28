import { useEffect, useMemo, useState } from 'react'

const content = {
  pl: {
    htmlLang: 'pl',
    title: 'Plyndo.pl | Premium subskrypcja chemii domowej',
    description:
      'Plyndo.pl to premium subskrypcja chemii domowej w Polsce: pakiety Mini, Midi i Maxi, dopasowanie AI, dostawy InPost i doświadczenie premium od polskiego producenta.',
    brand: 'plyndo.pl',
    nav: {
      system: 'System',
      plans: 'Pakiety',
      difference: 'Różnice',
      faq: 'FAQ',
      waitlist: 'Wczesny dostęp',
    },
    controls: {
      language: 'Język',
      theme: 'Motyw',
      font: 'Rozmiar',
      light: 'Jasny',
      dark: 'Ciemny',
      system: 'System',
      small: 'A-',
      medium: 'A',
      large: 'A+',
    },
    hero: {
      eyebrow: 'Profesjonalna skuteczność, domowa prostota',
      title:
        'Chemia domowa, która działa jak dobrze zaprojektowany system.',
      lead:
        'Plyndo zamienia chaotyczne zakupy środków czystości w uporządkowany model premium: 8 kluczowych produktów, pakiety dopasowane do rodzaju domu, doradca AI i dostawy na rytm Twojego życia.',
      primary: 'Dołącz do listy oczekujących',
      secondary: 'Zobacz jak to działa',
      proof: [
        '8 kluczowych kategorii chemii domowej',
        'Pakiety MINI / MIDI / MAXI',
        'Dostawy co 1, 2 lub 3 miesiące',
        'Model zaprojektowany dla Polski: InPost, kurier, BLIK',
      ],
      metrics: [
        { value: '8', label: 'obszarów chemii domowej w MVP' },
        { value: 'AI', label: 'doradca do doboru zestawu i częstotliwości' },
        { value: '1-3', label: 'miesięczne cykle dostaw' },
        { value: 'PL', label: 'rynek, logistyka i płatności lokalne' },
      ],
      panelTitle: 'Model startowy',
      panelRows: [
        ['Pakiety', 'Mini / Midi / Maxi'],
        ['Dostawa', 'InPost lub kurier'],
        ['Płatności', 'subskrypcja + BLIK w modelu Lite'],
      ],
      sideNote:
        'To nie jest kolejny sklep z chemią. To warstwa operacyjna dla dobrze prowadzonego domu.',
    },
    problems: {
      eyebrow: 'Dlaczego to ma znaczenie',
      title: 'Większość domów nadal zarządza chemią w trybie awaryjnym.',
      items: [
        {
          title: 'Zakupy reaktywne',
          copy:
            'Produkty kończą się dokładnie wtedy, kiedy są najbardziej potrzebne, więc decyzje zakupowe zapadają pod presją czasu.',
        },
        {
          title: 'Przypadkowe zapasy',
          copy:
            'Szafki zapełniają się butelkami o nakładających się funkcjach, bez logiki uzupełniania i bez pewności, co naprawdę działa.',
        },
        {
          title: 'Brak dopasowania',
          copy:
            'Dzisiejszy zakup rzadko bierze pod uwagę metraż, liczbę domowników, dzieci, zwierzęta i realne zużycie środków.',
        },
      ],
    },
    pillars: {
      eyebrow: 'Obietnica produktu',
      title: 'Jeden system dla czystszego i spokojniejszego domu.',
      lead:
        'Strategia MVP opiera się na połączeniu skuteczności profesjonalnej chemii z wygodą subskrypcji i lepszym dopasowaniem do codziennego życia.',
      items: [
        {
          eyebrow: 'Zawsze pod ręką',
          title: 'Uzupełnianie zanim skończą się zapasy',
          copy:
            'Plyndo ma utrzymywać kluczowe środki w obiegu zanim pojawi się kryzysowy brak.',
        },
        {
          eyebrow: 'Skuteczność premium',
          title: 'Kuratorski zestaw zamiast chaosu SKU',
          copy:
            'Model skupia się na najważniejszych zadaniach domowych i przemysłowej skuteczności, a nie na przypadkowym mnożeniu produktów.',
        },
        {
          eyebrow: 'Elastyczność',
          title: 'Częstotliwość i skład dopasowane do domu',
          copy:
            'Pakiet oraz cykl dostaw mogą być zmieniane wraz z tym, jak rośnie wiedza o realnym zużyciu.',
        },
      ],
    },
    journey: {
      eyebrow: 'Jak to działa',
      title: 'Prosty proces zbudowany wokół realnych rytuałów domowych.',
      lead:
        'Źródła NotebookLM wskazują klarowny flow MVP: profil domu, dobór zestawu, zamówienie, a następnie wygodne zarządzanie cyklem dostaw.',
      steps: [
        {
          step: '01',
          title: 'Rozmowa z doradcą AI',
          copy:
            'Krótki wywiad o metrażu, liczbie domowników, dzieciach, zwierzętach i stylu życia pomaga oszacować potrzeby domu.',
        },
        {
          step: '02',
          title: 'Dobór pakietu i pierwsza dostawa',
          copy:
            'Użytkownik wybiera segment domu lub firmy, a następnie pakiet Mini, Midi albo Maxi z możliwością personalizacji.',
        },
        {
          step: '03',
          title: 'Automatyczne uzupełnianie i modyfikacje',
          copy:
            'W panelu klienta można zmieniać częstotliwość dostaw, pauzować subskrypcję i dostosowywać skład zestawu.',
        },
      ],
    },
    plans: {
      eyebrow: 'Architektura oferty',
      title: 'Pakiety zaprojektowane jak formaty operacyjne dla różnych domów.',
      lead:
        'MVP przewiduje trzy poziomy wejścia oraz możliwość dalszej personalizacji pod realne użycie chemii domowej.',
      cards: [
        {
          name: 'Mini',
          audience: 'Dla singli i par',
          cadence:
            'Skoncentrowany na podstawowych potrzebach przy mniejszym metrażu i niższym zużyciu.',
          bullets: [
            'Bazowy zestaw najważniejszych produktów',
            'Rekomendowany cykl co 2 lub 3 miesiące',
            'Gotowość do późniejszego dopasowania AI',
          ],
        },
        {
          name: 'Midi',
          audience: 'Dla rodzin',
          cadence:
            'Pełniejszy model dla aktywnych domów z większą liczbą powierzchni, prania i codziennych zadań.',
          bullets: [
            'Najszerszy zakres zastosowań w domu',
            'Standardowy cykl co 1 lub 2 miesiące',
            'Najlepszy punkt wejścia do modelu subskrypcyjnego',
          ],
        },
        {
          name: 'Maxi',
          audience: 'Dla firm i dużych gospodarstw',
          cadence:
            'Większy wolumen, większa regularność i większa przewidywalność zużycia.',
          bullets: [
            'Model pod wysokie zużycie i standard higieny',
            'Rozbudowana logika dostaw i uzupełniania',
            'Naturalna ścieżka do obsługi B2B w dalszym etapie',
          ],
        },
      ],
      modules: [
        'Kuchnia',
        'Łazienka',
        'Podłogi i powierzchnie',
        'Pranie',
        'Zmywanie',
        'Logika uzupełniania',
        'InPost i kurier',
        'Subskrypcja Lite z przypomnieniem i BLIK',
      ],
    },
    difference: {
      eyebrow: 'Różnica rynkowa',
      title: 'Dlaczego Plyndo nie jest kolejnym sklepem z chemią.',
      lead:
        'Model D2C eliminuje pośredników, porządkuje wybór i sprzedaje przewidywalność zamiast zakupowego chaosu.',
      rows: [
        {
          label: 'Sposób kupowania',
          plyndo: 'Planowane uzupełnianie na podstawie rytmu domu',
          alt: 'Doraźne dokupywanie po wyczerpaniu zapasu',
        },
        {
          label: 'Wybór produktów',
          plyndo: 'Kuratorski zestaw o jasnej logice użycia',
          alt: 'Przeładowane półki i nieczytelne różnice',
        },
        {
          label: 'Dopasowanie',
          plyndo: 'Wywiad AI i elastyczne cykle dostaw',
          alt: 'Brak pamięci o zużyciu i brak ciągłości',
        },
        {
          label: 'Doświadczenie marki',
          plyndo: 'Premium, spokojne, uporządkowane',
          alt: 'Promocje, przypadek i zakup pod presją',
        },
      ],
    },
    trust: {
      eyebrow: 'Zaufanie i standard',
      title: 'Zaprojektowane dla domów, które chcą kontroli i jakości.',
      points: [
        'Polski producent i model direct-to-consumer bez marży pośredników',
        'Dostawy i logika operacyjna osadzone w realiach Polski',
        'Panel klienta do zmian pakietu, częstotliwości i pauzy',
        'Treści edukacyjne i instrukcje użycia jako część retencji',
      ],
    },
    launch: {
      eyebrow: 'Strategia wejścia',
      title: 'Najpierw walidacja popytu, potem pełna subskrypcja.',
      paragraphs: [
        'Strategia zakłada pilotaż na małej grupie, mocny nacisk na edukację i treści poradnikowe oraz koncentrację na wygodzie uzupełniania zapasów.',
        'W dłuższym horyzoncie wzrost ma wynikać z content marketingu, poleceń i produktów sezonowych, a nie z wojny cenowej.',
        'Landing page sprzedaje dziś porządek, skuteczność i pewność. Checkout i pełna logika subskrypcji to następny etap.',
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Najważniejsze odpowiedzi przed startem.',
      items: [
        {
          question: 'Czym dokładnie jest Plyndo?',
          answer:
            'To premium koncept subskrypcji chemii domowej dla Polski, który ma uprościć regularne zakupy dzięki pakietom, logice uzupełniania i dopasowaniu AI.',
        },
        {
          question: 'Co obejmuje MVP?',
          answer:
            'MVP obejmuje 8 kluczowych kategorii chemii domowej, pakiety Mini, Midi i Maxi, model dostaw co 1, 2 lub 3 miesiące oraz stronę waitlist-first.',
        },
        {
          question: 'Czy będzie można zmieniać częstotliwość?',
          answer:
            'Tak. Strategia przewiduje możliwość zmiany cyklu, pauzy subskrypcji i modyfikacji zestawu w panelu klienta.',
        },
        {
          question: 'Jak działa Subskrypcja Lite?',
          answer:
            'To ścieżka dla klientów, którzy nie chcą zapisywać karty. System przypomina o uzupełnieniu i prowadzi do szybkiej płatności, docelowo również BLIK.',
        },
        {
          question: 'Czy dostawy obejmują całą Polskę?',
          answer:
            'Tak. Model zakłada krajową logistykę i integrację z InPost oraz kurierem.',
        },
        {
          question: 'Czy to już gotowy sklep?',
          answer:
            'Nie. To dopracowana warstwa wejściowa dla MVP: piękna strona premium, spójny przekaz i jeden główny cel konwersji, czyli wczesny dostęp.',
        },
      ],
    },
    waitlist: {
      eyebrow: 'Wczesny dostęp',
      title: 'Przestań zarządzać chemią butelka po butelce.',
      lead:
        'Dołącz do pierwszej fali gospodarstw i firm, które chcą przejść z doraźnych zakupów na model uporządkowanego uzupełniania.',
      inputLabel: 'Lista oczekujących',
      placeholder: 'twoj@email.pl',
      button: 'Chcę wczesny dostęp',
      successPrefix: 'Dziękujemy. Zapisaliśmy adres',
      successSuffix: 'w prototypowym modelu waitlist.',
      helper:
        'Aktualna wersja strony zbiera popyt, preferencje pakietów i gotowość do testu MVP.',
    },
    footer:
      'Landing page oparty na strategii z NotebookLM. Szczegóły z dokumentów Google Drive nie mogły zostać automatycznie pobrane w tej sesji z powodu blokady dostępu do folderu.',
  },
  en: {
    htmlLang: 'en',
    title: 'Plyndo.pl | Premium household chemistry subscription',
    description:
      'Plyndo.pl is a premium household chemistry subscription for Poland: Mini, Midi and Maxi plans, AI-guided fit, InPost-friendly logistics, and a premium direct-to-consumer experience.',
    brand: 'plyndo.pl',
    nav: {
      system: 'System',
      plans: 'Plans',
      difference: 'Difference',
      faq: 'FAQ',
      waitlist: 'Early access',
    },
    controls: {
      language: 'Language',
      theme: 'Theme',
      font: 'Font size',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      small: 'A-',
      medium: 'A',
      large: 'A+',
    },
    hero: {
      eyebrow: 'Professional performance, simplified for home',
      title: 'Household chemistry that works like a well-designed system.',
      lead:
        'Plyndo turns messy cleaning-product shopping into a premium recurring model: 8 core categories, plans tailored to different homes, an AI advisor, and deliveries matched to real life in Poland.',
      primary: 'Join the waitlist',
      secondary: 'See how it works',
      proof: [
        '8 core household chemistry categories',
        'MINI / MIDI / MAXI offer logic',
        'Delivery every 1, 2, or 3 months',
        'Designed for Poland: InPost, courier, and BLIK-friendly flows',
      ],
      metrics: [
        { value: '8', label: 'household chemistry areas in MVP scope' },
        { value: 'AI', label: 'advisor for bundle and cadence fit' },
        { value: '1-3', label: 'month delivery intervals' },
        { value: 'PL', label: 'market, logistics, and payment context' },
      ],
      panelTitle: 'Launch model',
      panelRows: [
        ['Plans', 'Mini / Midi / Maxi'],
        ['Delivery', 'InPost or courier'],
        ['Payments', 'subscription + BLIK in Lite mode'],
      ],
      sideNote:
        'This is not another cleaning-products store. It is an operating layer for a better-run home.',
    },
    problems: {
      eyebrow: 'Why it matters',
      title: 'Most households still manage chemistry in emergency mode.',
      items: [
        {
          title: 'Reactive buying',
          copy:
            'Products run out exactly when they are needed, so purchase decisions happen under pressure.',
        },
        {
          title: 'Random stock at home',
          copy:
            'Cabinets fill with bottles that overlap in function, without clear replenishment logic or confidence in performance.',
        },
        {
          title: 'No fit to actual usage',
          copy:
            'Typical purchases ignore home size, household members, children, pets, and real consumption patterns.',
        },
      ],
    },
    pillars: {
      eyebrow: 'Product promise',
      title: 'One system for a cleaner, calmer home.',
      lead:
        'The MVP strategy combines industrial-grade effectiveness with subscription convenience and a better fit for real household routines.',
      items: [
        {
          eyebrow: 'Always stocked',
          title: 'Replenishment before the critical shortage',
          copy:
            'Plyndo is built to keep essential chemistry in circulation before the cabinet hits zero.',
        },
        {
          eyebrow: 'Premium performance',
          title: 'A curated system instead of bottle clutter',
          copy:
            'The model focuses on the most important household jobs and professional effectiveness, not on endless SKU noise.',
        },
        {
          eyebrow: 'Flexibility',
          title: 'Cadence and bundle logic matched to real homes',
          copy:
            'Plans and delivery cycles can evolve as the system learns more about actual consumption.',
        },
      ],
    },
    journey: {
      eyebrow: 'How it works',
      title: 'A simple process built around real household routines.',
      lead:
        'The NotebookLM source points to a clear MVP flow: understand the home, fit the bundle, deliver, then manage replenishment with control.',
      steps: [
        {
          step: '01',
          title: 'Talk to the AI advisor',
          copy:
            'A short interview about floor area, household size, children, pets, and lifestyle helps estimate what the home actually needs.',
        },
        {
          step: '02',
          title: 'Choose a plan and receive the first delivery',
          copy:
            'The user selects a home or business segment, then picks Mini, Midi, or Maxi with room for personalization.',
        },
        {
          step: '03',
          title: 'Automate the refill routine',
          copy:
            'Inside the customer panel, users can change cadence, pause deliveries, and refine bundle contents over time.',
        },
      ],
    },
    plans: {
      eyebrow: 'Offer architecture',
      title: 'Plans designed as operating formats for different homes.',
      lead:
        'The MVP strategy uses three clear entry points plus personalization, instead of a generic endless catalog.',
      cards: [
        {
          name: 'Mini',
          audience: 'For singles and couples',
          cadence:
            'Focused on core needs for smaller homes and lighter usage.',
          bullets: [
            'Starter selection of essentials',
            'Recommended every 2 or 3 months',
            'Ready for later AI refinement',
          ],
        },
        {
          name: 'Midi',
          audience: 'For families',
          cadence:
            'A fuller operating model for active homes with more surfaces, laundry, and daily cleaning.',
          bullets: [
            'Broader range across the home',
            'Standard every 1 or 2 months',
            'Best entry point for recurring use',
          ],
        },
        {
          name: 'Maxi',
          audience: 'For businesses and larger households',
          cadence:
            'Higher volume, higher regularity, and stronger predictability.',
          bullets: [
            'Built for heavy usage and hygiene standards',
            'Expanded refill and delivery logic',
            'Natural path toward future B2B support',
          ],
        },
      ],
      modules: [
        'Kitchen',
        'Bathroom',
        'Floors and surfaces',
        'Laundry',
        'Dishwashing',
        'Replenishment logic',
        'InPost and courier',
        'Lite subscription with reminder and BLIK flow',
      ],
    },
    difference: {
      eyebrow: 'Market difference',
      title: 'Why Plyndo is not just another cleaning-products store.',
      lead:
        'The D2C model removes middlemen, clarifies choice, and sells predictability instead of purchase chaos.',
      rows: [
        {
          label: 'Buying pattern',
          plyndo: 'Planned replenishment based on household rhythm',
          alt: 'Reactive top-ups after the stock is gone',
        },
        {
          label: 'Product selection',
          plyndo: 'Curated bundle with a clear use logic',
          alt: 'Crowded shelves and weak differentiation',
        },
        {
          label: 'Fit to life',
          plyndo: 'AI-guided fitting and flexible cycles',
          alt: 'No memory of usage and no continuity',
        },
        {
          label: 'Brand experience',
          plyndo: 'Premium, calm, and controlled',
          alt: 'Promotions, randomness, and rushed buying',
        },
      ],
    },
    trust: {
      eyebrow: 'Trust and standard',
      title: 'Designed for households that want control and quality.',
      points: [
        'Polish producer and direct-to-consumer model without retail markups',
        'Delivery and operations designed for local Polish realities',
        'Customer panel for plan, cadence, and pause management',
        'Educational content and usage guidance built into retention',
      ],
    },
    launch: {
      eyebrow: 'Go-to-market logic',
      title: 'Demand validation first, full subscription engine next.',
      paragraphs: [
        'The strategy assumes a pilot launch, educational content, and a strong convenience narrative around automatic replenishment.',
        'Longer-term growth is expected from content marketing, referrals, and seasonal products rather than price wars.',
        'Today the landing page sells clarity, confidence, and control. Full checkout and recurring billing come next.',
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'The key answers before launch.',
      items: [
        {
          question: 'What exactly is Plyndo?',
          answer:
            'It is a premium household chemistry subscription concept for Poland, built to simplify recurring purchases through clear plans, refill logic, and AI-guided fit.',
        },
        {
          question: 'What does the MVP include?',
          answer:
            'The MVP includes 8 core household chemistry categories, Mini, Midi, and Maxi plans, delivery every 1, 2, or 3 months, and a waitlist-first landing experience.',
        },
        {
          question: 'Can delivery cadence be changed?',
          answer:
            'Yes. The strategy assumes cadence changes, pauses, and bundle edits inside the customer account.',
        },
        {
          question: 'How does Lite Subscription work?',
          answer:
            'It is a path for users who do not want to save a card. The system reminds them to reorder and leads them into a fast payment flow, eventually including BLIK.',
        },
        {
          question: 'Do you deliver across Poland?',
          answer:
            'Yes. The model is designed for domestic Polish logistics with InPost and courier delivery in scope.',
        },
        {
          question: 'Is this already a live store?',
          answer:
            'No. This is a polished MVP entry layer: a premium page, a coherent proposition, and one primary conversion goal, which is early access.',
        },
      ],
    },
    waitlist: {
      eyebrow: 'Early access',
      title: 'Stop managing chemistry one bottle at a time.',
      lead:
        'Join the first households and businesses that want to replace emergency buying with a structured replenishment model.',
      inputLabel: 'Waitlist',
      placeholder: 'your@email.com',
      button: 'Get early access',
      successPrefix: 'Thanks. We saved',
      successSuffix: 'in the prototype waitlist flow.',
      helper:
        'This version of the page captures demand, plan preferences, and readiness for the MVP pilot.',
    },
    footer:
      'This landing page is based on strategy extracted from NotebookLM. The original Google Drive documents could not be automatically fetched in this session because folder access was blocked.',
  },
}

const applyDocumentSettings = (language, themePreference, fontSize) => {
  const root = document.documentElement
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolvedTheme =
    themePreference === 'system'
      ? prefersDark
        ? 'dark'
        : 'light'
      : themePreference

  root.lang = content[language].htmlLang
  root.dataset.theme = themePreference
  root.dataset.resolvedTheme = resolvedTheme
  root.dataset.fontSize = fontSize
}

function SectionLabel({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--brand)] sm:text-xs">
      <span className="h-px w-10 bg-[var(--brand)]/30" />
      {children}
    </div>
  )
}

function App() {
  const [language, setLanguage] = useState(
    () => localStorage.getItem('plyndo.language') || 'pl',
  )
  const [themePreference, setThemePreference] = useState(
    () => localStorage.getItem('plyndo.theme') || 'system',
  )
  const [fontSize, setFontSize] = useState(
    () => localStorage.getItem('plyndo.fontSize') || 'medium',
  )
  const [activeFaq, setActiveFaq] = useState(0)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const t = content[language]

  const themeOptions = useMemo(
    () => [
      { value: 'light', label: t.controls.light },
      { value: 'dark', label: t.controls.dark },
      { value: 'system', label: t.controls.system },
    ],
    [t.controls.dark, t.controls.light, t.controls.system],
  )

  const fontOptions = useMemo(
    () => [
      { value: 'small', label: t.controls.small },
      { value: 'medium', label: t.controls.medium },
      { value: 'large', label: t.controls.large },
    ],
    [t.controls.large, t.controls.medium, t.controls.small],
  )

  useEffect(() => {
    localStorage.setItem('plyndo.language', language)
    localStorage.setItem('plyndo.theme', themePreference)
    localStorage.setItem('plyndo.fontSize', fontSize)
    applyDocumentSettings(language, themePreference, fontSize)

    const description = document.querySelector('meta[name="description"]')
    document.title = t.title
    if (description) description.setAttribute('content', t.description)
  }, [fontSize, language, t.description, t.title, themePreference])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () =>
      applyDocumentSettings(language, themePreference, fontSize)

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [fontSize, language, themePreference])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="ambient-orb ambient-orb-left" />
        <div className="ambient-orb ambient-orb-right" />
      </div>

      <main className="section-shell relative pb-20 pt-5 md:pb-24 md:pt-7">
        <header className="mb-10 rounded-[28px] border border-[var(--line-soft)] bg-[var(--surface)] px-4 py-4 shadow-[0_16px_36px_rgba(18,34,28,0.06)] backdrop-blur md:px-6 md:py-5">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-2">
              <a
                href="#top"
                className="font-display text-2xl tracking-[0.14em] text-[var(--brand)] sm:text-3xl"
              >
                {t.brand}
              </a>
              <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">
                {t.description}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[var(--ink-soft)]">
                <a href="#system" className="transition hover:text-[var(--brand)]">
                  {t.nav.system}
                </a>
                <a href="#plans" className="transition hover:text-[var(--brand)]">
                  {t.nav.plans}
                </a>
                <a
                  href="#difference"
                  className="transition hover:text-[var(--brand)]"
                >
                  {t.nav.difference}
                </a>
                <a href="#faq" className="transition hover:text-[var(--brand)]">
                  {t.nav.faq}
                </a>
                <a
                  href="#waitlist"
                  className="transition hover:text-[var(--brand)]"
                >
                  {t.nav.waitlist}
                </a>
              </nav>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="control-group">
                  <span>{t.controls.language}</span>
                  <div className="control-options">
                    <button
                      type="button"
                      className={language === 'pl' ? 'is-active' : ''}
                      onClick={() => setLanguage('pl')}
                    >
                      PL
                    </button>
                    <button
                      type="button"
                      className={language === 'en' ? 'is-active' : ''}
                      onClick={() => setLanguage('en')}
                    >
                      EN
                    </button>
                  </div>
                </div>

                <div className="control-group">
                  <span>{t.controls.theme}</span>
                  <div className="control-options">
                    {themeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={themePreference === option.value ? 'is-active' : ''}
                        onClick={() => setThemePreference(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="control-group">
                  <span>{t.controls.font}</span>
                  <div className="control-options">
                    {fontOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={fontSize === option.value ? 'is-active' : ''}
                        onClick={() => setFontSize(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="top"
          className="grid gap-8 pb-16 lg:grid-cols-[1.12fr_0.88fr] lg:items-start lg:gap-12"
        >
          <div className="max-w-4xl">
            <SectionLabel>{t.hero.eyebrow}</SectionLabel>
            <h1 className="font-display text-4xl leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-[5.5rem]">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--ink-soft)] sm:text-lg">
              {t.hero.lead}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#waitlist" className="primary-button">
                {t.hero.primary}
              </a>
              <a href="#journey" className="secondary-button">
                {t.hero.secondary}
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.hero.proof.map((item) => (
                <div key={item} className="metric-card text-sm leading-6 text-[var(--ink-soft)]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass-panel p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {t.hero.metrics.map((metric) => (
                  <div key={metric.label} className="metric-card">
                    <div className="font-display text-4xl tracking-[-0.05em] text-[var(--brand)] sm:text-5xl">
                      {metric.value}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[28px] bg-[var(--brand)] px-5 py-5 text-white">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/65">
                  {t.hero.panelTitle}
                </div>
                <div className="mt-4 space-y-3 border-t border-white/10 pt-4 text-sm text-white/80">
                  {t.hero.panelRows.map(([key, value]) => (
                    <div key={key} className="flex items-start justify-between gap-4">
                      <span>{key}</span>
                      <span className="max-w-[11rem] text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 max-w-sm rounded-[24px] border border-[var(--line-soft)] bg-[var(--surface-strong)] px-5 py-4 text-sm leading-6 text-[var(--ink-soft)] shadow-[0_16px_32px_rgba(18,34,28,0.05)] lg:absolute lg:-bottom-6 lg:-left-6">
              {t.hero.sideNote}
            </div>
          </div>
        </section>

        <section className="grid gap-7 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
          <div>
            <SectionLabel>{t.problems.eyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] sm:text-5xl">
              {t.problems.title}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {t.problems.items.map((item) => (
              <article key={item.title} className="glass-panel p-5 sm:p-6">
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="system"
          className="my-8 rounded-[36px] bg-[var(--brand)] px-5 py-10 text-white shadow-[0_28px_72px_rgba(18,34,28,0.18)] sm:px-8"
        >
          <SectionLabel>{t.pillars.eyebrow}</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] sm:text-5xl">
                {t.pillars.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/76">
                {t.pillars.lead}
              </p>
            </div>
            <div className="grid gap-4">
              {t.pillars.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-white/10 bg-white/6 p-5 sm:p-6"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--sage)]">
                    {item.eyebrow}
                  </div>
                  <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/75">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="journey"
          className="grid gap-8 py-16 lg:grid-cols-[0.76fr_1.24fr] lg:gap-10"
        >
          <div>
            <SectionLabel>{t.journey.eyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] sm:text-5xl">
              {t.journey.title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-[var(--ink-soft)]">
              {t.journey.lead}
            </p>
          </div>
          <div className="grid gap-4">
            {t.journey.steps.map((step) => (
              <article
                key={step.step}
                className="glass-panel grid gap-4 p-5 sm:grid-cols-[84px_1fr] sm:p-6"
              >
                <div className="font-display text-5xl tracking-[-0.05em] text-[var(--accent)]">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-display text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                    {step.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="plans"
          className="rounded-[36px] border border-[var(--line-soft)] bg-[var(--surface)] px-5 py-10 shadow-[0_18px_48px_rgba(18,34,28,0.05)] sm:px-8"
        >
          <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <SectionLabel>{t.plans.eyebrow}</SectionLabel>
              <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] sm:text-5xl">
                {t.plans.title}
              </h2>
            </div>
            <p className="text-sm leading-7 text-[var(--ink-soft)]">{t.plans.lead}</p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {t.plans.cards.map((plan, index) => (
              <article
                key={plan.name}
                className={index === 1 ? 'plan-card-active' : 'plan-card'}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  {plan.audience}
                </div>
                <h3 className="mt-4 font-display text-4xl tracking-[-0.05em] text-[var(--brand)]">
                  {plan.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
                  {plan.cadence}
                </p>
                <ul className="mt-6 grid gap-3">
                  {plan.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-[18px] bg-white/80 px-4 py-3 text-sm leading-6 text-[var(--ink-soft)]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {t.plans.modules.map((module) => (
              <div
                key={module}
                className="rounded-[22px] border border-[var(--line-soft)] bg-white/86 px-4 py-4 text-sm leading-6 text-[var(--ink-soft)]"
              >
                {module}
              </div>
            ))}
          </div>
        </section>

        <section
          id="difference"
          className="grid gap-8 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10"
        >
          <div>
            <SectionLabel>{t.difference.eyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] sm:text-5xl">
              {t.difference.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--ink-soft)]">
              {t.difference.lead}
            </p>
          </div>
          <div className="overflow-hidden rounded-[32px] border border-[var(--line-soft)] bg-[var(--surface-strong)] shadow-[0_16px_42px_rgba(18,34,28,0.06)]">
            <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-3 border-b border-[var(--line-soft)] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] sm:px-6 sm:text-xs">
              <div>Dimension</div>
              <div>Plyndo</div>
              <div>Alternative</div>
            </div>
            {t.difference.rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.1fr_1fr_1fr] gap-3 border-b border-[var(--line-soft)] px-4 py-4 text-sm last:border-b-0 sm:px-6"
              >
                <div className="font-semibold text-[var(--ink)]">{row.label}</div>
                <div className="text-[var(--ink-soft)]">{row.plyndo}</div>
                <div className="text-[var(--muted)]">{row.alt}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <article className="glass-panel p-6 sm:p-8">
            <SectionLabel>{t.trust.eyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] sm:text-5xl">
              {t.trust.title}
            </h2>
            <div className="mt-7 grid gap-3">
              {t.trust.points.map((point) => (
                <div
                  key={point}
                  className="rounded-[20px] bg-white/78 px-4 py-4 text-sm leading-7 text-[var(--ink-soft)]"
                >
                  {point}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[32px] bg-[var(--graphite)] p-6 text-white shadow-[0_22px_56px_rgba(20,23,29,0.18)] sm:p-8">
            <SectionLabel>{t.launch.eyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] sm:text-5xl">
              {t.launch.title}
            </h2>
            <div className="mt-7 grid gap-4 text-sm leading-8 text-white/78">
              {t.launch.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </section>

        <section
          id="faq"
          className="grid gap-8 py-16 lg:grid-cols-[0.76fr_1.24fr] lg:gap-10"
        >
          <div>
            <SectionLabel>{t.faq.eyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] sm:text-5xl">
              {t.faq.title}
            </h2>
          </div>
          <div className="grid gap-3">
            {t.faq.items.map((item, index) => {
              const isOpen = activeFaq === index
              return (
                <button
                  key={item.question}
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? -1 : index)}
                  className="glass-panel p-5 text-left sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-xl sm:text-2xl">
                      {item.question}
                    </span>
                    <span className="text-2xl text-[var(--accent)]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  {isOpen ? (
                    <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
                      {item.answer}
                    </p>
                  ) : null}
                </button>
              )
            })}
          </div>
        </section>

        <section
          id="waitlist"
          className="rounded-[36px] bg-gradient-to-br from-[var(--brand)] via-[var(--brand)] to-[var(--graphite)] px-5 py-10 text-white shadow-[0_28px_72px_rgba(18,34,28,0.22)] sm:px-8"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_0.88fr] lg:items-end">
            <div>
              <SectionLabel>{t.waitlist.eyebrow}</SectionLabel>
              <h2 className="font-display text-3xl leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                {t.waitlist.title}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/78">
                {t.waitlist.lead}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[30px] border border-white/10 bg-white/8 p-5 backdrop-blur sm:p-6"
            >
              <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--sage)]">
                {t.waitlist.inputLabel}
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t.waitlist.placeholder}
                className="mt-4 w-full rounded-[18px] border border-white/12 bg-white/10 px-4 py-3 text-base text-white outline-none placeholder:text-white/38 focus:border-[var(--sage)]"
              />
              <button type="submit" className="primary-button-inverse mt-4 w-full">
                {t.waitlist.button}
              </button>
              <p className="mt-4 text-sm leading-7 text-white/70">
                {submitted
                  ? `${t.waitlist.successPrefix} ${email} ${t.waitlist.successSuffix}`
                  : t.waitlist.helper}
              </p>
            </form>
          </div>
        </section>

        <footer className="py-8 text-center text-sm leading-7 text-[var(--muted)]">
          {t.footer}
        </footer>
      </main>
    </div>
  )
}

export default App
