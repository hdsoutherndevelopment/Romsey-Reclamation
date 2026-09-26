import { ART_KINDS, ART_SEEDS, parseArtName, renderArt } from "@/lib/art";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ART_KINDS.flatMap((k) => ART_SEEDS.map((s) => ({ name: `${k}-${s}.svg` })));
}

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const p = parseArtName(name);
  if (!p) return new Response("Not found", { status: 404 });
  return new Response(renderArt(p.kind, p.seed), {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
