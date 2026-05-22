import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, CirclePlay, Info, Package, ShieldAlert } from 'lucide-react';
import { products } from '../data/products';
import QrPlaceholder from '../components/bundles/QrPlaceholder';
import ShoperPlaceholderButton from '../components/bundles/ShoperPlaceholderButton';

/**
 * Splits "PŁYN DO naczyń" into logo part + suffix in label font.
 * The logo replaces the "PŁYN DO" text.
 */
function ProductNameDisplay({ name, logoSrc, className = '' }) {
  const prefix = 'PŁYN DO ';
  if (name.startsWith(prefix)) {
    const suffix = name.slice(prefix.length);
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <img src={logoSrc} alt="PŁYN DO" className="h-[42px] md:h-[56px] w-auto object-contain object-left" />
        <span className="font-serif italic font-medium text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-[-0.02em]">
          {suffix}
        </span>
      </div>
    );
  }
  // Fallback: just render the name
  return <span className={className}>{name}</span>;
}

function formatPrice(value, lang) {
  return new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'pl-PL', {
    style: 'currency',
    currency: 'PLN',
  }).format(value);
}

function MediaSlot({ title, note }) {
  return (
    <div className="grid min-h-[220px] content-between rounded-[20px] border border-black/10 bg-white/70 p-6 text-black shadow-sm">
      <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-black text-white">
        <CirclePlay size={21} />
      </span>
      <div>
        <div className="text-sm font-extrabold">{title}</div>
        <p className="mt-1.5 text-xs leading-relaxed text-black/65">{note}</p>
      </div>
    </div>
  );
}

export default function ProductPage({ lang = 'pl' }) {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const labels = lang === 'en'
    ? {
        back: 'Back to packages',
        scent: 'Reference product',
        usage: 'How to use',
        safety: 'Ingredients and safety',
        packageOnly: 'Package-only offer',
        price: 'Reference price',
        priceNote: 'The package discount is calculated globally for the chosen box.',
        add: 'Choose a package',
        box4: 'Build box of 4',
        box8: 'Build box of 8',
        effect: 'Effectiveness video',
        effectNote: 'Slot for the before and after cleaning material.',
        guide: 'Instruction video',
        guideNote: 'Slot for safe use and dosing guidance.',
      }
    : {
        back: 'Wróć do pakietów',
        scent: 'Produkt referencyjny',
        usage: 'Sposób użycia',
        safety: 'Skład i bezpieczeństwo',
        packageOnly: 'Oferta tylko w paczkach',
        price: 'Cena referencyjna',
        priceNote: 'Rabat liczony jest globalnie dla wybranego kartonu.',
        add: 'Wybierz pakiet',
        box4: 'Skomponuj paczkę 4',
        box8: 'Skomponuj paczkę 8',
        effect: 'Film skuteczności',
        effectNote: 'Miejsce na materiał przed i po czyszczeniu.',
        guide: 'Film instruktażowy',
        guideNote: 'Miejsce na bezpieczne użycie i dozowanie.',
      };

  if (!product) {
    return <Navigate to="/" />;
  }

  // Determine if background is light to switch logo/text colors if needed
  const isLightBg = product.color.bg === '#EBEBEB' || product.color.bg === '#E0E0E0' || product.color.bg === '#E4C969' || product.color.bg === '#A7CFEA' || product.color.bg === '#9ECBE8';
  const logoSrc = isLightBg ? '/logo-black.svg' : '/logo-white.svg';

  return (
    <div className="min-h-screen relative w-full flex flex-col font-sans" style={{ backgroundColor: product.color.bg, color: product.color.text }}>
      
      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col pt-[112px] pb-16 px-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <Link to="/#plans" className="flex items-center gap-2 hover:opacity-80 transition-opacity font-bold uppercase tracking-widest text-[11px]">
            <ChevronLeft size={16} />
            {labels.back}
          </Link>
          <img 
            src={logoSrc}
            alt="Płyn DO" 
            className="h-6" 
          />
        </header>

        {/* Main Product Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mt-4">
          {/* Left: Text & Details */}
          <div className="flex-1 space-y-10">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest" style={{ backgroundColor: product.color.text, color: product.color.bg }}>
                  {product.scent}
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-current px-3 py-1 text-[11px] font-bold uppercase tracking-widest opacity-80">
                  <Package size={12} />
                  {labels.packageOnly}
                </div>
              </div>
              <h1 className="mb-4">
                <ProductNameDisplay name={product.name} logoSrc={logoSrc} />
              </h1>
              <p className="font-serif italic text-xl md:text-2xl opacity-90">
                {product.subtitle}
              </p>
            </div>

            <p className="text-base leading-[1.6] opacity-95 max-w-xl font-medium">
              {product.description}
            </p>

            <section className="grid gap-5 rounded-[24px] border border-black/10 bg-white/75 p-6 text-black md:grid-cols-[1fr_1.1fr] md:p-8">
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-black/55">{labels.scent}</div>
                <div className="mt-2 font-display text-4xl font-black leading-none">
                  {formatPrice(product.listPrice, lang)}
                </div>
                <p className="mt-2 max-w-[270px] text-sm leading-relaxed text-black/65">
                  {labels.priceNote}
                </p>
              </div>
              <div className="grid gap-2 self-center sm:grid-cols-2">
                <Link
                  to="/#plans"
                  className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-black px-4 py-3 text-center text-sm font-extrabold text-white no-underline"
                >
                  {labels.add}
                </Link>
                <Link
                  to="/pakiety/wlasna-paczka/4"
                  className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-black px-4 py-3 text-center text-sm font-extrabold text-black no-underline"
                >
                  {labels.box4}
                </Link>
                <Link
                  to="/pakiety/wlasna-paczka/8"
                  className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-black px-4 py-3 text-center text-sm font-extrabold text-black no-underline sm:col-span-2"
                >
                  {labels.box8}
                </Link>
              </div>
            </section>

            <div className="space-y-6 max-w-xl">
              <section className="bg-black/5 p-6 md:p-8 rounded-[24px] border border-black/5 backdrop-blur-sm">
                <h3 className="flex items-center gap-3 font-bold mb-4 uppercase tracking-widest text-[12px]">
                  <Info size={18} /> {labels.usage}
                </h3>
                <p className="leading-[1.6] opacity-90 text-[14px] whitespace-pre-line">
                  {product.howToUse}
                </p>
              </section>

              <section className="bg-black/5 p-6 md:p-8 rounded-[24px] border border-black/5 backdrop-blur-sm">
                <h3 className="flex items-center gap-3 font-bold mb-4 uppercase tracking-widest text-[12px]">
                  <ShieldAlert size={18} /> {labels.safety}
                </h3>
                <p className="leading-[1.6] opacity-90 text-[13px] mb-4">
                  <strong>Składniki:</strong> {product.ingredients}
                </p>
                <p className="leading-[1.6] opacity-90 text-[13px]">
                  <strong>Bezpieczeństwo:</strong> {product.safety}
                </p>
              </section>
            </div>
          </div>

          {/* Right: Visual representation — constrained to sensible size */}
          <div className="flex-1 w-full max-w-lg mx-auto lg:sticky lg:top-16">
            <div className="w-full flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto max-h-[600px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.20)]" 
              />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <MediaSlot title={labels.effect} note={labels.effectNote} />
              <MediaSlot title={labels.guide} note={labels.guideNote} />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[220px_1fr]">
              <QrPlaceholder lang={lang} compact />
              <div className="rounded-[16px] border border-black/10 bg-white/75 p-4 text-black">
                <ShoperPlaceholderButton lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
