# Testwise — by Advanse IT

> Autonomous QA, built around your stack.

**Live:** https://testwise.advanseit.com.au

## Stack

- React 18 + Vite
- React Router v6 (multi-page SPA)
- Framer Motion (page transitions + scroll animations)
- Tailwind CSS (custom enterprise design tokens)
- Lucide React (icons)
- Deployed via Cloudflare Pages

## Project structure

```
src/
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Pipeline.jsx       # Interactive pipeline configurator
│   ├── HowItWorks.jsx     # Implementation steps
│   ├── Industries.jsx     # Verticals and compliance
│   ├── Pricing.jsx        # Pricing + FAQ
│   ├── Contact.jsx        # Contact page
│   └── NotFound.jsx       # 404
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── ui/
│       ├── PageWrapper.jsx  # Page transition wrapper
│       ├── Reveal.jsx       # Scroll reveal animation
│       ├── SectionHeader.jsx
│       ├── Divider.jsx
│       ├── ParticleCanvas.jsx
│       └── Icon.jsx
├── hooks/
│   ├── useInView.js        # Intersection Observer hook
│   ├── useCountUp.js       # Animated number counter
│   └── useParticleCanvas.js
├── lib/
│   └── data.js             # All site content (single source of truth)
└── index.css               # Global styles + design tokens
```

## Dev

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Production build to /dist
npm run preview   # Preview production build
```

## Deploy to Cloudflare Pages

### Option A — Dashboard (simplest, no secrets needed)
1. Push this repo to GitHub under your Advanse IT org
2. Cloudflare Pages → Create project → Connect to Git → select repo
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Add custom domain: `testwise.advanseit.com.au`

### Option B — GitHub Actions (auto-deploy on push to main)
Add two repository secrets:
- `CLOUDFLARE_API_TOKEN` — from dash.cloudflare.com/profile/api-tokens (use "Edit Cloudflare Workers" template)
- `CLOUDFLARE_ACCOUNT_ID` — from the right sidebar of your Cloudflare dashboard

### Custom domain DNS (in Cloudflare DNS for advanseit.com.au)
Add: `CNAME testwise → testwise-advanseit.pages.dev`
Cloudflare Pages auto-provisions SSL.

## Updating content

All content lives in `src/lib/data.js`. Edit that file to update:
- Pipeline stages and tool names
- Gate mode presets
- Vertical/industry descriptions
- Pricing tiers and features
- FAQ answers
- Contact details
