import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Visual } from "@/components/Visual";
import { VisitYard } from "@/components/sections/VisitYard";
import { Calculator } from "@/components/Calculator";
import { AddToList } from "@/components/list/AddToList";
import { calcFor } from "@/lib/calculators";
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
  const calc = calcFor(c.slug);
  const related = c.related.map(getCategory).filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-soot text-lime">
        <div className="hero-art absolute inset-0 -z-10"><Visual art={c.hero} alt={`${c.title} in stock at Romsey Reclamation`} priority /></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(23,21,18,.55)_0%,rgba(23,21,18,.25)_40%,rgba(23,21,18,.92)_100%)]" />
        <div className="wrap flex min-h-[min(88svh,56rem)] flex-col justify-between pb-12 pt-10 lg:pt-14">
          <Breadcrumb light items={[{ label: "Home", href: "/" }, { label: "Products", href: "/materials" }, { label: c.title }]} />
          <div>
            <p className="hero-fade eyebrow mb-6 flex items-center gap-3 text-lime/65"><span className="text-oak-light">({String(categories.indexOf(c) + 1).padStart(2, "0")})</span><span className="h-px w-10 bg-lime/30" aria-hidden="true" />{c.items.length} stock lines · Awbridge yard</p>
            <h1 className="stencil text-[clamp(3.6rem,11vw,10.5rem)]">
              {c.title.split(" ").length > 1
                ? <span className="hero-line"><span>{c.title.split(" ").slice(0, -1).join(" ")} <em className="text-oak-light">{c.title.split(" ").slice(-1)}</em></span></span>
                : <span className="hero-line"><span>{c.title}</span></span>}
            </h1>
            <div className="hero-fade mt-8 flex flex-col gap-6 border-t border-lime/15 pt-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xl text-lg text-lime/80 sm:text-xl">{c.short}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/contact?material=${c.slug}#enquire`} className="btn btn-light">Enquire</Link>
                <a href={site.phone.href} className="btn btn-ghost-light"><Phone className="h-4 w-4" strokeWidth={1.75} />{site.phone.display}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap grid gap-12 py-20 lg:grid-cols-12 lg:py-32">
        <div className="prose-rr max-w-2xl text-lg lg:col-span-7 [&>p:first-child]:font-display [&>p:first-child]:text-[clamp(1.7rem,2.6vw,2.4rem)] [&>p:first-child]:leading-[1.15]">
          {c.intro.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <aside className="border-t border-charcoal pt-6 lg:col-span-4 lg:col-start-9">
          <h2 className="eyebrow text-charcoal/55">Before you visit</h2>
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
            <li key={i} className="reveal">
              <figure>
                <div className="clip-reveal aspect-[4/5] overflow-hidden bg-oak-dark"><Visual art={g.art} alt={g.caption} /></div>
                <figcaption className="eyebrow mt-4 flex gap-3 text-charcoal/55"><span className="text-charcoal/35">Fig. {String(i + 1).padStart(2, "0")}</span>{g.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="stock-title" className="wrap py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="stock-title" className="stencil text-[clamp(2.8rem,5.5vw,5rem)] lg:col-span-4">What we <em>stock</em></h2>
          <ul className="border-t border-charcoal lg:col-span-8">
            {c.items.map((it, n) => (
              <li key={it.name} className="grid gap-2 border-b border-rule py-7 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-6">
                <span className="eyebrow hidden pt-2 text-charcoal/40 sm:block">{String(n + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-[1.75rem] leading-tight">{it.name}</h3>
                  <p className="mt-1.5 max-w-xl text-charcoal/80">{it.description}</p>
                  {it.spec && <p className="eyebrow mt-3 text-oak">{it.spec}</p>}
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
                  {it.tag && <span className="eyebrow rounded-full border border-charcoal/20 px-2.5 py-1">{it.tag}</span>}
                  {it.price && <p className="font-display text-2xl">{it.price}</p>}
                  {it.tag !== "Service" && <AddToList name={it.name} category={c.slug} />}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {c.specs && (
          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <h2 className="stencil text-[clamp(2.2rem,4vw,3.4rem)] lg:col-span-4">{c.specs.title}</h2>
            <table className="w-full text-left lg:col-span-8">
              <tbody>
                {c.specs.rows.map((r) => (
                  <tr key={r.label} className="border-b border-rule">
                    <th scope="row" className="eyebrow py-5 pr-6 align-top font-normal text-charcoal/60">{r.label}</th>
                    <td className="py-4 font-display text-xl">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {calc && (
        <section aria-label="Quantity calculator" className="border-y border-rule bg-plaster-deep">
          <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:py-20">
            <div className="lg:col-span-4">
              <h2 className="stencil text-[clamp(2.8rem,5.5vw,5rem)]">Work out <em>quantities</em></h2>
              <p className="mt-4 max-w-sm text-charcoal/75">Get a quick estimate, then add it to your enquiry list — we’ll confirm stock and delivery.</p>
              <Link href="/calculators" className="link-u mt-6 inline-block font-semibold">All calculators →</Link>
            </div>
            <div className="lg:col-span-7 lg:col-start-6"><Calculator kind={calc} compact /></div>
          </div>
        </section>
      )}

      <section aria-labelledby="enq-title" className="bg-soot text-lime">
        <div className="wrap flex flex-col gap-8 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-28">
          <div className="max-w-xl">
            <h2 id="enq-title" className="stencil text-[clamp(2.8rem,6vw,5.5rem)]">Looking for something <em className="text-oak-light">specific?</em></h2>
            <p className="mt-3 text-lime/75">Tell us the size, quantity or style and we’ll check what’s in the yard.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/contact?material=${c.slug}#enquire`} className="btn btn-light">Send an enquiry</Link>
            <Link href="/contact?material=matching#enquire" className="btn btn-ghost-light">Match a sample</Link>
            <a href={site.phone.href} className="btn btn-ghost-light"><Phone className="h-4 w-4" strokeWidth={1.75} />{site.phone.display}</a>
          </div>
        </div>
      </section>

      <section aria-labelledby="rel-title" className="wrap py-24 lg:py-32">
        <h2 id="rel-title" className="stencil mb-12 text-[clamp(2.8rem,5.5vw,5rem)]">Related <em>materials</em></h2>
        <ul className="grid gap-8 sm:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug} className="reveal">
              <Link href={`/${r.slug}`} className="group block">
                <div className="img-zoom clip-reveal aspect-[4/3] overflow-hidden bg-oak-dark"><Visual art={r.hero} alt={r.title} /></div>
                <h3 className="mt-5 font-display text-[1.9rem] leading-tight">{r.title}</h3>
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
