import Image from "next/image";
import Link from "next/link";
import { stories } from "@/data/stories";
import type { Story } from "@/data/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusTag } from "@/components/ui/StatusTag";

function StoryCard({ story, lead = false }: { story: Story; lead?: boolean }) {
  return (
    <article
      className={`group relative flex flex-col ${lead ? "h-full" : "sm:grid sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:items-start sm:gap-6"}`}
    >
      <div className={`relative overflow-hidden bg-ink-high ${lead ? "aspect-4/3 lg:aspect-16/10" : "aspect-3/2 sm:aspect-4/5"}`}>
        <Image
          src={story.photo.src}
          alt={story.photo.alt}
          fill
          sizes={lead ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 100vw"}
          className="photo-grade object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.035] group-focus-within:scale-[1.035] motion-reduce:transition-none"
          style={{ objectPosition: story.photo.focus }}
        />
      </div>

      <div className={`flex flex-1 flex-col ${lead ? "pt-6" : "pt-5 sm:pt-0"}`}>
        <div className="flex flex-wrap items-center gap-3 text-label">
          <span className="text-crimson-text">{story.theme}</span>
          <StatusTag>Illustrative feature</StatusTag>
        </div>
        <h3 className={`mt-3 text-ivory ${lead ? "text-display-md" : "text-display-sm"}`}>{story.title}</h3>
        <p className={`mt-3 text-stone ${lead ? "max-w-prose text-lede" : ""}`}>{story.dek}</p>
        <p className={`text-label text-ash ${lead ? "mt-auto pt-5" : "mt-4"}`}>
          Related:{" "}
          {/* The link's hit area covers the whole card. */}
          <Link
            href={story.related.href}
            className="link-quiet text-ivory after:absolute after:inset-0 after:content-['']"
          >
            {story.related.label}
          </Link>
        </p>
      </div>
    </article>
  );
}

export function FeaturedStories() {
  const [lead, ...rest] = stories;

  return (
    <section id="stories" aria-labelledby="stories-title" className="section-y">
      <div className="page-container">
        <SectionHeading
          id="stories-title"
          title="Stories Behind the Machines"
          aside="These are outlines of features being written. Full articles will be published with sources."
        >
          Long-form features on the people, ideas and engineering behind the cars.
        </SectionHeading>

        <div className="mt-(--heading-gap) grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <StoryCard story={lead} lead />
          </div>
          <div className="grid content-start gap-12 lg:col-span-5 lg:gap-10 lg:border-l [&>*+*]:border-t [&>*+*]:border-line [&>*+*]:pt-10 lg:border-line lg:pl-10">
            {rest.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
