import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { copy } from '../../content';
import { Plus, Minus } from 'lucide-react';

export default function FaqSection({ lang }) {
  const content = copy[lang].faq;
  const [openIdx, setOpenIdx] = useState(0);

  if (!content) return null;

  return (
    <section className="py-24 bg-surface" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 inline-block">
            {content.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface tracking-tight mb-6">
            {content.title}
          </h2>
        </div>

        <div className="space-y-4">
          {content.items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-primary/30 bg-primary/5' : 'border-outline-variant/20 bg-surface-container-lowest hover:border-outline-variant/40'}`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full text-left px-8 py-6 flex items-center justify-between gap-4"
                >
                  <span className="font-headline font-bold text-lg text-on-surface pr-8">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-primary text-on-primary' : 'bg-surface border border-outline-variant/30 text-on-surface-variant'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-8 pb-6 text-on-surface-variant leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
