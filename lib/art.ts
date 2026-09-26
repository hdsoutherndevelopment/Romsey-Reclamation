// Generative material studies that stand in for photography until the yard is photographed.
// Each image is deterministic (kind + seed) and served as a cached static SVG from /art/[kind]-[seed].svg.
// To swap in a real photo, set `photo` on the Art object in lib/materials.ts.

export const ART_KINDS = [
  "brick", "stock", "sleeper", "beams", "boards", "scaffold", "tile", "slate", "door", "gate",
  "flagstone", "setts", "walling", "fireplace", "chimney", "radiator", "quarry", "poles",
] as const;
export type ArtKind = (typeof ART_KINDS)[number];
export const ART_SEEDS = Array.from({ length: 12 }, (_, i) => i + 1);

const W = 1200;
const H = 900;

type R = () => number;

function rng(seed: number): R {
  let a = (seed * 2654435761) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const n = (v: number) => Math.round(v);
const pick = <T,>(r: R, a: readonly T[]) => a[Math.floor(r() * a.length)];
const between = (r: R, a: number, b: number) => a + r() * (b - a);

function shade(hex: string, r: R, amt = 0.08) {
  const f = 1 + (r() - 0.5) * 2 * amt;
  const c = hex.replace("#", "");
  const ch = [0, 2, 4].map((i) => Math.max(0, Math.min(255, Math.round(parseInt(c.slice(i, i + 2), 16) * f))));
  return "#" + ch.map((v) => v.toString(16).padStart(2, "0")).join("");
}

// pit/mottle are feTurbulence frequencies ("x y" stretches the texture, e.g. wood grain); wear = edge chipping in px.
type Relief = { bevel: number; depth: number; pit: string; mottle: string; rough: number; wear: number; cast: number };

function defs(seed: number, grainFreq = 0.85, relief: Relief = RELIEF.default) {
  return `<defs>
<filter id="g" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${grainFreq}" numOctaves="2" seed="${seed}" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
<filter id="b" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="3" seed="${seed + 7}"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="2" intercept="-0.45"/><feFuncG type="linear" slope="2" intercept="-0.45"/><feFuncB type="linear" slope="2" intercept="-0.45"/></feComponentTransfer></filter>
<linearGradient id="l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></linearGradient>
<linearGradient id="cyl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".3" stop-color="#fff" stop-opacity=".18"/><stop offset=".65" stop-color="#000" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient>
<radialGradient id="glow" cx=".5" cy="1" r=".7"><stop offset="0" stop-color="#e8893a" stop-opacity=".55"/><stop offset="1" stop-color="#e8893a" stop-opacity="0"/></radialGradient>
<filter id="relief" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="${seed + 11}" result="warp"/>
  <feDisplacementMap in="SourceGraphic" in2="warp" scale="${relief.wear}" xChannelSelector="R" yChannelSelector="G" result="src"/>
  <feColorMatrix in="src" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="srcA"/>
  <feTurbulence type="fractalNoise" baseFrequency="${relief.pit}" numOctaves="4" seed="${seed + 3}" result="pit"/>
  <feTurbulence type="fractalNoise" baseFrequency="${relief.mottle}" numOctaves="2" seed="${seed + 5}" result="mot"/>
  <feComposite in="pit" in2="mot" operator="arithmetic" k2="${relief.rough}" k3="${relief.rough * 0.8}" result="tex"/>
  <feColorMatrix in="tex" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="texA"/>
  <feGaussianBlur in="srcA" stdDeviation="${relief.bevel}" result="bev"/>
  <feComposite in="bev" in2="texA" operator="arithmetic" k2="1" k3="1" result="height"/>
  <feDiffuseLighting in="height" surfaceScale="${relief.depth}" diffuseConstant="1.3" lighting-color="#fff1dc" result="diff"><feDistantLight azimuth="225" elevation="42"/></feDiffuseLighting>
  <feSpecularLighting in="height" surfaceScale="${relief.depth}" specularConstant=".55" specularExponent="18" lighting-color="#ffe6c0" result="spec"><feDistantLight azimuth="225" elevation="42"/></feSpecularLighting>
  <feComposite in="src" in2="diff" operator="arithmetic" k1="1.15" result="lit"/>
  <feComposite in="spec" in2="srcA" operator="in" result="specIn"/>
  <feComposite in="lit" in2="specIn" operator="arithmetic" k2="1" k3=".5" result="shaded"/>
  <feComposite in="shaded" in2="srcA" operator="in" result="unit"/>
  <feGaussianBlur in="srcA" stdDeviation="${relief.bevel * 1.8}" result="sh"/>
  <feOffset in="sh" dx="${relief.cast}" dy="${relief.cast * 1.4}" result="shO"/>
  <feColorMatrix in="shO" type="matrix" values="0 0 0 0 .04  0 0 0 0 .03  0 0 0 0 .02  0 0 0 .85 0" result="shadow"/>
  <feMerge><feMergeNode in="shadow"/><feMergeNode in="unit"/></feMerge>
</filter>
<radialGradient id="vig" cx=".45" cy=".42" r=".78"><stop offset=".55" stop-color="#0b0906" stop-opacity="0"/><stop offset="1" stop-color="#0b0906" stop-opacity=".62"/></radialGradient>
<radialGradient id="key" cx=".18" cy=".08" r=".85"><stop offset="0" stop-color="#ffd9a0" stop-opacity=".22"/><stop offset=".6" stop-color="#ffd9a0" stop-opacity="0"/></radialGradient>
</defs>`;
}

const SPLIT = "<!--finish-->";
function finish(grain = 0.3, blotch = 0.3) {
  return `${SPLIT}<rect width="${W}" height="${H}" filter="url(#b)" opacity="${blotch}" style="mix-blend-mode:multiply"/>
<rect width="${W}" height="${H}" filter="url(#g)" opacity="${grain}" style="mix-blend-mode:multiply"/>
<rect width="${W}" height="${H}" fill="url(#l)"/>
<rect width="${W}" height="${H}" fill="url(#key)" style="mix-blend-mode:screen"/>
<rect width="${W}" height="${H}" fill="url(#vig)"/>`;
}

// Lighting profile per material: bevel = edge roundness, depth = relief height, pit = surface texture scale, rough = pitting amount, cast = shadow offset.
const RELIEF: Record<string, Relief> = {
  default: { bevel: 2.4, depth: 6, pit: "0.3", mottle: "0.03", rough: 0.3, wear: 4, cast: 3 },
  brick: { bevel: 2, depth: 7, pit: "0.28", mottle: "0.04", rough: 0.42, wear: 6, cast: 3 },
  stone: { bevel: 4.5, depth: 8, pit: "0.16", mottle: "0.02", rough: 0.5, wear: 6, cast: 5 },
  timber: { bevel: 2.4, depth: 6, pit: "0.012 0.32", mottle: "0.004 0.06", rough: 0.45, wear: 3, cast: 3 },
  endgrain: { bevel: 3, depth: 5, pit: "0.35", mottle: "0.03", rough: 0.3, wear: 7, cast: 4 },
  roof: { bevel: 2.2, depth: 6.5, pit: "0.25", mottle: "0.03", rough: 0.4, wear: 5, cast: 4 },
  object: { bevel: 3.5, depth: 5, pit: "0.4", mottle: "0.02", rough: 0.18, wear: 1.5, cast: 5 },
};
const RELIEF_FOR: Partial<Record<string, keyof typeof RELIEF>> = {
  brick: "brick", stock: "brick", quarry: "brick", door: "object", fireplace: "brick", radiator: "object",
  flagstone: "stone", setts: "stone", walling: "stone",
  sleeper: "timber", beams: "endgrain", boards: "timber", scaffold: "timber", poles: "endgrain",
  tile: "roof", slate: "roof",
};

/* Lift everything after the full-canvas background into the relief group so each unit (brick, tile, stone, board) is lit
   and casts a shadow into the joints. Scenes with painted skies (gate, chimney) keep their flat look. */
function lightUp(body: string, kind: string) {
  if (!RELIEF_FOR[kind]) return body;
  const [main, rest = ""] = body.split(SPLIT);
  const m = /^(<rect (?:x="0" y="0" )?width="1200" height="900"[^>]*\/>)/.exec(main);
  if (!m) return body;
  return `${m[1]}<g filter="url(#relief)">${main.slice(m[1].length)}</g>${rest}`;
}

// ---------- building blocks ----------

const REDS = ["#8f432d", "#a1543b", "#7c3826", "#b36a4b", "#6f3a2b", "#95563b", "#843f30", "#5e2f24", "#a8603f"];
const STOCKS = ["#b89a6a", "#a88657", "#c2a778", "#8f6f4a", "#9c7b53", "#7d5f41", "#b08a5c"];

function brickField(r: R, x0: number, y0: number, w: number, h: number, palette: string[], mortar = "#c9bfae", bw = 96, bh = 30, m = 9) {
  let s = `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="${mortar}"/>`;
  let row = 0;
  for (let y = y0 + 3; y < y0 + h; y += bh + m, row++) {
    const off = row % 2 ? -bw / 2 : 0;
    for (let x = x0 + off - r() * 4; x < x0 + w; x += bw + m) {
      const c = shade(pick(r, palette), r, 0.1);
      const bwj = bw + between(r, -3, 3);
      const yj = y + between(r, -1.5, 1.5);
      s += `<rect x="${n(x)}" y="${n(yj)}" width="${n(bwj)}" height="${bh}" rx="3" fill="${c}"/>`;
      if (r() < 0.2) s += `<rect x="${n(x + r() * bw * 0.5)}" y="${n(yj)}" width="${n(bw * between(r, 0.2, 0.5))}" height="${bh}" fill="#1e120c" opacity=".22"/>`;
      r(); r();
    }
  }
  return s;
}

function grainLines(r: R, x: number, y: number, len: number, h: number, count: number, light = "#fff", dark = "#000") {
  let s = "";
  for (let i = 0; i < count; i++) {
    let yy = y + between(r, 4, h - 4);
    let d = `M${n(x)} ${n(yy)}`;
    for (let xx = x; xx < x + len; xx += 110) {
      const cy = yy + between(r, -4, 4);
      yy = Math.min(y + h - 3, Math.max(y + 3, yy + between(r, -2, 2)));
      d += ` Q${n(xx + 55)} ${n(cy)} ${n(Math.min(xx + 110, x + len))} ${n(yy)}`;
    }
    const isLight = r() < 0.45;
    s += `<path d="${d}" fill="none" stroke="${isLight ? light : dark}" stroke-opacity="${isLight ? between(r, 0.05, 0.12).toFixed(2) : between(r, 0.12, 0.28).toFixed(2)}" stroke-width="${between(r, 0.8, 2.6).toFixed(1)}"/>`;
  }
  return s;
}

function check(r: R, x: number, y: number, len: number) {
  let d = `M${n(x)} ${n(y)}`;
  let yy = y;
  for (let xx = x; xx < x + len; xx += between(r, 18, 40)) {
    yy += between(r, -2.5, 2.5);
    d += ` L${n(xx)} ${n(yy)}`;
  }
  return `<path d="${d}" fill="none" stroke="#120c08" stroke-opacity=".7" stroke-width="${between(r, 1.5, 3).toFixed(1)}" stroke-linecap="round"/>`;
}

function wobblyRing(cx: number, cy: number, rad: number, p1: number, p2: number, pts = 22) {
  let d = "";
  for (let i = 0; i <= pts; i++) {
    const t = (i / pts) * Math.PI * 2;
    const rr = rad * (1 + 0.035 * Math.sin(3 * t + p1) + 0.022 * Math.sin(5 * t + p2));
    d += `${i ? "L" : "M"}${n(cx + Math.cos(t) * rr)} ${n(cy + Math.sin(t) * rr * 0.96)}`;
  }
  return d + "Z";
}

// ---------- kinds ----------

function brick(r: R, stock = false) {
  const pal = stock ? [...STOCKS, ...STOCKS, REDS[1], REDS[4]] : [...REDS, ...(r() < 0.5 ? [STOCKS[3]] : [])];
  return brickField(r, 0, 0, W, H, pal, stock ? "#cfc6b3" : "#c7bca8") + finish(0.32, 0.34);
}

function sleeper(r: R) {
  const pal = ["#3d3027", "#4b3a2c", "#33291f", "#5a4633", "#625749", "#4a4038", "#2c231c"];
  let s = `<rect width="${W}" height="${H}" fill="#140f0b"/>`;
  const sh = 92;
  for (let y = -between(r, 0, 40); y < H; y += sh + 7) {
    let x = -r() * 500;
    while (x < W) {
      const len = between(r, 900, 1600);
      const c = shade(pick(r, pal), r, 0.1);
      s += `<rect x="${n(x)}" y="${n(y)}" width="${n(len)}" height="${sh}" rx="6" fill="${c}"/>`;
      s += grainLines(r, x + 8, y, len - 16, sh, 7, "#d9c7a8");
      if (r() < 0.8) s += check(r, x + between(r, 40, len * 0.6), y + between(r, 20, sh - 20), between(r, 80, 360));
      if (r() < 0.6) {
        for (let bx = x + between(r, 120, 260); bx < x + len - 100; bx += between(r, 520, 700)) {
          s += `<rect x="${n(bx - 30)}" y="${n(y + 6)}" width="70" height="${sh - 12}" fill="#7a4524" opacity=".28"/>`;
          s += `<circle cx="${n(bx)}" cy="${n(y + sh * 0.3)}" r="6" fill="#0d0907"/><circle cx="${n(bx)}" cy="${n(y + sh * 0.7)}" r="6" fill="#0d0907"/>`;
        }
      }
      s += `<rect x="${n(x)}" y="${n(y)}" width="${n(len)}" height="3" fill="#fff" opacity=".07"/><rect x="${n(x)}" y="${n(y + sh - 7)}" width="${n(len)}" height="7" fill="#000" opacity=".35"/>`;
      x += len + between(r, 4, 10) + (r() < 0.3 ? r() * 40 : 0);
    }
  }
  return s + finish(0.3, 0.3);
}

function beamEnd(r: R, x: number, y: number, w: number, h: number, id: string) {
  const base = shade(pick(r, ["#b88c5c", "#a67b4c", "#c29a6a", "#9c6f43", "#b08050"]), r, 0.08);
  let s = `<clipPath id="${id}"><rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="3"/></clipPath><g clip-path="url(#${id})"><rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${base}"/>`;
  const cx = x + w * between(r, -0.2, 1.2);
  const cy = y + h * between(r, -0.2, 1.2);
  const maxR = Math.hypot(Math.max(Math.abs(cx - x), Math.abs(cx - x - w)), Math.max(Math.abs(cy - y), Math.abs(cy - y - h)));
  const p1 = r() * 6, p2 = r() * 6;
  for (let rad = between(r, 4, 10); rad < maxR; rad += between(r, 9, 18)) {
    s += `<path d="${wobblyRing(cx, cy, rad, p1, p2)}" fill="none" stroke="#5a3a20" stroke-opacity="${between(r, 0.25, 0.55).toFixed(2)}" stroke-width="${between(r, 1, 3).toFixed(1)}"/>`;
  }
  const cracks = 1 + Math.floor(r() * 2);
  for (let i = 0; i < cracks; i++) {
    const a = r() * Math.PI * 2;
    const ex = cx + Math.cos(a) * maxR, ey = cy + Math.sin(a) * maxR;
    const len = between(r, 0.25, 0.55);
    const sx = ex + (cx - ex) * len, sy = ey + (cy - ey) * len;
    const px = -Math.sin(a) * 4, py = Math.cos(a) * 4;
    s += `<path d="M${n(ex + px)} ${n(ey + py)} L${n(sx)} ${n(sy)} L${n(ex - px)} ${n(ey - py)}Z" fill="#20140c" opacity=".75"/>`;
  }
  if (r() < 0.35) s += `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="#8c8778" opacity="${between(r, 0.2, 0.45).toFixed(2)}"/>`;
  s += `</g><rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="3" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="2"/>`;
  return s;
}

function beams(r: R) {
  let s = `<rect width="${W}" height="${H}" fill="#1f1812"/>`;
  let k = 0;
  for (let y = -between(r, 20, 90); y < H; ) {
    const hh = between(r, 160, 240);
    for (let x = -r() * 120; x < W; ) {
      const w = hh * between(r, 0.75, 1.7);
      s += beamEnd(r, x, y, w, hh, `c${k++}`);
      x += w + between(r, 6, 16);
    }
    y += hh;
    s += `<rect x="0" y="${n(y + 2)}" width="${W}" height="16" fill="#1f1812"/>`;
    for (let sx = r() * 200; sx < W; sx += between(r, 280, 420)) s += `<rect x="${n(sx)}" y="${n(y + 3)}" width="44" height="14" fill="#6b5a45"/>`;
    y += 20;
  }
  return s + finish(0.28, 0.22);
}

function boards(r: R) {
  const pal = ["#b8864f", "#a87442", "#c69863", "#9a6a3d", "#8d6038", "#b27b48"];
  let s = `<rect width="${W}" height="${H}" fill="#2a1d12"/>`;
  for (let y = -20; y < H; ) {
    const bh = between(r, 80, 120);
    for (let x = -r() * 600; x < W; ) {
      const len = between(r, 500, 1300);
      s += `<rect x="${n(x)}" y="${n(y)}" width="${n(len - 3)}" height="${n(bh - 3)}" fill="${shade(pick(r, pal), r, 0.1)}"/>`;
      s += grainLines(r, x, y, len - 3, bh - 3, 9, "#f3d9ab", "#4a2c14");
      for (let i = 0; i < 6; i++) s += `<ellipse cx="${n(x + r() * len)}" cy="${n(y + r() * bh)}" rx="${n(between(r, 6, 18))}" ry="1.5" fill="#f6e2bb" opacity=".25"/>`;
      if (r() < 0.25) { const kx = x + r() * len, ky = y + bh / 2; s += `<ellipse cx="${n(kx)}" cy="${n(ky)}" rx="12" ry="7" fill="#4a2c14" opacity=".7"/><ellipse cx="${n(kx)}" cy="${n(ky)}" rx="20" ry="11" fill="none" stroke="#4a2c14" stroke-opacity=".35"/>`; }
      x += len;
    }
    y += bh;
  }
  return s + finish(0.22, 0.16);
}

function scaffold(r: R) {
  const pal = ["#a79a84", "#9b8b72", "#b3a58c", "#8e8069", "#c0b095", "#9d9178"];
  let s = `<rect width="${W}" height="${H}" fill="#2b2620"/>`;
  const bh = 118;
  for (let y = -between(r, 0, 60); y < H; y += bh + 6) {
    const x = -between(r, 0, 90);
    s += `<rect x="${n(x)}" y="${n(y)}" width="${W + 200}" height="${bh}" fill="${shade(pick(r, pal), r, 0.1)}"/>`;
    s += grainLines(r, x, y, W + 200, bh, 10, "#fff", "#3a3024");
    const band = x + between(r, 60, 180);
    s += `<rect x="${n(band)}" y="${n(y - 2)}" width="26" height="${bh + 4}" fill="#9aa0a3"/><rect x="${n(band)}" y="${n(y - 2)}" width="6" height="${bh + 4}" fill="#fff" opacity=".25"/><circle cx="${n(band + 13)}" cy="${n(y + 20)}" r="3" fill="#555"/><circle cx="${n(band + 13)}" cy="${n(y + bh - 20)}" r="3" fill="#555"/>`;
    for (let i = 0; i < 18; i++) if (r() < 0.5) s += `<circle cx="${n(r() * W)}" cy="${n(y + r() * bh)}" r="${between(r, 1, 5).toFixed(1)}" fill="${pick(r, ["#f1ede4", "#d9d6cf", "#8d8f8c"])}" opacity=".75"/>`;
    if (r() < 0.6) s += check(r, between(r, 300, 900), y + between(r, 20, bh - 20), between(r, 100, 300));
  }
  return s + finish(0.3, 0.26);
}

function roof(r: R, pal: string[], tw: number, gauge: number, lichen: boolean, bg: string) {
  let s = `<rect width="${W}" height="${H}" fill="${bg}"/>`;
  const th = gauge * 2.4;
  let k = 0;
  for (let yb = H + 30; yb > -gauge; yb -= gauge, k++) {
    const off = k % 2 ? -tw / 2 : 0;
    for (let x = off - between(r, 0, 6); x < W; x += tw + 2) {
      const c = shade(pick(r, pal), r, 0.1);
      const top = yb - th;
      const bow = between(r, 3, 8);
      const rot = between(r, -1.4, 1.4).toFixed(2);
      const dy = between(r, -3, 3);
      s += `<path transform="rotate(${rot} ${n(x + tw / 2)} ${n(yb)})" d="M${n(x)} ${n(top)} L${n(x + tw)} ${n(top)} L${n(x + tw)} ${n(yb - bow + dy)} Q${n(x + tw / 2)} ${n(yb + bow + dy)} ${n(x)} ${n(yb - bow + dy)}Z" fill="${c}" stroke="#000" stroke-opacity=".25" stroke-width="1.5"/>`;
      s += `<rect x="${n(x)}" y="${n(yb - 4)}" width="${tw}" height="4" fill="#fff" opacity=".06"/>`;
      if (lichen && r() < 0.35) {
        for (let i = 0; i < 4; i++) s += `<circle cx="${n(x + r() * tw)}" cy="${n(yb - r() * gauge)}" r="${between(r, 1.5, 7).toFixed(1)}" fill="${pick(r, ["#b9b27a", "#8d9a62", "#c9c49a", "#6f7c4a"])}" opacity="${between(r, 0.4, 0.8).toFixed(2)}"/>`;
      }
    }
    s += `<rect x="0" y="${n(yb + 2)}" width="${W}" height="10" fill="#000" opacity=".22"/>`;
  }
  return s;
}

function tile(r: R) {
  return roof(r, ["#a0512f", "#8f4629", "#b0603a", "#7e3f26", "#9b5a3a", "#6c3a28", "#b56d45", "#8a4a32"], 92, 58, true, "#2a170f") + finish(0.3, 0.34);
}
function slate(r: R) {
  return roof(r, ["#4b4f57", "#5a5d66", "#44464f", "#585463", "#3e4148", "#63646b", "#4f4a55"], 156, 60, r() < 0.4, "#1d1e22") + finish(0.26, 0.22);
}

function flagstone(r: R) {
  const pal = ["#b8ae98", "#a89f8a", "#c4b9a1", "#9d9583", "#8f8a7d", "#b3a88f", "#a6a191"];
  let s = `<rect width="${W}" height="${H}" fill="#5f594e"/>`;
  for (let y = -between(r, 0, 60); y < H; ) {
    const rh = between(r, 120, 260);
    for (let x = -r() * 120; x < W; ) {
      const rw = between(r, 160, 380);
      const j = () => between(r, -5, 5);
      s += `<path d="M${n(x + 5 + j())} ${n(y + 5 + j())} L${n(x + rw - 5 + j())} ${n(y + 5 + j())} L${n(x + rw - 5 + j())} ${n(y + rh - 5 + j())} L${n(x + 5 + j())} ${n(y + rh - 5 + j())}Z" fill="${shade(pick(r, pal), r, 0.08)}"/>`;
      for (let i = 0; i < 3; i++) if (r() < 0.6) { const ly = y + r() * rh; s += `<path d="M${n(x + 10)} ${n(ly)} Q${n(x + rw / 2)} ${n(ly + between(r, -6, 6))} ${n(x + rw - 10)} ${n(ly + between(r, -3, 3))}" fill="none" stroke="#6e6656" stroke-opacity=".3" stroke-width="1.5"/>`; }
      x += rw;
    }
    y += rh;
  }
  return s + finish(0.34, 0.3);
}

function setts(r: R) {
  const pal = ["#77746f", "#8a8680", "#6a6762", "#9a948b", "#5f5d5a", "#857d74", "#a19a90", "#9b8680"];
  let s = `<rect width="${W}" height="${H}" fill="#2f2c28"/>`;
  const cx = W / 2 + between(r, -200, 200), cy = H + between(r, 180, 360);
  for (let R0 = 60; R0 < 1700; R0 += 60) {
    const dt = 66 / R0;
    for (let t = r() * dt; t < Math.PI; t += dt) {
      const px = cx + Math.cos(t) * R0, py = cy - Math.sin(t) * R0;
      if (px < -60 || px > W + 60 || py < -60 || py > H + 60) continue;
      const rot = 90 - (t * 180) / Math.PI;
      s += `<rect x="-29" y="-25" width="${n(between(r, 54, 60))}" height="${n(between(r, 46, 52))}" rx="6" fill="${shade(pick(r, pal), r, 0.08)}" transform="translate(${n(px)} ${n(py)}) rotate(${rot.toFixed(1)})"/>`;
    }
  }
  return s + finish(0.45, 0.22);
}

function walling(r: R) {
  const pal = ["#b8ad97", "#a39884", "#8d8472", "#c6bca6", "#7f7663", "#9c8c6c", "#6d6a62", "#a8906a", "#bfb39a"];
  let s = `<rect width="${W}" height="${H}" fill="#4e483f"/>`;
  for (let y = -10; y < H; ) {
    const ch = between(r, 44, 84);
    for (let x = -r() * 60; x < W; ) {
      const sw = between(r, 60, 170), sh = ch - between(r, 4, 14);
      s += `<rect x="${n(x + 3)}" y="${n(y + 3 + between(r, 0, 5))}" width="${n(sw - 6)}" height="${n(sh)}" rx="${n(between(r, 8, 20))}" fill="${shade(pick(r, pal), r, 0.08)}" stroke="#000" stroke-opacity=".18" stroke-width="2"/>`;
      x += sw;
    }
    y += ch;
  }
  return s + finish(0.36, 0.3);
}

function door(r: R) {
  let s = brickField(r, 0, 0, W, H, REDS);
  const dw = 400, dx = W / 2 - dw / 2, dy = 150;
  const paint = pick(r, ["#3f4a3a", "#5a2a24", "#4e5d6a", "#2f3a3f", "#6b6a52"]);
  s += `<rect x="${dx - 40}" y="${dy - 40}" width="${dw + 80}" height="${H}" fill="#8a7f6c"/>`;
  s += `<rect x="${dx - 24}" y="${dy - 24}" width="${dw + 48}" height="${H}" fill="#5a4330"/>`;
  s += grainLines(r, dx - 24, dy - 24, dw + 48, 24, 3, "#e0c79c", "#2a1a0e");
  s += `<rect x="${dx}" y="${dy}" width="${dw}" height="${H - dy - 36}" fill="${paint}"/>`;
  if (r() < 0.5) {
    const planks = 6, pw = dw / planks;
    for (let i = 1; i < planks; i++) s += `<rect x="${n(dx + i * pw - 2)}" y="${dy}" width="4" height="${H - dy - 36}" fill="#000" opacity=".4"/>`;
    for (const hy of [dy + 90, dy + 560]) s += `<path d="M${dx - 10} ${hy} L${dx + dw * 0.72} ${hy + 4} L${dx + dw * 0.72 + 16} ${hy + 10} L${dx - 10} ${hy + 18}Z" fill="#1a1816"/>`;
    s += `<circle cx="${dx + dw - 70}" cy="${dy + 340}" r="26" fill="none" stroke="#1a1816" stroke-width="8"/><circle cx="${dx + dw - 70}" cy="${dy + 312}" r="9" fill="#1a1816"/>`;
  } else {
    const panelsX = [dx + 40, dx + dw / 2 + 16], pw = dw / 2 - 56;
    for (const py of [dy + 40, dy + 360]) for (const px of panelsX) {
      s += `<rect x="${px}" y="${py}" width="${pw}" height="280" fill="#000" opacity=".22"/><rect x="${px + 12}" y="${py + 12}" width="${pw - 24}" height="256" fill="${paint}"/><rect x="${px + 12}" y="${py + 12}" width="${pw - 24}" height="4" fill="#fff" opacity=".12"/>`;
    }
    s += `<circle cx="${dx + dw - 46}" cy="${dy + 340}" r="12" fill="#a88a4a"/>`;
  }
  for (let i = 0; i < 26; i++) s += `<rect x="${n(dx + r() * (dw - 40))}" y="${n(dy + r() * (H - dy - 60))}" width="${n(between(r, 6, 40))}" height="${n(between(r, 3, 14))}" fill="#9a7a55" opacity=".7"/>`;
  s += `<rect x="${dx - 60}" y="${H - 36}" width="${dw + 120}" height="36" fill="#a39a88"/><rect x="${dx - 60}" y="${H - 36}" width="${dw + 120}" height="4" fill="#fff" opacity=".2"/>`;
  return s + finish(0.3, 0.3);
}

function gate(r: R) {
  let s = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2e2d9"/><stop offset="1" stop-color="#cdd0c2"/></linearGradient><rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  let d = `M0 ${H}L0 420`;
  for (let x = 0; x <= W; x += 40) d += ` L${x} ${n(400 + Math.sin(x / 90 + r()) * 18 + r() * 22)}`;
  s += `<path d="${d} L${W} ${H}Z" fill="#3f4a35"/>`;
  s += `<rect x="0" y="560" width="${W}" height="${H - 560}" fill="#7a855a"/><path d="M0 ${H} L420 600 L760 600 L${W} ${H}Z" fill="#8b7a5e"/>`;
  const wood = shade("#8b8272", r, 0.1), dark = "#4c463d";
  const x0 = 250, x1 = 980;
  s += `<rect x="${x0 - 52}" y="260" width="52" height="${H - 260}" fill="${dark}"/><rect x="${x1}" y="300" width="48" height="${H - 300}" fill="${dark}"/>`;
  const rails = [390, 470, 545, 615, 680];
  for (const [i, ry] of rails.entries()) {
    const rh = i === 0 ? 30 : 22;
    s += `<rect x="${x0}" y="${ry}" width="${x1 - x0 - 6}" height="${rh}" fill="${shade(wood, r, 0.06)}"/>` + grainLines(r, x0, ry, x1 - x0 - 6, rh, 3, "#fff", "#2a2520") + `<rect x="${x0}" y="${ry + rh}" width="${x1 - x0 - 6}" height="5" fill="#000" opacity=".18"/>`;
  }
  s += `<rect x="${x0}" y="380" width="30" height="330" fill="${wood}"/><rect x="${x1 - 40}" y="380" width="30" height="330" fill="${wood}"/><rect x="${(x0 + x1) / 2}" y="390" width="22" height="316" fill="${wood}"/>`;
  s += `<path d="M${x0 + 20} 705 L${x1 - 60} 392 L${x1 - 40} 405 L${x0 + 36} 712Z" fill="${shade(wood, r, 0.08)}"/>`;
  s += `<rect x="${x0 - 30}" y="398" width="70" height="10" fill="#1d1b18"/><rect x="${x0 - 30}" y="682" width="70" height="10" fill="#1d1b18"/>`;
  return s + finish(0.26, 0.2);
}

function fireplace(r: R) {
  let s = `<rect width="${W}" height="${H}" fill="#e2d9c9"/>`;
  s += brickField(r, 180, 0, 840, H, REDS);
  const ox = 330, ow = 540, oy = 400;
  s += `<rect x="${ox}" y="${oy}" width="${ow}" height="${H - oy}" fill="#1b1714"/>`;
  s += `<g opacity=".35">${brickField(r, ox + 40, oy + 40, ow - 80, H - oy - 100, ["#3a241b", "#2e1d16", "#442a1f"], "#1b1714")}</g>`;
  s += `<rect x="${ox}" y="${oy}" width="${ow}" height="${H - oy}" fill="url(#glow)"/>`;
  s += `<rect x="${ox - 40}" y="${oy - 90}" width="${ow + 80}" height="90" fill="#6d4b2c"/>` + grainLines(r, ox - 40, oy - 90, ow + 80, 90, 9, "#e7cc9c", "#2a170a") + check(r, ox + 40, oy - 50, 260) + `<rect x="${ox - 40}" y="${oy - 6}" width="${ow + 80}" height="6" fill="#000" opacity=".35"/>`;
  s += `<rect x="${ox + 150}" y="${H - 150}" width="240" height="12" fill="#0e0c0b"/><rect x="${ox + 150}" y="${H - 150}" width="10" height="100" fill="#0e0c0b"/><rect x="${ox + 380}" y="${H - 150}" width="10" height="100" fill="#0e0c0b"/>`;
  s += `<rect x="${ox + 175}" y="${H - 185}" width="190" height="34" rx="14" fill="#4a3322"/><rect x="${ox + 195}" y="${H - 210}" width="150" height="30" rx="13" fill="#5c402a"/>`;
  s += `<rect x="120" y="${H - 50}" width="960" height="50" fill="#8a3e2a"/><rect x="120" y="${H - 50}" width="960" height="4" fill="#fff" opacity=".15"/>`;
  return s + finish(0.3, 0.26);
}

function chimney(r: R) {
  let s = `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9dcd6"/><stop offset="1" stop-color="#eae6dc"/></linearGradient><rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  s += brickField(r, 150, 640, 900, H - 640, REDS) + `<rect x="130" y="610" width="940" height="40" fill="#8f8b82"/><rect x="130" y="610" width="940" height="5" fill="#fff" opacity=".25"/>`;
  const count = 4 + Math.floor(r() * 2);
  const slot = 900 / count;
  for (let i = 0; i < count; i++) {
    const w = between(r, 96, 132), h = between(r, 230, 380);
    const cx = 150 + slot * (i + 0.5) + between(r, -10, 10);
    const top = 615 - h, tw = w * between(r, 0.72, 0.9);
    const col = shade(pick(r, ["#a55a3a", "#b86d45", "#8f4a30", "#c4a67a", "#9c9387"]), r, 0.06);
    const d = `M${n(cx - w / 2)} 615 L${n(cx - tw / 2)} ${n(top + 30)} L${n(cx - tw / 2 - 10)} ${n(top + 18)} L${n(cx - tw / 2 - 10)} ${n(top)} L${n(cx + tw / 2 + 10)} ${n(top)} L${n(cx + tw / 2 + 10)} ${n(top + 18)} L${n(cx + tw / 2)} ${n(top + 30)} L${n(cx + w / 2)} 615Z`;
    s += `<path d="${d}" fill="${col}"/><path d="${d}" fill="url(#cyl)"/>`;
    s += `<rect x="${n(cx - w / 2 + 4)}" y="${n(615 - h * 0.35)}" width="${n(w - 8)}" height="6" fill="#000" opacity=".15"/>`;
    if (r() < 0.5) for (let c = 0; c < 4; c++) s += `<rect x="${n(cx - tw / 2 - 10 + c * ((tw + 20) / 4))}" y="${n(top - 18)}" width="${n((tw + 20) / 8)}" height="20" fill="${col}"/>`;
    s += `<rect x="${n(cx - tw / 2 - 10)}" y="${n(top)}" width="${n(tw + 20)}" height="6" fill="#1a1512" opacity=".5"/>`;
  }
  return s + finish(0.26, 0.2);
}

function radiator(r: R) {
  let s = `<rect width="${W}" height="${H}" fill="#e4dccd"/>`;
  s += `<rect x="0" y="${H - 120}" width="${W}" height="120" fill="#7c5a3a"/>` + grainLines(r, 0, H - 120, W, 120, 10, "#e9cfa0", "#2e1b0c") + `<rect x="0" y="${H - 150}" width="${W}" height="30" fill="#efe8dc"/>`;
  const paint = pick(r, ["#34322e", "#d8cfbd", "#4a4744", "#57614f"]);
  const cols = 16, cw = 44, gap = 6, x0 = W / 2 - (cols * (cw + gap)) / 2, top = 250, h = 470;
  for (let i = 0; i < cols; i++) {
    const x = x0 + i * (cw + gap);
    s += `<rect x="${x}" y="${top}" width="${cw}" height="${h}" rx="20" fill="${shade(paint, r, 0.03)}"/><rect x="${x}" y="${top}" width="${cw}" height="${h}" rx="20" fill="url(#cyl)"/>`;
    s += `<rect x="${x + 8}" y="${top + 70}" width="${cw - 16}" height="4" fill="#000" opacity=".2"/><rect x="${x + 8}" y="${top + h - 74}" width="${cw - 16}" height="4" fill="#000" opacity=".2"/>`;
  }
  s += `<rect x="${x0 + 10}" y="${top + h}" width="30" height="${H - 150 - top - h}" fill="${paint}"/><rect x="${x0 + cols * (cw + gap) - 46}" y="${top + h}" width="30" height="${H - 150 - top - h}" fill="${paint}"/>`;
  s += `<rect x="${x0 - 90}" y="${top + h - 60}" width="90" height="18" fill="#9a8a6a"/><rect x="${x0 - 90}" y="${top + h - 60}" width="18" height="${H - (top + h - 60)}" fill="#9a8a6a"/>`;
  return s + finish(0.24, 0.18);
}

function quarry(r: R) {
  const reds = ["#8a3b2a", "#9b4632", "#7a3325", "#a45438", "#8f412e"];
  const checker = r() < 0.5;
  let s = `<rect width="${W}" height="${H}" fill="#5b4a3f"/>`;
  const t = 118;
  for (let y = 0, row = 0; y < H; y += t, row++) for (let x = 0, col = 0; x < W; x += t, col++) {
    const c = checker && (row + col) % 2 ? shade("#2e2724", r, 0.1) : shade(pick(r, reds), r, 0.08);
    s += `<rect x="${x + 4}" y="${y + 4}" width="${t - 8}" height="${t - 8}" rx="3" fill="${c}"/>`;
    if (r() < 0.12) s += `<path d="M${x + 4} ${n(y + r() * t)} L${x + t - 4} ${n(y + r() * t)}" stroke="#1f1712" stroke-width="2" opacity=".6"/>`;
  }
  return s + finish(0.3, 0.42);
}

function poles(r: R) {
  let s = `<rect width="${W}" height="${H}" fill="#120e0b"/>`;
  const rad = 70;
  for (let row = 0, y = H + 10; y > -rad; row++, y -= rad * 1.72) {
    for (let x = (row % 2 ? rad : 0) - between(r, 0, 20); x < W + rad; x += rad * 2 + 2) {
      const rr = rad * between(r, 0.86, 1);
      const face = shade(pick(r, ["#8a6a4a", "#6d6150", "#7b6348", "#94795a"]), r, 0.08);
      s += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(rr)}" fill="#2c2119"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(rr * 0.84)}" fill="${face}"/>`;
      for (let k = 0.15; k < 0.84; k += between(r, 0.08, 0.14)) s += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(rr * k)}" fill="none" stroke="#3b2a1b" stroke-opacity=".35" stroke-width="1.5"/>`;
      const a = r() * Math.PI * 2;
      s += `<path d="M${n(x)} ${n(y)} L${n(x + Math.cos(a) * rr * 0.84)} ${n(y + Math.sin(a) * rr * 0.84)}" stroke="#140c07" stroke-width="3" opacity=".8"/>`;
    }
  }
  return s + finish(0.3, 0.25);
}

