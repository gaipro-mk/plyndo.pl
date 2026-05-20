import { useState } from 'react';
import { copy } from '../../content';
import { Home, Dog, Baby, Check, Sparkles } from 'lucide-react';

function Step({ label, children }) {
  return (
    <div>
      <div className="t-eyebrow text-[#1e4c7a] mb-3">{label}</div>
      {children}
    </div>
  );
}

function AddOn({ children }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold">
      <Check size={14} className="text-green-500" /> {children}
    </div>
  );
}

export default function AiAssistantSection({ lang = 'pl' }) {
  const [area, setArea] = useState(60);
  const [traits, setTraits] = useState(["Dzieci"]);
  const [surfaces, setSurfaces] = useState([]);
  const [freq, setFreq] = useState("Co 2 miesiące");

  const toggle = (s, v) => s.includes(v) ? s.filter(x => x !== v) : [...s, v];

  let pkgName = "MINI", pkgPrice = "89", pkgCount = 5;
  if (area > 50 && area <= 120) { pkgName = "MIDI"; pkgPrice = "129"; pkgCount = 7; }
  else if (area > 120)          { pkgName = "MAXI"; pkgPrice = "189"; pkgCount = 9; }

  const products = [
    { id: '1', sub: 'PODŁÓG DREWNIANYCH', bg: '#d4a373' },
    { id: '2', sub: 'SZYB I LUSTER', bg: '#caf0f8' },
    { id: '3', sub: 'ŁAZIENKI', bg: '#ffc8dd' },
    { id: '4', sub: 'NACZYŃ', bg: '#fefae0' },
    { id: '5', sub: 'KUCHNI', bg: '#e9edc9' },
    { id: '6', sub: 'PRANIA', bg: '#ccd5ae' },
    { id: '7', sub: 'PŁUKANIA', bg: '#faedcd' },
    { id: '8', sub: 'WC', bg: '#bde0fe' },
    { id: '9', sub: 'DEZYNFEKCJI', bg: '#ffb5a7' }
  ];
  
  const picks = products.slice(0, pkgCount);

  return (
    <section id="advisor" className="py-24 bg-surface-variant px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-[720px] mx-auto mb-14">
          <span className="t-eyebrow">Jak to działa</span>
          <h2 className="t-h1 mt-3">Doradca Czystości.</h2>
          <p className="t-lead mt-3.5">
            Cztery pytania &mdash; jeden pakiet dopasowany do tego, jak Twój dom naprawdę żyje.
            Bez konta, bez maila, bez nudnej ankiety.
          </p>
        </div>

        <div className="bg-white rounded-[32px] p-9 border border-border shadow-sm grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">
          <div className="grid gap-8">
            <Step label="Wielkość Twojego domu">
              <div className="flex justify-between items-baseline">
                <span className="text-[13px] text-fg-muted">20 – 250 m²</span>
                <span className="font-display font-black text-3xl tracking-[-0.04em]">
                  {area} <span className="text-[14px] text-fg-muted font-medium">m²</span>
                </span>
              </div>
              <input 
                type="range" min="20" max="250" step="5" value={area}
                onChange={e => setArea(+e.target.value)}
                className="w-full mt-2 accent-[#1e4c7a]"
              />
            </Step>

            <Step label="Dodatkowe uwarunkowania">
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { l: "Zwierzęta", I: Dog },
                  { l: "Dzieci",    I: Baby },
                  { l: "Alergicy",  I: Home },
                ].map(({l, I}) => {
                  const active = traits.includes(l);
                  return (
                    <button 
                      key={l} 
                      onClick={() => setTraits(toggle(traits, l))} 
                      className={`p-4 rounded-xl flex flex-col gap-2 items-center cursor-pointer font-bold text-[12.5px] transition-colors ${
                        active 
                          ? "border-2 border-[#1e4c7a] bg-[#1e4c7a]/[0.06] text-[#1e4c7a]" 
                          : "border border-border bg-white text-fg-muted"
                      }`}
                    >
                      <I size={20}/> {l}
                    </button>
                  );
                })}
              </div>
            </Step>

            <Step label="Jakie powierzchnie dominują?">
              <div className="flex flex-wrap gap-2">
                {["Podłogi drewniane", "Płytki / Terakota", "Duże przeszklenia", "Trudne zabrudzenia"].map(s => {
                  const active = surfaces.includes(s);
                  return (
                    <button 
                      key={s} 
                      onClick={() => setSurfaces(toggle(surfaces, s))} 
                      className={`px-3.5 py-2 rounded-full text-[13px] font-medium cursor-pointer transition-colors ${
                        active 
                          ? "border border-black bg-black text-white" 
                          : "border border-border bg-white text-black"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </Step>

            <Step label="Częstotliwość dostaw">
              <div className="flex p-1 bg-surface-variant rounded-xl">
                {["Co miesiąc", "Co 2 miesiące", "Co 3 miesiące"].map(o => (
                  <button 
                    key={o} 
                    onClick={() => setFreq(o)} 
                    className={`flex-1 p-2.5 rounded-lg border-none font-bold text-[12.5px] cursor-pointer transition-colors ${
                      freq === o 
                        ? "bg-white text-black shadow-xs" 
                        : "bg-transparent text-fg-muted"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </Step>
          </div>

          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-gradient-to-br from-[#1e4c7a]/[0.08] to-transparent border border-[#1e4c7a]/20 rounded-[24px] p-7 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#1e4c7a] text-white flex items-center justify-center shadow-[0_6px_14px_rgba(30,76,122,0.35)]">
                  <Sparkles size={18}/>
                </div>
                <div>
                  <div className="t-eyebrow text-[#1e4c7a]">Rekomendacja AI</div>
                  <div className="text-[11.5px] italic text-fg-muted">Na podstawie Twoich odpowiedzi</div>
                </div>
              </div>

              <h3 className="t-h3 mt-4.5">Pakiet {pkgName}</h3>
              <p className="mt-1.5 text-[13px] text-fg-muted leading-[1.5]">
                {pkgName === "MINI" && "Optymalny dla mniejszych mieszkań i wolniejszych cykli."}
                {pkgName === "MIDI" && "Najlepszy balans wygody i wartości dla rodzin."}
                {pkgName === "MAXI" && "Większy wolumen dla biur i dużych domów."}
              </p>

              {(traits.length > 0 || surfaces.length > 0) && (
                <div className="mt-4.5 p-3.5 bg-white/60 border border-border rounded-xl grid gap-2">
                  <div className="text-[10px] font-extrabold tracking-[0.12em] uppercase text-fg-muted">
                    Automatycznie dodano
                  </div>
                  {traits.includes("Zwierzęta") && <AddOn>JAX 44 — eliminator zapachów</AddOn>}
                  {traits.includes("Dzieci")    && <AddOn>Formuła hipoalergiczna</AddOn>}
                  {surfaces.includes("Podłogi drewniane") && <AddOn>Podwójna dawka: JAX 14 (drewno)</AddOn>}
                  {surfaces.includes("Duże przeszklenia") && <AddOn>Ultra Glass Cleaner — zwiększona obj.</AddOn>}
                </div>
              )}

              <div className="mt-5.5 pt-4.5 border-t border-border">
                <div className="flex justify-between mb-3">
                  <span className="t-eyebrow text-[#1e4c7a]">Zawartość paczki</span>
                  <span className="text-[11px] font-bold px-2 py-1 bg-surface-variant rounded-md">
                    {picks.length} butelek
                  </span>
                </div>
                <div className="grid gap-2">
                  {picks.map(p => (
                    <div key={p.id} className="flex items-center gap-2.5 text-[12.5px]">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.bg }}/>
                      <span className="font-medium">PŁYN DO {p.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5.5 pt-4.5 border-t border-border flex justify-between items-end gap-3">
                <div>
                  <div className="font-display font-black text-4xl tracking-[-0.04em] leading-none text-[#1e4c7a]">
                    {pkgPrice} <span className="text-lg">zł</span>
                  </div>
                  <div className="text-[11px] text-fg-muted mt-0.5">/ wysyłka {freq.toLowerCase()}</div>
                </div>
                <button 
                  onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-black text-white border-none px-4.5 py-3 rounded-[10px] font-extrabold text-[13px] cursor-pointer shadow-cta"
                >
                  Wybierz ten pakiet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
