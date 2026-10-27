/*
 * Frame arithmetic for the 360° viewer, kept apart from the component so it can be tested on its own.
 */

/** The frame index after stepping `delta` frames from `index`, wrapping round the circle. */
export function wrapFrame(index: number, delta: number, count: number): number {
  if (count <= 0) return 0;
  return (((index + delta) % count) + count) % count;
}

/**
 * The frame to show while dragging: one frame for every `pixelsPerFrame` of horizontal travel from
 * where the drag began. Dragging right turns the car as the hand moves, so for a clockwise sequence
 * (frame index rising as the car turns clockwise seen from above) that steps the index down.
 */
export function frameForDrag(
  startIndex: number,
  dx: number,
  pixelsPerFrame: number,
  count: number,
  direction: "clockwise" | "anticlockwise",
): number {
  const steps = Math.trunc(dx / Math.max(1, pixelsPerFrame));
  return wrapFrame(startIndex, direction === "clockwise" ? -steps : steps, count);
}

/**
 * Drag distance for one frame, so a full turn takes about one and a half widths of the stage:
 * enough control to stop on a chosen angle, short enough to go all the way round in one gesture.
 */
export function pixelsPerFrame(stageWidth: number, count: number): number {
  return Math.max(4, (stageWidth * 1.5) / Math.max(1, count));
}

/** The frames within `radius` steps either side of `index`, nearest first, to load before they are needed. */
export function nearbyFrames(index: number, count: number, radius: number): number[] {
  const out = [index];
  for (let step = 1; step <= radius && out.length < count; step++) {
    for (const next of [wrapFrame(index, step, count), wrapFrame(index, -step, count)]) {
      if (!out.includes(next)) out.push(next);
    }
  }
  return out;
}

/** The nearest frame to `index` that has not failed to load, searching outwards; null when all have failed. */
export function nearestLoadable(index: number, count: number, failed: ReadonlySet<number>): number | null {
  for (const candidate of nearbyFrames(index, count, Math.ceil(count / 2))) {
    if (!failed.has(candidate)) return candidate;
  }
  return null;
}
