// Quantity estimators. Rates are standard trade rules of thumb — every result tells the customer to confirm with the yard.
// Delivery minimums/full loads mirror the Delivery page.

export type CalcKey = "sleepers" | "bricks" | "tiles" | "paving";

export type Estimate = { qty: number; unit: string; detail: string; delivery: string };

// Round off float noise first (6 × 60 × 1.1 = 396.00000000000006) so we never over-count by one.
const ceil = (n: number) => Math.ceil(Math.round(n * 1e6) / 1e6);
const pos = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

export const SLEEPER_LENGTHS = [
  { id: "reclaimed-8ft6", label: "Reclaimed, 8ft 6in (2.59m)", m: 2.59, min: 10, full: 120 },
  { id: "reclaimed-5ft", label: "Reclaimed, 5ft (1.52m)", m: 1.52, min: 10, full: 200 },
  { id: "new-2.4", label: "New pine / oak, 2.4m", m: 2.4, min: 10, full: 120 },
] as const;

/** Raised bed / edging: each side cut from whole sleepers, repeated for every course. */
export function sleepers(lengthM: number, widthM: number, courses: number, sizeId: string): Estimate | null {
  const size = SLEEPER_LENGTHS.find((s) => s.id === sizeId) ?? SLEEPER_LENGTHS[0];
  const L = pos(lengthM), W = pos(widthM), C = Math.floor(pos(courses));
  if (!L || !C) return null;
  const perSide = (side: number) => (side ? ceil(side / size.m) : 0);
  // width 0 = a straight run of edging (one side only)
  const perCourse = W ? 2 * perSide(L) + 2 * perSide(W) : perSide(L);
  const qty = perCourse * C;
  return { qty, unit: "sleepers", detail: `${perCourse} per course × ${C} course${C > 1 ? "s" : ""}`, delivery: delivery(qty, size.min, size.full, "sleepers") };
}

/** Walls: 60 bricks/m² half-brick (single skin), 120/m² one-brick, +10% for cuts and breakage. 500 per pallet. */
export function bricks(lengthM: number, heightM: number, bond: "half" | "one"): Estimate | null {
  const area = pos(lengthM) * pos(heightM);
  if (!area) return null;
  const qty = ceil(area * (bond === "one" ? 120 : 60) * 1.1);
  return { qty, unit: "bricks", detail: `${area.toFixed(1)} m² wall · about ${ceil(qty / 500)} pallet${qty > 500 ? "s" : ""}`, delivery: delivery(qty, 500, 5000, "bricks") };
}

/** Plain clay tiles at 100mm gauge ≈ 60/m², +5% waste. */
export function tiles(areaM2: number): Estimate | null {
  const a = pos(areaM2);
  if (!a) return null;
  const qty = ceil(a * 60 * 1.05);
  return { qty, unit: "plain tiles", detail: `${a.toFixed(1)} m² of roof slope`, delivery: delivery(qty, 600, 9000, "tiles") };
}

/** Flagstones sold by area, +10% to allow for random sizes and cutting. */
export function paving(lengthM: number, widthM: number): Estimate | null {
  const area = pos(lengthM) * pos(widthM);
  if (!area) return null;
  const qty = Math.round(area * 1.1 * 10) / 10;
  return { qty, unit: "m² of flagstone", detail: `${area.toFixed(1)} m² plus 10% for cutting`, delivery: qty >= 3 ? "Meets the 3 m² delivery minimum." : "Below the 3 m² delivery minimum — collect from the yard, or call to discuss." };
}

function delivery(qty: number, min: number, full: number, noun: string) {
  if (qty < min) return `Below the ${min.toLocaleString("en-GB")}-${noun.replace(/s$/, "")} delivery minimum — collect from the yard, or call to discuss.`;
  if (qty > full) return `More than one full load (${full.toLocaleString("en-GB")} ${noun}) — call us to plan delivery.`;
  return `Meets the delivery minimum of ${min.toLocaleString("en-GB")} ${noun}.`;
}

export const calcFor = (slug: string): CalcKey | null =>
  ({ sleepers: "sleepers", bricks: "bricks", "roof-tiles": "tiles", paving: "paving" } as Record<string, CalcKey>)[slug] ?? null;
