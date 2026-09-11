const sharp = require('sharp');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

// Couleurs reprises de src/themes/chakra.ts
const PARCHMENT_50 = '#fefcf8';
const PARCHMENT_200 = '#f5eed8';
const BRAND_300 = '#d4b87e';
const BRAND_400 = '#c49a5c';
const BRAND_700 = '#5c4729';
const BRAND_800 = '#3d2b1f';
const WARMGRAY_500 = '#8c7a62';

// librsvg ne voit que les polices installées sur le système : Playfair Display et
// Crimson Text viennent de next/font/google et ne sont donc pas disponibles ici.
const SERIF = "Georgia, 'Times New Roman', serif";

const WIDTH = 1200;
const HEIGHT = 630;

const COVERS = ['livre1.jpg', 'livre2.jpg', 'livre3.jpg', 'livre4.jpg'];
const COVER_HEIGHT = 320;
const COVER_GAP = 28;
const COVERS_TOP = 268;
const BORDER = 2;

function backgroundSvg() {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${PARCHMENT_50}"/>
      <stop offset="100%" stop-color="${PARCHMENT_200}"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#ground)"/>
  <rect x="18" y="18" width="${WIDTH - 36}" height="${HEIGHT - 36}"
        fill="none" stroke="${BRAND_300}" stroke-width="2"/>
  <rect x="26" y="26" width="${WIDTH - 52}" height="${HEIGHT - 52}"
        fill="none" stroke="${BRAND_300}" stroke-width="1" stroke-opacity="0.55"/>
</svg>`);
}

function textSvg() {
  const centerX = WIDTH / 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <text x="${centerX}" y="122" text-anchor="middle" font-family="${SERIF}"
        font-size="76" font-weight="700" font-style="italic" fill="${BRAND_800}">Michel Golfier</text>
  <text x="${centerX}" y="172" text-anchor="middle" font-family="${SERIF}"
        font-size="26" font-weight="400" letter-spacing="6" fill="${WARMGRAY_500}">AUTEUR AUVERGNAT</text>
  <line x1="${centerX - 150}" y1="212" x2="${centerX - 24}" y2="212" stroke="${BRAND_300}" stroke-width="1"/>
  <line x1="${centerX + 24}" y1="212" x2="${centerX + 150}" y2="212" stroke="${BRAND_300}" stroke-width="1"/>
  <text x="${centerX}" y="221" text-anchor="middle" font-family="${SERIF}"
        font-size="24" fill="${BRAND_400}">&#9671;</text>
</svg>`);
}

async function prepareCovers() {
  return Promise.all(
    COVERS.map(async (file) => {
      const buffer = await sharp(path.join(publicDir, 'img', file))
        .resize({ height: COVER_HEIGHT - BORDER * 2 })
        .extend({
          top: BORDER,
          bottom: BORDER,
          left: BORDER,
          right: BORDER,
          background: BRAND_700,
        })
        .toBuffer();
      const { width, height } = await sharp(buffer).metadata();
      return { buffer, width, height };
    })
  );
}

async function generateOgImage() {
  const covers = await prepareCovers();
  const rowWidth =
    covers.reduce((sum, c) => sum + c.width, 0) + COVER_GAP * (covers.length - 1);

  let cursor = Math.round((WIDTH - rowWidth) / 2);
  const coverLayers = covers.map((cover) => {
    const layer = {
      input: cover.buffer,
      left: cursor,
      top: COVERS_TOP,
    };
    cursor += cover.width + COVER_GAP;
    return layer;
  });

  const outputPath = path.join(publicDir, 'og-image.jpg');
  const info = await sharp(backgroundSvg())
    .composite([{ input: textSvg(), left: 0, top: 0 }, ...coverLayers])
    .jpeg({ quality: 88, progressive: true, chromaSubsampling: '4:4:4' })
    .toFile(outputPath);

  console.log(
    `✓ og-image.jpg: ${info.width}x${info.height}, ${Math.round(info.size / 1024)}KB`
  );
}

// Monogramme sur fond parchemin : les couvertures et le portrait de l'auteur sont
// illisibles une fois réduits à 180 pixels de côté.
function iconSvg(size) {
  const scale = size / 180;
  const round = (value) => Math.round(value * scale);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="${PARCHMENT_50}"/>
  <rect x="${round(7)}" y="${round(7)}" width="${size - round(14)}" height="${size - round(14)}"
        fill="none" stroke="${BRAND_300}" stroke-width="${round(3)}"/>
  <text x="${size / 2}" y="${round(106)}" text-anchor="middle" font-family="${SERIF}"
        font-size="${round(72)}" font-weight="700" font-style="italic" fill="${BRAND_800}">MG</text>
  <text x="${size / 2}" y="${round(145)}" text-anchor="middle" font-family="${SERIF}"
        font-size="${round(20)}" fill="${BRAND_400}">&#9671;</text>
</svg>`);
}

async function generateIcon(file, size) {
  const info = await sharp(iconSvg(size))
    .png()
    .toFile(path.join(publicDir, file));

  console.log(
    `✓ ${file}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)}KB`
  );
}

async function main() {
  await generateOgImage();
  await generateIcon('apple-touch-icon.png', 180);
  await generateIcon('icon-192.png', 192);
  await generateIcon('icon-512.png', 512);
  console.log('Done!');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
