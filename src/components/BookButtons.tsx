import { salon, whatsappLink } from "../content";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/**
 * The two ways to book. `tone` picks colours for a dark or a light background.
 * The WhatsApp message is pre-filled with the service the visitor was reading about.
 */
export function BookButtons({
  service,
  tone = "dark",
  className = "",
}: {
  service?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const msg = service
    ? `Hi Salon Chic! I'd like to book ${service}. When do you have space?`
    : "Hi Salon Chic! I'd like to make a booking. When do you have space?";

  const primary =
    tone === "dark"
      ? "bg-rosegold text-ink hover:bg-blush"
      : "bg-wine text-cream hover:bg-rose-deep";
  const secondary =
    tone === "dark"
      ? "border-cream/40 text-cream hover:bg-cream/10"
      : "border-wine/40 text-wine hover:bg-wine/5";

  const btn =
    "inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-[0.95rem] tracking-wide transition-colors duration-200 cursor-pointer";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={whatsappLink(msg)} target="_blank" rel="noopener" className={`${btn} ${primary}`}>
        <WhatsAppIcon />
        WhatsApp to book
      </a>
      <a href={salon.phoneHref} className={`${btn} border ${secondary}`}>
        <PhoneIcon />
        Call {salon.phoneDisplay}
      </a>
    </div>
  );
}
