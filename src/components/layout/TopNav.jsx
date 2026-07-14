import { useState, useEffect, useRef, useId } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Sun, Moon, Monitor, Type } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productRoutePath, products } from '../../data/products';
import { getPackagesHref, getStoreLabel, isStoreLive } from '../../lib/storeCta';

export default function TopNav({
  lang = 'pl',
  setLang,
  theme = 'system',
  setTheme,
  fontScale = 'md',
  setFontScale,
  activeTheme,
}) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const productsMenuRef = useRef(null);
  const productsMenuId = useId();
  const storeHref = isStoreLive() ? 'https://sklep.plyndo.pl' : getPackagesHref(lang);
  const storeExternal = storeHref.startsWith('http');
  const storeLabel = getStoreLabel(lang);

  const NAV = [
    { href: '/#jak-to-dziala', label: lang === 'en' ? 'How it works' : 'Jak to działa' },
    { href: '/#pakiety', label: lang === 'en' ? 'Packages' : 'Pakiety' },
    { type: 'products', label: lang === 'en' ? 'Products' : 'Produkty' },
    { href: '/dla-domu', label: lang === 'en' ? 'For home' : 'Dla domu' },
    { href: '/dla-firm', label: lang === 'en' ? 'For business' : 'Dla firm' },
    { href: '/o-marce', label: lang === 'en' ? 'About' : 'O marce' },
    { href: '/#faq', label: 'FAQ' },
  ];

  const isDark = activeTheme === 'dark';
  const navIsSolid = scrolled || open;
  const navBackground = navIsSolid
    ? (isDark ? 'rgba(12, 11, 9, 0.92)' : 'rgba(255, 255, 255, 0.90)')
    : 'transparent';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (open) return undefined;
    const closeProducts = (event) => {
      if (!productsMenuRef.current?.contains(event.target)) setProductsOpen(false);
    };
    document.addEventListener('mousedown', closeProducts);
    return () => document.removeEventListener('mousedown', closeProducts);
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setProductsOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  function closeMenus() {
    setOpen(false);
    setProductsOpen(false);
  }

  function cycleTheme() {
    const order = ['light', 'dark', 'system'];
    setTheme(order[(order.indexOf(theme) + 1) % order.length]);
  }

  function cycleFontScale() {
    const order = ['sm', 'md', 'lg'];
    setFontScale(order[(order.indexOf(fontScale) + 1) % order.length]);
  }

  const ThemeIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;
  const storeButtonClass =
    'border-none px-5 py-2.5 rounded-full font-medium text-[13px] cursor-pointer inline-flex items-center gap-1.5 transition-all duration-300 hover:opacity-90 no-underline';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navIsSolid ? 'backdrop-blur-md border-b border-border' : 'border-b border-transparent'}`}
      style={{ background: navBackground }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        <Link to="/#top" className="flex items-center" aria-label="Strona główna PŁYN DO">
          <img src={isDark ? '/logo-white.svg' : '/logo-black.svg'} alt="PŁYN DO" className="h-[26px] w-auto" />
        </Link>

        <div className="hidden lg:flex gap-8 items-center">
          {NAV.map((n) => (
            n.type === 'products' ? (
              <div key={n.type} className="relative" ref={productsMenuRef}>
                <button
                  type="button"
                  id={`${productsMenuId}-trigger`}
                  onClick={() => setProductsOpen((value) => !value)}
                  className="inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-60 text-fg-muted"
                  aria-expanded={productsOpen}
                  aria-controls={productsMenuId}
                >
                  {n.label} <ChevronDown size={13} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
                </button>
                {productsOpen && (
                  <div id={productsMenuId} role="menu" className="absolute left-1/2 top-full z-[60] mt-5 w-[760px] -translate-x-1/2 rounded-[18px] border bg-white p-4 shadow-2xl border-border">
                    <div className="grid grid-cols-3 gap-2">
                      {products.map((product) => {
                        const name = product.i18n?.[lang]?.displayName ?? product.name;
                        return (
                          <Link key={product.slug} to={productRoutePath(product)} role="menuitem" onClick={() => setProductsOpen(false)} className="group flex min-w-0 items-center gap-3 rounded-[12px] p-2 no-underline transition-colors text-fg">
                            <span className="h-14 w-11 shrink-0 overflow-hidden rounded-[8px] border bg-white border-border">
                              <img src={product.image} alt={name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-[13px] font-medium">{name}</span>
                              <span className="mt-0.5 block truncate text-[11px] text-fg-subtle">{product.i18n?.[lang]?.scent ?? product.scent}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={n.href} to={n.href} className="text-[13px] font-medium no-underline tracking-wide transition-opacity hover:opacity-60 text-fg-muted">{n.label}</Link>
            )
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-1">
            <button type="button" onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')} className="rounded-full border px-2.5 py-1.5 text-[11px] font-semibold uppercase cursor-pointer border-border text-fg-muted bg-transparent" aria-label={lang === 'en' ? 'Switch to Polish' : 'Przełącz na angielski'}>{lang === 'pl' ? 'PL' : 'EN'}</button>
            <button type="button" onClick={cycleTheme} className="flex h-8 w-8 items-center justify-center rounded-full border cursor-pointer border-border text-fg-muted bg-transparent" aria-label={lang === 'en' ? 'Change theme' : 'Zmień motyw'}><ThemeIcon size={14} /></button>
            <button type="button" onClick={cycleFontScale} className="flex h-8 w-8 items-center justify-center rounded-full border cursor-pointer border-border text-fg-muted bg-transparent" aria-label={lang === 'en' ? 'Change font size' : 'Zmień rozmiar czcionki'}><Type size={14} /></button>
          </div>
          {storeExternal ? (
            <a href={storeHref} target="_blank" rel="noopener noreferrer" className={`${storeButtonClass} bg-fg text-bg`}>{storeLabel} <ArrowRight size={13} /></a>
          ) : (
            <Link to={storeHref} className={`${storeButtonClass} bg-fg text-bg`}>{storeLabel} <ArrowRight size={13} /></Link>
          )}
          <button type="button" className="lg:hidden bg-transparent border-none p-1.5 cursor-pointer text-fg" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav-menu" aria-label={open ? (lang === 'en' ? 'Close menu' : 'Zamknij menu') : 'Menu'}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav-menu" className="border-t px-6 py-4 lg:hidden bg-bg border-border">
          <div className="mb-4 flex flex-wrap gap-2 md:hidden">
            <button type="button" onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')} className="rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase border-border">{lang === 'pl' ? 'PL' : 'EN'}</button>
            <button type="button" onClick={cycleTheme} className="rounded-full border px-3 py-1.5 text-[11px] font-medium border-border">{theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'System'}</button>
            <button type="button" onClick={cycleFontScale} className="rounded-full border px-3 py-1.5 text-[11px] font-medium border-border">A{fontScale === 'sm' ? '−' : fontScale === 'lg' ? '+' : ''}</button>
          </div>
          {NAV.map((n) => (
            n.type === 'products' ? (
              <div key={n.type}>
                <button type="button" onClick={() => setProductsOpen((value) => !value)} className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent py-3 text-left text-[14px] font-medium text-fg" aria-expanded={productsOpen} aria-controls={`${productsMenuId}-mobile`}>{n.label} <ChevronDown size={15} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} /></button>
                {productsOpen && (
                  <div id={`${productsMenuId}-mobile`} className="grid max-h-[52vh] gap-1 overflow-y-auto pb-3">
                    {products.map((product) => {
                      const name = product.i18n?.[lang]?.displayName ?? product.name;
                      return (
                        <Link key={product.slug} to={productRoutePath(product)} onClick={closeMenus} className="flex items-center gap-3 rounded-[12px] py-2 no-underline text-fg">
                          <span className="h-12 w-10 shrink-0 overflow-hidden rounded-[8px] border bg-white border-border"><img src={product.image} alt={name} className="h-full w-full object-cover" /></span>
                          <span><span className="block text-[13px] font-medium">{name}</span><span className="mt-0.5 block text-[11px] text-fg-subtle">{product.i18n?.[lang]?.scent ?? product.scent}</span></span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Link key={n.href} to={n.href} onClick={closeMenus} className="block py-3 font-medium text-[14px] no-underline text-fg">{n.label}</Link>
            )
          ))}
          {storeExternal ? (
            <a href={storeHref} target="_blank" rel="noopener noreferrer" onClick={closeMenus} className="block py-3 font-medium text-[14px] no-underline text-fg">{storeLabel}</a>
          ) : (
            <Link to={storeHref} onClick={closeMenus} className="block py-3 font-medium text-[14px] no-underline text-fg">{storeLabel}</Link>
          )}
        </div>
      )}
    </nav>
  );
}
