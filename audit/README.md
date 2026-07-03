# Skillplan Audit

## Running the Audit

```bash
# 1. Start the dev server
npx next dev --webpack

# 2. In another terminal, run checks:
npm run lint             # ESLint
npm run build            # Production build
npx lighthouse http://localhost:3000 --output=json --output=html --output-path=./audit/lighthouse-report --chrome-flags="--headless=new --no-sandbox"
```

## Reports

After running, reports are saved to this directory:
- `lighthouse-report.json` — Lighthouse scores (JSON)
- `lighthouse-report.html` — Lighthouse scores (HTML visual)

## Findings Summary (2026-07-03)

### Lighthouse Scores (homepage)

| Category | Score |
|----------|-------|
| Performance | 67 |
| Accessibility | 93 |
| Best Practices | 100 |
| SEO | 100 |

### Fixed Issues

| # | Area | Issue | Fix |
|---|------|-------|-----|
| 1 | Security | No security headers | Added `public/_headers` (Cloudflare/Netlify style), `robots.txt`, CSP, HSTS, X-Frame-Options |
| 2 | Security | `dangerouslySetInnerHTML` unsanitized | Added HTML tag allowlist sanitizer in `Page.js` |
| 3 | SEO | Missing `robots.txt` | Created `public/robots.txt` |
| 4 | SEO | Missing `sitemap.xml` | Created `public/sitemap.xml` (static, all 11 pages) |
| 5 | SEO | No JSON-LD structured data | Added WebSite (homepage), Course (roadmap pages), Person + Organization (layout) |
| 6 | SEO | No canonical URLs | Added `metadata.alternates.canonical` on all pages |
| 7 | A11y | No focus trap in modal | Implemented Tab key trapping in `ProjectModal.js` |
| 8 | A11y | No focus restoration after modal close | Stores `document.activeElement`, restores on unmount |
| 9 | A11y | ScrollAnimations ignores `prefers-reduced-motion` | Checks `matchMedia` before applying JavaScript animations |
| 10 | Perf | All 10 JSON files imported on every page | Dynamic route uses `import()` to load only the needed roadmap JSON |
| 11 | Code | ProgressBar missing `'use client'` | Added directive |
| 12 | Code | `REQ_ICONS` duplicated (HomePage + Page) | Extracted to `lib/req-icons.js` |
| 13 | Code | Unused `WEF_TOP_15` import | Removed from `Page.js` |
| 14 | Code | Roadmap ID lists duplicated in 3 files | Extracted to `lib/roadmaps.js` |
| 15 | Code | `JSON.parse` without try/catch | Added try/catch in `ProgressContext.js` |
| 16 | Code | `localStorage` without try/catch | Added try/catch in `ThemeContext.js` |
| 17 | Code | React ref mutation during render (ProgressContext) | Moved to `useEffect` |
| 18 | Code | setState in effect (ThemeContext) | Moved to lazy `useState` initializer |
| 19 | Code | `<a>` instead of `<Link>` (StickyNav) | Replaced with `next/link` |
| 20 | Docs | README mentions Fraunces font | Removed reference |
| 21 | Docs | Footer says "9 Roadmaps" | Updated to "10 Roadmaps" |
| 22 | Perf | OG image is 3.6KB placeholder | **Needs manual design** — replace `public/og-image.png` with proper 1200x630 image |

### Remaining Items

- **OG Image**: Replace `public/og-image.png` with a proper 1200x630 image (50-200KB recommended)
- **Performance**: Score 67 — main bottlenecks are render-blocking resources and CSS size (monolithic 3200-line stylesheet). Consider code-splitting `globals.css` or extracting critical CSS.
- **Turbopack**: Use `npx next dev --webpack` on Windows until Turbopack SST cache corruption is fixed upstream.
