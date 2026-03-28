// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { copy } from '../../content';
import { Check, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function PlansSection({ lang }) {
  const content = copy[lang].plans;

  if (!content) return null;

  return (
    <section className="py-24 bg-surface-container-lowest" id="plans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto mb-16 text-center">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {content.cards.map((plan, idx) => {
            const isMiddle = plan.name === 'MIDI';
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={cn(
                  "relative rounded-3xl p-8 border transition-all duration-500 hover:-translate-y-2 group",
                  isMiddle 
                    ? "bg-primary border-primary text-on-primary shadow-2xl shadow-primary/20 scale-105 z-10" 
                    : "bg-surface border-outline-variant/30 text-on-surface hover:shadow-xl hover:border-primary/30"
                )}
              >
                {isMiddle && (
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <span className="bg-on-primary text-primary text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                      Najczęściej wybierany
                    </span>
                  </div>
                )}
                
                <h3 className="text-3xl font-black font-headline tracking-tighter mb-2">{plan.name}</h3>
                <p className={cn(
                  "text-sm font-bold uppercase tracking-widest mb-6",
                  isMiddle ? "text-on-primary/70" : "text-primary"
                )}>
                  {plan.audience}
                </p>
                <p className={cn(
                  "text-sm leading-relaxed mb-8 h-12",
                  isMiddle ? "text-on-primary/90" : "text-on-surface-variant"
                )}>
                  {plan.cadence}
                </p>
                
                <ul className="space-y-4 mb-8">
                  {plan.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={cn(
                        "w-5 h-5 shrink-0 mt-0.5",
                        isMiddle ? "text-on-primary" : "text-primary"
                      )} />
                      <span className={cn(
                        "text-sm leading-snug",
                        isMiddle ? "text-on-primary/90" : "text-on-surface-variant"
                      )}>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button className={cn(
                  "w-full py-4 rounded-xl font-bold transition-transform active:scale-95",
                  isMiddle 
                    ? "bg-on-primary text-primary hover:bg-white" 
                    : "bg-surface-container-low text-on-surface hover:bg-primary/10 hover:text-primary"
                )}>
                  Skomponuj {plan.name}
                </button>
              </motion.div>
            )
          })}
        </div>
        
        <div className="bg-surface-container-low rounded-3xl p-8 md:p-10 border border-outline-variant/20 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3">
            <h4 className="font-headline font-bold text-2xl text-on-surface mb-2">{content.modulesTitle}</h4>
            <p className="text-on-surface-variant text-sm flex items-center gap-2">
              <Info className="w-4 h-4" /> 8 niezawodnych formuł
            </p>
          </div>
          <div className="md:w-2/3 flex flex-wrap gap-3">
            {content.modules.map(mod => (
              <span key={mod} className="bg-surface border border-outline-variant/30 text-on-surface-variant px-4 py-2 rounded-lg text-sm font-medium hover:border-primary/30 transition-colors">
                {mod}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
