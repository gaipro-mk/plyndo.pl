import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Info, ShieldAlert } from 'lucide-react';
import { products } from '../data/products';

/**
 * Splits "PŁYN DO naczyń" into logo part + suffix in label font.
 * The logo replaces the "PŁYN DO" text.
 */
function ProductNameDisplay({ name, logoSrc, className = '' }) {
  const prefix = 'PŁYN DO ';
  if (name.startsWith(prefix)) {
    const suffix = name.slice(prefix.length);
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <img src={logoSrc} alt="PŁYN DO" className="h-[42px] md:h-[56px] w-auto object-contain object-left" />
        <span className="font-serif italic font-medium text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-[-0.02em]">
          {suffix}
        </span>
      </div>
    );
  }
  // Fallback: just render the name
  return <span className={className}>{name}</span>;
}

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return <Navigate to="/" />;
  }

  // Determine if background is light to switch logo/text colors if needed
  const isLightBg = product.color.bg === '#EBEBEB' || product.color.bg === '#E0E0E0' || product.color.bg === '#E4C969' || product.color.bg === '#A7CFEA' || product.color.bg === '#9ECBE8';
  const logoSrc = isLightBg ? '/logo-black.svg' : '/logo-white.svg';

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
            src={logoSrc}
            alt="Płyn DO" 
            className="h-6" 
          />
        </header>

        {/* Main Product Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mt-4">
          {/* Left: Text & Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-10"
          >
            <div>
              <div className="inline-block px-3 py-1 mb-4 rounded-full text-[11px] font-bold uppercase tracking-widest" style={{ backgroundColor: product.color.text, color: product.color.bg }}>
                {product.scent}
              </div>
              <h1 className="mb-4">
                <ProductNameDisplay name={product.name} logoSrc={logoSrc} />
              </h1>
              <p className="font-serif italic text-xl md:text-2xl opacity-90">
                {product.subtitle}
              </p>
            </div>

            <p className="text-base leading-[1.6] opacity-95 max-w-xl font-medium">
              {product.description}
            </p>

            <div className="space-y-6 max-w-xl">
              <section className="bg-black/5 p-6 md:p-8 rounded-[24px] border border-black/5 backdrop-blur-sm">
                <h3 className="flex items-center gap-3 font-bold mb-4 uppercase tracking-widest text-[12px]">
                  <Info size={18} /> Sposób użycia
                </h3>
                <p className="leading-[1.6] opacity-90 text-[14px] whitespace-pre-line">
                  {product.howToUse}
                </p>
              </section>

              <section className="bg-black/5 p-6 md:p-8 rounded-[24px] border border-black/5 backdrop-blur-sm">
                <h3 className="flex items-center gap-3 font-bold mb-4 uppercase tracking-widest text-[12px]">
                  <ShieldAlert size={18} /> Skład i bezpieczeństwo
                </h3>
                <p className="leading-[1.6] opacity-90 text-[13px] mb-4">
                  <strong>Składniki:</strong> {product.ingredients}
                </p>
                <p className="leading-[1.6] opacity-90 text-[13px]">
                  <strong>Bezpieczeństwo:</strong> {product.safety}
                </p>
              </section>
            </div>
          </motion.div>

          {/* Right: Visual representation — constrained to sensible size */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 w-full max-w-lg mx-auto lg:sticky lg:top-16"
          >
            <div className="w-full flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto max-h-[600px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.20)]" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
