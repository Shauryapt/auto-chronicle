import Image from "next/image";
import { imageCredits } from "@/data/image-credits";
import type { Photo } from "@/data/types";

type HeroPhotoProps = {
  photo: Photo;
  caption: string;
  sizes: string;
  /** Tailwind aspect classes for the frame; the photograph is cropped to fit. */
  aspect?: string;
};

/** The lead photograph of a detail page, preloaded as the likely largest paint, with its credit beneath. */
export function HeroPhoto({ photo, caption, sizes, aspect = "aspect-4/3" }: HeroPhotoProps) {
  const credit = imageCredits[photo.creditId];

  return (
    <figure>
      <div className={`enter-plate relative overflow-hidden bg-ink-high ${aspect}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          preload
          placeholder="blur"
          sizes={sizes}
          className="photo-grade object-cover"
          style={{ objectPosition: photo.focus }}
        />
      </div>
      <figcaption className="mt-2 text-label text-ash">
        {caption}. Photograph by{" "}
        <a href={credit.sourceUrl} className="link-quiet">
          {credit.creator}
        </a>
        , {credit.license}.
      </figcaption>
    </figure>
  );
}
