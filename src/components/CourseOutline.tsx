"use client";

import Link from "next/link";
import { BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";
import { COURSE_SCOPE, type CourseIndex } from "@/lib/content-types";
import { statusOf, useProgress } from "@/lib/progress";
import { DifficultyText, StatusIcon } from "./ui";

export function CourseOutline({ course }: Readonly<{ course: CourseIndex }>) {
  const progress = useProgress();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-3">
      {course.chapters.map((ch, idx) => {
        const problems = ch.items.filter((i) => i.type === "problem");
        const done = ch.items.filter((i) => progress.solved[i.id] || progress.read[i.id]).length;
        const isOpen = open[ch.id] ?? false;
        const pct = ch.items.length ? Math.round((done / ch.items.length) * 100) : 0;
        return (
          <section key={ch.id} className="overflow-hidden rounded-xl border border-line bg-layer-1">
            <h2>
              <button
                onClick={() => setOpen((o) => ({ ...o, [ch.id]: !isOpen }))}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-layer-2/60"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-layer-2 text-sm font-semibold text-fg-2">
                  {idx + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{ch.title}</span>
                  <span className="mt-0.5 block text-xs text-fg-3">
                    {ch.items.length} lessons · {problems.length} problems
                  </span>
                </span>
                <span className="hidden w-32 items-center gap-2 sm:flex">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-layer-3">
                    <span className="block h-full rounded-full bg-ok" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="w-9 text-right text-xs text-fg-3">{pct}%</span>
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-fg-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </h2>
            {isOpen && (
              <ul className="border-t border-line">
                {ch.items.map((it) => (
                  <li key={it.id}>
                    <Link
                      href={it.type === "problem" ? `/problems/${it.id}` : `/learn/${it.id}`}
                      className="flex items-center gap-3 px-5 py-2.5 text-sm transition-colors hover:bg-layer-2/60"
                    >
                      {(() => {
                        if (it.type === "problem") return <StatusIcon status={statusOf(progress, it.id, COURSE_SCOPE)} />;
                        if (progress.read[it.id]) return <StatusIcon status="solved" />;
                        return <BookOpen size={16} className="text-fg-3" aria-label="Lesson" />;
                      })()}
                      <span className="flex-1">{it.title}</span>
                      {it.difficulty && <DifficultyText difficulty={it.difficulty} />}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
