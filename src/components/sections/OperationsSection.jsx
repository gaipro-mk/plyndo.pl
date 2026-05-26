import { copy } from '../../content';
import { Package, Percent, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OperationsSection({ lang = 'pl' }) {
  const content = copy[lang].operations;
  if (!content) return null;

  const steps = content.steps || [];
  const icons = [Package, Percent, ShoppingCart];

  return (
    <section id="how" className="py-24 px-6" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[620px] mx-auto mb-16 text-center"
        >
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-4">{content.title}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.slice(0, 3).map((step, i) => {
            const Icon = icons[i] || Package;
            return (
              <motion.div
                key={step.step || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border rounded-[20px] px-7 py-8"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
                    <Icon size={18} />
                  </div>
                  <span className="font-serif italic text-[38px] font-light leading-none" style={{ color: 'var(--color-border-strong)' }}>
                    {step.step || (i + 1)}
                  </span>
                </div>
                <h3 className="t-h4 mt-6">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-fg-muted">{step.copy}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
