import { writeFileSync } from 'node:fs';
import { products, productUrlSlug } from '../src/data/products.js';
import { bundles } from '../src/data/bundles.js';

const ORIGIN = 'https://plyndo.pl';
const today = new Date().toISOString().slice(0, 10);

const staticPaths = [
  '/',
  '/dla-domu',
  '/dla-firm',
  '/o-marce',
  '/kontakt',
  '/regulamin',
  '/polityka-prywatnosci',
  '/reklamacje',
  '/producent',
];

const urls = [
  ...staticPaths.map((path) => ({ loc: `${ORIGIN}${path}`, changefreq: path === '/' ? 'weekly' : 'monthly', priority: path === '/' ? '1.0' : '0.7' })),
  ...products.map((p) => ({
    loc: `${ORIGIN}/produkt/${productUrlSlug(p)}`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  ...bundles.filter((b) => !b.isCustomizable).map((b) => ({
    loc: `${ORIGIN}/pakiety/${b.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  ...bundles.filter((b) => b.isCustomizable).map((b) => ({
    loc: `${ORIGIN}/pakiety/wlasna-paczka/${b.size}`,
    changefreq: 'monthly',
    priority: '0.75',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`sitemap.xml: ${urls.length} URLs`);
