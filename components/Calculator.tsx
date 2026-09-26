"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator as CalcIcon } from "lucide-react";
import { SLEEPER_LENGTHS, bricks, paving, sleepers, tiles, type CalcKey, type Estimate } from "@/lib/calculators";
import { AddToList } from "@/components/list/AddToList";

const META: Record<CalcKey, { title: string; blurb: string; item: string; category: string; href: string }> = {
  sleepers: { title: "Raised bed & edging", blurb: "How many sleepers for a raised bed, or a straight run of edging (set width to 0).", item: "Railway sleepers", category: "sleepers", href: "/sleepers" },
  bricks: { title: "Bricks for a wall", blurb: "Standard 215 × 65mm bricks with 10mm joints, plus 10% for cuts and breakage.", item: "Reclaimed bricks", category: "bricks", href: "/bricks" },
  tiles: { title: "Plain roof tiles", blurb: "Clay plain tiles at a standard 100mm gauge, plus 5% for cuts.", item: "Reclaimed plain roof tiles", category: "roof-tiles", href: "/roof-tiles" },
  paving: { title: "Flagstones for a patio", blurb: "Reclaimed York flagstone comes in random sizes, so we add 10%.", item: "York flagstones", category: "paving", href: "/paving" },
};

function Num({ label, value, onChange, suffix = "m" }: { label: string; value: string; onChange: (v: string) => void; suffix?: string }) {
  return (
    <label className="text-sm font-semibold">
      {label}
      <span className="mt-2 flex items-center rounded-[2px] border border-rule bg-lime focus-within:border-charcoal">
        <input type="number" inputMode="decimal" min="0" step="0.1" value={value} onChange={(e) => onChange(e.target.value)} className="w-full min-w-0 bg-transparent px-3 py-2.5 text-base font-normal outline-none" />
        <span className="pr-3 font-normal text-charcoal/55">{suffix}</span>
      </span>
    </label>
  );
}

export function Calculator({ kind, compact = false }: { kind: CalcKey; compact?: boolean }) {
  const m = META[kind];
  const [a, setA] = useState(kind === "tiles" ? "20" : kind === "bricks" ? "5" : "3");
  const [b, setB] = useState(kind === "bricks" ? "1.2" : kind === "paving" ? "4" : "1.2");
  const [c, setC] = useState("2");
  const [size, setSize] = useState<string>(SLEEPER_LENGTHS[0].id);
  const [bond, setBond] = useState<"half" | "one">("half");

  const est: Estimate | null =
    kind === "sleepers" ? sleepers(+a, +b, +c, size)
    : kind === "bricks" ? bricks(+a, +b, bond)
    : kind === "tiles" ? tiles(+a)
    : paving(+a, +b);

  const sel = "mt-2 block w-full rounded-[2px] border border-rule bg-lime px-3 py-2.5 text-base font-normal outline-none focus:border-charcoal";
  const sizeLabel = SLEEPER_LENGTHS.find((s) => s.id === size)?.label;

  return (
    <div className={`border border-charcoal/80 bg-plaster ${compact ? "p-6" : "p-6 sm:p-8"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-oak"><CalcIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />Quantity calculator</p>
          <h3 className="mt-2 font-display text-[1.9rem] leading-tight">{m.title}</h3>
          <p className="mt-2 max-w-md text-[0.95rem] text-charcoal/75">{m.blurb}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {kind === "sleepers" && <>
          <Num label="Length" value={a} onChange={setA} />
          <Num label="Width (0 for edging)" value={b} onChange={setB} />
          <Num label="Sleepers high" value={c} onChange={setC} suffix="courses" />
          <label className="text-sm font-semibold">Sleeper
            <select value={size} onChange={(e) => setSize(e.target.value)} className={sel}>
              {SLEEPER_LENGTHS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </label>
        </>}
        {kind === "bricks" && <>
          <Num label="Wall length" value={a} onChange={setA} />
          <Num label="Wall height" value={b} onChange={setB} />
          <label className="text-sm font-semibold sm:col-span-2">Wall thickness
            <select value={bond} onChange={(e) => setBond(e.target.value as "half" | "one")} className={sel}>
              <option value="half">Single skin (half-brick, ~102mm)</option>
              <option value="one">Double skin (one-brick, ~215mm)</option>
            </select>
          </label>
        </>}
        {kind === "tiles" && <Num label="Roof area (each slope added together)" value={a} onChange={setA} suffix="m²" />}
        {kind === "paving" && <>
          <Num label="Patio length" value={a} onChange={setA} />
          <Num label="Patio width" value={b} onChange={setB} />
        </>}
      </div>

      <div aria-live="polite" className="mt-6 border-t border-charcoal pt-5">
        {est ? (
          <>
            <p className="flex flex-wrap items-baseline gap-x-3">
              <span className="stencil text-[3.2rem]">{est.qty.toLocaleString("en-GB")}</span>
              <span className="text-lg font-semibold">{est.unit}</span>
            </p>
            <p className="mt-1 text-[0.95rem] text-charcoal/75">{est.detail}</p>
            <p className="mt-2 text-[0.95rem]">{est.delivery}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <AddToList name={kind === "sleepers" ? `${m.item} — ${sizeLabel}` : m.item} category={m.category} qty={`${est.qty.toLocaleString("en-GB")} ${est.unit}`} />
              {!compact && <Link href={m.href} className="link-u text-[0.95rem] font-semibold">See {m.item.toLowerCase()} →</Link>}
            </div>
          </>
        ) : (
          <p className="text-charcoal/70">Enter your measurements to see an estimate.</p>
        )}
        <p className="mt-4 text-xs text-charcoal/60">An estimate only. Reclaimed stock varies in size — confirm quantities with the yard before you order.</p>
      </div>
    </div>
  );
}

