import { ArrowUpRight, Phone } from "lucide-react";
import { site } from "@/lib/config";

export function VisitYard({ heading = "Visit the yard" }: { heading?: string }) {
  return (
    <section id="visit" aria-labelledby="visit-title" className="scroll-mt-24 border-t border-rule">
      <div className="wrap grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-5">
          <h2 id="visit-title" className="stencil text-[clamp(3rem,7vw,5.5rem)]">{heading}</h2>
          <p className="mt-6 max-w-md text-lg">
            The yard is set on a large site that’s easy to explore. Come and walk the stacks — seeing stock in person is the best way to choose.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-oak">Address</h3>
              <address className="not-italic leading-relaxed">
                {site.legalName}<br />
                {site.address.lines.map((l) => <span key={l}>{l}<br /></span>)}
                {site.address.postcode}
              </address>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-oak">Contact</h3>
              <p className="leading-relaxed">
                <a className="link-u" href={site.phone.href}>{site.phone.display}</a><br />
                <a className="link-u break-all" href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <h3 className="mb-2 text-sm font-semibold text-oak">Opening hours</h3>
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
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">Get Directions <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} /></a>
            <a href={site.phone.href} className="btn btn-ghost"><Phone className="h-4 w-4" strokeWidth={1.75} />Call Us</a>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden border border-rule bg-plaster-deep lg:col-span-7">
          <iframe
            title="Map showing Romsey Reclamation at Oak Tree Farm, Dunbridge Lane, Awbridge"
            src={site.mapEmbedUrl}
            className="absolute inset-0 h-full w-full [filter:grayscale(.7)_sepia(.2)_contrast(1.05)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <p className="absolute left-0 top-0 bg-soot px-4 py-2 text-sm text-lime">Awbridge, 3 miles north-west of Romsey</p>
        </div>
      </div>
    </section>
  );
}
