import { ArrowRight, Box, Layers3, PackagePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bundles } from '../../data/bundles';
import { products } from '../../data/products';
import { calculateBundlePricing, formatPln } from '../../lib/bundlePricing';
import { copy } from '../../content';

function percent(rate) {
  return `${Math.round(rate * 100)}%`;
}

function bundleName(bundle, lang) {
  return bundle.i18n?.[lang]?.displayName ?? bundle.name;
}

function audienceLabel(audience, lang) {
  const labels = {
    all: lang === 'en' ? 'Start or refill' : 'Start lub uzupełnienie',
    home: lang === 'en' ? 'Home' : 'Dom',
    business: lang === 'en' ? 'Business' : 'Firma',
  };
  return labels[audience] ?? labels.all;
}

/* Color accent for left border strip — subtle product-color accent */
const accentColors = {
  'komplet-12': 'var(--label-bath-bg)',
  'dom-pelny-8': 'var(--label-dish-bg)',
  'dom-komplet-12': 'var(--label-dish-bg)',
  'firma-operacyjna-8': 'var(--label-floor-bg)',
  'firma-gastro-12': 'var(--label-floor-bg)',
  custom: 'var(--label-laundry-bg)',
};

function BundleCard({ bundle, lang, featured = false, index = 0 }) {
  const pricing = calculateBundlePricing({ bundle, products });
  const accent = accentColors[bundle.slug] ?? accentColors.custom;
  const previewItems = pricing.lineItems.slice(0, 4);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`grid min-h-[400px] gap-6 rounded-[20px] border bg-white p-6 md:p-7 ${featured ? 'lg:row-span-2' : ''}`}
      style={{ borderColor: 'var(--color-border)', borderLeft: `3px solid ${accent}` }}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="t-eyebrow">
            {audienceLabel(bundle.audience, lang)}
          </span>
          <span className="rounded-full border px-2.5 py-1 text-[11px] font-semibold" style={{ borderColor: accent, color: accent }}>
            -{percent(bundle.discountRule.rate)}
          </span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold leading-tight">{bundleName(bundle, lang)}</h3>
        <p className="mt-2 max-w-[420px] text-[13px] leading-relaxed text-fg-muted">
          {lang === 'en'
            ? `${bundle.size} one-litre items with package-level savings.`
            : `${bundle.size} litrowych pozycji z rabatem liczonym dla całej paczki.`}
        </p>
      </div>

      <div className="grid gap-2">
        {previewItems.map((item) => (
          <div key={item.productSlug} className="flex items-center justify-between gap-3 border-b pb-2 text-[13px]" style={{ borderColor: 'var(--color-border)' }}>
            <span className="font-medium">
              {item.quantity > 1 ? `${item.quantity}× ` : ''}
              {item.product.i18n?.[lang]?.shortName ?? item.product.shortName}
            </span>
            <span className="text-fg-subtle">{formatPln(item.listValue, lang === 'en' ? 'en-GB' : 'pl-PL')}</span>
          </div>
        ))}
        {pricing.lineItems.length > previewItems.length && (
          <span className="text-[11px] font-medium text-fg-subtle">
            + {pricing.lineItems.length - previewItems.length} {lang === 'en' ? 'more' : 'więcej'}
          </span>
        )}
      </div>

      <div className="mt-auto grid gap-4 border-t pt-5" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="t-eyebrow">
              {lang === 'en' ? 'Package price' : 'Cena paczki'}
            </div>
            <div className="font-serif italic text-3xl font-light mt-1">
              {formatPln(pricing.bundlePrice, lang === 'en' ? 'en-GB' : 'pl-PL')}
            </div>
          </div>
          <div className="text-right text-[12px] leading-relaxed text-fg-subtle">
            <div>{lang === 'en' ? 'Ref. total' : 'Suma ref.'}</div>
            <div className="text-base font-medium line-through">
              {formatPln(pricing.listValue, lang === 'en' ? 'en-GB' : 'pl-PL')}
            </div>
          </div>
        </div>
        <Link
          to={`/pakiety/${bundle.slug}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium no-underline transition-all duration-300 hover:opacity-90"
          style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}
        >
          {lang === 'en' ? 'See package' : 'Zobacz pakiet'}
          <ArrowRight size={14} />
        </Link>
      </div>
    </motion.article>
  );
}

function CustomCard({ size, discount, lang, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-5 rounded-[20px] border bg-white p-6 md:p-7"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
        <PackagePlus size={18} />
      </div>
      <div>
        <div className="t-eyebrow">{lang === 'en' ? 'Build your own' : 'Wybierz sam'}</div>
        <h3 className="t-h3 mt-3">
          {lang === 'en' ? `Custom box of ${size}` : `Własna paczka ${size}`}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
          {lang === 'en'
            ? 'Repeat the items you use fastest and keep one global discount.'
            : 'Powtórz płyny, które zużywasz najszybciej i zachowaj jeden globalny rabat.'}
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-[14px] p-4" style={{ background: 'var(--color-bg-muted)' }}>
        <span className="text-[13px] font-medium">{lang === 'en' ? 'Package discount' : 'Rabat paczki'}</span>
        <span className="font-serif italic text-2xl font-light">-{discount}%</span>
      </div>
      <Link
        to={`/pakiety/wlasna-paczka/${size}`}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium no-underline transition-all duration-300 hover:bg-black/[0.03]"
        style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-fg)' }}
      >
        {lang === 'en' ? 'Open builder' : 'Otwórz konfigurator'}
        <ArrowRight size={14} />
      </Link>
    </motion.article>
  );
}

export default function PlansSection({ lang = 'pl' }) {
  const content = copy[lang].plans;
  const starter = bundles.find((bundle) => bundle.slug === 'komplet-12');
  const readyBundles = bundles.filter((bundle) => !bundle.isCustomizable && bundle.slug !== 'komplet-12');

  return (
    <section id="plans" className="px-6 py-24" style={{ background: 'var(--color-bg-muted)' }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-[660px]"
        >
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-4">{content.title}</h2>
          <p className="t-lead mt-4">{content.lead}</p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr_1fr]">
          <BundleCard bundle={starter} lang={lang} featured index={0} />
          {readyBundles.map((bundle, i) => <BundleCard key={bundle.slug} bundle={bundle} lang={lang} index={i + 1} />)}
          <CustomCard size={4} discount={30} lang={lang} index={readyBundles.length + 1} />
          <CustomCard size={8} discount={40} lang={lang} index={readyBundles.length + 2} />
          <CustomCard size={12} discount={50} lang={lang} index={readyBundles.length + 3} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 grid gap-5 rounded-[20px] border bg-white p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div>
            <div className="flex items-center gap-2">
              <Layers3 size={16} className="text-fg-subtle" />
              <span className="t-eyebrow">{lang === 'en' ? 'Next catalog step' : 'Kolejny etap katalogu'}</span>
            </div>
            <h3 className="t-h4 mt-3">
              {lang === 'en' ? 'Complete 12 reaches a 50% package discount.' : 'Komplet 12 osiąga rabat 50% dla całej paczki.'}
            </h3>
            <p className="mt-2 max-w-[660px] text-[13px] leading-relaxed text-fg-muted">
              {lang === 'en'
                ? 'The current line is built on the 12 final liquids available in the project, sold in boxes of 4, 8, and 12.'
                : 'Obecna linia to 12 gotowych płynów dostępnych w projekcie, sprzedawanych w paczkach po 4, 8 i 12 sztuk.'}
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-[14px] border p-4" style={{ borderColor: 'var(--color-border)' }}>
            <Box size={18} className="text-fg-subtle" />
            <div>
              <div className="text-[11px] font-medium text-fg-muted">{lang === 'en' ? 'Full line' : 'Cała linia'}</div>
              <div className="font-serif italic text-xl font-light">Komplet 12 -50%</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
