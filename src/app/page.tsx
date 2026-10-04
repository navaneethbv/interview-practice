import Link from "next/link";
import { ArrowRight, Boxes, Code2, Network } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { ProgressPanel } from "@/components/ProgressPanel";
import { designChapters, getCourse, listDesignBooks, listProblems } from "@/lib/content";
import { COURSE_SCOPE } from "@/lib/content-types";

export default function Home() {
  const course = getCourse();
  const problems = listProblems();
  const designBooks = listDesignBooks();
  const designChapterCount = designBooks.reduce((sum, book) => sum + designChapters(book).length, 0);
  const patterns = course.chapters.filter((c) => c.title.startsWith("Pattern"));

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <section className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand">Interview Practice</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Practice the questions that move you forward.</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-fg-2">
            Coding drills, pattern lessons, and interview guides in one focused workspace.
          </p>
        </section>

        <section className="mb-10">
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold tracking-tight">Keep going</h2>
            <Link href="/problems" className="text-sm text-blue hover:underline">
              Open problems
            </Link>
          </div>
          <ProgressPanel
            ids={problems.map((p) => p.id)}
            difficulties={problems.map((p) => p.difficulty)}
            scope={COURSE_SCOPE}
            scopeLabel="Coding practice"
          />
        </section>

        <section className="overflow-hidden rounded-2xl border border-line bg-layer-1">
          <div className="border-b border-line px-5 py-4">
            <h2 className="text-lg font-semibold tracking-tight">Choose a track</h2>
            <p className="mt-1 text-sm text-fg-2">Start with the kind of practice you need today.</p>
          </div>
          <div className="divide-y divide-line">
            <TrackRow
              href="/problems"
              icon={<Code2 size={20} />}
              tone="bg-ok-soft text-ok"
              title="Coding problems"
              meta={`${problems.length} problems`}
              body="Write Python or Java, run hidden edge-case tests, and track what you solve."
            />
            <TrackRow
              href="/learn"
              icon={<Boxes size={20} />}
              tone="bg-blue-soft text-blue"
              title="Pattern lessons"
              meta={`${patterns.length} patterns`}
              body="Build the mental models behind the problems, from sliding window to topological sort."
            />
            <TrackRow
              href="/system-design"
              icon={<Network size={20} />}
              tone="bg-brand-soft text-brand"
              title="Interview guides"
              meta={designBooks.length ? `${designBooks.length} books · ${designChapterCount} chapters` : "Reading notes"}
              body="Practice system design, AI architecture, testing, and behavioral interviews with worked examples."
            />
          </div>
        </section>
      </main>
    </>
  );
}

function TrackRow({
  href,
  icon,
  tone,
  title,
  meta,
  body,
}: Readonly<{
  href: string;
  icon: React.ReactNode;
  tone: string;
  title: string;
  meta: string;
  body: string;
}>) {
  return (
    <Link href={href} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-layer-2">
      <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${tone}`}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-semibold">{title}</span>
          <span className="text-xs text-fg-3">{meta}</span>
        </span>
        <span className="mt-0.5 block text-sm text-fg-2">{body}</span>
      </span>
      <ArrowRight size={17} className="shrink-0 text-fg-3 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
