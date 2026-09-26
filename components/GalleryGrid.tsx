"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Visual } from "@/components/Visual";
import type { Art } from "@/lib/materials";

type Img = { art: Art; caption: string; group: string; slug: string };

export function GalleryGrid({ images, groups }: { images: Img[]; groups: string[] }) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const shown = filter === "All" ? images : images.filter((i) => i.group === filter);
  const cur = open === null ? null : shown[open];
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length));

  useEffect(() => {
    const el = dlg.current;
    if (!el) return;
    if (open !== null && !el.open) el.showModal();
    if (open === null && el.open) el.close();
  }, [open]);

  return (
    <>
      <div role="group" aria-label="Filter by material" className="no-scrollbar -mx-[clamp(1.25rem,4vw,3rem)] mb-8 flex gap-2 overflow-x-auto px-[clamp(1.25rem,4vw,3rem)]">
        {["All", ...groups].map((g) => (
          <button key={g} type="button" onClick={() => setFilter(g)} aria-pressed={filter === g}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${filter === g ? "border-brass bg-brass text-ink" : "border-rule hover:border-charcoal"}`}>
            {g}
          </button>
        ))}
      </div>

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {shown.map((g, i) => (
          <li key={`${g.art.kind}-${g.art.seed}-${i}`} className="mb-4 break-inside-avoid">
            <figure>
              <button type="button" onClick={() => setOpen(i)} className={`group img-zoom frame block w-full overflow-hidden bg-oak-dark ${["aspect-[4/5]", "aspect-[4/3]", "aspect-square"][i % 3]}`} aria-label={`View larger: ${g.caption}`}>
                <Visual art={g.art} alt={g.caption} />
              </button>
              <figcaption className="mt-2 text-sm text-charcoal/70">{g.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog ref={dlg} onClose={() => setOpen(null)} onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-soot/95 p-0 text-lime backdrop:bg-soot/80" aria-label="Image viewer">
        {cur && (
          <div className="flex h-full flex-col">
            <div className="wrap flex h-16 items-center justify-between">
              <p className="text-sm text-lime/70">{(open ?? 0) + 1} / {shown.length}</p>
              <button type="button" onClick={() => setOpen(null)} className="grid h-11 w-11 place-items-center" aria-label="Close"><X className="h-6 w-6" strokeWidth={1.5} /></button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4">
              <div className="aspect-[4/3] max-h-full w-full max-w-6xl overflow-hidden"><Visual art={cur.art} alt={cur.caption} /></div>
              <button type="button" onClick={() => step(-1)} className="absolute left-2 grid h-12 w-12 place-items-center bg-soot/70 sm:left-6" aria-label="Previous image"><ArrowLeft className="h-5 w-5" /></button>
              <button type="button" onClick={() => step(1)} className="absolute right-2 grid h-12 w-12 place-items-center bg-soot/70 sm:right-6" aria-label="Next image"><ArrowRight className="h-5 w-5" /></button>
            </div>
            <div className="wrap flex flex-wrap items-center justify-between gap-4 py-5">
              <p className="font-display text-2xl">{cur.caption}</p>
              <Link href={`/${cur.slug}`} className="btn btn-light" onClick={() => setOpen(null)}>View {cur.group}</Link>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
