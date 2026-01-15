const { minify } = require('html-minifier-terser');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'index.html');
const DEST_DIR = path.join(ROOT, 'docs');
const DEST = path.join(DEST_DIR, 'index.html');

async function build() {
  const html = fs.readFileSync(SRC, 'utf-8');

  const minified = await minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
  });

  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  fs.writeFileSync(DEST, minified);
  console.log(`Built: ${DEST} (${minified.length} bytes)`);
}

build().catch(console.error);
