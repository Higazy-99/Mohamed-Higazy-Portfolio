/* One source for every page's head: used by the build (static HTML per route, sitemap) and by the app at run time (title, description, canonical). No browser or React imports here, so vite.config.ts can load it too. */

export const SITE_NAME = 'Mohamed Higazy';

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  /** Path under the site root. Absolute URLs are built from the site address. */
  ogImage: string;
  ogImageAlt: string;
  type: 'website' | 'article';
};

export const routes: SeoRoute[] = [
  {
    path: '/',
    title: 'Mohamed Higazy – CX / UX Designer',
    description: 'CX / UX Designer in Giza, Egypt. User research, service design and digital products across web and mobile.',
    ogImage: '/og-image.jpg',
    ogImageAlt: 'Mohamed Higazy, CX / UX Designer',
    type: 'website',
  },
  {
    path: '/work/wijha',
    title: 'Wijha – Dispatch Engine | Mohamed Higazy',
    description: 'Wijha is an AI-powered dispatch engine that decides who should handle each work item, keeping every assignment traceable and human-controlled.',
    ogImage: '/og/wijha.jpg',
    ogImageAlt: 'Wijha, an AI-powered dispatch engine: a UX concept by Mohamed Higazy',
    type: 'article',
  },
  {
    path: '/work/stc-inspector',
    title: 'STC Inspector – Field Inspection MVP | Mohamed Higazy',
    description: 'An MVP that connects the inspector on site with the admin who assigns, reviews and closes every inspection.',
    ogImage: '/og/stc-inspector.jpg',
    ogImageAlt: 'STC Inspector, a field inspection MVP: a UX case study by Mohamed Higazy',
    type: 'article',
  },
  {
    path: '/work/fan-id',
    title: 'Fan-ID – AFC Asian Cup | Mohamed Higazy',
    description: 'One Fan-ID for the AFC Under-23 Asian Cup 2026 and the AFC Asian Cup 2027. UX benchmarking, fan journey and principles, through to a proof of concept.',
    ogImage: '/og/fan-id.jpg',
    ogImageAlt: 'Fan-ID for the AFC Asian Cup: a UX case study by Mohamed Higazy',
    type: 'article',
  },
  {
    path: '/work/film-saudi',
    title: 'Film Saudi – UX Audit | Mohamed Higazy',
    description: "A heuristic evaluation of the Film Saudi platform and the services it connects to, Daw and Abde'a, with findings rated by severity.",
    ogImage: '/og/film-saudi.jpg',
    ogImageAlt: 'Film Saudi UX audit: a heuristic evaluation by Mohamed Higazy',
    type: 'article',
  },
  {
    path: '/work/smart-book-fair',
    title: 'Smart Book Fair – Digital Visitor Experience | Mohamed Higazy',
    description: 'A concept for one end-to-end digital visitor experience at a book fair, from the QR scan to the exit survey: a live map with AR wayfinding to follow in phase 3, book signing slots, a rewards system, crowd management and an admin dashboard.',
    ogImage: '/og/smart-book-fair.jpg',
    ogImageAlt: 'Smart Book Fair, a complete digital visitor experience: an experience design case by Mohamed Higazy',
    type: 'article',
  },
];

export const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';

export const findRoute = (path: string) => routes.find((route) => route.path === normalizePath(path)) ?? routes[0];

/** Joins a site address and a path with no trailing slash, except for the home page. */
export const absoluteUrl = (site: string, path: string) => site.replace(/\/+$/, '') + (path === '/' ? '' : normalizePath(path));

const esc = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The head tags of one route, as HTML. */
export function headHtml(route: SeoRoute, site: string) {
  const url = absoluteUrl(site, route.path) + (route.path === '/' ? '/' : '');
  const image = site.replace(/\/+$/, '') + route.ogImage;
  return [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.type}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(route.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join('\n    ');
}
