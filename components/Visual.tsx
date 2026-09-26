import type { Art } from "@/lib/materials";

/* Renders a real photo when `art.photo` is set, otherwise the generative material study. */
export function Visual({ art, alt, priority = false, className = "" }: { art: Art; alt: string; priority?: boolean; className?: string }) {
  const src = art.photo ?? `/art/${art.kind}-${art.seed}.svg`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={1200}
      height={900}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
