import { useState } from 'react';
import { copy } from '../../content';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqSection({ lang = 'pl' }) {
  const content = copy[lang].faq;
  const [openIdx, setOpenIdx] = useState(0);

  if (!content) return null;

  return (
    <section id="faq" className="py-24 px-6" style={{ background: 'var(--color-bg-muted)' }}>
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-4">{content.title}</h2>
        </motion.div>
        <div className="rounded-[20px] border bg-white overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
          {content.items.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={item.question} className={i ? 'border-t' : ''} style={{ borderColor: 'var(--color-border)' }}>
                <button 
                  onClick={() => setOpenIdx(open ? -1 : i)} 
                  className="w-full bg-transparent border-none text-left py-5 px-6 cursor-pointer flex justify-between items-center gap-4 transition-colors duration-300 hover:bg-black/[0.02]"
                  style={{ color: 'var(--color-fg)' }}
                >
                  <span className="font-medium text-[15px] tracking-[-0.01em]">{item.question}</span>
                  <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: open ? 'var(--color-fg)' : 'var(--color-bg-muted)', color: open ? 'var(--color-bg)' : 'var(--color-fg-subtle)' }}>
                    {open ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-fg-muted text-[14px] leading-[1.7]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
