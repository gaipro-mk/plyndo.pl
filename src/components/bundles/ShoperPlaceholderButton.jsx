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
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-border bg-black px-5 py-3 text-sm font-extrabold text-white opacity-55"
      >
        <ShoppingCart size={17} />
        {label}
      </button>
      <span className="text-xs leading-relaxed text-fg-muted">{note}</span>
    </div>
  );
}
