// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { copy } from '../../content';
import { ArrowRight, Bot, Zap, Clock } from 'lucide-react';

const icons = [Bot, Zap, Clock];

export default function OperationsSection({ lang }) {
  const content = copy[lang].operations;

  if (!content) return null;

  return (
    <section className="py-32 bg-surface overflow-hidden relative" id="operations">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-b from-primary/5 to-transparent blur-3xl opacity-50 z-0 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 inline-block">
              {content.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface tracking-tight mb-6 text-balance">
              {content.title}
            </h2>
            <p className="text-lg text-on-surface-variant font-light leading-relaxed mb-12 max-w-lg">
              {content.lead}
            </p>

            <div className="space-y-12">
              {content.steps.map((step, idx) => (
                <motion.div 
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="relative pl-12 border-l border-outline-variant/30 group"
                >
                  <span className="absolute -left-5 top-0 bg-surface text-primary border-2 border-primary w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    {step.step}
                  </span>
                  <h3 className="text-2xl font-bold font-headline mb-3 text-on-surface group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{step.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="bg-surface-container-low border border-outline-variant/20 rounded-4xl p-10 lg:p-12 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Zap className="w-64 h-64 text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold font-headline mb-8 text-on-surface relative z-10">Elastyczność Platformy</h3>
            <div className="space-y-8 relative z-10">
              {content.rails.map((rail, idx) => {
                const Icon = icons[idx % icons.length];
                return (
                  <div key={idx} className="flex gap-4 p-6 bg-surface rounded-2xl shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface mb-2">{rail.title}</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{rail.copy}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <button className="mt-10 w-full py-5 bg-primary text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:-translate-y-1 active:scale-95 duration-300">
              Przetestuj proces
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
