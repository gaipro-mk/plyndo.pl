import { ArrowLeft, Boxes, ClipboardList } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BundleComposition from '../components/bundles/BundleComposition';
import BundlePricePanel from '../components/bundles/BundlePricePanel';
import QrPlaceholder from '../components/bundles/QrPlaceholder';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { getBundleBySlug } from '../data/bundles';
import { products } from '../data/products';
import { calculateBundlePricing } from '../lib/bundlePricing';

function packageLead(bundle, lang) {
  const copy = {
    'komplet-12': {
      pl: 'Pełna obecna linia w jednym kartonie. Sprawdzasz wszystkie 12 płynów i później uzupełniasz tylko te, które schodzą szybciej.',
      en: 'The complete current line in one box. Try all 12 liquids, then refill only what runs out fastest.',
    },
    'dom-codzienny-4': {
      pl: 'Mały karton do podstawowych stref domu: kuchnia, podłoga i łazienka.',
      en: 'A small home box for the kitchen, floors, and bathroom essentials.',
    },
    'dom-pelny-8': {
      pl: 'Domowy zapas obejmujący sprzątanie, higienę i pranie bez przypadkowych nadwyżek.',
      en: 'A home stock-up covering cleaning, hygiene, and laundry without random extras.',
    },
    'dom-komplet-12': {
      pl: 'Pełen domowy zapas na cały miesiąc – od kuchni i prania po łazienkę, odkamienianie i udrażnianie rur.',
      en: 'A full month of home supplies — from the kitchen and laundry to the bathroom, descaling, and drain care.',
    },
    'firma-podstawowa-4': {
      pl: 'Kompaktowy zestaw dla mniejszego biura, lokalu lub gabinetu.',
      en: 'A compact set for a smaller office, venue, or studio.',
    },
    'firma-operacyjna-8': {
      pl: 'Pakiet dla firmy z większym naciskiem na podłogi, sanitariaty i powierzchnie wspólne.',
      en: 'A business set weighted toward floors, sanitary zones, and shared surfaces.',
    },
    'firma-gastro-12': {
      pl: 'Pakiet dla gastronomii i firm: mycie naczyń, nabłyszczanie i odkamienianie zmywarek oraz udrażnianie rur w jednym kartonie.',
      en: 'A pack for gastronomy and businesses: dishwashing, rinse aid, dishwasher descaling, and drain care in one box.',
    },
  };

  return copy[bundle.slug]?.[lang] ?? (lang === 'en'
    ? 'A ready package composed from the current Plyndo line.'
    : 'Gotowy pakiet z obecnej linii Płyndo.');
}

export default function BundlePage({ lang = 'pl' }) {
  const { slug } = useParams();
  const bundle = getBundleBySlug(slug);

  if (!bundle || bundle.isCustomizable) {
    return <Navigate to="/#plans" replace />;
  }

  const pricing = calculateBundlePricing({ bundle, products });
  const displayName = bundle.i18n?.[lang]?.displayName ?? bundle.name;

  return (
    <main className="px-6 pb-24 pt-[120px]" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: lang === 'en' ? 'Packages' : 'Pakiety', to: '/#plans' },
            { label: displayName },
          ]}
        />
        <Link to="/#plans" className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-fg-muted no-underline transition-opacity hover:opacity-60 tracking-wide uppercase">
          <ArrowLeft size={14} />
          {lang === 'en' ? 'Back to packages' : 'Wróć do pakietów'}
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 grid gap-8 border-b pb-12 lg:grid-cols-[1fr_360px] lg:items-start"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div>
            <span className="t-eyebrow">
              {lang === 'en' ? 'Ready Plyndo package' : 'Gotowy pakiet Płyndo'}
            </span>
            <h1 className="t-display-2 mt-4">{displayName}</h1>
            <p className="t-lead mt-5 max-w-[620px]">{packageLead(bundle, lang)}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-medium" style={{ borderColor: 'var(--color-border-strong)' }}>
                <Boxes size={14} />
                {pricing.itemCount} {lang === 'en' ? 'one-litre items' : 'litrowych sztuk'}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-medium" style={{ borderColor: 'var(--color-border-strong)' }}>
                <ClipboardList size={14} />
                {lang === 'en' ? 'Full composition below' : 'Pełny skład poniżej'}
              </span>
            </div>
          </div>
          <BundlePricePanel pricing={pricing} lang={lang} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 grid gap-6 lg:grid-cols-[1fr_240px]"
        >
          <div>
            <div className="mb-5">
              <span className="t-eyebrow">{lang === 'en' ? 'Composition' : 'Skład pakietu'}</span>
              <h2 className="t-h2 mt-3">
                {lang === 'en' ? 'Reference values per product line.' : 'Ceny referencyjne przy każdej pozycji.'}
              </h2>
            </div>
            <BundleComposition pricing={pricing} lang={lang} />
          </div>
          <div className="grid content-start gap-5">
            <QrPlaceholder lang={lang} />
            <article className="rounded-[16px] border p-5" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}>
              <div className="t-eyebrow">{lang === 'en' ? 'Shoper handoff' : 'Handoff do Shopera'}</div>
              <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">
                {lang === 'en'
                  ? 'The final CTA will open a prepared cart with this composition and the global package discount.'
                  : 'Docelowy przycisk otworzy koszyk z tym składem oraz globalnym rabatem paczki.'}
              </p>
            </article>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
