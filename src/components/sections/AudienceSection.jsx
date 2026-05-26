import { Building2, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { copy } from '../../content';

function AudiencePanel({ icon, content, accent, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-6 rounded-[20px] border bg-white p-7 md:p-9"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="t-h3">{content.title}</h3>
          <p className="mt-3 max-w-[520px] text-[13px] leading-relaxed text-fg-muted">{content.copy}</p>
        </div>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}
        >
          {icon}
        </span>
      </div>
      <ul className="grid list-none gap-2.5 p-0 text-[13px] font-medium">
        {content.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-2.5">
            <span className="color-dot" style={{ background: accent }} />
            {bullet}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function AudienceSection({ lang = 'pl' }) {
  const content = copy[lang].audience;

  return (
    <section id="use-cases" className="px-6 py-24" style={{ background: 'var(--color-bg-muted)' }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-[620px]"
        >
          <span className="t-eyebrow">{content.eyebrow}</span>
          <h2 className="t-h1 mt-4">{content.title}</h2>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-2">
          <AudiencePanel
            icon={<Home size={20} />}
            content={content.home}
            accent="var(--label-laundry-bg)"
            index={0}
          />
          <AudiencePanel
            icon={<Building2 size={20} />}
            content={content.business}
            accent="var(--label-dish-bg)"
            index={1}
          />
        </div>
      </div>
    </section>
  );
}
