import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHead } from "@/components/PageHead";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { VisitYard } from "@/components/sections/VisitYard";
import { Faq } from "@/components/sections/Faq";
import { OpenStatus } from "@/components/OpenStatus";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact & Visit the Yard",
  description: "Visit Romsey Reclamation at Oak Tree Farm, Dunbridge Lane, Awbridge, Romsey SO51 0GQ. Call 01794 342 252 or send an enquiry.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHead crumb="Contact" title="Contact" intro="Call the yard, send an enquiry or come and see us. We’re open six days a week." />
      <section id="enquire" aria-labelledby="form-title" className="wrap grid scroll-mt-28 gap-12 pb-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="form-title" className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none">Send an enquiry</h2>
          <p className="mt-5 text-charcoal/80">Tell us what you’re looking for — quantities, sizes, colours or a photo of what you need to match. For the quickest answer, call <a className="link-u font-semibold" href={site.phone.href}>{site.phone.display}</a>.</p>
          <p className="mt-5 text-sm font-semibold"><OpenStatus /></p>
          <ul className="mt-8 space-y-3 border-t border-rule pt-6 text-[0.95rem] text-charcoal/80">
            <li>Add items from any product page or calculator and they’ll appear in the form as your enquiry list.</li>
            <li>Matching bricks or tiles? Attach a photo — it’s the fastest way for us to check stock.</li>
            <li>Include your postcode for a delivery price.</li>
          </ul>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Suspense fallback={null}><EnquiryForm /></Suspense>
        </div>
      </section>
      <Faq />
      <VisitYard />
    </>
  );
}
