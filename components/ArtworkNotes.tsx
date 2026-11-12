import Icon from "./Icon";
import { ARTWORK_NOTES, ARTWORK_RESPONSIBILITY } from "@/lib/site";

export default function ArtworkNotes({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-3xl border-2 border-orange/40 bg-orange/5 p-7 sm:p-8 ${className}`}>
      <div className="space-y-5">
        {ARTWORK_NOTES.map((n) => (
          <div key={n.title} className="flex gap-3">
            <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
            <div>
              <p className="font-extrabold">{n.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{n.text}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 border-t border-orange/25 pt-5 text-sm font-semibold">{ARTWORK_RESPONSIBILITY}</p>
    </div>
  );
}
