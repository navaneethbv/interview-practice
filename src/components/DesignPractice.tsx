"use client";

import { Check, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMounted } from "./ThemeProvider";
import { setRead, useProgress } from "@/lib/progress";

const STEPS = [
  { key: "requirements", title: "Requirements", hint: "Functional and non-functional requirements, scope, out of scope." },
  { key: "estimates", title: "Capacity estimates", hint: "Users, QPS, read/write ratio, storage and bandwidth." },
  { key: "api", title: "API design", hint: "Core endpoints or RPCs with request and response shapes." },
  { key: "data", title: "Data model", hint: "Entities, storage choice (SQL/NoSQL), partitioning keys." },
  { key: "hld", title: "High-level design", hint: "Components and the request flow between them." },
  { key: "deep", title: "Deep dives", hint: "Caching, sharding, replication, consistency, queues." },
  { key: "tradeoffs", title: "Bottlenecks & trade-offs", hint: "Failure modes, scaling limits, what you would change." },
];

const notesKey = (id: string) => `ip:design:${id}`;

function loadNotes(id: string): Record<string, string> {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(notesKey(id)) ?? "{}");
    return parsed && typeof parsed === "object" ? (parsed as Record<string, string>) : {};
  } catch {
    return {};
  }
}

/** Notes live in localStorage, so the editor mounts only after hydration. */
export function DesignPractice(props: { id: string; reference: React.ReactNode }) {
  const mounted = useMounted();
  if (!mounted) return <div className="min-h-96 rounded-2xl border border-line bg-layer-1" aria-busy />;
  return <DesignPracticeInner {...props} />;
}

function DesignPracticeInner({ id, reference }: { id: string; reference: React.ReactNode }) {
  const progress = useProgress();
  const [notes, setNotes] = useState<Record<string, string>>(() => loadNotes(id));
  const [revealed, setRevealed] = useState(false);

  function update(key: string, value: string) {
    const next = { ...notes, [key]: value };
    setNotes(next);
    try {
      window.localStorage.setItem(notesKey(id), JSON.stringify(next));
    } catch {
      // Storage blocked: notes live only for this visit.
    }
  }

  const filled = STEPS.filter((s) => notes[s.key]?.trim()).length;
  const done = !!progress.read[`design:${id}`];

  return (
    <div className="min-w-0 space-y-5">
      <section className="rounded-2xl border border-line bg-layer-1 px-5 py-6 sm:px-6" aria-label="Your design">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold">Your design</h2>
          <span className="text-xs text-fg-3">
            {filled}/{STEPS.length} sections drafted · saved in this browser
          </span>
        </div>
        <div className="space-y-4">
          {STEPS.map((s, i) => {
            const has = !!notes[s.key]?.trim();
            return (
              <label key={s.key} className="block">
                <span className="mb-1 flex items-center gap-2 text-sm font-medium">
                  <span
                    className={`grid size-5 place-items-center rounded-full text-[11px] ${
                      has ? "bg-ok text-white" : "bg-layer-3 text-fg-2"
                    }`}
                  >
                    {has ? <Check size={12} /> : i + 1}
                  </span>
                  {s.title}
                </span>
                <textarea
                  value={notes[s.key] ?? ""}
                  onChange={(e) => update(s.key, e.target.value)}
                  placeholder={s.hint}
                  rows={3}
                  className="w-full resize-y rounded-lg border border-line bg-layer-2/50 px-3 py-2 text-sm leading-6 text-fg-1 outline-none placeholder:text-fg-3 focus:border-line-strong"
                />
              </label>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-layer-1 px-5 py-6 sm:px-6" aria-label="Reference design">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Reference design</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setRead(`design:${id}`, !done)}
              aria-pressed={done}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${
                done ? "bg-ok-soft text-ok" : "bg-layer-2 text-fg-2 hover:text-fg-1"
              }`}
            >
              <Check size={15} /> {done ? "Practiced" : "Mark practiced"}
            </button>
            {reference && (
              <button
                onClick={() => setRevealed((r) => !r)}
                aria-expanded={revealed}
                className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
              >
                {revealed ? <EyeOff size={15} /> : <Eye size={15} />} {revealed ? "Hide" : "Reveal"}
              </button>
            )}
          </div>
        </div>
        {!reference ? (
          <p className="mt-3 text-sm text-fg-3">This document has no separate reference section.</p>
        ) : revealed ? (
          <div className="mt-5">{reference}</div>
        ) : (
          <p className="mt-3 text-sm text-fg-3">Draft your design first, then reveal the reference to compare.</p>
        )}
      </section>
    </div>
  );
}
