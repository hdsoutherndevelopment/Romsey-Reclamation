import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Visual } from "@/components/Visual";
import { VisitYard } from "@/components/sections/VisitYard";
import { MaterialSearch } from "@/components/MaterialSearch";
import { categories, inventory, getCategory } from "@/lib/materials";

// Every stock line on the site, de-duplicated, for the search.
const entries = [...inventory.map((i) => ({ ...i, category: getCategory(i.slug)?.menuTitle ?? "" })), ...categories.flatMap((c) => c.items.map((it) => ({ name: it.name, slug: c.slug, category: c.menuTitle })))]
  .filter((e, i, all) => all.findIndex((x) => x.name.toLowerCase() === e.name.toLowerCase()) === i)
  .sort((a, b) => a.name.localeCompare(b.name));

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
          <h2 id="az-title" className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-none lg:col-span-4">Find it fast</h2>
          <div className="lg:col-span-8"><MaterialSearch entries={entries} /></div>
        </div>
      </section>
      <VisitYard />
    </>
  );
}
