import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Info, ShieldAlert } from 'lucide-react';
import { products } from '../data/products';
import BottlePlaceholder from '../components/BottlePlaceholder';
import DynamicBackground from '../components/DynamicBackground';

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen relative w-full flex flex-col" style={{ backgroundColor: product.color.bg, color: product.color.text }}>
      <DynamicBackground pattern={product.bgPattern} color={product.color} />
      
      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col pt-8 pb-16 px-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity font-medium">
            <ChevronLeft className="w-5 h-5" />
            Wróć do sklepu
          </Link>
          <img 
            src="/logo-light.svg" 
            alt="Plyn DO" 
            className="h-6" 
            style={{ filter: product.color.bg === '#EBEBEB' || product.color.bg === '#E0E0E0' ? 'invert(1)' : 'none' }} 
          />
        </header>

        {/* Main Product Layout */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: Text & Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-10"
          >
            <div>
              <div className="inline-block px-3 py-1 mb-4 rounded-full text-sm font-semibold tracking-wide uppercase shadow-sm" style={{ backgroundColor: product.color.text, color: product.color.bg }}>
                {product.scent}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-headline leading-tight tracking-tight mb-4">
                {product.name}
              </h1>
              <p className="text-2xl opacity-90 font-medium">
                {product.subtitle}
              </p>
            </div>

            <p className="text-lg leading-relaxed opacity-95 max-w-xl">
              {product.description}
            </p>

            <div className="space-y-8 max-w-xl">
              <section className="bg-black/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
                <h3 className="flex items-center gap-2 text-xl font-bold mb-3">
                  <Info className="w-5 h-5" /> Sposób użycia
                </h3>
                <p className="leading-relaxed opacity-90 whitespace-pre-line">
                  {product.howToUse}
                </p>
              </section>

              <section className="bg-black/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
                <h3 className="flex items-center gap-2 text-xl font-bold mb-3">
                  <ShieldAlert className="w-5 h-5" /> Skład i bezpieczeństwo
                </h3>
                <p className="leading-relaxed opacity-90 text-sm mb-4">
                  <strong>Składniki:</strong> {product.ingredients}
                </p>
                <p className="leading-relaxed opacity-90 text-sm">
                  <strong>Bezpieczeństwo:</strong> {product.safety}
                </p>
              </section>

              <p className="text-xs opacity-70">
                Producent: {product.producer}
              </p>
            </div>
          </motion.div>

          {/* Right: Visual representation */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 w-full max-w-md mx-auto lg:sticky lg:top-24"
          >
            <div className="aspect-[2/3] w-full rounded-3xl flex items-center justify-center p-12">
              <BottlePlaceholder color={product.color} className="w-full h-full max-h-[600px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
