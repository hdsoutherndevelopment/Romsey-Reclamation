import Link from "next/link";

/* Mark: a brick with "RR" pressed into its frog, like a maker's stamp. */
export function BrickMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" className={className} aria-hidden="true">
      <rect x="1" y="1" width="46" height="22" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="9" y="6" width="30" height="12" rx="5" fill="currentColor" />
      <text x="24" y="15.6" textAnchor="middle" fontSize="9.5" fontWeight="800" fontFamily="Arial, sans-serif" style={{ fill: "var(--logo-bg, #eee8dc)" }} letterSpacing=".5">RR</text>
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Romsey Reclamation — home" style={{ ["--logo-bg" as string]: light ? "#1b1916" : "#eee8dc" }}>
      <BrickMark className="h-6 w-12 shrink-0" />
      <span className="stencil text-[1.35rem] leading-none tracking-[0.02em]">Romsey Reclamation</span>
    </Link>
  );
}
