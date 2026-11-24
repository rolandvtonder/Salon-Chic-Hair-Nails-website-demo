import { u } from "../lib/url";
import { specials } from "../content";
import { BookButtons } from "../components/BookButtons";
import { CheckIcon, GiftIcon } from "../components/Icons";
import { Container, Layout, SectionTitle, Sheet } from "../components/Layout";
import { PageHero } from "../components/PageHero";
import { PriceRow } from "../components/PriceList";

export function Specials() {
  const c = specials.current;
  return (
    <Layout current={u("/specials/")}>
      <PageHero
        eyebrow={specials.eyebrow}
        lines={specials.headline}
        intro={specials.intro}
        image={u("/media/hero-poster.jpg")}
        alt="Woman flipping her long brown hair against a dark background"
        service="one of the Black Friday specials"
      />
      <Sheet>
        <section className="py-24 md:py-32" aria-labelledby="bf-title">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle eyebrow="On now · Limited space">
                <span id="bf-title" className="block font-medium">{c.title.split(" ").slice(0, 2).join(" ")}</span>
                <span className="block italic normal-case">{c.title.split(" ").slice(2).join(" ").toLowerCase()}</span>
              </SectionTitle>
              <p data-reveal className="flex max-w-sm items-center gap-3 text-lede text-rose-deep">
                <GiftIcon className="shrink-0" /> {c.extra}
              </p>
            </div>

            <ul className="mt-14 grid gap-5 md:grid-cols-3">
              {c.items.map((it, i) => (
                <li
                  key={it.name}
                  data-reveal
                  style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                  className="overflow-hidden rounded-[1.5rem] bg-ink text-cream"
                >
                  <img src={it.image} alt={it.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <div className="flex items-end justify-between gap-4 p-6 md:p-8">
                    <div>
                      <h3 className="text-[1.9rem] uppercase italic leading-none">{it.name}</h3>
                      {it.note && <p className="mt-2 text-sm text-cream/70">{it.note}</p>}
                    </div>
                    <p className="shrink-0 text-[2.6rem] font-semibold leading-none text-rosegold">{it.price}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div data-reveal className="mt-14 grid gap-10 rounded-[1.5rem] border border-wine/15 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
              <div>
                <h3 className="eyebrow text-rose-deep">T's &amp; C's apply</h3>
                <ul className="mt-4 space-y-2">
                  {c.terms.map((t) => (
                    <li key={t} className="flex gap-3">
                      <CheckIcon className="mt-1 shrink-0 text-rose-deep" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <BookButtons tone="light" service="one of the Black Friday specials" />
            </div>
          </Container>
        </section>

        <section className="bg-blush py-24 md:py-32" aria-labelledby="pens-title">
          <Container className="grid gap-12 lg:grid-cols-2">
            <SectionTitle eyebrow="Every weekday">
              <span id="pens-title" className="block font-medium">Pensioners'</span>
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

        <section className="py-24 md:py-32" aria-labelledby="flyers-title">
          <Container>
            <SectionTitle eyebrow="As seen on Facebook">
              <span id="flyers-title" className="block font-medium">Our</span>
              <span className="block italic normal-case">flyers</span>
            </SectionTitle>
            <ul className="mt-14 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {specials.flyers.map((f, i) => (
                <li key={f.src} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                  <a href={f.src} target="_blank" rel="noopener" className="block overflow-hidden rounded-[1.25rem] bg-cream shadow-[0_30px_60px_-30px_rgb(78_37_34/0.45)] transition-transform duration-500 hover:-translate-y-1">
                    <img src={f.src} alt={f.alt} loading="lazy" className="w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </Sheet>
    </Layout>
  );
}
