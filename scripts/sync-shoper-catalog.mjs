import { request } from './shoper-api-client.mjs';
import { products } from '../src/data/products.js';

async function syncAllProductsAndBundles() {
  console.log('🚀 Rozpoczynam synchronizację 12 produktów i 3 pakietów gotowych w Shoper REST API...');

  const stockToProductMap = {
    182: 94,
    183: 95,
    184: 96,
    185: 97,
    186: 98,
    187: 99,
    188: 100,
    189: 101,
    190: 102,
    191: 103,
    192: 104,
    193: 105
  };

  // 1. Sync 12 individual products
  for (const prod of products) {
    const stockId = prod.shoperStockId;
    const productId = stockToProductMap[stockId];
    const videoUrl = `https://plyndo.pl${prod.videoSrc}`;

    console.log(`\n📦 Synchronizacja ${prod.id}/12: ${prod.name} (Product ID: ${productId})`);

    try {
      const htmlDesc = `
        <div class="plyndo-product-desc" style="font-family: sans-serif; line-height: 1.6; color: #1a1918;">
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px;">${prod.name} – ${prod.subtitle}</h3>
          <p style="font-size: 15px; margin-bottom: 20px;">${prod.description}</p>
          
          <div class="plyndo-video-container" style="margin: 24px 0; border-radius: 16px; overflow: hidden; background: #000; box-shadow: 0 8px 24px rgba(0,0,0,0.12);">
            <video autoplay loop muted playsinline controls style="width: 100%; height: auto; display: block; border-radius: 16px;">
              <source src="${videoUrl}" type="video/mp4" />
            </video>
          </div>

          <h4 style="font-size: 16px; font-weight: 600; margin-top: 20px; margin-bottom: 8px;">Sposób użycia:</h4>
          <p style="font-size: 14px; color: #555452;">${prod.howToUse.replace(/\n/g, '<br>')}</p>
          
          <h4 style="font-size: 16px; font-weight: 600; margin-top: 20px; margin-bottom: 8px;">Skład:</h4>
          <p style="font-size: 13px; color: #6b6a67;">${prod.ingredients}</p>
          ${prod.scent ? `<p style="font-size: 14px; margin-top: 12px;"><strong>Wariant zapachowy:</strong> ${prod.scent}</p>` : ''}
        </div>
      `.trim();

      const updateProdPayload = {
        code: `plyndo_${prod.slug.replace(/-/g, '_')}`,
        stock: {
          price: prod.listPrice,
          active: 1,
          stock: 9999
        },
        translations: {
          pl_PL: {
            name: prod.name,
            short_description: prod.subtitle,
            description: htmlDesc
          }
        }
      };

      await request(`/products/${productId}`, 'PUT', updateProdPayload);
      console.log(`   ✅ Zaktualizowano ${prod.name}`);

    } catch (err) {
      console.error(`   ❌ Błąd ${prod.name}:`, err.message);
    }
  }

  // 2. Sync 3 Pre-set Package Products in Shoper (ID 106, 107, 108)
  const bundlePayloads = [
    {
      productId: 106,
      stockId: 194,
      code: 'plyndo_pakiet_4x_starter',
      name: 'Pakiet 4x – Starter',
      price: 71.68,
      bottlesCount: 4,
      discount: '20% rabatu',
      cartAddUrl: 'https://sklep.plyndo.pl/?add=182:1,186:1,189:1,190:1&promo=PlynDo_x4',
      itemsList: [
        '1x PŁYN DO naczyń (O zapachu arbuza)',
        '1x PŁYN DO podłóg (O zapachu pomarańczy)',
        '1x PŁYN DO mycia szyb (O zapachu cytryny)',
        '1x PŁYN DO łazienki (O zapachu cytryny)'
      ]
    },
    {
      productId: 107,
      stockId: 195,
      code: 'plyndo_pakiet_8x_dom',
      name: 'Pakiet 8x – Dom na co dzień',
      price: 139.44,
      bottlesCount: 8,
      discount: '30% rabatu',
      cartAddUrl: 'https://sklep.plyndo.pl/?add=182:1,183:1,184:1,185:1,186:1,187:1,189:1,190:1&promo=PlynDo_x8',
      itemsList: [
        '1x PŁYN DO naczyń (O zapachu arbuza)',
        '1x PŁYN DO zmywarki (Nabłyszczacz)',
        '1x PŁYN DO prania (O zapachu świeżości)',
        '1x PŁYN DO płukania (O zapachu Wooly Blizz)',
        '1x PŁYN DO podłóg (O zapachu pomarańczy)',
        '1x PŁYN DO WC (O zapachu cytryny)',
        '1x PŁYN DO mycia szyb (O zapachu cytryny)',
        '1x PŁYN DO łazienki (O zapachu cytryny)'
      ]
    },
    {
      productId: 108,
      stockId: 196,
      code: 'plyndo_pakiet_12x_firma',
      name: 'Pakiet 12x – Dom + firma',
      price: 185.28,
      bottlesCount: 12,
      discount: '40% rabatu',
      cartAddUrl: 'https://sklep.plyndo.pl/?add=182:1,183:1,191:1,184:1,185:1,186:1,187:1,190:1,189:1,188:1,192:1,193:1&promo=PlynDo_x12',
      itemsList: [
        '1x PŁYN DO naczyń (O zapachu arbuza)',
        '1x PŁYN DO zmywarki (Nabłyszczacz)',
        '1x PŁYN DO nabłyszczania (Bez zapachu)',
        '1x PŁYN DO prania (O zapachu świeżości)',
        '1x PŁYN DO płukania (O zapachu Wooly Blizz)',
        '1x PŁYN DO podłóg (O zapachu pomarańczy)',
        '1x PŁYN DO WC (O zapachu cytryny)',
        '1x PŁYN DO łazienki (O zapachu cytryny)',
        '1x PŁYN DO mycia szyb (O zapachu cytryny)',
        '1x PŁYN DO mycia rąk (O zapachu Oud Wood)',
        '1x PŁYN DO odkamieniania (Bez zapachu)',
        '1x PŁYN DO udrażniania rur (Bez zapachu)'
      ]
    }
  ];

  console.log('\n🎁 Synchronizacja 3 Pakietów Promocyjnych w Shoper REST API...');
  for (const b of bundlePayloads) {
    console.log(` 📦 Pakiet ID ${b.productId}: ${b.name} (${b.bottlesCount} szt., ${b.price} PLN, ${b.discount})`);

    const itemsHtml = b.itemsList.map(item => `<li style="margin-bottom: 6px;">✔ <strong>${item}</strong></li>`).join('');

    const bundleHtml = `
      <div class="plyndo-bundle-desc" style="font-family: sans-serif; line-height: 1.6; color: #1a1918;">
        <div style="background: rgba(39, 97, 66, 0.08); border-radius: 12px; padding: 16px; margin-bottom: 20px; border: 1px solid rgba(39, 97, 66, 0.2);">
          <span style="background: #276142; color: #fff; padding: 4px 12px; border-radius: 9999px; font-weight: 600; font-size: 13px;">${b.discount}</span>
          <p style="margin-top: 8px; font-size: 14px; color: #1c623b; font-weight: 500;">Gotowy zestaw ${b.bottlesCount} butelek PŁYN DO przygotowany do użycia.</p>
        </div>

        <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Zawartość pakietu (${b.bottlesCount} sztuki):</h4>
        <ul style="list-style: none; padding-left: 0; font-size: 15px; color: #231f20;">
          ${itemsHtml}
        </ul>

        <div style="margin-top: 24px;">
          <a href="${b.cartAddUrl}" style="background: #000; color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 9999px; font-weight: 500; display: inline-block;">Dodaj ten pakiet do koszyka →</a>
        </div>
      </div>
    `.trim();

    try {
      await request(`/products/${b.productId}`, 'PUT', {
        code: b.code,
        stock: {
          price: b.price,
          active: 1,
          stock: 9999
        },
        translations: {
          pl_PL: {
            name: b.name,
            short_description: `Gotowy zestaw ${b.bottlesCount} butelek PŁYN DO – ${b.discount}`,
            description: bundleHtml
          }
        }
      });
      console.log(`   ✅ Zaktualizowano pakiet: ${b.name}`);
    } catch (e) {
      console.error(`   ❌ Błąd pakietu ${b.name}:`, e.message);
    }
  }

  console.log('\n🎉 PEŁNA SYNCHRONIZACJA KART PRODUKTÓW I PAKIETÓW ZAKOŃCZONA SUKCESEM!');
}

syncAllProductsAndBundles();
