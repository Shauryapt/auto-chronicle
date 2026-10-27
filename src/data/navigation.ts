export type NavItem =
  | { label: string; href: string; status: "live" }
  | { label: string; status: "soon" };

/**
 * Primary navigation. A section that is not built yet can be listed as "soon", but none is
 * advertised at launch: unfinished sections stay out of the navigation until they exist.
 */
export const primaryNav: NavItem[] = [
  { label: "Discover", href: "/#discover", status: "live" },
  { label: "Manufacturers", href: "/#manufacturers", status: "live" },
  { label: "The Archive", href: "/#archive", status: "live" },
  { label: "Compare", href: "/compare", status: "live" },
];

export const homeSections = [
  { label: "Stories", href: "/#stories" },
  { label: "The Archive", href: "/#archive" },
  { label: "Featured cars", href: "/#cars" },
  { label: "Manufacturers", href: "/#manufacturers" },
  { label: "Discover by category", href: "/#discover" },
  { label: "Search", href: "/#search" },
];
