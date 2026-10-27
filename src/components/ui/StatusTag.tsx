import type { ReactNode } from "react";

/** A small bordered tag for content status, such as "Core facts sourced" or "Directory entry". */
export function StatusTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-xs border border-line-strong px-1.5 py-0.5 text-[0.6875rem] leading-none font-medium tracking-[0.02em] text-stone">
      {children}
    </span>
  );
}
