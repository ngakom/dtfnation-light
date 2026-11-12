import Link from "next/link";
import Icon from "./Icon";
import { PRICE_TIERS, SHEET, rand } from "@/lib/site";

export default function PricingCards() {
  const best = PRICE_TIERS[PRICE_TIERS.length - 1];
  const saving = Math.round((1 - best.price / PRICE_TIERS[0].price) * 100);

  return (
    <div className="grid gap-6 md:grid-cols-3" data-reveal-group>
      {PRICE_TIERS.map((t) => {
        const featured = t === best;
        return (
          <div
            key={t.label}
            className={`relative flex flex-col rounded-3xl p-8 transition-[translate] hover:-translate-y-1 ${
              featured ? "bg-ink text-white shadow-[0_30px_60px_rgba(13,17,23,0.3)] md:-my-4 md:py-12" : "border-2 border-line bg-white"
            }`}
          >
            {featured && (
              <span className="absolute -top-3.5 left-8 rounded-full bg-sun px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink">
                Best value · save {saving}%
              </span>
            )}
            <p className={`text-sm font-bold uppercase tracking-[0.16em] ${featured ? "text-sun" : "text-orange"}`}>{t.label}</p>
            <p className="mt-5 font-display text-6xl font-black tracking-tight">
              {rand(t.price)}
              <span className={`ml-1 text-base font-bold ${featured ? "text-white/60" : "text-muted"}`}>/ metre</span>
            </p>
            <ul className={`mt-6 flex-1 space-y-2.5 text-sm ${featured ? "text-white/80" : "text-muted"}`}>
              <li className="flex gap-2">
                <Icon name="check" className="h-5 w-5 shrink-0 text-leaf" /> {SHEET.widthMm} mm wide gang sheet
              </li>
              <li className="flex gap-2">
                <Icon name="check" className="h-5 w-5 shrink-0 text-leaf" /> High-quality DTF transfers
              </li>
              <li className="flex gap-2">
                <Icon name="check" className="h-5 w-5 shrink-0 text-leaf" /> Same-day printing before cut-off
              </li>
            </ul>
            <Link href="/order" className={`mt-8 ${featured ? "btn-sun" : "btn-outline-ink"}`}>
              Order now
            </Link>
          </div>
        );
      })}
    </div>
  );
}
