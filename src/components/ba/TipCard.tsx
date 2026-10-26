"use client";

import { useState, useSyncExternalStore } from "react";
import { Lightbulb } from "lucide-react";
import { useHydrated } from "@/lib/ba-store";

const noop = () => () => {};
const today = () => Math.floor(Date.now() / 86_400_000);

/** A study or interview tip. Starts on the tip of the day; "Another tip" moves to the next one. */
export function TipCard({ tips, compact = false }: Readonly<{ tips: string[]; compact?: boolean }>) {
  const hydrated = useHydrated();
  // The day number is read on the client only, so server and client markup agree.
  const day = useSyncExternalStore(noop, today, () => 0);
  const [offset, setOffset] = useState(0);
  if (!tips.length) return null;
  const tip = tips[(day + offset) % tips.length];
  return (
    <aside aria-label="Tip" className={`flex gap-3 rounded-2xl border border-line bg-brand-soft/60 ${compact ? "p-3.5" : "p-4 sm:p-5"}`}>
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-layer-1 text-brand"><Lightbulb size={18} /></span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold tracking-wide text-brand uppercase">{offset ? "Tip" : "Tip of the day"}</p>
        <p className={`mt-0.5 leading-relaxed text-fg-1 ${compact ? "text-sm" : "text-[15px]"} ${hydrated ? "" : "invisible"}`}>{tip}</p>
        <button onClick={() => setOffset((o) => o + 1)} className="mt-1.5 text-sm text-blue hover:underline">Another tip</button>
      </div>
    </aside>
  );
}
