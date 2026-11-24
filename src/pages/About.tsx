import { u } from "../lib/url";
import { about, salon } from "../content";
import { BookButtons } from "../components/BookButtons";
import { Container, Layout, SectionTitle, Sheet } from "../components/Layout";
import { PageHero } from "../components/PageHero";

export function About() {
  return (
    <Layout current={u("/about/")}>
      <PageHero
        eyebrow={about.eyebrow}
        lines={about.headline}
        intro={about.intro}
        image={u("/media/styling.jpg")}
        alt="Stylist finishing a client's sleek hairstyle"
        position="50% 25%"
      />
      <Sheet>
        <Container className="grid gap-16 py-24 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionTitle eyebrow="Our story">
              <span className="block font-medium">A good</span>
              <span className="block italic normal-case">hair day, every day</span>
            </SectionTitle>
            <div data-reveal className="mt-8 max-w-xl space-y-5 text-lede">
              {about.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <figure data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="mx-auto w-full max-w-md text-center">
            <img
              src={u("/media/logo-art.jpg")}
              alt="Salon Chic's line-art logo: a woman with flowing hair and a flower crown, scissors trimming her hair"
              width={720}
              height={726}
              loading="lazy"
              className="w-full mix-blend-multiply"
            />
            <figcaption className="mt-4 font-script text-[2.2rem] text-rose-deep">{salon.tagline}</figcaption>
          </figure>
        </Container>

        <section className="bg-ink py-24 text-cream md:py-32" aria-labelledby="values-title">
          <Container>
            <div data-reveal>
              <p className="eyebrow text-rosegold">Why clients come back</p>
              <h2 id="values-title" className="mt-3 text-title uppercase">
                <span className="block font-medium">The Salon Chic</span>
                <span className="block italic normal-case text-rosegold">way</span>
              </h2>
            </div>
            <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.25rem] bg-cream/15 sm:grid-cols-2 lg:grid-cols-4">
              {about.values.map((v, i) => (
                <li
                  key={v.title}
                  data-reveal
                  style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                  className="bg-ink p-8"
                >
                  <span className="eyebrow text-rosegold">0{i + 1}</span>
                  <h3 className="mt-4 text-[2rem] uppercase italic leading-none">{v.title}</h3>
                  <p className="mt-4 text-cream/80">{v.text}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="py-24 md:py-32">
          <Container className="text-center">
            <p data-reveal className="mx-auto max-w-4xl text-[clamp(2.2rem,5vw,4.5rem)] uppercase leading-[0.95] text-wine">
              {salon.motto.map((m, i) => (
                <span key={m} className={i % 2 ? "italic normal-case text-rose-deep" : "font-medium"}>
                  {m}.{" "}
                </span>
              ))}
            </p>
            <BookButtons tone="light" className="mt-10 justify-center" />
          </Container>
        </section>
      </Sheet>
    </Layout>
  );
}
