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

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % products.length), 3000);
    return () => clearInterval(t);
  }, [paused]);

  const current = products[idx];

  return (
    <section id="top" className="relative pt-[140px] pb-[80px] overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
        {/* Left — editorial text */}
        <div>
          <span className="t-eyebrow">
            {hero.eyebrow || hero.tag}
          </span>
          <h1 className="t-display-1 mt-6 whitespace-pre-line">
            {hero.title}
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

        {/* Right — product image on white */}
        <div 
          className="relative flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Subtle background circle accent */}
          <div 
            className="absolute inset-[10%] rounded-full opacity-[0.08] transition-all duration-700"
            style={{ background: current.color.bg }}
          />
          
          <div className="relative aspect-[4/5] w-full max-w-[480px]">
            {products.map((p, j) => (
              <img 
                key={p.id} 
                src={p.image} 
                alt={`${p.name}`}
                className="absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: j === idx ? 1 : 0,
                  transform: j === idx ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(8px)',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.12))'
                }}
              />
            ))}
          </div>

          {/* Product name overlay */}
          <div className="absolute bottom-0 left-0 right-0 text-center pb-2 transition-all duration-500">
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
