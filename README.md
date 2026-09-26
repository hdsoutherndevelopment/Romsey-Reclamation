# Romsey Reclamation — website

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4. Built by HD Southern Development.

## Run locally
```
npm install
npm run dev
```

## Deploy (Vercel)
Push to GitHub → import in Vercel (framework preset: Next.js). No build settings to change.

## Environment variables (optional)
See `.env.example`. Without `RESEND_API_KEY` + `BUSINESS_EMAIL` the enquiry form validates and shows the success state but sends nothing (demo mode).

## Where things live
- `lib/config.ts` — business details, hours, social links, nav
- `lib/materials.ts` — all categories, stock items, featured materials, projects
- `lib/art.ts` — generative material images served from `/art/[kind]-[seed].svg`
- Real photos: put them in `public/images/` and set `photo: "/images/file.jpg"` on any `Art` object in `lib/materials.ts`

## Before launch — search the code for `CONFIRM`
- Founding date wording, About page tribute
- Instagram URL (hidden until set)
- Delivery area / charges
- New pine sleeper price (£24.50 + VAT, from old site)
- Privacy policy
- Production domain (`NEXT_PUBLIC_SITE_URL`)
