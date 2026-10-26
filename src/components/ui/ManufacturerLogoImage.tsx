import Image from "next/image";
import type { ManufacturerLogo } from "@/data/types";

type ManufacturerLogoImageProps = {
  logo: ManufacturerLogo;
  /** Height of the slot the logo sits in. Square emblems fill it; wide wordmarks are drawn shorter. */
  boxPx: number;
  className?: string;
};

/**
 * Logos range from square emblems to wordmarks fifteen times wider than tall. Scaling height
 * down as the aspect ratio grows keeps their visual weight similar inside the same slot.
 */
function logoHeight({ src }: ManufacturerLogo, boxPx: number) {
  const ratio = src.width / src.height;
  return `${Math.min(boxPx, boxPx * ratio ** -0.4) / 16}rem`;
}

/** A manufacturer logo in a fixed-height slot. Decorative: the visible name beside it carries the meaning. */
export function ManufacturerLogoImage({ logo, boxPx, className = "" }: ManufacturerLogoImageProps) {
  return (
    <div className={`flex items-center ${className}`} style={{ height: `${boxPx / 16}rem` }}>
      <Image
        src={logo.src}
        alt=""
        className={`w-auto max-w-full object-contain object-left ${logo.tone === "mono" ? "logo-mono" : ""}`}
        style={{ height: logoHeight(logo, boxPx) }}
      />
    </div>
  );
}
