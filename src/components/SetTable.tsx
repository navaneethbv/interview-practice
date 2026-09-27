"use client";

import Link from "next/link";
import { ExternalLink, Search, Shuffle } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { lcProgressId, type Difficulty, type SetKind, type SetRow } from "@/lib/content-types";
import { statusOf, useProgress } from "@/lib/progress";
import { DifficultyText, StatusIcon } from "./ui";

type StatusFilter = "all" | "solved" | "attempted" | "todo";

const select =
  "h-9 rounded-lg border border-line bg-layer-1 px-2.5 text-sm text-fg-1 outline-none hover:border-line-strong focus-visible:border-blue";

/** Problems of one list with filters; statuses count only submissions since the list's last reset. */
export function SetTable({ setId, kind, rows }: { setId: string; kind: SetKind; rows: SetRow[] }) {
  const progress = useProgress();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [group, setGroup] = useState("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  // Curated lists come with categories; company lists are filtered by topic.
  const byCategory = kind === "curated";
  const groups = useMemo(() => {
    const unique = [...new Set(rows.flatMap((r) => (byCategory ? (r.category ? [r.category] : []) : r.topics)))];
    return byCategory ? unique : unique.sort((x, y) => x.localeCompare(y));
  }, [rows, byCategory]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (q && !r.title.toLowerCase().includes(q) && !String(r.number).startsWith(q)) return false;
      if (difficulty !== "all" && r.difficulty !== difficulty) return false;
      if (group !== "all" && (byCategory ? r.category !== group : !r.topics.includes(group))) return false;
      const s = statusOf(progress, lcProgressId(r.slug), setId);
      if (status === "solved" && s !== "solved") return false;
      if (status === "attempted" && s !== "attempted") return false;
      if (status === "todo" && s === "solved") return false;
      return true;
    });
  }, [rows, query, difficulty, group, status, progress, setId, byCategory]);

  const available = rows.filter((r) => r.available).length;

  function pickRandom() {
    const unsolved = visible.filter((r) => r.available && statusOf(progress, lcProgressId(r.slug), setId) !== "solved");
    const pool = unsolved.length ? unsolved : rows.filter((r) => r.available);
    if (!pool.length) return;
    const [index] = crypto.getRandomValues(new Uint32Array(1));
    router.push(`/problems/lc/${pool[index % pool.length].slug}?set=${setId}`);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="relative min-w-0 flex-1 basis-56">
          <span className="sr-only">Search problems</span>
          <Search size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-fg-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or number"
            className="h-9 w-full rounded-lg border border-line bg-layer-1 pr-3 pl-9 text-sm outline-none placeholder:text-fg-3 hover:border-line-strong focus-visible:border-blue"
          />
        </label>
        <select
          aria-label="Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty | "all")}
          className={select}
        >
          <option value="all">Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select
          aria-label={byCategory ? "Category" : "Topic"}
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className={`${select} max-w-48`}
        >
          <option value="all">{byCategory ? "Category" : "Topic"}</option>
          {groups.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)} className={select}>
          <option value="all">Status</option>
          <option value="todo">Todo</option>
          <option value="attempted">Attempted</option>
          <option value="solved">Solved</option>
        </select>
        <button
          onClick={pickRandom}
          disabled={!available}
          className="flex h-9 items-center gap-1.5 rounded-lg bg-ok-strong px-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Shuffle size={15} /> Pick one
        </button>
      </div>

      <p className="mb-2 text-sm text-fg-3">
        Showing {visible.length} of {rows.length}
        {available < rows.length && ` · ${available} ready to solve here, the rest are being added`}
      </p>

      <div className="overflow-x-auto rounded-xl border border-line bg-layer-1">
        <table className="w-full text-sm">
          <thead className="border-b border-line text-left text-xs text-fg-3">
            <tr>
              <th className="w-12 py-2.5 pl-4 font-medium">
                <span className="sr-only">Status</span>
              </th>
              <th className="py-2.5 font-medium">Title</th>
              <th className="hidden py-2.5 font-medium md:table-cell">{byCategory ? "Category" : "Topics"}</th>
              <th className="hidden w-28 py-2.5 font-medium sm:table-cell">Acceptance</th>
              <th className="w-20 py-2.5 pr-4 font-medium">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r, i) => (
              <tr key={r.slug} className={`transition-colors hover:bg-layer-2 ${i % 2 ? "bg-layer-2/40" : ""}`}>
                <td className="py-3 pl-4 align-middle">
                  <StatusIcon status={statusOf(progress, lcProgressId(r.slug), setId)} />
                </td>
                <td className="py-3 pr-3">
                  {r.available ? (
                    <Link href={`/problems/lc/${r.slug}?set=${setId}`} className="font-medium text-fg-1 hover:text-blue">
                      {r.number}. {r.title}
                    </Link>
                  ) : (
                    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-fg-2">
                        {r.number}. {r.title}
                      </span>
                      <span className="rounded-full bg-layer-2 px-2 py-0.5 text-xs text-fg-3">Coming soon</span>
                      <a
                        href={`https://leetcode.com/problems/${r.slug}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue hover:underline"
                      >
                        LeetCode <ExternalLink size={12} aria-hidden />
                      </a>
                    </span>
                  )}
                </td>
                <td className="hidden py-3 pr-3 text-fg-2 md:table-cell">
                  {byCategory ? r.category : r.topics.slice(0, 3).join(", ")}
                </td>
                <td className="hidden py-3 pr-3 text-fg-2 tabular-nums sm:table-cell">
                  {r.acceptance !== undefined ? `${r.acceptance.toFixed(1)}%` : "–"}
                </td>
                <td className="py-3 pr-4">
                  <DifficultyText difficulty={r.difficulty} />
                </td>
              </tr>
            ))}
            {!visible.length && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-fg-3">
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
