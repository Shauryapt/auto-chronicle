"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";

export type GalleryItem = {
  id: string;
  src: StaticImageData;
  alt: string;
  focus?: string;
  depicts: string;
  note?: string;
  credit: { creator: string; license: string; licenseUrl: string; sourceUrl: string };
};

type CarGalleryProps = {
  /** Display name of the car, used to label the gallery and the viewer. */
  name: string;
  /** The lead exterior photograph first, then the supporting images. */
  items: GalleryItem[];
};

function caption(item: GalleryItem) {
  return item.note ? `${item.depicts}. ${item.note}.` : `${item.depicts}.`;
}

/**
 * A feature photograph with up to two supporting images beside it, and a full-screen viewer for
 * every image. The viewer is a native modal dialog, so the page behind it is inert, focus stays
 * inside it and Escape closes it.
 */
export function CarGallery({ name, items }: CarGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const count = items.length;
  const supporting = items.slice(1, 3);
  const hidden = count - 1 - supporting.length;

  const open = useCallback((i: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setIndex(i);
  }, []);

  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  );

  // Open the dialog and lock page scrolling while it is up; undo both when it closes.
  const isOpen = index !== null;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const previous = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    if (!dialog.open) dialog.showModal();
    return () => {
      root.style.overflow = previous.overflow;
      root.style.paddingRight = previous.paddingRight;
    };
  }, [isOpen]);

  function close() {
    dialogRef.current?.close();
  }

  function onDialogClose() {
    setIndex(null);
    triggerRef.current?.focus({ preventScroll: true });
  }

  function onTouchEnd(event: TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
  }

  if (count === 0) return null;
  const [lead] = items;
  const current = index === null ? null : items[index];
  // Follow the lead photograph's own shape between 3:2 and 16:9, so wide shots are not cropped to a
  // fragment of the car and the supporting tiles beside it keep usable proportions.
  const leadAspect = Math.min(Math.max(lead.src.width / lead.src.height, 1.5), 16 / 9);

  const layout =
    supporting.length === 0
      ? ""
      : supporting.length === 1
        ? "lg:grid-cols-[2fr_1fr]"
        : "lg:grid-cols-[2fr_1fr] lg:grid-rows-2";

  return (
    <section aria-label={`Photographs of the ${name}`}>
      <div className={`grid grid-cols-2 gap-2 sm:gap-3 ${layout}`}>
        <button
          type="button"
          onClick={(e) => open(0, e.currentTarget)}
          aria-haspopup="dialog"
          className={`group relative col-span-2 block overflow-hidden bg-ink-high lg:col-span-1 ${
            supporting.length > 0 ? "lg:row-span-2" : ""
          }`}
          style={{ aspectRatio: supporting.length === 0 ? 16 / 9 : leadAspect }}
        >
          <Image
            src={lead.src}
            alt={lead.alt}
            fill
            preload
            placeholder="blur"
            sizes={supporting.length > 0 ? "(min-width: 1024px) 60vw, 100vw" : "100vw"}
            className="enter-plate photo-grade object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.02] motion-reduce:transition-none"
            style={{ objectPosition: lead.focus }}
          />
          <span className="sr-only">, open the photo viewer</span>
        </button>

        {supporting.map((item, i) => {
          const isLast = i === supporting.length - 1;
          return (
            <button
              key={item.id}
              type="button"
              onClick={(e) => open(i + 1, e.currentTarget)}
              aria-haspopup="dialog"
              className={`group relative block overflow-hidden bg-ink-high ${supporting.length === 1 ? "col-span-2 aspect-3/2 lg:col-span-1 lg:row-span-1 lg:aspect-auto" : "aspect-4/3 lg:aspect-auto"}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 30vw, 50vw"
                className="photo-grade object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.03] motion-reduce:transition-none"
                style={{ objectPosition: item.focus }}
              />
              {isLast && hidden > 0 && (
                <span
                  aria-hidden
                  className="absolute right-2 bottom-2 rounded-xs bg-ink/80 px-2 py-1 text-label text-ivory backdrop-blur-sm"
                >
                  +{hidden}
                </span>
              )}
              <span className="sr-only">, open the photo viewer</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-col gap-2 text-label text-ash sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <p>
          {caption(lead)} Photograph by{" "}
          <a href={lead.credit.sourceUrl} className="link-quiet">
            {lead.credit.creator}
          </a>
          , {lead.credit.license}.
        </p>
        {count > 1 && (
          <button
            type="button"
            onClick={(e) => open(0, e.currentTarget)}
            aria-haspopup="dialog"
            className="link-quiet inline-flex min-h-11 shrink-0 items-center self-start text-ivory sm:min-h-0"
          >
            View all {count} photos
          </button>
        )}
      </div>

      <dialog
        ref={dialogRef}
        onClose={onDialogClose}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        aria-label={`${name} photo viewer`}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ink/97 p-0 text-ivory backdrop:bg-ink/90"
      >
        {current && index !== null && (
          <div className="flex h-full flex-col">
            <div className="page-container flex min-h-16 items-center justify-between gap-4">
              <p className="text-label text-stone" aria-live="polite">
                <span className="tabular-nums">
                  {index + 1} / {count}
                </span>
                <span className="sr-only">: {current.depicts}</span>
              </p>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="inline-flex min-h-11 items-center gap-2 rounded-xs border border-line-strong px-4 text-label text-ivory transition-colors duration-(--dur-fast) hover:border-ivory"
              >
                Close
                <span aria-hidden className="text-base leading-none">
                  ×
                </span>
              </button>
            </div>

            <div
              className="relative min-h-0 flex-1"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
              }}
              onTouchEnd={onTouchEnd}
            >
              <Image
                key={current.id}
                src={current.src}
                alt={current.alt}
                fill
                placeholder="blur"
                sizes="100vw"
                className="photo-grade object-contain"
              />
            </div>

            <div className="page-container flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <p className="max-w-prose text-label text-stone">
                <span className="text-ivory">{caption(current)}</span> Photograph by{" "}
                <a href={current.credit.sourceUrl} className="link-quiet">
                  {current.credit.creator}
                </a>
                ,{" "}
                <a href={current.credit.licenseUrl} className="link-quiet" rel="license">
                  {current.credit.license}
                </a>
                .
              </p>
              {count > 1 && (
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                    className="inline-flex size-11 items-center justify-center rounded-xs border border-line-strong text-ivory transition-colors duration-(--dur-fast) hover:border-ivory"
                  >
                    <span aria-hidden>←</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photo"
                    className="inline-flex size-11 items-center justify-center rounded-xs border border-line-strong text-ivory transition-colors duration-(--dur-fast) hover:border-ivory"
                  >
                    <span aria-hidden>→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
