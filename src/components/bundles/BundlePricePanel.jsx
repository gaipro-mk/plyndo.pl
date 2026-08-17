import { formatPln } from '../../lib/bundlePricing';
import StoreButton from './StoreButton';

export default function BundlePricePanel({ pricing, lang = 'pl', bundle }) {
  const items = (pricing?.composition || pricing?.lineItems || []).map((c) => ({
    stockId: c.stockId ?? c.product?.shoperStockId ?? c.product?.stockId,
    quantity: c.quantity || 1,
  }));
  const packSize = bundle?.size ?? pricing?.bundle?.size ?? pricing?.itemCount;
  const bundleLabel = bundle?.name ?? bundle?.slug ?? pricing?.bundle?.name ?? pricing?.bundle?.slug;

  const isFull = bundle?.isCustomizable ? (pricing.itemCount === bundle.size) : true;
  const displayPrice = isFull ? pricing.bundlePrice : pricing.listValue;
  const displaySavingsPercent = isFull ? pricing.savingsPercent : 0;
  const displaySavingsAmount = isFull ? pricing.savingsAmount : 0;

  const incompleteNote = lang === 'en'
    ? `Add ${bundle?.size - pricing.itemCount} more bottle(s) to complete the box and order.`
    : `Dobierz jeszcze ${bundle?.size - pricing.itemCount} szt., aby skompletować paczkę i zamówić.`;

  return (
    <aside className="grid gap-5 rounded-[20px] border p-6 border-border bg-bg">
      <div className="flex items-start justify-between gap-4 border-b pb-5 border-border">
        <div>
          <div className="t-eyebrow">{lang === 'en' ? 'Package math' : 'Ekonomia paczki'}</div>
          <div className="mt-2 font-serif italic text-4xl font-light leading-none">
            {formatPln(displayPrice, lang === 'en' ? 'en-GB' : 'pl-PL')}
          </div>
        </div>
        <span className="rounded-full border px-3 py-1.5 text-[12px] font-medium border-border-strong">
          -{displaySavingsPercent}%
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
            {formatPln(displaySavingsAmount, lang === 'en' ? 'en-GB' : 'pl-PL')}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-fg-muted">{lang === 'en' ? 'Items' : 'Sztuki'}</dt>
          <dd className="font-medium">{pricing.itemCount}</dd>
        </div>
      </dl>
      <p className="rounded-[14px] p-4 text-[12px] leading-relaxed text-fg-muted bg-bg-muted">
        {lang === 'en'
          ? 'Product prices are reference values. Discount and saving are presented for the whole package.'
          : 'Ceny produktów są wartościami referencyjnymi. Rabat i oszczędność pokazujemy dla całej paczki.'}
      </p>
      <StoreButton
        items={items}
        packSize={packSize}
        bundleLabel={bundleLabel}
        lang={lang}
        disabled={!isFull}
        note={isFull ? undefined : incompleteNote}
      />
    </aside>
  );
}
