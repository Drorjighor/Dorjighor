# Production Launch Checklist

## 1) Before Deploy

1. Run type check:
   npm run lint
2. Build production bundle:
   npm run build
3. Confirm no secrets are embedded in frontend code.
4. Confirm BrowserRouter rewrite exists in vercel.json.

## 2) Vercel Project Setup

1. Import repository into Vercel.
2. Verify settings:
   - Framework Preset: Vite
   - Build Command: npm run build
   - Output Directory: dist
3. Deploy main branch.

## 3) Immediate Post Deploy Checks

1. Open homepage.
2. Test deep-link refresh directly on:
   - /products
   - /product/1
3. Run automated checks:
   npm run check:deploy -- https://your-domain.vercel.app

## 4) Essential Project Settings

1. Add custom domain.
2. Enforce HTTPS (default on Vercel).
3. Set www/non-www redirect based on your preference.
4. Enable Vercel Analytics if needed.

## 5) Business Smoke Test

1. Browse products and filters.
2. Open product details and quick view.
3. Add to cart and go to checkout page.
4. Login, account, orders, wishlist pages open correctly.

## 6) Optional but Recommended

1. Add OG tags and meta description in index.html.
2. Add robots.txt and sitemap.xml.
3. Add error monitoring (for example Sentry).
4. Add web analytics events for product view and checkout start.
