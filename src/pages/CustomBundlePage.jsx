import { useMemo, useState } from 'react';
import { ArrowLeft, Minus, PackagePlus, Plus } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import BundleComposition from '../components/bundles/BundleComposition';
import BundlePricePanel from '../components/bundles/BundlePricePanel';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { bundles } from '../data/bundles';
import { productRoutePath, products } from '../data/products';
import { calculateBundlePricing, calculateDiscountedUnitPrice, formatPln } from '../lib/bundlePricing';

function getCustomBundle(size) {
  return bundles.find((bundle) => bundle.isCustomizable && bundle.size === size);
}

function buildComposition(counts) {
  return Object.entries(counts)
    .filter(([, quantity]) => quantity > 0)
    .map(([productSlug, quantity]) => ({ productSlug, quantity }));
}

export default function CustomBundlePage({ lang = 'pl' }) {
  const { size: sizeParam } = useParams();
  const size = Number(sizeParam);
  const bundle = getCustomBundle(size);
  const [counts, setCounts] = useState({});

  const itemCount = Object.values(counts).reduce((total, quantity) => total + quantity, 0);
  const composition = useMemo(() => buildComposition(counts), [counts]);
  const isFull = itemCount === size;
  const effectiveDiscountRule = isFull ? bundle.discountRule : { type: 'percentage', rate: 0 };
  const pricing = bundle ? calculateBundlePricing({ bundle, composition, products, discountRule: effectiveDiscountRule }) : null;
  const remaining = size - itemCount;

  if (!bundle || ![4, 8, 12].includes(size)) {
    return <Navigate to="/#pakiety" replace />;
  }

  const canAdd = itemCount < size;
  const labels = lang === 'en'
    ? {
        back: 'Back to packages',
        eyebrow: 'Build your own',
        title: `Custom box of ${size}`,
        lead: 'Add any products from the current line. Duplicates are allowed up to the selected box size.',
        slot: 'Box fill',
        choose: 'Choose products',
        empty: 'Your package price appears after you add the first product.',
        remaining: (n) => `Add ${n} more item${n === 1 ? '' : 's'}`,
      }
    : {
        back: 'Wróć do pakietów',
        eyebrow: 'Wybierz sam',
        title: `Własna paczka ${size}`,
        lead: 'Dodaj dowolne produkty z obecnej linii. Duplikaty są dozwolone do limitu wybranego kartonu.',
        slot: 'Wypełnienie kartonu',
        choose: 'Dobierz produkty',
        empty: 'Cena paczki pojawi się po dodaniu pierwszego produktu.',
        remaining: (n) => `Dobierz jeszcze ${n} ${n === 1 ? 'produkt' : n < 5 ? 'produkty' : 'produktów'}`,
      };

  function changeCount(slug, delta) {
    setCounts((current) => {
      const nextQuantity = Math.max(0, (current[slug] ?? 0) + delta);
      const nextTotal = itemCount + delta;
      if (delta > 0 && nextTotal > size) return current;
      if (nextQuantity === 0) {
        const next = { ...current };
        delete next[slug];
        return next;
      }
      return { ...current, [slug]: nextQuantity };
    });
  }

  return (
    <main className="px-6 pb-24 pt-[120px]" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: lang === 'en' ? 'Packages' : 'Pakiety', to: '/#pakiety' },
            { label: labels.title },
          ]}
        />
        <Link to="/#pakiety" className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-fg-muted no-underline transition-opacity hover:opacity-60 tracking-wide uppercase">
          <ArrowLeft size={14} />
          {labels.back}
        </Link>

        <Motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 grid gap-8 border-b pb-12 lg:grid-cols-[1fr_360px]"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div>
            <span className="t-eyebrow">{labels.eyebrow}</span>
            <h1 className="t-display-2 mt-4">{labels.title}</h1>
            <p className="t-lead mt-5 max-w-[620px]">{labels.lead}</p>
            <div className="mt-7 max-w-[500px] rounded-[16px] border p-5" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[13px] font-medium">
                  <PackagePlus size={15} />
                  {labels.slot}
                </span>
                <span className="font-serif italic text-2xl font-light">{itemCount}/{size}</span>
              </div>
              {remaining > 0 && (
                <p className="mt-3 text-[12px] font-medium text-fg-muted">{labels.remaining(remaining)}</p>
              )}
              <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
                {(() => {
                // Build an ordered array of product colors for each filled slot
                const slotColors = [];
                for (const [slug, qty] of Object.entries(counts)) {
                  const prod = products.find(p => p.slug === slug);
                  if (prod) {
                    for (let j = 0; j < qty; j++) slotColors.push(prod.color.bg);
                  }
                }
                return Array.from({ length: size }, (_, index) => {
                  const filled = index < slotColors.length;
                  const bg = filled ? slotColors[index] : 'var(--color-bg-muted)';
                  return (
                    <span
                      key={index}
                      className="aspect-square rounded-[8px] border transition-all duration-300"
                      style={{
                        borderColor: filled ? bg : 'var(--color-border)',
                        background: bg,
                        boxShadow: filled ? 'inset 0 0 0 1px rgba(0,0,0,0.1)' : 'none',
                      }}
                    />
                  );
                });
              })()}
              </div>
            </div>
          </div>
          {itemCount > 0 ? (
            <BundlePricePanel pricing={pricing} lang={lang} bundle={{ ...bundle, composition }} />
          ) : (
            <aside className="grid content-start gap-4 rounded-[16px] border p-6" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
                <PackagePlus size={18} />
              </div>
              <h2 className="t-h4">{labels.choose}</h2>
              <p className="text-[13px] leading-relaxed text-fg-muted">{labels.empty}</p>
              <div className="rounded-[12px] p-4 text-[13px] font-medium" style={{ background: 'var(--color-bg)' }}>
                {isFull ? `-${Math.round(bundle.discountRule.rate * 100)}%` : '0%'} {lang === 'en' ? 'for the whole box' : 'dla całej paczki'}
              </div>
            </aside>
          )}
        </Motion.section>

        <Motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 grid gap-7 xl:grid-cols-[1fr_420px]"
        >
          <div>
            <div className="mb-5">
              <span className="t-eyebrow">{labels.choose}</span>
              <h2 className="t-h2 mt-3">
                {lang === 'en' ? 'Every item shows the price inside this box.' : 'Każda pozycja pokazuje cenę w tej paczce.'}
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {products.map((product) => {
                const count = counts[product.slug] ?? 0;
                const unitDiscountedPrice = calculateDiscountedUnitPrice(product.listPrice, isFull ? pricing.discountRate : 0);
                const selectedSavings = (product.listPrice - unitDiscountedPrice) * count;

                return (
                  <article key={product.slug} className="grid min-h-[132px] grid-cols-[82px_minmax(0,1fr)_44px] gap-4 rounded-[16px] border p-4" style={{ borderColor: count ? product.color.bg : 'var(--color-border)', background: count ? `color-mix(in oklab, ${product.color.bg} 12%, var(--color-bg-raised))` : 'var(--color-bg)' }}>
                    <Link
                      to={productRoutePath(product)}
                      aria-label={`${lang === 'en' ? 'Open product page' : 'Otwórz stronę produktu'}: ${product.i18n?.[lang]?.displayName ?? product.name}`}
                      className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[10px] border bg-white"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <img src={product.image} alt="" className="h-full w-full object-cover" aria-hidden="true" />
                    </Link>
                    <div className="grid min-w-0 content-between gap-3">
                      <div>
                        <h3 className="text-[21px] font-light italic leading-[1.05]" style={{ fontFamily: 'var(--font-serif)' }}>
                          {product.i18n?.[lang]?.displayName ?? product.name}
                        </h3>
                        <div className="mt-3 grid gap-1 rounded-[10px] px-3 py-2" style={{ background: 'var(--color-bg-muted)' }}>
                          <div className="flex items-baseline justify-between gap-2 text-[11px] text-fg-subtle">
                            <span>{lang === 'en' ? 'Reference' : 'Cena ref.'}</span>
                            <span className="line-through">{formatPln(product.listPrice, lang === 'en' ? 'en-GB' : 'pl-PL')}</span>
                          </div>
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-[11px] font-medium text-fg-muted">{lang === 'en' ? 'In this box' : 'W tej paczce'}</span>
                            <span className="font-serif text-[20px] font-light italic leading-none">{formatPln(unitDiscountedPrice, lang === 'en' ? 'en-GB' : 'pl-PL')}</span>
                          </div>
                        </div>
                        {count > 0 && (
                          <div className="mt-2 text-[11px] font-medium text-fg-subtle">
                            {`${lang === 'en' ? 'You save' : 'Oszczędzasz'} ${formatPln(selectedSavings, lang === 'en' ? 'en-GB' : 'pl-PL')}`}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid h-full content-center justify-items-center gap-1 rounded-full px-1 py-1" style={{ background: 'var(--color-bg-muted)' }}>
                      <button
                        type="button"
                        onClick={() => changeCount(product.slug, 1)}
                        disabled={!canAdd}
                        aria-label={`${lang === 'en' ? 'Add' : 'Dodaj'} ${product.shortName}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full cursor-pointer disabled:opacity-30 transition-opacity border-none"
                        style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}
                      >
                        <Plus size={14} />
                      </button>
                      <span className="flex h-9 w-9 items-center justify-center text-center font-serif italic text-2xl font-light leading-none">{count}</span>
                      <button
                        type="button"
                        onClick={() => changeCount(product.slug, -1)}
                        disabled={count === 0}
                        aria-label={`${lang === 'en' ? 'Remove' : 'Usuń'} ${product.shortName}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border cursor-pointer disabled:opacity-30 transition-opacity"
                        style={{ borderColor: 'var(--color-border-strong)', background: 'var(--color-bg)', color: 'var(--color-fg)' }}
                      >
                        <Minus size={14} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="self-start xl:sticky xl:top-28">
            <div className="mb-5">
              <span className="t-eyebrow">{lang === 'en' ? 'Current box' : 'Aktualny karton'}</span>
              <h2 className="t-h2 mt-3">
                {lang === 'en' ? 'Selected composition.' : 'Wybrany skład.'}
              </h2>
            </div>
            {itemCount > 0 ? (
              <BundleComposition pricing={pricing} lang={lang} />
            ) : (
              <div className="rounded-[16px] border border-dashed p-7 text-[13px] leading-relaxed text-fg-muted" style={{ borderColor: 'var(--color-border-strong)' }}>
                {lang === 'en'
                  ? 'Use plus buttons to fill the box. You can repeat a product when it is the one you use fastest.'
                  : 'Użyj przycisków plus, aby wypełnić karton. Możesz powtarzać płyn, który zużywasz najszybciej.'}
              </div>
            )}
          </div>
        </Motion.section>
      </div>
    </main>
  );
}
