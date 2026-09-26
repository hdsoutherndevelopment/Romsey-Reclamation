"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { nav, site } from "@/lib/config";
import { categories } from "@/lib/materials";
import { Visual } from "@/components/Visual";
import { ListBadge } from "@/components/list/ListBadge";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const megaRef = useRef<HTMLLIElement>(null);

  useEffect(() => { setOpen(false); setMega(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setMega(false); } };
    const onDown = (e: PointerEvent) => { if (!megaRef.current?.contains(e.target as Node)) setMega(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("pointerdown", onDown); };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/")) || (href === "/materials" && categories.some((c) => pathname === `/${c.slug}`));

  // On the home page the header floats transparently over the dark hero until you scroll.
  const overlay = pathname === "/" && !scrolled && !mega;

  return (
    <>
      <header className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow,color] duration-500 ${overlay ? "border-lime/15 bg-transparent text-lime" : "border-rule bg-plaster/90 text-charcoal backdrop-blur-md"} ${scrolled ? "shadow-[0_10px_40px_-24px_rgba(23,21,18,.5)]" : ""}`}>
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
          <Logo light={overlay} />
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-5 text-[0.93rem] xl:gap-7">
              {nav.map((l) =>
                l.href === "/materials" ? (
                  <li key={l.href} ref={megaRef} onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)} className="flex h-[4.5rem] items-center">
                    <button type="button" onClick={() => setMega((m) => !m)} aria-expanded={mega} aria-controls="mega-menu"
                      className={`link-u inline-flex items-center gap-1 font-medium transition-colors hover:text-brass ${isActive(l.href) ? "bg-[length:100%_1px] text-brass" : ""}`}>
                      {l.label}<ChevronDown className={`h-3.5 w-3.5 transition-transform ${mega ? "rotate-180" : ""}`} strokeWidth={2} aria-hidden="true" />
                    </button>
                    {mega && (
                      <div id="mega-menu" className="mega-in absolute inset-x-0 top-full">
                        <div className="border-b border-rule bg-plaster text-charcoal shadow-[0_30px_60px_-30px_rgba(27,25,22,.5)]">
                          <div className="wrap grid gap-10 py-10 lg:grid-cols-12">
                            <ul className="grid grid-cols-2 gap-x-6 gap-y-5 lg:col-span-9 xl:grid-cols-5">
                              {categories.map((c) => (
                                <li key={c.slug}>
                                  <Link href={`/${c.slug}`} className="group block">
                                    <div className="img-zoom frame aspect-[4/3] overflow-hidden bg-oak-dark"><Visual art={c.hero} alt="" /></div>
                                    <span className="mt-3 flex items-baseline gap-2 font-semibold group-hover:text-oak"><span className="eyebrow text-charcoal/40">{String(categories.indexOf(c) + 1).padStart(2, "0")}</span>{c.menuTitle}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-col gap-4 border-l border-rule pl-8 lg:col-span-3">
                              <Link href="/materials" className="group flex items-center justify-between font-display text-2xl">All products <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} /></Link>
                              <Link href="/calculators" className="link-u w-fit">Quantity calculators</Link>
                              <Link href="/delivery" className="link-u w-fit">Delivery</Link>
                              <Link href="/contact?material=matching#enquire" className="link-u w-fit">Brick & tile matching</Link>
                              <p className="mt-auto text-sm text-charcoal/70">Stock changes daily — call <a href={site.phone.href} className="link-u font-semibold text-charcoal">{site.phone.display}</a> to check.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={`link-u font-medium transition-colors hover:text-brass ${isActive(l.href) ? "bg-[length:100%_1px] text-brass" : ""}`}>{l.label}</Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <a href={site.phone.href} className="hidden items-center gap-2 px-2 text-[0.93rem] font-semibold 2xl:inline-flex"><Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />{site.phone.display}</a>
            <ListBadge />
            <Link href="/contact#visit" className={`btn ml-1 hidden min-h-11 py-2 sm:inline-flex ${overlay ? "btn-light" : "btn-solid"}`}>Visit the Yard <ArrowRight className="h-4 w-4" strokeWidth={1.75} /></Link>
            <button type="button" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center lg:hidden" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu">
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div aria-hidden="true" className="scroll-progress absolute inset-x-0 bottom-[-1px] h-[2px] bg-gradient-to-r from-brass/40 via-brass to-brass-bright" />
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-0 z-50 flex flex-col bg-soot text-lime transition-[opacity,visibility] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between border-b border-lime/15">
          <Logo light />
          <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center" aria-label="Close menu">
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
        <nav aria-label="Mobile" className="wrap flex-1 overflow-y-auto py-8">
          <ul className="space-y-1">
            {[{ label: "Home", href: "/" }, ...nav].map((l, i) => (
              <li key={l.href} style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }} className={`transition-[transform,opacity] duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
                <Link href={l.href} className="flex items-baseline gap-4 py-2"><span className="eyebrow w-6 text-lime/40">{String(i).padStart(2, "0")}</span><span className="stencil text-[2.6rem] sm:text-6xl">{l.label}</span></Link>
                {l.href === "/materials" && (
                  <ul className="mb-4 ml-10 mt-2 flex flex-wrap gap-2">
                    {categories.map((c) => <li key={c.slug}><Link href={`/${c.slug}`} className="block border border-lime/20 px-3 py-1.5 text-sm text-lime/85">{c.menuTitle}</Link></li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="wrap grid gap-3 border-t border-lime/15 py-6 sm:grid-cols-2">
          <a href={site.phone.href} className="btn btn-light"><Phone className="h-4 w-4" strokeWidth={1.75} />Call {site.phone.display}</a>
          <Link href="/contact#visit" className="btn btn-ghost-light">Visit the Yard</Link>
          <p className="text-sm text-lime/60 sm:col-span-2">Oak Tree Farm, Dunbridge Lane, Awbridge, Romsey {site.address.postcode}</p>
        </div>
      </div>
    </>
  );
}
