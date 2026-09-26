import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-soot text-lime/85">
      <div className="wrap flex min-h-9 items-center justify-between gap-4 py-1.5 text-[0.8rem]">
        <p className="truncate"><span className="hidden md:inline">Architectural Salvage • Reclaimed Materials • </span>Romsey, Hampshire</p>
        <Link href="/contact#visit" className="link-u shrink-0 text-lime">Plan a visit to the yard</Link>
      </div>
    </div>
  );
}
