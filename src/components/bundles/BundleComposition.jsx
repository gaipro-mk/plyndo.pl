import { Link } from 'react-router-dom';
import { formatPln } from '../../lib/bundlePricing';

export default function BundleComposition({ pricing, lang = 'pl' }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-border bg-white">
      <div className="grid gap-3 border-b border-border bg-surface-container-low px-5 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-fg-muted sm:grid-cols-[1fr_120px_120px]">
        <span>{lang === 'en' ? 'Product' : 'Produkt'}</span>
        <span>{lang === 'en' ? 'Quantity' : 'Ilość'}</span>
        <span>{lang === 'en' ? 'Reference' : 'Referencja'}</span>
      </div>
      <div className="divide-y divide-border">
        {pricing.lineItems.map((item) => (
          <div key={item.productSlug} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_120px_120px] sm:items-center">
            <Link to={`/product/${item.product.slug}`} className="flex items-center gap-3 text-black no-underline">
              <span
                className="h-12 w-10 shrink-0 overflow-hidden rounded-[8px]"
                style={{ background: item.product.color.bg }}
              >
                <img src={item.product.image} alt="" className="h-full w-full object-cover" />
              </span>
              <span>
                <span className="block text-sm font-extrabold">
                  {item.product.i18n?.[lang]?.displayName ?? item.product.name}
                </span>
                <span className="block text-xs text-fg-muted">1 L</span>
              </span>
            </Link>
            <span className="text-sm font-bold">{item.quantity}x</span>
            <span className="text-sm font-bold">
              {formatPln(item.listValue, lang === 'en' ? 'en-GB' : 'pl-PL')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
