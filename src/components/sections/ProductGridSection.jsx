// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { copy } from '../../content';

export default function ProductGridSection({ lang }) {
  const content = copy[lang].productGrid;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section className="py-24 bg-surface" id="products">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-headline text-4xl font-bold mb-4 tracking-tight">{content.title}</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">{content.lead}</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform group">
            {content.cta}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12"
        >
          {content.products.map((product, idx) => (
            <motion.div variants={item} key={idx} className="group cursor-pointer">
              <div className="aspect-3/4 bg-surface-container-low rounded-2xl mb-4 overflow-hidden relative border border-outline-variant/5">
                <div className="absolute top-4 left-4 z-20">
                  <span className={`${product.color} text-white text-[10px] font-bold px-2 py-1 rounded tracking-tighter shadow-sm`}>
                    {product.tag}
                  </span>
                </div>
                <img 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                  src={product.img}
                />
              </div>
              <h3 className="font-headline font-bold text-lg mb-1 tracking-tight group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-xs text-on-surface-variant mb-3">{product.tagline}</p>
              <div className="flex items-center gap-2">
                <span className="bg-surface-variant text-on-surface-variant text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                  pH {product.ph}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
