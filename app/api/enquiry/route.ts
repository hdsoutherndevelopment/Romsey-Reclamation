import { NextResponse } from "next/server";
import { site } from "@/lib/config";

// Validates enquiries server-side. Sends via Resend when RESEND_API_KEY and BUSINESS_EMAIL are set;
// otherwise returns success without sending (demo mode).

const hits = new Map<string, number[]>();
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return NextResponse.json({ error: "Too many enquiries in a short time." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "The enquiry couldn’t be read." }, { status: 400 }); }

  const str = (k: string, max: number) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, max) : "");
  if (str("company_website", 200)) return NextResponse.json({ ok: true }); // honeypot

  const d = { name: str("name", 120), email: str("email", 200), phone: str("phone", 40), topic: str("topic", 60), message: str("message", 4000), page: str("page", 200) };
  if (!d.name) return NextResponse.json({ error: "Enter your name." }, { status: 422 });
  if (!d.email && !d.phone) return NextResponse.json({ error: "Add an email address or phone number." }, { status: 422 });
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 422 });
  if (d.phone && !/^[+\d\s()-]{7,20}$/.test(d.phone)) return NextResponse.json({ error: "Enter a valid phone number." }, { status: 422 });
  if (d.message.length < 10) return NextResponse.json({ error: "Tell us a little more about what you need." }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.BUSINESS_EMAIL;
  if (!key || !to) return NextResponse.json({ ok: true, demo: true });

  const html = `<h2>New website enquiry — ${esc(site.name)}</h2>
<p><b>Name:</b> ${esc(d.name)}<br/><b>Email:</b> ${esc(d.email || "—")}<br/><b>Phone:</b> ${esc(d.phone || "—")}<br/><b>Topic:</b> ${esc(d.topic || "—")}<br/><b>Page:</b> ${esc(d.page || "—")}<br/><b>Received:</b> ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}</p>
<p style="white-space:pre-wrap">${esc(d.message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Romsey Reclamation <onboarding@resend.dev>",
      to: [to],
      reply_to: d.email || undefined,
      subject: `Website enquiry: ${d.topic || "general"} — ${d.name}`,
      html,
    }),
  });
  if (!res.ok) return NextResponse.json({ error: "The enquiry couldn’t be sent right now." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
