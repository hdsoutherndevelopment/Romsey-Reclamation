import { useId, type ReactNode } from "react";
import { site } from "@/lib/config";

/* Shared editorial primitives: section headings, the rotating stamp and the scroll-scrubbed manifesto text. */

export function SectionHead({ index, label, title, intro, id, light = false, className = "" }: {
  index: string; label: string; title: ReactNode; intro?: ReactNode; id?: string; light?: boolean; className?: string;
}) {
  return (
    <div className={`mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className="lg:col-span-8">
        <p className={`eyebrow mb-6 flex items-center gap-3 ${light ? "text-lime/60" : "text-charcoal/60"}`}>
          <span className={light ? "text-oak-light" : "text-brick"}>({index})</span>
          <span className={`h-px w-10 ${light ? "bg-lime/30" : "bg-charcoal/30"}`} aria-hidden="true" />
          {label}
        </p>
        <h2 id={id} className="stencil text-[clamp(3rem,7.5vw,7.25rem)]">{title}</h2>
      </div>
      {intro && <div className={`max-w-md text-lg lg:col-span-4 lg:justify-self-end ${light ? "text-lime/75" : "text-charcoal/75"}`}>{intro}</div>}
    </div>
  );
}

export function Stamp({ className = "", text = `${site.tagline} • Est. Awbridge • ` }: { className?: string; text?: string }) {
  const id = "stamp" + useId().replace(/[^a-zA-Z0-9]/g, ""); // plain id so the #fragment href resolves everywhere
  return (
    <div className={`grid aspect-square place-items-center ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="stamp-spin absolute inset-0 h-full w-full">
        <defs><path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
        <text className="fill-current" style={{ fontFamily: "var(--font-mono)", fontSize: 13.2, letterSpacing: "0.22em", textTransform: "uppercase" }}>
          <textPath href={`#${id}`} textLength="486" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 48 24" className="w-[38%]">
        <rect x="1" y="1" width="46" height="22" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="9" y="6" width="30" height="12" rx="5" fill="currentColor" />
      </svg>
    </div>
  );
}

/* Words brighten one by one as the paragraph scrolls through the viewport (CSS only; static text without support). */
export function Scrub({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`scrub ${className}`}>
      {text.split(" ").map((w, i) => <span key={i}>{w} </span>)}
    </p>
  );
}
