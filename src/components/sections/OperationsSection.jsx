import { copy } from '../../content';
import { Package, SlidersHorizontal, ShoppingCart } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

export default function OperationsSection({ lang = 'pl' }) {
  const content = copy[lang]?.operations ?? copy.pl.operations;
  if (!content) return null;

  const steps = content.steps || [];
  const icons = [Package, SlidersHorizontal, ShoppingCart];

  return (
    <section id="jak-to-dziala" className="py-28 px-6 bg-bg">
      <div className="max-w-7xl mx-auto">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[720px] mx-auto mb-16 text-center"
        >
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <span>{lang === 'en' ? 'How to buy' : 'Jak kupujesz'}</span>
            <img src="/logo-black.svg" alt="PŁYN DO" className="h-[30px] w-auto sm:h-[36px]" />
            <span>{lang === 'en' ? 'in packages' : 'w pakietach'}</span>
          </h2>
        </Motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.slice(0, 3).map((step, i) => {
            const Icon = icons[i] || Package;
            return (
              <Motion.div
                key={step.step || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-white border rounded-[20px] px-7 py-8 transition-all duration-500 hover:-translate-y-1 border-border shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105 bg-fg text-bg">
                    <Icon size={18} />
                  </div>
                  <span className="font-serif italic text-[38px] font-light leading-none text-fg-subtle">
                    {step.step || (i + 1)}
                  </span>
                </div>
                <h3 className="t-h4 mt-6">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-fg-muted">{step.copy}</p>
              </Motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
