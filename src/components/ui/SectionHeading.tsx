import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  title: string;
  /** Short sentence-case context shown beside the heading, e.g. a scope note. */
  aside?: ReactNode;
  children?: ReactNode;
};

/**
 * The shared section opener: a display heading on a hairline, with optional intro copy
 * and a quiet aside. `id` is used for the heading so sections can be labelled by it.
 */
export function SectionHeading({ id, title, aside, children }: SectionHeadingProps) {
  return (
    <header className="grid gap-6 border-t border-line pt-6 md:grid-cols-12 md:gap-8">
      <h2 id={id} className="text-display-lg text-ivory md:col-span-7">
        {title}
      </h2>
      {(children || aside) && (
        <div className="flex flex-col gap-4 md:col-span-5 md:pt-2">
          {children && <p className="max-w-prose text-lede text-stone">{children}</p>}
          {aside && <p className="text-label text-ash">{aside}</p>}
        </div>
      )}
    </header>
  );
}
