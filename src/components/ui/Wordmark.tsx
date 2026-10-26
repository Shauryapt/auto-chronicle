import Link from "next/link";

type WordmarkProps = {
  size?: "header" | "footer";
};

/** Original typographic wordmark: the name in spaced display capitals over a short crimson rule. */
export function Wordmark({ size = "header" }: WordmarkProps) {
  const text =
    size === "header"
      ? "text-[0.875rem] tracking-[0.16em] min-[400px]:text-[1.0625rem] min-[400px]:tracking-[0.22em] sm:text-lg"
      : "text-2xl tracking-[0.22em] sm:text-[1.75rem]";

  return (
    <Link
      href="/"
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
