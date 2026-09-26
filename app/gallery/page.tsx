import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { GalleryGrid } from "@/components/GalleryGrid";
import { VisitYard } from "@/components/sections/VisitYard";
import { categories } from "@/lib/materials";

export const metadata: Metadata = {
  title: "Gallery — Around the Yard",
  description: "Reclaimed bricks, sleepers, oak, tiles, slates, stone and salvage at Romsey Reclamation.",
  alternates: { canonical: "/gallery" },
};

export default function Gallery() {
  const images = categories.flatMap((c) => [{ art: c.hero, caption: c.title }, ...c.gallery].map((g) => ({ ...g, group: c.menuTitle, slug: c.slug })));
  return (
    <>
      <PageHead crumb="Gallery" title="Around the yard" intro="Textures, colours and stacks from across the yard. The best way to see it all is in person." />
      <section className="wrap pb-20">
        <GalleryGrid images={images} groups={categories.map((c) => c.menuTitle)} />
      </section>
      <VisitYard />
    </>
  );
}
