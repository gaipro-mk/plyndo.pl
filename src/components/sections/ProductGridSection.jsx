import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import BottlePlaceholder from '../BottlePlaceholder';

export default function ProductGridSection() {
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
            <h2 className="font-headline text-4xl font-bold mb-4 tracking-tight">Odkryj nasze produkty</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">Stworzone z myślą o czystości, skuteczności i niesamowitych zapachach. Wybierz płyn idealny dla Ciebie.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform group">
            Złóż zamówienie
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-y-12 md:pb-0 no-scrollbar"
        >
          {products.map((product) => (
            <motion.div variants={item} key={product.id} className="group min-w-[260px] md:min-w-0 snap-start">
              <Link to={`/product/${product.slug}`} className="block">
                <div 
                  className="aspect-3/4 rounded-2xl mb-4 overflow-hidden relative border border-outline-variant/20 shadow-sm transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 flex items-center justify-center p-8"
                  style={{ backgroundColor: product.color.bg }}
                >
                  <div className="absolute top-4 left-4 z-20">
                    <span 
                      className="text-[10px] font-bold px-2 py-1 rounded tracking-tighter shadow-md"
                      style={{ backgroundColor: product.color.text, color: product.color.bg }}
                    >
                      {product.scent}
                    </span>
                  </div>
                  <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <BottlePlaceholder color={product.color} />
                  </div>
                </div>
                <h3 className="font-headline font-bold text-lg mb-1 tracking-tight text-on-surface group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-sm text-on-surface-variant line-clamp-2">{product.subtitle}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
