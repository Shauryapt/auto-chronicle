import Link from "next/link";

export function AnnouncementStrip() {
  return (
    <aside aria-label="About this edition" className="border-b border-line bg-ink-raised">
      <div className="page-container flex min-h-9 items-center justify-center gap-x-3 py-2 text-center text-label text-stone">
        <p>
          <span className="sm:hidden">An independent encyclopedia of the automobile.</span>
          <span className="hidden sm:inline">
            Auto Chronicle is an independent encyclopedia of the automobile, written one era at a time.
          </span>{" "}
          <Link href="/#archive" className="link-quiet whitespace-nowrap text-ivory">
            Begin with the eras
          </Link>
        </p>
      </div>
    </aside>
  );
}
