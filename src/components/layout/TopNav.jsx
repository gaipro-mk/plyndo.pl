import { useState, useEffect } from 'react';
import { Menu, X, Globe, ArrowRight, Sun, Moon, Monitor } from 'lucide-react';
import { copy } from '../../content';

export default function TopNav({ lang, setLang, theme, setTheme, fontScale, setFontScale, activeTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const NAV = [
    { href: "#products", label: "Katalog Czystości" },
    { href: "#plans", label: "Pakiety" },
    { href: "#operations", label: "Jak działa" },
    { href: "#faq", label: "FAQ" }
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
        <a href="#top" className="flex items-center">
          <img src={isDark ? '/logo-white.svg' : '/logo-black.svg'} alt="Płyndo" className="h-[30px] w-auto" />
        </a>
        <div className="hidden md:flex gap-7 items-center">
          {NAV.map((n, i) => (
            <a 
              key={n.href} 
              href={n.href}
              className={`text-[13.5px] no-underline pb-0.5 ${i === 0 ? 'font-bold border-b-2 border-current' : 'font-medium border-b-2 border-transparent hover:opacity-100 transition-colors'}`}
              style={{ color: i === 0 ? 'var(--color-fg)' : 'var(--color-fg-muted)' }}
            >
              {n.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          {/* Theme Switcher */}
          <div className="hidden sm:flex items-center gap-0.5 border border-border rounded-full px-1 py-0.5">
            {[
              { val: 'light', icon: Sun, label: 'Jasny' },
              { val: 'dark', icon: Moon, label: 'Ciemny' },
              { val: 'system', icon: Monitor, label: 'System' },
            ].map(({ val, icon: Icon, label }) => (
              <button
                key={val}
                onClick={() => setTheme(val)}
                aria-label={label}
                className="p-1.5 rounded-full transition-colors cursor-pointer border-none"
                style={{
                  background: theme === val ? 'var(--color-fg)' : 'transparent',
                  color: theme === val ? 'var(--color-bg)' : 'var(--color-fg-muted)',
                }}
              >
                <Icon size={13} />
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
            aria-label="Język"
            className="border px-2.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.12em] cursor-pointer flex items-center gap-1.5 transition-colors"
            style={{ 
              background: 'transparent',
              borderColor: 'var(--color-border-strong)',
              color: 'var(--color-fg-muted)',
            }}
          >
            <Globe size={13} />{lang.toUpperCase()}
          </button>
          <button 
            onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
            className="border-none px-[18px] py-[10px] rounded-[10px] font-bold text-[13px] cursor-pointer shadow-cta inline-flex items-center gap-1.5 transition-colors"
            style={{
              background: 'var(--color-fg)',
              color: 'var(--color-bg)',
            }}
          >
            Wybierz pakiet <ArrowRight size={14} />
          </button>
          <button 
            className="md:hidden bg-transparent border-none p-1.5 cursor-pointer"
            style={{ color: 'var(--color-fg)' }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t px-6 py-3 md:hidden shadow-lg" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          {NAV.map(n => (
            <a 
              key={n.href} 
              href={n.href} 
              onClick={() => setOpen(false)}
              className="block py-3 font-semibold no-underline"
              style={{ color: 'var(--color-fg)' }}
            >
              {n.label}
            </a>
          ))}
          {/* Mobile theme/font controls */}
          <div className="flex items-center gap-2 py-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-0.5 border rounded-full px-1 py-0.5" style={{ borderColor: 'var(--color-border)' }}>
              {[
                { val: 'light', icon: Sun },
                { val: 'dark', icon: Moon },
                { val: 'system', icon: Monitor },
              ].map(({ val, icon: Icon }) => (
                <button
                  key={val}
                  onClick={() => setTheme(val)}
                  className="p-1.5 rounded-full transition-colors cursor-pointer border-none"
                  style={{
                    background: theme === val ? 'var(--color-fg)' : 'transparent',
                    color: theme === val ? 'var(--color-bg)' : 'var(--color-fg-muted)',
                  }}
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-0.5 border rounded-full px-1 py-0.5" style={{ borderColor: 'var(--color-border)' }}>
              {['sm', 'md', 'lg'].map(val => (
                <button
                  key={val}
                  onClick={() => setFontScale(val)}
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
