import type { Metadata } from "next";
import { ListHub } from "@/components/lists/ListHub";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import { listSummaries } from "@/lib/catalog";

export const metadata: Metadata = { title: "Problem lists" };

export default function ProblemsPage() {
  const lists = listSummaries();
  const problems = new Set(lists.flatMap((l) => l.ids)).size;
  return (
    <>
      <NavBar />
      <PageHeader eyebrow="Problems" title="Problem lists">
        {problems.toLocaleString()} problems across {lists.length} lists. Solve in Python, Java, JavaScript, TypeScript, C++ or Go against hidden
        edge-case tests; each list tracks its own progress.
      </PageHeader>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <ListHub lists={lists} />
      </main>
      <SiteFooter />
    </>
  );
}
