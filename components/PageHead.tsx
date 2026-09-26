import { Breadcrumb } from "./Breadcrumb";

export function PageHead({ title, intro, crumb }: { title: string; intro?: string; crumb: string }) {
  return (
    <section className="wrap pb-12 pt-10 lg:pb-16 lg:pt-14">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: crumb }]} />
      <h1 className="stencil mt-8 text-[clamp(3.2rem,10vw,9rem)]">{title}</h1>
      {intro && <p className="mt-6 max-w-2xl text-xl text-charcoal/80">{intro}</p>}
    </section>
  );
}
