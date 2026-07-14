import { Link } from 'react-router-dom';
import { getPackagesHref, isStoreLive } from '../../lib/storeCta';

export default function Footer({ lang = 'pl', activeTheme }) {
  const shopLink = isStoreLive()
    ? { label: lang === 'en' ? 'Store' : 'Sklep', to: 'https://sklep.plyndo.pl', external: true }
    : { label: lang === 'en' ? 'Packages' : 'Pakiety', to: getPackagesHref(lang), external: false };

  const cols = [
    {
      h: 'PŁYN DO',
      l: [
        { label: 'Jak to działa', to: '/#jak-to-dziala' },
        { label: 'Pakiety', to: '/#pakiety' },
        { label: 'Dla domu', to: '/dla-domu' },
        { label: 'Dla firm', to: '/dla-firm' },
        { label: 'O marce', to: '/o-marce' },
        { label: 'FAQ', to: '/#faq' },
      ],
    },
    {
      h: 'Informacje',
      l: [
        shopLink,
        { label: lang === 'en' ? 'Terms' : 'Regulamin', to: '/regulamin' },
        { label: lang === 'en' ? 'Privacy policy' : 'Polityka prywatności', to: '/polityka-prywatnosci' },
        { label: lang === 'en' ? 'Complaints' : 'Reklamacje', to: '/reklamacje' },
        { label: lang === 'en' ? 'Contact' : 'Kontakt', to: '/kontakt' },
      ],
    },
  ];

  const isDark = activeTheme === 'dark';

  return (
    <footer id="footer" className="border-t mt-0 pt-20 pb-10 px-6 border-border bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-12">
          <div>
            <img src={isDark ? '/logo-white.svg' : '/logo-black.svg'} alt="PŁYN DO" className="h-7 opacity-80" />
            <p className="mt-5 text-fg-muted text-[13px] leading-[1.7] max-w-[300px]">
              PŁYN DO – polska marka chemii gospodarczej. Płyny do domu i firmy w pakietach 4, 8 i 12 butelek.
            </p>
            <p className="mt-4 text-[11px] leading-relaxed text-fg-subtle max-w-[420px] uppercase tracking-[0.08em]">
              Producent: EmiChem Michał Mierzwa, Polska – chemia gospodarcza domowa i instytucjonalna.
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
              <a href="mailto:kontakt@plyndo.pl" className="text-fg-muted no-underline hover:opacity-60 transition-opacity">
                kontakt@plyndo.pl
              </a>
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium border-border">
              <span className="grid h-4 w-6 grid-cols-1 overflow-hidden rounded-[2px] border border-border">
                <span style={{ background: '#ffffff' }} />
                <span style={{ background: '#dc143c' }} />
              </span>
              Made in Poland
            </div>
          </div>
          {cols.map(col => (
            <div key={col.h}>
              <div className="t-eyebrow mb-5">{col.h}</div>
              <ul className="list-none p-0 m-0 grid gap-3">
                {col.l.map((link) => (
                  <li key={link.to}>
                    {link.external ? (
                      <a href={link.to} target="_blank" rel="noopener noreferrer" className="text-fg-muted text-[13px] no-underline hover:opacity-60 transition-opacity">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className="text-fg-muted text-[13px] no-underline hover:opacity-60 transition-opacity">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex justify-between items-center gap-4 flex-wrap">
          <span className="text-[11px] text-fg-subtle">
            © {new Date().getFullYear()} PŁYN DO
          </span>
        </div>
      </div>
    </footer>
  );
}
