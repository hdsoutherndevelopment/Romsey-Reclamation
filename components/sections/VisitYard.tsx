import { ArrowUpRight, Phone } from "lucide-react";
import { site } from "@/lib/config";
import { OpenStatus } from "@/components/OpenStatus";

export function VisitYard({ heading = "Visit the yard" }: { heading?: string }) {
  return (
    <section id="visit" aria-labelledby="visit-title" className="scroll-mt-24 border-t border-rule">
      <div className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:py-36">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6 flex items-center gap-3 text-charcoal/60"><span className="text-brass">(→)</span><span className="h-px w-10 bg-charcoal/30" aria-hidden="true" />Oak Tree Farm · SO51 0GQ</p>
          <h2 id="visit-title" className="stencil text-[clamp(3rem,6.5vw,6rem)]">{heading.split(" ").slice(0, -1).join(" ")} <em>{heading.split(" ").slice(-1)}</em></h2>
          <p className="mt-6 max-w-md text-lg">
            The yard is set on a large site that’s easy to explore. Come and walk the stacks — seeing stock in person is the best way to choose.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <h3 className="eyebrow mb-3 text-charcoal/50">Address</h3>
              <address className="not-italic leading-relaxed">
                {site.legalName}<br />
                {site.address.lines.map((l) => <span key={l}>{l}<br /></span>)}
                {site.address.postcode}
              </address>
            </div>
            <div>
              <h3 className="eyebrow mb-3 text-charcoal/50">Contact</h3>
              <p className="leading-relaxed">
                <a className="link-u" href={site.phone.href}>{site.phone.display}</a><br />
                <a className="link-u break-all" href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <h3 className="eyebrow mb-3 flex max-w-sm flex-wrap items-center justify-between gap-2 text-charcoal/50">Opening hours <OpenStatus className="text-charcoal" /></h3>
              <dl className="max-w-sm">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-6 border-b border-rule py-2">
                    <dt>{h.days}</dt><dd className="font-semibold">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 max-w-sm text-[0.95rem] text-charcoal/75">It’s a working yard — please bring wellies and sensible footwear.</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">Get directions <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} /></a>
            <a href={site.phone.href} className="btn btn-ghost"><Phone className="h-4 w-4" strokeWidth={1.75} />Call Us</a>
          </div>
        </div>

        <div className="clip-reveal relative min-h-[460px] overflow-hidden bg-plaster-deep lg:col-span-7">
          <iframe
            title="Map showing Romsey Reclamation at Oak Tree Farm, Dunbridge Lane, Awbridge"
            src={site.mapEmbedUrl}
            className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(.92)_sepia(.35)_contrast(.95)_brightness(.9)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <p className="eyebrow pointer-events-none absolute left-0 top-0 bg-soot px-4 py-2.5 text-lime">Awbridge · 3 miles NW of Romsey</p>
        </div>
      </div>
    </section>
  );
}
