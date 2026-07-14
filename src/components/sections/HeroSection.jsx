import { useState, useEffect, useRef } from 'react';
import { copy } from '../../content';
import { products } from '../../data/products';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPackagesHref } from '../../lib/storeCta';

export default function HeroSection({ lang = 'pl' }) {
  const hero = copy[lang].hero;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);
  const packagesHref = getPackagesHref(lang);
  const packagesExternal = packagesHref.startsWith('http');

  // We only show products that have a video or a prominent image.
  // Actually, the previous implementation showed all `products`, but to avoid an empty showcase,
  // we'll just map over `products` from `products.js`.
  const current = products[idx];

  useEffect(() => {
    if (paused) {
      videoRef.current?.pause();
      return undefined;
    }

    const activeVideo = videoRef.current;
    if (activeVideo && current.videoSrc) {
      activeVideo.play().catch(() => {});
      return undefined;
    }

    const t = setTimeout(() => {
      setIdx((i) => (i + 1) % products.length);
    }, 5000);
    return () => clearTimeout(t);
  }, [idx, paused, current.videoSrc]);

  useEffect(() => {
    const activeVideo = videoRef.current;
    if (activeVideo) {
      activeVideo.currentTime = 0;
    }
  }, [idx]);

  function togglePlayback() {
    setPaused((value) => !value);
  }

  const ctaClassName =
    'inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-[15px] transition-all duration-300 hover:scale-105 cursor-pointer no-underline shadow-xl';

  return (
    <section id="top" className="relative flex flex-col overflow-hidden bg-bg pt-[120px] lg:pt-[150px]">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
        
        {/* Left — editorial text */}
        <div>
          <span className="t-eyebrow">
            {hero.eyebrow || hero.tag}
          </span>
          <h1 className="t-display-1 mt-6 whitespace-pre-line">
            {hero.title.split(/(w pakietach)/i).map((part, i) => {
              if (part.toLowerCase() === 'w pakietach') {
                return (
                  <span
                    key={i}
                    style={{ color: current.color.bg || current.color.fg, fontStyle: 'italic', fontWeight: 'normal', transition: 'color 0.7s ease' }}
                  >
                    {part}
                  </span>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </h1>
          <p className="t-lead mt-6 max-w-[640px] font-medium text-fg-muted leading-[1.7]">
            {hero.lead}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            {packagesExternal ? (
              <a
                href={packagesHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaClassName} bg-fg text-bg`}
              >
                {hero.primary} <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <Link
                to={packagesHref}
                className={`${ctaClassName} bg-fg text-bg`}
              >
                {hero.primary} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link to="/#jak-to-dziala" className="text-[14px] font-medium cursor-pointer no-underline transition-opacity hover:opacity-60 inline-flex items-center gap-1.5 px-6 py-4 rounded-full text-fg">
              {hero.secondary} <ArrowRight className="w-3.5 h-3.5 opacity-50" />
            </Link>
          </div>
          
          <div className="mt-5">
            <span className="px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] leading-relaxed text-fg-subtle">
              Zamówisz przez nasz sklep – wygodnie i bezpiecznie online.
            </span>
          </div>

          {/* Product indicator dots */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            {products.map((p, j) => (
              <button
                key={p.id}
                type="button"
                onClick={() => { setIdx(j); setPaused(true); }}
                aria-label={`${lang === 'en' ? 'Show' : 'Pokaż'} ${p.i18n?.[lang]?.displayName ?? p.name}`}
                className={`w-2.5 h-2.5 p-0 border-none rounded-full cursor-pointer transition-all duration-400 ${j === idx ? 'scale-130' : 'scale-100'}`}
                style={{ 
                  background: j === idx ? p.color.bg : 'var(--color-border-strong)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Right — product video/image showcase */}
        <div 
          className="relative flex items-center justify-center w-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="relative aspect-[9/16] w-full max-w-[360px] rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
          >
            {current.videoSrc ? (
              <video
                key={current.id}
                ref={videoRef}
                src={current.videoSrc}
                poster={current.image}
                preload="none"
                muted
                playsInline
                onEnded={() => {
                  if (!paused) setIdx((i) => (i + 1) % products.length);
                }}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={current.image}
                alt={current.i18n?.[lang]?.displayName ?? current.name}
                className="w-full h-full object-contain p-8 bg-white"
              />
            )}

            {current.videoSrc && (
              <button
                type="button"
                onClick={togglePlayback}
                aria-label={paused
                  ? (lang === 'en' ? 'Play video' : 'Odtwórz wideo')
                  : (lang === 'en' ? 'Pause video' : 'Wstrzymaj wideo')}
                className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border-none cursor-pointer transition-opacity hover:opacity-90 bg-black/55 text-white"
              >
                {paused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            )}
          </div>

          {/* Product name overlay */}
          <div className="absolute -bottom-8 left-0 right-0 text-center pb-2 transition-all duration-500">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
              {current.i18n?.[lang]?.displayName ?? current.name}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
