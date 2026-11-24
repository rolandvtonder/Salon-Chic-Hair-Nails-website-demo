import { u } from "../lib/url";
import { home, salon, services, specials } from "../content";
import { BookButtons } from "../components/BookButtons";
import { FlyerCrop } from "../components/FlyerCrop";
import { Headline } from "../components/Headline";
import { HomeStage } from "../components/HomeStage";
import { ArrowIcon, ClockIcon, GiftIcon, PinIcon } from "../components/Icons";
import { Container, Layout, SectionTitle } from "../components/Layout";
import { PriceRow } from "../components/PriceList";

export function Home() {
  return (
    <Layout current={u("/")}>
      <HomeStage />

      <div className="relative z-10 bg-paper">
        {/* Statement */}
        <Container className="grid gap-12 py-24 md:py-36 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div data-reveal>
            <p className="eyebrow text-rose-deep">{salon.name} {salon.trade}</p>
            <Headline as="h2" lines={home.statement} animate={false} className="mt-4 text-title text-wine" />
            <p className="mt-8 max-w-xl text-lede">
              A friendly, bookings-only salon in Townsend Estate, Goodwood. Pop in for a wash and set, a colour
              refresh, fresh gel nails or a full set of lashes — and leave feeling like you.
            </p>
            <a
              href={u("/about/")}
              className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-wine/40 text-wine transition-colors hover:border-rose-deep hover:text-rose-deep"
            >
              About the salon <ArrowIcon />
            </a>
          </div>
          <div data-reveal style={{ "--d": "150ms" } as React.CSSProperties} className="mx-auto w-full max-w-md">
            <img
              src={u("/media/logo-art.jpg")}
              alt="Salon Chic's line-art logo: a woman with flowing hair and a flower crown, scissors trimming her hair"
              width={720}
              height={726}
              loading="lazy"
              className="w-full mix-blend-multiply"
            />
          </div>
        </Container>

        {/* Services */}
        <section className="pb-24 md:pb-36" aria-labelledby="services-title">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle eyebrow="Services">
                <span id="services-title" className="block font-medium">What we do</span>
              </SectionTitle>
              <p data-reveal className="max-w-sm text-lede">Book one treatment, or treat yourself to a few.</p>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => (
                <li key={s.href} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                  <a href={s.href} className="group block">
                    <div className="aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-blush">
                      <img
                        src={s.image}
                        alt={s.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-silk)] group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <h3 className="text-[2.2rem] uppercase italic leading-none text-wine">{s.title}</h3>
                      <span className="shrink-0 text-rose-deep">
                        <span className="text-sm italic">from </span>
                        <span className="font-semibold">{s.from}</span>
                      </span>
                    </div>
                    <p className="mt-2">{s.line}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-rose-deep">
                      See prices <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Current special */}
        <section className="grain relative overflow-hidden bg-ink py-24 text-cream md:py-32" aria-labelledby="special-title">
          <Container className="relative">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
              <div data-reveal>
                <p className="eyebrow text-rosegold">On now · Limited slots</p>
                <h2 id="special-title" className="mt-4 text-title uppercase">
                  <span className="block font-medium">Black Friday</span>
                  <span className="block italic normal-case text-rosegold">beauty specials</span>
                </h2>
                <p className="mt-6 flex items-center gap-3 text-lede text-cream/85">
                  <GiftIcon className="shrink-0 text-rosegold" />
                  {specials.current.extra}
                </p>
                <a
                  href={u("/specials/")}
                  className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-cream/40 transition-colors hover:border-rosegold hover:text-rosegold"
                >
                  All specials &amp; T's and C's <ArrowIcon />
                </a>
              </div>
              <ul className="grid gap-4 sm:grid-cols-3">
                {specials.current.items.map((it, i) => (
                  <li
                    key={it.name}
                    data-reveal
                    style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                    className="overflow-hidden rounded-[1.25rem] bg-cocoa"
                  >
                    <img src={it.image} alt={it.alt} loading="lazy" className="aspect-[3/4] w-full object-cover sm:aspect-[3/5]" />
                    <div className="p-5">
                      <h3 className="text-[1.5rem] uppercase italic leading-none">{it.name}</h3>
                      {it.note && <p className="mt-1 text-sm text-cream/70">{it.note}</p>}
                      <p className="mt-3 text-[2.2rem] font-semibold leading-none text-rosegold">{it.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* Pensioners */}
        <section className="bg-blush py-24 md:py-32" aria-labelledby="pensioners-title">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <SectionTitle eyebrow="Every weekday">
              <span id="pensioners-title" className="block font-medium">Pensioners'</span>
              <span className="block italic normal-case">menu</span>
            </SectionTitle>
            <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
              <p className="text-lede">{specials.pensioners.intro}</p>
              <ul className="mt-6 divide-y divide-wine/15 border-t border-wine/20">
                {specials.pensioners.items.map((it) => (
                  <PriceRow key={it.name} item={it} />
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* Real results */}
        <section className="py-24 md:py-36" aria-labelledby="results-title">
          <Container>
            <SectionTitle eyebrow="From our chair">
              <span id="results-title" className="block font-medium">Real clients,</span>
              <span className="block italic normal-case">real results</span>
            </SectionTitle>
            <div className="mt-12 grid grid-cols-3 gap-3 md:gap-5">
              <FlyerCrop name="hands" alt="A client's hands with a fresh soft-pink manicure" className="rounded-[1rem] md:rounded-[1.25rem]" />
              <FlyerCrop name="highlights" alt="Long blonde full-head highlights, finished with a blow-dry" className="rounded-[1rem] md:rounded-[1.25rem]" />
              <FlyerCrop name="gel" alt="Pink gel nails with a little nail art" className="rounded-[1rem] md:rounded-[1.25rem]" />
            </div>
          </Container>
        </section>

        {/* Visit */}
        <section className="border-t border-wine/10 py-20" aria-label="Visit us">
          <Container className="grid gap-10 md:grid-cols-3 md:items-center">
            <p className="flex gap-3 text-lede">
              <PinIcon className="mt-1.5 shrink-0 text-rose-deep" />
              <span>{salon.address.join(", ")}</span>
            </p>
            <p className="flex gap-3 text-lede">
              <ClockIcon className="mt-1.5 shrink-0 text-rose-deep" />
              <span>
                {salon.hours[0].days}, {salon.hours[0].time} · Bookings only
              </span>
            </p>
            <BookButtons tone="light" className="md:justify-end" />
          </Container>
        </section>
      </div>
    </Layout>
  );
}
