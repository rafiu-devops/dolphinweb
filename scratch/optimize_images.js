const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directoryPath = 'd:/Github Repos/dolphinweb/public/dc-images/ext';

async function optimizeImages() {
  try {
    const files = fs.readdirSync(directoryPath);
    console.log(`Found ${files.length} files in ${directoryPath}`);

    for (const file of files) {
      if (file.toLowerCase().endsWith('.png')) {
        const inputPath = path.join(directoryPath, file);
        const outputPath = path.join(directoryPath, file.replace('.png', '.webp'));

        const statsBefore = fs.statSync(inputPath);
        console.log(`Processing ${file} (${(statsBefore.size / 1024 / 1024).toFixed(2)} MB)...`);

        await sharp(inputPath)
          .resize(1920, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);

        const statsAfter = fs.statSync(outputPath);
        console.log(`Saved ${path.basename(outputPath)} (${(statsAfter.size / 1024 / 1024).toFixed(2)} MB) - Reduction: ${((1 - statsAfter.size / statsBefore.size) * 100).toFixed(2)}%`);
      }
    }
    console.log('Optimization complete!');
  } catch (err) {
    console.error('Error processing images:', err);
  }
}

optimizeImages();
