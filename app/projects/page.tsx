import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Visual } from "@/components/Visual";
import { VisitYard } from "@/components/sections/VisitYard";
import { projects } from "@/lib/materials";

export const metadata: Metadata = {
  title: "Projects — Building with Reclaimed Materials",
  description: "Outbuildings, restorations, garden structures, landscaping, fireplaces and interiors built with reclaimed materials from Romsey Reclamation.",
  alternates: { canonical: "/projects" },
};

// CONFIRM — swap these project types for real customer projects (photos + short captions) once supplied.
export default function Projects() {
  return (
    <>
      <PageHead crumb="Projects" title="Built with character" intro="Reclaimed materials go into everything from a single raised bed to a full oak-framed outbuilding. Here’s what customers build with stock from the yard." />
      <section className="wrap pb-20 lg:pb-28">
        <ul className="space-y-20 lg:space-y-28">
          {projects.map((p, i) => (
            <li key={p.title} className="grid items-center gap-8 lg:grid-cols-12">
              <div className={`aspect-[4/3] overflow-hidden bg-oak-dark lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}>
                <Visual art={p.art} alt={`${p.title} with reclaimed materials`} />
              </div>
              <div className={`lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
                <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight">{p.title}</h2>
                <p className="mt-4 text-lg text-charcoal/80">{p.description}</p>
                <p className="mt-6 text-sm text-charcoal/70">Materials used</p>
                <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1 font-semibold">
                  {p.materials.map((m) => <Link key={m.label} href={m.href} className="link-u">{m.label}</Link>)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-soot text-lime">
        <div className="wrap flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl font-display text-3xl leading-tight">Built something with materials from the yard? We’d love to see it.</p>
          <Link href="/contact?material=other#enquire" className="btn btn-light">Send us your project</Link>
        </div>
      </section>
      <VisitYard />
    </>
  );
}
