import { u } from "../lib/url";
/**
 * Real work photos from the salon's own Beauty Packages flyer (1080 × 1350).
 * Each crop shows just one photo card out of the flyer, so the site can use
 * the salon's own results without separate photo files.
 */
const SRC = { url: u("/media/flyer-packages.jpg"), w: 1080, h: 1350 };

const CROPS = {
  hands: { x: 118, y: 350, w: 240, h: 268 },
  highlights: { x: 421, y: 350, w: 240, h: 268 },
  gel: { x: 723, y: 350, w: 240, h: 268 },
} as const;

export type CropName = keyof typeof CROPS;

export function FlyerCrop({ name, alt, className = "" }: { name: CropName; alt: string; className?: string }) {
  const c = CROPS[name];
  return (
    <div
      role="img"
      aria-label={alt}
      className={`overflow-hidden bg-cocoa ${className}`}
      style={{
        aspectRatio: `${c.w} / ${c.h}`,
        backgroundImage: `url(${SRC.url})`,
        backgroundSize: `${(SRC.w / c.w) * 100}% ${(SRC.h / c.h) * 100}%`,
        backgroundPosition: `${(c.x / (SRC.w - c.w)) * 100}% ${(c.y / (SRC.h - c.h)) * 100}%`,
      }}
    />
  );
}
