# NotiEvan Frontend

Frontend for NotiEvan, a school newspaper to browse and manage articles about what is happening at Evan.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: Wouter
- **Data fetching/caching**: @tanstack/react-query
- **State management**: Zustand
- **HTTP**: Axios
- **Markdown**: Marked + EasyMDE, sanitized via DOMPurify

## Features

- Public article browsing (list, details, random).
- Authenticated flows for authors (create, edit, delete own articles).
- Login/register with JWT; role-aware UI for `AUTHOR` and `ADMIN`.
- Responsive styling using Tailwind.

## Prerequisites

- Node.js (LTS recommended)
- npm

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in `frontend/` and set the backend API base URL:

```env
VITE_PUBLIC_API_URL=http://localhost:3000
```

The app reads this via `import.meta.env.VITE_PUBLIC_API_URL` (see `src/configuration/env.configuration.ts`).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint

## Run (development)

```bash
npm run dev
```

Then open the printed URL from Vite (typically `http://localhost:5173`).

## Build

```bash
npm run build
```

Output goes to `dist/`.

## API Integration

- All HTTP requests target `env.baseUrl` configured from `VITE_PUBLIC_API_URL`.
- For authenticated requests, the frontend includes a Bearer token obtained from the backend `/auth/login` or `/auth/register` responses.

## Deployment (Vercel)

1. Create a Vercel project from the `frontend/` directory.
2. Set `VITE_PUBLIC_API_URL` in Vercel Project Settings → Environment Variables.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Framework preset: Vite/React (or “Other” with the settings above).

## License

MIT

