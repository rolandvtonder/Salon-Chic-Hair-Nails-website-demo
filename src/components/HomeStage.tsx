import { u } from "../lib/url";
import { useEffect, useRef } from "react";
import { home, salon } from "../content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { easeInOutCubic, easeOutCubic, range } from "../lib/math";
import { docTop, onFrame } from "../lib/scroll";
import { BookButtons } from "./BookButtons";
import { Headline } from "./Headline";
import { ArrowIcon } from "./Icons";

/*
 * The home page's one sticky stage, 320svh tall (220svh of travel).
 *
 *   p 0.02–0.22  headline and booking box lift away
 *   p 0.05–0.45  the hero film blurs, dims and scales back — a camera pull-back, not a fade
 *   p 0.25–0.89  three panels slide in from the right, 0.14 apart, 0.36 each
 *   p 0.89–1     hold, then the stage scrolls away
 *
 * Three panels, one film: panel 1 holds the only <video>, sized to the whole
 * panel row and offset to show its own third. Panels 2 and 3 are canvases that
 * copy their third out of that same video every frame — one download, one
 * decode, and they can never drift apart.
 */

const PANEL_START = 0.25;
const PANEL_STAGGER = 0.14;
const PANEL_SPAN = 0.36;

export function HomeStage() {
  const reduced = useReducedMotion();
  return reduced ? <StaticStage /> : <MotionStage />;
}

