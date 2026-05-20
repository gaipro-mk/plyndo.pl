export default function Footer() {
  const cols = [
    { h: "Informacje", l: ["Regulamin", "Polityka Prywatności", "Reklamacje"] },
    { h: "Wsparcie",   l: ["Kontakt", "FAQ", "Strefa Klienta"] },
    { h: "Marka",      l: ["O nas", "Producent", "Prasa"] },
  ];

  return (
    <footer id="footer" className="bg-surface-variant border-t border-border mt-20 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <img src="/logo-black.svg" alt="Płyndo" className="h-9" />
            <p className="mt-4.5 text-fg-muted text-[13.5px] leading-relaxed max-w-[320px]">
              Dostarczamy profesjonalną jakość chemii bezpośrednio do Twoich drzwi w wygodnym modelu pakietowym.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.h}>
              <div className="t-eyebrow mb-4.5">{col.h}</div>
              <ul className="list-none p-0 m-0 grid gap-3">
                {col.l.map(l => (
                  <li key={l}>
                    <a href="#" className="text-fg-muted text-[13.5px] no-underline hover:text-fg-base transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-border flex justify-between items-center gap-4 flex-wrap">
          <div className="flex flex-col gap-1">
            <span className="text-[11.5px] text-fg-subtle">
              © 2026 Płyndo.pl · Powered by EmiChem · Made in Poland
            </span>
            <span className="text-[10px] text-fg-muted uppercase tracking-widest font-bold opacity-70">
              Producent: Michał Mierzwa EmiChem P.P. Ul. Wójtowska 16, 61-654 Poznań
            </span>
          </div>
          <div className="flex gap-1.5">
            {["BLIK", "PRZELEWY24", "PAYNOW", "VISA"].map(p => (
              <span 
                key={p} 
                className="text-[10px] font-bold px-2.5 py-1.5 bg-white border border-border rounded text-fg-muted tracking-[0.12em]"
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
