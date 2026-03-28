import { Moon, Sun, Monitor, Smartphone, Tablet, Type } from 'lucide-react';
import { copy } from '../../content';

export default function TopNav({ 
  lang, setLang,
  theme, setTheme,
  fontScale, setFontScale,
  resolution, setResolution
}) {
  const content = copy[lang];

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  const cycleFontScale = () => {
    if (fontScale === 'sm') setFontScale('md');
    else if (fontScale === 'md') setFontScale('lg');
    else setFontScale('sm');
  };

  const cycleResolution = () => {
    if (resolution === 'desktop') setResolution('mobile');
    else if (resolution === 'mobile') setResolution('tablet');
    else setResolution('desktop');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center px-4 sm:px-6 py-4 max-w-7xl mx-auto gap-y-4">
        <div className="text-xl sm:text-2xl font-headline font-extrabold tracking-tighter text-primary">
          {content.brand}
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-primary border-b-2 border-primary pb-1 font-headline font-bold tracking-tight" href="#products">
            {content.nav.product}
          </a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors" href="#plans">
            {content.nav.plans}
          </a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors" href="#subscription">
            {content.nav.standard}
          </a>
        </div>
        
        {/* Switchers & CTA */}
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
          
          <div className="flex items-center bg-surface-container-low rounded-full p-1 border border-outline-variant/10 shadow-sm mr-0 md:mr-2">
            {/* Resolution Switcher */}
            <button 
              onClick={cycleResolution} 
              className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors relative group"
              title="Toggle Resolution"
            >
              {resolution === 'desktop' && <Monitor size={16} strokeWidth={2.5}/>}
              {resolution === 'tablet' && <Tablet size={16} strokeWidth={2.5}/>}
              {resolution === 'mobile' && <Smartphone size={16} strokeWidth={2.5}/>}
            </button>

            {/* Font Switcher */}
            <button 
              onClick={cycleFontScale} 
              className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors relative group"
              title={`Font Size: ${fontScale}`}
            >
              <Type size={16} strokeWidth={2.5}/>
              {fontScale !== 'md' && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping bg-primary absolute inline-flex h-full w-full rounded-full opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary text-[8px] text-white items-center justify-center font-bold">
                    {fontScale === 'sm' ? '-' : '+'}
                  </span>
                </span>
              )}
            </button>

            {/* Theme Switcher */}
            <button 
              onClick={cycleTheme} 
              className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors relative group"
              title={`Theme: ${theme}`}
            >
              {theme === 'light' ? <Sun size={16} strokeWidth={2.5}/> : <Moon size={16} strokeWidth={2.5}/>}
              {theme === 'system' && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary text-[8px] text-white items-center justify-center font-bold">A</span>
                </span>
              )}
            </button>

            {/* Lang Toggle */}
            <button 
              onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
              className="px-2 py-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors border-l border-outline-variant/10 ml-1"
            >
              {lang === 'pl' ? 'EN' : 'PL'}
            </button>
          </div>

          <button className="hidden xl:block text-on-surface-variant font-medium hover:text-primary px-4 py-2 transition-all active:scale-95 duration-200">
            {content.topNav.clientZone}
          </button>
          <button className="bg-primary text-on-primary px-5 md:px-6 py-2 md:py-2.5 rounded-lg font-bold text-sm hover:bg-primary-container shadow-md shadow-primary/20 transition-all active:scale-95 duration-200">
            {content.topNav.choosePackage}
          </button>
        </div>
      </div>
    </nav>
  );
}
