import { ImageResponse } from "next/og";

export const alt = "Romsey Reclamation — Reclaimed materials. Built to last.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  const rows = Array.from({ length: 9 }, (_, i) => i);
  const cols = Array.from({ length: 10 }, (_, i) => i);
  const reds = ["#8f432d", "#a1543b", "#7c3826", "#b36a4b", "#6f3a2b", "#95563b"];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#c7bca8" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {rows.map((r) => (
            <div key={r} style={{ display: "flex", gap: 8, marginLeft: r % 2 ? -74 : 0 }}>
              {cols.map((c) => <div key={c} style={{ width: 140, height: 62, flexShrink: 0, background: reds[(r * 5 + c * 3 + ((r * c) % 4)) % reds.length] }} />)}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(27,25,22,.92) 0%, rgba(27,25,22,.7) 55%, rgba(27,25,22,.3) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 72, color: "#f6f2ea" }}>
          <div style={{ fontSize: 26, opacity: 0.8, marginBottom: 20 }}>Romsey Reclamation · Awbridge, Hampshire</div>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 0.95, letterSpacing: -2 }}>RECLAIMED MATERIALS.</div>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 0.95, letterSpacing: -2 }}>BUILT TO LAST.</div>
        </div>
      </div>
    ),
    size
  );
}
