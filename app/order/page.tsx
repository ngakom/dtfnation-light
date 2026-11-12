import type { Metadata } from "next";
import Icon, { WhatsAppIcon } from "@/components/Icon";
import OrderForm from "@/components/OrderForm";
import { ARTWORK, SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order DTF Prints",
  description: "Order DTF gang sheet prints online: choose your metres, see your price, and pick courier delivery or a collection point anywhere in South Africa.",
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return (
    <>
      <section className="grain bg-ink text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <p className="eyebrow !text-sun">Order DTF prints</p>
          <h1 className="display mt-4 text-5xl sm:text-7xl">Order your prints.</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">Choose your metres, see your price instantly, and send your gang sheet straight to us.</p>
        </div>
      </section>

      <section className="bg-paper py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <OrderForm />
        </div>
      </section>

      <section id="artwork" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
        <div>
          <p className="eyebrow">Artwork requirements</p>
          <h2 className="heading mt-4">Print-ready in four checks.</h2>
          <ul className="mt-8 space-y-4">
            {ARTWORK.map((a) => (
              <li key={a} className="flex gap-3 text-muted">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-leaf" /> {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-ink p-8 text-white sm:p-10">
          <p className="eyebrow !text-sun">Contact us</p>
          <p className="display mt-4 text-4xl">Need help with your order?</p>
          <p className="mt-4 text-white/70">Talk to {SITE.contactPerson} and the DTF Nation team.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappLink("Hi DTF Nation, I need help with an order.")} target="_blank" rel="noopener noreferrer" className="btn-sun">
              <WhatsAppIcon /> WhatsApp us
            </a>
            <a href={`tel:${SITE.phone.tel}`} className="btn-outline">
              <Icon name="phone" className="h-4 w-4" /> {SITE.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
