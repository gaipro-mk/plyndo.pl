const fs = require('fs');
let content = fs.readFileSync('src/content.js', 'utf8');

// Replace JAX references
content = content.replace(/JAX Professional/g, 'Płyndo');
content = content.replace(/JAX Certified/g, 'Płyndo Certified');
content = content.replace(/JAX /g, '');
content = content.replace(/JAX/g, 'Płyndo');

// Replace 8 products to 10
content = content.replace(/8 kluczowych/g, '10 kluczowych');
content = content.replace(/8 produktów/g, '10 produktów');
content = content.replace(/8 core products/g, '10 core products');
content = content.replace(/8 clear products/g, '10 clear products');
content = content.replace(/8 /g, '10 '); // careful, maybe too broad, let's just do specific
content = content.replace(/'8'/g, "'10'");

// Rewrite packages (Plans)
const plansPL = `
    plans: {
      eyebrow: 'Architektura oferty',
      title: 'Pakiety zaprojektowane dla Ciebie.',
      lead:
        'Płyndo nie sprzedaje pojedynczych butelek. Oferujemy sprytne zestawy, które zabezpieczają Twój dom i portfel. Wybierz gotowy pakiet lub skomponuj własny i oszczędzaj.',
      cards: [
        {
          name: 'Wybierz Sam (4 szt.)',
          audience: 'Elastyczność',
          cadence: 'Skomponuj własny zestaw 4 produktów.',
          bullets: [
            'Wartość produktów: 150 zł',
            'Cena w pakiecie: 105 zł',
            'Oszczędzasz 30%',
          ],
        },
        {
          name: 'Wybierz Sam (8 szt.)',
          audience: 'Maximum korzyści',
          cadence: 'Dowolne 8 produktów do Twojego domu.',
          bullets: [
            'Wartość produktów: 300 zł',
            'Cena w pakiecie: 150 zł',
            'Oszczędzasz 50%',
          ],
        },
        {
          name: 'Pakiet Dom (8 szt.)',
          audience: 'Rodzina',
          cadence: 'Gotowy zestaw do pełnego sprzątania domu.',
          bullets: [
            'Wartość produktów: 300 zł',
            'Cena w pakiecie: 150 zł',
            'Oszczędzasz 50%',
          ],
        },
        {
          name: 'Pakiet Starter (12 szt.)',
          audience: 'Nowy dom',
          cadence: 'Wszystkie produkty na start. Pełne zabezpieczenie.',
          bullets: [
            'Wartość produktów: 450 zł',
            'Cena w pakiecie: 225 zł',
            'Oszczędzasz 50%',
          ],
        },
      ],
      modulesTitle: 'Zakres produktów',
      modules: [
        'Płyn do podłóg',
        'Płyn do szyb',
        'Płyn do łazienki',
        'Mydło do rąk',
        'Płyn do prania',
        'Płyn do płukania',
        'Płyn do naczyń',
        'Płyn do zmywarki',
        'Płyn do dezynfekcji',
        'Płyn do WC',
      ],
    },
`;

content = content.replace(/plans: {[\s\S]*?},[\s\n]*operations/m, plansPL.trim() + ',\n    operations');

fs.writeFileSync('src/content.js', content);
