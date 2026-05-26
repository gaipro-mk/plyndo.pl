import { useState, useEffect } from 'react';
import { Menu, X, Globe, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { copy } from '../../content';
import { products } from '../../data/products';

export default function TopNav({ lang, setLang, theme, setTheme, fontScale, setFontScale, activeTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const labels = copy[lang].nav;
  const NAV = [
    { href: "/#plans", label: labels.bundles },
    { href: "/#use-cases", label: labels.useCases },
    { href: "/#faq", label: labels.faq }
  ];

  const isDark = activeTheme === 'dark';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b' : 'bg-transparent border-b border-transparent'}`} style={{ borderColor: scrolled ? 'var(--color-border)' : 'transparent' }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/#top" className="flex items-center" aria-label={lang === 'en' ? 'Plyndo home' : 'Strona główna Płyndo'}>
          <img src={isDark ? '/logo-white.svg' : '/logo-black.svg'} alt="Płyndo" className="h-[26px] w-auto" />
        </Link>

        {/* Center nav links — TeaFlow minimal style */}
        <div className="hidden lg:flex gap-8 items-center">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <Link
              to="/#products"
              onFocus={() => setProductsOpen(true)}
              className="inline-flex items-center gap-1 text-[13px] font-medium no-underline tracking-wide transition-opacity hover:opacity-60"
              style={{ color: 'var(--color-fg)' }}
              aria-haspopup="menu"
              aria-expanded={productsOpen}
            >
              {labels.products.toLowerCase()}
              <ChevronDown size={12} className="opacity-40" />
            </Link>
            <div
              className={`absolute left-[-18px] top-full pt-4 transition-all duration-200 ${productsOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}
              onFocus={() => setProductsOpen(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setProductsOpen(false);
                }
              }}
            >
              <div
                role="menu"
                className="grid w-[340px] grid-cols-2 gap-1 rounded-[16px] border p-2.5 shadow-md"
                style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
              >
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    to={`/product/${product.slug}`}
                    role="menuitem"
                    className="grid min-h-11 grid-cols-[30px_1fr] items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-[13px] font-medium no-underline transition-colors hover:bg-black/[0.03]"
                    style={{ color: 'var(--color-fg)' }}
                  >
                    <span className="h-7 w-7 overflow-hidden rounded-[6px] flex items-center justify-center" style={{ background: product.color.bg }}>
                      <img src={product.image} alt="" className="h-full w-full object-cover" />
                    </span>
                    <span className="leading-tight">{product.i18n?.[lang]?.shortName ?? product.shortName}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {NAV.map((n) => (
            <Link
              key={n.href} 
              to={n.href}
              className="text-[13px] font-medium no-underline tracking-wide transition-opacity hover:opacity-60"
              style={{ color: 'var(--color-fg-muted)' }}
            >
              {n.label.toLowerCase()}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
            aria-label="Language"
            className="hidden sm:flex border px-2.5 py-1.5 rounded-full text-[11px] font-medium tracking-[0.1em] cursor-pointer items-center gap-1.5 transition-opacity hover:opacity-60 bg-transparent"
            style={{ 
              borderColor: 'var(--color-border-strong)',
              color: 'var(--color-fg-muted)',
            }}
          >
            <Globe size={12} />{lang.toUpperCase()}
          </button>
          <Link
            to="/#plans"
            className="border-none px-5 py-2.5 rounded-full font-medium text-[13px] cursor-pointer inline-flex items-center gap-1.5 transition-all duration-300 hover:opacity-90 no-underline"
            style={{
              background: 'var(--color-fg)',
              color: 'var(--color-bg)',
            }}
          >
            {lang === 'en' ? 'Packages' : 'Pakiety'} <ArrowRight size={13} />
          </Link>
          <button 
            className="lg:hidden bg-transparent border-none p-1.5 cursor-pointer"
            style={{ color: 'var(--color-fg)' }}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t px-6 py-4 lg:hidden" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <Link to="/#products" onClick={() => setOpen(false)} className="block py-3 font-medium text-[14px] no-underline" style={{ color: 'var(--color-fg)' }}>
            {labels.products}
          </Link>
          <div className="grid grid-cols-2 gap-1 border-b pb-3" style={{ borderColor: 'var(--color-border)' }}>
            {products.map((product) => (
              <Link
                key={product.slug}
                to={`/product/${product.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-[8px] px-2 py-1.5 text-[12px] font-medium no-underline hover:bg-black/[0.03]"
                style={{ color: 'var(--color-fg)' }}
              >
                <span className="color-dot" style={{ background: product.color.bg }} />
                {product.i18n?.[lang]?.shortName ?? product.shortName}
              </Link>
            ))}
          </div>
          {NAV.map(n => (
            <Link key={n.href} to={n.href} onClick={() => setOpen(false)} className="block py-3 font-medium text-[14px] no-underline" style={{ color: 'var(--color-fg)' }}>
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
