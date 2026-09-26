import Link from "next/link";
import { OpenStatus } from "@/components/OpenStatus";
import { site } from "@/lib/config";

export function AnnouncementBar() {
  return (
    <div className="bg-soot text-lime/85">
      <div className="wrap flex min-h-9 items-center justify-between gap-4 py-1.5 text-[0.8rem]">
        <p className="flex min-w-0 items-center gap-4">
          <OpenStatus className="shrink-0 text-lime" />
          <span className="hidden truncate md:inline">Architectural Salvage • Reclaimed Materials • Awbridge, Romsey</span>
        </p>
        <p className="flex shrink-0 items-center gap-5">
          <a href={site.phone.href} className="link-u hidden sm:inline">{site.phone.display}</a>
          <Link href="/contact#visit" className="link-u text-lime">Plan a visit</Link>
        </p>
      </div>
    </div>
  );
}
