import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Visual } from "@/components/Visual";
import { VisitYard } from "@/components/sections/VisitYard";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "About — Our Story",
  description: "Romsey Reclamation has supplied reclaimed bricks, tiles, slates, sleepers and oak from Awbridge, near Romsey, for almost fifty years. Salvo Code member.",
  alternates: { canonical: "/about" },
};

const services = [
  { title: "Brick & tile matching", body: "Bring a sample or a photo and we’ll find the closest match from stock for repairs, extensions and listed buildings.", href: "/bricks" },
  { title: "Oak & timber services", body: "Seasoned beams, slabs and boards from the Oak Centre, with help sizing and sourcing timber for your project.", href: "/oak" },
  { title: "Projects & outbuildings", body: "Materials for outbuildings, large sheds and garden structures — talk to us about what you’re planning.", href: "/projects" },
  { title: "Delivery", body: "We deliver full and part loads within our area for orders of sufficient quantity.", href: "/delivery" },
  { title: "We buy salvage", body: "Clearing a site or a building? We buy reclaimed materials and architectural salvage.", href: "/sell" },
];

export default function About() {
  return (
    <>
      <PageHead crumb="About" title="Reclaim. Recycle. Restore." />
      <div className="wrap"><div className="aspect-[4/3] overflow-hidden bg-oak-dark md:aspect-[21/9]"><Visual art={{ kind: "tile", seed: 8 }} alt="Weathered reclaimed roof tiles" priority /></div></div>

      <section className="wrap grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-none lg:col-span-4">Our story</h2>
        <div className="prose-rr max-w-2xl text-lg lg:col-span-7 lg:col-start-6">
          {/* CONFIRM — founding date and wording with the family */}
          <p>Romsey Reclamation started {site.founded}, simply as Romsey Reclamation, and has been improving and expanding ever since.</p>
          <p>Roofing is where it began — tiles and slates first, then bricks, then sleepers. Along the way the yard has sold several million bricks, millions more tiles and slates and hundreds of thousands of railway sleepers, and today the range numbers well into the hundreds of products.</p>
          <p>We are major importers of quality reclaimed railway sleepers and supply private, commercial, industrial, agricultural and civil engineering customers. The yard sits on a large, easy-to-explore site at Oak Tree Farm in Awbridge, just outside Romsey.</p>
          <p>Trevor poured his heart into Romsey Reclamation, building not just a business but a place where people felt welcome. His legacy lives on in the bricks and beams he rescued and the customers he looked after.</p>
          <p>We are members of the Salvo Code, the reclamation trade’s standard for dealing honestly in salvaged materials.</p>
        </div>
      </section>

      <section aria-labelledby="svc-title" className="border-y border-rule bg-plaster-deep">
        <div className="wrap py-20 lg:py-28">
          <h2 id="svc-title" className="stencil mb-12 text-[clamp(2.8rem,6vw,5rem)]">What we do</h2>
          <ul className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.title} className="border-t border-charcoal pt-5">
                <h3 className="font-display text-[1.75rem] leading-tight">{s.title}</h3>
                <p className="mt-3 text-charcoal/80">{s.body}</p>
                <Link href={s.href} className="link-u mt-4 inline-block font-semibold">Find out more →</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <VisitYard />
    </>
  );
}
