import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { copy } from '../../content';
import { formatPln } from '../../lib/bundlePricing';

export default function ProductGridSection({ lang = 'pl' }) {
  const content = copy[lang].productGrid;
  const [hovered, setHovered] = useState(null);

  return (
    <section id="products" className="py-24 bg-surface px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 gap-6 flex-wrap">
          <div className="max-w-[560px]">
            <span className="t-eyebrow">{content.title}</span>
            <h2 className="t-h1 mt-3">{content.heading}</h2>
            <p className="t-lead mt-3.5">
              {content.lead}
            </p>
          </div>
          <Link to="/#plans" className="bg-transparent text-primary border-none font-bold text-sm cursor-pointer inline-flex items-center gap-1.5 hover:text-primary-hover transition-colors no-underline">
            {content.cta} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4.5">
          {products.map(p => (
            <Link 
              key={p.id} 
              to={`/product/${p.slug}`}
              onMouseEnter={() => setHovered(p.id)} 
              onMouseLeave={() => setHovered(null)}
              className="no-underline text-inherit block cursor-pointer transition-transform duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: hovered === p.id ? 'translateY(-6px)' : 'translateY(0)',
              }}
            >
              <div 
                className="rounded-[14px] overflow-hidden transition-shadow duration-[380ms] flex items-center justify-center aspect-[4/5]"
                style={{
                  boxShadow: hovered === p.id ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  background: p.color.bg,
                }}
              >
                <img 
                  src={p.image} 
                  alt={p.i18n?.[lang]?.displayName ?? p.name}
                  className="w-full h-[85%] object-cover object-center block transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-normal"
                  style={{
                    transform: hovered === p.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
              </div>
              <div className="mt-3">
                <div className="mb-0.5 text-[10px] font-bold uppercase opacity-50">
                  {lang === 'en' ? 'Plyndo liquid' : 'Płyn do'}
                </div>
                <div className="font-serif italic text-[17px] leading-[1.1] tracking-[-0.005em] font-medium">
                  {p.i18n?.[lang]?.shortName ?? p.name.replace(/^PŁYN DO\s*/i, '')}
                </div>
                <div className="text-xs text-fg-muted mt-1 flex flex-wrap gap-x-1.5 gap-y-0.5 uppercase tracking-wider">
                  <span>1 L</span>
                  <span>{formatPln(p.listPrice, lang === 'en' ? 'en-GB' : 'pl-PL')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
