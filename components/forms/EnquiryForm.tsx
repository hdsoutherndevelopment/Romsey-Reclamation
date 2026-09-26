"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Camera, X } from "lucide-react";
import { categories } from "@/lib/materials";
import { site } from "@/lib/config";
import { enquiryList, useEnquiryList } from "@/lib/enquiry-list";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string; demo?: boolean };
type Photo = { file: File; url: string };

const MAX_PHOTOS = 4;

const topics = [
  ...categories.map((c) => ({ value: c.slug, label: c.menuTitle })),
  { value: "matching", label: "Brick or tile matching" },
  { value: "delivery", label: "Delivery" },
  { value: "selling", label: "Selling salvage to us" },
  { value: "other", label: "Something else" },
];

/* Phone photos are often 3–8MB. Downscale to ~1600px JPEG so four fit comfortably in one request. */
async function shrink(f: File): Promise<File> {
  if (f.size < 500_000 && /jpe?g|png|webp/.test(f.type)) return f;
  try {
    const bmp = await createImageBitmap(f);
    const k = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k);
    c.height = Math.round(bmp.height * k);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise<Blob | null>((r) => c.toBlob(r, "image/jpeg", 0.82));
    return blob ? new File([blob], f.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" }) : f;
  } catch {
    return f; // browser can't decode it (e.g. HEIC on Chrome) — the server will accept or reject it
  }
}

