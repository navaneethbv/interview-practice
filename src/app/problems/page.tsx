import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { ProblemTable } from "@/components/ProblemTable";
import { getCourse, listProblems } from "@/lib/content";

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
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">Problems</h1>
        <p className="mb-6 text-fg-2">
          Every coding problem from the pattern course. Solve in Python or Java against hidden edge-case tests.
        </p>
        <ProblemTable problems={problems} patterns={patterns} />
      </main>
    </>
  );
}
