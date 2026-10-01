import { defineConfig, type Plugin } from 'vite';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { absoluteUrl, headHtml, routes } from './src/seo/routes.ts';

/* The address every absolute URL (canonical, og:image, sitemap) is built from.
   SITE_URL wins; on Vercel the production address comes from the platform; locally it falls back to the preview server. */
function siteAddress() {
  const env = process.env;
  if (env.SITE_URL) return env.SITE_URL.replace(/\/+$/, '');
  // the live address; a fixed value because Vercel's own production-URL variable can still point to the old project name
  if (env.VERCEL_ENV === 'production') return 'https://mohamedhigazy.vercel.app';
  const vercel = env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return 'http://127.0.0.1:4173';
}

/* Gives every route its own HTML file with its own head, plus sitemap.xml and robots.txt. The app itself is untouched. */
function seoPages(): Plugin {
  const site = siteAddress();
  let outDir = 'dist';
  return {
    name: 'seo-pages',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace('<!--app-head-->', headHtml(routes[0], site));
      },
    },
    closeBundle() {
      const root = join(process.cwd(), outDir);
      const indexFile = join(root, 'index.html');
      if (!existsSync(indexFile)) return;
      const home = readFileSync(indexFile, 'utf8');
      const homeHead = headHtml(routes[0], site);
      if (!home.includes(homeHead)) throw new Error('seo-pages: the home head block was not found in dist/index.html');
      for (const route of routes.slice(1)) {
        const html = home.replace(homeHead, headHtml(route, site));
        // /work/x is served from x.html (cleanUrls) and /work/x/ from x/index.html, so both forms get the same page
        const folderFile = join(root, route.path, 'index.html');
        mkdirSync(dirname(folderFile), { recursive: true });
        writeFileSync(folderFile, html);
        writeFileSync(join(root, `${route.path}.html`), html);
      }
      const urls = routes.map((route) => `  <url><loc>${absoluteUrl(site, route.path)}${route.path === '/' ? '/' : ''}</loc></url>`).join('\n');
      writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
      const robotsFile = join(root, 'robots.txt');
      const robots = existsSync(robotsFile) ? readFileSync(robotsFile, 'utf8').trimEnd() : 'User-agent: *\nAllow: /';
      writeFileSync(robotsFile, `${robots}\n\nSitemap: ${site}/sitemap.xml\n`);
      console.log(`seo-pages: ${routes.length} pages, sitemap and robots written for ${site}`);
    },
  };
}

export default defineConfig({
  plugins: [seoPages()],
});
