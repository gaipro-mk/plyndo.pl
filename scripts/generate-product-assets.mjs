import fs from 'node:fs/promises';
import sharp from 'sharp';
import QRCode from 'qrcode';
import { productUrlSlug, products } from '../src/data/products.js';

const canvasSize = 1200;
const qrFrameSize = 800;
const qrFrameX = (canvasSize - qrFrameSize) / 2;
const qrFrameY = qrFrameX;
const qrFramePadding = 32;
const qrSize = qrFrameSize - qrFramePadding * 2;
const qrX = qrFrameX + qrFramePadding;
const qrY = qrFrameY + qrFramePadding;
const captionY = 1082;

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const linear = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function readableAccent(product) {
  const base = product.color.bg;
  return luminance(base) > 0.62 ? product.color.fg : base;
}

function assetSlug(product) {
  const match = product.image.match(/front-(.+)\.webp$/);
  if (!match) {
    throw new Error(`Cannot derive asset slug for ${product.slug}`);
  }
  return match[1];
}

async function findBackPanelCrop(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const mask = new Uint8Array(info.width * info.height);

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const index = (y * info.width + x) * info.channels;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);

      if (r > 225 && g > 225 && b > 225 && max - min < 18) {
        mask[y * info.width + x] = 1;
      }
    }
  }

  const seen = new Uint8Array(mask.length);
  const stack = [];
  const components = [];

  for (let index = 0; index < mask.length; index += 1) {
    if (!mask[index] || seen[index]) {
      continue;
    }

    seen[index] = 1;
    stack.push(index);

    let minX = info.width;
    let minY = info.height;
    let maxX = 0;
    let maxY = 0;
    let count = 0;

    while (stack.length > 0) {
      const current = stack.pop();
      const x = current % info.width;
      const y = Math.floor(current / info.width);
      count += 1;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);

      for (const next of [current - 1, current + 1, current - info.width, current + info.width]) {
        if (next < 0 || next >= mask.length || seen[next] || !mask[next]) {
          continue;
        }

        const nextX = next % info.width;
        if ((next === current - 1 && nextX !== x - 1) || (next === current + 1 && nextX !== x + 1)) {
          continue;
        }

        seen[next] = 1;
        stack.push(next);
      }
    }

    const width = maxX - minX + 1;
    const height = maxY - minY + 1;

    if (count > 1000 && height > info.height * 0.65 && width > info.width * 0.25) {
      components.push({ minX, minY, maxX, maxY, width, height, count });
    }
  }

  const centerX = info.width / 2;
  const centerY = info.height / 2;
  const component = components
    .filter((item) => !(item.width > info.width * 0.85 && item.height > info.height * 0.95))
    .sort((a, b) => {
      const aCenterPenalty = Math.abs((a.minX + a.maxX) / 2 - centerX) + Math.abs((a.minY + a.maxY) / 2 - centerY) * 0.25;
      const bCenterPenalty = Math.abs((b.minX + b.maxX) / 2 - centerX) + Math.abs((b.minY + b.maxY) / 2 - centerY) * 0.25;
      return aCenterPenalty - bCenterPenalty || (b.width * b.height) - (a.width * a.height);
    })[0];

  if (!component) {
    throw new Error(`Cannot find central back label panel in ${inputPath}`);
  }

  return {
    left: component.minX,
    top: component.minY,
    width: component.width,
    height: component.height
  };
}

function isFinder(x, y, size) {
  return (
    (x <= 6 && y <= 6) ||
    (x >= size - 7 && y <= 6) ||
    (x <= 6 && y >= size - 7)
  );
}

function moduleIsDark(qr, x, y) {
  return qr.modules.data[y * qr.modules.size + x];
}

function dropPath(x, y, size, corner) {
  const cx = x + size / 2;
  const cy = y + size / 2;

  if (corner === 'top-left') {
    return `M ${cx} ${y} C ${x + size * 0.18} ${y + size * 0.06} ${x} ${y + size * 0.33} ${x} ${cy} C ${x} ${y + size * 0.78} ${x + size * 0.22} ${y + size} ${cx} ${y + size} C ${x + size * 0.8} ${y + size} ${x + size} ${y + size * 0.8} ${x + size} ${cy} C ${x + size} ${y + size * 0.2} ${cx} ${y} ${cx} ${y} Z`;
  }

  if (corner === 'top-right') {
    return `M ${cx} ${y} C ${x + size * 0.82} ${y + size * 0.06} ${x + size} ${y + size * 0.33} ${x + size} ${cy} C ${x + size} ${y + size * 0.78} ${x + size * 0.78} ${y + size} ${cx} ${y + size} C ${x + size * 0.2} ${y + size} ${x} ${y + size * 0.8} ${x} ${cy} C ${x} ${y + size * 0.2} ${cx} ${y} ${cx} ${y} Z`;
  }

  return `M ${cx} ${y + size} C ${x + size * 0.18} ${y + size * 0.94} ${x} ${y + size * 0.67} ${x} ${cy} C ${x} ${y + size * 0.22} ${x + size * 0.22} ${y} ${cx} ${y} C ${x + size * 0.8} ${y} ${x + size} ${y + size * 0.2} ${x + size} ${cy} C ${x + size} ${y + size * 0.8} ${cx} ${y + size} ${cx} ${y + size} Z`;
}

