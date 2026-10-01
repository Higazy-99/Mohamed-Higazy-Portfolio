// Puts the rendered page into every built HTML file, so the content is in the HTML before any JavaScript runs.
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr` (see the build script in package.json).
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve('dist');
const ssr = resolve('dist-ssr', 'entry-server.js');
if (!existsSync(ssr)) throw new Error('prerender: dist-ssr/entry-server.js is missing');
const { render, paths } = await import(pathToFileURL(ssr).href);

const marker = '<div id="root"></div>';
let written = 0;
for (const path of paths) {
  const html = render(path);
  const files = path === '/' ? [join(root, 'index.html')] : [join(root, `${path}.html`), join(root, path, 'index.html')];
  for (const file of files) {
    const page = readFileSync(file, 'utf8');
    if (!page.includes(marker)) throw new Error(`prerender: no empty root in ${file}`);
    writeFileSync(file, page.replace(marker, () => `<div id="root">${html}</div>`));
    written += 1;
  }
  console.log(`prerender: ${path} (${Math.round(html.length / 1024)} KB of HTML)`);
}
rmSync(resolve('dist-ssr'), { recursive: true, force: true });
console.log(`prerender: ${written} files updated`);
