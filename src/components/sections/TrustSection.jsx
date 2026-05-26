import { copy } from '../../content';

export default function TrustSection({ lang = 'pl' }) {
  const content = copy[lang].heritage;

  return (
    <section className="py-20 px-6" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[800px] mx-auto text-center">
        <div className="hairline mb-16" />
        <h2 className="t-editorial">
          {content.text}{' '}
          <span style={{ color: 'var(--color-fg-subtle)' }}>{content.highlight}</span>
        </h2>
        <div className="mt-12 flex items-center justify-center">
          <img 
            src="/logo-black.svg"
            alt="Płyndo" 
            className="h-8 object-contain opacity-30"
          />
        </div>
        <div className="hairline mt-16" />
      </div>
    </section>
  );
}