function finderSvg(x, y, moduleSize, accent, corner) {
  const outer = moduleSize * 7;
  const dropSize = outer + moduleSize * 2.35;
  const dropOffset = (dropSize - outer) / 2;
  const plateInset = moduleSize * 0.28;
  const finderRadius = moduleSize * 0.28;

  return `
    <path d="${dropPath(x - dropOffset, y - dropOffset, dropSize, corner)}" fill="${accent}"/>
    <rect x="${x - plateInset}" y="${y - plateInset}" width="${outer + plateInset * 2}" height="${outer + plateInset * 2}" rx="${moduleSize * 0.72}" fill="#ffffff"/>
    <rect x="${x}" y="${y}" width="${outer}" height="${outer}" rx="${finderRadius}" fill="#231f20"/>
    <rect x="${x + moduleSize}" y="${y + moduleSize}" width="${moduleSize * 5}" height="${moduleSize * 5}" rx="${finderRadius}" fill="#ffffff"/>
    <rect x="${x + moduleSize * 2}" y="${y + moduleSize * 2}" width="${moduleSize * 3}" height="${moduleSize * 3}" rx="${finderRadius}" fill="#231f20"/>
  `;
}

function colorizedLogoSvg(logoSvg, accent) {
  return logoSvg
    .replace(/<\?xml[^>]*>\s*/g, '')
    .replace(/#231f20/gi, accent);
}

function qrCardSvg({ product, logoSvg }) {
  const qr = QRCode.create(`https://plyndo.pl/produkt/${productUrlSlug(product)}`, {
    errorCorrectionLevel: 'H',
    margin: 0,
  });
  const size = qr.modules.size;
  const moduleSize = qrSize / size;
  const accent = readableAccent(product);
  const label = product.i18n?.pl?.displayName ?? product.name;
  const dots = [];

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!moduleIsDark(qr, x, y) || isFinder(x, y, size)) {
        continue;
      }
      const dotSize = moduleSize * 0.95;
      const dotInset = (moduleSize - dotSize) / 2;
      dots.push(`<rect x="${qrX + x * moduleSize + dotInset}" y="${qrY + y * moduleSize + dotInset}" width="${dotSize}" height="${dotSize}" rx="${dotSize * 0.25}" fill="#231f20"/>`);
    }
  }

  const logoWidth = 235;
  const logoHeight = 70;
  const logoPlateWidth = 300;
  const logoPlateHeight = 138;
  const logoPlateX = (canvasSize - logoPlateWidth) / 2;
  const logoPlateY = qrY + (qrSize - logoPlateHeight) / 2;
  const logoX = (canvasSize - logoWidth) / 2;
  const logoY = logoPlateY + (logoPlateHeight - logoHeight) / 2;

  return `
    <svg width="${canvasSize}" height="${canvasSize}" viewBox="0 0 ${canvasSize} ${canvasSize}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${canvasSize}" height="${canvasSize}" rx="72" fill="#ffffff"/>
      <rect x="42" y="42" width="${canvasSize - 84}" height="${canvasSize - 84}" rx="58" fill="none" stroke="${product.color.bg}" stroke-width="26"/>
      <rect x="${qrFrameX}" y="${qrFrameY}" width="${qrFrameSize}" height="${qrFrameSize}" rx="42" fill="#ffffff" stroke="${product.color.bg}" stroke-width="12"/>
      <g>
        ${dots.join('\n')}
        ${finderSvg(qrX, qrY, moduleSize, accent, 'top-left')}
        ${finderSvg(qrX + (size - 7) * moduleSize, qrY, moduleSize, accent, 'top-right')}
        ${finderSvg(qrX, qrY + (size - 7) * moduleSize, moduleSize, accent, 'bottom-left')}
      </g>
      <rect x="${logoPlateX}" y="${logoPlateY}" width="${logoPlateWidth}" height="${logoPlateHeight}" rx="34" fill="#ffffff" stroke="${product.color.bg}" stroke-width="10"/>
      <svg x="${logoX}" y="${logoY}" width="${logoWidth}" height="${logoHeight}" viewBox="0 0 666.66669 193.73199">
        ${colorizedLogoSvg(logoSvg, accent)}
      </svg>
      <text x="${canvasSize / 2}" y="${captionY}" text-anchor="middle" font-family="Lora, Georgia, serif" font-size="58" font-style="italic" font-weight="500" fill="#231f20">${escapeXml(label)}</text>
    </svg>
  `;
}

await fs.mkdir('public/qr', { recursive: true });
await fs.mkdir('public/labels/back-panels', { recursive: true });

const logoSvg = await fs.readFile('public/logo-black.svg', 'utf8');

for (const product of products) {
  const labelAssetSlug = assetSlug(product);
  const publicSlug = productUrlSlug(product);

  const backLabelPath = `public/labels/back-${labelAssetSlug}.webp`;
  const crop = await findBackPanelCrop(backLabelPath);

  await sharp(backLabelPath)
    .extract(crop)
    .resize({ height: 1790, fit: 'contain', withoutEnlargement: false })
    .webp({ quality: 92 })
    .toFile(`public/labels/back-panels/back-panel-${labelAssetSlug}.webp`);

  await sharp(Buffer.from(qrCardSvg({ product, logoSvg })))
    .png({ compressionLevel: 9 })
    .toFile(`public/qr/${publicSlug}.png`);

  await fs.writeFile(`public/qr/${publicSlug}.svg`, qrCardSvg({ product, logoSvg }), 'utf8');
}
