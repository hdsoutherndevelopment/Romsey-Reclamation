import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { categories } from "@/lib/materials";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/materials", "/projects", "/about", "/gallery", "/contact", "/delivery", ...categories.map((c) => `/${c.slug}`)];
  return pages.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date(), changeFrequency: p ? "monthly" : "weekly", priority: p ? 0.7 : 1 }));
}
