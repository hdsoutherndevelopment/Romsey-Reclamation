"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/materials";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

const topics = [
  ...categories.map((c) => ({ value: c.slug, label: c.menuTitle })),
  { value: "matching", label: "Brick or tile matching" },
  { value: "delivery", label: "Delivery" },
  { value: "selling", label: "Selling salvage to us" },
  { value: "other", label: "Something else" },
];

export function EnquiryForm() {
  const params = useSearchParams();
  const preset = params.get("material") ?? "";
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Enter your name.";
    if (!data.email?.trim() && !data.phone?.trim()) errs.email = "Add an email address or phone number so we can reply.";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Enter a valid email address, like name@example.com.";
    if (!data.message || data.message.trim().length < 10) errs.message = "Tell us a little about what you need (at least 10 characters).";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, page: window.location.pathname }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "The enquiry couldn’t be sent.");
      setStatus({ state: "sent" });
      form.reset();
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "The enquiry couldn’t be sent." });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="border border-moss/40 bg-moss/10 p-8">
        <p className="font-display text-3xl">Enquiry sent.</p>
        <p className="mt-3 max-w-md">Thanks — the team will get back to you during opening hours. For anything urgent, call the yard on 01794 342 252.</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="btn btn-ghost mt-6">Send another enquiry</button>
      </div>
    );
  }

  const field = "mt-2 block w-full rounded-[2px] border border-rule bg-lime px-4 py-3 text-base outline-none transition-colors focus:border-charcoal";
  const label = "text-sm font-semibold";
  const err = (k: string) => errors[k] && <p id={`${k}-error`} className="mt-1.5 text-sm text-brick">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="hidden" aria-hidden="true">
        <label>Leave this empty<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className={label}>Name
        <input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        {err("name")}
      </label>
      <label className={label}>Phone
        <input name="phone" type="tel" autoComplete="tel" className={field} />
      </label>
      <label className={`${label} sm:col-span-2`}>Email
        <input name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
        {err("email")}
      </label>
      <label className={`${label} sm:col-span-2`}>What’s it about?
        <select name="topic" defaultValue={topics.some((t) => t.value === preset) ? preset : ""} className={field}>
          <option value="">Choose a material or service</option>
          {topics.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>Your enquiry
        <textarea name="message" rows={5} className={field} placeholder="Quantities, sizes, colours, delivery postcode — anything that helps." aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
        {err("message")}
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={status.state === "sending"} className="btn btn-solid disabled:opacity-60">
          {status.state === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-sm text-charcoal/65">We only use your details to reply. <a href="/privacy" className="link-u">Privacy policy</a></p>
      </div>
      {status.state === "error" && <p role="alert" className="text-brick sm:col-span-2">{status.message} Please try again, or call 01794 342 252.</p>}
    </form>
  );
}
