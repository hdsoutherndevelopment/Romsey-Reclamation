"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { Search } from "lucide-react";

type Entry = { name: string; slug: string; category: string };

/* Filters every stock line across all categories. Server-rendered in full, so it works without JS. */
export function MaterialSearch({ entries }: { entries: Entry[] }) {
  const [q, setQ] = useState("");
  const query = useDeferredValue(q.trim().toLowerCase());
  const words = query.split(/\s+/).filter(Boolean);
  const shown = words.length ? entries.filter((e) => words.every((w) => `${e.name} ${e.category}`.toLowerCase().includes(w))) : entries;

  return (
    <div>
      <label className="flex items-center gap-3 border-b-2 border-charcoal pb-3">
        <Search className="h-6 w-6 shrink-0" strokeWidth={1.5} aria-hidden="true" />
        <span className="sr-only">Search all stock</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search stock — e.g. oak, chimney pots, York"
          className="w-full bg-transparent font-display text-[clamp(1.5rem,3vw,2.2rem)] outline-none placeholder:text-charcoal/35"
        />
      </label>
      <p aria-live="polite" className="mt-3 text-sm text-charcoal/65">{words.length ? `${shown.length} match${shown.length === 1 ? "" : "es"}` : `${entries.length} regular stock lines`}</p>
      {shown.length ? (
        <ul className="mt-4 columns-1 gap-8 sm:columns-2 lg:columns-3">
          {shown.map((e) => (
            <li key={e.name + e.slug} className="break-inside-avoid border-b border-rule py-2.5">
              <Link href={`/${e.slug}`} className="group flex items-baseline justify-between gap-3">
                <span className="link-u">{e.name}</span>
                <span className="shrink-0 text-xs text-charcoal/50">{e.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 max-w-lg">Nothing listed for “{q}” — but stock arrives daily and we carry close to a thousand products. <Link className="link-u font-semibold" href="/contact?material=other#enquire">Ask us if it’s in</Link>.</p>
      )}
    </div>
  );
}