function MotionStage() {
  const wrap = useRef<HTMLElement>(null);
  const film = useRef<HTMLDivElement>(null);
  const heroVideo = useRef<HTMLVideoElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLAnchorElement | null)[]>([]);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const master = useRef<HTMLVideoElement>(null);
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    let inView = true;
    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);

    let top = 0;
    let travel = 1;
    let rowW = 0;
    let rowH = 0;
    let lefts: number[] = [];
    let widths: number[] = [];
    let heroOn = false;
    let panelsOn = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const setPlaying = (v: HTMLVideoElement | null, on: boolean) => {
      if (!v) return;
      if (on) v.play().catch(() => {});
      else v.pause();
    };

    const off = onFrame(({ scroll, vw, vh, dirty }) => {
      const w = wrap.current;
      if (!w || !row.current) return;

      if (dirty) {
        top = docTop(w, scroll);
        travel = Math.max(1, w.offsetHeight - vh);
        rowW = row.current.clientWidth;
        rowH = row.current.clientHeight;
        lefts = panels.current.map((p) => p?.offsetLeft ?? 0);
        widths = panels.current.map((p) => p?.offsetWidth ?? 0);
        if (master.current) {
          master.current.style.width = `${rowW}px`;
          master.current.style.left = `${-lefts[0]}px`;
        }
        canvases.current.forEach((c, i) => {
          if (!c) return;
          c.width = Math.round(widths[i] * dpr);
          c.height = Math.round(rowH * dpr);
        });
      }

      const p = range(scroll, top, top + travel);

      // Headline + booking box lift away
      const a = range(p, 0.02, 0.22);
      if (copy.current) {
        copy.current.style.opacity = String(1 - a);
        copy.current.style.transform = `translate3d(0, ${-a * 8}vh, 0)`;
        copy.current.style.visibility = a >= 1 ? "hidden" : "visible";
      }

      // Camera pull-back on the hero film
      const f = easeInOutCubic(range(p, 0.05, 0.45));
      if (film.current) {
        film.current.style.transform = `scale(${1 - 0.14 * f})`;
        film.current.style.filter = f > 0 ? `blur(${14 * f}px) brightness(${1 - 0.6 * f})` : "none";
        film.current.style.borderRadius = `${28 * f}px`;
      }

      // Panels slide in from the right, one after another
      panels.current.forEach((el, i) => {
        if (!el) return;
        const s = PANEL_START + i * PANEL_STAGGER;
        const t = easeOutCubic(range(p, s, s + PANEL_SPAN));
        el.style.transform = `translate3d(${(1 - t) * (vw + 40)}px, 0, 0)`;
        el.style.visibility = t <= 0 ? "hidden" : "visible";
        const lab = labels.current[i];
        if (lab) {
          const l = range(t, 0.7, 1);
          lab.style.opacity = String(l);
          lab.style.transform = `translate3d(0, ${(1 - l) * 1.5}rem, 0)`;
        }
      });

      // Only decode what is on screen
      const wantHero = inView && p < 0.6;
      const wantPanels = inView && p > PANEL_START - 0.05;
      if (wantHero !== heroOn) setPlaying(heroVideo.current, (heroOn = wantHero));
      if (wantPanels !== panelsOn) setPlaying(master.current, (panelsOn = wantPanels));

      // Copy panel 2 and 3's thirds out of the one film
      const m = master.current;
      if (panelsOn && m && m.readyState >= 2 && m.videoWidth) {
        const s = Math.max(rowW / m.videoWidth, rowH / m.videoHeight);
        const ox = (rowW - m.videoWidth * s) / 2;
        const oy = (rowH - m.videoHeight * s) / 2;
        canvases.current.forEach((c, i) => {
          if (!c || i === 0) return;
          const ctx = c.getContext("2d");
          if (!ctx) return;
          ctx.drawImage(m, (lefts[i] - ox) / s, -oy / s, widths[i] / s, rowH / s, 0, 0, c.width, c.height);
        });
      }
    });

    return () => {
      off();
      io.disconnect();
    };
  }, []);

  return (
    <section ref={wrap} className="relative h-[320svh] bg-ink" aria-label="Welcome">
      <div className="grain sticky top-0 h-svh overflow-hidden">
        {/* Hero film */}
        <div ref={film} className="absolute inset-0 overflow-hidden will-change-transform">
          <video
            ref={heroVideo}
            className="h-full w-full object-cover"
            src={u("/media/hero.mp4")}
            poster={u("/media/hero-poster.jpg")}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/40" />
        </div>

        {/* Headline + booking box */}
        <div
          ref={copy}
          className="absolute inset-0 mx-auto flex max-w-[110rem] flex-col justify-end px-5 pb-8 pt-24 text-cream md:px-10 md:pb-12"
        >
          <p className="eyebrow mb-5 text-rosegold">{home.eyebrow}</p>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_24rem]">
            <Headline lines={home.headline} className="text-display tracking-[-0.01em]" />
            <div className="space-y-5 pb-2">
              <p className="text-lede text-cream/85">{home.intro}</p>
              <div className="rounded-2xl border border-cream/20 bg-ink/40 p-5 backdrop-blur-md">
                <p className="text-[1.6rem] uppercase italic leading-none">Book your chair</p>
                <p className="mt-2 text-sm tracking-wide text-cream/75">
                  Bookings only · {salon.hours[0].days} {salon.hours[0].time}
                </p>
                <BookButtons className="mt-4 [&>a]:flex-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Three panels, one film */}
        <div
          ref={row}
          className="pointer-events-none absolute inset-x-3 bottom-3 top-[5.25rem] flex gap-2 md:inset-x-10 md:bottom-8 md:gap-3"
        >
          {home.panels.map((pn, i) => (
            <a
              key={pn.title}
              href={pn.href}
              ref={(el) => {
                panels.current[i] = el;
              }}
              className="group pointer-events-auto relative flex-1 overflow-hidden rounded-[1.25rem] bg-cocoa will-change-transform"
              style={{ transform: "translate3d(110vw,0,0)", visibility: "hidden" }}
            >
              {i === 0 ? (
                <video
                  ref={master}
                  className="absolute top-0 h-full max-w-none object-cover"
                  src={u("/media/nails-film.mp4")}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
              ) : (
                <canvas
                  ref={(el) => {
                    canvases.current[i] = el;
                  }}
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
              <div
                ref={(el) => {
                  labels.current[i] = el;
                }}
                className="absolute inset-x-0 bottom-0 p-3 text-cream sm:p-5 md:p-7"
              >
                <span className="eyebrow block text-[0.62rem] text-rosegold sm:text-[0.75rem]">0{i + 1}</span>
                <span className="mt-1 block text-[clamp(1.5rem,4.6vw,4.5rem)] uppercase italic leading-[0.9]">
                  {pn.title}
                </span>
                <span className="mt-3 hidden items-center gap-2 text-sm text-cream/85 sm:flex md:text-base">
                  {pn.caption}
                  <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Reduced motion: no sticky choreography, no autoplay. The panels show thirds of one still. */
function StaticStage() {
  return (
    <>
      <section className="relative min-h-svh overflow-hidden bg-ink text-cream" aria-label="Welcome">
        <img src={u("/media/hero-poster.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/40" />
        <div className="relative mx-auto flex min-h-svh max-w-[110rem] flex-col justify-end px-5 pb-10 pt-28 md:px-10">
          <p className="eyebrow mb-5 text-rosegold">{home.eyebrow}</p>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_24rem]">
            <Headline lines={home.headline} className="text-display" animate={false} />
            <div className="space-y-5">
              <p className="text-lede text-cream/85">{home.intro}</p>
              <BookButtons />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-ink px-3 pb-3 md:px-10 md:pb-10" aria-label="Look good, feel good, be you">
        <div className="flex h-[80svh] gap-2 md:gap-3">
          {home.panels.map((pn, i) => (
            <a
              key={pn.title}
              href={pn.href}
              className="relative flex-1 overflow-hidden rounded-[1.25rem] bg-cocoa"
              style={{
                backgroundImage: `url(${u("/media/nails-poster.jpg")})`,
                backgroundSize: "cover",
                backgroundPosition: `${i * 50}% 50%`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
              <span className="absolute bottom-0 p-4 text-[clamp(1.5rem,4.6vw,4.5rem)] uppercase italic leading-[0.9] text-cream md:p-7">
                {pn.title}
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
