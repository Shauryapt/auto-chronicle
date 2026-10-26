import Image from "next/image";
import type { CSSProperties } from "react";
import heroImage from "@/assets/images/hero-mercedes-300sl-gullwing.jpg";
import { imageCredits } from "@/data/image-credits";
import { ButtonLink } from "@/components/ui/ButtonLink";

const headlineLines = ["Every Car.", "Every Era.", "Every Story."];
const credit = imageCredits["hero-300sl"];

function delay(ms: number) {
  return { "--enter-delay": `${ms}ms` } as CSSProperties;
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="page-container relative z-10 pt-[clamp(2rem,5vw,4.5rem)]">
        <p className="enter-rise text-label font-medium tracking-[0.18em] text-crimson-text">
          THE WORLD OF AUTOMOBILES
        </p>

        <div className="mt-5 grid gap-8 lg:mt-7 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h1 id="hero-title" className="text-display-xl text-ivory lg:col-span-8">
            {headlineLines.map((line, i) => (
              <span key={line} className="enter-rise block" style={delay(120 + i * 110)}>
                {line}
              </span>
            ))}
          </h1>

          <div className="enter-rise flex flex-col gap-7 lg:col-span-4 lg:pb-2" style={delay(520)}>
            <p className="max-w-[34rem] text-lede text-stone">
              Explore the machines, marques and moments that shaped automotive history — from pioneering classics
              to the next generation of performance.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href="/#archive">Explore the Archive</ButtonLink>
              <ButtonLink href="/#manufacturers" variant="secondary">
                Discover Manufacturers
              </ButtonLink>
            </div>
            <p className="hidden border-l border-crimson pl-4 text-label text-ash sm:block">
              An encyclopedia in progress, covering marques, models and the eras that connect them.
            </p>
          </div>
        </div>
      </div>

      <figure className="relative mt-10 lg:-mt-[clamp(3rem,7vw,8rem)]">
        <div className="enter-plate relative aspect-4/3 overflow-hidden sm:aspect-video lg:aspect-[2.15/1]">
          <Image
            src={heroImage}
            alt="A deep red Mercedes-Benz 300 SL Gullwing coupé from the 1950s, parked on gravel in front of a dark hedge"
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className="photo-grade object-cover object-[28%_62%] sm:object-[40%_60%] lg:object-[50%_58%]"
          />
          {/* Legibility: fade the top into the page for the overlapping headline, and settle the bottom edge. */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-ink to-transparent lg:h-1/2 lg:from-ink lg:via-ink/70" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-ink to-transparent" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(19_18_17/0.55)_100%)]" />
        </div>
        <figcaption className="page-container relative -mt-10 flex justify-end text-label text-ash">
          <span className="max-w-md text-right">
            Mercedes-Benz 300 SL (W198) Gullwing. Photograph by{" "}
            <a href={credit.sourceUrl} className="link-quiet">
              {credit.creator}
            </a>
            , {credit.license}.
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
