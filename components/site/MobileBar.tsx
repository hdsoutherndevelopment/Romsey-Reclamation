import { Phone, Navigation } from "lucide-react";
import { site } from "@/lib/config";

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-lime/10 bg-soot text-lime sm:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <a href={site.phone.href} className="flex h-14 items-center justify-center gap-2 text-[0.95rem] font-semibold"><Phone className="h-4 w-4" strokeWidth={1.75} />Call the yard</a>
      <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="flex h-14 items-center justify-center gap-2 border-l border-lime/15 text-[0.95rem] font-semibold"><Navigation className="h-4 w-4" strokeWidth={1.75} />Directions</a>
    </div>
  );
}
