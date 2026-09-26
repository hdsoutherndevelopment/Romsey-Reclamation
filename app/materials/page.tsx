import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Visual } from "@/components/Visual";
import { VisitYard } from "@/components/sections/VisitYard";
import { categories, inventory } from "@/lib/materials";

export const metadata: Metadata = {
  title: "Products — Reclaimed Building Materials",
  description: "Railway sleepers, reclaimed bricks, roof tiles and slates, oak and timber, doors, gates, paving, stone, fireplaces and architectural salvage from our yard near Romsey.",
  alternates: { canonical: "/materials" },
};

export default function Materials() {
  return (
    <>
      <PageHead crumb="Products" title="Products" intro="At times the yard carries close to a thousand different products. Browse by material, or scan the full list of regular stock below." />
      <section className="wrap">
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`} className="group block">
                <div className="img-zoom aspect-[4/3] overflow-hidden bg-oak-dark"><Visual art={c.hero} alt={c.title} /></div>
                <h2 className="stencil mt-4 border-b border-rule pb-3 text-[2rem]">{c.title}</h2>
                <p className="mt-3 text-charcoal/75">{c.short}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="az-title" className="wrap py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="az-title" className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-none lg:col-span-4">Regular stock, A–Z</h2>
          <ul className="columns-1 gap-8 border-t border-charcoal pt-4 sm:columns-2 lg:col-span-8 lg:columns-3">
            {inventory.map((i) => (
              <li key={i.name} className="break-inside-avoid border-b border-rule py-2.5">
                <Link href={`/${i.slug}`} className="link-u">{i.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <VisitYard />
    </>
  );
}
