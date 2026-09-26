"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { nav, site } from "@/lib/config";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-rule bg-plaster/95 backdrop-blur supports-[backdrop-filter]:bg-plaster/85">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-6 text-[0.93rem]">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={`link-u ${isActive(l.href) ? "bg-[length:100%_1px]" : ""}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact#visit" className="btn btn-solid hidden sm:inline-flex">Visit the Yard</Link>
          <button type="button" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center xl:hidden" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu">
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-50 flex flex-col bg-soot text-lime transition-[opacity,visibility] duration-300 xl:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
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
                <Link href={l.href} className="block py-1.5 font-display text-[2.1rem] leading-tight sm:text-5xl">{l.label}</Link>
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
