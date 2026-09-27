import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { ProblemTable } from "@/components/ProblemTable";
import { ProgressPanel } from "@/components/ProgressPanel";
import { SetTabs } from "@/components/SetTabs";
import { getCourse, listProblems, listSets } from "@/lib/content";
import { COURSE_SCOPE } from "@/lib/content-types";

export const metadata: Metadata = { title: "Problems" };

export default function ProblemsPage() {
  const problems = listProblems();
  const patterns = getCourse()
    .chapters.filter((c) => c.items.some((i) => i.type === "problem"))
    .map((c) => ({ id: c.id, title: c.title.replace(/^Pattern:\s*/, "") }));
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <SetTabs sets={listSets()} active={COURSE_SCOPE} />
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">Grokking Patterns</h1>
        <p className="mb-6 text-fg-2">
          Every coding problem from the pattern course. Solve in Python or Java against hidden edge-case tests.
        </p>
        <div className="mb-6">
          <ProgressPanel
            ids={problems.map((p) => p.id)}
            difficulties={problems.map((p) => p.difficulty)}
            scope={COURSE_SCOPE}
            scopeLabel="Grokking Patterns"
            resettable
          />
        </div>
        <ProblemTable problems={problems} patterns={patterns} />
      </main>
    </>
  );
}
