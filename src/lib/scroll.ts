import Lenis from "lenis";

/**
 * The page's single animation loop.
 *
 * Lenis is advanced here, then every scroll-driven component gets the same
 * frame state and writes its own styles directly. Nothing goes through React
 * state while scrolling, so the page never re-renders mid-scroll.
 *
 * `dirty` is true on the first frame and after any resize or font swap, so
 * components re-measure their layout then — and only then — instead of
 * calling getBoundingClientRect every frame.
 */
export type Frame = {
  scroll: number;
  vw: number;
  vh: number;
  time: number;
  dirty: boolean;
};

type FrameFn = (f: Frame) => void;

const subs = new Set<FrameFn>();
let lenis: Lenis | null = null;
let raf = 0;
let dirty = true;

export function onFrame(fn: FrameFn) {
  subs.add(fn);
  dirty = true;
  return () => {
    subs.delete(fn);
  };
}

export function markDirty() {
  dirty = true;
}

export function startLoop(reducedMotion: boolean) {
  if (raf) return;
  if (!reducedMotion) {
    // lerp 0.1 is Lenis' default feel; wheelMultiplier 0.9 keeps the sticky
    // stages on the home page from rushing past on fast trackpads.
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
  }

  const ro = new ResizeObserver(markDirty);
  ro.observe(document.documentElement);
  window.addEventListener("resize", markDirty);
  document.fonts?.ready.then(markDirty);

  const tick = (time: number) => {
    lenis?.raf(time);
    const frame: Frame = {
      scroll: lenis ? lenis.scroll : window.scrollY,
      vw: window.innerWidth,
      vh: window.innerHeight,
      time,
      dirty,
    };
    dirty = false;
    subs.forEach((fn) => fn(frame));
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
}

/** Pause smooth scrolling while the menu is open, so the page behind stays put. */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function scrollToTarget(target: HTMLElement | number) {
  if (lenis) lenis.scrollTo(target, { offset: -72 });
  else if (typeof target === "number") window.scrollTo({ top: target });
  else target.scrollIntoView();
}

/** Distance from the top of the document to an element's top edge. Measure untransformed elements only. */
export function docTop(el: HTMLElement, scroll: number) {
  return el.getBoundingClientRect().top + scroll;
}
