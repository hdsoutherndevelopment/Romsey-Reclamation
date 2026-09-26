import { site } from "./config";

// Open/closed status in UK time from site.hours. ponytail: ignores bank holidays — add a closures list to config if the yard shuts on them.

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const toMin = (hhmm: string) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
const fmt = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h < 12 ? "am" : "pm"}`;
};

function slotFor(day: string) {
  return site.hours.find((h) => h.schema?.days.includes(day))?.schema ?? null;
}

export function openStatus(now = new Date()): { open: boolean; label: string } {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  const day = get("weekday");
  const mins = Number(get("hour")) * 60 + Number(get("minute"));

  const today = slotFor(day);
  if (today && mins >= toMin(today.opens) && mins < toMin(today.closes)) return { open: true, label: `Open now · closes ${fmt(today.closes)}` };
  if (today && mins < toMin(today.opens)) return { open: false, label: `Closed · opens ${fmt(today.opens)} today` };

  const idx = DAYS.indexOf(day);
  for (let i = 1; i <= 7; i++) {
    const d = DAYS[(idx + i) % 7];
    const s = slotFor(d);
    if (s) return { open: false, label: `Closed · opens ${i === 1 ? "tomorrow" : d.slice(0, 3)} ${fmt(s.opens)}` };
  }
  return { open: false, label: "Closed" };
}
