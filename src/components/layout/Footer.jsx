import { Link } from 'react-router-dom';

export default function Footer({ lang = 'pl', activeTheme }) {
  const cols = [
    {
      h: lang === 'en' ? 'Information' : 'Informacje',
      l: [
        { label: lang === 'en' ? 'Terms' : 'Regulamin', to: '/regulamin' },
        { label: lang === 'en' ? 'Privacy policy' : 'Polityka prywatności', to: '/polityka-prywatnosci' },
        { label: lang === 'en' ? 'Complaints' : 'Reklamacje', to: '/reklamacje' },
      ],
    },
    {
      h: lang === 'en' ? 'Support' : 'Wsparcie',
      l: [
        { label: lang === 'en' ? 'Contact' : 'Kontakt', to: '/kontakt' },
        { label: 'FAQ', to: '/#faq' },
        { label: lang === 'en' ? 'Packages' : 'Pakiety', to: '/#plans' },
      ],
    },
    {
      h: lang === 'en' ? 'Brand' : 'Marka',
      l: [
        { label: lang === 'en' ? 'About the brand' : 'O marce', to: '/o-marce' },
        { label: lang === 'en' ? 'Producer' : 'Producent', to: '/producent' },
        { label: lang === 'en' ? 'Press' : 'Prasa', to: '/prasa' },
      ],
    },
  ];

  const isDark = activeTheme === 'dark';

  return (
    <footer id="footer" className="border-t mt-0 pt-20 pb-10 px-6" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
          <div>
            <img src={isDark ? '/logo-white.svg' : '/logo-black.svg'} alt="Płyndo" className="h-7 opacity-80" />
            <p className="mt-5 text-fg-muted text-[13px] leading-[1.7] max-w-[300px]">
              {lang === 'en'
                ? 'A household and business cleaning line designed for convenient package orders.'
                : 'Linia płynów do domu i firmy zaprojektowana do wygodnych zamówień pakietowych.'}
            </p>
          </div>
          {cols.map(col => (
            <div key={col.h}>
              <div className="t-eyebrow mb-5">{col.h}</div>
              <ul className="list-none p-0 m-0 grid gap-3">
                {col.l.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-fg-muted text-[13px] no-underline hover:opacity-60 transition-opacity">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="hairline mt-14" />
        <div className="mt-6 flex justify-between items-center gap-4 flex-wrap">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-fg-subtle">
              © 2026 Płyndo.pl · EmiChem · Made in Poland
            </span>
            <span className="text-[10px] text-fg-subtle uppercase tracking-[0.1em] font-medium">
              {lang === 'en' ? 'Producer' : 'Producent'}: Michał Mierzwa EmiChem P.P. Ul. Wójtowska 16, 61-654 Poznań
            </span>
          </div>
          <div className="flex gap-1.5">
            {["BLIK", "PRZELEW", "KARTA", "SHOPER"].map(p => (
              <span 
                key={p} 
                className="text-[10px] font-medium px-2.5 py-1.5 border rounded-full text-fg-subtle tracking-[0.1em]"
                style={{ borderColor: 'var(--color-border)', background: 'transparent' }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
