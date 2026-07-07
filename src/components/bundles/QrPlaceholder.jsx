import { Download, ExternalLink, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function QrPlaceholder({ src, targetUrl, lang = 'pl', className = '' }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll('button, a[href]');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);
  const svgSrc = src?.replace(/\.(png|jpg|jpeg|webp)$/i, '.svg');

  return (
    <div className={`grid w-full gap-3 rounded-[16px] border border-border bg-white p-4 ${className}`}>
      {src ? (
        <button type="button" onClick={() => setOpen(true)} className="block cursor-zoom-in border-0 bg-transparent p-0 text-left">
          <img
            src={src}
            alt={lang === 'en' ? 'QR code for this product page' : 'Kod QR do tej strony produktu'}
            className="aspect-square w-full rounded-[10px] bg-white object-contain"
          />
        </button>
      ) : (
        <div className="flex aspect-square w-full items-center justify-center rounded-[10px] border border-border bg-white p-6">
          <img src="/logo-black.svg" alt="PŁYN DO" className="h-8 w-auto opacity-70" />
        </div>
      )}
      <div>
        <div className="t-eyebrow">{src ? (lang === 'en' ? 'Product QR' : 'QR produktu') : 'QR'}</div>
        <p className="mt-1 text-xs leading-relaxed text-fg-muted">
          {lang === 'en'
            ? (src ? 'Click to enlarge, download, or scan.' : 'QR code will be added when this page gets a final public target.')
            : (src ? 'Kliknij, aby powiększyć, pobrać albo zeskanować.' : 'Kod QR dodamy po ustawieniu finalnego publicznego adresu.')}
        </p>
      </div>
      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            ref={dialogRef}
            className="grid w-full max-w-[min(92vw,620px)] gap-4 rounded-[20px] bg-white p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="t-eyebrow">{lang === 'en' ? 'Product QR' : 'QR produktu'}</div>
                <p className="mt-1 text-xs text-fg-muted">
                  {lang === 'en' ? 'Ready for scanning and file download.' : 'Gotowy do skanowania i pobrania pliku.'}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={lang === 'en' ? 'Close QR preview' : 'Zamknij podgląd QR'}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-white"
                style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-fg)' }}
              >
                <X size={18} />
              </button>
            </div>
            <img
              src={src}
              alt={lang === 'en' ? 'Enlarged QR code' : 'Powiększony kod QR'}
              className="mx-auto aspect-square w-full max-w-[480px] rounded-[14px] bg-white object-contain"
            />
            <div className="grid gap-2 sm:grid-cols-3">
              <a href={src} download className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium no-underline" style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}>
                <Download size={14} /> PNG
              </a>
              {svgSrc && (
                <a href={svgSrc} download className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium no-underline" style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-fg)' }}>
                  <Download size={14} /> SVG
                </a>
              )}
              {targetUrl && (
                <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium no-underline" style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-fg)' }}>
                  <ExternalLink size={14} /> {lang === 'en' ? 'Open' : 'Otwórz'}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