// ---------- entry ----------

export function renderArt(kind: ArtKind, seed: number): string {
  const r = rng(seed * 97 + ART_KINDS.indexOf(kind) * 1013);
  const body: Record<ArtKind, () => string> = {
    brick: () => brick(r),
    stock: () => brick(r, true),
    sleeper: () => sleeper(r),
    beams: () => beams(r),
    boards: () => boards(r),
    scaffold: () => scaffold(r),
    tile: () => tile(r),
    slate: () => slate(r),
    door: () => door(r),
    gate: () => gate(r),
    flagstone: () => flagstone(r),
    setts: () => setts(r),
    walling: () => walling(r),
    fireplace: () => fireplace(r),
    chimney: () => chimney(r),
    radiator: () => radiator(r),
    quarry: () => quarry(r),
    poles: () => poles(r),
  };
  const grainFreq = kind === "setts" ? 1.3 : 0.85;
  const relief = RELIEF[RELIEF_FOR[kind] ?? "default"];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${defs(seed, grainFreq, relief)}${lightUp(body[kind](), kind)}</svg>`;
}

export function parseArtName(name: string): { kind: ArtKind; seed: number } | null {
  const m = /^([a-z]+)-(\d+)\.svg$/.exec(name);
  if (!m) return null;
  const kind = m[1] as ArtKind;
  const seed = Number(m[2]);
  if (!ART_KINDS.includes(kind) || !ART_SEEDS.includes(seed)) return null;
  return { kind, seed };
}
