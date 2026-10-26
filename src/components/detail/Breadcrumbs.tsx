import Link from "next/link";

export type Crumb = { label: string; href?: string };

/** Where this page sits in the archive. The last crumb is the current page and is not a link. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-label text-ash">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className="text-line-strong">
                /
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className="link-quiet hover:text-ivory">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-stone">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
