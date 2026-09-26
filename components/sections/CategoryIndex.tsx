"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Visual } from "@/components/Visual";
import type { Art } from "@/lib/materials";

type Row = { slug: string; title: string; short: string; hero: Art };

/* Typographic index of every category. On desktop an image preview follows the cursor; on touch a thumbnail sits in each row. */
export function CategoryIndex({ rows }: { rows: Row[] }) {
  const [active, setActive] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    const b = box.current?.getBoundingClientRect();
    if (!b || !preview.current) return;
    preview.current.style.transform = `translate(${e.clientX - b.left + 32}px, ${e.clientY - b.top - 140}px)`;
  };

  return (
    <div ref={box} className="relative" onPointerMove={move} onPointerLeave={() => setActive(null)}>
      <ul className="border-t border-charcoal [&:hover>li]:opacity-35 [&>li:hover]:!opacity-100">
        {rows.map((r, i) => (
          <li key={r.slug} className="border-b border-rule transition-opacity duration-500" onPointerEnter={() => setActive(r.slug)}>
            <Link href={`/${r.slug}`} className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-6 lg:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:py-7">
              <span className="aspect-square overflow-hidden bg-oak-dark sm:hidden"><Visual art={r.hero} alt="" /></span>
              <span className="eyebrow hidden text-charcoal/45 sm:block">{String(i + 1).padStart(2, "0")}</span>
              <span className="stencil text-[clamp(1.9rem,5vw,4.4rem)] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3">{r.title}</span>
              <span className="hidden max-w-sm text-[0.95rem] text-charcoal/65 lg:block">{r.short}</span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/25 transition-colors duration-300 group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-lime">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={preview} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-10 hidden w-[22rem] transition-transform duration-300 ease-out lg:block">
        <div className={`relative aspect-[4/5] overflow-hidden bg-oak-dark shadow-[0_40px_80px_-30px_rgba(23,21,18,.6)] transition-[opacity,scale] duration-500 ${active ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
          {rows.map((r) => (
            <div key={r.slug} className={`absolute inset-0 transition-opacity duration-500 ${active === r.slug ? "opacity-100" : "opacity-0"}`}>
              <Visual art={r.hero} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
