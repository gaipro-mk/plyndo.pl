import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { copy } from '../../content';
import { bundles } from '../../data/bundles';
import { getProductByRouteSlug, productRoutePath } from '../../data/products';

const ORIGIN = 'https://plyndo.pl';

function setMeta(selector, value) {
  const node = document.head.querySelector(selector);
  if (node && value) {
    node.setAttribute('content', value);
  }
}

function routeMeta(pathname, lang) {
  const base = copy[lang];
  const productSlug = pathname.match(/^\/(?:product|produkt|produkty)\/([^/]+)$/)?.[1];
  const bundleSlug = pathname.match(/^\/pakiety\/([^/]+)$/)?.[1];

  if (productSlug) {
    const product = getProductByRouteSlug(productSlug);
    const detail = product?.i18n?.[lang];

    if (product && detail) {
      return {
        title: `${detail.displayName} | ${base.brand}`,
        description: `${detail.description} ${lang === 'en' ? 'Available inside PŁYN DO packages.' : 'Dostępny w pakietach PŁYN DO.'}`,
        canonicalPath: productRoutePath(product),
      };
    }
  }

  if (bundleSlug && bundleSlug !== 'wlasna-paczka') {
    const bundle = bundles.find((item) => item.slug === bundleSlug);
    const name = bundle?.i18n?.[lang]?.displayName ?? bundle?.name;

    if (bundle && name) {
      return {
        title: `${name} | ${base.brand}`,
        description: lang === 'en'
          ? `See the composition, reference value, and global package saving for ${name}.`
          : `Zobacz skład, wartość referencyjną i globalną oszczędność pakietu ${name}.`,
      };
    }
  }

  if (/^\/pakiety\/wlasna-paczka\/(4|8|12)$/.test(pathname)) {
    const size = pathname.split('/').at(-1);
    return {
      title: `${lang === 'en' ? `Custom box of ${size}` : `Własna paczka ${size}`} | ${base.brand}`,
      description: lang === 'en'
        ? `Build a PŁYN DO box of ${size} from the current product line and see the global package discount.`
        : `Skomponuj paczkę PŁYN DO ${size} z obecnej linii produktów i zobacz globalny rabat kartonu.`,
    };
  }

  if (pathname === '/dla-domu') {
    return {
      title: `${lang === 'en' ? 'For Home' : 'Dla domu'} | ${base.brand}`,
      description: lang === 'en'
        ? 'PŁYN DO packages for kitchen, bathroom, laundry, and daily cleaning in boxes of 4, 8, or 12 products.'
        : 'Pakiety PŁYN DO do kuchni, łazienki, prania i codziennego sprzątania w paczkach 4, 8 lub 12 produktów.',
    };
  }

  if (pathname === '/dla-firm') {
    return {
      title: `${lang === 'en' ? 'For Business' : 'Dla firm'} | ${base.brand}`,
      description: lang === 'en'
        ? 'PŁYN DO packages for offices, clinics, salons, and services. Instead of laundry chemicals—products for floors, sanitary zones, glass, hands, and kitchen.'
        : 'Pakiety PŁYN DO dla biur, gabinetów, salonów i lokali usługowych. Zamiast chemii pralniczej — środki do podłóg, sanitariatów, szyb, rąk, naczyń i zaplecza.',
    };
  }

  if (pathname === '/o-marce') {
    return {
      title: `${lang === 'en' ? 'About Us' : 'O marce'} | ${base.brand}`,
      description: lang === 'en'
        ? 'Discover the PŁYN DO brand, our package buying model, and the manufacturing history prepared for EmiChem.'
        : 'Poznaj markę PŁYN DO, pakietowy model zakupu i kontekst produkcyjny linii przygotowanej dla EmiChem.',
    };
  }

  return { title: base.title, description: base.description };
}

export default function RouteEffects({ lang }) {
  const location = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      const targetId = decodeURIComponent(location.hash.replace('#', ''));
      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    const frame = window.requestAnimationFrame(scrollToHash);
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const meta = routeMeta(location.pathname, lang);
    const canonicalPath = meta.canonicalPath ?? (location.pathname === '/' ? '/' : location.pathname);
    const url = `${ORIGIN}${canonicalPath}`;

    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.description);
    setMeta('meta[property="og:image"]', `${ORIGIN}/labels/front-09-lazienki.webp`);
    setMeta('meta[name="twitter:image"]', `${ORIGIN}/labels/front-09-lazienki.webp`);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    }
  }, [lang, location.pathname]);

  return null;
}
