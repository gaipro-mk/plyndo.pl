import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, PackageCheck } from 'lucide-react';

const legalPlaceholder = {
  pl: 'Placeholder do uzupełnienia przed publikacją sklepu i realnej integracji Shoper.',
  en: 'Placeholder to complete before the store and the real Shoper integration go live.',
};

const pages = {
  'o-marce': {
    pl: {
      eyebrow: 'O marce',
      title: 'Płyndo.pl otwiera profesjonalną jakość na mniejsze zamówienia.',
      intro:
        'Płyndo powstało dla domów oraz małych i średnich firm, które chcą kupować litrowe płyny w rozsądnych paczkach zamiast kompletować ciężki zapas pojedynczo.',
      blocks: [
        {
          title: 'Nowa linia dystrybucji',
          copy:
            'Płyndo.pl sprzedaje obecną linię w kartonach 4, 8 i Starter 10. Ten model upraszcza logistykę, pozwala lepiej policzyć rabat paczki i daje klientowi wygodne uzupełnianie zapasu.',
        },
        {
          title: 'Zaplecze jakości',
          copy:
            'Linia Płyndo jest produkowana dla EmiChem przez JAX Professional, polską rodzinną firmę od dekad działającą w profesjonalnej chemii czystości. Płyndo pozostaje oddzielną marką skierowaną do domów oraz mniejszych zastosowań firmowych.',
        },
      ],
    },
    en: {
      eyebrow: 'About',
      title: 'Plyndo.pl opens professional quality to smaller orders.',
      intro:
        'Plyndo is built for homes and small or medium businesses that want litre cleaning liquids in sensible boxes instead of building a heavy stock one bottle at a time.',
      blocks: [
        {
          title: 'A new distribution line',
          copy:
            'Plyndo.pl sells the current line in boxes of 4, 8, and Starter 10. This model simplifies logistics, makes package discounts clear, and keeps replenishment flexible.',
        },
        {
          title: 'Quality background',
          copy:
            'The Plyndo line is produced for EmiChem by JAX Professional, a Polish family company with decades in professional cleaning chemistry. Plyndo remains a separate brand for homes and smaller business uses.',
        },
      ],
    },
  },
  kontakt: {
    icon: Mail,
    pl: {
      eyebrow: 'Kontakt',
      title: 'Kontakt sprzedażowy Płyndo.pl',
      intro:
        'Tu pojawią się docelowe kanały obsługi klienta, dane do zamówień oraz instrukcja kontaktu dla paczek domu i firmy.',
      blocks: [
        { title: 'Obsługa paczek', copy: legalPlaceholder.pl },
        { title: 'Dane robocze', copy: 'Adres producenta pozostaje widoczny w stopce strony.' },
      ],
    },
    en: {
      eyebrow: 'Contact',
      title: 'Plyndo.pl sales contact',
      intro: 'Final customer service channels and order contact details will be added here.',
      blocks: [
        { title: 'Package support', copy: legalPlaceholder.en },
        { title: 'Working details', copy: 'The producer address remains visible in the footer.' },
      ],
    },
  },
  regulamin: {
    pl: { eyebrow: 'Dokument', title: 'Regulamin', intro: legalPlaceholder.pl, blocks: [] },
    en: { eyebrow: 'Document', title: 'Terms', intro: legalPlaceholder.en, blocks: [] },
  },
  'polityka-prywatnosci': {
    pl: { eyebrow: 'Dokument', title: 'Polityka prywatności', intro: legalPlaceholder.pl, blocks: [] },
    en: { eyebrow: 'Document', title: 'Privacy policy', intro: legalPlaceholder.en, blocks: [] },
  },
  reklamacje: {
    pl: {
      eyebrow: 'Obsługa',
      title: 'Reklamacje',
      intro: legalPlaceholder.pl,
      blocks: [{ title: 'Zakres', copy: 'Przed startem sklepu dopiszemy procedurę zwrotów, reklamacji i dane kontaktowe.' }],
    },
    en: {
      eyebrow: 'Support',
      title: 'Complaints',
      intro: legalPlaceholder.en,
      blocks: [{ title: 'Scope', copy: 'Returns, complaint steps, and contact details will be added before launch.' }],
    },
  },
  producent: {
    icon: MapPin,
    pl: {
      eyebrow: 'Producent',
      title: 'Dane producenta',
      intro: 'Michał Mierzwa EmiChem P.P., ul. Wójtowska 16, 61-654 Poznań.',
      blocks: [{ title: 'Zakres strony', copy: 'Landing prezentuje linię Płyndo.pl oraz sposób zakupu w paczkach.' }],
    },
    en: {
      eyebrow: 'Producer',
      title: 'Producer details',
      intro: 'Michał Mierzwa EmiChem P.P., Wójtowska 16, 61-654 Poznań, Poland.',
      blocks: [{ title: 'Page scope', copy: 'This landing presents the Plyndo.pl line and its package buying model.' }],
    },
  },
  prasa: {
    icon: PackageCheck,
    pl: { eyebrow: 'Prasa', title: 'Materiały marki', intro: legalPlaceholder.pl, blocks: [] },
    en: { eyebrow: 'Press', title: 'Brand materials', intro: legalPlaceholder.en, blocks: [] },
  },
};

export default function InfoPage({ lang = 'pl' }) {
  const { page } = useParams();
  const pageConfig = pages[page];

  if (!pageConfig) {
    return <Navigate to="/" replace />;
  }

  const content = pageConfig[lang];
  const Icon = pageConfig.icon;

  return (
    <main className="min-h-[70vh] px-6 pb-24 pt-[148px]">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-fg-muted no-underline">
          <ArrowLeft size={16} />
          {lang === 'en' ? 'Back to packages' : 'Wróć do pakietów'}
        </Link>
        <section className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[1fr_220px]">
          <div>
            <span className="t-eyebrow">{content.eyebrow}</span>
            <h1 className="t-display-2 mt-4">{content.title}</h1>
            <p className="t-lead mt-5 max-w-[720px]">{content.intro}</p>
          </div>
          {Icon && (
            <div className="flex aspect-square max-w-[220px] items-center justify-center rounded-[24px] bg-black text-white">
              <Icon size={64} strokeWidth={1.5} />
            </div>
          )}
        </section>
        {content.blocks.length > 0 && (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {content.blocks.map((block) => (
              <article key={block.title} className="rounded-[20px] border border-border bg-white p-7">
                <h2 className="t-h4">{block.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{block.copy}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
