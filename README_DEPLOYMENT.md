# Testwise — Deployment & Setup Guide

## Project Overview

**Testwise** is a professional, production-ready SaaS website for **Advanse-IT's** autonomous QA pipeline offering. Built with **React 18**, **Vite**, **Tailwind CSS**, and **shadcn/ui**, it delivers a high-end enterprise experience across all devices.

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Advanse-IT/testwise.git
cd testwise

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site will be available at `http://localhost:5173`

---

## Key Features Implemented

### ✅ Navigation & UX
- **Scroll-to-Top**: All navigation links and CTAs automatically scroll to the top of the page
- **Mobile-Optimized Navigation**: Hamburger menu is large (28px), properly positioned, and features a smooth slide-down animation
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Interactive Brand Icon**: Custom SVG icon with hover effects in navbar and footer

### ✅ Hero Section
- **Animated Visualization**: Dynamic QA pipeline flow showing 5 stages (Analyze → Design → Execute → Validate → Report)
- **Typewriter Effect**: Rotating copy that cycles through key value propositions
- **Professional Gradients**: Teal-to-cyan gradient text and background effects

### ✅ Analytics Integration
- **Google Analytics 4**: Full GA4 integration with page view tracking
- **Event Tracking**: Ready for form submissions, CTA clicks, and custom events
- **Conversion Goals**: Framework in place for tracking key user actions

### ✅ Design System
- **shadcn/ui Components**: Professional, accessible UI components
- **Tailwind CSS**: Utility-first styling with custom theme
- **Consistent Typography**: Responsive font scaling with clamp() for fluid typography
- **Color Palette**: Slate + Teal for enterprise aesthetic

### ✅ Performance
- **Vite Bundling**: Fast build times and optimized production bundles
- **Code Splitting**: React Router handles lazy loading
- **SVG Icons**: Lightweight Lucide React icons throughout
- **Smooth Animations**: Framer Motion with GPU acceleration

---

## Important Configuration

### 1. Google Analytics Setup

**REQUIRED**: Replace the placeholder GA4 ID before deployment.

**Files to update:**
- `index.html` (line 42): Replace `G-XXXXXXXXXX` with your GA4 ID
- `src/lib/analytics.js` (line 3): Replace `G-XXXXXXXXXX` with your GA4 ID

Example:
```javascript
// src/lib/analytics.js
const GA_ID = 'G-YOUR_ACTUAL_GA4_ID'
```

### 2. Contact Form Backend

The contact form on `/contact` is currently a UI-only implementation. Choose one backend option:

**Option A: Formspree (Recommended)**
```javascript
// src/pages/Contact.jsx
// Update form action to:
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option B: Netlify Forms**
```javascript
// Add to form element:
<form name="contact" method="POST" netlify>
```

**Option C: Custom API**
```javascript
// Create your own backend endpoint and update the form submission handler
```

### 3. Domain & SSL

- Update `canonical` URL in `index.html` to match your domain
- Ensure HTTPS is enabled on your hosting provider
- Update `og:url` and social meta tags with correct domain

### 4. Email Configuration

Update contact information in `src/lib/data.js`:
```javascript
export const SITE = {
  email: 'hello@advanseit.com.au',
  phone: '+61481261679',
  // ... other config
}
```

---

## Deployment Options

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Traditional Hosting (AWS, DigitalOcean, etc.)
```bash
# Build the project
npm run build

# Upload the `dist/` folder to your hosting provider
# Configure server to serve index.html for all routes (SPA routing)
```

### GitHub Pages
```bash
# Update vite.config.js:
export default {
  base: '/testwise/',
  // ...
}

