import Link from "next/link";
import { site } from "@/lib/config";

export function Breadcrumb({ items, light = false }: { items: { label: string; href?: string }[]; light?: boolean }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, ...(it.href ? { item: `${site.url}${it.href === "/" ? "" : it.href}` } : {}) })),
  };
  return (
    <nav aria-label="Breadcrumb" className={`eyebrow ${light ? "text-lime/60" : "text-charcoal/55"}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="opacity-50">/</span>}
            {it.href ? <Link href={it.href} className={`link-u ${light ? "hover:text-lime" : "hover:text-charcoal"}`}>{it.label}</Link> : <span aria-current="page" className={light ? "text-lime" : "text-charcoal"}>{it.label}</span>}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </nav>
  );
}
