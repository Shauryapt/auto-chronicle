import Image from "next/image";
import { eras } from "@/data/eras";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EraTimeline() {
  return (
    <section id="archive" aria-labelledby="archive-title" className="section-y bg-ink-raised">
      <div className="page-container">
        <SectionHeading
          id="archive-title"
          title="The Archive, era by era"
          aside="Era overviews are broad summaries. Dated milestones will be added with sources."
        >
          Motoring history, read in four broad periods. Each one changed what a car was for and who could own one.
        </SectionHeading>

        <ol className="mt-(--heading-gap) relative grid gap-12 border-l border-line pl-6 sm:pl-8 lg:grid-cols-4 lg:gap-8 lg:border-t lg:border-l-0 lg:pt-10 lg:pl-0">
          {eras.map((era) => (
            <li key={era.slug} id={`era-${era.slug}`} className="reveal relative">
              {/* Marker on the timeline rule: left rule on small screens, top rule on large. */}
              <span
                aria-hidden
                className="absolute top-2 -left-[calc(1.5rem+4.5px)] size-2 rotate-45 bg-crimson sm:-left-[calc(2rem+4.5px)] lg:-top-[calc(2.5rem+4.5px)] lg:left-0"
              />
              <p className="font-display text-display-sm text-ivory italic">{era.period}</p>
              <figure className="mt-5">
                <div className="relative aspect-4/3 overflow-hidden bg-ink-high sm:aspect-video lg:aspect-4/5">
                  <Image
                    src={era.photo.src}
                    alt={era.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 85vw, 100vw"
                    className="photo-grade object-cover"
                    style={{ objectPosition: era.photo.focus }}
                  />
                </div>
                <figcaption className="mt-2 text-label text-ash">{era.photoCaption}</figcaption>
              </figure>
              <h3 className="mt-5 text-display-sm text-ivory">{era.title}</h3>
              <p className="mt-3 max-w-prose text-stone">{era.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
