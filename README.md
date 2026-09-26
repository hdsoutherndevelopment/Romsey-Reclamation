# Romsey Reclamation — website

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4. Built by HD Southern Development.

## Run locally
```
npm install
npm run dev
npm run check   # self-check for calculators + opening-hours logic
```

## Deploy (Vercel)
Push to GitHub → import in Vercel (framework preset: Next.js). No build settings to change.

## Enquiries
`/api/enquiry` validates every submission (honeypot, rate limit, UK postcode/phone/email, photo type + size), then:
- **Supabase** (`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`): saves to `enquiries`, photos to the private `enquiry-photos` bucket. Run `supabase/migrations/0001_enquiries.sql` once.
- **Resend** (`RESEND_API_KEY` + `BUSINESS_EMAIL`): emails the yard with photos attached, and sends the customer a receipt.
Either is enough; with neither, the form runs in demo mode. See `.env.example`.

## Features
- **Enquiry list** — "Add to enquiry" on every stock line, featured card and calculator result; header/mobile badge; sent with the form. Stored in the visitor's browser.
- **Calculators** (`/calculators`, and on sleeper/brick/tile/paving pages) — estimates checked against delivery minimums.
- **Live open/closed status** from `site.hours` (UK time). Bank holidays not handled — add closures if needed.
- **Sell to us** (`/sell`) with photo upload; searchable stock on `/materials`; gallery filter + lightbox; FAQ, breadcrumb and LocalBusiness JSON-LD.

## Where things live
- `lib/config.ts` — business details, hours, social links, nav
- `lib/materials.ts` — all categories, stock items, featured materials, projects
- `lib/calculators.ts`, `lib/hours.ts` — pure logic (covered by `scripts/check.ts`)
- `lib/leads.ts` — Supabase + Resend (REST, no SDKs)
- `components/sections/Faq.tsx` — FAQ copy
- `lib/art.ts` — generative material images served from `/art/[kind]-[seed].svg`
- Real photos: put them in `public/images/` and set `photo: "/images/file.jpg"` on any `Art` object in `lib/materials.ts`

## Before launch — search the code for `CONFIRM`
- Founding date wording, About page tribute, homepage stats
- FAQ answers, "What we look for" list on /sell
- Instagram URL (hidden until set)
- Delivery area / charges
- New pine sleeper price (£24.50 + VAT, from old site)
- Privacy policy (now mentions photo uploads + Supabase storage)
- Production domain (`NEXT_PUBLIC_SITE_URL`)
