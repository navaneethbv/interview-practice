import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { PlanProblems, type PlanProblem } from "@/components/practice/PlanProblems";
import { lcAuthored, lcMetaAll } from "@/lib/content";
import { lcProgressId } from "@/lib/content-types";

export const metadata: Metadata = { title: "16-Week Study Plan" };

interface Week {
  week: number;
  phase: string;
  dsaTopic: string;
  problemsText: string;
  problems: string[];
  target: string;
  systemDesign: string;
  deepDive: string;
  goal: string;
  checkpoint: string;
}

interface StudyPlan {
  title: string;
  summary: string;
  phases: Record<string, string>[];
  daily: Record<string, string>[];
  weeks: Week[];
  patterns: Record<string, string>[];
}

function loadPlan(): StudyPlan {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", "study-plan.json"), "utf8")) as StudyPlan;
}

function Table({ rows, columns }: Readonly<{ rows: Record<string, string>[]; columns: string[] }>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-layer-1 text-left text-xs text-fg-3">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-3 py-2 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={columns.map((c) => r[c]).join("|")} className="border-t border-line align-top">
              {columns.map((c, i) => (
                <td key={c} className={`px-3 py-2 ${i === 0 ? "font-medium text-fg-1" : "text-fg-2"}`}>
                  {r[c]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StudyPlanPage() {
  const plan = loadPlan();
  const meta = lcMetaAll();
  const authored = lcAuthored();
  const problemsFor = (slugs: string[]): PlanProblem[] =>
    slugs
      .filter((s) => authored.has(s) && meta[s])
      .map((s) => ({ id: lcProgressId(s), title: meta[s].title, href: `/problems/lc/${s}`, difficulty: meta[s].difficulty }));

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <p className="mb-2 text-sm">
          <Link href="/practice" className="text-blue hover:underline">
            Practice
          </Link>{" "}
          / Study plan
        </p>
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">{plan.title}</h1>
        <p className="mb-8 text-fg-2">{plan.summary}. Problems link to the workspace and show your progress.</p>

        <h2 className="mb-3 text-lg font-semibold">Phases</h2>
        <Table rows={plan.phases} columns={["Phase", "Weeks", "DSA Focus Area", "Key Concepts", "System Design Topic", "Difficulty Mix", "Cumulative Problems"]} />

        <h2 className="mb-3 mt-10 text-lg font-semibold">Weekly schedule</h2>
        <ol className="space-y-4">
          {plan.weeks.map((w) => {
            const problems = problemsFor(w.problems);
            return (
              <li key={w.week} id={`week-${w.week}`} className="scroll-mt-20 rounded-lg border border-line bg-layer-1 p-4">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-semibold">
                    Week {w.week}: {w.dsaTopic}
                  </h3>
                  <span className="text-xs text-fg-3">
                    {w.phase} · target {w.target} problems
                  </span>
                </div>
                <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="inline text-fg-3">System design: </dt>
                    <dd className="inline text-fg-2">{w.systemDesign}</dd>
                  </div>
                  <div>
                    <dt className="inline text-fg-3">Deep dive: </dt>
                    <dd className="inline text-fg-2">{w.deepDive}</dd>
                  </div>
                  <div>
                    <dt className="inline text-fg-3">Goal: </dt>
                    <dd className="inline text-fg-2">{w.goal}</dd>
                  </div>
                  <div>
                    <dt className="inline text-fg-3">Checkpoint: </dt>
                    <dd className="inline text-fg-2">{w.checkpoint}</dd>
                  </div>
                </dl>
                <div className="mt-3">
                  {problems.length > 0 ? (
                    <PlanProblems problems={problems} />
                  ) : (
                    <p className="text-sm text-fg-2">
                      {w.problemsText}{" "}
                      <Link href="/practice#mock" className="text-blue hover:underline">
                        Start a mock interview
                      </Link>{" "}
                      or work through your{" "}
                      <Link href="/practice#review" className="text-blue hover:underline">
                        review queue
                      </Link>
                      .
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <h2 className="mb-3 mt-10 text-lg font-semibold">Daily routine</h2>
        <Table rows={plan.daily} columns={["Time Block", "Duration", "Activity", "What To Do", "Notes"]} />

        <h2 className="mb-3 mt-10 text-lg font-semibold">Pattern recognition cheatsheet</h2>
        <Table rows={plan.patterns} columns={["Pattern", "Recognize When…", "Template / Approach", "Time Complexity", "Space Complexity", "Gotchas"]} />
      </main>
    </>
  );
}
