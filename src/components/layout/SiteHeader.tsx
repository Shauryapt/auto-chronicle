import Link from "next/link";
import { primaryNav } from "@/data/navigation";
import { SearchIcon } from "@/components/ui/icons";
import { StatusTag } from "@/components/ui/StatusTag";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur-sm">
      <div className="page-container relative flex h-(--header-h) items-center justify-between gap-3 sm:gap-6">
        <Wordmark />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-[0.9375rem] xl:gap-8">
            {primaryNav.map((item) => (
              <li key={item.label}>
                {item.status === "live" ? (
                  <Link
                    href={item.href}
                    className="relative py-2 text-stone transition-colors duration-(--dur-fast) hover:text-ivory after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-crimson after:transition-transform after:duration-(--dur-base) after:ease-soft hover:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 text-ash" aria-disabled="true">
                    {item.label}
                    <StatusTag>Soon</StatusTag>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* A plain anchor, so the hash change can move focus into the search field. */}
          <a
            href="#search"
            className="inline-flex min-h-11 items-center gap-2.5 rounded-xs border border-line-strong px-3.5 text-[0.9375rem] text-ivory transition-colors duration-(--dur-fast) hover:border-ivory sm:min-w-52 lg:min-w-0 xl:min-w-52"
          >
            <SearchIcon />
            <span className="sr-only sm:not-sr-only lg:sr-only xl:not-sr-only">Search the archive</span>
          </a>
          <MobileMenu items={primaryNav} />
        </div>
      </div>
    </header>
  );
}
