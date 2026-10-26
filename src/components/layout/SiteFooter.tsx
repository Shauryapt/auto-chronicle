import Link from "next/link";
import { imageCreditList } from "@/data/image-credits";
import { logoCreditList } from "@/data/logo-credits";
import { futurePages, homeSections } from "@/data/navigation";
import { StatusTag } from "@/components/ui/StatusTag";
import { Wordmark } from "@/components/ui/Wordmark";
import { CopyrightYear } from "./CopyrightYear";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-raised">
      <div className="page-container grid gap-12 pt-14 pb-10 md:grid-cols-12 md:gap-8 md:pt-16">
        <div className="md:col-span-5">
          <Wordmark size="footer" />
          <p className="mt-5 font-display text-display-sm text-stone italic">Every Car. Every Era. Every Story.</p>
        </div>

        <nav aria-label="Homepage sections" className="md:col-span-3">
          <h2 className="font-sans text-label font-medium text-ash">Explore</h2>
          <ul className="mt-4 space-y-1">
            {homeSections.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="link-quiet inline-flex min-h-9 items-center text-stone hover:text-ivory">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="font-sans text-label font-medium text-ash">Coming to Auto Chronicle</h2>
          <ul className="mt-4 space-y-1">
            {futurePages.map((page) => (
              <li key={page} className="flex min-h-9 items-center gap-3 text-ash">
                {page}
                <StatusTag>Page in preparation</StatusTag>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="page-container">
        <details className="group border-t border-line py-6">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-stone transition-colors hover:text-ivory [&::-webkit-details-marker]:hidden">
            <span>Photography and logo credits</span>
            <span aria-hidden className="text-xl leading-none transition-transform duration-(--dur-base) group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 max-w-prose text-label text-ash">
            All photographs are from Wikimedia Commons and are used under the licences listed. Images have been
            resized, cropped and colour-graded for this site.
          </p>
          <ol className="mt-6 grid gap-x-8 gap-y-4 text-label text-stone sm:grid-cols-2 lg:grid-cols-3">
            {imageCreditList.map((credit) => (
              <li key={credit.id}>
                <a href={credit.sourceUrl} className="link-quiet text-ivory">
                  {credit.subject}
                </a>
                <span className="block text-ash">
                  Photo by {credit.creator},{" "}
                  <a href={credit.licenseUrl} className="link-quiet" rel="license">
                    {credit.license}
                  </a>
                </span>
              </li>
            ))}
          </ol>

          <h3 className="mt-10 font-sans text-label font-medium text-stone">Manufacturer logos</h3>
          <p className="mt-3 max-w-prose text-label text-ash">
            Logo files are from Wikimedia Commons, where they are marked public domain as simple text or shape logos.
            They remain trademarks of their owners and are shown only to identify each manufacturer. Most are displayed
            in a single ivory tone.
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-4 text-label text-stone sm:grid-cols-2 lg:grid-cols-3">
            {logoCreditList.map((credit) => (
              <li key={credit.id}>
                <a href={credit.sourceUrl} className="link-quiet text-ivory">
                  {credit.manufacturer}
                </a>
                <span className="block text-ash">
                  <a href={credit.licenseUrl} className="link-quiet" rel="license">
                    {credit.license}
                  </a>
                  , trademark of its owner
                </span>
              </li>
            ))}
          </ul>
        </details>

        <div className="flex flex-col gap-3 border-t border-line py-8 text-label text-ash md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> Auto Chronicle. Sample content shown while the archive is being written.
          </p>
          <p>Independent. Not affiliated with any manufacturer named on this site.</p>
        </div>
      </div>
    </footer>
  );
}
