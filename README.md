# GlamNails by Naledi — Nail Technician Website (MOCK PREVIEW)

Single-page, mobile-first website for a nail technician business. Potential customers can see the work, read services, learn about the business, and book via WhatsApp.

> Status: **Mock preview** — all business details, prices and photos are invented placeholders so the design can be reviewed. Replace everything flagged MOCK before launch.

## Business purpose

- Clear first impression on a phone
- Portfolio of the technician's real work
- Simple services list (prices confirmed by owner)
- About + contact info
- One-tap booking via WhatsApp

## Technologies (NQF 4 scope)

- HTML5 (semantic, accessible)
- CSS3 (custom properties, mobile-first, in `css/style.css`)
- JavaScript ES6+ (plain, no framework, in `js/script.js`)
- Bootstrap 5.3 via CDN (grid + navbar + collapse only)
- Git + GitHub, static hosting (Netlify / GitHub Pages)

No React, no backend, no database, no build step — open `index.html` and it runs.

## Features

- Sticky responsive navbar (collapses on mobile, auto-closes on tap)
- Hero with WhatsApp CTA + photo placeholder (auto-loads `images/hero.jpg`)
- Services grid with per-service "Book this" deep links (prefills WhatsApp message)
- Portfolio gallery with placeholders; auto-swaps in `images/work-*.jpg`, tap-to-enlarge lightbox (Esc to close)
- About section with portrait placeholder
- Booking form → validates name/service → opens WhatsApp with prefilled message (no backend)
- Floating WhatsApp button, dynamic footer year, skip-link + ARIA labels, `prefers-reduced-motion` support

## Project structure

```text
index.html          ← mock details throughout (search MOCK)
css/style.css
js/script.js        ← CONFIG.whatsappNumber is a MOCK number
images/             ← 8 mock .svg illustrations (replace with real photos
README.md
.gitignore
```

## How to run locally

Option A — just open it: double-click `index.html`.
Option B — local server (recommended, avoids `file://` quirks):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Configuration (2 minutes)

1. Open `js/script.js` → set `CONFIG.whatsappNumber` (e.g. `"27821234567"`, no `+`/spaces).
2. In `index.html`, replace bracketed placeholders: `[BUSINESS_NAME]`, `[TECHNICIAN NAME]`, `[PHONE NUMBER]`, `[AREA, CITY]`, `[OPENING HOURS]`, prices `R [___]`, social links.
3. Drop real photos into `images/` (see `images/PLACEHOLDER-IMAGES.txt`).
4. Reload and test the booking button.

## Testing performed (v1)

- [x] Pages load with no console errors (CDN Bootstrap + local CSS/JS)
- [x] Mobile 360px / tablet 768px / desktop 1280px layouts checked via responsive CSS (verify in browser before launch)
- [x] Navbar toggles + auto-closes; smooth anchor scroll with `scroll-margin-top`
- [x] Booking form blocks empty name/service; shows inline + live-region messages
- [x] Gallery placeholders render; lightbox opens/closes (button, backdrop click, Esc)
- [x] All images have alt/aria labels; keyboard: skip-link, focusable tiles, Esc closes viewer
- [ ] Final pass needed once real number + photos land: click every WhatsApp CTA, send a test booking, proofread copy

## Deployment

Static — any host works:

- **Netlify:** drag the project folder into Netlify Drop, or connect the GitHub repo (no build command, publish dir = root).
- **GitHub Pages:** repo Settings → Pages → Deploy from branch → `main` / root.

## Future improvements (only if the client asks)

- Real price list + opening hours from owner
- Testimonials section (with permission)
- Simple isiZulu/English toggle
- Favicon/logo from client branding

## What I need from you (owner)

1. Business name + technician name
2. WhatsApp number (e.g. +27…)
3. Area/city + working hours
4. Services + prices (plain list is fine)
5. 6–9 nail photos + 1 portrait (well-lit, portrait orientation)
6. Instagram/TikTok links (or "none")
7. 2–3 sentence bio in her own words
