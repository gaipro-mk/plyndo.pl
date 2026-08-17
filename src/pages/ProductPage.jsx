import { useRef, useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, CirclePlay, Info, Package, ShieldAlert, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { getProductByRouteSlug } from '../data/products';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import QrPlaceholder from '../components/bundles/QrPlaceholder';
import { calculateDiscountedUnitPrice, packageDiscountTiers } from '../lib/bundlePricing';

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
      <div className="grid min-h-[200px] content-between rounded-[16px] border p-6 border-border bg-bg">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fg text-bg">
          <CirclePlay size={18} />
        </span>
        <div>
          <div className="text-[13px] font-medium">{title}</div>
          <p className="mt-1.5 text-[12px] leading-relaxed text-fg-muted">{note}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative flex flex-col justify-between min-h-[200px] overflow-hidden rounded-[16px] border bg-black cursor-pointer border-border"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        preload="none"
        muted
        playsInline
        loop
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 pointer-events-none transition-opacity duration-500 group-hover:opacity-60" />
      <div className="relative z-10 flex flex-col h-full justify-between p-6">
        <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition-all duration-300 ${isPlaying ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
          <CirclePlay size={18} />
        </span>
        <div className="mt-auto">
          <div className="text-[13px] font-medium text-white drop-shadow-md">{title}</div>
          <p className="mt-1.5 text-[12px] leading-relaxed text-white/80 drop-shadow-md">{note}</p>
        </div>
      </div>
    </div>
  );
}

function HeroVideo({ videoSrc, className = '' }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoSrc && videoRef.current) { videoRef.current.play().catch(() => {}); setIsPlaying(true); }
  };
  const handleMouseLeave = () => {
    if (videoSrc && videoRef.current) { videoRef.current.pause(); setIsPlaying(false); }
  };
  const handleClick = () => {
    if (videoSrc && videoRef.current) {
      if (videoRef.current.paused) { videoRef.current.play().catch(() => {}); setIsPlaying(true); }
      else { videoRef.current.pause(); setIsPlaying(false); }
    }
  };

  return (
    <div 
      className={`group relative flex mx-auto aspect-[9/16] overflow-hidden rounded-[16px] border bg-black cursor-pointer flex-shrink-0 border-border ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <video ref={videoRef} src={videoSrc} preload="none" muted playsInline loop
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-30" />
      <div className="absolute inset-0 flex items-center justify-center p-6 z-10 pointer-events-none">
        <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition-all duration-300 ${isPlaying ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
          <CirclePlay size={24} />
        </span>
      </div>
    </div>
  );
}

function VideoPanel({ videoSrc, lang, className = '' }) {
  if (videoSrc) {
    return <HeroVideo videoSrc={videoSrc} className={className} />;
  }
  return (
    <div
      className={`relative flex aspect-[9/16] flex-shrink-0 overflow-hidden rounded-[16px] border border-border ${className}`}
    >
      <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, #232323 0%, #3a3a3a 100%)' }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
          <CirclePlay size={26} />
        </span>
        <div className="text-[12px] font-medium text-white/85">
          {lang === 'en' ? 'Product video coming soon' : 'Film produktowy wkrótce'}
        </div>
        <div className="text-[11px] leading-relaxed text-white/55">
          {lang === 'en' ? 'Placeholder slot for the hero clip' : 'Miejsce na film produktowy'}
        </div>
      </div>
    </div>
  );
}

function BackLabelFrame({ front, backPanel, alt, className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-white ${className}`}>
      <img src={front} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={backPanel}
        alt={alt}
        className="absolute left-1/2 top-1/2 h-auto max-h-[99%] w-[74%] -translate-x-1/2 -translate-y-1/2 object-contain shadow-sm"
      />
    </div>
  );
}

