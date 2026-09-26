import { BrickMark } from "@/components/site/Logo";

// Re-mounts on every navigation: a brass-edged curtain lifts off each new page, then the content settles in.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="curtain" aria-hidden="true"><BrickMark className="h-10 w-20" /></div>
      <div className="page-in">{children}</div>
    </>
  );
}
