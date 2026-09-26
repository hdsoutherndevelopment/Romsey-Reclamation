import Link from "next/link";
import { MapPin } from "lucide-react";
import { Visual } from "@/components/Visual";
import { VisitYard } from "@/components/sections/VisitYard";
import { ProjectsRail } from "@/components/sections/ProjectsRail";
import { featured, homeCategories, projects, getCategory } from "@/lib/materials";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-soot text-lime">
        <div className="hero-art absolute inset-0 -z-10">
          <Visual art={{ kind: "brick", seed: 2 }} alt="" priority />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,rgba(27,25,22,.94)_0%,rgba(27,25,22,.78)_42%,rgba(27,25,22,.25)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-soot/80 to-transparent" />

        <div className="wrap flex min-h-[min(88svh,52rem)] flex-col justify-end pb-14 pt-28 sm:pb-20">
          <h1 id="hero-title" className="stencil text-[clamp(3.6rem,11.5vw,10.5rem)]">
            <span className="hero-line"><span>Reclaimed materials.</span></span>
            <span className="hero-line"><span>Built to last.</span></span>
          </h1>
          <div className="hero-fade mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-lg text-lime/85 sm:text-xl">Architectural salvage, reclaimed building materials and seasoned timber from our yard in Hampshire.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/materials" className="btn btn-light">Explore Materials</Link>
                <a href="#visit" className="btn btn-ghost-light">Visit Our Yard</a>
              </div>
            </div>
            <p className="flex items-center gap-2 text-sm text-lime/75">
              <MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              Romsey • Hampshire
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section aria-labelledby="cat-title" className="wrap py-20 lg:py-28">
        <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="cat-title" className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] lg:col-span-7">Materials with a history.</h2>
          <p className="max-w-md text-lg text-charcoal/80 lg:col-span-5 lg:justify-self-end">
            Several million bricks, millions of tiles and slates and hundreds of thousands of sleepers have passed through the yard. Here’s where to start.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-12">
          {homeCategories.map((c, i) => {
            const cat = getCategory(c.slug);
            const layout = ["md:col-span-7", "md:col-span-5", "md:col-span-4", "md:col-span-4", "md:col-span-4", "md:col-span-12"][i];
            const aspect = ["aspect-[4/3] md:aspect-auto md:h-[34rem]", "aspect-[4/3] md:aspect-auto md:h-[34rem]", "aspect-[4/3]", "aspect-[4/3]", "aspect-[4/3]", "aspect-[4/3] md:aspect-[21/7]"][i];
            return (
              <li key={c.slug} className={layout}>
                <Link href={`/${c.slug}`} className="group block">
                  <div className={`img-zoom overflow-hidden bg-oak-dark ${aspect}`}>
                    <Visual art={c.art} alt={`${c.label} at Romsey Reclamation`} />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-rule pb-4">
                    <h3 className="stencil text-[clamp(1.6rem,2.6vw,2.2rem)]">{c.label}</h3>
                    <span className="link-u shrink-0 text-sm">View</span>
                  </div>
                  {cat && <p className="mt-3 max-w-md text-charcoal/75">{cat.short}</p>}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* BRAND STORY */}
      <section aria-labelledby="story-title" className="border-y border-rule bg-plaster-deep">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[40rem]">
            <Visual art={{ kind: "walling", seed: 3 }} alt="Reclaimed walling stone with weathered faces" />
          </div>
          <div className="flex items-center px-[clamp(1.25rem,6vw,6rem)] py-16 lg:py-24">
            <div className="max-w-xl">
              <h2 id="story-title" className="stencil text-[clamp(2.8rem,5.5vw,5rem)]">Reclaim.<br />Recycle.<br />Restore.</h2>
              <div className="prose-rr mt-8 text-lg">
                <p>Romsey Reclamation specialises in reclaimed and architectural materials — bricks, tiles, slates, timber, stone and salvage that still have decades of work left in them.</p>
                <p>Reusing them gives a building instant character, and every brick or beam that goes back into use is one less that needs to be made new. We supply homeowners, builders and trade customers across the commercial, industrial, agricultural and civil engineering sectors.</p>
              </div>
              <Link href="/about" className="link-u mt-8 inline-block font-semibold">Discover Our Story →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FROM THE YARD */}
      <section aria-labelledby="yard-title" className="wrap py-20 lg:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 id="yard-title" className="stencil text-[clamp(2.8rem,7vw,6rem)]">From the yard</h2>
          <p className="max-w-sm text-charcoal/75">Stock changes daily. Call ahead if you’re travelling for something specific.</p>
        </div>
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((f) => (
            <li key={f.name}>
              <Link href={f.href} className="group block h-full">
                <div className="img-zoom relative aspect-[4/5] overflow-hidden bg-oak-dark">
                  <Visual art={f.art} alt={f.name} />
                  <span className="absolute left-3 top-3 bg-lime/95 px-2.5 py-1 text-[0.78rem] font-semibold text-charcoal">{f.tag}</span>
                </div>
                <h3 className="mt-4 font-display text-[1.6rem] leading-tight">{f.name}</h3>
                <p className="mt-2 text-[0.97rem] text-charcoal/75">{f.description}</p>
                {f.price && <p className="mt-2 font-semibold">{f.price}</p>}
                <span className="link-u mt-3 inline-block text-[0.95rem] font-semibold">View Material →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* OAK CENTRE */}
      <section aria-labelledby="oak-title" className="bg-oak-dark text-lime">
        <div className="grid lg:grid-cols-12">
          <div className="flex flex-col justify-center px-[clamp(1.25rem,6vw,6rem)] py-20 lg:col-span-5 lg:py-28">
            <p className="mb-5 text-sm text-oak-light">The Oak Centre</p>
            <h2 id="oak-title" className="stencil text-[clamp(3.2rem,7vw,6.5rem)]">Seasoned oak</h2>
            <p className="mt-8 max-w-md text-lg text-lime/85">
              Our dedicated Oak Centre carries an ever-changing selection of seasoned oak beams, air-dried slabs, kiln-dried boards, oak flooring and specialist timbers.
            </p>
            <p className="mt-4 max-w-md text-lime/65">For restoration, feature fireplaces, construction or landscaping — we always recommend a visit to see the latest stock.</p>
            <div className="mt-10"><Link href="/oak" className="btn btn-light">Explore Oak & Timber</Link></div>
          </div>
          <div className="grid grid-cols-2 gap-1 lg:col-span-7">
            <div className="col-span-2 aspect-[16/10] lg:aspect-auto lg:h-[26rem]"><Visual art={{ kind: "beams", seed: 2 }} alt="End grain of seasoned oak beams stacked on stickers" /></div>
            <div className="aspect-square lg:aspect-auto lg:h-[18rem]"><Visual art={{ kind: "boards", seed: 1 }} alt="Oak floorboards" /></div>
            <div className="aspect-square lg:aspect-auto lg:h-[18rem]"><Visual art={{ kind: "fireplace", seed: 2 }} alt="Oak beam used as a fireplace lintel" /></div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section aria-labelledby="proj-title" className="bg-soot py-20 text-lime lg:py-28">
        <div className="wrap mb-4 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="proj-title" className="stencil text-[clamp(2.8rem,7vw,6rem)] lg:col-span-8">Built with character</h2>
          <p className="max-w-md text-lime/75 lg:col-span-4">What customers make with reclaimed materials — from garden rooms to full restorations.</p>
        </div>
        <ProjectsRail items={projects} />
        <div className="wrap mt-12"><Link href="/projects" className="btn btn-ghost-light">View Customer Projects</Link></div>
      </section>

      {/* WHY RECLAIMED */}
      <section aria-labelledby="reuse-title" className="wrap py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="reuse-title" className="stencil text-[clamp(2.8rem,6vw,5.5rem)]">The beauty of reuse</h2>
            <p className="mt-6 max-w-md text-lg text-charcoal/80">
              A reclaimed brick, tile or beam has already been made. Putting it back to work is the simplest kind of recycling there is.
            </p>
          </div>
          <dl className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
            {[
              ["Less made new", "Reusing sound bricks, tiles, timber and stone avoids the energy, clay, quarrying and felling needed to manufacture replacements."],
              ["Kept out of the skip", "Materials from demolition and renovation get a second life instead of going to landfill or being crushed for hardcore."],
              ["A true match", "Weathered bricks, handmade tiles and seasoned oak blend with older buildings in a way new products rarely do."],
              ["Proven durability", "Materials that have lasted a century on a roof or a railway have already shown what they can take."],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-charcoal pt-5">
                <dt className="font-display text-[1.7rem] leading-tight">{t}</dt>
                <dd className="mt-3 text-charcoal/80">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <VisitYard />
    </>
  );
}
