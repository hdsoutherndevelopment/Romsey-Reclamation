import { site } from "./config";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    telephone: "+441794342252",
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: site.hours
      .filter((h) => h.schema)
      .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.schema!.days, opens: h.schema!.opens, closes: h.schema!.closes })),
    areaServed: ["Romsey", "Southampton", "Winchester", "Salisbury", "Hampshire", "New Forest"],
    sameAs: [site.social.facebook, site.social.instagram].filter(Boolean),
  };
}
