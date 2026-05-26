import { copy } from '../../content';

export default function ValueSection({ lang = 'pl' }) {
  const content = copy[lang].value;
  if (!content) return null;

  const icons = ['01', '02', '03'];

  return (
    <section className="py-24 px-6" id="value" style={{ background: 'var(--color-bg-muted)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-[620px] mx-auto mb-16">
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-4">{content.title}</h2>
          <p className="t-lead mt-4">{content.lead}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.items.map((item, idx) => (
            <div key={idx} className="bg-white border rounded-[20px] p-8" style={{ borderColor: 'var(--color-border)' }}>
              <div className="font-serif italic text-3xl font-light mb-6" style={{ color: 'var(--color-fg-subtle)' }}>
                {icons[idx]}
              </div>
              <h3 className="t-h4 mb-3">{item.title}</h3>
              <p className="text-[14px] leading-[1.7] text-fg-muted">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
