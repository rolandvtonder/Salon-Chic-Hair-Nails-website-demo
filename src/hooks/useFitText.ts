import { useLayoutEffect, type RefObject } from "react";

/**
 * Sizes a single line of text so it spans its parent exactly.
 *
 * Measures at a 100px reference size and scales, reading offsetWidth (layout
 * width) so per-letter transforms never feed back into the fit. Re-fits on
 * resize and once the web font has swapped in, because the fallback font is
 * a different width.
 */
export function useFitText(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      el.style.fontSize = "100px";
      const w = el.offsetWidth;
      const styles = getComputedStyle(parent);
      const avail = parent.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      if (w > 0) el.style.fontSize = `${(100 * avail) / w}px`;
    };

    fit();
    // Only the parent's width matters; ignoring height changes stops the fit
    // (which changes the line's height) from re-triggering itself.
    let lastW = parent.clientWidth;
    const ro = new ResizeObserver(() => {
      if (parent.clientWidth === lastW) return;
      lastW = parent.clientWidth;
      fit();
    });
    ro.observe(parent);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [ref]);
}
