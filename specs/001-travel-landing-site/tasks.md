# Tasks: Tisha Travel and Tours Landing Website

**Input**: Design documents from `/specs/001-travel-landing-site/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Manual acceptance testing per quickstart.md — no automated test tasks (not requested in spec).

**Organization**: Tasks grouped by user story (P1–P5) for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1–US5) for story phases only
- Every task includes exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize project directory structure and asset layout

- [x] T001 Create project directory structure: `css/components/`, `js/components/`, `components/`, `data/`, `assets/images/packages/`, `assets/images/gallery/`, `assets/icons/`
- [x] T002 [P] Copy brand logo from `assets/Icon_white.png` to `assets/images/logo.png` for use in header and footer
- [x] T003 [P] Create empty component CSS stub files in `css/components/` for header, hero, about, services, packages, testimonials, gallery, faq, contact, and footer

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story work begins

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create design tokens, reset, and typography in `css/base.css` per `specs/001-travel-landing-site/contracts/ui-components.md`
- [x] T005 Create mobile-first grid, containers, and section spacing in `css/layout.css`
- [x] T006 Create `index.html` shell with SEO meta tags, Open Graph tags, JSON-LD TravelAgency schema, skip-to-content link, and section mount points (`#site-header`, `#hero`, `#about`, `#services`, `#packages`, `#testimonials`, `#gallery`, `#faq`, `#contact`, `#site-footer`)
- [x] T007 Create `data/company.json` with Tisha Travel and Tours placeholder content per `specs/001-travel-landing-site/contracts/content-schemas.md`
- [x] T008 Create `js/config.js` exporting site configuration and Web3Forms access key placeholder per `specs/001-travel-landing-site/contracts/inquiry-form.md`
- [x] T009 Create `js/main.js` with component registry, `fetch()` partial loader, and `company.json` bootstrap per `specs/001-travel-landing-site/contracts/ui-components.md`
- [x] T010 Link `css/base.css`, `css/layout.css`, and `js/main.js` (ES module) in `index.html`

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — Submit a Travel Inquiry (Priority: P1) 🎯 MVP

**Goal**: Visitors can submit a validated travel inquiry and receive confirmation with follow-up guidance

**Independent Test**: Open the site, scroll to `#contact`, complete the inquiry form with valid data, submit, and confirm success message. Test validation by submitting empty required fields and verifying inline errors.

### Implementation for User Story 1

- [x] T011 [P] [US1] Create inquiry form markup in `components/contact.html` per `specs/001-travel-landing-site/contracts/inquiry-form.md`
- [x] T012 [P] [US1] Implement mobile-first form styles in `css/components/contact.css`
- [x] T013 [US1] Implement client-side validation, Web3Forms submission, mailto fallback, and success/error states in `js/components/inquiry-form.js`
- [x] T014 [US1] Register contact component in `js/main.js` and wire `init()` for `#contact` mount point
- [x] T015 [US1] Add `<noscript>` contact fallback block with phone and email links in `index.html`
- [x] T016 [US1] Add stylesheet link for `css/components/contact.css` in `index.html`

**Checkpoint**: Inquiry form fully functional — site delivers lead-generation MVP value

---

## Phase 4: User Story 2 — Discover Featured Travel Packages (Priority: P2)

**Goal**: Visitors can browse domestic and international packages with inclusions, exclusions, and inquiry CTAs

**Independent Test**: Navigate to `#packages`, verify featured packages render with destination, duration, inclusions, and "Inquire" buttons that scroll to `#contact` with package pre-selected.

### Implementation for User Story 2

- [x] T017 [P] [US2] Create sample featured packages in `data/packages.json` per `specs/001-travel-landing-site/contracts/content-schemas.md`
- [x] T018 [P] [US2] Create package grid template in `components/packages.html`
- [x] T019 [P] [US2] Implement mobile-first package card styles in `css/components/packages.css`
- [x] T020 [US2] Implement package rendering, detail display, and Inquire CTA pre-selection in `js/components/packages.js`
- [x] T021 [US2] Add empty-state "Contact us for custom travel" CTA in `js/components/packages.js` when no featured packages exist
- [x] T022 [US2] Register packages component in `js/main.js` and add stylesheet link in `index.html`

**Checkpoint**: Package discovery and package-to-inquiry flow working independently

---

## Phase 5: User Story 3 — Evaluate Agency Trust and Expertise (Priority: P3)

**Goal**: First-time visitors can assess credibility via homepage hero, company intro, services, testimonials, and travel gallery

**Independent Test**: Scan homepage within 30 seconds and identify agency name, services, differentiators, testimonials, and travel imagery without using packages or FAQ sections.

