import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Visual } from "@/components/Visual";
import { VisitYard } from "@/components/sections/VisitYard";
import { categories, getCategory } from "@/lib/materials";
import { site } from "@/lib/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  return {
    title: `${c.title} — Romsey, Hampshire`,
    description: `${c.short} From Romsey Reclamation’s yard at Awbridge, near Romsey, Hampshire.`,
    alternates: { canonical: `/${c.slug}` },
    openGraph: { title: `${c.title} | Romsey Reclamation`, description: c.short, url: `/${c.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();
  const related = c.related.map(getCategory).filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <>
      <section className="wrap pt-10 lg:pt-14">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products", href: "/materials" }, { label: c.title }]} />
        <h1 className="stencil mt-8 text-[clamp(3.2rem,10vw,9rem)]">{c.title}</h1>
        <p className="mt-6 max-w-2xl text-xl text-charcoal/80">{c.short}</p>
      </section>

      <div className="wrap mt-10">
        <div className="aspect-[4/3] overflow-hidden bg-oak-dark md:aspect-[21/9]">
          <Visual art={c.hero} alt={`${c.title} in stock at Romsey Reclamation`} priority />
        </div>
      </div>

      <section className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="prose-rr max-w-2xl text-lg lg:col-span-7">
          {c.intro.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <aside className="border-t border-charcoal pt-6 lg:col-span-4 lg:col-start-9">
          <h2 className="font-display text-2xl">Before you visit</h2>
          <ul className="mt-4 space-y-3 text-charcoal/80">
            <li>Stock changes daily — call {site.phone.display} to check availability.</li>
            <li>Bring measurements, quantities or a sample to match.</li>
            <li>Delivery available for orders of sufficient quantity. <Link href="/delivery" className="link-u text-charcoal">Delivery details</Link></li>
          </ul>
        </aside>
      </section>

      <section aria-label={`${c.title} gallery`} className="wrap">
        <ul className={`grid gap-4 ${c.gallery.length > 3 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"}`}>
          {c.gallery.map((g, i) => (
            <li key={i}>
              <figure>
                <div className="aspect-[4/5] overflow-hidden bg-oak-dark"><Visual art={g.art} alt={g.caption} /></div>
                <figcaption className="mt-3 text-sm text-charcoal/70">{g.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="stock-title" className="wrap py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="stock-title" className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-none lg:col-span-4">What we stock</h2>
          <ul className="border-t border-charcoal lg:col-span-8">
            {c.items.map((it) => (
              <li key={it.name} className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[1fr_auto] sm:gap-8">
                <div>
                  <h3 className="text-xl font-semibold">{it.name}</h3>
                  <p className="mt-1.5 max-w-xl text-charcoal/80">{it.description}</p>
                  {it.spec && <p className="mt-2 text-[0.95rem] text-oak">{it.spec}</p>}
                </div>
                <div className="flex items-start gap-4 sm:flex-col sm:items-end">
                  {it.tag && <span className="border border-rule px-2.5 py-0.5 text-[0.8rem]">{it.tag}</span>}
                  {it.price && <p className="font-semibold">{it.price}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {c.specs && (
          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <h2 className="font-display text-3xl lg:col-span-4">{c.specs.title}</h2>
            <table className="w-full text-left lg:col-span-8">
              <tbody>
                {c.specs.rows.map((r) => (
                  <tr key={r.label} className="border-b border-rule">
                    <th scope="row" className="py-4 pr-6 align-top font-normal text-charcoal/75">{r.label}</th>
                    <td className="py-4 font-semibold">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section aria-labelledby="enq-title" className="bg-charcoal text-lime">
        <div className="wrap flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 id="enq-title" className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight">Looking for something specific?</h2>
            <p className="mt-3 text-lime/75">Tell us the size, quantity or style and we’ll check what’s in the yard.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/contact?material=${c.slug}#enquire`} className="btn btn-light">Send an enquiry</Link>
            <a href={site.phone.href} className="btn btn-ghost-light"><Phone className="h-4 w-4" strokeWidth={1.75} />{site.phone.display}</a>
          </div>
        </div>
      </section>

      <section aria-labelledby="rel-title" className="wrap py-20">
        <h2 id="rel-title" className="stencil mb-10 text-[clamp(2.2rem,5vw,3.8rem)]">Related materials</h2>
        <ul className="grid gap-8 sm:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/${r.slug}`} className="group block">
                <div className="img-zoom aspect-[4/3] overflow-hidden bg-oak-dark"><Visual art={r.hero} alt={r.title} /></div>
                <h3 className="mt-4 font-display text-2xl">{r.title}</h3>
                <p className="mt-1 text-charcoal/75">{r.short}</p>
                <span className="link-u mt-2 inline-block text-[0.95rem] font-semibold">View Material →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <VisitYard />
    </>
  );
}
