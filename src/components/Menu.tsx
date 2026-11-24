import { u } from "../lib/url";
import { useEffect, useRef } from "react";
import { nav, salon } from "../content";
import { lockScroll } from "../lib/scroll";
import { BookButtons } from "./BookButtons";
import { ClockIcon, PinIcon } from "./Icons";

/**
 * Three slabs wipe in from the right one after another — ink, blush, paper —
 * and the paper one stays to hold the items. Closing runs them back out in
 * reverse, faster (exit ≈ 60% of enter).
 *
 * Hovering an item runs it through the #silk filter: turbulence + displacement,
 * so it ripples like fabric rather than a CSS wobble.
 */
const SLABS = [
  { cls: "bg-ink", inDelay: 0, outDelay: 160 },
  { cls: "bg-blush", inDelay: 110, outDelay: 80 },
  { cls: "bg-paper", inDelay: 220, outDelay: 0 },
];

export function Menu({
  open,
  onClose,
  current,
  returnFocusTo,
}: {
  open: boolean;
  onClose: () => void;
  current: string;
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    lockScroll(open);
    if (open) {
      wasOpen.current = true;
      // Wait for the paper slab to land before moving focus into it.
      const t = window.setTimeout(() => closeRef.current?.focus(), 350);
      return () => window.clearTimeout(t);
    }
    if (wasOpen.current) returnFocusTo.current?.focus({ preventScroll: true });
  }, [open, returnFocusTo]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a[href], button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
    >
      {/* The silk filter — referenced by .silk-hover in index.css */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="silk" x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.05" numOctaves="2" seed="4" result="noise">
            <animate
              attributeName="baseFrequency"
              dur="3.2s"
              values="0.008 0.05;0.012 0.08;0.008 0.05"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {SLABS.map((s, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`absolute inset-0 ${s.cls} will-change-transform`}
          style={{
            transform: open ? "translate3d(0,0,0)" : "translate3d(101%,0,0)",
            transition: `transform ${open ? 780 : 480}ms var(--ease-wipe) ${open ? s.inDelay : s.outDelay}ms`,
          }}
        />
      ))}

      <div
        className="relative flex h-full flex-col overflow-y-auto px-5 pb-10 pt-5 md:px-10"
        style={{
          opacity: open ? 1 : 0,
          transition: `opacity ${open ? 400 : 150}ms ease ${open ? 520 : 0}ms`,
        }}
      >
        <div className="flex h-14 items-center justify-between">
          <span className="font-script text-[2rem] leading-none text-wine">{salon.name}</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-full border border-wine/30 px-5 text-sm uppercase tracking-[0.2em] text-wine transition-colors hover:bg-wine/5"
          >
            Close
            <span aria-hidden="true" className="relative block h-3 w-3">
              <span className="absolute left-0 top-1/2 h-px w-3 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-3 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <div className="mx-auto mt-8 grid w-full max-w-7xl flex-1 gap-12 md:mt-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <nav aria-label="Main">
            <ul>
              {nav.map((n, i) => {
                const isCurrent = n.href === current;
                return (
                  <li
                    key={n.href}
                    style={{
                      transform: open ? "none" : "translate3d(3rem,0,0)",
                      opacity: open ? 1 : 0,
                      transition: `transform 0.9s var(--ease-silk) ${open ? 460 + i * 45 : 0}ms, opacity 0.6s ease ${open ? 460 + i * 45 : 0}ms`,
                    }}
                  >
                    <a
                      href={n.href}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`silk-hover group flex items-baseline gap-4 py-1 text-[clamp(2.3rem,6.4vw,4.75rem)] uppercase leading-[0.98] text-wine ${
                        n.italic ? "italic normal-case" : "font-medium"
                      }`}
                    >
                      <span className="w-7 shrink-0 text-xs not-italic tabular-nums tracking-widest text-rose-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{n.label}</span>
                      {isCurrent && (
                        <span className="ml-1 inline-block h-2.5 w-2.5 translate-y-[-0.4em] rounded-full bg-rose" aria-hidden="true" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <aside className="flex flex-col gap-8 border-t border-wine/15 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-2">
            <img
              src={u("/media/logo-art.jpg")}
              alt=""
              className="hidden w-48 mix-blend-multiply md:block"
              width={720}
              height={726}
              loading="lazy"
            />
            <p className="font-script text-[1.9rem] leading-tight text-rose-deep">{salon.tagline}</p>
            <div className="space-y-3 text-wine">
              <p className="flex gap-3">
                <PinIcon className="mt-1 shrink-0 text-rose-deep" />
                <span>{salon.address.join(", ")}</span>
              </p>
              <p className="flex gap-3">
                <ClockIcon className="mt-1 shrink-0 text-rose-deep" />
                <span>
                  {salon.hours.map((h) => `${h.days}, ${h.time}`).join(" · ")}
                  <br />
                  Bookings only
                </span>
              </p>
            </div>
            <BookButtons tone="light" />
          </aside>
        </div>
      </div>
    </div>
  );
}
