// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ShoppingCart, Bell, CreditCard } from 'lucide-react';
import { copy } from '../../content';
import { cn } from '../../lib/utils';

const iconMap = {
  'shopping-cart': ShoppingCart,
  'bell': Bell,
  'credit-card': CreditCard
};

export default function SubscriptionGuideSection({ lang }) {
  const steps = copy[lang].subscriptionLite;

  return (
    <section className="py-24 bg-surface-container-lowest overflow-hidden" id="subscription">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-outline-variant/15 rounded-3xl overflow-hidden shadow-sm">
          {steps.map((step, idx) => {
            const Icon = iconMap[step.icon];
            const isMiddle = idx === 1;
            return (
              <motion.div 
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className={cn(
                  "p-12 relative border-b md:border-b-0 md:border-r border-outline-variant/15 last:border-0",
                  isMiddle && "bg-primary/5"
                )}
              >
                <span className="text-5xl font-black text-primary/10 absolute top-8 right-8">{step.step}</span>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 shadow-md">
                    {Icon && <Icon className="w-7 h-7" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight font-headline">{step.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
