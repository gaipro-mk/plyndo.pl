import { useState } from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productRoutePath, products } from '../../data/products';
import { copy } from '../../content';
import { formatPln } from '../../lib/bundlePricing';

export default function ProductGridSection({ lang = 'pl' }) {
  const content = copy[lang]?.productGrid ?? copy.pl.productGrid;
  const audience = copy[lang]?.audience ?? copy.pl.audience;
  const [hovered, setHovered] = useState(null);

  return (
    <section id="products" className="py-24 px-6" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-14 gap-6 flex-wrap">
          <div className="max-w-[620px]">
            <span className="t-eyebrow">{content.title}</span>
            <h2 className="t-h1 mt-4">{content.heading}</h2>
            <p className="t-lead mt-4 text-[17px] leading-relaxed text-fg-muted font-light">
              {content.lead}
            </p>
          </div>
          <Link to="/#pakiety" className="bg-transparent text-fg-muted border-none font-medium text-[13px] cursor-pointer inline-flex items-center gap-1 hover:opacity-60 transition-opacity no-underline tracking-wide">
            {content.cta.toLowerCase()} <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-[20px] border p-8" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}>
            <h3 className="t-h3 mb-3">{audience.home.title}</h3>
            <p className="text-[14px] leading-[1.7] text-fg-muted mb-6">{audience.home.copy}</p>
            <ul className="grid gap-3">
              {audience.home.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-fg-muted">
                  <CheckCircle2 size={16} className="shrink-0 text-fg-muted mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] border p-8" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)' }}>
            <h3 className="t-h3 mb-3">{audience.business.title}</h3>
            <p className="text-[14px] leading-[1.7] text-fg-muted mb-6">{audience.business.copy}</p>
            <ul className="grid gap-3">
              {audience.business.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-fg-muted">
                  <CheckCircle2 size={16} className="shrink-0 text-fg-muted mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map(p => (
            <Link 
              key={p.id} 
              to={productRoutePath(p)}
              onMouseEnter={() => setHovered(p.id)} 
              onMouseLeave={() => setHovered(null)}
              className="no-underline text-inherit block cursor-pointer group"
            >
              {/* White card with product image */}
              <div
                className="rounded-[16px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] aspect-[4/5] border"
                style={{
                  borderColor: hovered === p.id ? 'var(--color-border-strong)' : 'var(--color-border)',
                  background: p.color.bg,
                  boxShadow: hovered === p.id ? 'var(--shadow-md)' : 'none',
                  transform: hovered === p.id ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                <img
                  src={p.image}
                  alt={p.i18n?.pl?.displayName ?? p.name}
                  className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: hovered === p.id ? 'scale(1.04)' : 'scale(1)',
                    objectPosition: 'top center',
                  }}
                />
              </div>
              <div className="mt-3.5 flex items-start gap-2">
                <span className="color-dot mt-1.5 flex-shrink-0" style={{ background: p.color.bg }} />
                <div>
                  <div className="font-serif italic text-[18px] leading-[1.15] font-normal tracking-[-0.01em]">
                    {p.i18n?.pl?.shortName ?? p.name.replace(/^PŁYN DO\s*/i, '')}
                  </div>
                  <div className="text-[12px] text-fg-subtle mt-1 font-medium uppercase tracking-[0.1em]">
                    <span>1 L</span>
                    <span className="mx-1.5 opacity-30">·</span>
                    <span className="line-through opacity-60">{formatPln(p.listPrice, 'pl-PL')}</span>
                    <span className="mx-1.5 opacity-30">·</span>
                    <span>{formatPln(p.listPrice * 0.5, 'pl-PL')} w 12x</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
