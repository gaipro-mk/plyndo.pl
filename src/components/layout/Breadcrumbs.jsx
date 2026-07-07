import { ChevronRight, House } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items, lang = 'pl', tone = 'default' }) {
  const toneClass = tone === 'inverse'
    ? 'text-current [&_a]:text-current'
    : 'text-fg-muted [&_a]:text-fg-muted';

  return (
    <nav aria-label={lang === 'en' ? 'Breadcrumb' : 'Okruszki'} className={`flex flex-wrap items-center gap-1.5 text-xs font-bold ${toneClass}`}>
      <Link to="/" className="inline-flex items-center gap-1 no-underline hover:opacity-75">
        <House size={13} />
        {lang === 'en' ? 'Home' : 'Strona główna'}
      </Link>
      {items.map((item) => (
        <span key={`${item.label}-${item.to ?? 'current'}`} className="inline-flex min-w-0 items-center gap-1.5">
          <ChevronRight size={13} className="shrink-0 opacity-55" />
          {item.to ? (
            <Link to={item.to} className="truncate no-underline hover:opacity-75">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="truncate opacity-80">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
