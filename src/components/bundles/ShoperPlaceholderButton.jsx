import { ShoppingCart } from 'lucide-react';

export default function ShoperPlaceholderButton({ lang = 'pl', className = '' }) {
  const label = lang === 'en' ? 'Shoper checkout coming soon' : 'Koszyk Shoper wkrótce';
  const note = lang === 'en'
    ? 'The ready package composition will be passed to Shoper after integration.'
    : 'Po integracji skład paczki trafi do gotowego koszyka Shoper.';

  return (
    <div className={`grid gap-2 ${className}`}>
      <button
        type="button"
        disabled
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium opacity-45"
        style={{ borderColor: 'var(--color-border-strong)', background: 'var(--color-fg)', color: 'var(--color-bg)' }}
      >
        <ShoppingCart size={17} />
        {label}
      </button>
      <span className="text-xs leading-relaxed text-fg-muted">{note}</span>
    </div>
  );
}
