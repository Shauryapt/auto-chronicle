export type NavItem =
  | { label: string; href: string; status: "live" }
  | { label: string; status: "soon" };

/** Primary navigation. Sections that are not built yet are shown as "soon" rather than linked. */
export const primaryNav: NavItem[] = [
  { label: "Discover", href: "/#discover", status: "live" },
  { label: "Manufacturers", href: "/#manufacturers", status: "live" },
  { label: "The Archive", href: "/#archive", status: "live" },
  { label: "Compare", status: "soon" },
  { label: "Upcoming", status: "soon" },
];

export const homeSections = [
  { label: "Stories", href: "/#stories" },
  { label: "The Archive", href: "/#archive" },
  { label: "Featured cars", href: "/#cars" },
  { label: "Manufacturers", href: "/#manufacturers" },
  { label: "Discover by category", href: "/#discover" },
  { label: "Search", href: "/#search" },
];

export const futurePages = ["About", "Editorial policy", "Contact", "Privacy"];
