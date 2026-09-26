import type { ArtKind } from "./art";

// Content sourced from romseyreclamation.com and public directory listings (Salvo).
// Stock changes daily — descriptions stay general on purpose. No prices are shown unless the old site published one.

export type Art = { kind: ArtKind; seed: number; photo?: string };
export type Tag = "Reclaimed" | "New" | "Seasoned" | "Salvage" | "Service";
export type Item = { name: string; description: string; spec?: string; price?: string; tag?: Tag };
export type Spec = { label: string; value: string };

export type Category = {
  slug: string;
  title: string;
  menuTitle: string;
  short: string;
  intro: string[];
  hero: Art;
  gallery: { art: Art; caption: string }[];
  items: Item[];
  specs?: { title: string; rows: Spec[] };
  note?: { title: string; body: string };
  related: string[];
};

export const categories: Category[] = [
  {
    slug: "sleepers",
    title: "Railway Sleepers",
    menuTitle: "Railway Sleepers",
    short: "Reclaimed and new sleepers in hardwood, oak and pine — one of the largest stocks in the south.",
    intro: [
      "We are major importers of quality reclaimed railway sleepers, supplying the home and European markets for commercial, industrial, agricultural and civil engineering work — as well as the garden projects most people come to us for.",
      "Alongside reclaimed sleepers we carry new sleepers in oak, hardwood and tanalised pine. Strictly speaking these are bulk timbers that have never seen a railway, but they share the size and strength of the originals and suit raised beds, retaining walls, steps and edging.",
    ],
    hero: { kind: "sleeper", seed: 1 },
    gallery: [
      { art: { kind: "sleeper", seed: 4 }, caption: "Reclaimed sleepers, stacked in the yard" },
      { art: { kind: "boards", seed: 5 }, caption: "New oak sleepers, some with lightly chamfered edges" },
      { art: { kind: "sleeper", seed: 7 }, caption: "Chair marks and bolt holes on reclaimed stock" },
    ],
    items: [
      { name: "Reclaimed railway sleepers", tag: "Reclaimed", description: "Weathered hardwood sleepers lifted from the railways. Full character — chair marks, bolt holes and all.", spec: "Regular size up to 8ft 6in long, plus 5ft lengths" },
      { name: "New oak sleepers", tag: "New", description: "Almost perfectly regular blocks of oak. Around one in ten has a lightly chamfered edge for a more natural look. Ideal for raised flower beds." },
      { name: "New hardwood sleepers", tag: "New", description: "Dense, durable new hardwood for retaining walls, steps and heavy-duty landscaping." },
      { name: "New pine sleepers, tanalised green", tag: "New", description: "Pressure-treated pine sleepers — a cost-effective choice for edging and beds.", spec: "7ft 10in (2.4m) × 8in (200mm) × 4in (100mm)", price: "£24.50 each + VAT" /* CONFIRM — price from old site */ },
      { name: "Trade sleepers", tag: "Reclaimed", description: "Bulk quantities for landscapers, contractors and agricultural use. Call to discuss trade pricing and full loads." },
    ],
    specs: {
      title: "Delivery quantities",
      rows: [
        { label: "Minimum delivery", value: "10 × 8ft 6in sleepers, or 10 × 5ft sleepers" },
        { label: "Full load — regular (up to 8ft 6in)", value: "120 sleepers" },
        { label: "Full load — 5ft", value: "200 sleepers" },
      ],
    },
    related: ["oak", "paving", "bricks"],
  },
  {
    slug: "bricks",
    title: "Reclaimed Bricks",
    menuTitle: "Bricks",
    short: "Reclaimed and new bricks, from red stocks to Tudor bricks, with a brick matching service.",
    intro: [
      "Over the years we have sold several million bricks. The yard holds reclaimed bricks cleaned and palletised ready to go, alongside new bricks and period finds such as Tudor bricks.",
      "Working on an extension, repair or listed building? Bring a sample and we will help match colour, size and texture from stock — a service we have offered for decades.",
    ],
    hero: { kind: "brick", seed: 2 },
    gallery: [
      { art: { kind: "brick", seed: 5 }, caption: "Reclaimed red bricks with lime mortar traces" },
      { art: { kind: "stock", seed: 3 }, caption: "Yellow stock bricks" },
      { art: { kind: "brick", seed: 9 }, caption: "Mixed reds for period repairs" },
    ],
    items: [
      { name: "Reclaimed bricks", tag: "Reclaimed", description: "Cleaned, palletised reclaimed bricks in a range of reds, multis and stocks." },
      { name: "Tudor bricks", tag: "Reclaimed", description: "Thin, handmade-character bricks for restoration and feature work. Availability varies." },
      { name: "New bricks", tag: "New", description: "New clay bricks for projects where reclaimed stock isn’t the right fit." },
      { name: "Brick matching", tag: "Service", description: "Bring a sample or send a photo and we’ll match it from stock." },
    ],
    specs: {
      title: "Delivery quantities",
      rows: [
        { label: "Minimum delivery", value: "500 bricks (1 pallet)" },
        { label: "Full load", value: "5,000 bricks (10 pallets)" },
      ],
    },
    related: ["roof-tiles", "stone", "fireplaces"],
  },
  {
    slug: "roof-tiles",
    title: "Roof Tiles & Slates",
    menuTitle: "Roof Tiles & Slates",
    short: "Reclaimed plain tiles, slates, ridges, finials and chimney pots — and a tile matching service.",
    intro: [
      "Roofing is where the business started. We know our tiles, and over the years have sold millions of reclaimed tiles and slates to homeowners, roofers and restorers.",
      "Matching an old roof is our speciality. Bring a sample tile and we will find the closest weathered match from stock, so repairs and extensions blend in rather than stand out.",
    ],
    hero: { kind: "tile", seed: 3 },
    gallery: [
      { art: { kind: "tile", seed: 6 }, caption: "Reclaimed plain clay tiles with natural lichen" },
      { art: { kind: "slate", seed: 2 }, caption: "Reclaimed roof slates" },
      { art: { kind: "chimney", seed: 4 }, caption: "Chimney pots" },
    ],
    items: [
      { name: "Reclaimed plain roof tiles", tag: "Reclaimed", description: "Handmade and machine-made clay plain tiles, weathered and ready to lay." },
      { name: "Reclaimed roof slates", tag: "Reclaimed", description: "Natural slates in a range of sizes for repairs and full re-roofs." },
      { name: "Redland Delta roof tiles", tag: "Reclaimed", description: "Concrete interlocking tiles for matching later roofs." },
      { name: "Finials & ridges", tag: "Salvage", description: "Ridge tiles, hips and decorative finials to complete a period roofline." },
      { name: "Chimney pots", tag: "Salvage", description: "Terracotta and buff pots in many profiles — functional or as garden planters." },
      { name: "Tile matching", tag: "Service", description: "Bring a sample tile and we’ll find the closest match from stock." },
    ],
    specs: {
      title: "Delivery quantities",
      rows: [
        { label: "Minimum delivery", value: "600 plain tiles" },
        { label: "Full load", value: "9,000 – 12,000 plain tiles, depending on thickness and packing" },
      ],
    },
    related: ["bricks", "reclaimed", "oak"],
  },
  {
    slug: "oak",
    title: "Oak & Timber",
    menuTitle: "Oak & Timber",
    short: "Our Oak Centre: seasoned beams, slabs, boards, flooring and specialist timbers.",
    intro: [
      "Our dedicated Oak Centre carries an ever-changing selection of seasoned oak beams, air-dried slabs, kiln-dried boards, oak flooring and specialist timbers.",
      "Whether you are restoring a building, creating a feature fireplace or looking for quality oak for construction or landscaping, we always recommend a visit to see the latest stock — no two beams are the same.",
    ],
    hero: { kind: "beams", seed: 1 },
    gallery: [
      { art: { kind: "beams", seed: 6 }, caption: "Seasoned oak beams, stacked on stickers" },
      { art: { kind: "boards", seed: 2 }, caption: "Oak flooring" },
      { art: { kind: "scaffold", seed: 3 }, caption: "Reclaimed scaffold boards" },
      { art: { kind: "poles", seed: 2 }, caption: "Telegraph poles" },
    ],
    items: [
      { name: "Seasoned oak beams", tag: "Seasoned", description: "Oak beams that have done much of their drying in the yard — more stable for restoration and interior work." },
      { name: "Reclaimed oak beams & joists", tag: "Reclaimed", description: "Old oak with genuine age, saw marks and patina. Elm beams also appear in stock." },
      { name: "Oak fireplace beams", tag: "Seasoned", description: "Selected beams for lintels and mantels, cut to length on request." },
      { name: "Air-dried slabs & kiln-dried boards", tag: "Seasoned", description: "For worktops, tables, shelving and joinery." },
      { name: "Oak flooring", tag: "New", description: "Oak floorboards, plus reclaimed wooden floorboards in oak and pine when available." },
      { name: "Scaffold boards", tag: "Reclaimed", description: "Used scaffold boards for shelving, furniture, garden beds and rustic cladding." },
      { name: "Reclaimed & treated timber", tag: "Reclaimed", description: "Resawn beams, reclaimed timber and pressure-treated timber for building and landscaping." },
      { name: "Telegraph poles", tag: "Reclaimed", description: "For posts, bollards, retaining and agricultural use.", spec: "Minimum delivery 100ft; full load 30 lengths at 15ft or less" },
      { name: "Plywood sheets", tag: "New", description: "Plywood sheet stock for construction and outbuildings." },
      { name: "Oak timber services", tag: "Service", description: "Talk to us about cutting, sizing and sourcing oak for your project." },
    ],
    related: ["fireplaces", "sleepers", "doors"],
  },
  {
    slug: "doors",
    title: "Reclaimed Doors",
    menuTitle: "Doors",
    short: "Period internal and external doors — ledged, braced and panelled.",
    intro: [
      "Old doors bring proportion and patina that new joinery struggles to copy. Our stock turns over constantly, with ledged-and-braced cottage doors, panelled doors and the occasional statement front door.",
      "Bring your opening sizes when you visit — we’ll help you find a door that fits, or one worth adapting.",
    ],
    hero: { kind: "door", seed: 1 },
    gallery: [
      { art: { kind: "door", seed: 4 }, caption: "Painted panelled door" },
      { art: { kind: "door", seed: 7 }, caption: "Ledged cottage door with strap hinges" },
      { art: { kind: "door", seed: 10 }, caption: "Doors come and go quickly — visit for current stock" },
    ],
    items: [
      { name: "Ledged & braced doors", tag: "Reclaimed", description: "Plank doors for cottages, barns and outbuildings." },
      { name: "Panelled doors", tag: "Reclaimed", description: "Four-panel and period internal doors, many with original paintwork." },
      { name: "External & front doors", tag: "Reclaimed", description: "Solid doors with character for entrances and porches." },
      { name: "Door furniture", tag: "Salvage", description: "Hinges, latches and handles when available." },
    ],
    related: ["gates", "oak", "reclaimed"],
  },
  {
    slug: "gates",
    title: "Gates",
    menuTitle: "Gates",
    short: "Field gates, garden gates and iron gates from salvage.",
    intro: [
      "From timber five-bar field gates to wrought-iron garden gates, reclaimed gates bring instant age to an entrance.",
      "Stock varies week to week. Tell us the opening width and style you need and we’ll let you know what’s in.",
    ],
    hero: { kind: "gate", seed: 2 },
    gallery: [
      { art: { kind: "gate", seed: 5 }, caption: "Timber field gate" },
      { art: { kind: "walling", seed: 8 }, caption: "Pair with reclaimed walling stone" },
      { art: { kind: "setts", seed: 4 }, caption: "Granite setts for driveways and entrances" },
    ],
    items: [
      { name: "Timber field gates", tag: "Reclaimed", description: "Five-bar and farm gates for driveways, paddocks and fields." },
      { name: "Garden gates", tag: "Reclaimed", description: "Pedestrian gates in timber and metal." },
      { name: "Iron gates", tag: "Salvage", description: "Wrought and cast iron gates, sometimes in matching pairs." },
      { name: "Gate posts", tag: "Reclaimed", description: "Timber and stone posts to hang them on." },
    ],
    related: ["doors", "paving", "stone"],
  },
  {
    slug: "paving",
    title: "Paving & Stone",
    menuTitle: "Paving & Stone",
    short: "The Paving Centre: York flagstones, granite setts, cobbles, quarry tiles and Purbeck stone.",
    intro: [
      "Our Paving Centre holds reclaimed York flagstones, granite setts and cobbles, quarry tiles and natural stone — materials that have already weathered beautifully and will keep on doing so.",
      "Reclaimed paving suits period properties, courtyards and gardens where new stone would look out of place. Bring measurements and we’ll help you work out quantities.",
    ],
    hero: { kind: "flagstone", seed: 1 },
    gallery: [
      { art: { kind: "setts", seed: 2 }, caption: "Granite setts laid in a fan" },
      { art: { kind: "flagstone", seed: 6 }, caption: "Reclaimed York flagstones" },
      { art: { kind: "quarry", seed: 3 }, caption: "Quarry tiles" },
    ],
    items: [
      { name: "York flagstones", tag: "Reclaimed", description: "Riven and sawn York stone for patios, paths and interiors.", spec: "Minimum delivery 3 square metres" },
      { name: "Granite setts & cobbles", tag: "Reclaimed", description: "Hard-wearing setts for driveways, edging and courtyards." },
      { name: "Quarry tiles", tag: "Reclaimed", description: "Red and black clay quarry tiles for floors in kitchens, halls and garden rooms." },
      { name: "Purbeck stone", tag: "Reclaimed", description: "Dorset limestone for paving and walling." },
      { name: "Natural reclaimed stone", tag: "Reclaimed", description: "Mixed natural stone for paths, steps and landscaping." },
    ],
    related: ["stone", "sleepers", "gates"],
  },
  {
    slug: "stone",
    title: "Walling & Natural Stone",
    menuTitle: "Walling Stone",
    short: "Walling stone, Purbeck, troughs and reclaimed natural stone.",
    intro: [
      "Reclaimed walling stone has already been cut, weathered and softened by time. It’s the fastest way to build a new wall that looks like it’s always been there.",
      "We also stock Purbeck stone, stone troughs and a changing mix of natural reclaimed stone for landscaping and repairs.",
    ],
    hero: { kind: "walling", seed: 2 },
    gallery: [
      { art: { kind: "walling", seed: 5 }, caption: "Reclaimed walling stone" },
      { art: { kind: "flagstone", seed: 9 }, caption: "Natural stone paving" },
      { art: { kind: "setts", seed: 8 }, caption: "Setts and cobbles" },
    ],
    items: [
      { name: "Walling stone", tag: "Reclaimed", description: "Mixed reclaimed stone for garden and boundary walls." },
      { name: "Purbeck stone", tag: "Reclaimed", description: "Dorset limestone for walling and paving." },
      { name: "Stone troughs", tag: "Salvage", description: "Planters and water troughs with real age." },
      { name: "Natural reclaimed stone", tag: "Reclaimed", description: "Steps, copings and landscaping stone as it comes in." },
    ],
    related: ["paving", "bricks", "reclaimed"],
  },
  {
    slug: "fireplaces",
    title: "Fireplaces",
    menuTitle: "Fireplaces",
    short: "Fireplaces, surrounds and oak fireplace beams.",
    intro: [
      "A fireplace is often the heart of a room. We stock reclaimed fireplaces and surrounds alongside seasoned oak beams for inglenooks and mantels.",
      "Combine an oak beam with reclaimed bricks and quarry tiles for a hearth that looks original to the house.",
    ],
    hero: { kind: "fireplace", seed: 1 },
    gallery: [
      { art: { kind: "fireplace", seed: 5 }, caption: "Inglenook with oak lintel" },
      { art: { kind: "beams", seed: 9 }, caption: "Oak fireplace beams" },
      { art: { kind: "quarry", seed: 7 }, caption: "Quarry tiles for hearths" },
    ],
    items: [
      { name: "Reclaimed fireplaces", tag: "Salvage", description: "Surrounds and fireplaces in stone, timber and iron as they come in." },
      { name: "Oak fireplace beams", tag: "Seasoned", description: "Seasoned oak for lintels and mantel shelves." },
      { name: "Hearth materials", tag: "Reclaimed", description: "Bricks, quarry tiles and flagstones for hearths." },
    ],
    related: ["oak", "bricks", "reclaimed"],
  },
  {
    slug: "reclaimed",
    title: "Architectural Salvage",
    menuTitle: "Reclaimed Materials",
    short: "Chimney pots, cast iron radiators, signs, post boxes, farm equipment and furniture.",
    intro: [
      "Beyond the core building materials, the yard is full of salvage with a story: cast iron radiators, chimney pots, signs, post boxes, troughs, old agricultural and farming equipment, and furniture for inside and out.",
      "Stock arrives constantly and at times we carry close to a thousand different products. If you’re hunting for something specific, call us — and if you have salvage to sell, we buy too.",
    ],
    hero: { kind: "chimney", seed: 1 },
    gallery: [
      { art: { kind: "radiator", seed: 3 }, caption: "Cast iron column radiators" },
      { art: { kind: "chimney", seed: 6 }, caption: "Chimney pots" },
      { art: { kind: "scaffold", seed: 8 }, caption: "Reclaimed timber for furniture" },
    ],
    items: [
      { name: "Cast iron radiators", tag: "Salvage", description: "Column radiators for period homes." },
      { name: "Chimney pots", tag: "Salvage", description: "Many profiles and sizes, for roofs or planting." },
      { name: "Finials & ridges", tag: "Salvage", description: "Decorative roof pieces." },
      { name: "Signs & post boxes", tag: "Salvage", description: "Original enamel signs, post boxes and street furniture." },
      { name: "Agricultural & farming equipment", tag: "Salvage", description: "Old farm machinery and implements — decorative or functional." },
      { name: "Troughs", tag: "Salvage", description: "Stone and metal troughs." },
      { name: "Garden & internal furniture", tag: "Salvage", description: "Benches, tables and one-off pieces." },
      { name: "Crash barriers", tag: "Reclaimed", description: "Used crash barriers for agricultural and site use.", spec: "Minimum delivery 10; full load 350" },
    ],
    related: ["roof-tiles", "fireplaces", "doors"],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

// Homepage category tiles (brief order)
export const homeCategories = [
  { slug: "bricks", label: "Reclaimed Bricks", art: { kind: "brick", seed: 3 } as Art },
  { slug: "sleepers", label: "Railway Sleepers", art: { kind: "sleeper", seed: 2 } as Art },
  { slug: "oak", label: "Oak & Timber", art: { kind: "beams", seed: 3 } as Art },
  { slug: "roof-tiles", label: "Roof Tiles & Slates", art: { kind: "tile", seed: 1 } as Art },
  { slug: "doors", label: "Doors & Gates", art: { kind: "door", seed: 2 } as Art },
  { slug: "paving", label: "Paving & Stone", art: { kind: "setts", seed: 1 } as Art },
];

export const featured: { name: string; href: string; description: string; tag: Tag; art: Art; price?: string }[] = [
  { name: "Reclaimed Railway Sleepers", href: "/sleepers", tag: "Reclaimed", description: "Weathered hardwood with chair marks and bolt holes. 8ft 6in and 5ft lengths.", art: { kind: "sleeper", seed: 3 } },
  { name: "Reclaimed Bricks", href: "/bricks", tag: "Reclaimed", description: "Cleaned and palletised. Bring a sample for matching.", art: { kind: "brick", seed: 6 } },
  { name: "Seasoned Oak Beams", href: "/oak", tag: "Seasoned", description: "Air-dried in the yard for stability. Every beam different.", art: { kind: "beams", seed: 4 } },
  { name: "Reclaimed Doors", href: "/doors", tag: "Reclaimed", description: "Ledged, braced and panelled doors with original paint.", art: { kind: "door", seed: 5 } },
  { name: "York Flagstone", href: "/paving", tag: "Reclaimed", description: "Riven and sawn York stone for patios and floors.", art: { kind: "flagstone", seed: 3 } },
  { name: "Roof Tiles", href: "/roof-tiles", tag: "Reclaimed", description: "Weathered clay plain tiles, matched to your roof.", art: { kind: "tile", seed: 5 } },
  { name: "Granite Sets", href: "/paving", tag: "Reclaimed", description: "Hard-wearing setts and cobbles for drives and courtyards.", art: { kind: "setts", seed: 6 } },
  { name: "Reclaimed Flooring", href: "/oak", tag: "Reclaimed", description: "Oak and pine floorboards with genuine wear.", art: { kind: "boards", seed: 4 } },
];

// Full A–Z of regular stock for the Products page
export const inventory: { name: string; slug: string }[] = [
  ["Reclaimed railway sleepers", "sleepers"], ["New railway sleepers", "sleepers"], ["Reclaimed bricks", "bricks"], ["New bricks", "bricks"],
  ["Roof tiles", "roof-tiles"], ["Roof slates", "roof-tiles"], ["Scaffold boards", "oak"], ["Oak flooring", "oak"], ["Reclaimed oak beams", "oak"],
  ["Oak timber", "oak"], ["Reclaimed doors", "doors"], ["Gates", "gates"], ["Fireplaces", "fireplaces"], ["Garden furniture", "reclaimed"],
  ["Internal furniture", "reclaimed"], ["Paving", "paving"], ["Granite sets and cobbles", "paving"], ["Natural reclaimed stone", "stone"],
  ["Purbeck stone", "stone"], ["Quarry tiles", "paving"], ["York flagstones", "paving"], ["Walling stone", "stone"], ["Cast iron radiators", "reclaimed"],
  ["Chimney pots", "reclaimed"], ["Finials and ridges", "roof-tiles"], ["Agricultural and farming equipment", "reclaimed"], ["Signs", "reclaimed"],
  ["Post boxes", "reclaimed"], ["Telegraph poles", "oak"], ["Timber", "oak"], ["Treated timber", "oak"], ["Troughs", "stone"], ["Plywood sheets", "oak"],
  ["Crash barriers", "reclaimed"], ["Tudor bricks", "bricks"],
]
  .map(([name, slug]) => ({ name, slug }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const projects: { title: string; description: string; materials: { label: string; href: string }[]; art: Art }[] = [
  { title: "Outbuildings & large sheds", description: "Oak frames, reclaimed tiles and weatherboarding for garden rooms, workshops and stores.", materials: [{ label: "Oak", href: "/oak" }, { label: "Roof tiles", href: "/roof-tiles" }], art: { kind: "beams", seed: 8 } },
  { title: "Restoration", description: "Matched bricks, tiles and timber for repairs that disappear into the original building.", materials: [{ label: "Bricks", href: "/bricks" }, { label: "Tiles", href: "/roof-tiles" }], art: { kind: "stock", seed: 7 } },
  { title: "Garden structures", description: "Raised beds, steps and retaining walls in reclaimed and new sleepers.", materials: [{ label: "Sleepers", href: "/sleepers" }], art: { kind: "sleeper", seed: 9 } },
  { title: "Landscaping", description: "Patios, paths and drives in York stone, granite setts and walling stone.", materials: [{ label: "Paving", href: "/paving" }, { label: "Stone", href: "/stone" }], art: { kind: "setts", seed: 10 } },
  { title: "Feature fireplaces", description: "Oak beam lintels, reclaimed brick and quarry-tile hearths.", materials: [{ label: "Fireplaces", href: "/fireplaces" }, { label: "Oak", href: "/oak" }], art: { kind: "fireplace", seed: 3 } },
  { title: "Interiors", description: "Oak floors, cast iron radiators, reclaimed doors and one-off salvage.", materials: [{ label: "Doors", href: "/doors" }, { label: "Salvage", href: "/reclaimed" }], art: { kind: "radiator", seed: 6 } },
];
