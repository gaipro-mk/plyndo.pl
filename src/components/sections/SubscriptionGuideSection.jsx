import { ShoppingCart, Bell, CreditCard } from 'lucide-react';
import { copy } from '../../content';

const iconMap = {
  'shopping-cart': ShoppingCart,
  'bell': Bell,
  'credit-card': CreditCard
};

export default function SubscriptionGuideSection({ lang = 'pl' }) {
  const steps = copy[lang].subscriptionLite;

  return (
    <section id="subscription" className="py-24 bg-surface-variant px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
          {steps.map((step, idx) => {
            const Icon = iconMap[step.icon];
            return (
              <div 
                key={step.step}
                className="bg-white border border-border rounded-[24px] px-7 py-8 relative overflow-hidden"
              >
                <span className="font-display font-black text-9xl absolute -bottom-8 -right-4 text-border opacity-30 select-none">
                  {step.step}
                </span>
                <div className="relative z-10">
                  <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center text-white mb-6">
                    {Icon && <Icon size={20} />}
                  </div>
                  <h3 className="t-h4 mb-3">{step.title}</h3>
                  <p className="text-[13.5px] leading-[1.6] text-fg-muted">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
