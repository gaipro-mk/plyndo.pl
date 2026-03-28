// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { copy } from '../../content';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ lang }) {
  const content = copy[lang].hero;

  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-surface-container-low to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6">
            {content.tag}
          </span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface leading-[1.1] mb-8 text-balance">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant font-light mb-10 max-w-xl leading-relaxed">
            {content.lead}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-tertiary-fixed text-on-tertiary-fixed px-10 py-5 rounded-lg font-extrabold text-lg shadow-xl shadow-tertiary-fixed/20 hover:scale-105 transition-transform active:scale-95 flex items-center gap-2 group">
              {content.primary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-surface-container-lowest text-primary px-10 py-5 rounded-lg font-bold text-lg border border-outline-variant/15 hover:bg-surface-container-low transition-colors">
              {content.secondary}
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <motion.img 
              alt="Minimalist cleaning bottles" 
              className="relative z-10 w-full h-auto drop-shadow-2xl rounded-2xl transform rotate-3" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb0vDEh2Woo2A4uvXfb3yw1vif2McuZwaFdwwf4rviO9_dV2Mv4yIgRpybjbuXZ4orT_gjV-geTgcDyVVZ0lQ6F1L_8J7AJ5IFq2926Jxj-Bf9uFiwK3AXVibs6WfiUjAua8pcKxfduHTKjYglCaLem6Vwq25Fb3NDqZCblEzCU8pC7_aX1v7paqShRdeYU6RD1YyS-Gf5tt8nnMIr8lCtKTBlX0AtAbRtqRIExSiod486UqT6pBKCL8ognv8km_2WijfVYK2EQk6i"
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
            />
            
            <motion.div 
              className="absolute -bottom-6 -left-2 sm:-left-6 bg-surface p-4 sm:p-6 rounded-xl shadow-2xl z-20 max-w-[170px] sm:max-w-[200px] border border-outline-variant/20 text-on-surface"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-tight">{content.trust.badge}</span>
              </div>
              <p className="text-[10px] text-on-surface-variant leading-tight">{content.trust.caption}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
