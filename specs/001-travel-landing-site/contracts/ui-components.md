# UI Component Contract

**Feature**: 001-travel-landing-site  
**Version**: 1.0.0

Defines the component interface for modular HTML/CSS/JS sections.

## Component Registry

| Component | HTML Partial | CSS | JS Module | Mount Point |
|-----------|-------------|-----|-----------|-------------|
| Header | `components/header.html` | `css/components/header.css` | `js/components/navigation.js` | `#site-header` |
| Hero | `components/hero.html` | `css/components/hero.css` | — | `#hero` |
| About | `components/about.html` | `css/components/about.css` | — | `#about` |
| Services | `components/services.html` | `css/components/services.css` | `js/components/services.js` | `#services` |
| Packages | `components/packages.html` | `css/components/packages.css` | `js/components/packages.js` | `#packages` |
| Testimonials | `components/testimonials.html` | `css/components/testimonials.css` | — | `#testimonials` |
| Gallery | `components/gallery.html` | `css/components/gallery.css` | `js/components/gallery.js` | `#gallery` |
| FAQ | `components/faq.html` | `css/components/faq.css` | `js/components/faq.js` | `#faq` |
| Contact | `components/contact.html` | `css/components/contact.css` | `js/components/inquiry-form.js` | `#contact` |
| Footer | `components/footer.html` | `css/components/footer.css` | — | `#site-footer` |

## Loader Contract (`js/main.js`)

```javascript
// Initialization sequence
1. Load company.json → populate global CONFIG + meta
2. For each component in REGISTRY (ordered):
   a. fetch(htmlPartial) → inject into mountPoint
   b. import(jsModule) → call init(mountPoint, data) if exists
3. Initialize navigation (smooth scroll, mobile menu)
4. Register scroll-based active nav highlighting
```

## Navigation Contract

| Nav Label | Target Section | Always Visible |
|-----------|---------------|----------------|
| Home | `#hero` | Yes |
| About | `#about` | Yes |
| Services | `#services` | Yes |
| Packages | `#packages` | Yes |
| Testimonials | `#testimonials` | Desktop; collapsible on mobile |
| Gallery | `#gallery` | Desktop; collapsible on mobile |
| FAQ | `#faq` | Yes |
| Contact | `#contact` | Yes (styled as CTA button) |

**Mobile menu**: Hamburger toggle at ≤ 768px; trap focus when open; close on Escape or link click.

## Design Tokens (`css/base.css`)

```css
:root {
  /* Colors */
  --color-primary: #1a5f7a;
  --color-primary-dark: #134559;
  --color-accent: #e8913a;
  --color-text: #1a1a1a;
  --color-text-muted: #5a5a5a;
  --color-bg: #ffffff;
  --color-bg-alt: #f5f8fa;

  /* Typography */
  --font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-size-base: 1rem;
  --line-height-base: 1.6;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;

  /* Layout */
  --max-width: 1200px;
  --header-height: 64px;
}
```

## Responsive Breakpoints

| Name | Min-width | Layout behavior |
|------|-----------|-----------------|
| Mobile | 0 | Single column, hamburger nav |
| Tablet | 768px | Two-column grids where applicable |
| Desktop | 1024px | Full navigation bar, multi-column layouts |

## Degradation Contract

If `fetch()` fails for a partial:

1. Log error to console
2. Display minimal fallback in mount point: section title + "Content temporarily unavailable"
3. Contact section fallback MUST always render (inline in `index.html` as `<noscript>` and fetch-failure backup)

## CTA Contract

Every section except Header/Footer MUST include at least one of:

- Link to `#contact`
- "Inquire Now" button triggering package pre-selection
- Direct `tel:` or `mailto:` link

## SEO Shell Contract (`index.html` head)

Required in static HTML (not loaded via fetch):

```html
<title>Tisha Travel and Tours | Travel Agency</title>
<meta name="description" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:type" content="website">
<link rel="canonical" href="...">
<script type="application/ld+json">/* TravelAgency schema */</script>
```

## Image Contract

All images MUST use:

```html
<picture>
  <source srcset="path.webp" type="image/webp">
  <img src="path.jpg" alt="descriptive text" width="W" height="H" loading="lazy">
</picture>
```

Hero image: `loading="eager"` (above fold).  
All others: `loading="lazy"`.
