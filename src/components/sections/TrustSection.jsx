import { copy } from '../../content';

export default function TrustSection({ lang = 'pl', activeTheme }) {
  const content = copy[lang].heritage;

  return (
    <section className="bg-black py-16 overflow-hidden">
      <div className="max-w-[880px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex-1">
          <h2 className="t-h3 text-white">
            {content.text}{' '}
            <span className="text-white/70 italic">{content.highlight}</span>
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <img 
            src="/logo-white.svg"
            alt="Płyndo" 
            className="h-12 object-contain opacity-80"
          />
        </div>
      </div>
    </section>
  );
}
