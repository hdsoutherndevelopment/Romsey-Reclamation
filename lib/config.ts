// Central business details. Every line marked CONFIRM should be checked with the client before launch.

export const site = {
  name: "Romsey Reclamation",
  legalName: "Romsey Reclamation Ltd",
  tagline: "Reclaim • Recycle • Restore",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://romsey-reclamation.vercel.app", // CONFIRM production domain
  description:
    "Architectural salvage, reclaimed building materials and seasoned oak from our yard at Awbridge, near Romsey, Hampshire. Railway sleepers, reclaimed bricks, roof tiles, slates, paving, stone and oak.",

  address: {
    lines: ["Oak Tree Farm", "Dunbridge Lane", "Awbridge", "Romsey"],
    street: "Oak Tree Farm, Dunbridge Lane",
    locality: "Awbridge, Romsey",
    region: "Hampshire",
    postcode: "SO51 0GQ",
    country: "GB",
  },

  phone: { display: "01794 342 252", href: "tel:+441794342252" },
  email: "info@romseyreclamation.com",

  hours: [
    { days: "Monday – Friday", time: "8:00am – 4:00pm", schema: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "16:00" } },
    { days: "Saturday", time: "8:15am – 12:00pm", schema: { days: ["Saturday"], opens: "08:15", closes: "12:00" } },
    { days: "Sunday", time: "Closed", schema: null },
  ],

  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Romsey+Reclamation+Ltd%2C+Oak+Tree+Farm%2C+Dunbridge+Lane%2C+Awbridge%2C+SO51+0GQ",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Romsey%20Reclamation%20Ltd%2C%20Dunbridge%20Lane%2C%20Awbridge%2C%20SO51%200GQ&z=14&output=embed",

  social: {
    facebook: "https://www.facebook.com/romseyreclamation/",
    instagram: null as string | null, // CONFIRM — add the Instagram URL and it appears in the footer and menu
  },

  company: {
    number: "3567084",
    registeredOffice: "Highland House, Mayflower Close, Chandler’s Ford, Eastleigh SO53 4AR",
  },

  founded: "almost fifty years ago", // CONFIRM — old site says “started 47 years ago” (page dated 2022)
};

export const nav = [
  { label: "Products", href: "/materials" },
  { label: "Calculators", href: "/calculators" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Sell to Us", href: "/sell" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
