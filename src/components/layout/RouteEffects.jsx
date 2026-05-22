import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { copy } from '../../content';
import { bundles } from '../../data/bundles';
import { products } from '../../data/products';

const ORIGIN = 'https://plyndo.pl';

function setMeta(selector, value) {
  const node = document.head.querySelector(selector);
  if (node && value) {
    node.setAttribute('content', value);
  }
}

function routeMeta(pathname, lang) {
  const base = copy[lang];
  const productSlug = pathname.match(/^\/product\/([^/]+)$/)?.[1];
  const bundleSlug = pathname.match(/^\/pakiety\/([^/]+)$/)?.[1];

  if (productSlug) {
    const product = products.find((item) => item.slug === productSlug);
    const detail = product?.i18n?.[lang];

    if (product && detail) {
      return {
        title: `${detail.displayName} | ${base.brand}`,
        description: `${detail.description} ${lang === 'en' ? 'Available inside Plyndo packages.' : 'Dostępny w pakietach Płyndo.'}`,
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

  if (/^\/pakiety\/wlasna-paczka\/(4|8)$/.test(pathname)) {
    const size = pathname.split('/').at(-1);
    return {
      title: `${lang === 'en' ? `Custom box of ${size}` : `Własna paczka ${size}`} | ${base.brand}`,
      description: lang === 'en'
        ? `Build a Plyndo box of ${size} from the current product line and see the global package discount.`
        : `Skomponuj paczkę Płyndo ${size} z obecnej linii produktów i zobacz globalny rabat kartonu.`,
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
    const url = `${ORIGIN}${location.pathname === '/' ? '/' : location.pathname}`;

    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.description);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    }
  }, [lang, location.pathname]);

  return null;
}
