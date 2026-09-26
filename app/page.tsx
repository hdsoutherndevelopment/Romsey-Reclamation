import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Phone, ClipboardList, Warehouse, Truck } from "lucide-react";
import { Visual } from "@/components/Visual";
import { VisitYard } from "@/components/sections/VisitYard";
import { ProjectsRail } from "@/components/sections/ProjectsRail";
import { CategoryIndex } from "@/components/sections/CategoryIndex";
import { Faq } from "@/components/sections/Faq";
import { OpenStatus } from "@/components/OpenStatus";
import { Calculator } from "@/components/Calculator";
import { AddToList } from "@/components/list/AddToList";
import { SectionHead, Stamp, Scrub } from "@/components/ui";
import { categories, featured, projects, inventory } from "@/lib/materials";
import { site } from "@/lib/config";

// Figures are the yard’s own published claims (see About). CONFIRM before launch.
const stats = [
  ["Almost 50", "years reclaiming in Hampshire"],
  ["Millions", "of bricks, tiles and slates sold"],
  ["≈1,000", "different products in the yard"],
  ["6 days", "a week, Monday to Saturday"],
];

const steps = [
  { icon: ClipboardList, title: "Build your list", body: "Browse the materials, use the calculators, and add what you need to your enquiry list." },
  { icon: Warehouse, title: "Visit or enquire", body: "Walk the stacks at Awbridge, or send us your list with photos — we’ll check what’s in." },
  { icon: Truck, title: "Collect or delivery", body: "Load up at the yard, or have it delivered for orders of sufficient quantity." },
];

const reuse = [
  ["Less made new", "Reusing sound bricks, tiles, timber and stone avoids the energy, clay, quarrying and felling needed to manufacture replacements."],
  ["Kept out of the skip", "Materials from demolition and renovation get a second life instead of going to landfill or being crushed for hardcore."],
  ["A true match", "Weathered bricks, handmade tiles and seasoned oak blend with older buildings in a way new products rarely do."],
  ["Proven durability", "Materials that have lasted a century on a roof or a railway have already shown what they can take."],
];

