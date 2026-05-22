import { formatPln } from '../../lib/bundlePricing';
import ShoperPlaceholderButton from './ShoperPlaceholderButton';

export default function BundlePricePanel({ pricing, lang = 'pl' }) {
  return (
    <aside className="grid gap-5 rounded-[24px] border border-border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="t-eyebrow">{lang === 'en' ? 'Package math' : 'Ekonomia paczki'}</div>
          <div className="mt-2 font-display text-5xl font-black leading-none">
            {formatPln(pricing.bundlePrice, lang === 'en' ? 'en-GB' : 'pl-PL')}
          </div>
        </div>
        <span className="rounded-full bg-black px-3 py-1.5 text-sm font-black text-white">
          -{pricing.savingsPercent}%
        </span>
      </div>
      <dl className="grid gap-3 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-fg-muted">{lang === 'en' ? 'Reference total' : 'Suma referencyjna'}</dt>
          <dd className="font-extrabold line-through">
            {formatPln(pricing.listValue, lang === 'en' ? 'en-GB' : 'pl-PL')}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-fg-muted">{lang === 'en' ? 'Whole-box saving' : 'Oszczędność całej paczki'}</dt>
          <dd className="font-extrabold">
            {formatPln(pricing.savingsAmount, lang === 'en' ? 'en-GB' : 'pl-PL')}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-fg-muted">{lang === 'en' ? 'Items' : 'Sztuki'}</dt>
          <dd className="font-extrabold">{pricing.itemCount}</dd>
        </div>
      </dl>
      <p className="rounded-[14px] bg-surface-container-low p-4 text-xs leading-relaxed text-fg-muted">
        {lang === 'en'
          ? 'Product prices are reference values. Discount and saving are presented for the whole package.'
          : 'Ceny produktów są wartościami referencyjnymi. Rabat i oszczędność pokazujemy dla całej paczki.'}
      </p>
      <ShoperPlaceholderButton lang={lang} />
    </aside>
  );
}
