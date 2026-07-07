import { copy } from '../../content';

export default function ValueSection({ lang = 'pl' }) {
  const content = copy[lang]?.value ?? copy.pl.value;
  if (!content) return null;

  const icons = ['01', '02', '03', '04', '05'];

  return (
    <section className="py-24 px-6" id="dlaczego-plyndo" style={{ background: 'var(--color-bg-muted)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-[620px] mx-auto mb-16">
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <span>{content.title}</span>
            <img src="/logo-black.svg" alt="PŁYN DO" className="h-[30px] w-auto sm:h-[36px]" />
          </h2>
          <p className="t-lead mt-4 font-light text-[17px] leading-relaxed text-fg-muted">{content.lead}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((item, idx) => (
            <div key={idx} className="group bg-white border rounded-[20px] p-8 transition-all hover:-translate-y-1 duration-500" style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="font-serif italic text-3xl font-light mb-6 transition-colors duration-500" style={{ color: 'var(--color-fg-subtle)' }}>
                {icons[idx] || `0${idx + 1}`}
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
