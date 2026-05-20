import { useState } from 'react';
import { copy } from '../../content';
import { Plus, Minus } from 'lucide-react';

export default function FaqSection({ lang = 'pl' }) {
  const content = copy[lang].faq;
  const [openIdx, setOpenIdx] = useState(0);

  if (!content) return null;

  return (
    <section id="faq" className="py-24 bg-surface-variant px-6">
      <div className="max-w-[880px] mx-auto">
        <div className="mb-10">
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-3">{content.title}</h2>
        </div>
        <div className="bg-white border border-border rounded-[24px] overflow-hidden">
          {content.items.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={item.question} className={`${i ? 'border-t border-border' : 'border-none'}`}>
                <button 
                  onClick={() => setOpenIdx(open ? -1 : i)} 
                  className="w-full bg-transparent border-none text-left py-6 px-7 cursor-pointer flex justify-between items-center gap-4 hover:bg-black/[0.02] transition-colors"
                >
                  <span className="font-bold text-base tracking-[-0.01em]">{item.question}</span>
                  {open ? <Minus size={18} className="shrink-0"/> : <Plus size={18} className="shrink-0"/>}
                </button>
                {open && (
                  <div className="px-7 pb-6 text-fg-muted text-[14px] leading-[1.6]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