function LabelSlideshow({ front, backPanel, alt, lang = 'pl', className = '' }) {
  const slides = [
    { src: front, label: lang === 'en' ? 'Front label' : 'Etykieta — przód', icon: 'layers', fit: 'cover' },
    { src: backPanel, label: lang === 'en' ? 'Usage & ingredients' : 'Opis, użycie i skład', icon: 'file', fit: 'contain', isBack: true },
  ].filter((s) => s.src && (!s.isBack || front));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 3800);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden rounded-[16px] border bg-white aspect-[4/5] border-border ${className}`}
    >
      {slides.map((s, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-[900ms] ease-out" style={{ opacity: i === index ? 1 : 0 }}>
          {s.isBack ? (
            <BackLabelFrame front={front} backPanel={s.src} alt={alt} className="h-full w-full" />
          ) : (
            <img
              src={s.src}
              alt={alt}
              className="h-full w-full"
              style={{ objectFit: s.fit }}
            />
          )}
        </div>
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-3 right-5 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${lang === 'en' ? 'Slide' : 'Slajd'} ${i + 1}`}
              className="h-1.5 cursor-pointer rounded-full border-none p-0 transition-all duration-300"
              style={{ width: i === index ? 18 : 6, background: i === index ? 'var(--color-fg)' : 'var(--color-border-strong)' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ReferencePriceOptions({ listPrice, lang }) {
  return (
    <div className="grid gap-2">
      {packageDiscountTiers.map((tier) => {
        const price = calculateDiscountedUnitPrice(listPrice, tier.rate);

        return (
          <div key={tier.size} className="flex items-center justify-between gap-3 rounded-[12px] px-3 py-2 bg-bg-muted">
            <span className="text-[12px] font-medium text-fg-muted">
              {lang === 'en' ? `${tier.size}-pack` : `Paczka ${tier.size} szt.`}
            </span>
            <span className="text-right">
              <span className="mr-2 text-[12px] text-fg-subtle line-through">{formatPrice(listPrice, lang)}</span>
              <span className="font-serif italic text-lg font-light">{formatPrice(price, lang)}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function GhsPictogram({ type }) {
  const srcMap = {
    GHS02: '/images/clp/ghs02.png',
    GHS05: '/images/clp/ghs05.png',
    GHS07: '/images/clp/ghs07.png',
    GHS09: '/images/clp/ghs09.png',
  };

  const src = srcMap[type];
  if (!src) return null;

  return (
    <img
      src={src}
      alt={type}
      className="w-14 h-14 object-contain"
      aria-hidden="true"
    />
  );
}

export default function ProductPage({ lang = 'pl', activeTheme }) {
  const { slug } = useParams();
  const product = getProductByRouteSlug(slug);
  const [safetyExpanded, setSafetyExpanded] = useState(false);
  const labels = lang === 'en'
    ? {
        back: 'Back to products',
        scent: 'Reference product',
        usage: 'How to use',
        safety: 'Ingredients and safety',
        packageOnly: 'Package-only offer',
        price: 'Reference price',
        priceNote: 'The reference price changes with the selected box size.',
        add: 'Choose a package',
        box4: 'Build 4',
        box8: 'Build 8',
        box12: 'Build 12',
        effect: 'Effectiveness video',
        effectNote: 'Slot for the before and after cleaning material.',
        guide: 'Instruction video',
        guideNote: 'Slot for safe use and dosing guidance.',
        mediaTitle: 'Product materials',
        mediaLead: 'Label visual now, effectiveness and safe-use videos ready for later publishing.',
        ingredients: 'Ingredients',
        safetyLabel: 'Safety',
        warningWordLabel: 'Signal word',
        expandSafety: 'Expand safety warnings',
        collapseSafety: 'Collapse safety warnings',
        sellTitle: 'Add this liquid to a package.',
        sellLead: 'Compare its reference price, then choose a ready set or build a box. Savings stay global for the whole package.',
        store: 'Store',
        storeNote: 'Open the shop when you want to complete the order.',
        products: 'Products',
      }
    : {
        back: 'Wróć do produktów',
        scent: 'Produkt referencyjny',
        usage: 'Sposób użycia',
        safety: 'Skład i bezpieczeństwo',
        packageOnly: 'Oferta tylko w paczkach',
        price: 'Cena referencyjna',
        priceNote: 'Cena za sztukę zależy od wielkości wybranej paczki.',
        add: 'Wybierz pakiet',
        box4: 'Skomponuj 4',
        box8: 'Skomponuj 8',
        box12: 'Skomponuj 12',
        effect: 'Film skuteczności',
        effectNote: 'Miejsce na materiał przed i po czyszczeniu.',
        guide: 'Film instruktażowy',
        guideNote: 'Miejsce na bezpieczne użycie i dozowanie.',
        mediaTitle: 'Materiały produktu',
        mediaLead: 'Etykieta jest już widoczna. Tu dojdą filmy skuteczności oraz bezpiecznego użycia.',
        ingredients: 'Składniki',
        safetyLabel: 'Bezpieczeństwo',
        warningWordLabel: 'Hasło ostrzegawcze',
        expandSafety: 'Rozwiń zwroty bezpieczeństwa',
        collapseSafety: 'Zwiń zwroty bezpieczeństwa',
        sellTitle: 'Dodaj ten płyn do paczki.',
        sellLead: 'Sprawdź jego cenę referencyjną, a potem wybierz gotowy zestaw lub własny karton. Oszczędność zostaje globalna dla całej paczki.',
        store: 'Sklep',
        storeNote: 'Przejdź do sklepu, kiedy chcesz dokończyć zamówienie.',
        products: 'Produkty',
      };

  if (!product) {
    return <Navigate to="/" />;
  }

  const detail = product.i18n?.[lang] ?? product.i18n.pl;
  const productName = detail.name ?? detail.displayName ?? product.name;
  const displayName = detail.displayName ?? productName;

  return (
    <div className="min-h-screen relative w-full flex flex-col font-sans bg-bg text-fg">
      {/* Thin product-color accent strip at the very top */}
      <div className="h-[3px] w-full" style={{ background: product.color.bg }} />
      
      <main id="main" className="relative z-10 flex-grow pt-[100px]">
        <div className="mx-auto w-full max-w-7xl px-6">
          {/* Header with breadcrumbs */}
          <Motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 pb-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Breadcrumbs
                lang={lang}
                items={[
                  { label: labels.products, to: '/#products' },
                  { label: detail.displayName ?? product.name },
                ]}
              />
              <Link to="/#products" className="flex items-center gap-1.5 text-[12px] font-medium uppercase no-underline transition-opacity hover:opacity-60 tracking-wide text-fg-muted">
                <ChevronLeft size={14} />
                {labels.back}
              </Link>
            </div>
          </Motion.header>

          {/* Hero section — white-based with product image */}
          <section className="grid items-center gap-12 border-b pb-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 xl:gap-16 border-border">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mb-5 flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium" style={{ borderColor: product.color.fg ?? product.color.deep ?? product.color.bg, color: product.color.fg ?? product.color.deep ?? product.color.bg, background: `color-mix(in oklab, ${product.color.bg} 12%, var(--color-bg))` }}>
                  <span className="color-dot" style={{ background: product.color.bg }} />
                  {detail.scent}
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium border-border-strong text-fg-muted">
                  <Package size={11} />
                  {labels.packageOnly}
                </div>
              </div>

              <div className="flex flex-col gap-2 items-start">
                <img 
                  src={activeTheme === 'dark' ? '/logo-white.svg' : '/logo-black.svg'} 
                  alt="PŁYN DO" 
                  className="h-[20px] sm:h-[22px] md:h-[24px] w-auto select-none opacity-90" 
                />
                <h1 
                  className="text-[clamp(40px,6vw,68px)] leading-[0.95] tracking-[-0.02em] mt-3 font-serif italic font-medium"
                >
                  {displayName}
                </h1>
              </div>

              <p className="font-serif italic text-lg mt-4 text-fg-muted">{detail.subtitle}</p>
              <p className="mt-6 max-w-[560px] text-[15px] leading-[1.7] text-fg-muted">{detail.description}</p>
            </Motion.div>
            
            <Motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col items-center justify-center gap-6 sm:flex-row xl:gap-8 mt-6 lg:mt-0"
            >
              <VideoPanel
                videoSrc={product.videoSrc}
                lang={lang}
                className="h-[360px] md:h-[420px] lg:h-[400px] xl:h-[470px]"
              />
              <LabelSlideshow
                front={product.labelFront ?? product.image}
                backPanel={product.labelBackPanel}
                alt={productName}
                lang={lang}
                className="h-[360px] md:h-[420px] lg:h-[400px] xl:h-[470px]"
              />
            </Motion.div>
          </section>

          {/* Media section */}
          <Motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-8 py-14 lg:grid-cols-[0.72fr_1fr] lg:items-start border-b border-border"
          >
            <div className="max-w-[400px]">
              <span className="t-eyebrow">{labels.mediaTitle}</span>
              <h2 className="t-h2 mt-3">{labels.effect}</h2>
              <p className="mt-4 text-[13px] leading-relaxed text-fg-muted">{labels.mediaLead}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <MediaSlot title={labels.effect} note={labels.effectNote} videoSrc={product.videoSrc} />
              <MediaSlot title={labels.guide} note={labels.guideNote} />
            </div>
          </Motion.section>

          {/* Packaging Details section */}
          <Motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-14 border-b border-border"
          >
            <div className="mb-10">
              <span className="t-eyebrow">Opakowanie</span>
              <h2 className="t-h2 mt-3">Szczegóły butelki i etykiety</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-[16px] border overflow-hidden relative bg-white aspect-[3/4] flex items-center justify-center border-border">
                {product.bottleFront ? (
                  <img src={product.bottleFront} alt="Przód" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="text-sm text-fg-subtle">Brak zdjęcia</div>
                )}
              </div>
              <div className="rounded-[16px] border overflow-hidden relative bg-white aspect-[3/4] flex items-center justify-center border-border">
                {product.bottleBack ? (
                  <img src={product.bottleBack} alt="Tył" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="text-sm text-fg-subtle">Brak zdjęcia</div>
                )}
              </div>
              <div className="rounded-[16px] border overflow-hidden relative bg-white aspect-[3/4] flex items-center justify-center border-border">
                <BackLabelFrame
                  front={product.labelFront ?? product.image}
                  backPanel={product.labelBackPanel}
                  alt={lang === 'en' ? 'Information label' : 'Etykieta z opisem'}
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </Motion.section>

          {/* Usage & Safety */}
          <Motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 pb-14 lg:grid-cols-2"
          >
            <article className="rounded-[16px] border p-6 md:p-8 border-border bg-bg-muted">
              <h2 className="mb-5 flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-wide text-fg-muted">
                <Info size={15} /> {labels.usage}
              </h2>
              <p className="whitespace-pre-line text-[14px] leading-[1.7] text-fg-muted">{detail.howToUse}</p>
            </article>
            <article className="rounded-[16px] border p-6 md:p-8 border-border bg-bg-muted">
              <h2 className="mb-5 flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-wide text-fg-muted">
                <ShieldAlert size={15} /> {labels.safety}
              </h2>
              {(detail.warningWord || (product.pictograms && product.pictograms.length > 0)) && (
                <div className="mb-6 flex flex-wrap items-center gap-5 border-b pb-5 border-border">
                  {product.pictograms && product.pictograms.map(pic => (
                    <div key={pic} className="flex items-center">
                      <GhsPictogram type={pic} />
                    </div>
                  ))}
                  {detail.warningWord && (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-medium uppercase tracking-widest text-fg-subtle">{labels.warningWordLabel}</span>
                      <span className="text-[15px] font-bold uppercase tracking-wide" style={{ color: detail.warningWord === 'Niebezpieczeństwo' || detail.warningWord === 'DANGER' ? '#ef4444' : '#f59e0b' }}>
                        {detail.warningWord}
                      </span>
                    </div>
                  )}
                </div>
              )}
              <p className="mb-4 text-[13px] leading-[1.7] text-fg-muted">
                <strong className="font-medium text-fg">{labels.ingredients}:</strong> {detail.ingredients}
              </p>
              {detail.safety && (
                <div>
                  {detail.safety.length > 80 ? (
                    <div className="mt-4 border-t pt-4 border-border">
                      <button
                        onClick={() => setSafetyExpanded(!safetyExpanded)}
                        className="flex w-full items-center justify-between py-2 text-left text-[13px] font-medium transition-colors hover:text-[var(--color-fg-strong)] cursor-pointer text-fg"
                      >
                        <span className="flex items-center gap-2">
                          <strong className="font-medium">{labels.safetyLabel}</strong>
                        </span>
                        {safetyExpanded ? <ChevronUp size={16} className="text-fg-subtle" /> : <ChevronDown size={16} className="text-fg-subtle" />}
                      </button>
                      <Motion.div
                        initial={false}
                        animate={{ height: safetyExpanded ? 'auto' : 0, opacity: safetyExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 text-[13px] leading-[1.7] text-fg-muted whitespace-pre-line">
                          {detail.safety}
                        </p>
                      </Motion.div>
                    </div>
                  ) : (
                    <p className="text-[13px] leading-[1.7] text-fg-muted">
                      <strong className="font-medium text-fg">{labels.safetyLabel}:</strong> {detail.safety}
                    </p>
                  )}
                </div>
              )}
            </article>
          </Motion.section>
        </div>

        {/* Sell / CTA section — still on white */}
        <section className="px-6 py-16 border-t border-border bg-bg">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="t-eyebrow">{labels.scent}</span>
              <h2 className="t-h1 mt-4">{labels.sellTitle}</h2>
              <p className="t-lead mt-4 max-w-[620px]">{labels.sellLead}</p>

              <div className="mt-8 grid gap-5 rounded-[16px] border p-6 md:grid-cols-[0.62fr_1fr] md:p-8 border-border">
                <div>
                  <div className="t-eyebrow">{labels.price}</div>
                  <div className="mt-2 font-serif italic text-4xl font-light line-through text-fg-subtle">{formatPrice(product.listPrice, lang)}</div>
                  <p className="mt-3 max-w-[290px] text-[13px] leading-relaxed text-fg-muted">{labels.priceNote}</p>
                </div>
                <div className="grid gap-4 self-center">
                  <ReferencePriceOptions listPrice={product.listPrice} lang={lang} />
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Link to="/#pakiety" className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-center text-[13px] font-medium no-underline bg-fg text-bg">
                      {labels.add} <ArrowRight size={13} />
                    </Link>
                    <Link to="/pakiety/wlasna-paczka/4" className="inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-center text-[13px] font-medium no-underline border-border-strong text-fg">
                      {labels.box4}
                    </Link>
                    <Link to="/pakiety/wlasna-paczka/8" className="inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-center text-[13px] font-medium no-underline border-border-strong text-fg">
                      {labels.box8}
                    </Link>
                    <Link to="/pakiety/wlasna-paczka/12" className="inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-center text-[13px] font-medium no-underline border-border-strong text-fg">
                      {labels.box12}
                    </Link>
                  </div>
                </div>
              </div>
            </Motion.div>
            <aside className="grid content-start gap-4">
              <QrPlaceholder src={product.qrImage} targetUrl={product.qrTargetUrl} lang={lang} />
              <article className="rounded-[16px] border p-5 border-border">
                <div className="t-eyebrow">{labels.store}</div>
                <p className="mb-4 mt-3 text-[13px] leading-relaxed text-fg-muted">
                  {lang === 'en'
                    ? 'Minimum order is 4 items. Select a package above to configure your box.'
                    : 'Minimalny zakup to paczka 4 szt. Wybierz pakiet powyżej, aby skompletować zamówienie.'}
                </p>
                <Link
                  to="/#pakiety"
                  className="inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-300 hover:opacity-90 no-underline"
                  style={{ borderColor: 'var(--color-border-strong)', background: 'var(--color-fg)', color: 'var(--color-bg)' }}
                >
                  {lang === 'en' ? 'Choose package' : 'Wybierz pakiet (min. 4 szt.)'}
                </Link>
              </article>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
