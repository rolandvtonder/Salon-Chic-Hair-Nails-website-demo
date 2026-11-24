import { useEffect, useRef } from "react";
import type { Line } from "../content";
import { range } from "../lib/math";
import { onFrame } from "../lib/scroll";
import { BookButtons } from "./BookButtons";
import { Headline } from "./Headline";

/**
 * Inner-page hero. It sticks to the top while the paper page slides up over
 * it, and the photo pulls back as it goes — blur, dim and a small scale-down
 * together, the same camera move as the home film.
 */
export function PageHero({
  eyebrow,
  lines,
  intro,
  image,
  alt,
  service,
  position = "center",
}: {
  eyebrow: string;
  lines: Line[];
  intro: string;
  image: string;
  alt: string;
  service?: string;
  position?: string;
}) {
  const img = useRef<HTMLImageElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onFrame(({ scroll, vh }) => {
        const p = range(scroll, 0, vh);
        if (img.current) {
          img.current.style.transform = `scale(${1.06 - 0.1 * p})`;
          img.current.style.filter = p > 0 ? `blur(${10 * p}px) brightness(${1 - 0.55 * p})` : "none";
        }
        if (copy.current) {
          copy.current.style.opacity = String(1 - range(p, 0.05, 0.6));
          copy.current.style.transform = `translate3d(0, ${-p * 10}vh, 0)`;
        }
      }),
    [],
  );

  return (
    <section className="grain sticky top-0 h-svh overflow-hidden bg-ink text-cream">
      <img
        ref={img}
        src={image}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ objectPosition: position, transform: "scale(1.06)" }}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/30" />
      <div
        ref={copy}
        className="relative mx-auto flex h-full max-w-[110rem] flex-col justify-end px-5 pb-20 pt-24 md:px-10 md:pb-24"
      >
        <p className="eyebrow mb-5 text-rosegold">{eyebrow}</p>
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_26rem]">
          <Headline lines={lines} className="text-display" />
          <div className="space-y-6">
            <p className="text-lede text-cream/85">{intro}</p>
            <BookButtons service={service} />
          </div>
        </div>
      </div>
    </section>
  );
}
