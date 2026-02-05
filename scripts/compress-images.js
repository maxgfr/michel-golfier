const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/img');
const images = fs.readdirSync(imagesDir)
  .filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));

async function compressImages() {
  console.log(`Found ${images.length} images to process...\n`);

  for (const img of images) {
    const inputPath = path.join(imagesDir, img);
    const stats = fs.statSync(inputPath);
    const sizeKB = Math.round(stats.size / 1024);

    if (stats.size > 200 * 1024) {
      console.log(`Compressing ${img} (${sizeKB}KB)...`);

      await sharp(inputPath)
        .jpeg({ quality: 85, progressive: true })
        .toFile(inputPath + '.tmp');

      const newStats = fs.statSync(inputPath + '.tmp');
      const newSizeKB = Math.round(newStats.size / 1024);

      fs.renameSync(inputPath + '.tmp', inputPath);

      const savings = Math.round((1 - newStats.size / stats.size) * 100);
      console.log(`✓ ${img}: ${sizeKB}KB → ${newSizeKB}KB (${savings}% reduction)\n`);
    } else {
      console.log(`✓ ${img}: ${sizeKB}KB (already optimized, skipping)\n`);
    }
  }

  console.log('Done!');
}

compressImages().catch(console.error);
