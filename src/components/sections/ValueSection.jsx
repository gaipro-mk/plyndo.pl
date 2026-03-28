// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { copy } from '../../content';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function ValueSection({ lang }) {
  const content = copy[lang].value;

  if (!content) return null;

  return (
    <section className="py-24 bg-surface" id="value">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 inline-block">
            {content.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface tracking-tight mb-6 text-balance">
            {content.title}
          </h2>
          <p className="text-lg text-on-surface-variant font-light leading-relaxed">
            {content.lead}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="bg-surface-container-low border border-outline-variant/20 p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-headline text-on-surface mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {item.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
