"use client";

import { createContext, useContext, useLayoutEffect, useRef, type ReactNode } from "react";

/** Sequences watched to the end (or skipped) in this visit, so returning to a car opens on the finished frame. */
const played = new Set<string>();

/** The sequence's keyframe animations, leaving out transitions such as a control's hover colour. */
function animationsIn(stage: HTMLElement | null): Animation[] {
  if (!stage || typeof stage.getAnimations !== "function") return [];
  return stage.getAnimations({ subtree: true }).filter((a) => a instanceof CSSAnimation);
}

/**
 * Marks the stage as playing and records the sequence once every animation has finished.
 * `data-intro` sets the control's label (see globals.css).
 */
function follow(stage: HTMLElement, id: string, list: Animation[]) {
  stage.dataset.intro = "playing";
  Promise.all(list.map((a) => a.finished)).then(
    () => {
      played.add(id);
      stage.dataset.intro = "done";
    },
    // Replaying or leaving the page cancels this run; the next run reports instead.
    () => {},
  );
}

const IntroContext = createContext<(() => void) | null>(null);

type IntroSequenceProps = {
  /** Identifies the sequence, normally the car's slug. */
  id: string;
  children: ReactNode;
};

/**
 * Steers the CSS title sequence of its children; `IntroControl`, placed anywhere inside, skips or
 * replays it. The animations live in the stylesheet and every element rests in its finished state,
 * so this component only controls them through the Web Animations API.
 */
export function IntroSequence({ id, children }: IntroSequenceProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  // Before paint, so a sequence already seen in this visit never flashes its opening frame.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const list = animationsIn(stage);
    if (!stage || list.length === 0) return;
    if (played.has(id)) list.forEach((a) => a.finish());
    follow(stage, id, list);
  }, [id]);

  function skipOrReplay() {
    const stage = stageRef.current;
    if (!stage) return;
    const list = animationsIn(stage);
    if (stage.dataset.intro === "playing") {
      list.forEach((a) => a.finish());
      played.add(id);
      stage.dataset.intro = "done";
    } else {
      list.forEach((a) => {
        a.cancel();
        a.play();
      });
      follow(stage, id, list);
    }
  }

  return (
    <IntroContext value={skipOrReplay}>
      <div ref={stageRef}>{children}</div>
    </IntroContext>
  );
}

/**
 * One button that reads "Skip intro" while the sequence runs and "Replay intro" once it has finished.
 * Being one element, it keeps keyboard focus through every change, so focus never has to move.
 * It stays invisible, keeping its space, until IntroSequence takes charge, and is removed entirely
 * with reduced motion, when there is nothing to skip or replay.
 */
export function IntroControl() {
  const skipOrReplay = useContext(IntroContext);
  if (!skipOrReplay) return null;

  return (
    <button
      type="button"
      onClick={skipOrReplay}
      className="intro-control min-h-11 min-w-32 shrink-0 rounded-xs border border-line-strong px-4 text-label text-ivory transition-colors duration-(--dur-fast) hover:border-ivory"
    >
      <span className="intro-skip">Skip intro</span>
      <span className="intro-replay">Replay intro</span>
    </button>
  );
}
