import { useEffect } from "react";

/**
 * Adds `is-in` to every [data-reveal] element once it is 12% into the
 * viewport. The transition itself lives in index.css, and the reduced-motion
 * branch there shows everything immediately.
 */
export function useReveals() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
