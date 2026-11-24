import { useRef } from "react";
import { salon, whatsappLink } from "../content";
import { useFitText } from "../hooks/useFitText";
import { BookButtons } from "./BookButtons";
import { ClockIcon, FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";

export function Footer() {
  const word = useRef<HTMLSpanElement>(null);
  useFitText(word);

  const link = "inline-flex min-h-11 items-center gap-3 transition-colors hover:text-rosegold";

  return (
    <footer className="relative z-10 overflow-hidden bg-ink text-cream">
      <div className="mx-auto max-w-[110rem] px-5 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-10 border-b border-cream/15 pb-16 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div data-reveal>
            <p className="eyebrow text-rosegold">Bookings only</p>
            <h2 className="mt-4 text-title uppercase">
              <span className="block font-medium">Ready for a</span>
              <span className="block italic normal-case">good hair day?</span>
            </h2>
          </div>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <p className="text-lede text-cream/80">
              Send us a WhatsApp or give us a call and we'll find a time that suits you.
            </p>
            <BookButtons className="mt-6" />
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="eyebrow text-rosegold">Visit</h3>
            <a href={salon.mapsUrl} target="_blank" rel="noopener" className={`${link} mt-3 items-start`}>
              <PinIcon className="mt-1 shrink-0" />
              <span>
                {salon.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </span>
            </a>
          </div>
          <div>
            <h3 className="eyebrow text-rosegold">Hours</h3>
            {salon.hours.map((h) => (
              <p key={h.days} className="mt-3 flex gap-3">
                <ClockIcon className="mt-1 shrink-0" />
                <span>
                  {h.days}
                  <br />
                  {h.time}
                </span>
              </p>
            ))}
            <p className="mt-2 pl-8 text-cream/70">By appointment only</p>
          </div>
          <div>
            <h3 className="eyebrow text-rosegold">Contact</h3>
            <ul className="mt-2">
              <li>
                <a href={salon.phoneHref} className={link}>
                  <PhoneIcon /> {salon.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLink("Hi Salon Chic!")} target="_blank" rel="noopener" className={link}>
                  <WhatsAppIcon /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${salon.email}`} className={`${link} break-all`}>
                  <MailIcon className="shrink-0" /> {salon.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-rosegold">Follow</h3>
            <ul className="mt-2">
              <li>
                <a href={salon.facebook} target="_blank" rel="noopener" className={link}>
                  <FacebookIcon /> Salon Chic Hair &amp; Nails
                </a>
              </li>
              <li>
                <a href={salon.instagram} target="_blank" rel="noopener" className={link}>
                  <InstagramIcon /> {salon.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* The big wordmark — sized by measurement (useFitText), not by vw */}
      <div className="px-3 md:px-6" aria-hidden="true">
        <span
          ref={word}
          className="block w-max whitespace-nowrap font-medium uppercase leading-[0.78] tracking-[-0.02em] text-rosegold/90"
        >
          Salon Chic
        </span>
      </div>

      <div className="mx-auto flex max-w-[110rem] flex-col gap-2 px-5 py-6 text-sm text-cream/60 sm:flex-row sm:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} {salon.name} {salon.trade} · <span className="font-script text-lg text-rosegold/80">{salon.tagline}</span>
        </p>
        <p>
          Stock photography &amp; film from{" "}
          <a href="https://www.pexels.com" target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-cream">
            Pexels
          </a>
        </p>
      </div>
    </footer>
  );
}
