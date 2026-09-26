import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { site } from "@/lib/config";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" }, robots: { index: false } };

// CONFIRM — review with the client before launch.
export default function Privacy() {
  return (
    <>
      <PageHead crumb="Privacy policy" title="Privacy policy" />
      <section className="wrap pb-24">
        <div className="prose-rr max-w-2xl text-lg [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-3xl">
          <p>{site.legalName} (company no. {site.company.number}) is responsible for personal information collected through this website.</p>
          <h2>What we collect</h2>
          <p>When you send an enquiry we receive your name, contact details and message. We use them only to reply to you and deal with your order or enquiry.</p>
          <h2>How long we keep it</h2>
          <p>We keep enquiry details for as long as needed to handle your enquiry and any resulting order, and to meet our legal and accounting obligations.</p>
          <h2>Sharing</h2>
          <p>We don’t sell your information. Our email and website hosting providers process it on our behalf. The map on this site is provided by Google and is subject to Google’s privacy policy.</p>
          <h2>Your rights</h2>
          <p>You can ask to see, correct or delete the information we hold about you by emailing <a className="link-u" href={`mailto:${site.email}`}>{site.email}</a> or calling {site.phone.display}. You can also complain to the Information Commissioner’s Office (ico.org.uk).</p>
        </div>
      </section>
    </>
  );
}
