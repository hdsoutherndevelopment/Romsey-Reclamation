import Link from "next/link";
import { site } from "@/lib/config";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, ...(it.href ? { item: `${site.url}${it.href === "/" ? "" : it.href}` } : {}) })),
  };
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-charcoal/70">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-charcoal/35">/</span>}
            {it.href ? <Link href={it.href} className="link-u hover:text-charcoal">{it.label}</Link> : <span aria-current="page" className="text-charcoal">{it.label}</span>}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </nav>
  );
}
