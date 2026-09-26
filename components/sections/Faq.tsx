import { Plus } from "lucide-react";
import { site } from "@/lib/config";

// Answers use only facts already published on the site. CONFIRM wording with the client.
export const faqs: [string, string][] = [
  ["Do I need to call before visiting?", `No — just turn up during opening hours. Stock changes daily though, so if you’re travelling for something specific, call ${site.phone.display} first and we’ll check it’s still in.`],
  ["When is the yard open?", `Monday to Friday 8:00am – 4:00pm and Saturday 8:15am – 12:00pm. We’re closed on Sundays.`],
  ["Can you match my existing bricks or roof tiles?", "Yes — matching is our speciality. Bring a sample to the yard, or send a photo with your enquiry, and we’ll find the closest weathered match from stock."],
  ["Do you deliver?", "Yes, for orders of sufficient quantity — for example 10 sleepers, one pallet of 500 bricks, 600 plain tiles or 3 m² of York flagstone. Charges depend on distance and load, so call with your postcode for a price."],
  ["Do you supply trade customers?", "Yes. We supply builders, roofers, landscapers and contractors, plus commercial, industrial, agricultural and civil engineering customers. Call to discuss trade pricing and full loads."],
  ["Do you buy reclaimed materials?", "We do. If you’re clearing a site or a building, send us photos of what you have and we’ll let you know if we’re interested."],
  ["What should I wear to the yard?", "It’s a working yard, so please bring wellies or sensible footwear."],
];

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="wrap py-24 lg:py-36">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-6 flex items-center gap-3 text-charcoal/60"><span className="text-brick">(?)</span><span className="h-px w-10 bg-charcoal/30" aria-hidden="true" />Questions</p>
          <h2 id="faq-title" className="stencil text-[clamp(3rem,6.5vw,6rem)]">Good to <em>know</em></h2>
          <p className="mt-6 max-w-sm text-charcoal/75">Anything else? Call the yard on <a className="link-u font-semibold text-charcoal" href={site.phone.href}>{site.phone.display}</a>.</p>
        </div>
        <div className="border-t border-charcoal lg:col-span-8">
          {faqs.map(([q, a]) => (
            <details key={q} className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[1.6rem] leading-tight transition-colors hover:text-oak [&::-webkit-details-marker]:hidden">
                {q}
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-charcoal/25 transition-colors duration-300 group-open:border-charcoal group-open:bg-charcoal group-open:text-lime"><Plus className="h-4 w-4 transition-transform duration-500 group-open:rotate-45" strokeWidth={1.5} aria-hidden="true" /></span>
              </summary>
              <p className="max-w-2xl pb-7 text-lg text-charcoal/75">{a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }} />
    </section>
  );
}
