import { ArrowRight, CheckCircle2, Home, PackageCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { productRoutePath, products } from '../data/products';
import { getBundleBySlug } from '../data/bundles';
import { calculateBundlePricing, formatPln } from '../lib/bundlePricing';
import heroBg from '../assets/hero-bg.png';

const bundleSlugs = ['dom-codzienny-4', 'dom-pelny-8', 'dom-komplet-12'];

function ProductPill({ product }) {
  return (
    <Link to={productRoutePath(product)} className="group flex items-center gap-3 rounded-[14px] border bg-white p-3 no-underline transition-all duration-300 hover:-translate-y-0.5" style={{ borderColor: 'var(--color-border)', color: 'var(--color-fg)', boxShadow: 'var(--shadow-xs)' }}>
      <span className="h-14 w-11 shrink-0 overflow-hidden rounded-[8px] border" style={{ borderColor: 'var(--color-border)', background: product.color.bg }}>
        <img src={product.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </span>
      <span>
        <span className="block text-[13px] font-medium">{product.i18n?.pl?.displayName ?? product.name}</span>
        <span className="mt-1 block text-[11px] uppercase tracking-[0.1em] text-fg-subtle">1 L · {formatPln(product.listPrice * 0.5, 'pl-PL')} w 12x</span>
      </span>
    </Link>
  );
}

function BundleCard({ slug, index }) {
  const bundle = getBundleBySlug(slug);
  const pricing = calculateBundlePricing({ bundle, products });
  const name = bundle.i18n?.pl?.displayName ?? bundle.name;

  return (
    <Motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="grid gap-5 rounded-[20px] border bg-white p-6 transition-all duration-500 hover:-translate-y-1"
      style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="t-eyebrow">{bundle.size} produktów</span>
        <span className="rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-white">do -{Math.round(bundle.discountRule.rate * 100)}%</span>
      </div>
      <div>
        <h2 className="t-h4">{name}</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
          {slug === 'dom-codzienny-4' && 'Zestaw na start do najważniejszych stref w domu.'}
          {slug === 'dom-pelny-8' && 'Pakiet do regularnego uzupełniania domowego zapasu.'}
          {slug === 'dom-komplet-12' && 'Najszerszy pakiet do domu lub domu i małej firmy.'}
        </p>
      </div>
      <div className="rounded-[14px] p-4" style={{ background: 'var(--color-bg-muted)' }}>
        <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-fg-subtle">Cena paczki</div>
        <div className="mt-1 font-serif italic text-3xl font-light">{formatPln(pricing.bundlePrice, 'pl-PL')}</div>
      </div>
      <Link to={`/pakiety/${bundle.slug}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium no-underline" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
        Zobacz pakiet <ArrowRight size={14} />
      </Link>
    </Motion.article>
  );
}

export default function HomeAudiencePage() {
  const homeProducts = products.filter((product) => product.audiences?.includes('home'));

  return (
    <main className="pb-24 pt-[120px]" style={{ background: 'var(--color-bg)' }}>
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="t-eyebrow">Dla domu</span>
            <h1 className="t-display-1 mt-4">Płyny do domu, które naprawdę się przydają.</h1>
            <p className="t-lead mt-6 max-w-[680px]">
              Pakiety do kuchni, łazienki, prania i codziennego sprzątania. Kupujesz gotowy zapas w jednej paczce — bez dobierania każdej butelki osobno.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['4, 8 lub 12 butelek', 'do -50% w największej paczce', 'dostawa pod drzwi'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-medium" style={{ borderColor: 'var(--color-border-strong)' }}>
                  <CheckCircle2 size={14} /> {item}
                </span>
              ))}
            </div>
          </Motion.div>
          <Motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.08 }} className="grid gap-4">
            <div className="overflow-hidden rounded-[24px] border bg-white" style={{ borderColor: 'var(--color-border)' }}>
              <img src={heroBg} alt="Produkty PŁYN DO w jednej linii" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="rounded-[24px] border p-6" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
                <Home size={22} />
              </div>
              <h2 className="t-h3">Jeden wybór, kompletny zapas do domu.</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">
                Najszerszy pakiet łączy środki do naczyń, zmywarki, prania, płukania, podłóg, WC, łazienki, szyb, rąk, odkamieniania i udrażniania rur.
              </p>
            </div>
          </Motion.div>
        </div>
      </section>

      <section className="px-6 py-20" style={{ background: 'var(--color-bg-muted)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-[680px]">
            <span className="t-eyebrow">Pakiety domowe</span>
            <h2 className="t-h1 mt-4">Od podstawowego pakietu po pełny zapas do domu.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {bundleSlugs.map((slug, index) => <BundleCard key={slug} slug={slug} index={index} />)}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[660px]">
              <span className="t-eyebrow">Produkty do domu</span>
              <h2 className="t-h1 mt-4">Uzupełnij domowy zapas bez przypadkowych zakupów.</h2>
            </div>
            <Link to="/#pakiety" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium no-underline" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
              Wybierz pakiet <Sparkles size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homeProducts.map((product) => <ProductPill key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[24px] border p-8 md:flex-row md:items-center md:justify-between" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}>
          <div>
            <span className="t-eyebrow">Własna paczka</span>
            <h2 className="t-h3 mt-3">Złóż własną paczkę z płynów, które zużywasz najczęściej.</h2>
          </div>
          <Link to="/pakiety/wlasna-paczka/12" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium no-underline" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
            Skomponuj 12 <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
