import { Link } from 'react-router-dom';
import { formatPln } from '../../lib/bundlePricing';

export default function BundleComposition({ pricing, lang = 'pl' }) {
  return (
    <div className="overflow-hidden rounded-[16px] border" style={{ borderColor: 'var(--color-border)' }}>
      <div className="grid gap-3 border-b px-5 py-4 text-[11px] font-medium uppercase tracking-[0.12em] text-fg-subtle sm:grid-cols-[1fr_120px_120px]" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}>
        <span>{lang === 'en' ? 'Product' : 'Produkt'}</span>
        <span>{lang === 'en' ? 'Quantity' : 'Ilość'}</span>
        <span>{lang === 'en' ? 'Reference' : 'Referencja'}</span>
      </div>
      <div>
        {pricing.lineItems.map((item, i) => (
          <div key={item.productSlug} className={`grid gap-3 px-5 py-4 sm:grid-cols-[1fr_120px_120px] sm:items-center ${i ? 'border-t' : ''}`} style={{ borderColor: 'var(--color-border)' }}>
            <Link to={`/product/${item.product.slug}`} className="flex items-center gap-3 no-underline" style={{ color: 'var(--color-fg)' }}>
              <span
                className="h-11 w-9 shrink-0 overflow-hidden rounded-[6px] border"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <img src={item.product.image} alt="" className="h-full w-full object-cover" />
              </span>
              <span>
                <span className="block text-[13px] font-medium">
                  {item.product.i18n?.[lang]?.displayName ?? item.product.name}
                </span>
                <span className="block text-[11px] text-fg-subtle">1 L</span>
              </span>
            </Link>
            <span className="text-[13px] font-medium">{item.quantity}×</span>
            <span className="text-[13px] font-medium">
              {formatPln(item.listValue, lang === 'en' ? 'en-GB' : 'pl-PL')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
