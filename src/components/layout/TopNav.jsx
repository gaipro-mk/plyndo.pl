import { useState, useEffect } from 'react';
import { Menu, X, Globe, ArrowRight, ChevronDown, Sun, Moon, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { copy } from '../../content';
import { products } from '../../data/products';

export default function TopNav({ lang, setLang, theme, setTheme, fontScale, setFontScale, activeTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const labels = copy[lang].nav;
  const controls = copy[lang].controls;
  const NAV = [
    { href: "/#plans", label: labels.bundles },
    { href: "/#use-cases", label: labels.useCases },
    { href: "/#advisor", label: labels.advisor },
    { href: "/#faq", label: labels.faq }
  ];

  const isDark = activeTheme === 'dark';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-180 border-b ${scrolled ? (isDark ? 'bg-[#0a0f12]/90 border-[#2a3138]' : 'bg-white/80 border-border') : (isDark ? 'bg-[#0a0f12]/60 border-transparent' : 'bg-white/60 border-transparent')} backdrop-blur-[18px]`}>
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-6">
        <Link to="/#top" className="flex items-center" aria-label={lang === 'en' ? 'Plyndo home' : 'Strona główna Płyndo'}>
          <img src={isDark ? '/logo-white.svg' : '/logo-black.svg'} alt="Płyndo" className="h-[30px] w-auto" />
        </Link>
        <div className="hidden lg:flex gap-7 items-center">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <Link
              to="/#products"
              onFocus={() => setProductsOpen(true)}
              className="inline-flex items-center gap-1 border-b-2 border-current pb-0.5 text-[13.5px] font-bold no-underline"
              style={{ color: 'var(--color-fg)' }}
              aria-haspopup="menu"
              aria-expanded={productsOpen}
            >
              {labels.products}
              <ChevronDown size={14} />
            </Link>
            <div
              className={`absolute left-[-18px] top-full pt-4 transition ${productsOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}
              onFocus={() => setProductsOpen(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setProductsOpen(false);
                }
              }}
            >
              <div
                role="menu"
                className="grid w-[360px] grid-cols-2 gap-1 rounded-[18px] border p-2 shadow-lg"
                style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
              >
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    to={`/product/${product.slug}`}
                    role="menuitem"
                    className="grid min-h-12 grid-cols-[34px_1fr] items-center gap-2 rounded-[12px] px-2 py-1.5 text-sm font-bold no-underline hover:bg-surface-container-low"
                    style={{ color: 'var(--color-fg)' }}
                  >
                    <span className="h-8 w-8 overflow-hidden rounded-[8px]" style={{ background: product.color.bg }}>
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
              className="border-b-2 border-transparent pb-0.5 text-[13.5px] font-medium no-underline transition-colors hover:opacity-100"
              style={{ color: 'var(--color-fg-muted)' }}
            >
              {n.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          {/* Theme Switcher */}
          <div className="hidden sm:flex items-center gap-0.5 border border-border rounded-full px-1 py-0.5">
            {[
              { val: 'light', icon: Sun, label: controls.light },
              { val: 'dark', icon: Moon, label: controls.dark },
              { val: 'system', icon: Monitor, label: controls.system },
            ].map((option) => (
              <button
                key={option.val}
                onClick={() => setTheme(option.val)}
                aria-label={option.label}
                className="p-1.5 rounded-full transition-colors cursor-pointer border-none"
                style={{
                  background: theme === option.val ? 'var(--color-fg)' : 'transparent',
                  color: theme === option.val ? 'var(--color-bg)' : 'var(--color-fg-muted)',
                }}
              >
                <option.icon size={13} />
              </button>
            ))}
          </div>

          {/* Font Size Switcher */}
          <div className="hidden sm:flex items-center gap-0.5 border border-border rounded-full px-1 py-0.5">
            {[
              { val: 'sm', label: 'A-', size: 10 },
              { val: 'md', label: 'A', size: 12 },
              { val: 'lg', label: 'A+', size: 10 },
            ].map(({ val, label, size }) => (
              <button
                key={val}
                onClick={() => setFontScale(val)}
                className="px-2 py-1 rounded-full transition-colors cursor-pointer border-none font-bold"
                style={{
                  fontSize: `${size}px`,
                  background: fontScale === val ? 'var(--color-fg)' : 'transparent',
                  color: fontScale === val ? 'var(--color-bg)' : 'var(--color-fg-muted)',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
            aria-label={controls.language}
            className="border px-2.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.12em] cursor-pointer flex items-center gap-1.5 transition-colors"
            style={{ 
              background: 'transparent',
              borderColor: 'var(--color-border-strong)',
              color: 'var(--color-fg-muted)',
            }}
          >
            <Globe size={13} />{lang.toUpperCase()}
          </button>
          <Link
            to="/#plans"
            className="border-none px-[18px] py-[10px] rounded-[10px] font-bold text-[13px] cursor-pointer shadow-cta inline-flex items-center gap-1.5 transition-colors"
            style={{
              background: 'var(--color-fg)',
              color: 'var(--color-bg)',
            }}
          >
            {lang === 'en' ? 'Choose package' : 'Wybierz pakiet'} <ArrowRight size={14} />
          </Link>
          <button 
            className="lg:hidden bg-transparent border-none p-1.5 cursor-pointer"
            style={{ color: 'var(--color-fg)' }}
            onClick={() => setOpen(!open)}
            aria-label={open ? (lang === 'en' ? 'Close menu' : 'Zamknij menu') : 'Menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t px-6 py-3 lg:hidden shadow-lg" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <Link
            to="/#products"
            onClick={() => setOpen(false)}
            className="block py-3 font-semibold no-underline"
            style={{ color: 'var(--color-fg)' }}
          >
            {labels.products}
          </Link>
          <div className="grid grid-cols-2 gap-1 border-b border-border pb-3">
            {products.map((product) => (
              <Link
                key={product.slug}
                to={`/product/${product.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-[10px] bg-surface-container-low px-2.5 py-2 text-xs font-bold no-underline"
                style={{ color: 'var(--color-fg)' }}
              >
                {product.i18n?.[lang]?.shortName ?? product.shortName}
              </Link>
            ))}
          </div>
          {NAV.map(n => (
            <Link
              key={n.href} 
              to={n.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-semibold no-underline"
              style={{ color: 'var(--color-fg)' }}
            >
              {n.label}
            </Link>
          ))}
          {/* Mobile theme/font controls */}
          <div className="flex items-center gap-2 py-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-0.5 border rounded-full px-1 py-0.5" style={{ borderColor: 'var(--color-border)' }}>
              {[
                { val: 'light', icon: Sun },
                { val: 'dark', icon: Moon },
                { val: 'system', icon: Monitor },
              ].map((option) => (
                <button
                  key={option.val}
                  onClick={() => setTheme(option.val)}
                  aria-label={controls[option.val]}
                  className="p-1.5 rounded-full transition-colors cursor-pointer border-none"
                  style={{
                    background: theme === option.val ? 'var(--color-fg)' : 'transparent',
                    color: theme === option.val ? 'var(--color-bg)' : 'var(--color-fg-muted)',
                  }}
                >
                  <option.icon size={13} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-0.5 border rounded-full px-1 py-0.5" style={{ borderColor: 'var(--color-border)' }}>
              {['sm', 'md', 'lg'].map(val => (
                <button
                  key={val}
                  onClick={() => setFontScale(val)}
                  aria-label={`${controls.fontSize} ${val}`}
                  className="px-2 py-1 rounded-full transition-colors cursor-pointer border-none font-bold text-[10px]"
                  style={{
                    background: fontScale === val ? 'var(--color-fg)' : 'transparent',
                    color: fontScale === val ? 'var(--color-bg)' : 'var(--color-fg-muted)',
                  }}
                >
                  {val === 'sm' ? 'A-' : val === 'md' ? 'A' : 'A+'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
