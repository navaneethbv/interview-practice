"use client";

import type { Difficulty } from "@/lib/content-types";
import { useProgress } from "@/lib/progress";

const LABELS: { key: Difficulty; label: string; color: string; bar: string }[] = [
  { key: "easy", label: "Easy", color: "text-easy", bar: "bg-easy" },
  { key: "medium", label: "Medium", color: "text-medium", bar: "bg-medium" },
  { key: "hard", label: "Hard", color: "text-hard", bar: "bg-hard" },
];

export function HomeStats({ problemIds, byDifficulty }: { problemIds: string[]; byDifficulty: Difficulty[] }) {
  const progress = useProgress();
  const solved = problemIds.filter((id) => progress.solved[id]).length;
  const pct = problemIds.length ? (solved / problemIds.length) * 100 : 0;

  return (
    <section
      className="grid gap-5 rounded-2xl border border-line bg-layer-1 p-5 sm:grid-cols-[auto_1fr] sm:gap-8"
      aria-label="Your progress"
    >
      <div
        className="grid size-24 shrink-0 place-items-center rounded-full"
        style={{ background: `conic-gradient(var(--green) ${pct}%, var(--layer-3) 0)` }}
        role="img"
        aria-label={`${solved} of ${problemIds.length} problems solved`}
      >
        <div className="grid size-[84px] place-items-center rounded-full bg-layer-1 text-center">
          <div>
            <div className="text-2xl font-semibold tabular-nums">{solved}</div>
            <div className="text-xs text-fg-3">/ {problemIds.length} solved</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-3">
        {LABELS.map(({ key, label, color, bar }) => {
          const ids = problemIds.filter((_, i) => byDifficulty[i] === key);
          const done = ids.filter((id) => progress.solved[id]).length;
          return (
            <div key={key}>
              <div className="mb-1 flex justify-between text-sm">
                <span className={`font-medium ${color}`}>{label}</span>
                <span className="text-fg-3 tabular-nums">
                  {done}/{ids.length}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-layer-3">
                <div
                  className={`h-full rounded-full ${bar}`}
                  style={{ width: `${ids.length ? (done / ids.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
