import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Visual } from "@/components/Visual";
import { VisitYard } from "@/components/sections/VisitYard";
import { categories } from "@/lib/materials";

export const metadata: Metadata = {
  title: "Gallery — Around the Yard",
  description: "Reclaimed bricks, sleepers, oak, tiles, slates, stone and salvage at Romsey Reclamation.",
  alternates: { canonical: "/gallery" },
};

export default function Gallery() {
  const images = categories.flatMap((c) => [{ art: c.hero, caption: c.title }, ...c.gallery]);
  return (
    <>
      <PageHead crumb="Gallery" title="Around the yard" intro="Textures, colours and stacks from across the yard. The best way to see it all is in person." />
      <section className="wrap pb-20">
        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((g, i) => (
            <li key={i} className="mb-4 break-inside-avoid">
              <figure>
                <div className={`overflow-hidden bg-oak-dark ${["aspect-[4/5]", "aspect-[4/3]", "aspect-square"][i % 3]}`}><Visual art={g.art} alt={g.caption} /></div>
                <figcaption className="mt-2 text-sm text-charcoal/70">{g.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
      <VisitYard />
    </>
  );
}