# Deploy
npm run build
# Push dist/ folder to gh-pages branch
```

---

## Project Structure

```
testwise/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── NavbarNew.jsx          # Main navigation with mobile menu
│   │   │   └── Footer.jsx             # Footer component
│   │   ├── ui/
│   │   │   ├── button.jsx             # shadcn/ui Button
│   │   │   ├── ScrollToTop.jsx        # Scroll-to-top handler
│   │   │   ├── InteractiveTestIcon.jsx # Custom brand icon
│   │   │   ├── HeroVisualization.jsx  # Animated pipeline flow
│   │   │   └── ... (other UI components)
│   │   └── ... (other components)
│   ├── pages/
│   │   ├── Home.jsx                   # Landing page
│   │   ├── Pipeline.jsx               # Pipeline details
│   │   ├── HowItWorks.jsx             # How it works
│   │   ├── Industries.jsx             # Industries served
│   │   ├── Pricing.jsx                # Pricing page
│   │   ├── Contact.jsx                # Contact form
│   │   └── NotFound.jsx               # 404 page
│   ├── lib/
│   │   ├── analytics.js               # GA4 setup
│   │   ├── data.js                    # Site content & config
│   │   └── utils.js                   # Utility functions
│   ├── hooks/
│   │   ├── useCountUp.js              # Number counter animation
│   │   ├── useTypewriter.js           # Typewriter effect
│   │   └── useInView.js               # Intersection observer
│   ├── App.jsx                        # Main app component
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Global styles
├── public/
│   ├── favicon.ico                    # Favicon
│   ├── apple-touch-icon.png           # iOS icon
│   ├── icon-192.png                   # PWA icon
│   ├── icon-512.png                   # PWA icon
│   └── brand-icon-highres.png         # High-res brand icon
├── index.html                         # HTML template
├── tailwind.config.js                 # Tailwind configuration
├── vite.config.js                     # Vite configuration
├── package.json                       # Dependencies
└── README.md                          # This file
```

---

## Customization Guide

### Changing Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      teal: '#22D3C3',  // Primary brand color
      // ... other colors
    }
  }
}
```

### Updating Content

Edit `src/lib/data.js` for:
- Site metadata (title, description, etc.)
- Navigation links
- Page content
- Contact information

### Modifying Pages

Each page in `src/pages/` is a standalone React component. Edit them to customize content, layout, or add new sections.

### Adding New Routes

1. Create a new page component in `src/pages/`
2. Add the route to `src/App.jsx`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```

---

## Performance Optimization

### Lighthouse Checklist
- [ ] Lighthouse score > 90 on desktop
- [ ] Lighthouse score > 85 on mobile
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

### Optimization Tips
1. **Images**: Use WebP format where possible
2. **Code Splitting**: React Router automatically handles this
3. **Caching**: Configure browser caching headers on your server
4. **Compression**: Enable gzip on your hosting provider
5. **CDN**: Use a CDN for static assets

---

## SEO Best Practices

### Meta Tags
All meta tags are configured in `index.html`:
- Title and description
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URL
- Structured data (JSON-LD)

### Sitemap & Robots
Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://testwise.advanseit.com.au/</loc>
    <lastmod>2024-06-17</lastmod>
  </url>
  <!-- Add other pages -->
</urlset>
```

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://testwise.advanseit.com.au/sitemap.xml
```

---

## Troubleshooting

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Mobile Menu Not Closing
- Check that `ScrollToTop` component is properly imported in `App.jsx`
- Verify that mobile menu has `onClick={() => setMobileOpen(false)}` on links

### GA Not Tracking
- Verify GA4 ID is correctly set in `index.html` and `src/lib/analytics.js`
- Check Google Analytics dashboard for real-time events
- Ensure GA script is not blocked by ad blockers (in development)

### Animations Not Smooth
- Check browser performance (Chrome DevTools → Performance)
- Reduce animation complexity if needed
- Ensure GPU acceleration is enabled

---

## Support & Maintenance

### Regular Tasks
- [ ] Monitor Google Analytics weekly
- [ ] Check Lighthouse scores monthly
- [ ] Update dependencies quarterly
- [ ] Review and update content as needed

### Security Updates
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## License & Attribution

- **Testwise**: Built by Advanse-IT
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
- **Framer Motion**: https://www.framer.com/motion
- **Lucide Icons**: https://lucide.dev

---

## Contact

For questions or support, reach out to **Advanse-IT**:
- Email: hello@advanseit.com.au
- Phone: +61 481 261 679
- Website: https://advanseit.com.au

---

**Last Updated**: June 2026
**Version**: 1.0.0 (Production Ready)
