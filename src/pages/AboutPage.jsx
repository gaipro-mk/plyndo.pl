import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Factory, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import Breadcrumbs from '../components/layout/Breadcrumbs';

const values = [
  {
    icon: PackageCheck,
    title: 'Pakiet zamiast chaosu',
    desc: 'Kupujesz logiczny zestaw płynów do codziennych zadań, zamiast kompletować ciężki koszyk pojedynczych butelek.',
  },
  {
    icon: Truck,
    title: 'Mniej noszenia, lepsza cena',
    desc: 'Większy karton daje globalny rabat dla całej paczki i porządkuje dostawę ciężkich płynów pod drzwi.',
  },
  {
    icon: ShieldCheck,
    title: 'Jakość od producenta',
    desc: 'Linia korzysta z doświadczenia produkcyjnego chemii gospodarczej i profesjonalnej, ale jest opisana prostym językiem dla domu i małej firmy.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-[70vh] pb-24 pt-[120px]" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-7xl px-6">
        <Breadcrumbs lang="pl" items={[{ label: 'O marce' }]} />
        <Link to="/" className="mb-10 mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-fg-muted no-underline transition-opacity hover:opacity-60 tracking-wide uppercase">
          <ArrowLeft size={16} />
          Wróć na stronę główną
        </Link>

        <section className="mb-20 grid gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="t-eyebrow">O marce</span>
            <h1 className="t-display-1 mt-4">Profesjonalna chemia domowa i firmowa w prostych pakietach.</h1>
            <p className="t-lead mt-6 max-w-[720px]">
              Marka PŁYN DO powstała dla osób i firm, które chcą kupować skuteczne litrowe płyny w sensownych pakietach, bez kompletowania zapasu po jednej butelce.
            </p>
          </Motion.div>

          <Motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.08 }} className="rounded-[24px] border p-6" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}>
            <img src="/logo-black.svg" alt="PŁYN DO" className="h-8 w-auto" />
            <p className="mt-6 text-[14px] leading-relaxed text-fg-muted">
              PŁYN DO upraszcza zakupy chemii gospodarczej: wybierasz gotowy pakiet 4, 8 lub 12 produktów, a kolor etykiety pomaga szybko znaleźć właściwy płyn.
            </p>
          </Motion.div>
        </section>

        <section className="mb-24 rounded-[24px] border p-8 md:p-12 lg:p-14" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}>
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <span className="t-eyebrow inline-flex items-center gap-2">
                <Factory size={16} />
                Nasze korzenie
              </span>
              <h2 className="t-h1 mt-4">Ponad 40 lat doświadczenia produkcyjnego.</h2>
              <div className="mt-6 grid gap-4 text-[15px] leading-relaxed text-fg-muted">
                  <p>
                    Za PŁYN DO stoi zaplecze produkcyjne i doświadczenie w chemii gospodarczej. To nie przypadkowa marka z ładną etykietą, tylko produkty oparte na realnym know-how. PŁYN DO jest wytwarzany w zakładach EmiChem w Poznaniu znanego między innymi z linii profesjonalnej JAX Professional, firmie z doświadczeniem produkcyjnym sięgającym 1984 roku.
                  </p>
                  <p>
                    EmiChem produkuje szeroką gamę płynów i środków czystości przeznaczonych zarówno do gospodarstw domowych, jak i zastosowań branżowych — od uniwersalnych detergentów po specjalistyczne preparaty przemysłowe. Dzięki pracy z nowoczesnymi technologiami i surowcami z rynku europejskiego tworzymy formuły skuteczne w codziennym użyciu i sprawdzone w małych firmach i lokalach usługowych.
                  </p>
                  <p>
                    Marka PŁYN DO skupia się na prostocie zakupu — oferujemy kompletne pakiety 4, 8 i 12 butelek oraz możliwość skomponowania własnego zestawu, by zamówienia przez sklep online były szybkie i przewidywalne.
                  </p>
                  <p>
                    Wybierając PŁYN DO kupujesz produkty zaprojektowane z myślą o wygodzie i skuteczności: czytelne etykiety, sprawdzone receptury i dostępność pełnej gamy preparatów do kuchni, łazienki, podłóg, zmywarki i prania — wszystko w jednym zamówieniu, z dostawą pod Twoje drzwi.
                  </p>
              </div>
            </div>
            <div className="rounded-[20px] border bg-white p-8" style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="flex min-h-[150px] items-center justify-center rounded-[16px]" style={{ background: 'var(--color-bg-muted)' }}>
                <img src="/images/partners/jax-professional-logo.png" alt="JAX Professional" className="max-h-16 w-auto" />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {['Polski producent', 'Od 1984 roku', 'Chemia czystości'].map((item) => (
                  <span key={item} className="rounded-full border px-3 py-2 text-center text-[11px] font-medium uppercase tracking-[0.1em] text-fg-muted" style={{ borderColor: 'var(--color-border)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="mb-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center">
            <h2 className="t-h1">Dlaczego</h2>
            <img src="/logo-black.svg" alt="PŁYN DO" className="h-[32px] w-auto sm:h-[38px]" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className="group rounded-[20px] border bg-white p-8 transition-all duration-500 hover:-translate-y-1" style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-105" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
                    <Icon size={20} />
                  </div>
                  <h3 className="t-h4">{value.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">{value.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-[24px] border p-8 md:flex md:items-center md:justify-between md:gap-10" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}>
          <div>
            <span className="t-eyebrow">Pierwsza paczka</span>
            <h2 className="t-h3 mt-3">Zacznij od gotowego zestawu albo skomponuj własny karton.</h2>
          </div>
          <Link to="/#pakiety" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium no-underline md:mt-0" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
            Przejdź do pakietów <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </main>
  );
}
