# Research: Tisha Travel and Tours Landing Website

**Feature**: 001-travel-landing-site  
**Date**: 2026-06-03  
**Status**: Complete — all technical decisions resolved

## 1. Static Site Architecture

**Decision**: Single-page application (SPA-style sections) built with semantic HTML, modular
CSS, and vanilla JavaScript — no build step, no framework.

**Rationale**: Matches user requirement for lightweight, maintainable marketing site.
GitHub Pages serves static files directly; avoiding bundlers keeps the architecture simple
and easy for non-developers to update content.

**Alternatives considered**:
- **React/Vue/Astro**: Rejected — adds build tooling and dependencies beyond scope.
- **Multi-page HTML**: Rejected — spec assumes anchored sections; single page improves
  mobile navigation and reduces duplicate header/footer markup.
- **Jekyll/Hugo**: Rejected — introduces templating engine dependency; vanilla approach
  is simpler for a single landing page.

## 2. Component-Based File Organization

**Decision**: Organize by concern into `css/components/`, `js/components/`, `components/`
(HTML partials), and `data/` (JSON content files).

**Rationale**: Separates structure, presentation, behavior, and content. Each section
(hero, services, packages, testimonials, gallery, FAQ, contact) maps to one component
folder triad. Content lives in JSON so the agency can update packages without touching
HTML structure.

**Alternatives considered**:
- **Monolithic single files**: Rejected — harder to maintain as sections grow.
- **Web Components (custom elements)**: Rejected — unnecessary complexity for a landing page;
  fetch-based partials achieve modularity with broader browser support patterns.

**Pattern**: `index.html` defines page shell and section mount points. `main.js` loads HTML
partials via `fetch()` and initializes component scripts. CSS uses BEM-style naming scoped
per component file.

## 3. HTML Partial Loading on GitHub Pages

**Decision**: Load section HTML from `components/*.html` using `fetch()` at runtime.

**Rationale**: Enables modular HTML without a build step. GitHub Pages serves partial files
as static assets from the same origin, avoiding CORS issues.

**Alternatives considered**:
- **Inline all sections in index.html**: Valid fallback; chosen as degradation path if fetch
  fails (see contracts/ui-components.md).
- **Server-side includes**: Not available on GitHub Pages free tier.

**Constraint**: Local development MUST use a local HTTP server (`python -m http.server` or
equivalent) because `fetch()` fails on `file://` protocol.

## 4. Inquiry Form Submission

**Decision**: Client-side validated inquiry form with dual submission strategy:
1. **Primary**: `mailto:` link generation with pre-filled subject and body (zero external deps)
2. **Enhanced**: Web3Forms free tier (single POST endpoint, no backend required)

**Rationale**: Spec requires form validation, confirmation messaging, and lead delivery.
Pure static sites cannot send email without a third-party endpoint. Web3Forms requires only
one access key in a config file, has no npm dependency, and works with GitHub Pages. `mailto:`
fallback ensures functionality even if the external service is unavailable.

**Alternatives considered**:
- **Formspree**: Similar capability; Web3Forms chosen for generous free tier and simple setup.
- **Google Forms embed**: Rejected — poor UX, redirects off-site, breaks design consistency.
- **Netlify Forms**: Rejected — requires Netlify hosting, not GitHub Pages.
- **Backend API**: Rejected — violates lightweight static architecture requirement.

## 5. Responsive Design Strategy

**Decision**: Mobile-first CSS with fluid typography, CSS custom properties for design tokens,
and breakpoints at 480px, 768px, and 1024px.

**Rationale**: Aligns with Constitution Principle IV. Mobile-first `min-width` media queries
ensure base styles target smallest screens. CSS variables centralize colors, spacing, and
typography for design system consistency (Principle III).

**Alternatives considered**:
- **CSS framework (Bootstrap, Tailwind)**: Rejected — external dependency and bundle size;
  custom CSS is sufficient for a single landing page.
- **Desktop-first**: Rejected — contradicts constitution and user requirements.

## 6. Performance Optimization

**Decision**:
- WebP images with JPEG/PNG fallback via `<picture>` element
- `loading="lazy"` on below-fold images
- `width` and `height` attributes to prevent layout shift
- Single minified-free CSS/JS (no minification build step; keep files lean by design)
- No third-party fonts initially; system font stack with optional local font files
- Target: Largest Contentful Paint under 2.5s on 4G (aligns with SC-007)

**Rationale**: Constitution Principle VII. Local assets eliminate CDN latency and external
font requests.

**Alternatives considered**:
- **Google Fonts CDN**: Rejected — external dependency and render-blocking request.
- **Image CDN**: Rejected — all assets stored locally per user requirement.

## 7. GitHub Pages Deployment

**Decision**: Deploy from `/` (root) on `main` branch. Site served at
`https://<username>.github.io/<repo>/` or custom domain if configured.

**Rationale**: User explicitly requested GitHub Pages. Root deployment keeps URLs clean
for a single-page site (`index.html` at root).

**Alternatives considered**:
- **`/docs` folder deployment**: Rejected — source files at root is simpler for this project size.
- **GitHub Actions build pipeline**: Rejected — no build step needed.

**Setup requirements** (documented in quickstart.md):
- Enable GitHub Pages in repository settings
- Set source to `main` branch, root directory
- Optional: configure custom domain via `CNAME` file

## 8. SEO & Metadata

**Decision**: Static `<meta>` tags, Open Graph tags, JSON-LD `TravelAgency` structured data,
semantic heading hierarchy (`h1` once, section `h2`s), and descriptive `alt` text on all images.

**Rationale**: Constitution Principle XI. No JavaScript-rendered meta tags — crawlers receive
complete HTML from initial load (partials loaded via fetch still inject into DOM; critical
SEO content in `index.html` shell and noscript fallback).

**Mitigation**: Place company name, description, and primary keywords in `index.html` `<head>`
and hero section (not only in dynamically loaded partials).

## 9. Accessibility Approach

**Decision**:
- Semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `footer`)
- Skip-to-content link
- FAQ accordion using `<button>` + `aria-expanded` / `aria-controls`
- Form labels, `aria-describedby` for errors, focus management on validation
- Color contrast minimum WCAG AA (4.5:1 body text)
- `prefers-reduced-motion` media query to disable animations

**Rationale**: Constitution Principle VIII and spec FR-014.

## 10. Content Management

**Decision**: JSON files in `data/` directory for packages, services, testimonials, FAQ, and
company profile. JavaScript renders content into component templates at load time.

**Rationale**: Separates content from presentation. Agency staff can edit JSON files without
modifying HTML/CSS/JS. Supports content accuracy workflow (Principle V) via clear file ownership.

**Alternatives considered**:
- **Hardcoded HTML content**: Rejected — harder to update travel packages.
- **Headless CMS**: Rejected — external dependency beyond scope.

## Summary of Resolved Unknowns

| Unknown | Resolution |
|---------|------------|
| Inquiry delivery mechanism | Web3Forms + mailto fallback |
| Component modularity without build tools | fetch() HTML partials + modular CSS/JS |
| Image optimization | WebP + lazy loading + local storage |
| Hosting | GitHub Pages from root on main |
| Content updates | JSON data files |
| Local development | HTTP server required for fetch partials |

No NEEDS CLARIFICATION items remain.