export function EnquiryForm({ defaultTopic = "", withList = true }: { defaultTopic?: string; withList?: boolean }) {
  const params = useSearchParams();
  const preset = params.get("material") ?? defaultTopic;
  const stored = useEnquiryList();
  const list = withList ? stored : [];
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [busyPhotos, setBusyPhotos] = useState(false);

  const removePhoto = (p: Photo) => { URL.revokeObjectURL(p.url); setPhotos((cur) => cur.filter((x) => x !== p)); };

  async function addPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []).slice(0, MAX_PHOTOS - photos.length);
    e.target.value = "";
    if (!picked.length) return;
    setBusyPhotos(true);
    const shrunk = await Promise.all(picked.map(shrink));
    setPhotos((cur) => [...cur, ...shrunk.map((file) => ({ file, url: URL.createObjectURL(file) }))].slice(0, MAX_PHOTOS));
    setBusyPhotos(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const errs: Record<string, string> = {};
    if (!v("name")) errs.name = "Enter your name.";
    if (!v("email") && !v("phone")) errs.email = "Add an email address or phone number so we can reply.";
    if (v("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) errs.email = "Enter a valid email address, like name@example.com.";
    if (v("phone") && !/^[+\d\s()-]{7,20}$/.test(v("phone"))) errs.phone = "Enter a valid phone number.";
    if (v("postcode") && !/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(v("postcode"))) errs.postcode = "Enter a valid UK postcode, or leave it blank.";
    if (v("message").length < 10 && !list.length) errs.message = "Tell us a little about what you need (at least 10 characters).";
    if (photos.reduce((n, p) => n + p.file.size, 0) > 4 * 1024 * 1024) errs.photos = "Those photos are too large together — remove one and try again.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }

    fd.set("page", window.location.pathname);
    fd.set("items", JSON.stringify(list.map((i) => ({ name: i.name, qty: i.qty ?? "" }))));
    photos.forEach((p) => fd.append("photos", p.file, p.file.name));

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "The enquiry couldn’t be sent.");
      setStatus({ state: "sent", demo: !!json.demo });
      form.reset();
      photos.forEach((p) => URL.revokeObjectURL(p.url));
      setPhotos([]);
      if (withList) enquiryList.clear();
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "The enquiry couldn’t be sent." });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" tabIndex={-1} ref={(el) => el?.focus()} className="scroll-mt-32 border border-moss/40 bg-moss/10 p-8 outline-none">
        <p className="font-display text-3xl">Enquiry sent.</p>
        <p className="mt-3 max-w-md">Thanks — the team will get back to you during opening hours{status.demo ? "" : ", and we’ve emailed you a copy if you gave an address"}. For anything urgent, call the yard on <a className="link-u font-semibold" href={site.phone.href}>{site.phone.display}</a>.</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="btn btn-ghost mt-6">Send another enquiry</button>
      </div>
    );
  }

  const field = "mt-2 block w-full rounded-[2px] border border-rule bg-lime px-4 py-3 text-base font-normal outline-none transition-colors focus:border-charcoal aria-[invalid=true]:border-brick";
  const label = "text-sm font-semibold";
  const err = (k: string) => errors[k] && <p id={`${k}-error`} className="mt-1.5 text-sm font-normal text-brick">{errors[k]}</p>;
  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="hidden" aria-hidden="true">
        <label>Leave this empty<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {list.length > 0 && (
        <fieldset className="border border-charcoal/80 bg-lime p-5 sm:col-span-2">
          <legend className="px-2 text-sm font-semibold">Your enquiry list ({list.length})</legend>
          <ul className="divide-y divide-rule">
            {list.map((i) => (
              <li key={i.id} className="flex flex-wrap items-center gap-3 py-3">
                <span className="min-w-0 flex-1 font-semibold">{i.name}</span>
                <label className="flex items-center gap-2 text-sm text-charcoal/70">
                  Qty
                  <input value={i.qty ?? ""} onChange={(e) => enquiryList.setQty(i.id, e.target.value)} placeholder="e.g. 20" className="w-28 rounded-[2px] border border-rule bg-plaster px-3 py-2 text-charcoal outline-none focus:border-charcoal" />
                </label>
                <button type="button" onClick={() => enquiryList.remove(i.id)} className="grid h-10 w-10 place-items-center text-charcoal/60 hover:text-brick" aria-label={`Remove ${i.name}`}><X className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
        </fieldset>
      )}

      <label className={label}>Name
        <input name="name" autoComplete="name" className={field} {...aria("name")} />
        {err("name")}
      </label>
      <label className={label}>Phone
        <input name="phone" type="tel" autoComplete="tel" className={field} {...aria("phone")} />
        {err("phone")}
      </label>
      <label className={label}>Email
        <input name="email" type="email" autoComplete="email" className={field} {...aria("email")} />
        {err("email")}
      </label>
      <label className={label}>Postcode <span className="font-normal text-charcoal/60">(for delivery quotes)</span>
        <input name="postcode" autoComplete="postal-code" className={`${field} uppercase`} {...aria("postcode")} />
        {err("postcode")}
      </label>
      <label className={`${label} sm:col-span-2`}>What’s it about?
        <select name="topic" defaultValue={topics.some((t) => t.value === preset) ? preset : ""} className={field}>
          <option value="">Choose a material or service</option>
          {topics.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>Your enquiry
        <textarea name="message" rows={5} className={field} placeholder="Quantities, sizes, colours, what you’re building — anything that helps." {...aria("message")} />
        {err("message")}
      </label>

      <div className="sm:col-span-2">
        <p className={label}>Photos <span className="font-normal text-charcoal/60">(optional — a brick or tile to match, or salvage you’re selling)</span></p>
        <div className="mt-2 flex flex-wrap gap-3">
          {photos.map((p, i) => (
            <div key={p.url} className="relative h-24 w-24 overflow-hidden border border-rule bg-plaster-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={`Attached photo ${i + 1}`} className="h-full w-full object-cover" />
              <button type="button" onClick={() => removePhoto(p)} className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-soot/85 text-lime" aria-label={`Remove photo ${i + 1}`}><X className="h-3.5 w-3.5" /></button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label className="grid h-24 w-24 cursor-pointer place-items-center border border-dashed border-charcoal/40 text-center text-xs text-charcoal/70 transition-colors hover:border-charcoal focus-within:border-charcoal">
              <span className="grid place-items-center gap-1"><Camera className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />{busyPhotos ? "Adding…" : "Add photo"}</span>
              <input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple onChange={addPhotos} className="sr-only" aria-label="Add photos" />
            </label>
          )}
        </div>
        {err("photos")}
      </div>

      <label className="flex items-center gap-3 text-[0.95rem] sm:col-span-2">
        <input type="checkbox" name="trade" className="h-5 w-5 accent-[var(--color-charcoal)]" />
        I’m a trade customer (builder, roofer, landscaper, contractor)
      </label>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={status.state === "sending" || busyPhotos} className="btn btn-solid disabled:opacity-60">
          {status.state === "sending" ? "Sending…" : list.length ? `Send enquiry (${list.length} item${list.length > 1 ? "s" : ""})` : "Send enquiry"}
        </button>
        <p className="text-sm text-charcoal/65">We only use your details to reply. <a href="/privacy" className="link-u">Privacy policy</a></p>
      </div>
      {status.state === "error" && <p role="alert" className="text-brick sm:col-span-2">{status.message} Please try again, or call {site.phone.display}.</p>}
    </form>
  );
}
