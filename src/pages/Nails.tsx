import { u } from "../lib/url";
import { nails } from "../content";
import { BookButtons } from "../components/BookButtons";
import { FlyerCrop } from "../components/FlyerCrop";
import { Container, Layout, SectionTitle, Sheet } from "../components/Layout";
import { PageHero } from "../components/PageHero";
import { PriceList } from "../components/PriceList";

export function Nails() {
  return (
    <Layout current={u("/nails/")}>
      <PageHero
        eyebrow={nails.eyebrow}
        lines={nails.headline}
        intro={nails.intro}
        image={u("/media/nails.jpg")}
        alt="Hand with a fresh nude-pink manicure holding two bottles of polish"
        position="50% 40%"
        service="a nail appointment"
      />
      <Sheet>
        <Container className="py-24 md:py-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <SectionTitle eyebrow="Price list">
                <span className="block font-medium">Nails</span>
                <span className="block italic normal-case">&amp; feet</span>
              </SectionTitle>
              <p data-reveal className="mt-6 max-w-sm">
                {nails.note}
              </p>
            </div>
            <div className="grid gap-14 md:grid-cols-2 md:gap-x-12">
              {nails.groups.map((g, i) => (
                <PriceList key={g.title} group={g} index={i} />
              ))}
            </div>
          </div>
        </Container>

        <section className="pb-24 md:pb-32" aria-labelledby="nails-results">
          <Container>
            <SectionTitle eyebrow="From our chair">
              <span id="nails-results" className="block font-medium">Hands</span>
              <span className="block italic normal-case">we've loved</span>
            </SectionTitle>
            <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-[1fr_1fr_1.6fr] md:gap-5">
              <FlyerCrop name="gel" alt="Pink gel nails with a little nail art" className="rounded-[1.25rem]" />
              <FlyerCrop name="hands" alt="A client's hands with a soft-pink manicure" className="rounded-[1.25rem]" />
              <img
                data-reveal
                src={u("/media/feet.jpg")}
                alt="Feet being massaged during a pedicure"
                loading="lazy"
                className="col-span-2 aspect-[16/10] h-full w-full rounded-[1.25rem] object-cover md:col-span-1 md:aspect-auto"
              />
            </div>
          </Container>
        </section>

        <section className="bg-ink py-20 text-cream">
          <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <p data-reveal className="max-w-2xl text-[clamp(1.8rem,3.6vw,3rem)] uppercase leading-[0.95]">
              <span className="font-medium">Soft nudes or a pop of colour? </span>
              <span className="italic normal-case text-rosegold">Bring your inspiration photo.</span>
            </p>
            <BookButtons service="a manicure or pedicure" className="shrink-0" />
          </Container>
        </section>
      </Sheet>
    </Layout>
  );
}
