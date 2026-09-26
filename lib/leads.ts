import { site } from "./config";

// Server-only lead handling: Supabase (REST, no SDK) for storage, Resend (REST) for email. Each is optional via env vars.

export type Lead = {
  name: string; email: string; phone: string; postcode: string; trade: boolean;
  topic: string; message: string; page: string;
  items: { name: string; qty: string }[];
};
export type Photo = { name: string; type: string; data: Buffer };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const supa = () => {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
};
const resendKey = () => process.env.RESEND_API_KEY || null;

export const configured = () => ({ db: !!supa(), email: !!(resendKey() && process.env.BUSINESS_EMAIL) });

/** Uploads photos to the private `enquiry-photos` bucket and inserts the lead. Returns false on any failure. */
export async function saveLead(lead: Lead, photos: Photo[]): Promise<boolean> {
  const s = supa();
  if (!s) return false;
  const headers = { apikey: s.key, Authorization: `Bearer ${s.key}` };
  try {
    const month = new Date().toISOString().slice(0, 7);
    const paths: string[] = [];
    for (const p of photos) {
      const path = `${month}/${crypto.randomUUID()}-${p.name.replace(/[^\w.-]+/g, "_").slice(-60)}`;
      const up = await fetch(`${s.url}/storage/v1/object/enquiry-photos/${path}`, { method: "POST", headers: { ...headers, "Content-Type": p.type }, body: new Uint8Array(p.data) });
      if (up.ok) paths.push(path);
    }
    const res = await fetch(`${s.url}/rest/v1/enquiries`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({
        name: lead.name, email: lead.email || null, phone: lead.phone || null, postcode: lead.postcode || null,
        trade: lead.trade, topic: lead.topic || null, message: lead.message, items: lead.items, photos: paths, source_page: lead.page || null,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function send(body: Record<string, unknown>) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey()}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.RESEND_FROM || `${site.name} <onboarding@resend.dev>`, ...body }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

const itemsTable = (items: Lead["items"]) =>
  items.length
    ? `<table cellpadding="6" style="border-collapse:collapse;margin:12px 0">${items.map((i) => `<tr><td style="border-bottom:1px solid #ddd">${esc(i.name)}</td><td style="border-bottom:1px solid #ddd"><b>${esc(i.qty || "—")}</b></td></tr>`).join("")}</table>`
    : "";

/** Notifies the yard (photos attached). Returns false if Resend isn't configured or the send fails. */
export async function emailYard(lead: Lead, photos: Photo[]): Promise<boolean> {
  const to = process.env.BUSINESS_EMAIL;
  if (!resendKey() || !to) return false;
  const row = (k: string, v: string) => `<b>${k}:</b> ${esc(v || "—")}<br/>`;
  const html = `<h2 style="font-family:Arial">New website enquiry — ${esc(site.name)}</h2>
<p style="font-family:Arial">${row("Name", lead.name)}${row("Email", lead.email)}${row("Phone", lead.phone)}${row("Postcode", lead.postcode)}${row("Customer", lead.trade ? "Trade" : "Private")}${row("Topic", lead.topic)}${row("Page", lead.page)}${row("Received", new Date().toLocaleString("en-GB", { timeZone: "Europe/London" }))}</p>
${lead.items.length ? `<h3 style="font-family:Arial">Enquiry list</h3>${itemsTable(lead.items)}` : ""}
<p style="font-family:Arial;white-space:pre-wrap">${esc(lead.message)}</p>
${photos.length ? `<p style="font-family:Arial;color:#666">${photos.length} photo${photos.length > 1 ? "s" : ""} attached.</p>` : ""}`;
  return send({
    to: [to],
    reply_to: lead.email || undefined,
    subject: `${lead.trade ? "[Trade] " : ""}Website enquiry: ${lead.topic || "general"} — ${lead.name}`,
    html,
    attachments: photos.map((p) => ({ filename: p.name, content: p.data.toString("base64") })),
  });
}

/** Short receipt to the customer so they know it arrived. Best-effort. */
export async function emailCustomer(lead: Lead): Promise<boolean> {
  if (!resendKey() || !lead.email) return false;
  const html = `<div style="font-family:Arial;max-width:560px">
<p>Hi ${esc(lead.name.split(" ")[0])},</p>
<p>Thanks for getting in touch with ${esc(site.name)}. We’ve received your enquiry and the team will reply during opening hours (Mon–Fri 8am–4pm, Sat 8:15am–12pm).</p>
${itemsTable(lead.items)}
<p style="white-space:pre-wrap;color:#555;border-left:3px solid #ddd;padding-left:12px">${esc(lead.message)}</p>
<p>Stock changes daily, so if it’s urgent please call the yard on ${esc(site.phone.display)}.</p>
<p>${esc(site.name)}<br/>${esc(site.address.lines.join(", "))} ${esc(site.address.postcode)}</p></div>`;
  return send({ to: [lead.email], reply_to: process.env.BUSINESS_EMAIL || site.email, subject: `We’ve got your enquiry — ${site.name}`, html });
}
