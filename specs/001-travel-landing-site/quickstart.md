# Quickstart: Tisha Travel and Tours Landing Website

**Feature**: 001-travel-landing-site  
**Date**: 2026-06-03

## Prerequisites

- Git
- A local HTTP server (Python 3, Node.js `npx serve`, or VS Code Live Server)
- GitHub account (for deployment)
- Web3Forms access key (free at [web3forms.com](https://web3forms.com)) — optional but recommended for inquiry form

## Project Structure

```text
/
├── index.html                 # Page shell, SEO meta, section mount points
├── css/
│   ├── base.css               # Reset, design tokens, typography
│   ├── layout.css             # Grid, containers, section spacing
│   └── components/            # One CSS file per component
├── js/
│   ├── main.js                # App bootstrap, partial loader
│   ├── config.js              # Web3Forms key, site config
│   └── components/            # One JS file per interactive component
├── components/                # HTML partials loaded via fetch
├── data/                      # JSON content files
├── assets/
│   ├── images/                # Optimized WebP + fallback images
│   └── icons/                 # SVG icons
└── specs/001-travel-landing-site/  # Feature documentation
```

## Local Development

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd website
   git checkout 001-travel-landing-site
   ```

2. **Start a local server** (required — fetch partials fail on `file://`)

   ```bash
   # Python 3
   python3 -m http.server 8000

   # Or Node.js
   npx serve .
   ```

3. **Open in browser**

   ```
   http://localhost:8000
   ```

4. **Configure inquiry form** (before testing submissions)

   Edit `js/config.js`:

   ```javascript
   export const CONFIG = {
     web3formsAccessKey: 'your-access-key-here',
     inquirySubjectPrefix: 'Travel Inquiry — Tisha Travel and Tours',
     followUpHours: '1–2 business days'
   };
   ```

5. **Update content**

   Edit JSON files in `data/` and replace images in `assets/images/`.

## Content Setup Checklist

- [ ] Fill `data/company.json` with real contact details (phone, email, Facebook URL)
- [ ] Add travel services to `data/services.json`
- [ ] Add featured packages to `data/packages.json`
- [ ] Add customer testimonials to `data/testimonials.json`
- [ ] Add gallery images to `data/gallery.json` and `assets/images/gallery/`
- [ ] Add FAQ entries covering booking, quotation, inclusions, payment, follow-up
- [ ] Replace placeholder logo with `assets/Icon_white.png` or final brand asset
- [ ] Set Web3Forms access key in `js/config.js`

## GitHub Pages Deployment

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "feat: launch Tisha Travel and Tours landing website"
   git push origin main
   ```

2. **Enable GitHub Pages**

   - Repository → Settings → Pages
   - Source: Deploy from branch
   - Branch: `main` / `/ (root)`
   - Save

3. **Verify deployment**

   Site available at: `https://<username>.github.io/<repo-name>/`

   This repository includes `.nojekyll` at the root so GitHub Pages serves static
   assets correctly. Deploy from the `main` branch, `/ (root)` folder.

4. **Optional: Custom domain**

   - Add `CNAME` file with domain name at repo root
   - Configure DNS with hosting provider

## Testing

### Manual Test Checklist

| Test | How to verify |
|------|---------------|
| Mobile layout | Chrome DevTools → 375px width; all sections readable |
| Inquiry form | Submit with valid data; confirm success message |
| Form validation | Submit empty form; confirm inline errors |
| Package inquiry | Click package CTA; form pre-selects package |
| Contact links | Tap phone (mobile), email, Facebook — each opens correctly |
| FAQ accordion | Click questions; answers expand; keyboard Tab/Enter works |
| Performance | Lighthouse mobile audit; LCP < 2.5s target |
| Accessibility | Lighthouse accessibility score ≥ 90 |
| Offline form | Disable network; submit form; error + mailto fallback shown |

### Browser Support

- Chrome, Firefox, Safari, Edge (last 2 versions)
- iOS Safari, Android Chrome

## Common Issues

| Issue | Solution |
|-------|----------|
| Blank sections locally | Use HTTP server, not file:// |
| Form not sending | Check Web3Forms access key in config.js |
| Images not loading | Verify paths in JSON match actual file locations |
| GitHub Pages 404 | Ensure index.html is at repo root; check Pages settings |

## Next Steps

After local verification, run `/speckit.tasks` to generate implementation tasks, then
`/speckit.implement` to build the website.
