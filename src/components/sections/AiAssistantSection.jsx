import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { copy } from '../../content';
import { cn } from '../../lib/utils';
import { Building2, Home, Building, Dog, Baby, Syringe, Sparkles, Check } from 'lucide-react';

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
  
  // State
  const [area, setArea] = useState(60);
  const [traitsSelection, setTraitsSelection] = useState([content.step2.options[0].label]); // default to first trait
  const [surfacesSelection, setSurfacesSelection] = useState([]);
  const [frequency, setFrequency] = useState(content.step4.options[1]); // Default to every 2 months

  const toggleTrait = (label) => {
    setTraitsSelection(prev => 
      prev.includes(label) 
        ? prev.filter(t => t !== label)
        : [...prev, label]
    );
  };

  const toggleSurface = (label) => {
    setSurfacesSelection(prev => 
      prev.includes(label) 
        ? prev.filter(t => t !== label)
        : [...prev, label]
    );
  };

  // Mock Recommendation Engine
  // Determines Package based on Area, and adds special tags based on traits
  let pkgName = 'MINI';
  let pkgPrice = '89,00';
  let pkgProducts = ['JAX 01 (Powierzchnie Szklane)', 'JAX 14 (Podłogi Drewniane)', 'JAX 07 (Sanitariaty)', 'JAX 22 (Naczynia)', 'JAX 19 (Mydło Hipo)'];
  
  if (area > 50 && area <= 120) {
    pkgName = 'MIDI';
    pkgPrice = '129,00';
    pkgProducts = ['JAX 01 (Powierzchnie Szklane)', 'JAX 14 (Podłogi)', 'JAX 07 (Sanitariaty)', 'JAX 22 (Naczynia)', 'JAX 19 (Mydło Hipo)', 'JAX 41 (Pranie)', 'JAX 45 (Płyn do płukania)'];
  } else if (area > 120) {
    pkgName = 'MAXI';
    pkgPrice = '189,00';
    pkgProducts = ['JAX 01 (Powierzchnie Szklane)', 'JAX 14 (Podłogi)', 'JAX 07 (Sanitariaty)', 'JAX 22 (Naczynia)', 'JAX 19 (Mydło Hipo)', 'JAX 41 (Pranie XL)', 'JAX 45 (Płyn do płukania)', 'JAX 31 (Zmywarka Gel)', 'JAX 55 (Odtłuszczacz)'];
  }
  const recommendation = { name: pkgName, price: pkgPrice, products: pkgProducts };


  return (
    <section className="py-24 bg-surface-container-low relative" id="plans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-4 tracking-tight">{content.title}</h2>
          <p className="text-on-surface-variant text-lg">{content.lead}</p>
        </div>
        
        <div className="bg-surface-container-lowest rounded-4xl p-6 lg:p-12 shadow-sm border border-outline-variant/10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Configurator Controls */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Step 1: Ruler / Area Selection */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="block text-sm font-bold text-primary uppercase tracking-widest">
                  {content.step1.title}
                </label>
                <div className="text-3xl font-headline font-black text-primary flex items-baseline gap-1">
                  {area} <span className="text-base text-on-surface-variant font-medium">{content.step1.unit}</span>
                </div>
              </div>
              <div className="relative pt-6 pb-2">
                <input 
                  type="range" 
                  min="20" 
                  max="250" 
                  step="5"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary relative z-10"
                />
                <div className="absolute top-0 left-0 w-full flex justify-between text-[10px] text-on-surface-variant/60 font-bold px-1 mt-1">
                  <span>20m²</span>
                  <span>100m²</span>
                  <span>250m²</span>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant mt-2">{content.step1.help}</p>
            </div>

            {/* Step 2: Traits Toggle Cards */}
            <div>
              <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-4">
                {content.step2.title}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {content.step2.options.map((opt) => {
                  const Icon = iconsData[opt.icon];
                  const isActive = traitsSelection.includes(opt.label);
                  return (
                    <button 
                      key={opt.label}
                      onClick={() => toggleTrait(opt.label)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-md",
                        isActive
                          ? "border-primary bg-primary/5 text-primary shadow-sm shadow-primary/10"
                          : "border-transparent bg-surface text-on-surface-variant hover:border-outline-variant/30"
                      )}
                    >
                      {Icon && <Icon className={cn("w-6 h-6 transition-colors")} />}
                      <span className="text-xs font-bold text-center">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Surfaces Pills */}
            <div>
              <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-4">
                {content.step3.title}
              </label>
              <div className="flex flex-wrap gap-2">
                {content.step3.options.map((opt) => {
                  const isActive = surfacesSelection.includes(opt);
                  return (
                    <button 
                      key={opt}
                      onClick={() => toggleSurface(opt)}
                      className={cn(
                        "px-4 py-2 rounded-full border transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95",
                        isActive
                          ? "bg-on-surface text-surface border-transparent shadow-md"
                          : "bg-surface border-outline-variant/30 text-on-surface hover:border-primary/50"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Frequency Choice */}
            <div>
              <label className="block text-sm font-bold text-primary uppercase tracking-widest mb-4">
                {content.step4.title}
              </label>
              <div className="flex flex-wrap sm:flex-nowrap p-1 bg-surface-variant rounded-xl">
                {content.step4.options.map((opt) => {
                  const isActive = frequency === opt;
                  return (
                    <button 
                      key={opt}
                      onClick={() => setFrequency(opt)}
                      className={cn(
                        "flex-1 px-4 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                        isActive
                          ? "bg-surface text-on-surface shadow-sm"
                          : "text-on-surface-variant hover:text-on-surface"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Dynamic Result Panel */}
          <div className="lg:col-span-5 relative h-full">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={recommendation.name + traitsSelection.join('') + frequency}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-primary/10 via-surface to-primary/5 border border-primary/20 shadow-2xl relative overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-widest text-primary">{content.result.badge}</p>
                      <p className="text-xs text-on-surface-variant italic">{content.result.subText}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-extrabold mb-2 font-headline relative z-10">Pakiet {recommendation.name}</h3>
                  <p className="text-sm text-on-surface-variant mb-6 leading-relaxed relative z-10">
                    {content.result.desc}
                  </p>
                  
                  {/* Dynamic Injectors based on Traits */}
                  {(traitsSelection.length > 0 || surfacesSelection.length > 0) && (
                    <div className="mb-6 space-y-2 p-4 bg-surface/50 rounded-xl border border-outline-variant/10">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Automatycznie dodano:</p>
                      {traitsSelection.includes(content.step2.options[0].label) && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface"><Check className="w-3 h-3 text-green-500"/> JAX 44 - Eliminator Zapachów (Zwierzęta)</div>
                      )}
                      {traitsSelection.includes(content.step2.options[2].label) && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface"><Check className="w-3 h-3 text-green-500"/> Modyfikacja: Formuła Hipoalergiczna</div>
                      )}
                      {surfacesSelection.includes(content.step3.options[0]) && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface"><Check className="w-3 h-3 text-green-500"/> Podwójna dawka: JAX 14 (Drewno)</div>
                      )}
                      {surfacesSelection.includes(content.step3.options[2]) && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface"><Check className="w-3 h-3 text-green-500"/> Ultra Glass Cleaner - Zwiększona obj.</div>
                      )}
                    </div>
                  )}
                  
                  {/* Dynamic Products Presentation */}
                  <div className="mb-8 pt-6 border-t border-outline-variant/10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-primary tracking-widest uppercase">Zmienna Zawartość Boxa:</span>
                      <span className="text-xs font-bold px-2 py-1 bg-surface-container-high rounded text-on-surface">{recommendation.products.length} Butelek</span>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <AnimatePresence mode="popLayout">
                        {recommendation.products.map((prod, idx) => (
                          <motion.div 
                            key={prod + idx}
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -10 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            className="flex items-center gap-3 text-sm font-medium text-on-surface"
                          >
                            <span className={cn(
                              "w-2.5 h-2.5 rounded-full shadow-sm",
                              idx === 0 ? "bg-blue-500" : idx === 1 ? "bg-amber-500" : idx === 2 ? "bg-red-400" : "bg-emerald-400"
                            )}></span>
                            <span>{prod}</span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10 pt-4 border-t border-outline-variant/10">
                    <div className="flex flex-col">
                      <span className="text-4xl font-black text-primary leading-none">
                        {recommendation.price} <span className="text-xl">zł</span>
                      </span>
                      <span className="text-xs font-medium text-on-surface-variant mt-1">
                        / wysyłka {frequency.toLowerCase()}
                      </span>
                    </div>
                    <button className="bg-tertiary-fixed text-on-tertiary-fixed px-6 py-4 rounded-xl font-bold text-sm hover:scale-105 transition-transform active:scale-95 shadow-md w-full sm:w-auto text-center">
                      {content.result.cta}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
