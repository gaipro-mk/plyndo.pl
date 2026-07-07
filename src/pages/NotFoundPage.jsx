import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFoundPage({ lang = 'pl' }) {
  const copy = lang === 'en'
    ? {
        eyebrow: '404',
        title: 'Page not found',
        lead: 'The address you entered does not match any page on plyndo.pl.',
        home: 'Back to home',
        packages: 'See packages',
      }
    : {
        eyebrow: '404',
        title: 'Nie znaleziono strony',
        lead: 'Adres, który wpisałeś, nie pasuje do żadnej podstrony na plyndo.pl.',
        home: 'Wróć na stronę główną',
        packages: 'Zobacz pakiety',
      };

  return (
    <main id="main" className="flex min-h-[70vh] items-center px-6 pb-24 pt-[140px]" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-xl text-center">
        <span className="t-eyebrow">{copy.eyebrow}</span>
        <h1 className="t-display-2 mt-4">{copy.title}</h1>
        <p className="t-lead mt-5">{copy.lead}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium no-underline"
            style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}
          >
            <Home size={16} />
            {copy.home}
          </Link>
          <Link
            to="/#pakiety"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[14px] font-medium no-underline"
            style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-fg)' }}
          >
            {copy.packages}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
