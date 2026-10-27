import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { imageCredits } from "@/data/image-credits";
import type { Manufacturer, Vehicle, VehicleIntro } from "@/data/types";
import { IntroControl, IntroSequence } from "./IntroSequence";

/** "911 (992 generation)" becomes ["911", "992 generation"], so the bracketed generation can sit on its own line. */
function splitName(name: string): [string, string | undefined] {
  const match = /^(.+?) \((.+)\)$/.exec(name);
  return match ? [match[1], match[2]] : [name, undefined];
}

type CinematicIntroProps = {
  car: Vehicle;
  intro: VehicleIntro;
  maker?: Manufacturer;
  /** The summary and review note, shown beneath the opening as in the standard header. */
  children: ReactNode;
};

/**
 * The opening of a car page as a short title sequence: a crimson line crosses the dark stage, the
 * name and its sourced context arrive, then the lead photograph comes up out of the dark, filling
 * most of the screen. Narrow screens show the whole photograph edge to edge with the title beneath;
 * wide screens size it to the viewport's height, across the full column, with the title resting
 * on its darkened lower edge. The timing lives in globals.css (`.intro-*`); every element rests in
 * its finished state, so the page reads fully with motion reduced, animations unsupported or the
 * sequence skipped.
 */
export function CinematicIntro({ car, intro, maker, children }: CinematicIntroProps) {
  const [title, subtitle] = splitName(car.name);
  const facts = [...car.facts, ...(car.details ?? [])];
  const context = intro.context.flatMap((label) => facts.find((f) => f.label === label) ?? []);
  const credit = imageCredits[car.photo.creditId];
  const { width, height } = car.photo.src;
  const ratio = width / height;
  const wideRatio = intro.wideCrop?.ratio ?? ratio;

  // On wide screens the photograph is as tall as the viewport allows once the site header,
  // breadcrumbs and title band (about 24rem together) are in view, and as wide as that height
  // gives at its framing, up to the full column.
  const frame = {
    "--intro-ratio": ratio.toFixed(4),
    "--intro-ratio-wide": wideRatio.toFixed(4),
    "--intro-position": intro.wideCrop?.position ?? "50% 50%",
    "--intro-w": `min(100%, calc(max(16rem, 100svh - 24rem) * ${wideRatio.toFixed(4)}))`,
  } as CSSProperties;

  return (
    <IntroSequence id={car.slug}>
      <div style={frame} className="grid lg:grid-cols-12 lg:grid-rows-[auto_1fr_auto] lg:gap-x-12">
        {/* The stage: edge to edge on narrow screens, the full column on wide ones. */}
        <div className="relative -mx-(--gutter) overflow-hidden lg:col-span-12 lg:mx-0">
          <div className="intro-mask relative mx-auto aspect-(--intro-ratio) w-full lg:aspect-(--intro-ratio-wide) lg:w-(--intro-w)">
            <Image
              src={car.photo.src}
              alt={car.photo.alt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 88rem) 88rem, 100vw"
              className="intro-photo photo-grade object-cover lg:object-(--intro-position)"
            />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_62%,rgb(19_18_17/0.5)_100%)]" />
          </div>
          <div aria-hidden className="intro-sweep absolute inset-x-0 top-[64%] h-px" />
          <div aria-hidden className="intro-glint absolute top-[64%] left-0 h-24 w-1/3" />
        </div>

        {/* Directly under the photograph on narrow screens; beneath the context on wide ones. */}
        <div className="mt-2 flex items-start justify-between gap-4 lg:col-span-6 lg:col-start-7 lg:row-start-3 lg:mt-5 xl:col-span-5 xl:col-start-8">
          {/* First in the tab order of the sequence, so Skip is the first control a keyboard user reaches. */}
          <IntroControl />
          <p className="intro-caption ml-auto pt-0.5 text-right text-label text-ash">
            {car.photo.depicts ?? credit.subject}. Photograph by{" "}
            <a href={credit.sourceUrl} className="link-quiet">
              {credit.creator}
            </a>
            , {credit.license}.
          </p>
        </div>

        <div className="relative z-10 mt-5 lg:col-span-6 lg:row-span-2 xl:col-span-7 lg:row-start-2 lg:-mt-10 lg:self-end">
          {maker && (
            <Link href={`/manufacturers/${maker.slug}`} className="intro-maker link-quiet text-label text-crimson-text">
              {maker.name}
            </Link>
          )}
          {/* With the generation on its own line, the label keeps the heading's name exactly as the record writes it. */}
          <h1 className="mt-3 text-ivory md:flex md:flex-wrap md:items-baseline md:gap-x-5" aria-label={subtitle ? car.name : undefined}>
            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em] text-display-xl md:text-display-lg">
              <span className="intro-name block">{title}</span>
            </span>
            {subtitle && (
              <span className="mt-1 block overflow-hidden pb-[0.12em] -mb-[0.12em] text-display-sm text-stone md:mt-0">
                <span className="intro-subtitle block">{subtitle}</span>
              </span>
            )}
          </h1>
          <p className="intro-kind mt-3 text-label text-ash">{car.kind}</p>
        </div>

        {context.length > 0 && (
          <div className="mt-6 lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:mt-6 lg:self-end xl:col-span-5 xl:col-start-8">
            <span aria-hidden className="intro-rule block h-px w-10 bg-crimson" />
            {/* Label above value where there is height to spare; compact label-and-value rows beside the title on wide screens. */}
            <dl className="intro-context mt-4 flex flex-wrap gap-x-10 gap-y-4 lg:grid lg:grid-cols-[auto_1fr] lg:items-baseline lg:gap-x-6 lg:gap-y-2">
              {context.map((fact) => (
                <div key={fact.label} className="lg:contents">
                  <dt className="text-label text-ash">{fact.label}</dt>
                  <dd className="mt-1 font-display text-display-sm text-ivory lg:mt-0">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <div className="intro-aside mt-10 grid border-t border-line pt-8 lg:mt-12 lg:grid-cols-12">
        <div className="lg:col-span-7">{children}</div>
      </div>
    </IntroSequence>
  );
}
