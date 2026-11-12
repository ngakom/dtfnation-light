// Business details, prices and content for the DTF Nation website. Change prices and contact details here only.

export const SITE = {
  name: "DTF Nation SA",
  tagline: "Direct to Perfection",
  slogan: "Your print. Our passion. Nationwide delivery.",
  // TODO: replace with the live domain once registered.
  url: "https://www.dtfnation.co.za",
  contactPerson: "Andre Pieterse",
  phone: { display: "062 604 2053", tel: "+27626042053" },
  whatsapp: "27626042053",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** Gang sheet size: 570 mm wide, priced per running meter (1000 mm). */
export const SHEET = { widthMm: 570, meterMm: 1000 };

/** Price per meter by order size. Each tier applies from `from` meters up to the next tier. */
export const PRICE_TIERS = [
  { from: 0, label: "0 – 2 meters", price: 250 },
  { from: 2, label: "2 – 4 meters", price: 220 },
  { from: 5, label: "5 meters and above", price: 180 },
];

export function priceFor(meters: number) {
  const tier = [...PRICE_TIERS].reverse().find((t) => meters >= t.from) ?? PRICE_TIERS[0];
  return { tier, perMeter: tier.price, total: Math.round(meters * tier.price * 100) / 100 };
}

export const rand = (n: number) => `R${n.toLocaleString("en-ZA", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

export const SELLING_POINTS = [
  {
    icon: "printer",
    title: "Same-day printing",
    text: "Orders received and approved before our daily cut-off time qualify for same-day printing, subject to capacity.",
  },
  {
    icon: "truck",
    title: "Next-day courier",
    text: "Fast courier options available to get your prints to you as quickly as possible.",
  },
  {
    icon: "pin",
    title: "Nationwide collection",
    text: "Collect your DTF prints from one of our participating collection points.",
  },
] as const;

export const STEPS = [
  { title: "Prepare your gang sheet", text: `Lay out your designs on a ${SHEET.widthMm} mm wide, print-ready gang sheet.` },
  { title: "Place your order", text: "Choose your meters, see your price and pick courier delivery or collection." },
  { title: "Send your artwork", text: "Send your gang sheet to us on WhatsApp. Vector files are best. We check it and confirm your order." },
  { title: "We print, you press", text: "Approved orders before cut-off are printed the same day, then couriered or sent to your collection point." },
];

export const SUITABLE_FOR = ["T-shirts", "Golf shirts", "Hoodies", "Workwear", "Caps", "Bags", "Sportswear", "Other textiles"];

export const ARTWORK = [
  `Gang sheet width: ${SHEET.widthMm} mm. Length is charged per running meter (${SHEET.meterMm} mm).`,
  "Vector files are best for DTF. PNG files with a transparent background also print well.",
  "Use high-resolution artwork (300 dpi at print size recommended) for sharp, clean transfers.",
  "Check spelling, colours and sizes before sending. We print exactly what you supply.",
];

/** Corlia's wording, shown with the artwork requirements. */
export const ARTWORK_NOTES = [
  {
    title: "Important: AI-generated artwork",
    text: "AI-generated designs are not always print-ready. They may contain hidden pixels, ghosting, blurred edges, unwanted backgrounds or incorrect details, which can affect print quality.",
  },
  {
    title: "Please note",
    text: "Low-resolution artwork may result in pixelation and poor print quality. Always supply the highest-quality original file available.",
  },
];

export const ARTWORK_RESPONSIBILITY =
  "Artwork quality is the customer's responsibility. Design cleanup or adjustments may incur additional charges.";

export const GALLERY = [
  { src: "/images/work-sports-shirts.jpg", alt: "Green and white sports shirts with a team logo and numbers printed in DTF", w: 1200, h: 1600 },
  { src: "/images/work-caps.jpg", alt: "Black caps with a green and yellow company logo", w: 1280, h: 960 },
  { src: "/images/print-sunflower.jpg", alt: "Full-colour sunflower design coming off the DTF printer", w: 960, h: 1280 },
  { src: "/images/work-workwear.jpg", alt: "Navy branded workwear and caps packed for a client", w: 1400, h: 882 },
  { src: "/images/work-bags.jpg", alt: "Black and gold shopping bag with a printed gold logo", w: 1200, h: 1600 },
  { src: "/images/work-ubunye.jpg", alt: "White logo transfers and club badges printing on DTF film", w: 960, h: 1280 },
  { src: "/images/print-rolls.jpg", alt: "Rolls of printed DTF transfers on the heat press table", w: 1400, h: 646 },
  { src: "/images/work-roll.jpg", alt: "A rolled DTF print with bold red and black lettering", w: 1200, h: 1600 },
];

export const VIDEOS = [
  { src: "/videos/printing-badges.mp4", poster: "/images/printing-badges-poster.jpg", label: "Badges printing on DTF film" },
  { src: "/videos/printer-running.mp4", poster: "/images/printer-running-poster.jpg", label: "Our DTF printer at work" },
];

export const FAQS = [
  {
    q: "What is DTF printing?",
    a: "DTF (direct-to-film) printing prints your design onto a special film, which is then heat-pressed onto fabric. It gives bright, durable, full-colour prints on cotton, polyester, blends and more.",
  },
  {
    q: "What is a gang sheet?",
    a: `A gang sheet is one ${SHEET.widthMm} mm wide sheet with many designs placed together, so you pay per meter instead of per design.`,
  },
  {
    q: "How much does it cost?",
    a: `We charge per running meter: ${PRICE_TIERS.map((t) => `${t.label} at ${rand(t.price)} per meter`).join(", ")}. The more meters you order, the less you pay per meter.`,
  },
  {
    q: "How fast will I get my prints?",
    a: "Orders received and approved before our daily cut-off time qualify for same-day printing, subject to capacity. Next-day courier options are available, or you can collect from a participating collection point.",
  },
  {
    q: "Do you deliver nationwide?",
    a: "Yes. We courier across South Africa, and we are growing a network of collection points in every province.",
  },
  {
    q: "How do I send my artwork?",
    a: "Place your order on the website, then send your print-ready gang sheet to us on WhatsApp. We confirm your order and payment details before printing.",
  },
];
