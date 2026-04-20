# DORJIGHOR Frontend

React + TypeScript + Vite based e-commerce storefront for DORJIGHOR.

## Run Locally

Prerequisites: Node.js 18+

1. Install dependencies:
   npm install
2. Start development server:
   npm run dev

## Build For Production

1. Type check:
   npm run lint
2. Build:
   npm run build
3. Preview build:
   npm run preview

## Deployment Note

This app uses BrowserRouter, so static hosting must rewrite all non-file routes to index.html.

## Deploy To Vercel (Frontend Only)

1. Push this project to GitHub.
2. In Vercel, click Add New Project and import the repository.
3. Keep defaults or verify:
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
4. Click Deploy.

Already configured in this repo:
- vercel.json with SPA rewrite to index.html
- long cache for hashed assets under /assets
# Dorjighor
