import { u } from "../lib/url";
import { hair } from "../content";
import { BookButtons } from "../components/BookButtons";
import { FlyerCrop } from "../components/FlyerCrop";
import { Container, Layout, SectionTitle, Sheet } from "../components/Layout";
import { PageHero } from "../components/PageHero";
import { PriceList } from "../components/PriceList";

export function Hair() {
  return (
    <Layout current={u("/hair/")}>
      <PageHero
        eyebrow={hair.eyebrow}
        lines={hair.headline}
        intro={hair.intro}
        image={u("/media/hair.jpg")}
        alt="Woman with a soft rose-pink colour melt, seen in profile"
        position="60% 30%"
        service="a hair appointment"
      />
      <Sheet>
        <Container className="py-24 md:py-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionTitle eyebrow="Price list">
                <span className="block font-medium">Hair</span>
                <span className="block italic normal-case">menu</span>
              </SectionTitle>
              <p data-reveal className="mt-6 max-w-sm">
                {hair.note}
              </p>
              <div data-reveal className="mt-10 max-w-xs">
                <FlyerCrop
                  name="highlights"
                  alt="Long blonde full-head highlights done at Salon Chic"
                  className="rounded-[1.25rem]"
                />
                <p className="mt-3 text-sm italic text-rose-deep">Full-head highlights, from our chair.</p>
              </div>
            </div>
            <div className="grid gap-14 md:grid-cols-2 md:gap-x-12">
              {hair.groups.map((g, i) => (
                <PriceList key={g.title} group={g} index={i} />
              ))}
            </div>
          </div>
        </Container>

        <section className="bg-blush py-20">
          <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <p data-reveal className="max-w-2xl text-[clamp(1.8rem,3.6vw,3rem)] uppercase leading-[0.95] text-wine">
              <span className="font-medium">Not sure what you need? </span>
              <span className="italic normal-case">Send us a photo of your hair and the look you love.</span>
            </p>
            <BookButtons tone="light" service="a hair consultation" className="shrink-0" />
          </Container>
        </section>
      </Sheet>
    </Layout>
  );
}
