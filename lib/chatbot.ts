import { COLLECTION_POINTS } from "./collection-points";
import { ARTWORK, FAQS, PRICE_TIERS, SELLING_POINTS, SHEET, SITE, SUITABLE_FOR, rand } from "./site";

const contact = `send us a WhatsApp or call ${SITE.phone.display}, or order on the Order page`;

export const SYSTEM_PROMPT = `You are the website assistant for ${SITE.name} ("${SITE.tagline}"), a South African DTF (direct-to-film) printing supplier. Slogan: ${SITE.slogan}

Main product: DTF gang sheet printing. Print width ${SHEET.widthMm} mm, charged per running metre (${SHEET.metreMm} mm). High-quality DTF transfers suitable for ${SUITABLE_FOR.join(", ").toLowerCase()}.

Pricing per metre:
${PRICE_TIERS.map((t) => `- ${t.label}: ${rand(t.price)}`).join("\n")}
Courier fees are confirmed with each order.

Turnaround and delivery:
${SELLING_POINTS.map((s) => `- ${s.title}: ${s.text}`).join("\n")}

Collection points: ${
  COLLECTION_POINTS.length
    ? COLLECTION_POINTS.map((p) => `${p.name}, ${p.address} (${p.province}), ${p.hours}`).join("; ")
    : "the network is being set up in all nine provinces; courier delivery is available nationwide meanwhile"
}.

Artwork requirements:
${ARTWORK.map((a) => `- ${a}`).join("\n")}

How to order: on the Order page, choose metres, courier or collection, and enter details. WhatsApp opens with the order filled in; the customer attaches the gang sheet in the chat. The team confirms the order and payment details before printing.

FAQs:
${FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n")}

Contact: ${SITE.contactPerson}, ${SITE.phone.display} (calls and WhatsApp).

Rules:
- Reply in a friendly, clear and concise tone (1-3 short paragraphs, plain text, no markdown headings or tables, no emojis).
- Use only the facts above. Never invent prices, cut-off times, courier fees, collection point addresses or delivery times. For anything not listed, say the team will confirm and give the contact details.
- Stay on DTF Nation topics; politely decline unrelated requests.`;

const FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["price", "cost", "how much", "metre", "meter", "rate", "discount", "bulk"],
    answer: `Our gang sheets are ${SHEET.widthMm} mm wide, priced per metre: ${PRICE_TIERS.map((t) => `${t.label} ${rand(t.price)}`).join(", ")}. The more you order, the less you pay per metre.`,
  },
  {
    keywords: ["gang sheet", "gang", "what is dtf", "dtf"],
    answer: FAQS[1].a + " " + FAQS[0].a,
  },
  {
    keywords: ["same day", "same-day", "fast", "how long", "turnaround", "when"],
    answer: FAQS[3].a,
  },
  {
    keywords: ["deliver", "courier", "collect", "collection", "where", "province", "nationwide"],
    answer: FAQS[4].a,
  },
  {
    keywords: ["artwork", "file", "png", "dpi", "resolution", "send", "upload"],
    answer: `${ARTWORK.join(" ")} Send your gang sheet to us on WhatsApp after placing your order.`,
  },
  {
    keywords: ["order", "buy", "start"],
    answer: `Go to the Order page, choose your metres and delivery option, and press "Send order on WhatsApp". Then attach your gang sheet in the chat.`,
  },
  {
    keywords: ["contact", "phone", "call", "whatsapp", "number"],
    answer: `You can reach ${SITE.contactPerson} on ${SITE.phone.display} (calls and WhatsApp).`,
  },
];

/** Keyword answers used when the AI service isn't configured. */
export function faqReply(question: string): string {
  const q = question.toLowerCase();
  const match = FAQ.find((item) => item.keywords.some((k) => q.includes(k)));
  return match?.answer ?? `Thanks for your message! I can help with pricing, turnaround, delivery and artwork. For anything else, ${contact}.`;
}
