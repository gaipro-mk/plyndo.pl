import { useState, useEffect, useRef } from 'react';
import { copy } from '../../content';
import { products } from '../../data/products';
import { ArrowRight } from 'lucide-react';
import { animate, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

function AnimatedMetric({ value, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const canAnimate = /^(\d+)(.*)$/.test(value.toString());
  const [display, setDisplay] = useState("0");
  
  useEffect(() => {
    const numMatch = value.toString().match(/^(\d+)(.*)$/);
    if (!inView || !numMatch) return;

    const num = parseInt(numMatch[1], 10);
    const suffix = numMatch[2];
    const controls = animate(0, num, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v) + suffix),
    });

    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref}>
      <div className="font-serif text-4xl font-light tracking-tight leading-none" style={{ fontStyle: 'italic' }}>
        {canAnimate ? display : value}
      </div>
      <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-fg-subtle leading-relaxed">
        {label}
      </div>
    </div>
  );
}

export default function HeroSection({ lang = 'pl' }) {
  const hero = copy[lang].hero;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef([]);
  const prevIdx = useRef(idx);

  const current = products[idx];

  useEffect(() => {
    if (paused) {
      videoRefs.current.forEach(v => v?.pause());
      return;
    }
    
    const activeVideo = videoRefs.current[idx];
    if (activeVideo && current.videoSrc) {
      activeVideo.play().catch(() => {});
    } else {
      const t = setTimeout(() => {
        setIdx(i => (i + 1) % products.length);
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [idx, paused, current.videoSrc]);

  useEffect(() => {
    if (prevIdx.current !== idx) {
      const activeVideo = videoRefs.current[idx];
      if (activeVideo) activeVideo.currentTime = 0;
      prevIdx.current = idx;
    }
  }, [idx]);

  return (
    <section id="top" className="relative pt-[140px] pb-[80px] overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
        {/* Left — editorial text */}
        <div>
          <span className="t-eyebrow">
            {hero.eyebrow || hero.tag}
          </span>
          <h1 className="t-display-1 mt-6 whitespace-pre-line">
            {hero.title.split(/(w pakietach)/i).map((part, i) => {
              if (part.toLowerCase() === 'w pakietach') {
                return (
                  <span key={i} style={{ color: current.color.bg, fontStyle: 'italic', fontWeight: 'normal', transition: 'color 0.7s ease' }}>
                    {part}
                  </span>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </h1>
          <p className="t-lead mt-8 max-w-[480px]" style={{ lineHeight: 1.7 }}>
            {hero.lead}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Link
              to="/#plans"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-[14px] transition-all duration-300 hover:opacity-90 cursor-pointer no-underline"
              style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}
            >
              {hero.primary} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/#products" className="text-[14px] font-medium cursor-pointer no-underline transition-opacity hover:opacity-60 inline-flex items-center gap-1.5" style={{ color: 'var(--color-fg)' }}>
              {hero.secondary} <ArrowRight className="w-3.5 h-3.5 opacity-50" />
            </Link>
          </div>

          {/* Product indicator dots */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            {products.map((p, j) => (
              <button
                key={p.id}
                onClick={() => { setIdx(j); setPaused(true); }}
                aria-label={`${lang === 'en' ? 'Show' : 'Pokaż'} ${p.i18n?.[lang]?.displayName ?? p.name}`}
                className="w-2.5 h-2.5 p-0 border-none rounded-full cursor-pointer transition-all duration-400"
                style={{ 
                  background: j === idx ? p.color.bg : 'var(--color-border-strong)',
                  transform: j === idx ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Right — product video/image showcase */}
        <div 
          className="relative flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-[9/16] w-full max-w-[360px] rounded-[24px] overflow-hidden" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}>
            {products.map((p, j) => {
              const isActive = j === idx;
              return (
                <div
                  key={p.id}
                  className="absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(8px)',
                    zIndex: isActive ? 10 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                    background: '#000'
                  }}
                >
                  {p.videoSrc ? (
                    <video
                      ref={el => videoRefs.current[j] = el}
                      src={p.videoSrc}
                      muted
                      playsInline
                      onEnded={() => {
                        if (!paused && isActive) setIdx(i => (i + 1) % products.length);
                      }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={p.image} 
                      alt={`${p.name}`}
                      className="w-full h-full object-contain p-8"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Product name overlay */}
          <div className="absolute -bottom-8 left-0 right-0 text-center pb-2 transition-all duration-500">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: 'var(--color-fg-subtle)' }}>
              {current.i18n?.[lang]?.displayName ?? current.name}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics — TeaFlow style with thin border */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="hairline" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10">
          {hero.metrics.map(m => (
            <AnimatedMetric key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
