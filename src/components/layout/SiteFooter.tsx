import Link from "next/link";
import { imageCreditList } from "@/data/image-credits";
import { logoCreditList } from "@/data/logo-credits";
import { manufacturers } from "@/data/manufacturers";
import { homeSections } from "@/data/navigation";
import { vehicles } from "@/data/vehicles";
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

        {/* What the site is and how it treats facts and images, stated once and only as far as it is true. */}
        <div className="md:col-span-4">
          <h2 className="font-sans text-label font-medium text-ash">About the archive</h2>
          <div className="mt-4 max-w-prose space-y-3 text-label text-stone">
            <p>
              Auto Chronicle is an independent automotive reference covering {vehicles.length} cars and{" "}
              {manufacturers.length} manufacturers.
            </p>
            <p>
              Facts come from the sources cited on each page. Where sources disagree, the entry says so; a value they
              do not establish is left out or shown as a dash, never estimated.
            </p>
            <p>Photographs are from Wikimedia Commons, each credited under its own licence below.</p>
          </div>
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
            resized and colour-graded for this site and may be framed to fit the layout; any further change, such
            as a crop, is noted in the image’s credit on the page where it appears. Where a photograph is licensed
            CC BY-SA, the adapted version shown here is shared under the same licence.
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
            © <CopyrightYear /> Auto Chronicle. Facts cited, photographs credited.
          </p>
          <p>Independent. Not affiliated with any manufacturer named on this site.</p>
        </div>
      </div>
    </footer>
  );
}
