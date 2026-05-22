import { useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, CirclePlay, Info, Package, ShieldAlert } from 'lucide-react';
import { products } from '../data/products';
import Breadcrumbs from '../components/layout/Breadcrumbs';
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

function MediaSlot({ title, note, videoSrc }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoSrc && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoSrc && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleClick = () => {
    if (videoSrc && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  if (!videoSrc) {
    return (
      <div className="grid min-h-[230px] content-between rounded-[20px] border border-black/10 bg-white/80 p-6 text-black shadow-sm">
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

  return (
    <div 
      className="group relative flex flex-col justify-between min-h-[230px] overflow-hidden rounded-[20px] border border-black/10 bg-black text-white shadow-sm cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        loop
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 pointer-events-none transition-opacity duration-500 group-hover:opacity-60" />
      
      <div className="relative z-10 flex flex-col h-full justify-between p-6">
        <span className={`flex h-11 w-11 items-center justify-center rounded-[12px] bg-white/20 backdrop-blur-md text-white transition-all duration-300 ${isPlaying ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
          <CirclePlay size={21} />
        </span>
        <div className="mt-auto transform transition-transform duration-300">
          <div className="text-sm font-extrabold drop-shadow-md">{title}</div>
          <p className="mt-1.5 text-xs leading-relaxed text-white/90 drop-shadow-md">{note}</p>
        </div>
      </div>
    </div>
  );
function HeroVideo({ videoSrc, className = '' }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoSrc && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoSrc && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleClick = () => {
    if (videoSrc && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div 
      className={`group relative flex mx-auto aspect-[9/16] overflow-hidden rounded-[20px] border border-black/10 bg-black shadow-lg cursor-pointer flex-shrink-0 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        loop
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-30" />
      
      <div className="absolute inset-0 flex items-center justify-center p-6 z-10 pointer-events-none">
        <span className={`flex h-14 w-14 items-center justify-center rounded-[16px] bg-white/20 backdrop-blur-md text-white transition-all duration-300 ${isPlaying ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
          <CirclePlay size={28} />
        </span>
      </div>
    </div>
  );
}

export default function ProductPage({ lang = 'pl' }) {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const labels = lang === 'en'
    ? {
        back: 'Back to products',
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
        mediaTitle: 'Product materials',
        mediaLead: 'Label visual now, effectiveness and safe-use videos ready for later publishing.',
        ingredients: 'Ingredients',
        safetyLabel: 'Safety',
        sellTitle: 'Add this liquid to a package.',
        sellLead: 'Compare its reference price, then choose a ready set or build a box. Savings stay global for the whole package.',
        shoper: 'Shoper handoff',
        shoperNote: 'The store button and QR target stay as placeholders until prepared carts and SKUs are connected.',
        products: 'Products',
      }
    : {
        back: 'Wróć do produktów',
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
        mediaTitle: 'Materiały produktu',
        mediaLead: 'Etykieta jest już widoczna. Tu dojdą filmy skuteczności oraz bezpiecznego użycia.',
        ingredients: 'Składniki',
        safetyLabel: 'Bezpieczeństwo',
        sellTitle: 'Dodaj ten płyn do paczki.',
        sellLead: 'Sprawdź jego cenę referencyjną, a potem wybierz gotowy zestaw lub własny karton. Oszczędność zostaje globalna dla całej paczki.',
        shoper: 'Handoff do Shopera',
        shoperNote: 'Przycisk sklepu i cel QR zostają placeholderami do czasu podpięcia koszyków oraz SKU.',
        products: 'Produkty',
      };

  if (!product) {
    return <Navigate to="/" />;
  }

  // Determine if background is light to switch logo/text colors if needed
  const isLightBg = product.color.bg === '#EBEBEB' || product.color.bg === '#E0E0E0' || product.color.bg === '#E4C969' || product.color.bg === '#A7CFEA' || product.color.bg === '#9ECBE8';
  const logoSrc = isLightBg ? '/logo-black.svg' : '/logo-white.svg';
  const detail = product.i18n?.[lang] ?? product.i18n.pl;
  const productName = detail.name ?? detail.displayName ?? product.name;

  return (
    <div className="min-h-screen relative w-full flex flex-col font-sans" style={{ backgroundColor: product.color.bg, color: product.color.text }}>
      <main className="relative z-10 flex-grow pt-[112px]">
        <div className="mx-auto w-full max-w-7xl px-6">
          <header className="flex flex-col gap-5 pb-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Breadcrumbs
                lang={lang}
                tone="inverse"
                items={[
                  { label: labels.products, to: '/#products' },
                  { label: detail.displayName ?? product.name },
                ]}
              />
              <Link to="/#products" className="flex items-center gap-2 text-[11px] font-bold uppercase no-underline opacity-90 hover:opacity-70">
                <ChevronLeft size={16} />
                {labels.back}
              </Link>
            </div>
            <img src={logoSrc} alt="Płyndo" className="h-6 w-fit" />
          </header>

          <section className={`grid items-center gap-10 border-b border-current/15 pb-16 ${
            product.slug === 'naczynia'
              ? 'lg:grid-cols-[minmax(0,1fr)_auto]'
              : 'lg:grid-cols-[minmax(0,1fr)_minmax(340px,520px)]'
          } lg:gap-10 xl:gap-16`}>
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <div className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase" style={{ backgroundColor: product.color.text, color: product.color.bg }}>
                  {detail.scent}
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-current px-3 py-1 text-[11px] font-bold uppercase opacity-80">
                  <Package size={12} />
                  {labels.packageOnly}
                </div>
              </div>
              <h1 className="mb-4">
                <ProductNameDisplay name={productName} logoSrc={logoSrc} />
              </h1>
              <p className="font-serif text-xl italic opacity-90 md:text-2xl">{detail.subtitle}</p>
              <p className="mt-7 max-w-[640px] text-base font-medium leading-[1.7] opacity-95">{detail.description}</p>
            </div>
            
            {product.slug === 'naczynia' ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 xl:gap-10 mt-6 lg:mt-0">
                <HeroVideo 
                  videoSrc="/video/vid_exploaded_naczynia.mp4" 
                  className="h-[380px] md:h-[420px] lg:h-[400px] xl:h-[480px]" 
                />
                <div className="h-[380px] md:h-[420px] lg:h-[400px] xl:h-[480px] flex-shrink-0">
                  <img
                    src={product.image}
                    alt={productName}
                    className="h-full w-auto object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.24)]"
                  />
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full max-w-[520px] items-center justify-center">
                <img
                  src={product.image}
                  alt={productName}
                  className="h-auto max-h-[680px] w-full object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.24)]"
                />
              </div>
            )}
          </section>

          <section className="grid gap-6 py-14 lg:grid-cols-[0.72fr_1fr] lg:items-start">
            <div className="max-w-[430px]">
              <span className="text-[11px] font-extrabold uppercase opacity-70">{labels.mediaTitle}</span>
              <h2 className="mt-3 max-w-[360px] text-3xl font-black leading-tight">{labels.effect}</h2>
              <p className="mt-4 text-sm leading-relaxed opacity-85">{labels.mediaLead}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <MediaSlot title={labels.effect} note={labels.effectNote} />
              <MediaSlot title={labels.guide} note={labels.guideNote} />
            </div>
          </section>

          <section className="grid gap-5 pb-14 lg:grid-cols-2">
            <article className="rounded-[24px] border border-black/5 bg-black/5 p-6 backdrop-blur-sm md:p-8">
              <h2 className="mb-5 flex items-center gap-3 text-[12px] font-bold uppercase">
                <Info size={18} /> {labels.usage}
              </h2>
              <p className="whitespace-pre-line text-[15px] leading-[1.7] opacity-95">{detail.howToUse}</p>
            </article>
            <article className="rounded-[24px] border border-black/5 bg-black/5 p-6 backdrop-blur-sm md:p-8">
              <h2 className="mb-5 flex items-center gap-3 text-[12px] font-bold uppercase">
                <ShieldAlert size={18} /> {labels.safety}
              </h2>
              <p className="mb-4 text-[13px] leading-[1.7] opacity-95">
                <strong>{labels.ingredients}:</strong> {detail.ingredients}
              </p>
              <p className="text-[13px] leading-[1.7] opacity-95">
                <strong>{labels.safetyLabel}:</strong> {detail.safety}
              </p>
            </article>
          </section>
        </div>

        <section className="px-6 py-16" style={{ background: 'var(--color-bg)', color: 'var(--color-fg)' }}>
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <span className="t-eyebrow">{labels.scent}</span>
              <h2 className="t-h1 mt-3">{labels.sellTitle}</h2>
              <p className="t-lead mt-4 max-w-[720px]">{labels.sellLead}</p>

              <div className="mt-8 grid gap-5 rounded-[24px] border border-border bg-white p-6 md:grid-cols-[0.62fr_1fr] md:p-8">
                <div>
                  <div className="text-[11px] font-extrabold uppercase text-fg-muted">{labels.price}</div>
                  <div className="mt-2 font-display text-4xl font-black leading-none">{formatPrice(product.listPrice, lang)}</div>
                  <p className="mt-3 max-w-[290px] text-sm leading-relaxed text-fg-muted">{labels.priceNote}</p>
                </div>
                <div className="grid gap-2 self-center sm:grid-cols-2">
                  <Link to="/#plans" className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-black px-4 py-3 text-center text-sm font-extrabold text-white no-underline">
                    {labels.add}
                  </Link>
                  <Link to="/pakiety/wlasna-paczka/4" className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-black px-4 py-3 text-center text-sm font-extrabold text-black no-underline">
                    {labels.box4}
                  </Link>
                  <Link to="/pakiety/wlasna-paczka/8" className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-black px-4 py-3 text-center text-sm font-extrabold text-black no-underline sm:col-span-2">
                    {labels.box8}
                  </Link>
                </div>
              </div>
            </div>
            <aside className="grid content-start gap-4">
              <QrPlaceholder lang={lang} compact />
              <article className="rounded-[20px] border border-border bg-white p-5">
                <div className="t-eyebrow">{labels.shoper}</div>
                <p className="mb-4 mt-3 text-sm leading-relaxed text-fg-muted">{labels.shoperNote}</p>
                <ShoperPlaceholderButton lang={lang} />
              </article>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
