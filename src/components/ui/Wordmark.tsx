"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

type WordmarkProps = {
  size?: "header" | "footer";
};

/**
 * Original typographic wordmark: the name in spaced display capitals over a short crimson rule.
 *
 * It always lands on the homepage at the very top. Next.js keeps the scroll position when the
 * target page is already in view, and does nothing for a click to the page you are on, so the
 * link turns its own scrolling off and scrolls to the top itself: smoothly when already on the
 * plain homepage (the CSS drops smoothing for reduced motion), instantly before any navigation,
 * such as from a detail page or from a homepage URL carrying a search query.
 */
export function Wordmark({ size = "header" }: WordmarkProps) {
  const pathname = usePathname();
  const text =
    size === "header"
      ? "text-[0.875rem] tracking-[0.16em] min-[400px]:text-[1.0625rem] min-[400px]:tracking-[0.22em] sm:text-lg"
      : "text-2xl tracking-[0.22em] sm:text-[1.75rem]";

  function toTop(event: MouseEvent<HTMLAnchorElement>) {
    // Leave new-tab and new-window clicks to the browser.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // Already on the plain homepage: nothing needs loading, and a navigation to the same page would
    // re-render it and cut a smooth scroll short. Drop any #section from the address and scroll.
    if (pathname === "/" && window.location.search === "") {
      event.preventDefault();
      if (window.location.hash) window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0 });
      return;
    }
    // Anywhere else, jump to the top first so the homepage arrives at the top.
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <Link
      href="/"
      scroll={false}
      onClick={toTop}
      aria-label="Auto Chronicle, home"
      className="group inline-flex flex-col items-start gap-1.5 py-2"
    >
      <span className={`font-display ${text} leading-none whitespace-nowrap text-ivory`}>
        AUTO CHRONICLE
      </span>
      <span
        aria-hidden
        className="h-px w-8 bg-crimson transition-[width] duration-(--dur-base) ease-soft group-hover:w-14"
      />
    </Link>
  );
}
