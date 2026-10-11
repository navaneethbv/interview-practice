import type { Metadata } from "next";
import { ListSwitcher } from "@/components/lists/ListSwitcher";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import { ProblemTable } from "@/components/ProblemTable";
import { ProgressPanel } from "@/components/ProgressPanel";
import { switcherOptions } from "@/lib/catalog";
import { getCourse, listProblems } from "@/lib/content";
import { COURSE_SCOPE } from "@/lib/content-types";

export const metadata: Metadata = { title: "Grokking Patterns" };

export default function GrokkingPage() {
  const problems = listProblems();
  const patterns = getCourse()
    .chapters.filter((c) => c.items.some((i) => i.type === "problem"))
    .map((c) => ({ id: c.id, title: c.title.replace(/^Pattern:\s*/, "") }));
  return (
    <>
      <NavBar />
      <PageHeader
        crumbs={[{ href: "/problems", label: "Problems" }]}
        title="Grokking Patterns"
        actions={<ListSwitcher options={switcherOptions()} current="/problems/grokking" />}
      >
        Every coding problem from the pattern course, in lesson order. Pair each pattern with its lesson under Patterns.
      </PageHeader>
      <main className="mx-auto max-w-6xl px-4 py-6">
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
      <SiteFooter />
    </>
  );
}
