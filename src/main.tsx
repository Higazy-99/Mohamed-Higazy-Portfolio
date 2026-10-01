import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
// built pages already carry the rendered content (see scripts/prerender.mjs); the dev server serves an empty root
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
