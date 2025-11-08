import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const CONFIG = {
  img: {
    sizes: [1920, 1280, 768],
    quality: 92,
  },
  img_facility: {
    sizes: [1600, 1200, 800],
    quality: 92,
  },
};

const FORMATS = {
  webp: (pipeline, quality) => pipeline.webp({ quality, effort: 4 }),
  jpg: (pipeline, quality) => pipeline.jpeg({ quality, mozjpeg: true }),
};

async function buildVariants(dir) {
  const settings = CONFIG[dir];
  if (!settings) return;
  const files = (await readdir(dir)).filter((file) => /\.(jpe?g|png)$/i.test(file));
  for (const file of files) {
    const srcPath = path.join(dir, file);
    const base = path.join(dir, path.parse(file).name);
    for (const size of settings.sizes) {
      const resized = sharp(srcPath).resize({ width: size, withoutEnlargement: true });
      for (const [ext, formatter] of Object.entries(FORMATS)) {
        const targetPath = `${base}-${size}.${ext}`;
        await formatter(resized.clone(), settings.quality).toFile(targetPath);
        console.log(`• ${targetPath}`);
      }
    }
  }
}

(async () => {
  for (const dir of Object.keys(CONFIG)) {
    await buildVariants(dir);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
