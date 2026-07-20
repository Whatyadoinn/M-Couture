# M'Couture by Minky Narang — Website

A luxury fashion boutique website built with Vite + React + Tailwind CSS v4, React Router, Framer Motion, and Lucide icons.

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/   Reusable UI: Navbar, Hero, CollectionCard, Gallery, CustomProcess,
                BridalShowcase, About, Contact, InstagramCTA, Footer, etc.
  pages/        Routed pages: Home, Collections, CustomCouture, Bridal,
                GalleryPage, AboutPage, ContactPage, NotFound
  data/         siteData.js — all placeholder copy + Unsplash placeholder images
  hooks/        useScrolled, useScrollProgress, useScrollToTop
  index.css     Design tokens (colors, fonts) via Tailwind v4 @theme
```

## Replacing placeholder content

- **Images**: every image URL lives in `src/data/siteData.js`, plus a few
  directly in `Hero.jsx`, `About.jsx`, `PageBanner` calls in each page, and
  `CustomCouture.jsx`. Swap these for real photography — same dimensions/aspect
  ratios recommended (portraits ~3:4 or 4:5).
- **Copy**: also in `siteData.js` and directly inside each component/page.
- **Contact details**: phone, email, Instagram handle, and WhatsApp number are
  in `Contact.jsx`, `Footer.jsx`, `InstagramCTA.jsx`, and `WhatsAppButton.jsx`
  — update the WhatsApp number in the `wa.me/...` links and the `tel:`/`mailto:`
  links.
- **Forms**: the contact form and newsletter form are currently front-end only
  (they simulate a submission). Wire them up to your email service, form
  backend (e.g. Formspree), or API route of choice.

## Design tokens

Colors and fonts are defined once in `src/index.css` under `@theme`:
Ivory `#FAF8F5`, Champagne Gold `#C8A96A`, Soft Beige `#EDE5DA`,
Charcoal `#2B2B2B`, White `#FFFFFF` — Playfair Display for headings,
Poppins for body text.
