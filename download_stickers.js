const fs = require('fs');
const path = require('path');
const https = require('https');

const STICKER_DIR = path.join(__dirname, 'public', 'stickers');
if (!fs.existsSync(STICKER_DIR)) {
  fs.mkdirSync(STICKER_DIR, { recursive: true });
}

// Helper to download a file
function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const dest = path.join(STICKER_DIR, filename);
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
}

const devIcons = {
  'react.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'ts.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  'js.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'html.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'css.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  'python.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  'github.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  'figma.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
  'cpp.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
  'tailwind.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  'nextjs.svg': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
};

// Twemoji base URL
const TWEMOJI_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/';

const emojiStickers = {
  // Cute
  'chick.svg': '1f425.svg',
  'pig.svg': '1f437.svg',
  'bear.svg': '1f43b.svg',
  'cat.svg': '1f408.svg',
  'rabbit.svg': '1f430.svg',
  'heart.svg': '1f496.svg',
  'star.svg': '2b50.svg',
  'sparkles.svg': '2728.svg',
  'ghost.svg': '1f47b.svg',
  'alien.svg': '1f47d.svg',
  // Plants
  'flower.svg': '1f33c.svg',
  'cactus.svg': '1f335.svg',
  'herb.svg': '1f33f.svg',
  'leaf.svg': '1f342.svg',
  'tree.svg': '1f333.svg',
  // Stationery / Desk
  'coffee.svg': '2615.svg',
  'book.svg': '1f4da.svg',
  'pencil.svg': '270f.svg',
  'computer.svg': '1f4bb.svg',
  'palette.svg': '1f3a8.svg',
};

async function main() {
  console.log('Downloading Dev stickers...');
  for (const [filename, url] of Object.entries(devIcons)) {
    try {
      await downloadFile(url, filename);
      console.log(`Downloaded ${filename}`);
    } catch (e) {
      console.error(e);
    }
  }

  console.log('Downloading Emoji stickers...');
  for (const [filename, unicode] of Object.entries(emojiStickers)) {
    try {
      await downloadFile(TWEMOJI_BASE + unicode, filename);
      console.log(`Downloaded ${filename}`);
    } catch (e) {
      console.error(e);
    }
  }
}

main().catch(console.error);
