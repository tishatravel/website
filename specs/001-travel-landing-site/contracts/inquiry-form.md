# Inquiry Form Contract

**Feature**: 001-travel-landing-site  
**Version**: 1.0.0

Defines the inquiry form interface between the visitor and lead delivery mechanisms.

## Form Fields

| Field | HTML name | Type | Required | Constraints |
|-------|-----------|------|----------|-------------|
| Full Name | `name` | text | Yes | 2–100 characters |
| Email | `email` | email | Conditional | Valid email; required if phone empty |
| Phone | `phone` | tel | Conditional | Valid phone; required if email empty |
| Package Interest | `packageId` | select | No | Options populated from `packages.json` + "General Inquiry" |
| Preferred Travel Dates | `travelDates` | text | No | Free text, max 100 chars |
| Message | `message` | textarea | Yes | 10–1000 characters |
| Consent | `consent` | checkbox | Yes | Must be checked |

## Client-Side Validation Messages

| Condition | Error message |
|-----------|---------------|
| Name empty or too short | "Please enter your full name (at least 2 characters)." |
| Email and phone both empty | "Please provide an email address or phone number so we can reach you." |
| Invalid email format | "Please enter a valid email address." |
| Message too short | "Please tell us about your travel plans (at least 10 characters)." |
| Consent unchecked | "Please confirm you agree to be contacted about your inquiry." |

## Submission Channels

### Primary: Web3Forms

```http
POST https://api.web3forms.com/submit
Content-Type: application/json

{
  "access_key": "<WEB3FORMS_ACCESS_KEY>",
  "subject": "New Travel Inquiry — Tisha Travel and Tours",
  "from_name": "<visitor name>",
  "name": "<visitor name>",
  "email": "<visitor email>",
  "phone": "<visitor phone>",
  "package": "<package title or General Inquiry>",
  "travel_dates": "<travelDates>",
  "message": "<message>"
}
```

**Success response**: HTTP 200 with `{ "success": true }`  
**Error response**: HTTP 4xx/5xx — show error state with fallback options

### Fallback: mailto

On Web3Forms failure or when configured to skip API:

```text
mailto:{company.contact.email}
?subject=Travel Inquiry — {package title or General}
&body=Name: {name}%0APhone: {phone}%0AEmail: {email}%0APackage: {package}%0ADates: {travelDates}%0A%0AMessage:%0A{message}
```

## Success Confirmation (FR-005)

After successful submission, display:

> **Thank you for your inquiry!**
> We have received your message and will respond within 1–2 business days.
> For urgent requests, call us at {phone} or message us on Facebook.

## Package Pre-Selection

When visitor clicks "Inquire" on a package card:

1. Scroll to `#contact` section
2. Set `packageId` select to matching package
3. Focus first empty required field

## Accessibility Requirements

- All fields have associated `<label>` elements
- Error messages linked via `aria-describedby`
- `aria-invalid="true"` on fields with errors
- Submit button has `aria-busy="true"` during submission
- Success/error announcements use `role="alert"` region

## Configuration

Store in `js/config.js` (gitignored secrets pattern — key injected at deploy or documented in quickstart):

```javascript
export const CONFIG = {
  web3formsAccessKey: '', // Set before launch
  inquirySubjectPrefix: 'Travel Inquiry — Tisha Travel and Tours',
  followUpHours: '1–2 business days'
};
```
