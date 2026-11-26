# Nextgen website

Redesigned company website for **Nextgen Business Consultancy** (nextgenbusiness.co.in), built on the new
brand identity (Brand Guidelines v1.0, Nov 2026).

Next.js 16 (App Router) · React 19 · Tailwind CSS 3 · Framer Motion · Lucide icons

## Run it

```bash
npm install
cp .env.example .env.local    # then fill in LMS_API_URL / LMS_INTERNAL_SECRET
npm run dev                   # http://localhost:3000
npm run build && npm start    # production, served on :9999
```

## Where things live

| What | Where |
| --- | --- |
| Brand colours, type scale | `tailwind.config.js` (tokens) · `src/app/globals.css` (type + button + form classes) |
| Logo files (colour / white / champion), icon, OG image | `public/brand/` |
| Company details, nav, offices, states | `src/lib/site.js` |
| Page copy (home, about, FAQs, funding programs) | `src/data/content.js` |
| Services (19 pages) | `src/data/businessData.js` (content) + `src/data/services.js` (category + icon) |
| Blog posts | `src/data/blogData.js` |
| Google reviews | `src/data/reviews.js` |
| Funding schemes used by the chatbot | `src/data/schemes.json` |
| Event galleries | drop images in `public/assets/<ganesh\|diwali\|activites\|pongal\|cricket\|holi>/` |
| Lead capture | `src/lib/leads.js` (client) → `src/app/api/contact/route.js` (server → LMS) |
| Funding chatbot (UdyamMitra) | `src/components/chatbot/FundingChatbot.jsx` |

### Adding a service or blog post
- **Service:** add an entry to `businessData.js` (same shape as the others) and a `slug → { category, icon }` line in `services.js`. The page, sitemap entry and listing card are generated automatically.
- **Blog post:** add an object to `blogs` in `blogData.js`. Sections are rendered in the order of `content`.

## Brand font (Gilroy)
Headlines and key numbers use **Gilroy ExtraBold** (`src/app/fonts/`). Only that weight was supplied, so body
text uses a stand-in (Figtree) until the other Gilroy weights are added. Details: `src/app/fonts/README.md`.

## Leads
All forms (modal, contact page, CTA bands, chatbot) post to `/api/contact`, which forwards to the LMS with the
same payload and `x-api-key` header the previous site used. reCAPTCHA verification was commented out in the old
route and is not enforced here either (instructions in the route file to re-enable).

## SEO
All previous URLs are preserved, including 301s from `/inheritance/*` and `/about/festival/*`. Sitemap, robots,
canonical URLs, Open Graph and JSON-LD (Organization, ProfessionalService, Service, FAQPage, BlogPosting,
BreadcrumbList) are generated per page.