### Implementation for User Story 3

- [x] T023 [P] [US3] Create hero section template in `components/hero.html` with headline placeholders and CTA linking to `#contact`
- [x] T024 [P] [US3] Implement mobile-first hero styles in `css/components/hero.css`
- [x] T025 [P] [US3] Create about section template in `components/about.html` with mission and differentiators list
- [x] T026 [P] [US3] Implement about section styles in `css/components/about.css`
- [x] T027 [P] [US3] Create travel services data in `data/services.json` per content schema
- [x] T028 [P] [US3] Create services grid template in `components/services.html`
- [x] T029 [P] [US3] Implement services grid styles in `css/components/services.css`
- [x] T030 [US3] Implement services rendering from `data/services.json` in `js/components/services.js`
- [x] T031 [P] [US3] Create customer testimonials in `data/testimonials.json`
- [x] T032 [P] [US3] Create testimonial cards template in `components/testimonials.html`
- [x] T033 [P] [US3] Implement testimonial card styles in `css/components/testimonials.css`
- [x] T034 [US3] Wire testimonial rendering from `data/testimonials.json` in `js/main.js`
- [x] T035 [P] [US3] Create travel gallery entries in `data/gallery.json`
- [x] T036 [P] [US3] Create gallery grid template in `components/gallery.html`
- [x] T037 [P] [US3] Implement gallery grid styles in `css/components/gallery.css`
- [x] T038 [US3] Implement lazy-loading gallery renderer in `js/components/gallery.js`
- [x] T039 [US3] Bind hero and about content from `data/company.json` in `js/main.js`
- [x] T040 [US3] Register hero, about, services, testimonials, and gallery components in `js/main.js` and add stylesheet links in `index.html`

**Checkpoint**: Trust-building sections render with company content and social proof

---

## Phase 6: User Story 4 — Access Contact Information Quickly (Priority: P4)

**Goal**: Phone, email, and Facebook links are visible and actionable from header, footer, and all primary sections

**Independent Test**: From homepage and packages section, locate phone (`tel:`), email (`mailto:`), and Facebook links without searching; verify each link uses values from `data/company.json`.

### Implementation for User Story 4

- [x] T041 [P] [US4] Create header with navigation links and contact shortcuts in `components/header.html`
- [x] T042 [P] [US4] Implement header and mobile hamburger menu styles in `css/components/header.css`
- [x] T043 [US4] Implement smooth scroll, mobile menu toggle, focus trap, and active nav highlighting in `js/components/navigation.js`
- [x] T044 [P] [US4] Create footer with phone, email, and Facebook links in `components/footer.html`
- [x] T045 [P] [US4] Implement footer styles in `css/components/footer.css`
- [x] T046 [US4] Populate header and footer contact links dynamically from `data/company.json` in `js/main.js`
- [x] T047 [US4] Register header and footer components in `js/main.js` and add stylesheet links in `index.html`

**Checkpoint**: Multi-channel contact accessible site-wide via persistent header and footer

---

## Phase 7: User Story 5 — Find Answers to Common Questions (Priority: P5)

**Goal**: Visitors can expand FAQ entries covering bookings, quotations, inclusions, payment, and follow-up

**Independent Test**: Open `#faq`, expand entries in each required category, navigate with keyboard (Tab/Enter), and verify contact CTA at section end.

### Implementation for User Story 5

- [x] T048 [P] [US5] Create FAQ entries in `data/faq.json` covering booking, quotation, inclusions, payment, and follow-up categories
- [x] T049 [P] [US5] Create accordion markup template in `components/faq.html` with contact CTA at section end
- [x] T050 [P] [US5] Implement accordion styles in `css/components/faq.css`
- [x] T051 [US5] Implement keyboard-accessible FAQ accordion with `aria-expanded` and `aria-controls` in `js/components/faq.js`
- [x] T052 [US5] Register FAQ component in `js/main.js` and add stylesheet link in `index.html`

**Checkpoint**: FAQ reduces booking uncertainty and links to inquiry path

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Constitution compliance — performance, accessibility, mobile, SEO, and deployment

Reference: `.specify/memory/constitution.md` — Principles IV, VII, VIII, XI

