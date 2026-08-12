import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local manually
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
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const SHOPER_API_URL = process.env.SHOPER_API_URL || 'https://sklep562393.shoparena.pl/webapi/rest';
const SHOPER_API_USER = process.env.SHOPER_API_USER || process.env.SHOPER_CLIENT_ID || '';
const SHOPER_API_PASSWORD = process.env.SHOPER_API_PASSWORD || process.env.SHOPER_CLIENT_SECRET || '';

let accessToken = null;

/**
 * Authenticate against Shoper REST API (/webapi/rest/auth)
 */
export async function authenticate() {
  if (!SHOPER_API_USER || !SHOPER_API_PASSWORD) {
    console.log('[Shoper API] Status: BRAK DANYCH UWIERZYTELNIAJĄCYCH w .env.local');
    console.log('   Dopisz SHOPER_API_USER oraz SHOPER_API_PASSWORD w plyndo.pl/.env.local');
    return null;
  }

  const authHeader = 'Basic ' + Buffer.from(`${SHOPER_API_USER}:${SHOPER_API_PASSWORD}`).toString('base64');

  try {
    const res = await fetch(`${SHOPER_API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const data = await res.json();

    if (res.ok && data.access_token) {
      accessToken = data.access_token;
      console.log('✅ [Shoper API] Autoryzacja udana! Pomyślnie uzyskano Token Bearer.');
      console.log(`   Token wygasa za: ${data.expires_in} sekund`);
      return accessToken;
    } else {
      console.error('❌ [Shoper API] Błąd autoryzacji:', data);
      return null;
    }
  } catch (err) {
    console.error('❌ [Shoper API] Wyjątek połączenia:', err.message);
    return null;
  }
}

/**
 * Send request to Shoper REST API
 */
export async function request(endpoint, options = {}) {
  if (!accessToken) {
    const token = await authenticate();
    if (!token) throw new Error('Brak autoryzacji do API Shoper');
  }

  const url = `${SHOPER_API_URL}/${endpoint.replace(/^\//, '')}`;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const res = await fetch(url, { ...options, headers });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Test connectivity & display shop REST API limits
 */
export async function testConnection() {
  console.log('=== TEST POŁĄCZENIA Z SHOPER REST API ===');
  console.log(`URL API: ${SHOPER_API_URL}`);
  console.log(`Użytkownik: ${SHOPER_API_USER ? SHOPER_API_USER : '(nieustawiony w .env.local)'}`);

  try {
    const res = await fetch(`${SHOPER_API_URL}/auth`, { method: 'POST' });
    console.log(`Status serwera Shoper (brak nagłówka auth): HTTP ${res.status}`);
    const limitHeader = res.headers.get('x-shop-api-limit');
    const callsHeader = res.headers.get('x-shop-api-calls');
    const bandwidthHeader = res.headers.get('x-shop-api-bandwidth');

    if (limitHeader) console.log(`   x-shop-api-limit: ${limitHeader}`);
    if (callsHeader) console.log(`   x-shop-api-calls: ${callsHeader}`);
    if (bandwidthHeader) console.log(`   x-shop-api-bandwidth: ${bandwidthHeader}`);

    if (SHOPER_API_USER && SHOPER_API_PASSWORD) {
      await authenticate();
    } else {
      console.log('\n📌 Serwer Shoper odpowiada poprawnie. Do pełnych zapytań (produkty, strony, kategorie) uzupełnij SHOPER_API_USER i SHOPER_API_PASSWORD w pliku .env.local.');
    }
  } catch (err) {
    console.error('❌ Połączenie nieudane:', err.message);
  }
}

// CLI Execution Handler
if (process.argv[1] && process.argv[1].endsWith('shoper-api-client.mjs')) {
  const arg = process.argv[2] || '--test';
  if (arg === '--test') {
    testConnection();
  } else if (arg === '--list-pages') {
    (async () => {
      const pages = await request('/pages');
      console.log('Strony CMS:', JSON.stringify(pages, null, 2));
    })();
  } else if (arg === '--list-products') {
    (async () => {
      const products = await request('/products');
      console.log('Produkty:', JSON.stringify(products, null, 2));
    })();
  }
}
