"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Visual } from "@/components/Visual";
import type { projects as P } from "@/lib/materials";

const gutter = "max(clamp(1.25rem,4vw,3.5rem), calc((100vw - 90rem) / 2 + clamp(1.25rem,4vw,3.5rem)))";

/* Desktop with scroll-timeline support: the section pins and the cards slide sideways as you scroll (see .hs-* in globals.css).
   Everywhere else: a normal swipeable rail with arrow buttons. */
export function ProjectsRail({ items, heading, cta }: { items: typeof P; heading: ReactNode; cta: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 24), behavior: "smooth" });
  };
  return (
    <div className="hs-outer">
      <div className="hs-sticky py-20 lg:py-0">
        <div className="wrap">{heading}</div>
        <div className="hs-controls wrap mb-6 flex justify-end gap-2">
          <button type="button" onClick={() => scroll(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-lime/30 hover:border-lime" aria-label="Previous projects"><ArrowLeft className="h-4 w-4" strokeWidth={1.5} /></button>
          <button type="button" onClick={() => scroll(1)} className="grid h-11 w-11 place-items-center rounded-full border border-lime/30 hover:border-lime" aria-label="Next projects"><ArrowRight className="h-4 w-4" strokeWidth={1.5} /></button>
        </div>
        <ul ref={ref} className="hs-track no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 lg:gap-10" style={{ paddingInline: gutter, scrollPaddingInline: gutter }}>
          {items.map((p, i) => (
            <li key={p.title} className="group w-[82vw] shrink-0 snap-start sm:w-[24rem] lg:w-[clamp(18rem,34vh,28rem)]">
              <div className="img-zoom relative aspect-[4/5] overflow-hidden bg-oak-dark">
                <Visual art={p.art} alt={`${p.title} — reclaimed materials`} />
                <span className="eyebrow absolute left-4 top-4 bg-soot/70 px-2 py-1 text-lime backdrop-blur">No. {String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 font-display text-[1.9rem] leading-tight text-lime">{p.title}</h3>
              <p className="mt-2 max-w-sm text-[0.95rem] text-lime/65">{p.description}</p>
              <p className="eyebrow mt-4 flex flex-wrap gap-x-4 gap-y-1">
                {p.materials.map((m) => <Link key={m.href + m.label} href={m.href} className="link-u text-oak-light">{m.label}</Link>)}
              </p>
            </li>
          ))}
          <li className="flex w-[70vw] shrink-0 snap-start items-center sm:w-[20rem] lg:w-[clamp(16rem,28vh,22rem)]">{cta}</li>
        </ul>
      </div>
    </div>
  );
}
