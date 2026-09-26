import type { Metadata } from "next";
import { Suspense } from "react";
import { Camera, MessageSquare, Truck } from "lucide-react";
import { PageHead } from "@/components/PageHead";
import { Visual } from "@/components/Visual";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { VisitYard } from "@/components/sections/VisitYard";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Sell Your Reclaimed Materials & Salvage",
  description: "Clearing a site, barn or building in Hampshire? Romsey Reclamation buys reclaimed bricks, roof tiles, slates, oak beams, flagstones, sleepers and architectural salvage.",
  alternates: { canonical: "/sell" },
};

// Mirrors what the yard stocks. CONFIRM with the client which lines they actively buy.
const wanted = [
  "Reclaimed bricks", "Plain clay roof tiles", "Roof slates", "Oak beams & joists", "York flagstones", "Granite setts & cobbles",
  "Railway sleepers", "Walling & Purbeck stone", "Period doors", "Fireplaces & surrounds", "Cast iron radiators", "Chimney pots",
  "Stone troughs", "Quarry tiles", "Enamel signs & post boxes", "Old farm equipment",
];

const steps = [
  { icon: Camera, title: "Send photos", body: "Snap what you have, roughly how much, and where it is. The form below takes up to four photos." },
  { icon: MessageSquare, title: "We’ll reply", body: "If it’s something we’re interested in, we’ll come back to you to talk about quantities and condition." },
  { icon: Truck, title: "Agree the details", body: "We’ll agree a price and how the materials get to the yard." },
];

export default function Sell() {
  return (
    <>
      <PageHead crumb="Sell to us" title="We buy salvage" intro="Demolition, renovation or a barn clear-out? Good materials deserve a second life — and we’ve been buying them for decades." />

      <div className="wrap"><div className="aspect-[4/3] overflow-hidden bg-oak-dark md:aspect-[21/8]"><Visual art={{ kind: "stock", seed: 4 }} alt="Reclaimed bricks stacked for reuse" priority /></div></div>

      <section aria-labelledby="steps-title" className="wrap py-20 lg:py-24">
        <h2 id="steps-title" className="sr-only">How selling works</h2>
        <ol className="grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="reveal border-t border-charcoal pt-6">
              <div className="flex items-center justify-between">
                <s.icon className="h-7 w-7 text-oak" strokeWidth={1.5} aria-hidden="true" />
                <span className="stencil text-4xl text-charcoal/20">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-[1.9rem] leading-tight">{s.title}</h3>
              <p className="mt-2 text-charcoal/80">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="wanted-title" className="border-y border-rule bg-plaster-deep">
        <div className="wrap grid gap-10 py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="wanted-title" className="stencil text-[clamp(2.6rem,5vw,4.5rem)]">What we look for</h2>
            <p className="mt-5 max-w-sm text-charcoal/75">If it’s sound, has character and someone could build with it, we’d like to hear about it.</p>
          </div>
          <ul className="flex flex-wrap content-start gap-2 lg:col-span-8">
            {wanted.map((w) => <li key={w} className="border border-charcoal/25 bg-lime px-4 py-2 text-[0.95rem]">{w}</li>)}
          </ul>
        </div>
      </section>

      <section id="enquire" aria-labelledby="sell-form-title" className="wrap grid scroll-mt-28 gap-12 py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="sell-form-title" className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none">Tell us what you have</h2>
          <p className="mt-5 text-charcoal/80">Photos help most. Include rough quantities and the postcode where the materials are. Or call <a className="link-u font-semibold" href={site.phone.href}>{site.phone.display}</a>.</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Suspense fallback={null}><EnquiryForm defaultTopic="selling" withList={false} /></Suspense>
        </div>
      </section>
      <VisitYard />
    </>
  );
}
