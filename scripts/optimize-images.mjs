import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const IMAGE_DIR = 'public/images/postureprime';
const MAX_WIDTH = 1920;
const QUALITY = 85;

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();

  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return null;
  }

  const beforeStats = await stat(filePath);
  const beforeSize = (beforeStats.size / 1024 / 1024).toFixed(2);

  console.log(`\nOptimizing ${filePath}...`);
  console.log(`  Before: ${beforeSize} MB`);

  // Create backup
  const backupPath = filePath.replace(ext, `.backup${ext}`);

  try {
    // Read the image and get metadata
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize if necessary and optimize
    await image
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(filePath.replace(ext, '.optimized.jpg'));

    // Replace original with optimized
    await sharp(filePath.replace(ext, '.optimized.jpg'))
      .toFile(backupPath);

    const { default: fs } = await import('fs/promises');
    await fs.rename(filePath.replace(ext, '.optimized.jpg'), filePath);

    const afterStats = await stat(filePath);
    const afterSize = (afterStats.size / 1024 / 1024).toFixed(2);
    const reduction = ((1 - afterStats.size / beforeStats.size) * 100).toFixed(1);

    console.log(`  After: ${afterSize} MB`);
    console.log(`  Reduced by ${reduction}%`);

    return {
      file: filePath,
      beforeSize: parseFloat(beforeSize),
      afterSize: parseFloat(afterSize),
      reduction: parseFloat(reduction),
    };
  } catch (error) {
    console.error(`  Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('Starting image optimization...\n');

  const files = await readdir(IMAGE_DIR);
  const results = [];

  for (const file of files) {
    const filePath = join(IMAGE_DIR, file);
    const result = await optimizeImage(filePath);
    if (result) {
      results.push(result);
    }
  }

  if (results.length > 0) {
    console.log('\n' + '='.repeat(50));
    console.log('SUMMARY');
    console.log('='.repeat(50));

    const totalBefore = results.reduce((sum, r) => sum + r.beforeSize, 0);
    const totalAfter = results.reduce((sum, r) => sum + r.afterSize, 0);
    const totalReduction = ((1 - totalAfter / totalBefore) * 100).toFixed(1);

    console.log(`\nTotal before: ${totalBefore.toFixed(2)} MB`);
    console.log(`Total after: ${totalAfter.toFixed(2)} MB`);
    console.log(`Total reduction: ${totalReduction}%`);
    console.log(`Saved: ${(totalBefore - totalAfter).toFixed(2)} MB\n`);
  } else {
    console.log('\nNo images were optimized.');
  }
}

main().catch(console.error);
