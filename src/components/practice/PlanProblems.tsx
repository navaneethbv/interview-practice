"use client";

import Link from "next/link";
import { DifficultyText, StatusIcon } from "@/components/ui";
import type { Difficulty } from "@/lib/content-types";
import { statusOf, useProgress } from "@/lib/progress";

export interface PlanProblem {
  id: string;
  title: string;
  href: string;
  difficulty: Difficulty;
}

/** A week's problems with live solved status. */
export function PlanProblems({ problems }: Readonly<{ problems: PlanProblem[] }>) {
  const progress = useProgress();
  const solved = problems.filter((p) => statusOf(progress, p.id) === "solved").length;
  return (
    <div>
      <p className="mb-1.5 text-xs text-fg-3">
        {solved} of {problems.length} solved
      </p>
      <ul className="grid gap-1 sm:grid-cols-2">
        {problems.map((p) => (
          <li key={p.id} className="flex min-w-0 items-center gap-2 text-sm">
            <StatusIcon status={statusOf(progress, p.id)} />
            <Link href={p.href} className="-my-1.5 min-w-0 truncate py-1.5 text-fg-1 hover:text-blue hover:underline">
              {p.title}
            </Link>
            <DifficultyText difficulty={p.difficulty} />
          </li>
        ))}
      </ul>
    </div>
  );
}
