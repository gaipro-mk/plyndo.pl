import { ArrowRight, Box, Layers3, PackagePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { bundles } from '../../data/bundles';
import { products } from '../../data/products';
import { calculateBundlePricing, formatPln } from '../../lib/bundlePricing';
import { copy } from '../../content';

const packageTones = {
  'starter-10': { bg: 'var(--label-bath-bg)', fg: 'var(--label-bath-on)' },
  'dom-pelny-8': { bg: 'var(--label-dish-bg)', fg: 'var(--label-dish-on)' },
  'firma-operacyjna-8': { bg: 'var(--label-floor-bg)', fg: 'var(--label-floor-on)' },
  custom: { bg: 'var(--label-laundry-bg)', fg: 'var(--label-laundry-on)' },
};

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

function BundleCard({ bundle, lang, featured = false }) {
  const pricing = calculateBundlePricing({ bundle, products });
  const tone = packageTones[bundle.slug] ?? packageTones.custom;
  const previewItems = pricing.lineItems.slice(0, 4);

  return (
    <article
      className={`grid min-h-[420px] gap-6 rounded-[24px] border p-6 md:p-7 ${featured ? 'lg:row-span-2' : ''}`}
      style={{
        background: tone.bg,
        borderColor: 'color-mix(in oklab, currentColor 18%, transparent)',
        color: tone.fg,
      }}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] opacity-70">
            {audienceLabel(bundle.audience, lang)}
          </span>
          <span className="rounded-full border border-current px-2.5 py-1 text-[11px] font-black">
            -{percent(bundle.discountRule.rate)}
          </span>
        </div>
        <h3 className="mt-4 font-display text-3xl font-black leading-tight">{bundleName(bundle, lang)}</h3>
        <p className="mt-2 max-w-[420px] text-sm leading-relaxed opacity-80">
          {lang === 'en'
            ? `${bundle.size} one-litre items with package-level savings.`
            : `${bundle.size} litrowych pozycji z rabatem liczonym dla całej paczki.`}
        </p>
      </div>

      <div className="grid gap-2">
        {previewItems.map((item) => (
          <div key={item.productSlug} className="flex items-center justify-between gap-3 border-b border-current/15 pb-2 text-sm">
            <span className="font-semibold">
              {item.quantity > 1 ? `${item.quantity}x ` : ''}
              {item.product.i18n?.[lang]?.shortName ?? item.product.shortName}
            </span>
            <span className="opacity-75">{formatPln(item.listValue, lang === 'en' ? 'en-GB' : 'pl-PL')}</span>
          </div>
        ))}
        {pricing.lineItems.length > previewItems.length && (
          <span className="text-xs font-bold opacity-70">
            + {pricing.lineItems.length - previewItems.length} {lang === 'en' ? 'more product lines' : 'kolejne pozycje'}
          </span>
        )}
      </div>

      <div className="mt-auto grid gap-4 border-t border-current/20 pt-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] opacity-65">
              {lang === 'en' ? 'Package price' : 'Cena paczki'}
            </div>
            <div className="font-display text-4xl font-black leading-none">
              {formatPln(pricing.bundlePrice, lang === 'en' ? 'en-GB' : 'pl-PL')}
            </div>
          </div>
          <div className="text-right text-xs leading-relaxed opacity-80">
            <div>{lang === 'en' ? 'Reference total' : 'Suma referencyjna'}</div>
            <div className="text-base font-extrabold line-through">
              {formatPln(pricing.listValue, lang === 'en' ? 'en-GB' : 'pl-PL')}
            </div>
          </div>
        </div>
        <Link
          to={`/pakiety/${bundle.slug}`}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-white px-4 py-3 text-sm font-extrabold text-black no-underline"
        >
          {lang === 'en' ? 'See package' : 'Zobacz pakiet'}
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

function CustomCard({ size, discount, lang }) {
  return (
    <article className="grid gap-5 rounded-[24px] border border-border bg-white p-6 md:p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-black text-white">
        <PackagePlus size={21} />
      </div>
      <div>
        <div className="t-eyebrow">{lang === 'en' ? 'Build your own' : 'Wybierz sam'}</div>
        <h3 className="t-h3 mt-3">
          {lang === 'en' ? `Custom box of ${size}` : `Własna paczka ${size}`}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {lang === 'en'
            ? 'Repeat the items you use fastest and keep one global discount for the box.'
            : 'Powtórz płyny, które zużywasz najszybciej i zachowaj jeden globalny rabat paczki.'}
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-[14px] bg-surface-container-low p-4">
        <span className="text-sm font-bold">{lang === 'en' ? 'Package discount' : 'Rabat paczki'}</span>
        <span className="font-display text-3xl font-black">-{discount}%</span>
      </div>
      <Link
        to={`/pakiety/wlasna-paczka/${size}`}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-black px-4 py-3 text-sm font-extrabold text-black no-underline"
      >
        {lang === 'en' ? 'Open builder' : 'Otwórz konfigurator'}
        <ArrowRight size={16} />
      </Link>
    </article>
  );
}

export default function PlansSection({ lang = 'pl' }) {
  const content = copy[lang].plans;
  const starter = bundles.find((bundle) => bundle.slug === 'starter-10');
  const readyBundles = bundles.filter((bundle) => !bundle.isCustomizable && bundle.slug !== 'starter-10');

  return (
    <section id="plans" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-[760px]">
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-3">{content.title}</h2>
          <p className="t-lead mt-4">{content.lead}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr_1fr]">
          <BundleCard bundle={starter} lang={lang} featured />
          {readyBundles.map((bundle) => <BundleCard key={bundle.slug} bundle={bundle} lang={lang} />)}
          <CustomCard size={4} discount={30} lang={lang} />
          <CustomCard size={8} discount={40} lang={lang} />
        </div>

        <div className="mt-8 grid gap-5 rounded-[24px] border border-border bg-surface-container-low p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <div className="flex items-center gap-2">
              <Layers3 size={18} />
              <span className="t-eyebrow">{lang === 'en' ? 'Next catalog step' : 'Kolejny etap katalogu'}</span>
            </div>
            <h3 className="t-h4 mt-3">
              {lang === 'en' ? 'Future Starter 12 will reach a 50% discount.' : 'Docelowy Starter 12 osiągnie rabat 50%.'}
            </h3>
            <p className="mt-2 max-w-[760px] text-sm leading-relaxed text-fg-muted">
              {lang === 'en'
                ? 'The current launch is built on the 10 final liquids already available in the project.'
                : 'Obecne wdrożenie pracuje na 10 gotowych płynach, które są już dostępne w projekcie.'}
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-[16px] border border-border bg-white p-4">
            <Box size={21} />
            <div>
              <div className="text-xs font-bold text-fg-muted">{lang === 'en' ? 'Launch starter' : 'Starter na start'}</div>
              <div className="font-display text-2xl font-black">Starter 10 -45%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
