import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { copy } from '../../content';

export default function AboutSection({ lang = 'pl' }) {
  const content = copy[lang]?.about ?? copy.pl.about;

  return (
    <section id="o-marce" className="py-24 px-6 border-t" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-4">{content.title}</h2>
          <p className="t-lead mt-6 text-[16px] leading-relaxed text-fg-muted">
            {content.lead}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            {content.copy}
          </p>
          
          <div className="mt-10">
            <Link 
              to="/dla-firm" 
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium transition-all duration-300 hover:scale-[1.01] no-underline"
              style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}
            >
              {content.cta}
              <ArrowRight size={16} />
            </Link>
          </div>
        </Motion.div>
        
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-[24px] border overflow-hidden relative aspect-square lg:aspect-[4/3] flex flex-col justify-end p-8"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--plyndo-cobalt-deep)' }} />
            <span className="text-[12px] font-medium tracking-wider uppercase text-fg-muted">{content.productionLabel}</span>
          </div>
          <div className="font-serif italic text-3xl text-fg-base">{content.productionTitle}</div>
          <p className="mt-3 max-w-[320px] text-[13px] leading-relaxed text-fg-muted">
            {content.productionDesc}
          </p>
        </Motion.div>
      </div>
    </section>
  );
}
