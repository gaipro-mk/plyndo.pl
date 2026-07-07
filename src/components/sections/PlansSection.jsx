import { ArrowRight, Box, Layers3, PackagePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { bundles } from '../../data/bundles';
import { products } from '../../data/products';
import { calculateBundlePricing, formatPln } from '../../lib/bundlePricing';
import { copy } from '../../content';

function percent(rate) {
  return `${Math.round(rate * 100)}%`;
}

function bundleName(bundle, lang) {
  return bundle.i18n?.[lang]?.displayName ?? bundle.i18n?.pl?.displayName ?? bundle.name;
}

function audienceLabel(audience, lang) {
  const labels = {
    pl: {
      all: 'Start lub uzupełnienie',
      home: 'Na start',
      business: 'Dla firmy',
    },
    en: {
      all: 'Start or refill',
      home: 'Starter pack',
      business: 'For Business',
    }
  };
  return labels[lang]?.[audience] ?? labels.pl[audience] ?? labels.pl.all;
}

/* Color accent for left border strip — subtle product-color accent */
const accentColors = {
  'dom-codzienny-4': 'var(--label-bath-bg)',
  'dom-pelny-8': 'var(--label-dish-bg)',
  'dom-komplet-12': 'var(--label-rinse-bg)',
  'firma-podstawowa-4': 'var(--label-floor-bg)',
  'firma-operacyjna-8': 'var(--label-floor-bg)',
  'firma-gastro-12': 'var(--label-floor-bg)',
  custom: 'var(--label-laundry-bg)',
};

const packageTags = {
  pl: {
    'dom-codzienny-4': 'Minimalny pakiet',
    'dom-pelny-8': 'Pakiet standardowy',
    'dom-komplet-12': 'Najbardziej opłacalny',
  },
  en: {
    'dom-codzienny-4': 'Starter box',
    'dom-pelny-8': 'Standard pack',
    'dom-komplet-12': 'Best value',
  }
};

const customTags = {
  pl: {
    4: 'Minimalny',
    8: 'Ekonomiczny',
    12: 'Największa oszczędność',
  },
  en: {
    4: 'Starter size',
    8: 'Value size',
    12: 'Maximum savings',
  }
};

function BundleCard({ bundle, featured = false, index = 0, lang = 'pl' }) {
  const pricing = calculateBundlePricing({ bundle, products });
  const accent = accentColors[bundle.slug] ?? accentColors.custom;
  const previewItems = pricing.lineItems.slice(0, 4);
  const tags = packageTags[lang] ?? packageTags.pl;

  return (
    <Motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative mt-4 grid min-h-[400px] gap-6 rounded-[20px] border bg-white p-6 pt-8 md:p-7 md:pt-9 transition-all duration-500 hover:-translate-y-1 ${featured ? 'lg:row-span-2' : ''}`}
      style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <span className="absolute left-6 top-0 -translate-y-1/2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ background: accent, color: 'var(--plyndo-white)' }}>
        {tags[bundle.slug] ?? (lang === 'en' ? 'Package' : 'Pakiet')}
      </span>
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="t-eyebrow">
            {audienceLabel(bundle.audience, lang)}
          </span>
          <span className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: accent, color: 'var(--plyndo-white)' }}>
            do -{percent(bundle.discountRule.rate)}
          </span>
        </div>
        <h3 className="mt-6 text-2xl font-semibold leading-tight">{bundleName(bundle, lang)}</h3>
        <p className="mt-2 max-w-[420px] text-[13px] leading-relaxed text-fg-muted">
          {lang === 'en'
            ? `${bundle.size} one-litre bottles with a discount calculated for the whole box.`
            : `${bundle.size} litrowych pozycji z rabatem liczonym dla całej paczki.`}
        </p>
      </div>

      <div className="grid gap-2">
        {previewItems.map((item) => (
          <div key={item.productSlug} className="flex items-center justify-between gap-3 border-b pb-2 text-[13px]" style={{ borderColor: 'var(--color-border)' }}>
            <span className="font-medium">
              {item.quantity > 1 ? `${item.quantity}× ` : ''}
              {item.product.i18n?.[lang]?.shortName ?? item.product.i18n?.pl?.shortName ?? item.product.shortName}
            </span>
            <span className="text-fg-subtle">{formatPln(item.listValue, 'pl-PL')}</span>
          </div>
        ))}
        {pricing.lineItems.length > previewItems.length && (
          <span className="text-[11px] font-medium text-fg-subtle">
            + {pricing.lineItems.length - previewItems.length} {lang === 'en' ? 'more' : 'więcej'}
          </span>
        )}
      </div>

      <div className="mt-auto grid gap-4 border-t pt-5" style={{ borderColor: 'var(--color-border)' }}>
        <div className="rounded-[14px] px-4 py-3" style={{ background: `color-mix(in oklab, ${accent} 14%, var(--color-bg-raised))` }}>
          <div className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: accent }}>
            {lang === 'en' ? 'Package savings' : 'Oszczędność pakietu'}
          </div>
          <div className="mt-1 font-serif italic text-2xl font-light">-{formatPln(pricing.savingsAmount, 'pl-PL')}</div>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="t-eyebrow">
              {lang === 'en' ? 'Package price' : 'Cena paczki'}
            </div>
            <div className="font-serif italic text-3xl font-light mt-1">
              {formatPln(pricing.bundlePrice, 'pl-PL')}
            </div>
          </div>
          <div className="text-right text-[12px] leading-relaxed text-fg-subtle">
            <div>{lang === 'en' ? 'Ref. total' : 'Suma ref.'}</div>
            <div className="text-base font-medium line-through">
              {formatPln(pricing.listValue, 'pl-PL')}
            </div>
          </div>
        </div>
        <Link
          to={`/pakiety/${bundle.slug}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium no-underline transition-all duration-300 hover:scale-[1.01]"
          style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}
        >
          {lang === 'en' ? 'See package' : 'Zobacz pakiet'}
          <ArrowRight size={14} />
        </Link>
      </div>
    </Motion.article>
  );
}

