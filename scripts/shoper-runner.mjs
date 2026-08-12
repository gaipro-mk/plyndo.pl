import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.substring(0, eqIdx).trim();
        const val = trimmed.substring(eqIdx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}

loadEnv();

const user = process.env.SHOPER_WEB_ADMIN_USER || process.env.SHOPER_API_USER;
const pass = process.env.SHOPER_WEB_ADMIN_PASSWORD || process.env.SHOPER_API_PASSWORD;
const codeFile = path.resolve(__dirname, '../scratch_code.txt');

let activeContext = null;
let activePage = null;

async function initBrowserSession() {
  console.log('🚀 Uruchamianie stałej sesji przeglądarki dla Shoper Admin...');
  const sessionDir = path.resolve(__dirname, '.browser_session');
  activeContext = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    viewport: { width: 1440, height: 900 }
  });

  activePage = activeContext.pages()[0] || await activeContext.newPage();
  await activePage.goto('https://sklep562393.shoparena.pl/admin', { waitUntil: 'networkidle' });

  if (await activePage.locator('input[name="login"]').isVisible()) {
    console.log('Wprowadzanie danych logowania...');
    await activePage.locator('input[name="login"]').fill(user);
    await activePage.locator('input[name="password"]').fill(pass);
    await activePage.locator('button[type="submit"]').click();
    await activePage.waitForTimeout(3000);
  }

  const codeInput = activePage.locator('#code, input[name="code"]');
  if (await codeInput.isVisible()) {
    console.log('📧 Oczekiwanie na scratch_code.txt...');
    let code = null;
    const start = Date.now();
    while (Date.now() - start < 120000) {
      if (fs.existsSync(codeFile)) {
        code = fs.readFileSync(codeFile, 'utf8').trim();
        if (code.length >= 4) break;
      }
      await new Promise(r => setTimeout(r, 1000));
    }
    if (!code) {
      console.error('❌ Brak kodu 2FA.');
      process.exit(1);
    }
    console.log(`🔑 Wprowadzanie kodu 2FA: ${code}...`);
    await codeInput.fill(code);
    await activePage.locator('button:has-text("Weryfikuj"), button[type="submit"]').first().click();
    await activePage.waitForTimeout(5000);
  }

  console.log('🎉 Sesja Shoper Admin aktywna! Adres URL:', activePage.url());
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/eval') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { script } = JSON.parse(body);
        console.log('Wykonanie skryptu w aktywnej sesji:', script.substring(0, 100));
        const result = await eval(`(async () => { const page = activePage; ${script} })()`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, result }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
  } else if (req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ active: !!activePage, url: activePage ? activePage.url() : null }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

initBrowserSession().then(() => {
  server.listen(9876, () => {
    console.log('⚡ Serwer stałej sesji Shoper uruchomiony na portzie 9876!');
  });
}).catch(err => {
  console.error('Wyjątek sesji:', err);
  process.exit(1);
});
