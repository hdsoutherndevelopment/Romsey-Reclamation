"use client";

import { useEffect, useState } from "react";
import { openStatus } from "@/lib/hours";

/* Live "Open now / Closed" pill. Renders nothing on the server so it never shows a stale build-time status. */
export function OpenStatus({ className = "" }: { className?: string }) {
  const [s, setS] = useState<ReturnType<typeof openStatus> | null>(null);
  useEffect(() => {
    const tick = () => setS(openStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  if (!s) return <span className={`inline-block min-h-[1.5em] ${className}`} aria-hidden="true" />;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {s.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7fbf6a] opacity-70" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${s.open ? "bg-[#7fbf6a]" : "bg-brick"}`} />
      </span>
      {s.label}
    </span>
  );
}
