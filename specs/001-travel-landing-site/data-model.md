# Data Model: Tisha Travel and Tours Landing Website

**Feature**: 001-travel-landing-site  
**Date**: 2026-06-03

This document defines the content entities, validation rules, and relationships for the static
landing website. All entities are stored as JSON files under `data/` and rendered client-side.

## Entity Overview

```text
CompanyProfile (1)
    ├── TravelService (1..n)
    ├── TravelPackage (0..n)
    ├── Testimonial (0..n)
    ├── TravelGalleryItem (0..n)
    └── FAQEntry (0..n)

InquirySubmission (transient — form only, not persisted client-side)
```

## 1. CompanyProfile

**File**: `data/company.json`  
**Cardinality**: Exactly one record

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | string | Yes | Non-empty; display name of agency |
| `tagline` | string | Yes | Short value proposition (≤ 120 chars) |
| `description` | string | Yes | Company overview (≤ 500 chars) |
| `mission` | string | Yes | Mission statement |
| `differentiators` | string[] | Yes | Min 1, max 6 bullet points |
| `contact.phone` | string | Yes | Valid phone format; `tel:` link compatible |
| `contact.email` | string | Yes | Valid email format |
| `contact.facebookUrl` | string | Yes | Valid HTTPS URL to Facebook page |
| `contact.address` | string | No | Physical or service area description |
| `logo.src` | string | Yes | Path to local logo asset |
| `logo.alt` | string | Yes | Descriptive alt text |
| `hero.image.src` | string | Yes | Path to hero background/image |
| `hero.image.alt` | string | Yes | Descriptive alt text |
| `hero.headline` | string | Yes | Primary homepage headline |
| `hero.subheadline` | string | Yes | Supporting headline text |

## 2. TravelService

**File**: `data/services.json`  
**Cardinality**: 1–8 records

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `id` | string | Yes | Unique slug (kebab-case) |
| `title` | string | Yes | Service name |
| `description` | string | Yes | Brief description (≤ 200 chars) |
| `icon` | string | No | Path to local icon asset |
| `order` | number | Yes | Display sort order (ascending) |

## 3. TravelPackage

**File**: `data/packages.json`  
**Cardinality**: 0–n (empty array shows custom-travel CTA)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `id` | string | Yes | Unique slug (kebab-case) |
| `title` | string | Yes | Package display name |
| `destination` | string | Yes | Primary destination |
| `type` | enum | Yes | `"domestic"` or `"international"` |
| `duration` | string | Yes | e.g., "3 Days / 2 Nights" |
| `description` | string | Yes | Summary (≤ 300 chars) |
| `image.src` | string | Yes | Path to local image |
| `image.alt` | string | Yes | Descriptive alt text |
| `inclusions` | string[] | Yes | Min 1 item |
| `exclusions` | string[] | No | May be empty array |
| `priceFrom` | string | No | Display string e.g., "From ₱12,999" |
| `featured` | boolean | Yes | Show in featured section |
| `order` | number | Yes | Display sort order |

**State**: Packages are static content. No runtime state transitions. `featured: false`
packages are hidden from the featured grid but may appear in future expanded views.

## 4. Testimonial

**File**: `data/testimonials.json`  
**Cardinality**: 0–n

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `id` | string | Yes | Unique slug |
| `quote` | string | Yes | Customer quote (≤ 400 chars) |
| `author` | string | Yes | Customer name or identifier |
| `context` | string | No | Trip context e.g., "Boracay Honeymoon, 2025" |
| `rating` | number | No | 1–5 if displayed |
| `order` | number | Yes | Display sort order |

## 5. TravelGalleryItem

**File**: `data/gallery.json`  
**Cardinality**: 0–n

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `id` | string | Yes | Unique slug |
| `src` | string | Yes | Path to local image |
| `alt` | string | Yes | Descriptive alt text |
| `caption` | string | No | Short caption (≤ 100 chars) |
| `destination` | string | No | Associated destination name |
| `order` | number | Yes | Display sort order |

## 6. FAQEntry

**File**: `data/faq.json`  
**Cardinality**: Min 5 (per SC-006)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `id` | string | Yes | Unique slug |
| `category` | enum | Yes | One of: `booking`, `quotation`, `inclusions`, `payment`, `follow-up`, `general` |
| `question` | string | Yes | Non-empty |
| `answer` | string | Yes | Non-empty; may contain basic HTML-free text |
| `order` | number | Yes | Display sort order within category |

**Required categories** (SC-006): At least one entry each for `booking`, `quotation`,
`inclusions`, `payment`, and `follow-up`.

## 7. InquirySubmission (Transient)

**Not persisted** — validated client-side, submitted via Web3Forms or mailto.

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | string | Yes | 2–100 chars; letters and spaces |
| `email` | string | Yes* | Valid email format |
| `phone` | string | Yes* | Valid phone; at least one of email or phone required |
| `packageId` | string | No | Must match existing package `id` if provided |
| `travelDates` | string | No | Free text e.g., "June 2026" |
| `message` | string | Yes | 10–1000 chars |
| `consent` | boolean | Yes | Must be `true` to submit |

**Submission states**:

```text
idle → validating → submitting → success
                             ↘ error → idle (with error messages preserved)
```

| State | User-visible behavior |
|-------|----------------------|
| `idle` | Form ready for input |
| `validating` | Inline field errors shown if invalid |
| `submitting` | Submit button disabled, loading indicator |
| `success` | Confirmation message with follow-up guidance |
| `error` | Error banner with retry option and mailto fallback |

## Relationships

| From | To | Relationship |
|------|----|--------------|
| InquirySubmission | TravelPackage | Optional reference via `packageId` |
| TravelGalleryItem | TravelPackage | Loose association via `destination` (not enforced) |
| Testimonial | TravelPackage | Loose association via `context` text (not enforced) |
| FAQEntry | TravelService | Logical grouping only; no foreign key |

## Content Update Workflow

1. Agency edits JSON file(s) in `data/`
2. Replace or add images in `assets/images/`
3. Validate JSON syntax locally
4. Commit and push to `main` — GitHub Pages auto-deploys
5. Verify contact details and package inclusions on live site

## Edge Case Handling

| Scenario | Data/UX Response |
|----------|-----------------|
| Empty `packages.json` | Show "Contact us for custom travel" CTA |
| Missing image file | `onerror` handler shows placeholder div with alt text |
| Invalid JSON on load | Console error + user-visible "content unavailable" message |
| Offline form submit | Error state with mailto and phone fallbacks |
