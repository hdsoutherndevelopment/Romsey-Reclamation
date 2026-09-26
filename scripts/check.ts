// Self-check for the pure logic (calculators + opening hours). Run: npm run check
import assert from "node:assert/strict";
import { bricks, paving, sleepers, tiles } from "../lib/calculators";
import { openStatus } from "../lib/hours";

// 3m × 1.2m bed, 2 high, 2.59m sleepers: long sides 2 each, short sides 1 each → 6 per course → 12
assert.equal(sleepers(3, 1.2, 2, "reclaimed-8ft6")!.qty, 12);
assert.equal(sleepers(5, 0, 1, "reclaimed-8ft6")!.qty, 2); // edging run
assert.equal(sleepers(0, 1, 1, "reclaimed-8ft6"), null);
assert.match(sleepers(1, 1, 1, "reclaimed-5ft")!.delivery, /Below/);

assert.equal(bricks(5, 1.2, "half")!.qty, 396); // 6m² × 60 × 1.1
assert.equal(bricks(5, 1.2, "one")!.qty, 792);
assert.equal(tiles(20)!.qty, 1260); // 20 × 60 × 1.05
assert.equal(paving(4, 3)!.qty, 13.2);
assert.equal(paving(-1, 3), null);

// Europe/London: 2026-09-28 is a Monday (BST, UTC+1)
assert.equal(openStatus(new Date("2026-09-28T09:00:00Z")).open, true); // 10:00
assert.match(openStatus(new Date("2026-09-28T06:00:00Z")).label, /opens 8am today/); // 07:00
assert.match(openStatus(new Date("2026-09-28T15:30:00Z")).label, /opens tomorrow 8am/); // 16:30
assert.match(openStatus(new Date("2026-10-03T11:30:00Z")).label, /opens Mon 8am/); // Sat 12:30
assert.equal(openStatus(new Date("2026-10-03T07:20:00Z")).label, "Open now · closes 12pm"); // Sat 08:20
assert.match(openStatus(new Date("2026-12-07T08:30:00Z")).label, /Open now · closes 4pm/); // GMT, Mon 08:30

console.log("checks passed");
