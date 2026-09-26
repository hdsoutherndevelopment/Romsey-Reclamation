"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Visual } from "@/components/Visual";
import type { projects as P } from "@/lib/materials";

const gutter = "max(clamp(1.25rem,4vw,3rem), calc((100% - 88rem) / 2 + clamp(1.25rem,4vw,3rem)))";

export function ProjectsRail({ items }: { items: typeof P }) {
  const ref = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 24), behavior: "smooth" });
  };
  return (
    <div>
      <div className="wrap mb-6 flex justify-end gap-2">
        <button type="button" onClick={() => scroll(-1)} className="grid h-11 w-11 place-items-center border border-lime/30 hover:border-lime" aria-label="Previous projects"><ArrowLeft className="h-4 w-4" strokeWidth={1.5} /></button>
        <button type="button" onClick={() => scroll(1)} className="grid h-11 w-11 place-items-center border border-lime/30 hover:border-lime" aria-label="Next projects"><ArrowRight className="h-4 w-4" strokeWidth={1.5} /></button>
      </div>
      <ul ref={ref} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2" style={{ paddingInline: gutter, scrollPaddingInline: gutter }}>
        {items.map((p) => (
          <li key={p.title} className="group w-[82vw] shrink-0 snap-start sm:w-[26rem] lg:w-[30rem]">
            <div className="img-zoom aspect-[4/5] overflow-hidden bg-oak-dark">
              <Visual art={p.art} alt={`${p.title} — reclaimed materials`} />
            </div>
            <h3 className="mt-5 font-display text-[1.75rem] leading-tight text-lime">{p.title}</h3>
            <p className="mt-2 max-w-sm text-lime/70">{p.description}</p>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {p.materials.map((m) => <Link key={m.href + m.label} href={m.href} className="link-u text-lime">{m.label}</Link>)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
