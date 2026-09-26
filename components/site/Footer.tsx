import Link from "next/link";
import { site } from "@/lib/config";
import { categories } from "@/lib/materials";
import { BrickMark } from "./Logo";

export function Footer() {
  const company = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "Delivery", href: "/delivery" },
    { label: "All products", href: "/materials" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <footer className="bg-soot pb-20 text-lime/80 sm:pb-0" style={{ ["--logo-bg" as string]: "#1b1916" }}>
      <div className="wrap pt-20 pb-10">
        <div className="flex flex-col gap-6 border-b border-lime/15 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <BrickMark className="mb-6 h-8 w-16 text-lime" />
            <p className="stencil text-[clamp(2.8rem,8vw,6.5rem)] text-lime">Romsey Reclamation</p>
          </div>
          <p className="font-display text-2xl text-lime md:text-3xl">{site.tagline}</p>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-sm font-semibold text-lime">Materials</h2>
            <ul className="space-y-2 text-[0.95rem]">
              {categories.map((c) => (
                <li key={c.slug}><Link href={`/${c.slug}`} className="link-u hover:text-lime">{c.menuTitle}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold text-lime">Company</h2>
            <ul className="space-y-2 text-[0.95rem]">
              {company.map((l) => <li key={l.href}><Link href={l.href} className="link-u hover:text-lime">{l.label}</Link></li>)}
              <li><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="link-u hover:text-lime">Facebook</a></li>
              {site.social.instagram && <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="link-u hover:text-lime">Instagram</a></li>}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold text-lime">Find us</h2>
            <address className="not-italic text-[0.95rem] leading-relaxed">
              {site.legalName}<br />
              {site.address.lines.map((l) => <span key={l}>{l}<br /></span>)}
              {site.address.postcode}
            </address>
            <p className="mt-4 space-y-1 text-[0.95rem]">
              <a href={site.phone.href} className="link-u block w-fit text-lime">{site.phone.display}</a>
              <a href={`mailto:${site.email}`} className="link-u block w-fit text-lime">{site.email}</a>
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold text-lime">Opening hours</h2>
            <dl className="space-y-2 text-[0.95rem]">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 border-b border-lime/10 pb-2">
                  <dt>{h.days}</dt><dd className="text-lime">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-lime/60">Salvo Code member. Please bring wellies.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-lime/15 pt-8 text-[0.8rem] text-lime/55 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. Registered in England & Wales no. {site.company.number}. Registered office: {site.company.registeredOffice}.</p>
          <Link href="/privacy" className="link-u w-fit hover:text-lime">Privacy policy</Link>
        </div>
      </div>
    </footer>
  );
}
