"use client";

import { Check, Plus } from "lucide-react";
import { enquiryList, itemId, useEnquiryList } from "@/lib/enquiry-list";

export function AddToList({ name, category, qty, light = false, className = "" }: { name: string; category: string; qty?: string; light?: boolean; className?: string }) {
  const list = useEnquiryList();
  const id = itemId(category, name);
  const added = list.some((x) => x.id === id);
  const tone = light
    ? added ? "border-brass bg-brass text-ink" : "border-lime/40 text-lime hover:border-brass"
    : added ? "border-brass bg-brass text-ink" : "border-charcoal/25 hover:border-brass hover:text-brass";
  return (
    <button
      type="button"
      onClick={() => (added && !qty ? enquiryList.remove(id) : enquiryList.add({ id, name, category, qty }))}
      aria-pressed={added}
      className={`inline-flex min-h-10 items-center gap-1.5 whitespace-nowrap rounded-[2px] border px-3 text-[0.85rem] font-semibold transition-colors ${tone} ${className}`}
    >
      {added ? <Check className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> : <Plus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />}
      {added ? (qty ? "Updated in list" : "In enquiry list") : "Add to enquiry"}
      <span className="sr-only"> — {name}</span>
    </button>
  );
}
