import Link from "next/link";
import { ArrowRight, Boxes, Code2, Network } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { ProgressPanel } from "@/components/ProgressPanel";
import { getCourse, listDesignArticles, listProblems } from "@/lib/content";
import { COURSE_SCOPE } from "@/lib/content-types";

export default function Home() {
  const course = getCourse();
  const problems = listProblems();
  const designs = listDesignArticles();
  const patterns = course.chapters.filter((c) => c.title.startsWith("Pattern"));

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="mb-10">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">Practice for your next interview</h1>
          <p className="max-w-2xl text-lg text-fg-2">
            Learn the patterns, then prove it: write Python or Java, run it against edge-case tests, and keep your
            progress in this browser.
          </p>
        </section>

        <ProgressPanel
          ids={problems.map((p) => p.id)}
          difficulties={problems.map((p) => p.difficulty)}
          scope={COURSE_SCOPE}
        />

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <TrackCard
            href="/problems"
            icon={<Code2 size={20} />}
            tone="bg-ok-soft text-ok"
            title="Coding Problems"
            body={`${problems.length} problems with hidden test cases, a LeetCode-style editor and instant feedback.`}
          />
          <TrackCard
            href="/learn"
            icon={<Boxes size={20} />}
            tone="bg-blue-soft text-blue"
            title="Pattern Lessons"
            body={`${patterns.length} patterns explained step by step, from sliding window to topological sort.`}
          />
          <TrackCard
            href="/system-design"
            icon={<Network size={20} />}
            tone="bg-brand-soft text-brand"
            title="System Design"
            body={
              designs.length
                ? `${designs.length} design problems. Sketch your design, then compare with the reference.`
                : "Design interview practice. Import your system design material to get started."
            }
          />
        </section>

        <section className="mt-12">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Patterns</h2>
            <Link href="/learn" className="text-sm text-blue hover:underline">
              View course
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {patterns.map((ch, i) => {
              const count = ch.items.filter((it) => it.type === "problem").length;
              const first = ch.items[0];
              return (
                <Link
                  key={ch.id}
                  href={first.type === "problem" ? `/problems/${first.id}` : `/learn/${first.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-layer-1 px-4 py-3.5 transition-colors hover:border-line-strong"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-layer-2 text-sm font-semibold text-fg-2">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{ch.title.replace(/^Pattern:\s*/, "")}</span>
                    <span className="block text-xs text-fg-3">{count} problems</span>
                  </span>
                  <ArrowRight size={16} className="text-fg-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

function TrackCard({
  href,
  icon,
  tone,
  title,
  body,
}: Readonly<{
  href: string;
  icon: React.ReactNode;
  tone: string;
  title: string;
  body: string;
}>) {
  return (
    <Link href={href} className="group rounded-2xl border border-line bg-layer-1 p-5 transition-colors hover:border-line-strong">
      <span className={`mb-4 grid size-10 place-items-center rounded-xl ${tone}`}>{icon}</span>
      <h3 className="mb-1 flex items-center gap-1.5 font-semibold">
        {title}
        <ArrowRight size={15} className="text-fg-3 transition-transform group-hover:translate-x-0.5" />
      </h3>
      <p className="text-sm text-fg-2">{body}</p>
    </Link>
  );
}
