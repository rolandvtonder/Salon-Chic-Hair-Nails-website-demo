import { u } from "../lib/url";
import { lashes } from "../content";
import { BookButtons } from "../components/BookButtons";
import { Container, Layout, SectionTitle, Sheet } from "../components/Layout";
import { PageHero } from "../components/PageHero";
import { PriceList } from "../components/PriceList";

export function Lashes() {
  return (
    <Layout current={u("/lashes/")}>
      <PageHero
        eyebrow={lashes.eyebrow}
        lines={lashes.headline}
        intro={lashes.intro}
        image={u("/media/lashes.jpg")}
        alt="Lash extension strips and tweezers on a pink background"
        position="50% 35%"
        service="lash extensions"
      />
      <Sheet>
        <section className="py-24 md:py-32" aria-labelledby="lash-styles">
          <Container>
            <SectionTitle eyebrow="Which set is for you?">
              <span id="lash-styles" className="block font-medium">Three</span>
              <span className="block italic normal-case">looks</span>
            </SectionTitle>
            <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.25rem] bg-wine/15 md:grid-cols-3">
              {lashes.styles.map((s, i) => (
                <li
                  key={s.name}
                  data-reveal
                  style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                  className="bg-cream p-8 md:p-10"
                >
                  <span className="eyebrow text-rose-deep">0{i + 1}</span>
                  <h3 className="mt-4 text-[2.6rem] uppercase italic leading-none text-wine">{s.name}</h3>
                  <p className="mt-4">{s.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="bg-blush py-24 md:py-32" aria-labelledby="lash-prices">
          <Container>
            <SectionTitle eyebrow="Price list">
              <span id="lash-prices" className="block font-medium">Lash</span>
              <span className="block italic normal-case">menu</span>
            </SectionTitle>
            <div className="mt-14 grid gap-14 md:grid-cols-3 md:gap-10">
              {lashes.groups.map((g, i) => (
                <PriceList key={g.title} group={g} index={i} />
              ))}
            </div>
            <p data-reveal className="mt-14 max-w-2xl text-lede">
              {lashes.note} Book a refill within 2–3 weeks to keep your set full for less.
            </p>
          </Container>
        </section>

        <section className="py-24 md:py-32">
          <Container className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
            <img
              data-reveal
              src={u("/media/flyer-lashes.jpg")}
              alt="Salon Chic Lashes printed price list"
              loading="lazy"
              width={1080}
              height={1920}
              className="mx-auto w-full max-w-sm rounded-[1.25rem] shadow-[0_30px_60px_-30px_rgb(78_37_34/0.45)]"
            />
            <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
              <p className="font-script text-[clamp(2.4rem,5vw,4rem)] leading-tight text-rose-deep">
                Enhance your natural beauty
              </p>
              <p className="mt-6 max-w-lg text-lede">
                Come with clean, make-up-free eyes and plan to relax — a new set is a lie-down appointment.
              </p>
              <BookButtons tone="light" service="lash extensions" className="mt-8" />
            </div>
          </Container>
        </section>
      </Sheet>
    </Layout>
  );
}
