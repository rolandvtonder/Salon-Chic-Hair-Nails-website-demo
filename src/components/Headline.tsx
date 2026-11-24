import type { ElementType } from "react";
import type { Line } from "../content";

/**
 * Renders headline lines from content.ts. Italic is data on each line; every
 * line rises out of its own mask, 90ms after the one above it.
 */
export function Headline({
  lines,
  as: Tag = "h1",
  className = "",
  delay = 150,
  animate = true,
}: {
  lines: Line[];
  as?: ElementType;
  className?: string;
  delay?: number;
  animate?: boolean;
}) {
  return (
    <Tag className={`uppercase ${className}`} aria-label={lines.map((l) => l.text).join(" ")}>
      {lines.map((l, i) => (
        <span key={i} aria-hidden="true" className={animate ? "line-mask" : "block"}>
          <span
            className={l.italic ? "italic normal-case font-normal" : "font-medium"}
            style={animate ? ({ "--d": `${delay + i * 90}ms` } as React.CSSProperties) : undefined}
          >
            {l.text}
          </span>
        </span>
      ))}
    </Tag>
  );
}
