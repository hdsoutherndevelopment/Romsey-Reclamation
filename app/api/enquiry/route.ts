import { NextResponse } from "next/server";
import { configured, emailCustomer, emailYard, saveLead, type Lead, type Photo } from "@/lib/leads";

// Validates enquiries server-side, stores them in Supabase and emails them via Resend (each when configured).
// With neither configured it validates and returns { demo: true } without sending.

export const runtime = "nodejs";

// ponytail: in-memory rate limit is per serverless instance — move to Upstash/Supabase if spam gets through.
const hits = new Map<string, number[]>();
const MAX_PHOTOS = 4;
const MAX_PHOTO_BYTES = 4 * 1024 * 1024; // Vercel caps request bodies at 4.5MB; the browser resizes photos well below this

const fail = (error: string, status = 422) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return fail("Too many enquiries in a short time.", 429);
  hits.set(ip, [...recent, now]);

  let form: FormData;
  try { form = await req.formData(); } catch { return fail("The enquiry couldn’t be read.", 400); }

  const str = (k: string, max: number) => { const v = form.get(k); return typeof v === "string" ? v.trim().slice(0, max) : ""; };
  if (str("company_website", 200)) return NextResponse.json({ ok: true }); // honeypot

  let items: Lead["items"] = [];
  try {
    const raw = JSON.parse(str("items", 8000) || "[]");
    if (Array.isArray(raw)) items = raw.slice(0, 40).map((i) => ({ name: String(i?.name ?? "").slice(0, 120), qty: String(i?.qty ?? "").slice(0, 60) })).filter((i) => i.name);
  } catch { /* ignore a malformed list rather than lose the enquiry */ }

  const lead: Lead = {
    name: str("name", 120), email: str("email", 200), phone: str("phone", 40), postcode: str("postcode", 10).toUpperCase(),
    trade: str("trade", 5) === "on", topic: str("topic", 60), message: str("message", 4000), page: str("page", 200), items,
  };
  if (!lead.name) return fail("Enter your name.");
  if (!lead.email && !lead.phone) return fail("Add an email address or phone number.");
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return fail("Enter a valid email address.");
  if (lead.phone && !/^[+\d\s()-]{7,20}$/.test(lead.phone)) return fail("Enter a valid phone number.");
  if (lead.postcode && !/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/.test(lead.postcode)) return fail("Enter a valid UK postcode, or leave it blank.");
  if (lead.message.length < 10 && !lead.items.length) return fail("Tell us a little more about what you need.");

  const files = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_PHOTOS) return fail(`Attach up to ${MAX_PHOTOS} photos.`);
  if (files.some((f) => !/^image\/(jpeg|png|webp|heic|heif)$/.test(f.type))) return fail("Photos must be JPG, PNG, WebP or HEIC.");
  if (files.reduce((n, f) => n + f.size, 0) > MAX_PHOTO_BYTES) return fail("Photos are too large — try fewer, or smaller, images.");
  const photos: Photo[] = await Promise.all(files.map(async (f) => ({ name: f.name || "photo.jpg", type: f.type, data: Buffer.from(await f.arrayBuffer()) })));

  const on = configured();
  if (!on.db && !on.email) return NextResponse.json({ ok: true, demo: true });

  const [saved, emailed] = await Promise.all([on.db ? saveLead(lead, photos) : false, on.email ? emailYard(lead, photos) : false]);
  if (!saved && !emailed) return fail("The enquiry couldn’t be sent right now.", 502);
  await emailCustomer(lead);
  return NextResponse.json({ ok: true });
}
