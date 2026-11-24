import { u } from "../lib/url";
import { contact, salon, whatsappLink } from "../content";
import { ArrowIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "../components/Icons";
import { Container, Layout, SectionTitle, Sheet } from "../components/Layout";
import { PageHero } from "../components/PageHero";

export function Contact() {
  const ways = [
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: salon.phoneDisplay,
      href: whatsappLink("Hi Salon Chic! I'd like to make a booking. When do you have space?"),
      hint: "Quickest way to book",
      external: true,
    },
    { icon: PhoneIcon, label: "Call", value: salon.phoneDisplay, href: salon.phoneHref, hint: "Mon–Fri, 08:00–18:00" },
    { icon: MailIcon, label: "Email", value: salon.email, href: `mailto:${salon.email}`, hint: "For questions & quotes" },
  ];

  return (
    <Layout current={u("/contact/")}>
      <PageHero
        eyebrow={contact.eyebrow}
        lines={contact.headline}
        intro={contact.intro}
        image={u("/media/nails-poster.jpg")}
        alt="Manicurist in lilac gloves working on a client's nails on a pink towel"
      />
      <Sheet>
        <section className="py-24 md:py-32" aria-labelledby="ways-title">
          <Container>
            <SectionTitle eyebrow="Bookings only">
              <span id="ways-title" className="block font-medium">Get in</span>
              <span className="block italic normal-case">touch</span>
            </SectionTitle>
            <ul className="mt-14 grid gap-5 md:grid-cols-3">
              {ways.map((w, i) => (
                <li key={w.label} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                  <a
                    href={w.href}
                    {...(w.external ? { target: "_blank", rel: "noopener" } : {})}
                    className={`group flex h-full flex-col justify-between gap-10 rounded-[1.5rem] p-8 transition-colors md:p-10 ${
                      i === 0 ? "bg-ink text-cream hover:bg-cocoa" : "bg-blush text-wine hover:bg-rosegold/50"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <w.icon width={28} height={28} className={i === 0 ? "text-rosegold" : "text-rose-deep"} />
                      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span>
                      <span className="block text-[2.4rem] uppercase italic leading-none">{w.label}</span>
                      <span className="mt-3 block break-all text-lede">{w.value}</span>
                      <span className={`mt-1 block text-sm ${i === 0 ? "text-cream/70" : "text-rose-deep"}`}>{w.hint}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="pb-24 md:pb-32" aria-labelledby="visit-title">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div className="space-y-10">
              <SectionTitle eyebrow="Find us">
                <span id="visit-title" className="block font-medium">Visit</span>
                <span className="block italic normal-case">the salon</span>
              </SectionTitle>
              <div data-reveal className="space-y-6 text-lede">
                <p className="flex gap-3">
                  <PinIcon className="mt-1.5 shrink-0 text-rose-deep" />
                  <span>
                    {salon.address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                    <a
                      href={salon.mapsUrl}
                      target="_blank"
                      rel="noopener"
                      className="mt-2 inline-flex min-h-11 items-center gap-2 border-b border-wine/40 text-base text-wine hover:text-rose-deep"
                    >
                      Open in Google Maps <ArrowIcon />
                    </a>
                  </span>
                </p>
                <div className="flex gap-3">
                  <ClockIcon className="mt-1.5 shrink-0 text-rose-deep" />
                  <dl>
                    {salon.hours.map((h) => (
                      <div key={h.days}>
                        <dt>{h.days}</dt>
                        <dd className="font-semibold">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <div data-reveal className="rounded-[1.25rem] border border-wine/15 p-6">
                <h3 className="eyebrow text-rose-deep">Good to know</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  {salon.policy.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div data-reveal className="min-h-[24rem] overflow-hidden rounded-[1.5rem] bg-blush">
              <iframe
                title="Map showing Salon Chic at 14 Moerdyk Street, Townsend Estate, Goodwood"
                src={salon.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[24rem] w-full border-0 grayscale-[0.4] sepia-[0.15]"
              />
            </div>
          </Container>
        </section>
      </Sheet>
    </Layout>
  );
}
