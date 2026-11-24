/**
 * Every word and price on the site lives here, so updating a special or a
 * price never means touching a component.
 *
 * Headline lines are data: `italic: true` marks the lines set in italic, so
 * the mix of upright and italic stays in the copy rather than in the markup.
 *
 * Prices come from the salon's own price lists and flyers (Nov 2026).
 * Prices marked `from` depend on hair length and thickness.
 */

import { u } from "./lib/url";
export type Line = { text: string; italic?: boolean };
export type PriceItem = { name: string; price: string; note?: string; from?: boolean };
export type PriceGroup = { title: string; intro?: string; items: PriceItem[] };

export const salon = {
  name: "Salon Chic",
  trade: "Hair & Nails",
  tagline: "Let's make every day a good hair day!",
  motto: ["Look good", "Feel good", "Be you"],
  phoneDisplay: "076 310 0692",
  phoneHref: "tel:+27763100692",
  whatsapp: "27763100692",
  email: "Salonchic14@gmail.com",
  address: ["14 Moerdyk Street", "Townsend Estate", "Goodwood, Cape Town"],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=14+Moerdyk+Street%2C+Townsend+Estate%2C+Goodwood%2C+Cape+Town",
  mapsEmbed:
    "https://www.google.com/maps?q=14+Moerdyk+Street,+Townsend+Estate,+Goodwood,+Cape+Town&output=embed",
  hours: [{ days: "Monday – Friday", time: "08:00 – 18:00" }],
  facebook: "https://www.facebook.com/lien.conradie1991",
  instagram: "https://www.instagram.com/salonchichair",
  instagramHandle: "@salonchichair",
  policy: [
    "Bookings only — no walk-ins, so your time in the chair is yours.",
    "A 50% deposit secures your appointment.",
    "Specials have limited slots. T's & C's apply.",
  ],
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(message)}`;

export const nav = [
  { href: u("/"), label: "Home", italic: false },
  { href: u("/hair/"), label: "Hair", italic: true },
  { href: u("/nails/"), label: "Nails & Feet", italic: false },
  { href: u("/lashes/"), label: "Lashes", italic: true },
  { href: u("/wellness/"), label: "Wellness", italic: false },
  { href: u("/specials/"), label: "Specials", italic: true },
  { href: u("/about/"), label: "About", italic: false },
  { href: u("/contact/"), label: "Book & Contact", italic: true },
];

/* ───────────────────────────── Home ───────────────────────────── */

export const home = {
  eyebrow: "Hair · Nails · Lashes · Wellness — Goodwood, Cape Town",
  headline: [
    { text: "Let's make" },
    { text: "every day", italic: true },
    { text: "a good" },
    { text: "hair day.", italic: true },
  ] as Line[],
  intro:
    "Cuts, colour, gel nails, lash extensions and lymphatic drainage, all under one roof in Townsend Estate. Bookings only, so the time is set aside just for you.",
  panels: [
    { title: "Look good", caption: "Cut, colour & blow-dry", href: u("/hair/") },
    { title: "Feel good", caption: "Gel, tips & pedicures", href: u("/nails/") },
    { title: "Be you", caption: "Lashes & wellness", href: u("/lashes/") },
  ],
  statement: [
    { text: "Beautiful hair," },
    { text: "perfect nails,", italic: true },
    { text: "all in one place." },
  ] as Line[],
};

export const services = [
  {
    href: u("/hair/"),
    title: "Hair",
    line: "Cuts, colour, highlights, balayage and Brazilian blowouts.",
    from: "R150",
    image: u("/media/hair.jpg"),
    alt: "Woman with a soft rose-pink colour melt, seen in profile",
  },
  {
    href: u("/nails/"),
    title: "Nails & Feet",
    line: "Gel manicures, full cover tips, BIAB, acrylic and pedicures.",
    from: "R200",
    image: u("/media/nails.jpg"),
    alt: "Hand with a fresh nude-pink manicure holding two bottles of polish",
  },
  {
    href: u("/lashes/"),
    title: "Lashes",
    line: "Classic, volume and mega volume extensions with refills.",
    from: "R200",
    image: u("/media/lashes.jpg"),
    alt: "Lash extension strips and tweezers on a pink background",
  },
  {
    href: u("/wellness/"),
    title: "Wellness",
    line: "Lymphatic drainage boots for tired, heavy legs.",
    from: "R300",
    image: u("/media/wellness.jpg"),
    alt: "Client relaxing on a treatment bed in a dim spa room",
  },
];

/* ───────────────────────────── Hair ───────────────────────────── */

export const hair = {
  eyebrow: "Hair",
  headline: [{ text: "Colour," }, { text: "cut &", italic: true }, { text: "care." }] as Line[],
  intro:
    "From a fresh wash, cut and blow to full-head highlights, balayage and Brazilian smoothing. Tell us what you're dreaming of and we'll make it work for your hair.",
  groups: [
    {
      title: "Cut & style",
      items: [
        { name: "Wash, cut & blow", price: "R300" },
        { name: "Wash & treatment", price: "R150", from: true },
        { name: "Blow-dry & style", price: "R250", from: true },
      ],
    },
    {
      title: "Colour",
      items: [
        { name: "Root touch-up", price: "R450", from: true },
        { name: "Full colour", price: "R650", from: true },
        { name: "Colour, cut & blow", price: "R800" },
        { name: "Highlights — half head", price: "R650" },
        { name: "Highlights / lowlights", price: "R750", from: true },
        { name: "Balayage / ombré", price: "R850", from: true },
      ],
    },
    {
      title: "Smoothing",
      items: [{ name: "Brazilian blowout", price: "R1 000" }],
    },
    {
      title: "Pensioners",
      intro: "Every weekday, for our pensioner clients.",
      items: [
        { name: "Wash & set", price: "R50" },
        { name: "Wash, cut & set", price: "R80" },
        { name: "Perm, cut & set", price: "R150" },
      ],
    },
  ] as PriceGroup[],
  note: "“From” prices depend on the length and thickness of your hair. We'll confirm your price when you book.",
};

/* ───────────────────────────── Nails ───────────────────────────── */

export const nails = {
  eyebrow: "Nails & Feet",
  headline: [{ text: "Polished" }, { text: "to the", italic: true }, { text: "fingertip." }] as Line[],
  intro:
    "Neat gel, natural BIAB, full cover tips or a long, relaxing pedicure. Soft nudes, a pop of colour or a little nail art — your hands, your way.",
  groups: [
    {
      title: "Hands",
      items: [
        { name: "Manicure, gel, acrylic or BIAB", price: "R200", from: true },
        { name: "Gel manicure", price: "R250" },
        { name: "Manicure + gel overlay", price: "R300" },
        { name: "Full cover tips", price: "R350" },
      ],
    },
    {
      title: "Feet",
      items: [
        { name: "Pedicure + gel overlay", price: "R330" },
        { name: "Pensioners' pedicure", price: "R100", note: "Pensioners only" },
      ],
    },
  ] as PriceGroup[],
  note: "Nail art and removals are quoted when you book.",
};

/* ───────────────────────────── Lashes ───────────────────────────── */

export const lashes = {
  eyebrow: "Lashes",
  headline: [{ text: "Lashes" }, { text: "that", italic: true }, { text: "speak." }] as Line[],
  intro:
    "Enhance your natural beauty with professional eyelash extensions — from a soft, natural classic set to full mega volume.",
  styles: [
    { name: "Classic", text: "One extension on each natural lash. Soft, defined and natural — like your lashes, only better." },
    { name: "Volume", text: "Light fans of several fine lashes on each natural lash, for a fuller, fluffier look." },
    { name: "Mega volume", text: "The densest, darkest fans for a bold, dramatic, made-up look every day." },
  ],
  groups: [
    {
      title: "Classic lashes",
      items: [
        { name: "New set", price: "R400" },
        { name: "Refill (2–3 weeks)", price: "R200" },
        { name: "Refill (4 weeks)", price: "R300" },
      ],
    },
    {
      title: "Volume lashes",
      items: [
        { name: "Full set", price: "R500" },
        { name: "Refill (2–3 weeks)", price: "R300" },
        { name: "Refill (4 weeks)", price: "R400" },
      ],
    },
    {
      title: "Mega volume lashes",
      items: [
        { name: "Full set", price: "R550" },
        { name: "Refill (2–3 weeks)", price: "R350" },
        { name: "Refill (4 weeks)", price: "R450" },
      ],
    },
  ] as PriceGroup[],
  note: "We also offer lash removal and lash tinting to complete your look — ask when you book.",
};

/* ───────────────────────────── Wellness ───────────────────────────── */

export const wellness = {
  eyebrow: "Wellness",
  headline: [{ text: "Rest" }, { text: "your", italic: true }, { text: "legs." }] as Line[],
  intro:
    "Lymphatic drainage boots use gentle, pneumatic air pressure to give your legs a sequential massage — a deeply relaxing 40 minutes for tired, heavy or swollen legs.",
  price: { name: "Lymphatic drainage boots", price: "R300", note: "per 40-minute session" },
  benefits: [
    "Improved circulation and lymphatic flow",
    "Less muscle fatigue, more flexibility",
    "Reduced swelling and fluid retention",
    "Faster muscle recovery",
    "Deep relaxation",
  ],
  forWho: [
    { title: "On your feet all day", text: "Nurses, teachers, hairdressers, retail — anyone whose legs feel it by Friday." },
    { title: "Active & athletes", text: "Recover faster after training, runs and race days." },
    { title: "Travellers", text: "Ease puffy, heavy legs after long flights and road trips." },
  ],
  care:
    "Please let us know when you book if you are pregnant, have a heart condition, a blood clot or any other medical condition — check with your doctor first.",
};

/* ───────────────────────────── Specials ───────────────────────────── */

export const specials = {
  eyebrow: "Specials",
  headline: [{ text: "Black" }, { text: "Friday", italic: true }, { text: "beauty." }] as Line[],
  intro: "Look good, feel amazing. Our Black Friday beauty specials are here — and every booking comes with a free surprise gift.",
  current: {
    title: "Black Friday Beauty Specials",
    items: [
      { name: "Full on pedicure", price: "R350", image: u("/media/feet.jpg"), alt: "Feet resting during a pedicure treatment" },
      { name: "Full head highlights", price: "R850", note: "Toner not included", image: u("/media/hair.jpg"), alt: "Soft rose colour melt in shoulder-length hair" },
      { name: "Brazilian (for hair)", price: "R500", image: u("/media/styling.jpg"), alt: "Stylist finishing a client's sleek hairstyle" },
    ],
    extra: "Free surprise gift with your booking",
    terms: ["Bookings only", "50% non-refundable deposit when making your booking", "Limited space available"],
  },
  pensioners: {
    title: "Pensioners' menu",
    intro: "Monday to Friday, 08:00 – 18:00. Bookings only.",
    items: [
      { name: "Wash & set", price: "R50" },
      { name: "Wash, cut & set", price: "R80" },
      { name: "Perm, cut & set", price: "R150" },
      { name: "Pedicure", price: "R100" },
    ] as PriceItem[],
  },
  flyers: [
    { src: u("/media/flyer-blackfriday.jpg"), alt: "Black Friday Beauty Specials flyer: full on pedicure R350, full head highlights R850, Brazilian R500" },
    { src: u("/media/flyer-pensioners.jpg"), alt: "Pensioners only flyer: wash and set R50, wash cut and set R80, perm cut and set R150, pedicure R100" },
    { src: u("/media/flyer-lashes.jpg"), alt: "Salon Chic Lashes price list" },
  ],
};

/* ───────────────────────────── About ───────────────────────────── */

export const about = {
  eyebrow: "About",
  headline: [{ text: "Look good." }, { text: "Feel good.", italic: true }, { text: "Be you." }] as Line[],
  intro:
    "Salon Chic Hair & Nails is a friendly, bookings-only salon in Townsend Estate, Goodwood — for hair, nails, lashes and a little wellness, all in one place.",
  story: [
    "We believe a good hair day can change your whole day. That's why every appointment is booked in advance: no rush, no waiting room, just time set aside for you.",
    "Whether it's your first colour or your weekday pensioner wash and set, everyone gets the same care, the same welcome and the same honest advice.",
  ],
  values: [
    { title: "Time for you", text: "Bookings only, so you never wait and never feel rushed." },
    { title: "Every age welcome", text: "Weekday pensioner prices on wash & sets, perms and pedicures." },
    { title: "All in one place", text: "Hair, nails, lashes and lymphatic drainage under one roof." },
    { title: "Honest pricing", text: "Clear prices up front, and we confirm before we start." },
  ],
};

/* ───────────────────────────── Contact ───────────────────────────── */

export const contact = {
  eyebrow: "Book & Contact",
  headline: [{ text: "Your chair" }, { text: "is", italic: true }, { text: "waiting." }] as Line[],
  intro: "We work by appointment only. Call or WhatsApp us to find a time that suits you.",
};
