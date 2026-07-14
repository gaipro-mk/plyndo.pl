import { ShoppingCart, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getLeadCaptureHref, getStoreHref, getStoreLabel, isStoreLive } from '../../lib/storeCta';
import { createShoperBasketAndRedirect } from '../../lib/shoperApi';

export default function StoreButton({ lang = 'pl', className = '', note, href, items }) {
  const label = getStoreLabel(lang);
  const storeHref = href ?? getStoreHref();
  const isExternal = storeHref ? storeHref.startsWith('http') : false;
  const defaultNote = lang === 'en'
    ? 'Buy products conveniently and securely in our store.'
    : 'Kup produkty wygodnie i bezpiecznie w naszym sklepie.';
  const comingSoonNote = lang === 'en'
    ? 'The online store is launching soon. Leave your interest via email.'
    : 'Sklep internetowy startuje wkrótce. Zostaw zainteresowanie przez e-mail.';

  const handleApiClick = (e) => {
    if (items && items.length > 0) {
      e.preventDefault();
      createShoperBasketAndRedirect(items);
    }
  };

  const activeBtnClass = "inline-flex w-full min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-300 hover:opacity-90 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-border-strong bg-fg text-bg";

  if (isStoreLive() && items && items.length > 0) {
    return (
      <div className={`grid gap-2 ${className}`}>
        <button
          type="button"
          onClick={handleApiClick}
          className={activeBtnClass}
        >
          <ShoppingCart size={17} aria-hidden="true" />
          {label}
        </button>
        <span className="text-xs leading-relaxed text-fg-muted">{note ?? defaultNote}</span>
      </div>
    );
  }

  if (isStoreLive() && storeHref) {
    if (isExternal) {
      return (
        <div className={`grid gap-2 ${className}`}>
          <a
            href={storeHref}
            target="_blank"
            rel="noopener noreferrer"
            className={activeBtnClass}
          >
            <ShoppingCart size={17} aria-hidden="true" />
            {label}
          </a>
          <span className="text-xs leading-relaxed text-fg-muted">{note ?? defaultNote}</span>
        </div>
      );
    }
    return (
      <div className={`grid gap-2 ${className}`}>
        <Link
          to={storeHref}
          className={activeBtnClass}
        >
          <ShoppingCart size={17} aria-hidden="true" />
          {label}
        </Link>
        <span className="text-xs leading-relaxed text-fg-muted">{note ?? defaultNote}</span>
      </div>
    );
  }

  return (
    <div className={`grid gap-2 ${className}`}>
      <Link
        to="/#pakiety"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-300 hover:opacity-90 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-border-strong bg-fg text-bg"
      >
        {lang === 'en' ? 'View packages' : 'Zobacz pakiety'}
      </Link>
      <a
        href={getLeadCaptureHref(lang)}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-300 hover:opacity-90 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-border bg-bg text-fg"
      >
        <Mail size={17} aria-hidden="true" />
        {label}
      </a>
      <span className="text-xs leading-relaxed text-fg-muted">{note ?? comingSoonNote}</span>
    </div>
  );
}
