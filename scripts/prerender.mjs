import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { products, productUrlSlug } from '../src/data/products.js';
import { bundles } from '../src/data/bundles.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');
const port = 4173;
const origin = `http://127.0.0.1:${port}`;

const staticRoutes = [
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

const routes = [
  ...staticRoutes,
  ...products.map((p) => `/produkt/${productUrlSlug(p)}`),
  ...bundles.filter((b) => !b.isCustomizable).map((b) => `/pakiety/${b.slug}`),
  ...bundles.filter((b) => b.isCustomizable).map((b) => `/pakiety/wlasna-paczka/${b.size}`),
];

function contentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.webp')) return 'image/webp';
  if (filePath.endsWith('.svg')) return 'image/svg+xml';
  if (filePath.endsWith('.json')) return 'application/json; charset=utf-8';
  return 'application/octet-stream';
}

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const candidates = [
        join(distDir, urlPath),
        join(distDir, urlPath, 'index.html'),
        join(distDir, 'index.html'),
      ];
      const file = candidates.find((candidate) => existsSync(candidate) && !candidate.endsWith('/'));
      if (file) {
        res.writeHead(200, { 'Content-Type': contentType(file) });
        res.end(readFileSync(file));
        return;
      }
      res.writeHead(404);
      res.end('Not found');
    });
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

async function prerender() {
  if (!existsSync(distDir)) {
    console.error('dist/ not found – run vite build first');
    process.exit(1);
  }

  const server = await startStaticServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  for (const route of routes) {
    const url = `${origin}${route}`;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('#top', { timeout: 15000 }).catch(() => {});
    const html = await page.content();
    const outPath = route === '/'
      ? join(distDir, 'index.html')
      : join(distDir, route, 'index.html');
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    console.log(`prerendered ${route}`);
  }

  await browser.close();
  server.close();

  // Copy index.html to 200.html for Cloudflare Pages SPA fallback without redirect loops
  try {
    writeFileSync(join(distDir, '200.html'), readFileSync(join(distDir, 'index.html')));
    console.log('copied index.html to 200.html for Cloudflare Pages fallback');
  } catch (err) {
    console.error('Failed to copy 200.html:', err);
  }

  console.log(`prerender complete: ${routes.length} routes`);
}

prerender().catch((error) => {
  console.error(error);
  process.exit(1);
});
