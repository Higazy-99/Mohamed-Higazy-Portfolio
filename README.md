# Mohamed Higazy · Portfolio

Personal portfolio of Mohamed Higazy, CX / UX Designer. React 19, TypeScript and Vite.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

The build output goes to `dist/`.

## Structure

| Path | What it holds |
|---|---|
| `src/App.tsx` | Home page, routing, cursor |
| `src/CaseStudy.tsx` | The Wijha UX concept page (`/work/wijha`) |
| `src/projects.json` | Work shown in "Selected work" (Behance data plus the Wijha entry) |
| `src/components/mellow/` | Expanding panels, dither spotlight, word reveal |
| `public/` | CV, hero frames, client logos and case images |

## Deploy

The site is a single-page app with one extra route, so every path must fall back to `index.html`. `vercel.json` already does this.

## Notes

- Client logos and the Wijha images are shown with the owners' permission only. Review them before publishing.
- Update the `og:image` and `og:url` values in `index.html` once the final domain is known.

