import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, PackageCheck } from 'lucide-react';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { legalDataMd } from '../data/legalContentMd';
import ReactMarkdown from 'react-markdown';

const pages = {
  kontakt: {
    icon: Mail,
    pl: {
      eyebrow: 'Kontakt',
      title: 'Kontakt',
      intro: 'Masz pytanie o zamówienie, pakiet lub własną paczkę? Napisz lub zadzwoń. Jesteśmy do dyspozycji w dni robocze.',
      blocks: [
        {
          title: 'Obsługa zamówień',
          copy: 'E-mail: kontakt@plyndo.pl – chętnie odpowiemy na Twoje pytania o pakiety i zamówienia.',
        },
        {
          title: 'Dane firmy',
          copy: 'EmiChem Michał Mierzwa P.P., ul. Wójtowska 16, 61-654 Poznań, Polska.\nNIP: 7811726058, REGON: 383210103',
        },
        {
          title: 'Telefon',
          copy: 'Telefon: +48 601 765 163 (obsługa infolinii w dni robocze w godzinach 8:00 – 16:00)',
        },
      ],
    },
    en: {
      eyebrow: 'Contact',
      title: 'Contact',
      intro: 'Have a question about an order, package, or custom box? Write or call us. We are available on business days.',
      blocks: [
        { title: 'Customer Support', copy: 'Email: kontakt@plyndo.pl – packages, orders, and inquiries.' },
        { title: 'Company details', copy: 'EmiChem Michał Mierzwa P.P., Wójtowska 16, 61-654 Poznań, Poland.\nTax ID (NIP): 7811726058, REGON: 383210103' },
        { title: 'Phone', copy: 'Phone: +48 601 765 163 (available Mon-Fri 8:00 AM – 4:00 PM CET)' },
      ],
    },
  },
  regulamin: {
    pl: {
      eyebrow: 'Dokument',
      title: 'Regulamin',
      intro: 'Regulamin korzystania ze strony plyndo.pl oraz zasady prezentacji oferty pakietowej marki PŁYN DO.',
      blocks: [
        {
          title: '',
          copy: legalDataMd.terms,
        },
      ],
    },
    en: {
      eyebrow: 'Document',
      title: 'Terms of use',
      intro: 'Terms for using plyndo.pl and presenting the PŁYN DO package offer.',
      blocks: [
        { title: '1. General', copy: 'These terms govern use of plyndo.pl operated by EmiChem Michał Mierzwa P.P. in Poznań.' },
        { title: '2. Offer', copy: 'Reference prices apply to products; package discounts apply to the whole box only.' },
      ],
    },
  },
  'polityka-prywatnosci': {
    pl: {
      eyebrow: 'Dokument',
      title: 'Polityka prywatności',
      intro: 'Informacja o przetwarzaniu danych osobowych użytkowników strony plyndo.pl zgodnie z RODO.',
      blocks: [
        {
          title: '',
          copy: legalDataMd.privacy,
        },
      ],
    },
    en: {
      eyebrow: 'Document',
      title: 'Privacy policy',
      intro: 'Information on personal data processing under GDPR.',
      blocks: [
        { title: 'Controller', copy: 'EmiChem Michał Mierzwa P.P., kontakt@plyndo.pl.' },
      ],
    },
  },
  reklamacje: {
    pl: {
      eyebrow: 'Obsługa',
      title: 'Reklamacje',
      intro: 'Procedura reklamacyjna i zwrotów dla zamówień składanych u EmiChem w ramach marki PŁYN DO.',
      blocks: [
        {
          title: '1. Jak zgłosić reklamację',
          copy: 'Reklamację możesz zgłosić mailowo na adres kontakt@plyndo.pl, podając numer zamówienia, opis problemu oraz – w razie wady produktu – zdjęcia opakowania i etykiety.',
        },
        {
          title: '2. Termin rozpatrzenia',
          copy: 'Odpowiadamy bez zbędnej zwłoki, nie później niż w terminie 14 dni od otrzymania kompletnego zgłoszenia, zgodnie z przepisami o prawach konsumenta.',
        },
        {
          title: '3. Zwroty',
          copy: 'W przypadku odstąpienia od umowy lub uznanej reklamacji zwrot środków następuje tą samą metodą płatności, chyba że uzgodnimy inaczej. Koszty zwrotu towaru zgodnie z obowiązującymi przepisami.',
        },
        {
          title: '4. Adres korespondencyjny',
          copy: 'EmiChem Michał Mierzwa P.P., ul. Wójtowska 16, 61-654 Poznań.',
        },
      ],
    },
    en: {
      eyebrow: 'Support',
      title: 'Complaints',
      intro: 'Complaints and returns procedure.',
      blocks: [
        { title: 'Contact', copy: 'Email kontakt@plyndo.pl with order number and issue description.' },
      ],
    },
  },
  producent: {
    icon: MapPin,
    pl: {
      eyebrow: 'Producent',
      title: 'Dane producenta',
      intro: 'Michał Mierzwa EmiChem P.P., ul. Wójtowska 16, 61-654 Poznań.',
      blocks: [
        { title: 'Zakres strony', copy: 'Landing prezentuje linię PŁYN DO oraz sposób zakupu w pakietach 4, 8 i 12 produktów.' },
        { title: 'Kontakt', copy: 'kontakt@plyndo.pl' },
      ],
    },
    en: {
      eyebrow: 'Producer',
      title: 'Producer details',
      intro: 'Michał Mierzwa EmiChem P.P., Wójtowska 16, 61-654 Poznań, Poland.',
      blocks: [{ title: 'Scope', copy: 'This landing presents the Plyndo.pl line and package buying model.' }],
    },
  },
  prasa: {
    icon: PackageCheck,
    pl: {
      eyebrow: 'Prasa',
      title: 'Materiały marki',
      intro: 'Materiały prasowe i informacje o marce PŁYN DO udostępniamy na zapytanie.',
      blocks: [
        { title: 'Kontakt dla mediów', copy: 'Napisz na kontakt@plyndo.pl z tematem „Materiały prasowe PŁYN DO”.' },
      ],
    },
    en: {
      eyebrow: 'Press',
      title: 'Brand materials',
      intro: 'Press materials available on request at kontakt@plyndo.pl.',
      blocks: [],
    },
  },
};

