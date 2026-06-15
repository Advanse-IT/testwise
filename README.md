# Testwise — by Advanse-IT

> Autonomous QA that knows when to ask.

Production website for **Testwise**, Advanse-IT's autonomous AI QA pipeline product.

**Live:** [testwise.advanseit.com.au](https://testwise.advanseit.com.au)

## Stack

- Pure HTML/CSS/JS — zero build step, zero dependencies
- Deployed via Cloudflare Pages
- Fonts: Syne + DM Sans (Google Fonts)
- Icons: Font Awesome 6 (CDN)

## Deploy

### Option A — Cloudflare Pages dashboard (simplest)
1. Push this repo to GitHub under `Advanse-IT` org
2. Go to Cloudflare Pages → Create project → Connect to Git
3. Select this repo, set build command to blank, output directory to `.`
4. Add custom domain: `testwise.advanseit.com.au`

### Option B — GitHub Actions (automatic on push)
1. Add two repo secrets:
   - `CLOUDFLARE_API_TOKEN` — generate at dash.cloudflare.com/profile/api-tokens
   - `CLOUDFLARE_ACCOUNT_ID` — found on your Cloudflare dashboard right sidebar
2. Push to `main` — deploys automatically

### Custom domain setup
In Cloudflare DNS (advanseit.com.au zone):
- Add CNAME: `testwise` → `testwise-advanseit.pages.dev`
- Cloudflare Pages will auto-provision SSL

## Local development

No build step needed. Just open `index.html` in a browser, or:

```bash
npx serve .
```

## Structure

```
/
├── index.html          # Entire site (single file)
├── _headers            # Cloudflare security headers
├── .github/
│   └── workflows/
│       └── deploy.yml  # Auto-deploy on push to main
└── README.md
```

## Updating content

All content is in `index.html`. Key sections:

- **Hero stats** — search `hero-stat-val`
- **Pipeline stages** — search `const STAGES`
- **Mode presets** — search `const MODES`
- **Pricing** — search `price-card`
- **FAQ** — search `const FAQS`
- **Contact email** — search `hello@advanseit.com.au`

---

© 2026 Advanse-IT Pty Ltd · Brisbane, Australia
