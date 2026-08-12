import { ShoppingCart, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildShoperHandoffUrl } from '../../lib/shoperApi';
import { getStoreHref, getStoreLabel, isStoreLive, getLeadCaptureHref } from '../../lib/storeCta';

export default function StoreButton({ items, packSize, bundleLabel, lang = 'pl', className = '', note, href, disabled }) {
  let handoffUrl = null;
  let handoffError = null;

  if (items && items.length > 0) {
    try {
      const computedPackSize = packSize ?? items.reduce((sum, i) => sum + Number(i.quantity || 1), 0);
      handoffUrl = buildShoperHandoffUrl(items, computedPackSize, { label: bundleLabel });
    } catch (err) {
      handoffError = err.message;
    }
  } else if (href) {
    handoffUrl = href;
  } else {
    handoffUrl = getStoreHref();
  }

  const defaultLabel = getStoreLabel(lang);
  const defaultNote = lang === 'en'
    ? 'Buy products conveniently and securely in our store.'
    : 'Kup produkty wygodnie i bezpiecznie w naszym sklepie.';

  const activeBtnClass = `inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-border-strong ${
    disabled
      ? 'opacity-40 cursor-not-allowed bg-fg-muted text-bg border-none pointer-events-none'
      : 'cursor-pointer hover:opacity-90 bg-fg text-bg'
  }`;

  if (disabled) {
    return (
      <div className={`grid gap-2 ${className}`}>
        <button
          type="button"
          disabled
          className={activeBtnClass}
        >
          <ShoppingCart size={17} aria-hidden="true" />
          {defaultLabel}
        </button>
        <span className="text-xs leading-relaxed text-fg-muted">{note ?? defaultNote}</span>
      </div>
    );
  }

  if (handoffError) {
    return (
      <div className={`grid gap-2 ${className}`}>
        <button
          disabled
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium opacity-50 cursor-not-allowed"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-muted)', color: 'var(--color-fg-muted)' }}
        >
          <ShoppingCart size={17} aria-hidden="true" />
          {defaultLabel}
        </button>
        <span className="text-xs text-red-600 dark:text-red-400 leading-relaxed font-medium">{handoffError}</span>
      </div>
    );
  }

  if (handoffUrl && isStoreLive()) {
    const isExternal = handoffUrl.startsWith('http');
    if (isExternal) {
      return (
        <div className={`grid gap-2 ${className}`}>
          <a
            href={handoffUrl}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-300 hover:opacity-90 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ borderColor: 'var(--color-border-strong)', background: 'var(--color-fg)', color: 'var(--color-bg)', outlineColor: 'var(--color-border-focus)' }}
          >
            <ShoppingCart size={17} aria-hidden="true" />
            {defaultLabel}
          </a>
          <span className="text-xs leading-relaxed text-fg-muted">{note ?? defaultNote}</span>
        </div>
      );
    }
    return (
      <div className={`grid gap-2 ${className}`}>
        <Link
          to={handoffUrl}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-300 hover:opacity-90 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ borderColor: 'var(--color-border-strong)', background: 'var(--color-fg)', color: 'var(--color-bg)', outlineColor: 'var(--color-border-focus)' }}
        >
          <ShoppingCart size={17} aria-hidden="true" />
          {defaultLabel}
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
        {defaultLabel}
      </a>
    </div>
  );
}
