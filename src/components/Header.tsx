import { u } from "../lib/url";
import { useEffect, useRef, useState } from "react";
import { salon, whatsappLink } from "../content";
import { onFrame } from "../lib/scroll";
import { Menu } from "./Menu";

/**
 * Fixed bar over every page. It is transparent over the dark page heroes and
 * picks up an ink backdrop once the page has scrolled 40px — toggled as a data
 * attribute from the shared loop, never through React state.
 */
export function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = false;
    return onFrame(({ scroll }) => {
      const solid = scroll > 40;
      if (solid !== last && bar.current) {
        bar.current.dataset.solid = String(solid);
        last = solid;
      }
    });
  }, []);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-cream px-5 py-3 text-wine focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        ref={bar}
        data-solid="false"
        className="fixed inset-x-0 top-0 z-40 text-cream transition-[background-color,backdrop-filter] duration-500 data-[solid=true]:bg-ink/80 data-[solid=true]:backdrop-blur-md"
      >
        <div className="flex h-[4.5rem] items-center justify-between px-5 md:px-10">
          <a href={u("/")} className="group flex flex-col leading-none" aria-label="Salon Chic Hair & Nails — home">
            <span className="font-script text-[2rem] leading-[0.9] text-rosegold transition-colors group-hover:text-blush">
              {salon.name}
            </span>
            <span className="mt-0.5 pl-1 text-[0.62rem] uppercase tracking-[0.42em] text-cream/80">{salon.trade}</span>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={whatsappLink("Hi Salon Chic! I'd like to make a booking. When do you have space?")}
              target="_blank"
              rel="noopener"
              className="hidden min-h-11 items-center rounded-full bg-rosegold px-5 text-sm uppercase tracking-[0.18em] text-ink transition-colors hover:bg-blush sm:inline-flex"
            >
              Book
            </a>
            <button
              ref={menuBtn}
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
              className="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full border border-cream/35 px-5 text-sm uppercase tracking-[0.18em] transition-colors hover:bg-cream/10"
            >
              Menu
              <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-3/5 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <Menu open={open} onClose={() => setOpen(false)} current={current} returnFocusTo={menuBtn} />
    </>
  );
}
