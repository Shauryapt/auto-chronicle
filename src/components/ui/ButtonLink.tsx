import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
};

const base =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-xs px-6 text-[0.9375rem] font-medium tracking-[0.01em] transition-colors duration-(--dur-fast) ease-out";

const variants = {
  primary: "bg-crimson text-ivory hover:bg-crimson-hover active:bg-crimson",
  secondary: "border border-line-strong text-ivory hover:border-ivory hover:bg-ivory/5 active:bg-ivory/10",
};

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
