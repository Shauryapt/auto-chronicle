"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/data/navigation";
import { MenuIcon } from "@/components/ui/icons";
import { StatusTag } from "@/components/ui/StatusTag";

export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    // Close if the viewport grows into the desktop layout while open.
    const desktop = window.matchMedia("(min-width: 64rem)");
    function onResize() {
      if (desktop.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-xs border border-line-strong text-ivory transition-colors duration-(--dur-fast) hover:border-ivory"
      >
        <MenuIcon open={open} />
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-ink shadow-[0_24px_48px_-24px_rgb(0_0_0/0.7)]"
      >
        <nav aria-label="Primary" className="page-container py-4">
          <ul className="divide-y divide-line">
            {items.map((item) => (
              <li key={item.label}>
                {item.status === "live" ? (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center font-display text-display-sm text-ivory"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex min-h-14 items-center justify-between font-display text-display-sm text-ash"
                  >
                    {item.label}
                    <StatusTag>Soon</StatusTag>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
