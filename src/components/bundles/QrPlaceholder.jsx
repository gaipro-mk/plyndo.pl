import { QrCode } from 'lucide-react';

export default function QrPlaceholder({ lang = 'pl', compact = false }) {
  return (
    <div className={`grid gap-3 rounded-[16px] border border-border bg-white p-4 ${compact ? 'max-w-[220px]' : ''}`}>
      <div
        aria-hidden="true"
        className="relative aspect-square overflow-hidden rounded-[10px] border border-border bg-white"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, #000 0 7px, transparent 7px 14px), repeating-linear-gradient(0deg, rgba(0,0,0,.9) 0 7px, transparent 7px 14px)',
        }}
      >
        <div className="absolute inset-[22%] flex items-center justify-center rounded bg-white">
          <QrCode size={compact ? 28 : 40} />
        </div>
      </div>
      <div>
        <div className="t-eyebrow">{lang === 'en' ? 'QR placeholder' : 'Placeholder QR'}</div>
        <p className="mt-1 text-xs leading-relaxed text-fg-muted">
          {lang === 'en'
            ? 'The final code will point to the matching Shoper offer.'
            : 'Docelowy kod przekieruje do właściwej oferty w Shoperze.'}
        </p>
      </div>
    </div>
  );
}
