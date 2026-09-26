import { Breadcrumb } from "./Breadcrumb";

/* Inner-page masthead. Multi-word titles get their last word set in the italic serif. */
export function PageHead({ title, intro, crumb }: { title: string; intro?: string; crumb: string }) {
  const words = title.split(" ");
  const last = words.length > 1 ? words.pop() : null;
  return (
    <section className="guides">
      <div className="wrap pb-16 pt-10 lg:pb-24 lg:pt-14">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: crumb }]} />
        <h1 className="stencil mt-14 text-[clamp(3.6rem,11vw,10.5rem)] lg:mt-20">
          <span className="hero-line"><span>{words.join(" ")}{last && <> <em>{last}</em></>}</span></span>
        </h1>
        {intro && (
          <div className="hero-fade mt-10 grid gap-4 border-t border-charcoal pt-6 lg:grid-cols-12">
            <p className="eyebrow text-charcoal/50 lg:col-span-4">{crumb} — Romsey Reclamation</p>
            <p className="max-w-2xl text-xl text-charcoal/80 lg:col-span-7 lg:col-start-6">{intro}</p>
          </div>
        )}
      </div>
    </section>
  );
}
