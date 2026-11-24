import { u } from "../lib/url";
import { wellness } from "../content";
import { BookButtons } from "../components/BookButtons";
import { CheckIcon, ClockIcon } from "../components/Icons";
import { Container, Layout, SectionTitle, Sheet } from "../components/Layout";
import { PageHero } from "../components/PageHero";

export function Wellness() {
  return (
    <Layout current={u("/wellness/")}>
      <PageHero
        eyebrow={wellness.eyebrow}
        lines={wellness.headline}
        intro={wellness.intro}
        image={u("/media/wellness.jpg")}
        alt="Client relaxing on a treatment bed in a dim spa room"
        position="40% 60%"
        service="a lymphatic drainage boots session"
      />
      <Sheet>
        <Container className="grid gap-16 py-24 md:py-32 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionTitle eyebrow="Lymphatic drainage boots">
              <span className="block font-medium">How it</span>
              <span className="block italic normal-case">works</span>
            </SectionTitle>
            <div data-reveal className="mt-8 max-w-xl space-y-5 text-lede">
              <p>
                You lie back with a pair of soft, air-filled boots around your legs. Chambers inflate one after
                another, from your feet upward, in a gentle squeeze-and-release rhythm that moves fluid along.
              </p>
              <p>Put your phone down, close your eyes and let the boots do the work.</p>
            </div>
          </div>
          <div
            data-reveal
            style={{ "--d": "120ms" } as React.CSSProperties}
            className="self-start rounded-[1.5rem] bg-ink p-8 text-cream md:p-12"
          >
            <p className="eyebrow text-rosegold">One session</p>
            <p className="mt-4 text-[clamp(4rem,9vw,7rem)] font-semibold leading-none text-rosegold">
              {wellness.price.price}
            </p>
            <p className="mt-3 flex items-center gap-2 text-lede text-cream/85">
              <ClockIcon className="text-rosegold" /> {wellness.price.note}
            </p>
            <ul className="mt-8 space-y-3 border-t border-cream/15 pt-8">
              {wellness.benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <CheckIcon className="mt-1 shrink-0 text-rosegold" />
                  {b}
                </li>
              ))}
            </ul>
            <BookButtons className="mt-10" service="a lymphatic drainage boots session" />
          </div>
        </Container>

        <section className="bg-blush py-24 md:py-32" aria-labelledby="who-for">
          <Container>
            <SectionTitle eyebrow="Who it's for">
              <span id="who-for" className="block font-medium">Made for</span>
              <span className="block italic normal-case">tired legs</span>
            </SectionTitle>
            <ul className="mt-14 grid gap-5 md:grid-cols-3">
              {wellness.forWho.map((w, i) => (
                <li
                  key={w.title}
                  data-reveal
                  style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                  className="rounded-[1.25rem] bg-cream p-8"
                >
                  <h3 className="text-[2rem] uppercase italic leading-none text-wine">{w.title}</h3>
                  <p className="mt-4">{w.text}</p>
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-12 max-w-3xl border-l-2 border-rose pl-5 text-wine">
              {wellness.care}
            </p>
          </Container>
        </section>
      </Sheet>
    </Layout>
  );
}
