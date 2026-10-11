"use client";

import Link from "next/link";
import { ArrowRight, Building2, Layers, Route, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { ListSummary } from "@/lib/catalog";
import { summarize, useProgress, type ProgressState } from "@/lib/progress";

const GROUPS: { id: ListSummary["group"]; title: string; blurb: string; icon: React.ReactNode }[] = [
  { id: "plans", title: "Study plans", blurb: "Ordered lists that cover the core patterns, from a two-week sprint to a full season.", icon: <Route size={18} /> },
  { id: "tracks", title: "Topic tracks", blurb: "Focused practice for SQL, concurrency, object-oriented design and ML coding rounds.", icon: <Layers size={18} /> },
  { id: "companies", title: "Company lists", blurb: "Problems reported at specific companies, most frequent or most recent first.", icon: <Building2 size={18} /> },
];

export function ListHub({ lists }: Readonly<{ lists: ListSummary[] }>) {
  const progress = useProgress();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = useMemo(
    () => lists.filter((l) => !q || l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)),
    [lists, q],
  );

  return (
    <>
      <label className="relative mb-8 block max-w-md">
        <Search size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-fg-3" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter lists, e.g. Google or SQL"
          aria-label="Filter lists"
          className="h-10 w-full rounded-xl border border-line bg-layer-1 pr-3 pl-9 text-sm shadow-card outline-none focus:border-line-strong"
        />
      </label>
      {GROUPS.map((g) => {
        const items = shown.filter((l) => l.group === g.id);
        if (!items.length) return null;
        return (
          <section key={g.id} aria-labelledby={`group-${g.id}`} className="mb-10">
            <div className="mb-4 flex items-start gap-3">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-layer-2 text-fg-2">{g.icon}</span>
              <div>
                <h2 id={`group-${g.id}`} className="text-lg font-semibold tracking-tight">{g.title}</h2>
                <p className="text-sm text-fg-2">{g.blurb}</p>
              </div>
            </div>
            <ul className={`grid gap-3 ${g.id === "companies" ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
              {items.map((l) => (
                <li key={l.id}>
                  <ListCard list={l} progress={progress} compact={g.id === "companies"} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      {!shown.length && <p className="rounded-xl border border-dashed border-line-strong px-6 py-10 text-center text-fg-2">No lists match “{query}”.</p>}
    </>
  );
}

export function ListCard({ list, progress, compact = false }: Readonly<{ list: ListSummary; progress: ProgressState; compact?: boolean }>) {
  const solved = summarize(progress, list.ids, list.scope).solved;
  const total = list.ids.length;
  const pct = total ? (solved / total) * 100 : 0;
  const mix = (["easy", "medium", "hard"] as const).map((d) => list.difficulties.filter((x) => x === d).length);
  return (
    <Link
      href={list.href}
      className="group flex h-full flex-col rounded-2xl border border-line bg-layer-1 p-4 shadow-card transition hover:-translate-y-px hover:border-line-strong hover:shadow-raised sm:p-5"
    >
      <span className="flex items-start gap-3">
        <span className="min-w-0 flex-1">
          <span className="block font-semibold tracking-tight">{list.title}</span>
          {!compact && <span className="mt-1 block text-sm leading-relaxed text-fg-2">{list.description}</span>}
        </span>
        <ArrowRight size={16} aria-hidden className="mt-1 shrink-0 text-fg-3 transition-transform group-hover:translate-x-0.5 group-hover:text-fg-1" />
      </span>
      <span className="mt-auto block pt-4">
        <span className="mb-1.5 flex items-baseline justify-between text-xs text-fg-3 tabular-nums">
          <span>
            <span className="text-easy">{mix[0]} easy</span> · <span className="text-medium">{mix[1]} medium</span> · <span className="text-hard">{mix[2]} hard</span>
          </span>
          <span>
            <span className={solved ? "font-medium text-fg-1" : ""}>{solved}</span> / {total}
          </span>
        </span>
        <span className="block h-1.5 overflow-hidden rounded-full bg-layer-3" role="img" aria-label={`${solved} of ${total} solved`}>
          <span className="block h-full rounded-full bg-ok transition-[width]" style={{ width: `${pct}%` }} />
        </span>
      </span>
    </Link>
  );
}
