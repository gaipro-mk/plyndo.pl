import { useMemo, useState } from 'react';
import { ArrowLeft, Minus, PackagePlus, Plus } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BundleComposition from '../components/bundles/BundleComposition';
import BundlePricePanel from '../components/bundles/BundlePricePanel';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { bundles } from '../data/bundles';
import { products } from '../data/products';
import { calculateBundlePricing, formatPln } from '../lib/bundlePricing';

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
  const pricing = bundle ? calculateBundlePricing({ bundle, composition, products }) : null;

  if (!bundle || ![4, 8].includes(size)) {
    return <Navigate to="/#plans" replace />;
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
      }
    : {
        back: 'Wróć do pakietów',
        eyebrow: 'Wybierz sam',
        title: `Własna paczka ${size}`,
        lead: 'Dodaj dowolne produkty z obecnej linii. Duplikaty są dozwolone do limitu wybranego kartonu.',
        slot: 'Wypełnienie kartonu',
        choose: 'Dobierz produkty',
        empty: 'Cena paczki pojawi się po dodaniu pierwszego produktu.',
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
            { label: lang === 'en' ? 'Packages' : 'Pakiety', to: '/#plans' },
            { label: labels.title },
          ]}
        />
        <Link to="/#plans" className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-fg-muted no-underline transition-opacity hover:opacity-60 tracking-wide uppercase">
          <ArrowLeft size={14} />
          {labels.back}
        </Link>

        <motion.section
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
            <BundlePricePanel pricing={pricing} lang={lang} />
          ) : (
            <aside className="grid content-start gap-4 rounded-[16px] border p-6" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
                <PackagePlus size={18} />
              </div>
              <h2 className="t-h4">{labels.choose}</h2>
              <p className="text-[13px] leading-relaxed text-fg-muted">{labels.empty}</p>
              <div className="rounded-[12px] p-4 text-[13px] font-medium" style={{ background: 'var(--color-bg)' }}>
                -{Math.round(bundle.discountRule.rate * 100)}% {lang === 'en' ? 'for the whole box' : 'dla całej paczki'}
              </div>
            </aside>
          )}
        </motion.section>

        <motion.section
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
                {lang === 'en' ? 'Every item keeps its reference price visible.' : 'Każda pozycja zachowuje widoczną cenę referencyjną.'}
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {products.map((product) => {
                const count = counts[product.slug] ?? 0;
                return (
                  <article key={product.slug} className="grid grid-cols-[60px_1fr] gap-4 rounded-[16px] border p-4" style={{ borderColor: 'var(--color-border)' }}>
                    <Link
                      to={`/product/${product.slug}`}
                      className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[8px] border"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <img src={product.image} alt="" className="h-full w-full object-cover" />
                    </Link>
                    <div className="grid gap-3">
                      <div>
                        <h3 className="text-[14px] font-medium leading-tight">
                          {product.i18n?.[lang]?.displayName ?? product.name}
                        </h3>
                        <div className="mt-1 text-[12px] text-fg-muted">
                          {formatPln(product.listPrice, lang === 'en' ? 'en-GB' : 'pl-PL')} · 1 L
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
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
                        <span className="min-w-8 text-center font-serif italic text-xl font-light">{count}</span>
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
                      </div>
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
        </motion.section>
      </div>
    </main>
  );
}
