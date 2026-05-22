import { copy } from '../../content';
import { Package, Percent, ShoppingCart } from 'lucide-react';

export default function OperationsSection({ lang = 'pl' }) {
  const content = copy[lang].operations;

  if (!content) return null;

  // Assuming content.steps exists and has 3 items
  const steps = content.steps || [];
  const icons = [Package, Percent, ShoppingCart];

  return (
    <section id="how" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-[720px] mx-auto mb-14 text-center">
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-3">{content.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
          {steps.slice(0, 3).map((step, i) => {
            const Icon = icons[i] || Package;
            return (
              <div 
                key={step.step || i} 
                className="bg-surface border border-border rounded-[24px] px-7 py-8"
              >
                <div className="flex justify-between items-start">
                  <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center">
                    <Icon size={20}/>
                  </div>
                  <span className="font-display font-black text-[42px] tracking-[-0.04em] text-border leading-none">
                    {step.step || (i + 1)}
                  </span>
                </div>
                <h3 className="t-h4 mt-5">{step.title}</h3>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-fg-muted">{step.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
