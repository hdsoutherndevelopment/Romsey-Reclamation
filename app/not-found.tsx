import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-28">
      <h1 className="stencil text-[clamp(3rem,9vw,7rem)]">Not in the yard</h1>
      <p className="mt-6 max-w-lg text-lg">That page doesn’t exist. Try browsing the materials, or call us on 01794 342 252 and we’ll check the stacks for you.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/materials" className="btn btn-solid">Browse materials</Link><Link href="/" className="btn btn-ghost">Back to home</Link></div>
    </section>
  );
}
