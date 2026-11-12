"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/site";

const NAV = [
  { label: "Pricing", href: "/#pricing" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Collection points", href: "/#collection-points" },
  { label: "Our work", href: "/#our-work" },
  { label: "FAQs", href: "/#faqs" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="stripe h-1.5" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-2 lg:px-10">
        <Link href="/" aria-label={`${SITE.name} home`} className="shrink-0">
          <Image src="/images/logo-dtf-nation.jpg" alt={SITE.name} width={600} height={600} priority className="h-16 w-16 object-contain sm:h-[4.5rem] sm:w-[4.5rem]" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-ink/80 transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
          <Link href="/order" className="btn-ink !px-6 !py-3">
            Order now
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/order" className="btn-ink !px-4 !py-2.5 !text-xs">
            Order
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-full p-2 text-ink"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line px-5 pb-6 pt-2 lg:hidden" aria-label="Mobile" onClick={() => setOpen(false)}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="block border-b border-line py-3.5 text-lg font-bold">
              {item.label}
            </Link>
          ))}
          <Link href="/order" className="btn-sun mt-5 w-full">
            Order your prints
          </Link>
        </nav>
      )}
    </header>
  );
}
