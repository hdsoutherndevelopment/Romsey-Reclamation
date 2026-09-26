"use client";

import { useSyncExternalStore } from "react";

// A per-visitor "enquiry list" (like a quote basket). Lives in localStorage and is sent with the enquiry form.

export type ListItem = { id: string; name: string; category?: string; qty?: string };

const KEY = "rr-enquiry-list";
const EMPTY: ListItem[] = [];
const subs = new Set<() => void>();
let items: ListItem[] | null = null;

function read(): ListItem[] {
  if (items) return items;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    items = Array.isArray(parsed) ? parsed.filter((x) => x && typeof x.id === "string" && typeof x.name === "string") : [];
  } catch {
    items = [];
  }
  return items!;
}

function write(next: ListItem[]) {
  items = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* private mode — list still works for this visit */ }
  subs.forEach((f) => f());
}

export const enquiryList = {
  add(item: ListItem) {
    const cur = read();
    write(cur.some((x) => x.id === item.id) ? cur.map((x) => (x.id === item.id ? { ...x, qty: item.qty ?? x.qty } : x)) : [...cur, item]);
  },
  remove: (id: string) => write(read().filter((x) => x.id !== id)),
  setQty: (id: string, qty: string) => write(read().map((x) => (x.id === id ? { ...x, qty } : x))),
  clear: () => write([]),
};

function subscribe(cb: () => void) {
  subs.add(cb);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) { items = null; cb(); } };
  window.addEventListener("storage", onStorage);
  return () => { subs.delete(cb); window.removeEventListener("storage", onStorage); };
}

export function useEnquiryList() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export const itemId = (category: string, name: string) => `${category}:${name}`.toLowerCase().replace(/[^a-z0-9:]+/g, "-");
