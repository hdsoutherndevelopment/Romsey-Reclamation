import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Calculator } from "@/components/Calculator";
import { VisitYard } from "@/components/sections/VisitYard";

export const metadata: Metadata = {
  title: "Material Calculators — Sleepers, Bricks, Roof Tiles & Paving",
  description: "Work out how many railway sleepers, reclaimed bricks, plain roof tiles or York flagstones you need, then add them to an enquiry to Romsey Reclamation.",
  alternates: { canonical: "/calculators" },
};

export default function Calculators() {
  return (
    <>
      <PageHead crumb="Calculators" title="How much do I need?" intro="Quick estimates for the materials people ask about most. Add the result to your enquiry list and we’ll check stock and delivery for you." />
      <section className="wrap grid gap-6 pb-12 lg:grid-cols-2">
        <Calculator kind="sleepers" />
        <Calculator kind="bricks" />
        <Calculator kind="tiles" />
        <Calculator kind="paving" />
      </section>
      <section className="wrap pb-20">
        <p className="max-w-2xl text-charcoal/75">
          Matching an existing wall or roof? Numbers matter less than colour and size — <Link href="/contact?material=matching#enquire" className="link-u font-semibold text-charcoal">send us a photo</Link> or bring a sample to the yard.
        </p>
      </section>
      <VisitYard />
    </>
  );
}
