"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { CompareRotation } from "@/lib/compare-data";
import { frameForDrag, nearbyFrames, nearestLoadable, pixelsPerFrame, wrapFrame } from "@/lib/rotation";

type RotationViewerProps = {
  rotation: CompareRotation;
  /** The car's full name, for labels. */
  title: string;
};

/** Frames either side of the current one to load ahead of a drag. */
const PRELOAD_RADIUS = 3;

function union(set: ReadonlySet<number>, more: number[]) {
  const next = new Set(set);
  for (const n of more) next.add(n);
  return next.size === set.size ? set : next;
}

/**
 * A photographic 360° view: drag across the stage (mouse, pen or finger) to turn the car, or use the
 * buttons and arrow keys. Only frames near the current angle are loaded, more as the car turns, and
 * a frame that fails is skipped. Vertical swipes still scroll the page. Frames change by swapping
 * which image is visible, so a drag re-renders this component only, never the page around it.
 */
export function RotationViewer({ rotation, title }: RotationViewerProps) {
  const count = rotation.frames.length;
  const [index, setIndex] = useState(0);
  const [wanted, setWanted] = useState<ReadonlySet<number>>(() => new Set(nearbyFrames(0, count, PRELOAD_RADIUS)));
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(new Set());
  const [failed, setFailed] = useState<ReadonlySet<number>>(new Set());
  const [touched, setTouched] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const drag = useRef<{ pointerId: number; x: number; start: number } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const expandRef = useRef<HTMLButtonElement>(null);

  function show(target: number) {
    const next = nearestLoadable(target, count, failed) ?? target;
    setIndex(next);
    setWanted((w) => union(w, nearbyFrames(next, count, PRELOAD_RADIUS)));
  }

  function step(delta: number) {
    setTouched(true);
    show(wrapFrame(index, delta, count));
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { pointerId: event.pointerId, x: event.clientX, start: index };
    setTouched(true);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const width = event.currentTarget.getBoundingClientRect().width;
    const next = frameForDrag(current.start, event.clientX - current.x, pixelsPerFrame(width, count), count, rotation.direction);
    if (next !== index) show(next);
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId === event.pointerId) drag.current = null;
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") step(rotation.direction === "clockwise" ? 1 : -1);
    else if (event.key === "ArrowRight") step(rotation.direction === "clockwise" ? -1 : 1);
    else if (event.key === "Home") show(0);
    else return;
    event.preventDefault();
  }

  // The expanded view is a native modal dialog: the page behind is inert, Escape closes it, and
  // page scrolling is locked only while it is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!expanded || !dialog) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    return () => {
      root.style.overflow = previous;
    };
  }, [expanded]);

  const allFailed = failed.size === count;
  const ready = loaded.has(index);
  const angle = Math.round((index / count) * 360);

  const stage = (
    <div
      role="group"
      aria-roledescription="360° viewer"
      aria-label={`${title}, ${count} photographs taken all the way round the car. Drag, or use the arrow keys, to turn it.`}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      className="relative h-full w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
    >
      {rotation.frames.map((frame, i) =>
        wanted.has(i) && !failed.has(i) ? (
          <Image
            key={frame.creditId}
            src={frame.src}
            alt=""
            fill
            draggable={false}
            sizes="(min-width: 88rem) 84rem, 100vw"
            onLoad={() => setLoaded((s) => union(s, [i]))}
            onError={() => setFailed((s) => union(s, [i]))}
            className={`photo-grade pointer-events-none object-contain ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ) : null,
      )}
      {!ready && !allFailed && (
        <p className="absolute inset-0 flex items-center justify-center text-label text-stone">Loading the view…</p>
      )}
      {allFailed && (
        <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-stone">
          The photographs for this view could not be loaded. The gallery on the car’s page has the same car.
        </p>
      )}
      {!touched && ready && (
        <p aria-hidden className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-label text-ivory">
          <span className="rounded-xs bg-ink/75 px-3 py-1.5">Drag to turn the car</span>
        </p>
      )}
    </div>
  );

  const controls = (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={() => step(-1)} aria-label="Previous angle" className={controlClass}>
        <span aria-hidden>←</span>
      </button>
      <button type="button" onClick={() => step(1)} aria-label="Next angle" className={controlClass}>
        <span aria-hidden>→</span>
      </button>
      <button type="button" onClick={() => show(0)} className={`${controlClass} px-4`}>
        Reset angle
      </button>
      {/* Position round the car, as a hairline with a marker; the figure is read out as well. */}
      <div className="flex min-w-40 flex-1 items-center gap-3">
        <div aria-hidden className="relative h-px flex-1 bg-line-strong">
          <span className="absolute -top-1 h-2.5 w-px bg-crimson" style={{ left: `${(index / count) * 100}%` }} />
        </div>
        <p className="text-label text-ash tabular-nums" aria-live="polite">
          <span className="sr-only">Angle </span>
          {angle}°
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-raised">
        {expanded ? (
          <p className="flex h-full items-center justify-center text-stone">Showing in the expanded view.</p>
        ) : (
          stage
        )}
      </div>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">{controls}</div>
        <button
          ref={expandRef}
          type="button"
          onClick={() => setExpanded(true)}
          aria-haspopup="dialog"
          className={`${controlClass} px-4`}
        >
          Expand view
        </button>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => {
          setExpanded(false);
          expandRef.current?.focus({ preventScroll: true });
        }}
        aria-label={`${title}, 360° view`}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ink/97 p-0 text-ivory backdrop:bg-ink/90"
      >
        {expanded && (
          <div className="flex h-full flex-col">
            <div className="page-container flex min-h-16 items-center justify-between gap-4">
              <p className="text-label text-stone">{title}</p>
              <button type="button" onClick={() => dialogRef.current?.close()} autoFocus className={`${controlClass} px-4`}>
                Close
              </button>
            </div>
            <div className="relative min-h-0 flex-1">{stage}</div>
            <div className="page-container py-4">{controls}</div>
          </div>
        )}
      </dialog>
    </div>
  );
}

const controlClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-xs border border-line-strong text-label text-ivory transition-colors duration-(--dur-fast) hover:border-ivory";
