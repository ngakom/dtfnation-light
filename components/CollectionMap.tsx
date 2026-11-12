"use client";

import { useState } from "react";
import Icon, { WhatsAppIcon } from "./Icon";
import { MAP_VIEWBOX, PROVINCE_SHAPES } from "@/lib/sa-provinces";
import { COLLECTION_POINTS, PROVINCES, pointsIn, type Province } from "@/lib/collection-points";
import { whatsappLink } from "@/lib/site";

// Province colours follow the logo's map.
const FILL: Record<Province, string> = {
  "Western Cape": "var(--orange)",
  "Northern Cape": "var(--leaf)",
  "North West": "var(--leaf)",
  "Free State": "var(--sky)",
  "Eastern Cape": "var(--sky)",
  "KwaZulu-Natal": "var(--sky)",
  Gauteng: "var(--sun)",
  Limpopo: "var(--sun)",
  Mpumalanga: "var(--flame)",
};

export default function CollectionMap() {
  const [selected, setSelected] = useState<Province>("Gauteng");
  const points = pointsIn(selected);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_1fr]">
      <div className="relative rounded-3xl bg-ink-soft p-4 sm:p-8">
        <svg viewBox={MAP_VIEWBOX} className="h-auto w-full" role="group" aria-label="Map of South Africa's provinces">
          {PROVINCE_SHAPES.map((p) => {
            const name = p.name as Province;
            const active = name === selected;
            return (
              <path
                key={name}
                d={p.d}
                className="province"
                fill={FILL[name]}
                fillOpacity={active ? 1 : 0.55}
                stroke="#ffffff"
                strokeWidth={active ? 4 : 2}
                strokeLinejoin="round"
                tabIndex={0}
                role="button"
                aria-label={`${name}: ${pointsIn(name).length || "no"} collection points`}
                aria-pressed={active}
                onClick={() => setSelected(name)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSelected(name))}
              />
            );
          })}
          {PROVINCE_SHAPES.map((p) => (
            <text
              key={`${p.name}-label`}
              x={p.label.x}
              y={p.label.y}
              textAnchor="middle"
              className="pointer-events-none select-none font-sans font-bold"
              fontSize={p.name === "Gauteng" ? 16 : p.name === "Mpumalanga" || p.name === "KwaZulu-Natal" ? 18 : 24}
              fill="#0d1117"
            >
              {p.name}
            </text>
          ))}
        </svg>
        <p className="mt-3 text-center text-xs text-white/50">Tap a province to see its collection points</p>
      </div>

      <div>
        <label htmlFor="province" className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
          Select your province
        </label>
        <select
          id="province"
          value={selected}
          onChange={(e) => setSelected(e.target.value as Province)}
          className="mt-2 w-full rounded-xl border border-white/15 bg-ink-soft px-4 py-3.5 text-base font-semibold text-white outline-none focus:border-sun"
        >
          {PROVINCES.map((p) => (
            <option key={p} value={p}>
              {p} ({pointsIn(p).length})
            </option>
          ))}
        </select>

        <div className="mt-6 space-y-4" aria-live="polite">
          {points.length ? (
            points.map((pt) => (
              <div key={pt.name} className="rounded-2xl border border-white/10 bg-ink-soft p-6">
                <p className="text-lg font-extrabold text-white">{pt.name}</p>
                <p className="mt-2 flex gap-2 text-sm text-white/75">
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-sun" /> {pt.address}
                </p>
                <p className="mt-1.5 flex gap-2 text-sm text-white/75">
                  <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-sun" /> {pt.hours}
                </p>
                <p className="mt-1.5 flex gap-2 text-sm text-white/75">
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-sun" /> {pt.phone}
                </p>
                <a href={pt.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-sun hover:underline">
                  Get directions <Icon name="arrow" className="h-4 w-4" />
                </a>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-white/20 bg-ink-soft p-6">
              <p className="text-lg font-extrabold text-white">{selected} collection points coming soon</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Our collection network is growing. In the meantime we courier your prints anywhere in {selected}.
              </p>
              <a
                href={whatsappLink(`Hi DTF Nation, I'm in ${selected}. Where is my nearest collection point?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-sun hover:underline"
              >
                <WhatsAppIcon className="h-4 w-4" /> Ask about {selected}
              </a>
            </div>
          )}
        </div>

        <p className="mt-6 text-sm text-white/60">
          {COLLECTION_POINTS.length
            ? `${COLLECTION_POINTS.length} collection points nationwide, with more being added.`
            : "Courier delivery available nationwide while our collection points are being added."}
        </p>
      </div>
    </div>
  );
}
