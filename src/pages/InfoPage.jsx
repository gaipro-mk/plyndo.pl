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
      title: 'Contact Us',
      intro: 'Have a question about an order, package, or custom box? Write or call us. We are available on business days.',
      blocks: [
        {
          title: 'Customer Support',
          copy: 'Email: kontakt@plyndo.pl – we are happy to answer your questions about packages and orders.',
        },
        {
          title: 'Company Details',
          copy: 'EmiChem Michał Mierzwa P.P., Wójtowska 16, 61-654 Poznań, Poland.\nTax ID (NIP): 7811726058, REGON: 383210103',
        },
        {
          title: 'Phone Support',
          copy: 'Phone: +48 601 765 163 (customer service available Mon-Fri 8:00 AM – 4:00 PM CET)',
        },
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
      title: 'Terms of Service',
      intro: 'Terms and conditions for using the plyndo.pl website and the rules for presenting the PŁYN DO package-based offer.',
      blocks: [
        {
          title: '1. General Provisions',
          copy: 'These Terms of Service define the terms and conditions for using the website plyndo.pl, operated by Michał Mierzwa, conducting business under the name EmiChem Michał Mierzwa P.P. with its registered office in Poznań, Poland (Tax ID / NIP: 7811726058, REGON: 383210103).\n\nBy using the website, you agree to these Terms of Service. The website is optimized for general informational purposes and presenting the package-based product range of PŁYN DO.'
        },
        {
          title: '2. Product Presentation and Pricing',
          copy: 'All prices listed on plyndo.pl are reference prices. Product descriptions, specifications, and images represent the actual manufacturer standards of EmiChem.\n\nThe final package prices and discounts (20% for 4 bottles, 30% for 8 bottles, and 40% for 12 bottles) apply only to complete boxes of 4, 8, or 12 products. Individual items are not sold separately.'
        },
        {
          title: '3. Hand Off to the Online Store',
          copy: 'The website plyndo.pl acts as a catalog and configurator. Actual purchases, shipping selection, and payments are finalized in our official online store at **sklep.plyndo.pl**.\n\nWhen you select a ready-made package or complete a custom box, you will be redirected to a pre-filled shopping cart in the store with the appropriate global package discount applied.'
        },
        {
          title: '4. Intellectual Property',
          copy: 'All content, logo designs, layout structures, trade names, and label designs displayed on plyndo.pl are the sole intellectual property of EmiChem. Any unauthorized reproduction, copying, or use of these assets without prior written consent is strictly prohibited.'
        }
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
      title: 'Privacy Policy',
      intro: 'Information regarding the processing of personal data of plyndo.pl users in accordance with the General Data Protection Regulation (GDPR).',
      blocks: [
        {
          title: '1. Data Controller',
          copy: 'The administrator of your personal data is Michał Mierzwa, conducting business under the name EmiChem Michał Mierzwa P.P., based at ul. Wójtowska 16, 61-654 Poznań, Poland. You can contact us regarding privacy matters at **kontakt@plyndo.pl**.'
        },
        {
          title: '2. Scope and Purpose of Processing',
          copy: 'We collect and process personal data (such as names, email addresses, and phone numbers) to:\n- Respond to your inquiries sent via email or contact forms.\n- Finalize transactions and deliver package orders.\n- Send marketing newsletters (only with your explicit prior consent).\n\nAdditionally, server logs and anonymous cookies may be processed to optimize website performance and user experience.'
        },
        {
          title: '3. Your Rights under GDPR',
          copy: 'Under the General Data Protection Regulation (GDPR), you have the following rights:\n- **Right of access:** Request a copy of your personal data.\n- **Right to rectification:** Correct any inaccurate or incomplete data.\n- **Right to erasure ("right to be forgotten"):** Request deletion of your data when it is no longer needed.\n- **Right to withdraw consent:** Withdraw your marketing consent at any time.\n\nTo exercise any of these rights, please contact us at **kontakt@plyndo.pl**.'
        },
        {
          title: '4. Cookies and Security',
          copy: 'We use cookies to secure session integrity, remember your language preferences, and compile anonymous website traffic statistics using Google Analytics. You can restrict or disable cookie usage in your browser settings at any time.'
        }
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
      title: 'Complaints & Returns',
      intro: 'Complaints, returns, and refund procedures for orders placed with EmiChem under the PŁYN DO brand.',
      blocks: [
        {
          title: '1. How to File a Complaint',
          copy: 'You can submit a complaint by email to **kontakt@plyndo.pl**. Please include your order number, a detailed description of the issue, and – in the case of damaged or defective items – photos of the packaging and label.'
        },
        {
          title: '2. Resolution Timeframe',
          copy: 'We will review and respond to your complaint without undue delay, and no later than 14 days from receiving a complete submission, in accordance with applicable consumer protection laws.'
        },
        {
          title: '3. Returns and Refunds',
          copy: 'In the case of contract withdrawal or an approved complaint, refunds are processed using the same payment method as the original transaction, unless otherwise agreed. Return shipping costs are handled in accordance with local regulations.'
        },
        {
          title: '4. Correspondence Address',
          copy: 'EmiChem Michał Mierzwa P.P., ul. Wójtowska 16, 61-654 Poznań, Poland.'
        }
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
      title: 'Producer Details',
      intro: 'Michał Mierzwa EmiChem P.P., Wójtowska 16, 61-654 Poznań, Poland.',
      blocks: [
        { title: 'Website Scope', copy: 'This landing page presents the PŁYN DO product range and the package-based purchase model (4, 8, or 12 bottles).' },
        { title: 'Contact', copy: 'kontakt@plyndo.pl' },
      ],
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
      title: 'Brand Materials',
      intro: 'Press materials and information about the PŁYN DO brand are available upon request.',
      blocks: [
        { title: 'Media Contact', copy: 'Please email us at kontakt@plyndo.pl with the subject “PŁYN DO Press Materials”.' },
      ],
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
    <main id="main" className="min-h-[70vh] px-6 pb-24 pt-[120px] bg-bg">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs lang={lang} items={[{ label: content.title }]} />
        <Link to="/" className="mb-8 mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-fg-muted no-underline transition-opacity hover:opacity-60 tracking-wide uppercase">
          <ArrowLeft size={16} />
          {lang === 'en' ? 'Back to home' : 'Wróć na stronę główną'}
        </Link>
        <section className="grid gap-8 border-b pb-12 lg:grid-cols-[1fr_220px] border-border">
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
            <div className="flex aspect-square max-w-[220px] items-center justify-center rounded-[20px] bg-bg-muted text-fg-subtle">
              <Icon size={64} strokeWidth={1.5} />
            </div>
          )}
        </section>
        {content.blocks.length > 0 && (
          <div className={`mt-10 grid gap-5 ${isSingleBlock ? 'grid-cols-1 max-w-4xl' : 'md:grid-cols-2'}`}>
            {content.blocks.map((block, i) => (
              <article key={`${block.title}-${i}`} className={`rounded-[16px] border p-7 md:p-10 border-border ${isSingleBlock ? 'w-full' : ''}`}>
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
                      a: ({node, ...props}) => <a className="text-accent hover:opacity-80 hover:underline transition-colors" {...props} />,
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
