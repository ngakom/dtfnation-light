import Link from "next/link";
import Icon, { WhatsAppIcon } from "./Icon";
import { SITE, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="stripe h-1.5" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-2">
          <p className="display text-3xl">
            DTF Nation <span className="text-sun">SA</span>
          </p>
          <p className="mt-1 text-sm font-semibold text-white/60">{SITE.tagline}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
            Premium-quality DTF prints at competitive prices, with same-day printing, next-day courier options and collection points across South Africa.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            <li><Link href="/order" className="hover:text-sun">Order DTF prints</Link></li>
            <li><Link href="/#pricing" className="hover:text-sun">Pricing</Link></li>
            <li><Link href="/#collection-points" className="hover:text-sun">Collection points</Link></li>
            <li><Link href="/order#artwork" className="hover:text-sun">Artwork requirements</Link></li>
            <li><Link href="/#faqs" className="hover:text-sun">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>{SITE.contactPerson}</li>
            <li>
              <a href={`tel:${SITE.phone.tel}`} className="inline-flex items-center gap-2 hover:text-sun">
                <Icon name="phone" className="h-4 w-4" /> {SITE.phone.display}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-sun">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-white/50 sm:flex-row sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>
            Website by{" "}
            <a href="https://www.mbttechsphere.co.za" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              MBT TechSphere Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
