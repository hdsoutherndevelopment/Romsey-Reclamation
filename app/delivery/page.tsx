import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { VisitYard } from "@/components/sections/VisitYard";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Delivery",
  description: "Delivery of railway sleepers, bricks, roof tiles, York flagstone, telegraph poles and more from Romsey Reclamation. Minimum quantities and full loads.",
  alternates: { canonical: "/delivery" },
};

const rows = [
  ["Railway sleepers, 8ft 6in", "10", "120"],
  ["Railway sleepers, 5ft", "10", "200"],
  ["Bricks", "500 (1 pallet)", "5,000 (10 pallets)"],
  ["Plain roof tiles", "600", "9,000 – 12,000"],
  ["Telegraph poles", "100ft total", "30 lengths at 15ft or less"],
  ["Crash barriers", "10", "350"],
  ["York flagstone", "3 square metres", "Call to discuss"],
];

export default function Delivery() {
  return (
    <>
      <PageHead crumb="Delivery" title="Delivery" intro="We deliver anywhere within our area for orders of sufficient quantity. Here are the minimums and the most we can drop in one load." />
      <section className="wrap grid gap-12 pb-20 lg:grid-cols-12 lg:pb-28">
        <div className="overflow-x-auto lg:col-span-8">
          <table className="w-full min-w-[34rem] text-left">
            <thead>
              <tr className="border-b border-charcoal text-sm">
                <th scope="col" className="py-3 pr-6 font-semibold">Material</th>
                <th scope="col" className="py-3 pr-6 font-semibold">Minimum order for delivery</th>
                <th scope="col" className="py-3 font-semibold">Full load</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([m, min, full]) => (
                <tr key={m} className="border-b border-rule">
                  <th scope="row" className="py-4 pr-6 font-normal">{m}</th>
                  <td className="py-4 pr-6 font-semibold">{min}</td>
                  <td className="py-4">{full}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-charcoal/65">Full-load tile numbers depend on tile thickness and packing.</p>
        </div>
        <aside className="lg:col-span-3 lg:col-start-10">
          <h2 className="font-display text-2xl">Delivery area & cost</h2>
          {/* CONFIRM — delivery radius and charges */}
          <p className="mt-3 text-charcoal/80">Delivery charges depend on distance and load. Call the yard with your postcode and order for a price.</p>
          <div className="mt-6 flex flex-col gap-3">
            <a href={site.phone.href} className="btn btn-solid">Call {site.phone.display}</a>
            <Link href="/contact?material=delivery#enquire" className="btn btn-ghost">Send a delivery enquiry</Link>
          </div>
        </aside>
      </section>
      <VisitYard />
    </>
  );
}
