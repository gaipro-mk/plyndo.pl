import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { copy } from '../../content';
import { cn } from '../../lib/utils';
import { Building2, Home, Building, Dog, Baby, Syringe, Sparkles } from 'lucide-react';

const iconsData = {
  'apartment': Building2,
  'home': Home,
  'domain': Building,
  'pets': Dog,
  'child_care': Baby,
  'allergy': Syringe
};

export default function AiAssistantSection({ lang }) {
  const content = copy[lang].aiAssistant;
  const [sizeSelection, setSizeSelection] = useState('MINI');
  const [traitsSelection, setTraitsSelection] = useState(['Małe dzieci', 'Small children']); // active state demo

  const toggleTrait = (label) => {
    setTraitsSelection(prev => 
      prev.includes(label) 
        ? prev.filter(t => t !== label)
        : [...prev, label]
    );
  };

  return (
    <section className="py-24 bg-surface-container-low relative" id="plans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-4xl font-bold mb-4 tracking-tight">{content.title}</h2>
          <p className="text-on-surface-variant text-lg">{content.lead}</p>
        </div>
        
        <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-sm border border-outline-variant/10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            {/* Step 1 */}
            <div>
              <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-6">
                {content.step1.title}
              </label>
              <div className="grid grid-cols-3 gap-4">
                {content.step1.options.map((opt) => {
                  const Icon = iconsData[opt.icon];
                  const isActive = sizeSelection === opt.label;
                  return (
                    <button 
                      key={opt.label}
                      onClick={() => setSizeSelection(opt.label)}
                      className={cn(
                        "flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300",
                        isActive 
                          ? "border-primary bg-primary/5 shadow-sm" 
                          : "border-transparent bg-surface-container-low hover:border-outline-variant"
                      )}
                    >
                      {Icon && <Icon className={cn("w-6 h-6 mb-2", isActive ? "text-primary" : "text-on-surface-variant")} />}
                      <span className="text-xs font-bold">{opt.label}</span>
                      <span className="text-[10px] opacity-60 mt-1">{opt.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-6">
                {content.step2.title}
              </label>
              <div className="flex flex-wrap gap-4">
                {content.step2.options.map((opt) => {
                  const Icon = iconsData[opt.icon];
                  const isActive = traitsSelection.includes(opt.label);
                  return (
                    <button 
                      key={opt.label}
                      onClick={() => toggleTrait(opt.label)}
                      className={cn(
                        "px-6 py-3 rounded-full border transition-all flex items-center gap-2",
                        isActive
                          ? "bg-primary text-white border-primary shadow-md"
                          : "bg-surface-container-low border-transparent hover:border-primary text-on-surface"
                      )}
                    >
                      {Icon && <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-on-surface-variant")} />}
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recommendation Result */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={sizeSelection + traitsSelection.join('-')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-6"
              >
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm tracking-tight">{content.result.badge}</p>
                      <p className="text-xs text-on-surface-variant italic">{content.result.subText}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-extrabold mb-2 font-headline relative z-10">Pakiet {sizeSelection} Clean+</h3>
                  <p className="text-sm text-on-surface-variant mb-6 leading-relaxed relative z-10">
                    {content.result.desc}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10">
                    <span className="text-3xl font-black text-primary">
                      {sizeSelection === 'MINI' ? '89,00' : sizeSelection === 'MIDI' ? '129,00' : '189,00'} <span className="text-lg">zł</span>
                      <span className="text-sm font-normal text-on-surface-variant">{content.result.priceSuffix}</span>
                    </span>
                    <button className="bg-tertiary-fixed text-on-tertiary-fixed px-6 py-3 rounded-lg font-bold text-sm hover:scale-105 transition-transform active:scale-95 shadow-md">
                      {content.result.cta}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visual Presentation */}
          <div className="relative h-full min-h-[400px]">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent rounded-3xl overflow-hidden border border-outline-variant/10">
              <img 
                alt="Cleaning kit visualization" 
                className="w-full h-full object-cover mix-blend-overlay opacity-90" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwQZ7F6R_H9nBPYRwONdawYGyTn3lpilJYn162PpmyzL2BAJrNdMw2oddosBfTpVV-FUtOx1LXoOoYAd7hrOJgjh-7EtBlruwFRQ3fWU1npZgxFNCNtxrQIcDySh6Go8dsxWNqLDT2AS42v2kfglvzH0WKplrc5T_dtBHyNTQnI1u_er2iixLwxvtAJ97FlxhhszPwnlcptz6WvLQMw1PycnXmO8HqmhmPGbEX7Q8J7OiI7ZsealoVzmGwdmvzymnVFcNTspaS7Gvq"
              />
            </div>
            
            <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
              <motion.div 
                className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-primary tracking-widest">{content.vis.title}</span>
                  <span className="text-xs font-bold px-2 py-1 bg-primary/10 rounded">{content.vis.count}</span>
                </div>
                <ul className="space-y-3">
                  {content.vis.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                      <span className={cn(
                        "w-2.5 h-2.5 rounded-full shadow-sm",
                        idx === 0 ? "bg-blue-500" : idx === 1 ? "bg-green-500" : "bg-red-400"
                      )}></span>
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="text-xs text-primary font-bold mt-4 pt-4 border-t border-outline-variant/20 italic">
                    {content.vis.more}
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
