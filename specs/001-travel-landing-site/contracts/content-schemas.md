# Content Data Contracts

**Feature**: 001-travel-landing-site  
**Version**: 1.0.0

JSON Schema-style contracts for all content data files. Files MUST be valid JSON and conform
to these schemas.

## company.json

```json
{
  "$schema": "company-profile/v1",
  "name": "Tisha Travel and Tours",
  "tagline": "string (required, max 120 chars)",
  "description": "string (required, max 500 chars)",
  "mission": "string (required)",
  "differentiators": ["string (1-6 items)"],
  "contact": {
    "phone": "+63 XXX XXX XXXX",
    "email": "info@example.com",
    "facebookUrl": "https://www.facebook.com/...",
    "address": "string (optional)"
  },
  "logo": { "src": "assets/images/logo.png", "alt": "string (required)" },
  "hero": {
    "headline": "string (required)",
    "subheadline": "string (required)",
    "image": { "src": "assets/images/hero.webp", "alt": "string (required)" }
  }
}
```

## services.json

```json
{
  "$schema": "services/v1",
  "services": [
    {
      "id": "domestic-tours",
      "title": "string (required)",
      "description": "string (required, max 200 chars)",
      "icon": "assets/icons/domestic.svg",
      "order": 1
    }
  ]
}
```

## packages.json

```json
{
  "$schema": "packages/v1",
  "packages": [
    {
      "id": "boracay-getaway",
      "title": "string (required)",
      "destination": "Boracay, Philippines",
      "type": "domestic | international",
      "duration": "3 Days / 2 Nights",
      "description": "string (required, max 300 chars)",
      "image": { "src": "assets/images/packages/boracay.webp", "alt": "string" },
      "inclusions": ["string"],
      "exclusions": ["string"],
      "priceFrom": "From ₱12,999",
      "featured": true,
      "order": 1
    }
  ]
}
```

## testimonials.json

```json
{
  "$schema": "testimonials/v1",
  "testimonials": [
    {
      "id": "testimonial-1",
      "quote": "string (required, max 400 chars)",
      "author": "string (required)",
      "context": "Boracay Trip, 2025",
      "rating": 5,
      "order": 1
    }
  ]
}
```

## gallery.json

```json
{
  "$schema": "gallery/v1",
  "items": [
    {
      "id": "gallery-1",
      "src": "assets/images/gallery/beach.webp",
      "alt": "string (required)",
      "caption": "string (optional, max 100 chars)",
      "destination": "Boracay",
      "order": 1
    }
  ]
}
```

## faq.json

```json
{
  "$schema": "faq/v1",
  "entries": [
    {
      "id": "faq-booking-1",
      "category": "booking | quotation | inclusions | payment | follow-up | general",
      "question": "string (required)",
      "answer": "string (required)",
      "order": 1
    }
  ]
}
```

## Validation Rules

- All `id` fields MUST be unique within their file
- All `src` paths MUST be relative to site root
- All image `alt` attributes MUST be non-empty (accessibility requirement)
- FAQ MUST include at least one entry per category: booking, quotation, inclusions, payment, follow-up