function CustomCard({ size, discount, index = 0, lang = 'pl' }) {
  const tags = customTags[lang] ?? customTags.pl;

  return (
    <Motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative mt-4 grid gap-5 rounded-[20px] border bg-white p-6 pt-8 md:p-7 md:pt-9 transition-all duration-500 hover:-translate-y-1"
      style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <span className="absolute left-6 top-0 -translate-y-1/2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
        {tags[size]}
      </span>
      <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
        <PackagePlus size={18} />
      </div>
      <div>
        <div className="t-eyebrow">{lang === 'en' ? 'Build your own' : 'Wybierz sam'}</div>
        <h3 className="t-h3 mt-3">
          {lang === 'en' ? `Custom package ${size}` : `Własna paczka ${size}`}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
          {lang === 'en'
            ? 'Refill the liquids you use most often and keep the global package discount.'
            : 'Powtórz płyny, które zużywasz najszybciej i zachowaj jeden globalny rabat.'}
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-[14px] p-4" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
        <span className="text-[13px] font-medium">{lang === 'en' ? 'Package discount' : 'Rabat paczki'}</span>
        <span className="font-serif italic text-2xl font-light">do -{discount}%</span>
      </div>
      <Link
        to={`/pakiety/wlasna-paczka/${size}`}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium no-underline transition-all duration-300 hover:scale-[1.01]"
        style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-fg)' }}
      >
        {lang === 'en' ? 'Open customizer' : 'Otwórz konfigurator'}
        <ArrowRight size={14} />
      </Link>
    </Motion.article>
  );
}

export default function PlansSection({ lang = 'pl' }) {
  const content = copy[lang]?.plans ?? copy.pl.plans;
  
  // Chcemy pokazać: Pakiet 4x, Pakiet 8x, Pakiet 12x
  const bundle4x = bundles.find((bundle) => bundle.slug === 'dom-codzienny-4');
  const bundle8x = bundles.find((bundle) => bundle.slug === 'dom-pelny-8');
  const bundle12x = bundles.find((bundle) => bundle.slug === 'dom-komplet-12');

  const readyBundles = [bundle4x, bundle8x, bundle12x].filter(Boolean);

  return (
    <section id="pakiety" className="px-6 py-24" style={{ background: 'var(--color-bg-muted)' }}>
      <div className="mx-auto max-w-7xl">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-[660px]"
        >
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-4">{content.title}</h2>
          <p className="t-lead mt-4 text-[17px] leading-relaxed font-light">{content.lead}</p>
        </Motion.div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1fr_1fr]">
          {readyBundles.map((bundle, i) => <BundleCard key={bundle.slug} bundle={bundle} index={i} lang={lang} />)}
        </div>
        
        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr_1fr]">
          <CustomCard size={4} discount={30} index={3} lang={lang} />
          <CustomCard size={8} discount={40} index={4} lang={lang} />
          <CustomCard size={12} discount={50} index={5} lang={lang} />
        </div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 grid gap-6 rounded-[20px] border bg-white p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8"
          style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <div>
            <div className="flex items-center gap-2">
              <Layers3 size={16} className="text-fg-subtle" />
              <span className="t-eyebrow">{lang === 'en' ? 'Advanced options' : 'Dla wymagających'}</span>
            </div>
            <h3 className="t-h4 mt-5 max-w-[720px]">
              {lang === 'en'
                ? 'In every package, you can choose a ready-made set or compose your own box of liquids.'
                : 'W każdym pakiecie możesz wybrać gotowy zestaw albo skomponować własną paczkę płynów.'}
            </h3>
            <p className="mt-3 max-w-[660px] text-[13px] leading-relaxed text-fg-muted">
              {lang === 'en'
                ? 'For cleaning, laundry, and dishwashing—tailored exactly to your needs.'
                : 'Do sprzątania, prania i zmywania – dokładnie pod Twoje potrzeby.'}
            </p>
          </div>
          <Link
            to="/#pakiety"
            className="flex items-center gap-3 rounded-[14px] border p-4 transition-all duration-300 hover:-translate-y-0.5 no-underline text-inherit" 
            style={{ borderColor: 'var(--color-border)' }}
          >
            <Box size={18} className="text-fg-subtle" />
            <div>
              <div className="text-[11px] font-medium text-fg-muted">{lang === 'en' ? 'See offer' : 'Zobacz ofertę'}</div>
              <div className="font-serif italic text-xl font-light">{lang === 'en' ? 'See all packages' : 'Zobacz wszystkie pakiety'}</div>
            </div>
          </Link>
        </Motion.div>
      </div>
    </section>
  );
}
