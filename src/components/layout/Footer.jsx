import { copy } from '../../content';
import { Globe, Mail } from 'lucide-react';

export default function Footer({ lang }) {
  const content = copy[lang];

  return (
    <footer className="bg-surface-container-high w-full py-16 px-6 border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
        <div className="space-y-6 md:col-span-1">
          <div className="text-2xl font-extrabold tracking-tighter text-primary font-headline">
            {content.brand}
          </div>
          <p className="font-body text-sm text-on-surface-variant max-w-sm leading-relaxed">
            {content.footerDesc}
          </p>
          <div className="flex gap-4">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              <Globe className="w-5 h-5" />
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 md:col-span-2 lg:ml-auto lg:w-2/3">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-on-surface mb-6">
              {content.footerCol1.title}
            </h4>
            <ul className="space-y-4">
              {content.footerCol1.links.map((link, idx) => (
                <li key={idx}>
                  <a className="font-body text-sm text-on-surface-variant hover:text-primary transition-all hover:underline" href="#">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-on-surface mb-6">
              {content.footerCol2.title}
            </h4>
            <ul className="space-y-4">
              {content.footerCol2.links.map((link, idx) => (
                <li key={idx}>
                  <a className="font-body text-sm text-on-surface-variant hover:text-primary transition-all hover:underline" href="#">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-xs text-on-surface-variant opacity-80 hover:opacity-100 transition-opacity">
          {content.footerCopyright}
        </p>
        <div className="flex items-center gap-3 grayscale opacity-60">
          <span className="text-[10px] font-bold uppercase tracking-tight text-on-surface-variant">Payment partners:</span>
          <span className="text-xs font-bold px-2 py-1 bg-surface-container-highest rounded border border-outline-variant/20 tracking-widest">BLIK</span>
          <span className="text-xs font-bold px-2 py-1 bg-surface-container-highest rounded border border-outline-variant/20 tracking-widest">VISA</span>
        </div>
      </div>
    </footer>
  );
}
