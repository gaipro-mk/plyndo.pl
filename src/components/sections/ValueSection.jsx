import { copy } from '../../content';
import { CheckCircle2 } from 'lucide-react';

export default function ValueSection({ lang = 'pl' }) {
  const content = copy[lang].value;

  if (!content) return null;

  return (
    <section className="py-24 bg-surface px-6" id="value">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <span className="t-eyebrow">
            {content.eyebrow}
          </span>
          <h2 className="t-h1 mt-3">
            {content.title}
          </h2>
          <p className="t-lead mt-3.5">
            {content.lead}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-border p-8 rounded-[24px]"
            >
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-6 text-white">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="t-h4 mb-3">
                {item.title}
              </h3>
              <p className="text-[13.5px] leading-[1.6] text-fg-muted">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
