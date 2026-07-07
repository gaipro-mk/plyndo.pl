import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, PackageCheck } from 'lucide-react';
import Breadcrumbs from '../components/layout/Breadcrumbs';

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
          title: '1. Postanowienia ogólne',
          copy: 'Niniejszy regulamin określa zasady korzystania ze strony internetowej plyndo.pl, prowadzonej przez EmiChem Michał Mierzwa P.P. z siedzibą w Poznaniu. Strona służy prezentacji oferty pakietowej marki PŁYN DO – chemii gospodarczej do domu i firmy.',
        },
        {
          title: '2. Oferta i ceny',
          copy: 'Na stronie prezentujemy pakiety gotowe oraz możliwość skomponowania własnej paczki 4, 8 lub 12 produktów. Ceny produktów mają charakter referencyjny. Rabat i oszczędność dotyczą wyłącznie całej paczki zgodnie z aktualnym cennikiem pakietowym.',
        },
        {
          title: '3. Zamówienia',
          copy: 'Finalizacja zamówienia odbywa się w sklepie internetowym lub – do czasu jego uruchomienia – po kontakcie mailowym na adres kontakt@plyndo.pl. Składanie zamówienia wymaga akceptacji aktualnych warunków sprzedaży obowiązujących w momencie zakupu.',
        },
        {
          title: '4. Odpowiedzialność',
          copy: 'Dokładamy starań, aby informacje na stronie były aktualne i rzetelne. Nie ponosimy odpowiedzialności za przerwy techniczne wynikające z przyczyn niezależnych, ani za treści stron zewnętrznych, do których prowadzą linki.',
        },
        {
          title: '5. Prawo właściwe',
          copy: 'Do korzystania ze strony stosuje się prawo polskie. Spory będą rozstrzygane przez sąd właściwy dla siedziby sprzedawcy, o ile bezwzględnie obowiązujące przepisy nie stanowią inaczej.',
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
          title: '1. Administrator danych',
          copy: 'Administratorem danych osobowych jest EmiChem Michał Mierzwa P.P., ul. Wójtowska 16, 61-654 Poznań. Kontakt: kontakt@plyndo.pl.',
        },
        {
          title: '2. Zakres i cele',
          copy: 'Przetwarzamy dane podane dobrowolnie w korespondencji e-mail (imię, adres e-mail, treść wiadomości) w celu udzielenia odpowiedzi i obsługi zapytań. Podstawą prawną jest art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes) lub lit. b (działania przed zawarciem umowy).',
        },
        {
          title: '3. Pliki cookie',
          copy: 'Strona może używać niezbędnych plików cookie do prawidłowego działania serwisu oraz zapamiętania preferencji (np. zgoda cookie w localStorage pod kluczem plyndo-cookie-consent). Nie stosujemy cookies marketingowych bez odrębnej zgody.',
        },
        {
          title: '4. Odbiorcy i okres przechowywania',
          copy: 'Dane mogą być powierzane dostawcom hostingu i poczty elektronicznej działającym jako procesorzy. Przechowujemy je przez czas niezbędny do obsługi zapytania, a następnie przez okres wymagany przepisami.',
        },
        {
          title: '5. Prawa osób',
          copy: 'Przysługuje Ci prawo dostępu, sprostowania, usunięcia, ograniczenia przetwarzania, sprzeciwu oraz skargi do Prezesa UODO. W sprawach prywatności pisz na kontakt@plyndo.pl.',
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
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {content.blocks.map((block) => (
              <article key={block.title} className="rounded-[16px] border p-7" style={{ borderColor: 'var(--color-border)' }}>
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
