import { formatPln } from '../../lib/bundlePricing';
import ShoperPlaceholderButton from './ShoperPlaceholderButton';

export default function BundlePricePanel({ pricing, lang = 'pl' }) {
  return (
    <aside className="grid gap-5 rounded-[20px] border p-6" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
      <div className="flex items-start justify-between gap-4 border-b pb-5" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <div className="t-eyebrow">{lang === 'en' ? 'Package math' : 'Ekonomia paczki'}</div>
          <div className="mt-2 font-serif italic text-4xl font-light leading-none">
            {formatPln(pricing.bundlePrice, lang === 'en' ? 'en-GB' : 'pl-PL')}
          </div>
        </div>
        <span className="rounded-full border px-3 py-1.5 text-[12px] font-medium" style={{ borderColor: 'var(--color-border-strong)' }}>
          -{pricing.savingsPercent}%
        </span>
      </div>
      <dl className="grid gap-3 text-[13px]">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-fg-muted">{lang === 'en' ? 'Reference total' : 'Suma referencyjna'}</dt>
          <dd className="font-medium line-through">
            {formatPln(pricing.listValue, lang === 'en' ? 'en-GB' : 'pl-PL')}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-fg-muted">{lang === 'en' ? 'Whole-box saving' : 'Oszczędność całej paczki'}</dt>
          <dd className="font-medium">
            {formatPln(pricing.savingsAmount, lang === 'en' ? 'en-GB' : 'pl-PL')}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-fg-muted">{lang === 'en' ? 'Items' : 'Sztuki'}</dt>
          <dd className="font-medium">{pricing.itemCount}</dd>
        </div>
      </dl>
      <p className="rounded-[14px] p-4 text-[12px] leading-relaxed text-fg-muted" style={{ background: 'var(--color-bg-muted)' }}>
        {lang === 'en'
          ? 'Product prices are reference values. Discount and saving are presented for the whole package.'
          : 'Ceny produktów są wartościami referencyjnymi. Rabat i oszczędność pokazujemy dla całej paczki.'}
      </p>
      <ShoperPlaceholderButton lang={lang} />
    </aside>
  );
}
