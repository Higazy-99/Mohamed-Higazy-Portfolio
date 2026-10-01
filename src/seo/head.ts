import { SITE_NAME, absoluteUrl, findRoute } from './routes';

/** Updates the head tags for the current page after a client-side navigation. The first load already has them in the HTML. */
export function applyRouteHead(path: string) {
  const route = findRoute(path);
  const site = window.location.origin;
  const url = absoluteUrl(site, route.path) + (route.path === '/' ? '/' : '');
  const image = site + route.ogImage;
  document.title = route.title;
  const set = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
    let el = document.head.querySelector<HTMLElement>(selector);
    if (!el) {
      el = create();
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };
  const meta = (key: 'name' | 'property', name: string, value: string) =>
    set(`meta[${key}="${name}"]`, () => { const m = document.createElement('meta'); m.setAttribute(key, name); return m; }, 'content', value);
  set('link[rel="canonical"]', () => { const l = document.createElement('link'); l.rel = 'canonical'; return l; }, 'href', url);
  meta('name', 'description', route.description);
  meta('property', 'og:type', route.type);
  meta('property', 'og:site_name', SITE_NAME);
  meta('property', 'og:title', route.title);
  meta('property', 'og:description', route.description);
  meta('property', 'og:url', url);
  meta('property', 'og:image', image);
  meta('property', 'og:image:alt', route.ogImageAlt);
  meta('name', 'twitter:title', route.title);
  meta('name', 'twitter:description', route.description);
  meta('name', 'twitter:image', image);
}