export default function InfoPage({ lang = 'pl' }) {
  const location = useLocation();
  const page = location.pathname.replace(/^\//, '');
  const pageConfig = pages[page];
  const content = pageConfig?.[lang] ?? pageConfig?.pl;
  const Icon = pageConfig?.icon;

  if (!pageConfig || !content) {
    return null;
  }

  const isSingleBlock = content.blocks.length === 1;

  return (
    <main id="main" className="min-h-[70vh] px-6 pb-24 pt-[120px]" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs lang={lang} items={[{ label: content.title }]} />
        <Link to="/" className="mb-8 mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-fg-muted no-underline transition-opacity hover:opacity-60 tracking-wide uppercase">
          <ArrowLeft size={16} />
          {lang === 'en' ? 'Back to home' : 'Wróć na stronę główną'}
        </Link>
        <section className="grid gap-8 border-b pb-12 lg:grid-cols-[1fr_220px]" style={{ borderColor: 'var(--color-border)' }}>
          <div>
            <span className="t-eyebrow">{content.eyebrow}</span>
            <h1 className="t-display-2 mt-4">{content.title}</h1>
            <p className="t-lead mt-5 max-w-[720px]">{content.intro}</p>
            {page === 'kontakt' && (
              <p className="mt-4 text-[15px]">
                <a href="mailto:kontakt@plyndo.pl" className="font-medium text-fg-base no-underline hover:opacity-70">kontakt@plyndo.pl</a>
              </p>
            )}
          </div>
          {Icon && (
            <div className="flex aspect-square max-w-[220px] items-center justify-center rounded-[20px]" style={{ background: 'var(--color-bg-muted)', color: 'var(--color-fg-subtle)' }}>
              <Icon size={64} strokeWidth={1.5} />
            </div>
          )}
        </section>
        {content.blocks.length > 0 && (
          <div className={`mt-10 grid gap-5 ${isSingleBlock ? 'grid-cols-1 max-w-4xl' : 'md:grid-cols-2'}`}>
            {content.blocks.map((block, i) => (
              <article key={`${block.title}-${i}`} className={`rounded-[16px] border p-7 md:p-10 ${isSingleBlock ? 'w-full' : ''}`} style={{ borderColor: 'var(--color-border)' }}>
                {block.title && <h2 className="t-h4 mb-4">{block.title}</h2>}
                <div className="text-[14px] leading-relaxed text-fg-muted">
                  <ReactMarkdown
                    components={{
                      /* eslint-disable no-unused-vars */
                      h1: ({node, ...props}) => <h1 className="text-2xl md:text-3xl font-bold mt-8 mb-6 text-fg-base" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-fg-base" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg md:text-xl font-medium mt-6 mb-3 text-fg-base" {...props} />,
                      p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-[14px] md:text-base text-fg-muted" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-[14px] md:text-base text-fg-muted" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-[14px] md:text-base text-fg-muted" {...props} />,
                      li: ({node, ...props}) => <li className="pl-2" {...props} />,
                      a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-500 hover:underline transition-colors" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold text-fg-base" {...props} />
                      /* eslint-enable no-unused-vars */
                    }}
                  >
                    {block.copy}
                  </ReactMarkdown>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
