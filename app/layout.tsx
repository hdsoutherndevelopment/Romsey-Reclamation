import type { Metadata, Viewport } from "next";
import "./globals.css";
import { archivo, caslon } from "@/lib/fonts";
import { site } from "@/lib/config";
import { localBusinessSchema } from "@/lib/schema";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Romsey Reclamation | Architectural Salvage & Reclaimed Materials, Hampshire", template: "%s | Romsey Reclamation" },
  description: site.description,
  keywords: ["reclamation yard Hampshire", "railway sleepers Romsey", "reclaimed bricks Hampshire", "reclaimed roof tiles", "architectural salvage Southampton", "seasoned oak beams", "York flagstones", "Romsey Reclamation"],
  openGraph: { type: "website", locale: "en_GB", siteName: site.name, title: "Romsey Reclamation — Reclaimed materials. Built to last.", description: site.description, url: site.url },
  twitter: { card: "summary_large_image", title: "Romsey Reclamation", description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#eee8dc" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${archivo.variable} ${caslon.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-charcoal focus:px-4 focus:py-2 focus:text-lime">Skip to content</a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      </body>
    </html>
  );
}
