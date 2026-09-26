import Link from "next/link";
import { ArrowRight, ArrowUp, Phone } from "lucide-react";
import { site } from "@/lib/config";
import { categories } from "@/lib/materials";
import { OpenStatus } from "@/components/OpenStatus";
import { Stamp } from "@/components/ui";

export function Footer() {
  const company = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "Delivery", href: "/delivery" },
    { label: "Calculators", href: "/calculators" },
    { label: "Sell to us", href: "/sell" },
    { label: "All products", href: "/materials" },
    { label: "Contact", href: "/contact" },
  ];
  const col = "eyebrow mb-5 text-lime/45";
  return (
    <footer className="relative overflow-hidden bg-soot pb-20 text-lime/75 sm:pb-0" style={{ ["--logo-bg" as string]: "#171512" }}>
      {/* Closing call to action */}
      <div className="wrap grid gap-10 border-b border-lime/10 py-24 lg:grid-cols-12 lg:items-end lg:py-32">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-6 text-lime/50"><OpenStatus className="text-lime" /></p>
          <p className="stencil text-[clamp(3.2rem,8vw,8rem)] text-lime">Come and walk <em className="text-oak-light">the stacks</em></p>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
          <Link href="/contact#visit" className="btn btn-light">Plan a visit <ArrowRight className="h-4 w-4" strokeWidth={1.75} /></Link>
          <a href={site.phone.href} className="btn btn-ghost-light"><Phone className="h-4 w-4" strokeWidth={1.75} />{site.phone.display}</a>
        </div>
      </div>

      <div className="wrap grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h2 className={col}>Materials</h2>
          <ul className="space-y-2.5 text-[0.95rem]">
            {categories.map((c) => <li key={c.slug}><Link href={`/${c.slug}`} className="link-u hover:text-lime">{c.menuTitle}</Link></li>)}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className={col}>Company</h2>
          <ul className="space-y-2.5 text-[0.95rem]">
            {company.map((l) => <li key={l.href}><Link href={l.href} className="link-u hover:text-lime">{l.label}</Link></li>)}
            <li><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="link-u hover:text-lime">Facebook ↗</a></li>
            {site.social.instagram && <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="link-u hover:text-lime">Instagram ↗</a></li>}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className={col}>Find us</h2>
          <address className="not-italic text-[0.95rem] leading-relaxed">
            {site.legalName}<br />
            {site.address.lines.map((l) => <span key={l}>{l}<br /></span>)}
            {site.address.postcode}
          </address>
          <p className="mt-5 space-y-1 text-[0.95rem]">
            <a href={site.phone.href} className="link-u block w-fit text-lime">{site.phone.display}</a>
            <a href={`mailto:${site.email}`} className="link-u block w-fit text-lime">{site.email}</a>
          </p>
        </div>
        <div className="lg:col-span-3">
          <h2 className={col}>Opening hours</h2>
          <dl className="space-y-2.5 text-[0.95rem]">
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4 border-b border-lime/10 pb-2.5">
                <dt>{h.days}</dt><dd className="text-lime">{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-lime/50">Salvo Code member. Please bring wellies.</p>
        </div>
      </div>

      {/* Full-width wordmark */}
      <div className="wrap relative">
        <p aria-hidden="true" className="stencil select-none whitespace-nowrap text-center leading-[0.8] text-lime wordmark-fit">Romsey Reclamation</p>
        <Stamp className="absolute -top-32 right-[clamp(1.25rem,4vw,3.5rem)] hidden w-28 text-oak-light md:grid" />
      </div>

      <div className="wrap flex flex-col gap-4 border-t border-lime/10 py-8 text-[0.78rem] text-lime/45 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.legalName}. Registered in England & Wales no. {site.company.number}. Registered office: {site.company.registeredOffice}.</p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="link-u w-fit hover:text-lime">Privacy</Link>
          <a href="#main" className="inline-flex items-center gap-2 hover:text-lime">Back to top <ArrowUp className="h-3.5 w-3.5" /></a>
        </div>
      </div>
    </footer>
  );
}
