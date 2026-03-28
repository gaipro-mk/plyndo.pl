import { copy } from '../../content';

export default function TopNav({ lang, setLang }) {
  const content = copy[lang];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-outline-variant/5">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-headline font-extrabold tracking-tighter text-primary dark:text-primary-fixed">
          {content.brand}
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-primary dark:text-primary-fixed border-b-2 border-primary pb-1 font-headline font-bold tracking-tight" href="#products">
            {content.nav.product}
          </a>
          <a className="text-on-surface-variant dark:text-outline font-medium hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#plans">
            {content.nav.plans}
          </a>
          <a className="text-on-surface-variant dark:text-outline font-medium hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#subscription">
            {content.nav.standard}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
            className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors px-2 py-2"
          >
            {lang === 'pl' ? 'EN' : 'PL'}
          </button>
          <button className="hidden md:block text-on-surface-variant font-medium hover:text-primary px-4 py-2 transition-all active:scale-95 duration-200">
            {content.topNav.clientZone}
          </button>
          <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-primary-container transition-all active:scale-95 duration-200">
            {content.topNav.choosePackage}
          </button>
        </div>
      </div>
    </nav>
  );
}
