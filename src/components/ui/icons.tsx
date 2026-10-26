type IconProps = { className?: string };

export function SearchIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="m13 13 4.25 4.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon({ open, className = "size-5" }: IconProps & { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      {open ? (
        <path d="m4.5 4.5 11 11m0-11-11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d="M3 6.5h14M3 13.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}
