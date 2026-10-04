"use client";

import Link from "next/link";
import { Search, Shuffle } from "lucide-react";
import { Suspense, useMemo } from "react";
import { useRouter } from "next/navigation";
import { COURSE_SCOPE } from "@/lib/content-types";
import type { ProblemListItem } from "@/lib/content";
import { statusOf, useProgress } from "@/lib/progress";
import { problemPool, randomProblem } from "@/lib/problem-selection";
import { DifficultyText, StatusIcon } from "./ui";
import { useProblemFilters } from "./useProblemFilters";

type Props = Readonly<{
  problems: ProblemListItem[];
  patterns: { id: string; title: string }[];
}>;

export function ProblemTable(props: Props) {
  return (
    <Suspense fallback={<p className="py-8 text-sm text-fg-3">Loading problems...</p>}>
      <ProblemTableContent {...props} />
    </Suspense>
  );
}

function ProblemTableContent({ problems, patterns }: Props) {
  const progress = useProgress();
  const router = useRouter();
  const { query, difficulty, group: pattern, status, setQuery, setDifficulty, setGroup: setPattern, setStatus } =
    useProblemFilters("pattern", patterns.map((p) => p.id));

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return problems.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q) && !String(p.number).startsWith(q)) return false;
      if (difficulty !== "all" && p.difficulty !== difficulty) return false;
      if (pattern !== "all" && p.chapterId !== pattern) return false;
      const s = statusOf(progress, p.id, COURSE_SCOPE);
      if (status === "solved" && s !== "solved") return false;
      if (status === "attempted" && s !== "attempted") return false;
      if (status === "todo" && s === "solved") return false;
      return true;
    });
  }, [problems, query, difficulty, pattern, status, progress]);

  const solved = problems.filter((p) => statusOf(progress, p.id, COURSE_SCOPE) === "solved").length;
  const pool = problemPool(rows, (p) => p.hasTests, (p) => statusOf(progress, p.id, COURSE_SCOPE) === "solved");

  function pickRandom() {
    const problem = randomProblem(pool);
    if (problem) router.push(`/problems/${problem.id}`);
  }

  const select =
    "h-9 rounded-lg border border-line bg-layer-1 px-2.5 text-sm text-fg-1 outline-none hover:border-line-strong focus-visible:border-blue";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="relative min-w-0 flex-1 basis-56">
          <span className="sr-only">Search problems</span>
          <Search size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-fg-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions"
            className="h-9 w-full rounded-lg border border-line bg-layer-1 pr-3 pl-9 text-sm outline-none placeholder:text-fg-3 hover:border-line-strong focus-visible:border-blue"
          />
        </label>
        <select
          aria-label="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className={select}
        >
          <option value="all">Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select aria-label="Pattern" value={pattern} onChange={(e) => setPattern(e.target.value)} className={`${select} max-w-48`}>
          <option value="all">Pattern</option>
          {patterns.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
        <select
          aria-label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={select}
        >
          <option value="all">Status</option>
          <option value="todo">Todo</option>
          <option value="attempted">Attempted</option>
          <option value="solved">Solved</option>
        </select>
        <button
          onClick={pickRandom}
          disabled={!pool.length}
          className="flex h-9 items-center gap-1.5 rounded-lg bg-ok-strong px-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Shuffle size={15} /> Pick one
        </button>
      </div>

      <p className="mb-2 text-sm text-fg-3">
        {solved}/{problems.length} solved · showing {rows.length}
      </p>

      <div className="overflow-hidden rounded-xl border border-line bg-layer-1">
        <table className="w-full text-sm">
          <thead className="border-b border-line text-left text-xs text-fg-3">
            <tr>
              <th className="w-12 py-2.5 pl-4 font-medium">
                <span className="sr-only">Status</span>
              </th>
              <th className="py-2.5 font-medium">Title</th>
              <th className="hidden py-2.5 font-medium sm:table-cell">Pattern</th>
              <th className="w-24 py-2.5 pr-4 font-medium">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p, i) => (
              <tr key={p.id} className={`transition-colors hover:bg-layer-2 ${i % 2 ? "bg-layer-2/40" : ""}`}>
                <td className="py-3 pl-4 align-middle">
                  <StatusIcon status={statusOf(progress, p.id, COURSE_SCOPE)} />
                </td>
                <td className="py-3 pr-3">
                  <Link href={`/problems/${p.id}`} className="font-medium text-fg-1 hover:text-blue">
                    {p.number}. {p.title}
                  </Link>
                </td>
                <td className="hidden py-3 pr-3 text-fg-2 sm:table-cell">{p.chapterTitle}</td>
                <td className="py-3 pr-4">
                  <DifficultyText difficulty={p.difficulty} />
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-fg-3">
                  No problems match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
