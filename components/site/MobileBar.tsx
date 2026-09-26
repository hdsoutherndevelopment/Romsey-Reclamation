"use client";

import Link from "next/link";
import { Phone, Navigation, ClipboardList } from "lucide-react";
import { site } from "@/lib/config";
import { useEnquiryList } from "@/lib/enquiry-list";

export function MobileBar() {
  const n = useEnquiryList().length;
  const cell = "flex h-14 items-center justify-center gap-2 text-[0.95rem] font-semibold";
  return (
    <div className={`fixed inset-x-0 bottom-0 z-30 grid border-t border-lime/10 bg-soot text-lime sm:hidden ${n ? "grid-cols-3" : "grid-cols-2"}`} style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <a href={site.phone.href} className={cell}><Phone className="h-4 w-4" strokeWidth={1.75} />{n ? "Call" : "Call the yard"}</a>
      <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className={`${cell} border-l border-lime/15`}><Navigation className="h-4 w-4" strokeWidth={1.75} />Directions</a>
      {n > 0 && <Link href="/contact#enquire" className={`${cell} border-l border-lime/15 bg-brick`}><ClipboardList className="h-4 w-4" strokeWidth={1.75} />List ({n})</Link>}
    </div>
  );
}
