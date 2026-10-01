import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { routes } from './seo/routes';

/** Used by scripts/prerender.mjs at build time: the HTML of one route. */
export const paths = routes.map((route) => route.path);

export function render(path: string) {
  return renderToString(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
  );
}
