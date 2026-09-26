"use client";

import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { useEnquiryList } from "@/lib/enquiry-list";

export function ListBadge({ className = "" }: { className?: string }) {
  const n = useEnquiryList().length;
  return (
    <Link href="/contact#enquire" className={`relative grid h-11 w-11 place-items-center ${className}`} aria-label={`Enquiry list, ${n} item${n === 1 ? "" : "s"}`}>
      <ClipboardList className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      {n > 0 && <span key={n} className="badge-pop absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brick px-1 text-[0.7rem] font-bold text-lime">{n}</span>}
    </Link>
  );
}