- [x] T053 [P] Add WebP `<picture>` elements with fallback, explicit dimensions, and lazy loading in hero, package, and gallery renderers (`components/hero.html`, `js/components/packages.js`, `js/components/gallery.js`)
- [x] T054 [P] Verify mobile responsiveness at 320px, 375px, 768px, and 1024px across all files in `css/components/`
- [x] T055 [P] Complete accessibility pass: contrast ratios, focus-visible states, form `aria-describedby`, and `prefers-reduced-motion` rules in `css/base.css`
- [x] T056 [P] Audit SEO title, meta description, heading hierarchy, and JSON-LD schema in `index.html`
- [x] T057 Verify low-friction inquiry paths: CTAs on hero, packages, and FAQ reach `#contact` within one click
- [x] T058 [P] Validate all files in `data/` against `specs/001-travel-landing-site/contracts/content-schemas.md`
- [x] T059 [P] Add image `onerror` placeholder handlers in `js/components/packages.js` and `js/components/gallery.js`
- [x] T060 Configure GitHub Pages deployment from `main` branch root and note live URL in `specs/001-travel-landing-site/quickstart.md`
- [x] T061 Run manual acceptance tests from `specs/001-travel-landing-site/quickstart.md` including Lighthouse mobile performance and accessibility audits

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — **BLOCKS all user stories**
- **User Stories (Phases 3–7)**: All depend on Foundational completion
  - Recommended sequential order: US1 → US2 → US3 → US4 → US5 (matches spec priority)
  - US2 and US3 can partially parallelize after US1 (different components)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

| Story | Depends On | Notes |
|-------|-----------|-------|
| US1 (P1) | Foundational | MVP — no other stories required |
| US2 (P2) | Foundational, US1 (for Inquire CTA pre-selection) | Package CTAs scroll to inquiry form |
| US3 (P3) | Foundational | Independent trust sections |
| US4 (P4) | Foundational, `data/company.json` | Header/footer use company contact data |
| US5 (P5) | Foundational | FAQ contact CTA links to `#contact` |

### Within Each User Story

- HTML partial and CSS can be built in parallel ([P] tasks)
- JS implementation depends on HTML template and data files
- Component registration in `js/main.js` comes after component files exist
- Story checkpoint before moving to next priority

### Parallel Opportunities

- **Phase 1**: T002 and T003 in parallel after T001
- **Phase 3 (US1)**: T011 and T012 in parallel
- **Phase 4 (US2)**: T017, T018, T019 in parallel
- **Phase 5 (US3)**: T023–T029 and T031–T037 are highly parallelizable across different files
- **Phase 6 (US4)**: T041/T042 and T044/T045 in parallel
- **Phase 7 (US5)**: T048, T049, T050 in parallel
- **Phase 8**: T053–T056, T058, T059 in parallel

---

## Parallel Example: User Story 3

```bash
# Launch all independent US3 templates and data together:
Task: "Create hero section template in components/hero.html"
Task: "Create about section template in components/about.html"
Task: "Create travel services data in data/services.json"
Task: "Create customer testimonials in data/testimonials.json"
Task: "Create travel gallery entries in data/gallery.json"

# Then sequential JS wiring:
Task: "Bind hero and about content from data/company.json in js/main.js"
Task: "Register hero, about, services, testimonials, and gallery components in js/main.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (inquiry form)
4. **STOP and VALIDATE**: Submit test inquiry, verify validation and confirmation
5. Deploy to GitHub Pages if ready — site already converts visitors to leads

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 → Test inquiry flow → Deploy (MVP!)
3. Add US2 → Test package discovery and package-to-inquiry → Deploy
4. Add US3 → Test trust sections → Deploy
5. Add US4 → Test persistent contact in header/footer → Deploy
6. Add US5 → Test FAQ accordion → Deploy
7. Polish phase → Lighthouse audit → Final deploy

### Suggested MVP Scope

**Minimum viable launch**: Phase 1 + Phase 2 + Phase 3 (User Story 1)

Delivers a working inquiry form with company contact fallback — satisfies the primary business goal of lead generation. Add US4 early if persistent header/footer contact is needed before full trust content.

---

## Task Summary

| Phase | Story | Task IDs | Count |
|-------|-------|----------|-------|
| Setup | — | T001–T003 | 3 |
| Foundational | — | T004–T010 | 7 |
| US1 Inquiry (P1) | US1 | T011–T016 | 6 |
| US2 Packages (P2) | US2 | T017–T022 | 6 |
| US3 Trust (P3) | US3 | T023–T040 | 18 |
| US4 Contact (P4) | US4 | T041–T047 | 7 |
| US5 FAQ (P5) | US5 | T048–T052 | 5 |
| Polish | — | T053–T061 | 9 |
| **Total** | | **T001–T061** | **61** |

**Parallel opportunities**: 28 tasks marked [P]  
**Independent test criteria**: Defined at each user story checkpoint  
**Format validation**: All 61 tasks use `- [x] T### [P?] [US?]` format with file paths
