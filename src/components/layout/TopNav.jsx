import { useState, useEffect } from 'react';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';
import { copy } from '../../content';

export default function TopNav({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const NAV = [
    { href: "#products", label: "Katalog Czystości" },
    { href: "#plans", label: "Pakiety AI" },
    { href: "#operations", label: "Jak działa" },
    { href: "#faq", label: "FAQ" }
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-180 border-b ${scrolled ? 'bg-white/80 border-border' : 'bg-white/60 border-transparent'} backdrop-blur-[18px]`}>
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-6">
        <a href="#top" className="flex items-center">
          <img src="/logo-black.svg" alt="Płyndo" className="h-[30px] w-auto" />
        </a>
        <div className="hidden md:flex gap-7 items-center">
          {NAV.map((n, i) => (
            <a 
              key={n.href} 
              href={n.href}
              className={`text-[13.5px] no-underline pb-0.5 ${i === 0 ? 'text-fg-base font-bold border-b-2 border-fg-base' : 'text-fg-muted font-medium border-b-2 border-transparent hover:text-fg-base transition-colors'}`}
            >
              {n.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
            aria-label="Język"
            className="bg-transparent border border-border text-fg-muted px-2.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.12em] cursor-pointer flex items-center gap-1.5 hover:text-fg-base transition-colors"
          >
            <Globe size={13} />{lang.toUpperCase()}
          </button>
          <button 
            onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-fg-base text-white border-none px-[18px] py-[10px] rounded-[10px] font-bold text-[13px] cursor-pointer shadow-cta inline-flex items-center gap-1.5 hover:bg-black transition-colors"
          >
            Wybierz pakiet <ArrowRight size={14} />
          </button>
          <button 
            className="md:hidden bg-transparent border-none p-1.5 cursor-pointer text-fg-base"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="bg-white border-t border-border px-6 py-3 md:hidden shadow-lg">
          {NAV.map(n => (
            <a 
              key={n.href} 
              href={n.href} 
              onClick={() => setOpen(false)}
              className="block py-3 text-fg-base font-semibold no-underline"
            >
              {n.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