export default function Home() {
  return (
    <>
      {/* HERO — sits under the transparent header */}
      <section aria-labelledby="hero-title" className="relative isolate -mt-[4.5rem] overflow-hidden bg-soot text-lime">
        <div className="hero-art absolute inset-0 -z-10">
          <Visual art={{ kind: "brick", seed: 2 }} alt="" priority />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(23,21,18,.95)_0%,rgba(23,21,18,.8)_45%,rgba(23,21,18,.3)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-soot to-transparent" />

        <div className="wrap flex min-h-[100svh] flex-col justify-end pb-8 pt-36">
          <p className="hero-fade eyebrow mb-8 flex items-center gap-3 text-lime/70">
            <span className="text-oak-light">(RR)</span><span className="h-px w-10 bg-lime/30" aria-hidden="true" />Architectural salvage · Awbridge, Hampshire
          </p>
          <h1 id="hero-title" className="stencil text-[clamp(4rem,12.5vw,12.5rem)]">
            <span className="hero-line"><span>Reclaimed</span></span>
            <span className="hero-line"><span>materials,</span></span>
            <span className="hero-line"><span><em className="text-oak-light">built to last.</em></span></span>
          </h1>

          <div className="hero-fade mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-lg text-lime/80 sm:text-xl">Bricks, tiles, sleepers, seasoned oak, stone and salvage with decades of work left in them — from one of the south’s great reclamation yards.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/materials" className="btn btn-light">Explore materials <ArrowRight className="h-4 w-4" strokeWidth={1.75} /></Link>
                <a href={site.phone.href} className="btn btn-ghost-light"><Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />{site.phone.display}</a>
              </div>
            </div>
            <Stamp className="relative hidden w-36 text-lime/80 lg:grid xl:w-44" />
          </div>

          <dl className="hero-fade eyebrow mt-14 grid gap-y-4 border-t border-lime/15 pt-5 text-lime/60 md:grid-cols-4">
            <div><dt className="sr-only">Status</dt><dd className="text-lime"><OpenStatus /></dd></div>
            <div className="hidden md:block"><dt className="sr-only">Location</dt><dd>51.00° N, 1.54° W</dd></div>
            <div className="hidden md:block"><dt className="sr-only">Hours</dt><dd>Mon–Fri 8–4 · Sat 8:15–12</dd></div>
            <div className="hidden text-right md:block"><dt className="sr-only">Scroll</dt><dd><a href="#yard" className="inline-flex items-center gap-2 hover:text-lime">Scroll <ArrowDown className="h-3.5 w-3.5 animate-bounce" /></a></dd></div>
          </dl>
        </div>
      </section>

      {/* MARQUEE */}
      <div aria-hidden="true" className="overflow-hidden border-b border-lime/10 bg-soot py-5 text-lime">
        <div className="marquee">
          {[0, 1].map((k) => (
            <p key={k} className="flex shrink-0 items-center">
              {inventory.map((i, n) => (
                <span key={i.name} className="flex items-center whitespace-nowrap">
                  <span className={`px-6 ${n % 3 === 1 ? "font-display text-[1.9rem] italic text-oak-light" : "stencil text-[1.6rem]"}`}>{i.name}</span>
                  <span className="text-brick">✦</span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      {/* MANIFESTO + STATS */}
      <section id="yard" aria-labelledby="yard-title" className="guides scroll-mt-20 py-24 lg:py-36">
        <div className="wrap">
          <p className="eyebrow mb-10 flex items-center gap-3 text-charcoal/60"><span className="text-brick">(01)</span><span className="h-px w-10 bg-charcoal/30" aria-hidden="true" /><span id="yard-title">The yard</span></p>
          <Scrub className="max-w-6xl font-display text-[clamp(2.1rem,4.6vw,4.6rem)] leading-[1.06]"
            text="For almost fifty years we’ve rescued bricks, beams, tiles and stone that still have decades of work left in them — so your next project looks like it’s always been there." />
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link href="/about" className="btn btn-ghost">Our story <ArrowRight className="h-4 w-4" strokeWidth={1.75} /></Link>
            <p className="max-w-sm text-charcoal/65">Supplying homeowners, builders and trade across commercial, agricultural and civil engineering.</p>
          </div>

          <dl className="mt-24 grid grid-cols-2 border-t border-charcoal lg:grid-cols-4">
            {stats.map(([n, l], i) => (
              <div key={l} className={`reveal flex flex-col pt-6 pb-2 ${i % 2 ? "pl-5" : "pr-5"} ${i > 1 ? "mt-8 lg:mt-0" : ""} ${i ? "lg:border-l lg:border-rule lg:pl-6" : ""}`}>
                <dt className="eyebrow order-2 mt-3 text-charcoal/60">{l}</dt>
                <dd className="order-1 font-display text-[clamp(2.8rem,5.5vw,5.2rem)] leading-none">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* WIDE IMAGE */}
      <figure className="wrap">
        <div className="clip-reveal parallax relative aspect-[4/3] overflow-hidden bg-oak-dark md:aspect-[21/8]">
          <Visual art={{ kind: "walling", seed: 3 }} alt="Reclaimed walling stone with weathered faces" />
        </div>
        <figcaption className="eyebrow mt-4 flex justify-between text-charcoal/55"><span>Fig. 01 — Reclaimed walling stone</span><span>Awbridge yard</span></figcaption>
      </figure>

      {/* MATERIALS INDEX */}
      <section aria-labelledby="cat-title" className="wrap py-24 lg:py-36">
        <SectionHead index="02" label="Materials" id="cat-title" title={<>Materials <em>with a history</em></>}
          intro={<>Several million bricks, millions of tiles and slates and hundreds of thousands of sleepers have passed through the yard. <Link href="/materials" className="link-u font-semibold text-charcoal">Search all stock →</Link></>} />
        <CategoryIndex rows={categories.map((c) => ({ slug: c.slug, title: c.title, short: c.short, hero: c.hero }))} />
      </section>

      {/* FROM THE YARD */}
      <section aria-labelledby="featured-title" className="border-t border-rule bg-plaster-deep py-24 lg:py-36">
        <div className="wrap">
          <SectionHead index="03" label="In stock now" id="featured-title" title={<>From the <em>yard</em></>} intro="Stock changes daily. Add pieces to your enquiry list and we’ll check what’s in before you travel." />
          <ul className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((f, i) => (
              <li key={f.name} className={`reveal flex flex-col ${i % 4 === 1 || i % 4 === 3 ? "lg:mt-16" : ""}`}>
                <Link href={f.href} className="group block flex-1">
                  <div className="img-zoom clip-reveal relative aspect-[4/5] overflow-hidden bg-oak-dark">
                    <Visual art={f.art} alt={f.name} />
                    <span className="eyebrow absolute left-3 top-3 bg-lime/95 px-2 py-1 text-charcoal">{f.tag}</span>
                  </div>
                  <p className="eyebrow mt-5 text-charcoal/45">No. {String(i + 1).padStart(3, "0")}</p>
                  <h3 className="mt-1 font-display text-[1.85rem] leading-tight">{f.name}</h3>
                  <p className="mt-2 text-[0.97rem] text-charcoal/70">{f.description}</p>
                </Link>
                <AddToList name={f.name} category={f.href.slice(1)} className="mt-5 w-fit" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OAK CENTRE */}
      <section aria-labelledby="oak-title" className="guides guides-light bg-oak-dark text-lime">
        <div className="grid lg:grid-cols-12">
          <div className="flex flex-col justify-center px-[clamp(1.25rem,6vw,6rem)] py-24 lg:col-span-5 lg:py-36">
            <p className="eyebrow mb-8 flex items-center gap-3 text-lime/60"><span className="text-oak-light">(04)</span><span className="h-px w-10 bg-lime/30" aria-hidden="true" />The Oak Centre</p>
            <h2 id="oak-title" className="stencil text-[clamp(3.4rem,7.5vw,7rem)]">Seasoned <em className="text-oak-light">oak</em></h2>
            <p className="mt-8 max-w-md text-lg text-lime/80">An ever-changing selection of seasoned beams, air-dried slabs, kiln-dried boards, oak flooring and specialist timbers.</p>
            <p className="mt-4 max-w-md text-lime/60">No two beams are the same — we always recommend a visit to see the latest stock.</p>
            <div className="mt-10"><Link href="/oak" className="btn btn-light">Explore oak & timber <ArrowRight className="h-4 w-4" strokeWidth={1.75} /></Link></div>
          </div>
          <div className="grid grid-cols-2 gap-1 lg:col-span-7">
            <div className="parallax col-span-2 aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-[30rem]"><Visual art={{ kind: "beams", seed: 2 }} alt="End grain of seasoned oak beams stacked on stickers" /></div>
            <div className="clip-reveal aspect-square overflow-hidden lg:aspect-auto lg:h-[20rem]"><Visual art={{ kind: "boards", seed: 1 }} alt="Oak floorboards" /></div>
            <div className="clip-reveal aspect-square overflow-hidden lg:aspect-auto lg:h-[20rem]"><Visual art={{ kind: "fireplace", seed: 2 }} alt="Oak beam used as a fireplace lintel" /></div>
          </div>
        </div>
      </section>

      {/* PROJECTS — pinned horizontal scroll on desktop */}
      <section aria-labelledby="proj-title" className="bg-soot text-lime">
        <ProjectsRail
          items={projects}
          heading={<SectionHead light index="05" label="Projects" id="proj-title" className="!mb-10" title={<>Built with <em className="text-oak-light">character</em></>} intro="What customers make with reclaimed materials — from a single raised bed to a full restoration." />}
          cta={
            <Link href="/projects" className="group flex aspect-[4/5] w-full flex-col justify-between border border-lime/20 p-6 transition-colors hover:border-lime hover:bg-lime hover:text-charcoal">
              <span className="eyebrow">All projects</span>
              <span className="stencil text-[2.6rem]">See what people <em>build</em></span>
              <ArrowUpRight className="h-8 w-8 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.25} />
            </Link>
          }
        />
      </section>

      {/* CALCULATOR */}
      <section aria-labelledby="calc-title" className="guides border-b border-rule py-24 lg:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6 flex items-center gap-3 text-charcoal/60"><span className="text-brick">(06)</span><span className="h-px w-10 bg-charcoal/30" aria-hidden="true" />Tools</p>
            <h2 id="calc-title" className="stencil text-[clamp(3rem,6.5vw,6rem)]">How much do I <em>need?</em></h2>
            <p className="mt-6 max-w-md text-lg text-charcoal/75">Sleepers for a raised bed, bricks for a wall, tiles for a roof or flagstones for a patio — estimate it, then add it straight to your enquiry.</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {["Bricks for a wall", "Plain roof tiles", "Flagstones for a patio"].map((t) => (
                <li key={t}><Link href="/calculators" className="inline-flex items-center gap-2 rounded-full border border-charcoal/25 bg-lime px-4 py-2 text-[0.92rem] transition-colors hover:border-charcoal hover:bg-charcoal hover:text-lime">{t}<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link></li>
              ))}
            </ul>
          </div>
          <div className="reveal lg:col-span-6 lg:col-start-7"><Calculator kind="sleepers" /></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section aria-labelledby="how-title" className="wrap py-24 lg:py-36">
        <SectionHead index="07" label="Process" id="how-title" title={<>How it <em>works</em></>} />
        <ol className="grid gap-px bg-rule md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="reveal group bg-plaster p-8 transition-colors duration-500 hover:bg-charcoal hover:text-lime lg:p-10">
              <div className="flex items-start justify-between">
                <span className="font-display text-[5rem] leading-none text-charcoal/15 transition-colors group-hover:text-oak-light">0{i + 1}</span>
                <s.icon className="h-7 w-7 text-oak transition-colors group-hover:text-oak-light" strokeWidth={1.4} aria-hidden="true" />
              </div>
              <h3 className="mt-10 stencil text-[2.2rem]">{s.title}</h3>
              <p className="mt-3 max-w-sm opacity-75">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* WHY RECLAIMED */}
      <section aria-labelledby="reuse-title" className="border-t border-rule bg-plaster-deep py-24 lg:py-36">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6 flex items-center gap-3 text-charcoal/60"><span className="text-brick">(08)</span><span className="h-px w-10 bg-charcoal/30" aria-hidden="true" />Why reclaimed</p>
            <h2 id="reuse-title" className="stencil text-[clamp(3rem,6.5vw,6rem)]">The beauty of <em>reuse</em></h2>
            <p className="mt-6 max-w-md text-lg text-charcoal/75">A reclaimed brick, tile or beam has already been made. Putting it back to work is the simplest kind of recycling there is.</p>
          </div>
          <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7">
            {reuse.map(([t, d], i) => (
              <div key={t} className="reveal border-t border-charcoal pt-5">
                <p className="eyebrow text-charcoal/45">0{i + 1}</p>
                <dt className="mt-3 font-display text-[1.9rem] leading-tight">{t}</dt>
                <dd className="mt-3 text-charcoal/75">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* SELL */}
      <section aria-labelledby="sell-title" className="relative isolate overflow-hidden bg-soot text-lime">
        <div className="parallax absolute inset-0 -z-10 opacity-40"><Visual art={{ kind: "beams", seed: 5 }} alt="" /></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-soot via-soot/85 to-soot/30" />
        <div className="wrap flex flex-col gap-10 py-28 md:flex-row md:items-end md:justify-between lg:py-40">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6 flex items-center gap-3 text-lime/60"><span className="text-oak-light">(09)</span><span className="h-px w-10 bg-lime/30" aria-hidden="true" />Clearing a site or a building?</p>
            <h2 id="sell-title" className="stencil text-[clamp(3.4rem,9vw,8.5rem)]">We buy <em className="text-oak-light">salvage</em></h2>
            <p className="mt-6 max-w-lg text-lg text-lime/75">Bricks, tiles, slates, oak beams, flagstones, fireplaces and more. Send a few photos and we’ll tell you if we’re interested.</p>
          </div>
          <Link href="/sell" className="btn btn-light shrink-0">Sell to us <ArrowRight className="h-4 w-4" strokeWidth={1.75} /></Link>
        </div>
      </section>

      <Faq />

      <VisitYard />
    </>
  );
}
