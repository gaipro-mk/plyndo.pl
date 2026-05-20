import { useState } from 'react';
import { copy } from '../../content';
import { Check, ArrowRight, Info } from 'lucide-react';

const TIER_SKINS = {
  MINI: { bg: "#9ecbe8", fg: "#1e4c7a", subtle: "rgba(30,76,122,.75)", line: "color-mix(in oklab, #1e4c7a 18%, transparent)",
          btnBg: "rgba(255,255,255,.55)", btnFg: "#1e4c7a", btnBorder: "1px solid #1e4c7a" },
  MIDI: { bg: "#2550a4", fg: "#ffffff", subtle: "rgba(255,255,255,.75)", line: "rgba(255,255,255,.18)",
          btnBg: "#ffffff", btnFg: "#2550a4", btnBorder: "none" },
  MAXI: { bg: "#2b5a40", fg: "#ffffff", subtle: "rgba(255,255,255,.75)", line: "rgba(255,255,255,.18)",
          btnBg: "transparent", btnFg: "#ffffff", btnBorder: "1px solid #ffffff" },
};

export default function PlansSection({ lang = 'pl' }) {
  const content = copy[lang].plans;
  const [focusedTier, setFocusedTier] = useState("MIDI");

  if (!content) return null;

  return (
    <section id="plans" className="py-24 bg-surface px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-3">
            {content.title}
          </h2>
          <p className="t-lead mt-4">
            {content.lead}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.08fr_1fr] gap-5.5 items-stretch">
          {content.cards.map((plan) => {
            const isHero = plan.name === focusedTier;
            const skin = TIER_SKINS[plan.name] || TIER_SKINS.MIDI;
            
            return (
              <div 
                key={plan.name} 
                onClick={() => setFocusedTier(plan.name)}
                className={`relative rounded-[28px] p-8 pb-7 cursor-pointer transition-all duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
                style={{
                  background: skin.bg, 
                  color: skin.fg,
                  border: `1px solid ${skin.line}`,
                  boxShadow: isHero ? "var(--shadow-lg)" : "var(--shadow-sm)",
                  transform: isHero ? "translateY(-6px)" : "none",
                }}
              >
                {isHero && (
                  <span 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-[10px] font-extrabold tracking-[0.12em] uppercase whitespace-nowrap"
                    style={{ color: skin.bg }}
                  >
                    Najczęściej wybierany
                  </span>
                )}
                <div className="font-display font-black text-4xl tracking-[-0.04em] leading-none">
                  {plan.name}
                </div>
                <div 
                  className="mt-1.5 text-[11px] font-extrabold tracking-[0.12em] uppercase"
                  style={{ color: skin.subtle }}
                >
                  {plan.audience}
                </div>

                <p 
                  className="mt-4 font-serif italic font-medium text-[17px] leading-[1.3] min-h-[44px]"
                  style={{ color: skin.fg }}
                >
                  {plan.cadence}
                </p>

                <ul className="list-none p-0 m-0 my-5 grid gap-3">
                  {plan.bullets.map(b => (
                    <li key={b} className="flex gap-2.5 items-start">
                      <Check size={18} className="shrink-0 mt-px" style={{ color: skin.fg }}/>
                      <span className="text-[13px] leading-[1.5]" style={{ color: skin.subtle }}>{b}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className="w-full mt-auto py-3.5 rounded-xl font-extrabold text-sm cursor-pointer inline-flex items-center justify-center gap-2 font-sans transition-shadow"
                  style={{
                    background: skin.btnBg, 
                    color: skin.btnFg, 
                    border: skin.btnBorder,
                    boxShadow: isHero ? "var(--shadow-cta)" : "none",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById("advisor")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Skomponuj {plan.name} <ArrowRight size={16}/>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white border border-border rounded-[24px] px-8 py-7 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-center">
          <div>
            <h3 className="t-h4 m-0">{content.modulesTitle}</h3>
            <div className="flex items-center gap-1.5 mt-1.5 text-[13px] text-fg-muted">
              <Info size={14}/> 8 niezawodnych formuł + 2 specjalistyczne
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Podłogi", "Szyby", "Łazienka", "Mydło", "Pranie", "Płukanie", "Naczynia", "Zmywarka", "WC", "Dezynfekcja"].map(m => (
              <span 
                key={m} 
                className="bg-surface border border-border text-fg-muted px-3.5 py-2 rounded-[10px] text-[13px] font-medium"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
