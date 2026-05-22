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
      <div className="font-display font-black text-4xl tracking-tight leading-none">
        {canAnimate ? display : value}
      </div>
      <div className="mt-1.5 text-xs text-fg-muted leading-relaxed">
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
    const t = setInterval(() => setIdx(i => (i + 1) % products.length), 2400);
    return () => clearInterval(t);
  }, [paused]);

  const current = products[idx];

  return (
    <section id="top" className="relative pt-[140px] pb-[100px] overflow-hidden border-b border-border">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14 items-center">
        <div>
          <span className="t-eyebrow bg-primary/10 px-3 py-1.5 rounded-full">
            {hero.eyebrow || hero.tag}
          </span>
          <h1 className="t-display-1 mt-6 whitespace-pre-line text-balance">
            {hero.title}
          </h1>
          <p className="t-lead mt-6 max-w-[520px]">
            {hero.lead}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/#plans"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-extrabold text-[15px] shadow-cta transition-all duration-700 hover:scale-105 active:scale-95 cursor-pointer"
              style={{ background: current.color.bg, color: current.color.text }}
            >
              {hero.primary} <ArrowRight className="w-[18px] h-[18px]" />
            </Link>
            <Link to="/#products" className="bg-surface text-primary border border-border-strong px-6 py-4 rounded-xl font-bold text-[15px] transition-colors hover:bg-surface-container-low cursor-pointer no-underline">
              {hero.secondary}
            </Link>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-6">
            {products.map((p, j) => (
              <button
                key={p.id}
                onClick={() => { setIdx(j); setPaused(true); }}
                aria-label={`${lang === 'en' ? 'Show' : 'Pokaż'} ${p.i18n?.[lang]?.displayName ?? p.name}`}
                className="w-7 h-1 p-0 border-none rounded-sm cursor-pointer transition-colors duration-300"
                style={{ background: j === idx ? 'var(--color-primary)' : 'var(--color-surface-variant)' }}
              />
            ))}
          </div>
        </div>

        <div 
          className="relative aspect-[4/5] flex items-center justify-center transition-all duration-700"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {products.map((p, j) => (
            <img 
              key={p.id} 
              src={p.image} 
              alt={`${p.name}`}
              className="absolute w-full h-[85%] object-cover object-center max-w-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-normal"
              style={{
                opacity: j === idx ? 1 : 0,
                transform: j === idx ? 'scale(1)' : 'scale(0.96)',
                filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.28))'
              }}
            />
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="max-w-7xl mx-auto px-6 mt-[72px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-7 border-t border-border">
          {hero.metrics.map(m => (
            <AnimatedMetric key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
