import { Building2, Home } from 'lucide-react';
import { copy } from '../../content';

function AudiencePanel({ icon, content, tone }) {
  return (
    <article className="grid gap-6 rounded-[24px] border border-border bg-white p-7 md:p-9">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="t-h3">{content.title}</h3>
          <p className="mt-3 max-w-[520px] text-sm leading-relaxed text-fg-muted">{content.copy}</p>
        </div>
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px]"
          style={{ background: tone.bg, color: tone.fg }}
        >
          {icon}
        </span>
      </div>
      <ul className="grid list-none gap-2 p-0 text-sm font-semibold">
        {content.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: tone.fg }} />
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function AudienceSection({ lang = 'pl' }) {
  const content = copy[lang].audience;

  return (
    <section id="use-cases" className="bg-surface-container-low px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-[720px]">
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-3">{content.title}</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <AudiencePanel
            icon={<Home size={23} />}
            content={content.home}
            tone={{ bg: 'var(--label-laundry-bg)', fg: 'var(--label-laundry-on)' }}
          />
          <AudiencePanel
            icon={<Building2 size={23} />}
            content={content.business}
            tone={{ bg: 'var(--label-dish-bg)', fg: 'var(--label-dish-on)' }}
          />
        </div>
      </div>
    </section>
  );
}
