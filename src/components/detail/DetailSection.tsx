import type { ReactNode } from "react";

type DetailSectionProps = {
  id: string;
  title: string;
  /** Optional short note under the heading, such as the scope of the section. */
  note?: ReactNode;
  children: ReactNode;
};

/**
 * A section of a detail page: heading in a narrow column on a hairline, content beside it.
 * Quieter than the homepage SectionHeading, because detail pages carry many sections.
 */
export function DetailSection({ id, title, note, children }: DetailSectionProps) {
  return (
    <section aria-labelledby={id} className="page-container mt-[clamp(3rem,6vw,5rem)]">
      <div className="grid gap-6 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 id={id} className="text-display-md text-ivory">
            {title}
          </h2>
          {note && <p className="mt-3 max-w-sm text-label text-ash">{note}</p>}
        </div>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
