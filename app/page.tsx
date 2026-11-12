import Image from "next/image";
import Link from "next/link";
import CollectionMap from "@/components/CollectionMap";
import Icon, { WhatsAppIcon } from "@/components/Icon";
import PricingCards from "@/components/PricingCards";
import { FAQS, GALLERY, PRICE_TIERS, SELLING_POINTS, SHEET, STEPS, SUITABLE_FOR, VIDEOS, rand, whatsappLink } from "@/lib/site";

const ACCENTS = ["bg-orange", "bg-leaf", "bg-sky"];

export default function Home() {
  const from = PRICE_TIERS[PRICE_TIERS.length - 1].price;

  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-sky/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 right-0 h-[30rem] w-[30rem] rounded-full bg-orange/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-28 pt-14 lg:grid-cols-[1.1fr_1fr] lg:px-10 lg:pb-40 lg:pt-20">
          <div className="fade-up">
            <p className="eyebrow !text-sun">Your print. Our passion. Nationwide delivery.</p>
            <h1 className="display mt-5 text-6xl sm:text-7xl lg:text-8xl">
              DTF printing.
              <br />
              <span className="bg-gradient-to-r from-orange via-sun to-leaf bg-clip-text text-transparent">Made easy.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Premium-quality DTF prints at competitive prices. Same-day printing, next-day courier options and collection points across South Africa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/order" className="btn-sun">
                Order your prints <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/#pricing" className="btn-outline">
                View our pricing
              </Link>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/80">
              <li className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-leaf" /> From {rand(from)} per metre</li>
              <li className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-leaf" /> {SHEET.widthMm} mm gang sheets</li>
              <li className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-leaf" /> Bulk discounts</li>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
              <Image src="/images/print-sunflower.jpg" alt="A full-colour sunflower design printing on DTF film" fill priority sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-4 w-[46%] overflow-hidden rounded-2xl border-4 border-ink shadow-2xl sm:-left-10">
              <Image src="/images/work-sports-shirts.jpg" alt="Sports shirts printed with DTF transfers" width={1200} height={1600} sizes="20vw" className="aspect-square object-cover" />
            </div>
            <div className="absolute -right-2 top-8 rounded-2xl bg-white px-5 py-4 text-ink shadow-2xl sm:-right-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Bulk price</p>
              <p className="font-display text-3xl font-black">{rand(from)}<span className="text-sm font-bold text-muted">/m</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Selling points */}
      <section className="relative z-10 -mt-12 px-5 lg:-mt-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3" data-reveal-group>
          {SELLING_POINTS.map((s, i) => (
            <div key={s.title} className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-[0_24px_60px_rgba(13,17,23,0.14)] ring-1 ring-line">
              <span className={`absolute inset-x-0 top-0 h-1.5 ${ACCENTS[i]}`} />
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-sun">
                <Icon name={s.icon} className="h-7 w-7" />
              </span>
              <h2 className="display mt-6 text-3xl">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <p className="eyebrow">DTF gang sheet pricing</p>
          <h2 className="heading mt-4">More metres. Better prices.</h2>
          <p className="mt-5 text-muted">
            Every gang sheet is {SHEET.widthMm} mm wide and charged per running metre ({SHEET.metreMm} mm). Order more and the price per metre drops.
          </p>
        </div>
        <div className="mt-16">
          <PricingCards />
        </div>
        <p className="mt-10 text-center text-sm text-muted" data-reveal>
          Suitable for {SUITABLE_FOR.slice(0, -1).join(", ").toLowerCase()} and {SUITABLE_FOR.at(-1)!.toLowerCase()}.
        </p>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div data-reveal>
              <p className="eyebrow">How it works</p>
              <h2 className="heading mt-4">From file to fabric in four steps.</h2>
              <p className="mt-5 text-muted">A simple ordering process, so you can spend your time pressing, not waiting.</p>
              <Link href="/order" className="btn-ink mt-8">
                Start your order <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2" data-reveal-group>
              {STEPS.map((s, i) => (
                <li key={s.title} className="rounded-3xl bg-white p-7 ring-1 ring-line">
                  <span className="font-display text-5xl font-black text-transparent [-webkit-text-stroke:2px_var(--orange)]">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-extrabold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Collection points */}
      <section id="collection-points" className="grain bg-ink py-24 text-white lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="max-w-2xl" data-reveal>
            <p className="eyebrow !text-sun">Nationwide collection points</p>
            <h2 className="heading mt-4">Collect close to home. Anywhere in SA.</h2>
            <p className="mt-5 text-white/70">Find your nearest collection point in all nine provinces, or choose courier delivery to your door.</p>
          </div>
          <div className="mt-14" data-reveal>
            <CollectionMap />
          </div>
        </div>
      </section>

      {/* Our work */}
      <section id="our-work" className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end" data-reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Our work</p>
            <h2 className="heading mt-4">Bold colour. Clean detail.</h2>
            <p className="mt-5 text-muted">Club kits, corporate workwear, caps, bags and branded merchandise, printed in-house.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUITABLE_FOR.slice(0, 6).map((s) => (
              <span key={s} className="rounded-full border border-line px-3.5 py-1.5 text-xs font-bold">{s}</span>
            ))}
          </div>
        </div>

        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4" data-reveal-group>
          {GALLERY.map((g) => (
            <div key={g.src} className="group overflow-hidden rounded-2xl bg-paper break-inside-avoid">
              <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-105" />
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
          <div className="flex flex-col justify-between rounded-3xl bg-ink p-8 text-white sm:col-span-2 lg:col-span-1">
            <div>
              <p className="eyebrow !text-sun">See it in action</p>
              <p className="display mt-4 text-4xl">Printed in-house.</p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Every transfer is printed on our own DTF printers. Orders approved before our daily cut-off qualify for same-day printing.
              </p>
            </div>
            <Link href="/order" className="btn-sun mt-8 self-start">
              Order your prints <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          {VIDEOS.map((v) => (
            <figure key={v.src} className="overflow-hidden rounded-3xl bg-ink">
              <video src={v.src} poster={v.poster} muted loop playsInline autoPlay preload="none" aria-label={v.label} className="aspect-[4/5] w-full object-cover" />
              <figcaption className="flex items-center gap-2 px-6 py-4 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-flame" /> {v.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="bg-paper py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.5fr] lg:px-10">
          <div data-reveal>
            <p className="eyebrow">FAQs</p>
            <h2 className="heading mt-4">Good to know.</h2>
            <p className="mt-5 text-muted">Can&apos;t find your answer? Ask our assistant or send us a WhatsApp.</p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ink mt-8">
              <WhatsAppIcon /> WhatsApp us
            </a>
          </div>
          <div className="space-y-3" data-reveal-group>
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white p-6 ring-1 ring-line open:shadow-[0_14px_30px_rgba(13,17,23,0.08)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-extrabold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Icon name="plus" className="h-5 w-5 shrink-0 text-orange transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative overflow-hidden bg-sun">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-20 lg:flex-row lg:items-center lg:px-10">
          <div data-reveal>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-ink/70">Our promise</p>
            <h2 className="display mt-3 text-4xl sm:text-6xl">
              Fast printing. Competitive prices.
              <br />
              Nationwide reach.
            </h2>
          </div>
          <Link href="/order" className="btn-ink shrink-0 !px-9 !py-4" data-reveal>
            Order your prints <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
