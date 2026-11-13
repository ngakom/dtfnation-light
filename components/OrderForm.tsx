"use client";

import { useState, type FormEvent } from "react";
import Icon from "./Icon";
import { PROVINCES, pointsIn, type Province } from "@/lib/collection-points";
import { ARTWORK_RESPONSIBILITY, PRICE_TIERS, SHEET, SITE, priceFor, rand } from "@/lib/site";

// Web3Forms delivers orders to the inbox the access key was created for (sales@dtfnation.co.za).
// The key is public by design. Without one, the form opens the customer's email app instead.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

const mailto = (subject: string, body: string) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/** Short order number the customer quotes when emailing their artwork, e.g. DTF-1113-4821. */
function orderNumber() {
  const now = new Date();
  const mmdd = `${now.getMonth() + 1}`.padStart(2, "0") + `${now.getDate()}`.padStart(2, "0");
  return `DTF-${mmdd}-${Math.floor(1000 + Math.random() * 9000)}`;
}

const label = "mb-1.5 block text-sm font-bold text-ink";
const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink focus:ring-2 focus:ring-ink/10";

type Delivery = "courier" | "collection";
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

export default function OrderForm() {
  const [meters, setMeters] = useState(1);
  const [delivery, setDelivery] = useState<Delivery>("courier");
  const [province, setProvince] = useState<Province>("Gauteng");
  const [status, setStatus] = useState<Status>("idle");
  const [order, setOrder] = useState("");
  const { tier, perMeter, total } = priceFor(meters);
  const points = pointsIn(province);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const ref = orderNumber();
    const subject = `New order ${ref}: ${meters} m – ${d.business || d.name}`;
    const lines = [
      `Order number: ${ref}`,
      "",
      `Gang sheet: ${meters} m x ${SHEET.widthMm} mm`,
      `Price: ${rand(perMeter)}/m = ${rand(total)}`,
      delivery === "courier"
        ? `Delivery: Courier to ${d.address}, ${province}`
        : `Delivery: Collection in ${province}${d.point ? ` (${d.point})` : ""}`,
      "",
      `Name: ${d.name}`,
      d.business ? `Business: ${d.business}` : null,
      `Phone: ${d.phone}`,
      `Email: ${d.email}`,
      d.notes ? `Notes: ${d.notes}` : null,
    ].filter((l) => l !== null);
    const message = lines.join("\n");
    setOrder(ref);

    if (!WEB3FORMS_KEY) {
      window.location.href = mailto(subject, `${message}\n\nI've attached my print-ready gang sheet.`);
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, from_name: "DTF Nation website", replyto: d.email, message }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const artworkLink = mailto(`Artwork for order ${order}`, `Hi DTF Nation,\n\nPlease find my gang sheet attached for order ${order}.\n\n`);

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-8">
        {/* 1. Quantity */}
        <fieldset className="rounded-3xl bg-white p-6 shadow-[0_14px_40px_rgba(13,17,23,0.06)] ring-1 ring-line sm:p-8">
          <legend className="float-left mb-5 w-full font-display text-xl font-black uppercase">1. How many meters?</legend>
          <div className="clear-both flex items-center gap-3">
            <button type="button" onClick={() => setMeters((m) => Math.max(1, m - 1))} className="h-12 w-12 rounded-full border-2 border-ink text-xl font-black" aria-label="One meter less">
              −
            </button>
            <label htmlFor="meters" className="sr-only">Meters</label>
            <input
              id="meters"
              type="number"
              min={1}
              step={0.5}
              value={meters}
              onChange={(e) => setMeters(Math.max(1, Number(e.target.value) || 1))}
              className="h-12 w-28 rounded-xl border border-line text-center font-display text-2xl font-black outline-none focus:border-ink"
            />
            <button type="button" onClick={() => setMeters((m) => m + 1)} className="h-12 w-12 rounded-full border-2 border-ink text-xl font-black" aria-label="One meter more">
              +
            </button>
            <span className="text-sm text-muted">meters × {SHEET.widthMm} mm</span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {PRICE_TIERS.map((t) => (
              <div key={t.label} className={`rounded-xl px-3 py-3 text-center text-xs transition-colors ${t === tier ? "bg-ink text-white" : "bg-paper text-muted"}`}>
                <p className="font-bold">{t.label}</p>
                <p className="mt-0.5 text-base font-black">{rand(t.price)}/m</p>
              </div>
            ))}
          </div>
        </fieldset>

        {/* 2. Delivery */}
        <fieldset className="rounded-3xl bg-white p-6 shadow-[0_14px_40px_rgba(13,17,23,0.06)] ring-1 ring-line sm:p-8">
          <legend className="float-left mb-5 w-full font-display text-xl font-black uppercase">2. Courier or collection?</legend>
          <div className="clear-both grid gap-3 sm:grid-cols-2">
            {(["courier", "collection"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-colors ${delivery === opt ? "border-ink bg-paper" : "border-line"}`}
              >
                <input type="radio" name="delivery" value={opt} checked={delivery === opt} onChange={() => setDelivery(opt)} className="accent-ink" />
                <Icon name={opt === "courier" ? "truck" : "pin"} className="h-6 w-6" />
                <span className="font-bold">{opt === "courier" ? "Courier delivery" : "Collection point"}</span>
              </label>
            ))}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="province" className={label}>Province *</label>
              <select id="province" value={province} onChange={(e) => setProvince(e.target.value as Province)} className={field}>
                {PROVINCES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            {delivery === "collection" ? (
              <div>
                <label htmlFor="point" className={label}>Collection point</label>
                {points.length ? (
                  <select id="point" name="point" className={field}>
                    {points.map((p) => <option key={p.name}>{p.name}</option>)}
                  </select>
                ) : (
                  <p className="rounded-xl bg-paper px-4 py-3 text-sm text-muted">We&apos;ll confirm your nearest collection point in {province}.</p>
                )}
              </div>
            ) : (
              <div className="sm:col-span-2">
                <label htmlFor="address" className={label}>Delivery address *</label>
                <textarea id="address" name="address" required rows={2} autoComplete="street-address" className={field} placeholder="Street, suburb, town and postal code" />
              </div>
            )}
          </div>
        </fieldset>

        {/* 3. Details */}
        <fieldset className="rounded-3xl bg-white p-6 shadow-[0_14px_40px_rgba(13,17,23,0.06)] ring-1 ring-line sm:p-8">
          <legend className="float-left mb-5 w-full font-display text-xl font-black uppercase">3. Your details</legend>
          <div className="clear-both grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={label}>Full name *</label>
              <input id="name" name="name" required autoComplete="name" className={field} />
            </div>
            <div>
              <label htmlFor="business" className={label}>Business name</label>
              <input id="business" name="business" autoComplete="organization" className={field} />
            </div>
            <div>
              <label htmlFor="phone" className={label}>Phone *</label>
              <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} />
            </div>
            <div>
              <label htmlFor="email" className={label}>Email *</label>
              <input id="email" name="email" type="email" required autoComplete="email" className={field} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="notes" className={label}>Notes</label>
              <textarea id="notes" name="notes" rows={3} className={field} placeholder="Anything we should know about your order?" />
            </div>
          </div>
        </fieldset>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-3xl bg-ink text-white shadow-[0_30px_60px_rgba(13,17,23,0.25)]">
          <div className="stripe h-1.5" />
          <div className="p-7 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Order summary</p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-white/70">Gang sheet</dt><dd className="font-bold">{meters} m × {SHEET.widthMm} mm</dd></div>
              <div className="flex justify-between"><dt className="text-white/70">Price per meter</dt><dd className="font-bold">{rand(perMeter)}</dd></div>
              <div className="flex justify-between"><dt className="text-white/70">Delivery</dt><dd className="font-bold">{delivery === "courier" ? "Courier" : "Collection"}, {province}</dd></div>
            </dl>
            <div className="mt-6 flex items-end justify-between border-t border-white/15 pt-5">
              <span className="text-sm text-white/70">Print total</span>
              <span className="font-display text-5xl font-black text-sun">{rand(total)}</span>
            </div>
            {delivery === "courier" && <p className="mt-2 text-xs text-white/50">Courier fee confirmed with your order.</p>}
            {status === "sent" ? (
              <div className="mt-7 rounded-2xl bg-white/10 p-5" role="status">
                <p className="font-bold text-leaf">Order {order} sent. Thank you!</p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  Now email your print-ready gang sheet to <strong className="text-white">{SITE.email}</strong> with your order number. Large files can be sent as a WeTransfer or Google Drive link.
                </p>
                <a href={artworkLink} className="btn-sun mt-4 w-full">
                  <Icon name="mail" className="h-5 w-5" /> Email my artwork
                </a>
              </div>
            ) : (
              <>
                <button type="submit" disabled={status === "sending"} className="btn-sun mt-7 w-full disabled:opacity-60">
                  <Icon name="mail" className="h-5 w-5" /> {status === "sending" ? "Sending…" : "Send order"}
                </button>
                <p className="mt-4 text-xs leading-relaxed text-white/60">
                  Your order is emailed to us with an order number. You&apos;ll then email your gang sheet to {SITE.email}. We&apos;ll confirm your order and payment details before printing.
                </p>
              </>
            )}
            {status === "mailto" && (
              <p className="mt-4 rounded-xl bg-leaf/15 px-4 py-3 text-sm font-semibold text-leaf" role="status">
                Your email app opened with order {order} filled in. Attach your gang sheet and press send.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 rounded-xl bg-flame/15 px-4 py-3 text-sm font-semibold text-white" role="alert">
                Sorry, your order didn&apos;t send. Please try again, or email it to {SITE.email} or WhatsApp {SITE.phone.display}.
              </p>
            )}
            <p className="mt-3 text-xs leading-relaxed text-white/60">
              Vector files are best. {ARTWORK_RESPONSIBILITY}{" "}
              <a href="#artwork" className="font-semibold text-sun underline underline-offset-2">Artwork requirements</a>
            </p>
          </div>
        </div>
      </aside>
    </form>
  );
}
