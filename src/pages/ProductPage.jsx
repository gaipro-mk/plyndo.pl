import { useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, CirclePlay, Info, Package, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import QrPlaceholder from '../components/bundles/QrPlaceholder';
import ShoperPlaceholderButton from '../components/bundles/ShoperPlaceholderButton';

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
      <div className="grid min-h-[200px] content-between rounded-[16px] border p-6" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
        <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
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
      className="group relative flex flex-col justify-between min-h-[200px] overflow-hidden rounded-[16px] border bg-black cursor-pointer"
      style={{ borderColor: 'var(--color-border)' }}
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
      className={`group relative flex mx-auto aspect-[9/16] overflow-hidden rounded-[16px] border bg-black cursor-pointer flex-shrink-0 ${className}`}
      style={{ borderColor: 'var(--color-border)' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <video ref={videoRef} src={videoSrc} muted playsInline loop
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

  const detail = product.i18n?.[lang] ?? product.i18n.pl;
  const productName = detail.name ?? detail.displayName ?? product.name;
  const displayName = productName.replace(/^PŁYN DO\s*/i, '');

  return (
    <div className="min-h-screen relative w-full flex flex-col font-sans" style={{ background: 'var(--color-bg)', color: 'var(--color-fg)' }}>
      {/* Thin product-color accent strip at the very top */}
      <div className="h-[3px] w-full" style={{ background: product.color.bg }} />
      
      <main className="relative z-10 flex-grow pt-[100px]">
        <div className="mx-auto w-full max-w-7xl px-6">
          {/* Header with breadcrumbs */}
          <motion.header
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
              <Link to="/#products" className="flex items-center gap-1.5 text-[12px] font-medium uppercase no-underline transition-opacity hover:opacity-60 tracking-wide" style={{ color: 'var(--color-fg-muted)' }}>
                <ChevronLeft size={14} />
                {labels.back}
              </Link>
            </div>
          </motion.header>

          {/* Hero section — white-based with product image */}
          <section className={`grid items-center gap-12 border-b pb-16 ${
            product.slug === 'naczynia'
              ? 'lg:grid-cols-[minmax(0,1fr)_auto]'
              : 'lg:grid-cols-[minmax(0,1fr)_minmax(340px,520px)]'
          } lg:gap-12 xl:gap-20`} style={{ borderColor: 'var(--color-border)' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mb-5 flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium" style={{ borderColor: product.color.bg, color: product.color.bg }}>
                  <span className="color-dot" style={{ background: product.color.bg }} />
                  {detail.scent}
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium" style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-fg-muted)' }}>
                  <Package size={11} />
                  {labels.packageOnly}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="t-eyebrow">Płyn do</span>
                <h1 className="font-serif italic font-light text-[clamp(40px,6vw,72px)] leading-[0.95] tracking-[-0.02em]">
                  {displayName}
                </h1>
              </div>

              <p className="font-serif italic text-lg mt-4" style={{ color: 'var(--color-fg-muted)' }}>{detail.subtitle}</p>
              <p className="mt-6 max-w-[560px] text-[15px] leading-[1.7]" style={{ color: 'var(--color-fg-muted)' }}>{detail.description}</p>
            </motion.div>
            
            {product.slug === 'naczynia' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 xl:gap-10 mt-6 lg:mt-0"
              >
                <HeroVideo 
                  videoSrc="/video/vid_exploaded_naczynia.mp4" 
                  className="h-[360px] md:h-[400px] lg:h-[380px] xl:h-[460px]" 
                />
                <div className="h-[360px] md:h-[400px] lg:h-[380px] xl:h-[460px] flex-shrink-0">
                  <img
                    src={product.image}
                    alt={productName}
                    className="h-full w-auto object-contain"
                    style={{ filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.1))' }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mx-auto flex w-full max-w-[480px] items-center justify-center"
              >
                <img
                  src={product.image}
                  alt={productName}
                  className="h-auto max-h-[600px] w-full object-contain"
                  style={{ filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.1))' }}
                />
              </motion.div>
            )}
          </section>

          {/* Media section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-8 py-14 lg:grid-cols-[0.72fr_1fr] lg:items-start"
          >
            <div className="max-w-[400px]">
              <span className="t-eyebrow">{labels.mediaTitle}</span>
              <h2 className="t-h2 mt-3">{labels.effect}</h2>
              <p className="mt-4 text-[13px] leading-relaxed text-fg-muted">{labels.mediaLead}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <MediaSlot title={labels.effect} note={labels.effectNote} />
              <MediaSlot title={labels.guide} note={labels.guideNote} />
            </div>
          </motion.section>

          {/* Usage & Safety */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 pb-14 lg:grid-cols-2"
          >
            <article className="rounded-[16px] border p-6 md:p-8" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}>
              <h2 className="mb-5 flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-wide" style={{ color: 'var(--color-fg-muted)' }}>
                <Info size={15} /> {labels.usage}
              </h2>
              <p className="whitespace-pre-line text-[14px] leading-[1.7] text-fg-muted">{detail.howToUse}</p>
            </article>
            <article className="rounded-[16px] border p-6 md:p-8" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}>
              <h2 className="mb-5 flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-wide" style={{ color: 'var(--color-fg-muted)' }}>
                <ShieldAlert size={15} /> {labels.safety}
              </h2>
              <p className="mb-4 text-[13px] leading-[1.7] text-fg-muted">
                <strong className="font-medium" style={{ color: 'var(--color-fg)' }}>{labels.ingredients}:</strong> {detail.ingredients}
              </p>
              <p className="text-[13px] leading-[1.7] text-fg-muted">
                <strong className="font-medium" style={{ color: 'var(--color-fg)' }}>{labels.safetyLabel}:</strong> {detail.safety}
              </p>
            </article>
          </motion.section>
        </div>

        {/* Sell / CTA section — still on white */}
        <section className="px-6 py-16 border-t" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="t-eyebrow">{labels.scent}</span>
              <h2 className="t-h1 mt-4">{labels.sellTitle}</h2>
              <p className="t-lead mt-4 max-w-[620px]">{labels.sellLead}</p>

              <div className="mt-8 grid gap-5 rounded-[16px] border p-6 md:grid-cols-[0.62fr_1fr] md:p-8" style={{ borderColor: 'var(--color-border)' }}>
                <div>
                  <div className="t-eyebrow">{labels.price}</div>
                  <div className="mt-2 font-serif italic text-4xl font-light">{formatPrice(product.listPrice, lang)}</div>
                  <p className="mt-3 max-w-[290px] text-[13px] leading-relaxed text-fg-muted">{labels.priceNote}</p>
                </div>
                <div className="grid gap-2 self-center sm:grid-cols-2">
                  <Link to="/#plans" className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-center text-[13px] font-medium no-underline" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
                    {labels.add} <ArrowRight size={13} />
                  </Link>
                  <Link to="/pakiety/wlasna-paczka/4" className="inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-center text-[13px] font-medium no-underline" style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-fg)' }}>
                    {labels.box4}
                  </Link>
                  <Link to="/pakiety/wlasna-paczka/8" className="inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-center text-[13px] font-medium no-underline sm:col-span-2" style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-fg)' }}>
                    {labels.box8}
                  </Link>
                </div>
              </div>
            </motion.div>
            <aside className="grid content-start gap-4">
              <QrPlaceholder lang={lang} compact />
              <article className="rounded-[16px] border p-5" style={{ borderColor: 'var(--color-border)' }}>
                <div className="t-eyebrow">{labels.shoper}</div>
                <p className="mb-4 mt-3 text-[13px] leading-relaxed text-fg-muted">{labels.shoperNote}</p>
                <ShoperPlaceholderButton lang={lang} />
              </article>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
