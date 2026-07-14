import { Link } from 'react-router-dom';
import { productRoutePath } from '../../data/products';
import { calculateDiscountedUnitPrice, formatPln } from '../../lib/bundlePricing';

export default function BundleComposition({ pricing, lang = 'pl' }) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-border">
      <div className="grid gap-3 border-b px-5 py-4 text-[11px] font-medium uppercase tracking-[0.12em] text-fg-subtle sm:grid-cols-[1fr_90px_170px] border-border bg-bg-muted">
        <span>{lang === 'en' ? 'Product' : 'Produkt'}</span>
        <span>{lang === 'en' ? 'Quantity' : 'Ilość'}</span>
        <span>{lang === 'en' ? 'In this box' : 'Cena w paczce'}</span>
      </div>
      <div>
        {pricing.lineItems.map((item, i) => {
          const discountedUnitPrice = calculateDiscountedUnitPrice(item.unitListPrice, pricing.discountRate);
          const discountedLineValue = discountedUnitPrice * item.quantity;

          return (
            <div key={item.productSlug} className={`grid gap-3 px-5 py-4 sm:grid-cols-[1fr_90px_170px] sm:items-center ${i ? 'border-t' : ''} border-border`}>
              <Link to={productRoutePath(item.product)} className="flex items-center gap-3 no-underline text-fg">
                <span
                  className="h-11 w-9 shrink-0 overflow-hidden rounded-[6px] border border-border"
                >
                  <img src={item.product.image} alt="" className="h-full w-full object-cover" />
                </span>
                <span>
                  <span className="block text-[13px] font-medium">
                    {item.product.i18n?.[lang]?.displayName ?? item.product.name}
                  </span>
                  <span className="block text-[11px] text-fg-subtle">
                    1 L · <span className="line-through">{formatPln(item.unitListPrice, lang === 'en' ? 'en-GB' : 'pl-PL')}</span>
                  </span>
                </span>
              </Link>
              <span className="text-[13px] font-medium">{item.quantity}×</span>
              <span className="text-[13px] font-medium">
                <span className="block font-serif italic text-lg font-light">
                  {formatPln(discountedLineValue, lang === 'en' ? 'en-GB' : 'pl-PL')}
                </span>
                <span className="block text-[11px] font-normal text-fg-subtle">
                  {formatPln(discountedUnitPrice, lang === 'en' ? 'en-GB' : 'pl-PL')} / 1 L
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
