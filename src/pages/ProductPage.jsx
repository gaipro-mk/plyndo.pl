import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Info, ShieldAlert } from 'lucide-react';
import { products } from '../data/products';

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return <Navigate to="/" />;
  }

  // Determine if background is light to switch logo/text colors if needed
  const isLightBg = product.color.bg === '#EBEBEB' || product.color.bg === '#E0E0E0' || product.color.bg === '#E4C969' || product.color.bg === '#A7CFEA';

  return (
    <div className="min-h-screen relative w-full flex flex-col font-sans" style={{ backgroundColor: product.color.bg, color: product.color.text }}>
      
      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col pt-8 pb-16 px-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity font-bold uppercase tracking-widest text-[11px]">
            <ChevronLeft size={16} />
            Wróć do sklepu
          </Link>
          <img 
            src={isLightBg ? '/logo-black.svg' : '/logo-white.svg'}
            alt="Plyn DO" 
            className="h-6" 
          />
        </header>

        {/* Main Product Layout */}
        <div className="flex flex-col lg:flex-row gap-16 items-start mt-8">
          {/* Left: Text & Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-12"
          >
            <div>
              <div className="inline-block px-3 py-1 mb-4 rounded-full text-[11px] font-bold uppercase tracking-widest" style={{ backgroundColor: product.color.text, color: product.color.bg }}>
                {product.scent}
              </div>
              <h1 className="font-display font-black text-5xl md:text-7xl tracking-[-0.04em] leading-[0.9] mb-4">
                {product.name}
              </h1>
              <p className="font-serif italic text-2xl md:text-3xl opacity-90">
                {product.subtitle}
              </p>
            </div>

            <p className="text-lg leading-[1.6] opacity-95 max-w-xl font-medium">
              {product.description}
            </p>

            <div className="space-y-6 max-w-xl">
              <section className="bg-black/5 p-8 rounded-[24px] border border-black/5 backdrop-blur-sm">
                <h3 className="flex items-center gap-3 text-lg font-bold mb-4 uppercase tracking-widest text-[12px]">
                  <Info size={18} /> Sposób użycia
                </h3>
                <p className="leading-[1.6] opacity-90 text-[14.5px] whitespace-pre-line">
                  {product.howToUse}
                </p>
              </section>

              <section className="bg-black/5 p-8 rounded-[24px] border border-black/5 backdrop-blur-sm">
                <h3 className="flex items-center gap-3 text-lg font-bold mb-4 uppercase tracking-widest text-[12px]">
                  <ShieldAlert size={18} /> Skład i bezpieczeństwo
                </h3>
                <p className="leading-[1.6] opacity-90 text-[13.5px] mb-4">
                  <strong>Składniki:</strong> {product.ingredients}
                </p>
                <p className="leading-[1.6] opacity-90 text-[13.5px]">
                  <strong>Bezpieczeństwo:</strong> {product.safety}
                </p>
              </section>

              <p className="text-[11px] opacity-70 uppercase tracking-widest font-bold">
                Producent: {product.producer}
              </p>
            </div>
          </motion.div>

          {/* Right: Visual representation */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 w-full max-w-2xl mx-auto lg:sticky lg:top-12"
          >
            <div className="w-full flex items-center justify-center -mx-6 sm:mx-0">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-[115%] h-auto max-h-[800px] object-cover scale-110 lg:scale-125 origin-center mix-blend-normal" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
