import { useMemo, useState } from 'react';
import { ArrowLeft, Minus, PackagePlus, Plus } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
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

      if (delta > 0 && nextTotal > size) {
        return current;
      }

      if (nextQuantity === 0) {
        const next = { ...current };
        delete next[slug];
        return next;
      }

      return { ...current, [slug]: nextQuantity };
    });
  }

  return (
    <main className="px-6 pb-24 pt-[148px]">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: lang === 'en' ? 'Packages' : 'Pakiety', to: '/#plans' },
            { label: labels.title },
          ]}
        />
        <Link to="/#plans" className="inline-flex items-center gap-2 text-sm font-bold text-fg-muted no-underline">
          <ArrowLeft size={16} />
          {labels.back}
        </Link>

        <section className="mt-8 grid gap-8 border-b border-border pb-12 lg:grid-cols-[1fr_360px]">
          <div>
            <span className="t-eyebrow">{labels.eyebrow}</span>
            <h1 className="t-display-2 mt-4">{labels.title}</h1>
            <p className="t-lead mt-5 max-w-[720px]">{labels.lead}</p>
            <div className="mt-7 max-w-[560px] rounded-[20px] border border-border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-sm font-extrabold">
                  <PackagePlus size={17} />
                  {labels.slot}
                </span>
                <span className="font-display text-3xl font-black">{itemCount}/{size}</span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
                {Array.from({ length: size }, (_, index) => (
                  <span
                    key={index}
                    className={`aspect-square rounded-[10px] border transition-colors ${index < itemCount ? 'border-[var(--color-cta-hover)] bg-[var(--color-cta)]' : 'border-border bg-surface-container-low'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          {itemCount > 0 ? (
            <BundlePricePanel pricing={pricing} lang={lang} />
          ) : (
            <aside className="grid content-start gap-4 rounded-[24px] border border-border bg-surface-container-low p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-black text-white">
                <PackagePlus size={22} />
              </div>
              <h2 className="t-h4">{labels.choose}</h2>
              <p className="text-sm leading-relaxed text-fg-muted">{labels.empty}</p>
              <div className="rounded-[14px] bg-white p-4 text-sm font-bold">
                -{Math.round(bundle.discountRule.rate * 100)}% {lang === 'en' ? 'for the whole box' : 'dla całej paczki'}
              </div>
            </aside>
          )}
        </section>

        <section className="mt-10 grid gap-7 xl:grid-cols-[1fr_420px]">
          <div>
            <div className="mb-5">
              <span className="t-eyebrow">{labels.choose}</span>
              <h2 className="t-h2 mt-2">
                {lang === 'en' ? 'Every item keeps its reference price visible.' : 'Każda pozycja zachowuje widoczną cenę referencyjną.'}
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {products.map((product) => {
                const count = counts[product.slug] ?? 0;

                return (
                  <article key={product.slug} className="grid grid-cols-[70px_1fr] gap-4 rounded-[20px] border border-border bg-white p-4">
                    <Link
                      to={`/product/${product.slug}`}
                      className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[12px]"
                      style={{ background: product.color.bg }}
                    >
                      <img src={product.image} alt="" className="h-full w-full object-cover" />
                    </Link>
                    <div className="grid gap-3">
                      <div>
                        <h3 className="text-base font-extrabold leading-tight">
                          {product.i18n?.[lang]?.displayName ?? product.name}
                        </h3>
                        <div className="mt-1 text-sm text-fg-muted">
                          {formatPln(product.listPrice, lang === 'en' ? 'en-GB' : 'pl-PL')} · 1 L
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => changeCount(product.slug, -1)}
                          disabled={count === 0}
                          aria-label={`${lang === 'en' ? 'Remove' : 'Usuń'} ${product.shortName}`}
                          className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-border bg-white text-black disabled:opacity-35"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="min-w-8 text-center font-display text-2xl font-black">{count}</span>
                        <button
                          type="button"
                          onClick={() => changeCount(product.slug, 1)}
                          disabled={!canAdd}
                          aria-label={`${lang === 'en' ? 'Add' : 'Dodaj'} ${product.shortName}`}
                          className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-black text-white disabled:opacity-35"
                        >
                          <Plus size={16} />
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
              <h2 className="t-h2 mt-2">
                {lang === 'en' ? 'Selected composition.' : 'Wybrany skład.'}
              </h2>
            </div>
            {itemCount > 0 ? (
              <BundleComposition pricing={pricing} lang={lang} />
            ) : (
              <div className="rounded-[20px] border border-dashed border-border bg-white p-7 text-sm leading-relaxed text-fg-muted">
                {lang === 'en'
                  ? 'Use plus buttons to fill the box. You can repeat a product when it is the one you use fastest.'
                  : 'Użyj przycisków plus, aby wypełnić karton. Możesz powtarzać płyn, który zużywasz najszybciej.'}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
