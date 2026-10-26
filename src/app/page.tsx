import Link from "next/link";
import { ArrowRight, Boxes, Briefcase, Code2, Network } from "lucide-react";
import { listBaChapters } from "@/lib/ba-content";
import { FeaturedLists, HomeStats, TodayActions } from "@/components/home/Dashboard";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { ResumePractice } from "@/components/ResumePractice";
import { LearningTools } from "@/components/practice/LearningTools";
import { listSummaries } from "@/lib/catalog";
import { designChapters, getCourse, listDesignBooks } from "@/lib/content";

const FEATURED = ["grokking", "blind-75", "neetcode-150", "sql-50"];

export default function Home() {
  const lists = listSummaries();
  const featured = FEATURED.map((id) => lists.find((l) => l.id === id)).filter((l): l is NonNullable<typeof l> => !!l);
  const companies = lists.filter((l) => l.group === "companies");
  const problemCount = new Set(lists.flatMap((l) => l.ids)).size;
  const designBooks = listDesignBooks();
  const designChapterCount = designBooks.reduce((sum, book) => sum + designChapters(book).length, 0);
  const patterns = getCourse().chapters.filter((c) => c.title.startsWith("Pattern"));
  const ba = listBaChapters();
  const baChapters = ba.length;
  const baLessons = ba.reduce((sum, c) => sum + c.lessons.length, 0);

  return (
    <>
      <NavBar />
      <div className="hero-glow border-b border-line">
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:py-14 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">Interview Practice</p>
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-[2.6rem] sm:leading-[1.1]">
              Practice the questions that move you forward.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-2">
              {problemCount.toLocaleString()} coding problems in six languages, {patterns.length} pattern lessons, mock interviews and{" "}
              {designBooks.length} interview guides, all in one focused workspace.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/problems"
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-fg-1 px-4 text-sm font-medium text-layer-1 shadow-raised hover:opacity-90"
              >
                Browse problem lists <ArrowRight size={16} />
              </Link>
              <Link
                href="/practice#mock"
                className="inline-flex h-10 items-center rounded-xl border border-line-strong bg-layer-1 px-4 text-sm font-medium hover:bg-layer-2"
              >
                Start a mock interview
              </Link>
            </div>
          </div>
          <HomeStats />
        </section>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <Section title="Pick up where you left off">
          <ResumePractice />
          <TodayActions />
        </Section>

        <Section title="Make today's practice count">
          <LearningTools />
        </Section>

        <Section title="Popular lists" link={{ href: "/problems", label: "All lists" }}>
          <FeaturedLists lists={featured} />
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-1 text-fg-3">Company lists:</span>
            {companies.map((c) => (
              <Link key={c.id} href={c.href} className="rounded-full border border-line bg-layer-1 px-3 py-2 text-fg-2 hover:border-line-strong hover:text-fg-1">
                {c.title}
              </Link>
            ))}
          </div>
        </Section>

        <Section title="Explore">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Track
              href="/problems"
              icon={<Code2 size={20} />}
              tone="bg-ok-soft text-ok"
              title="Coding problems"
              meta={`${lists.length} lists`}
              body="Python, Java, JavaScript, TypeScript, C++ or Go, judged against hidden edge-case tests."
            />
            <Track
              href="/learn"
              icon={<Boxes size={20} />}
              tone="bg-blue-soft text-blue"
              title="Pattern lessons"
              meta={`${patterns.length} patterns`}
              body="The mental models behind the problems, from sliding window to topological sort."
            />
            <Track
              href="/system-design"
              icon={<Network size={20} />}
              tone="bg-brand-soft text-brand"
              title="Interview guides"
              meta={`${designBooks.length} guides · ${designChapterCount} chapters`}
              body="System design, AI architecture, object-oriented design, behavioral and the job search."
            />
            <Track
              href="/business-analyst"
              icon={<Briefcase size={20} />}
              tone="bg-violet-soft text-violet"
              title="Business Analyst prep"
              meta={`${baChapters} chapters · ${baLessons} lessons`}
              body="Bite-size lessons from BA basics to banking domain and interviews, with a quiz after each chapter and a final exam."
            />
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}

function Section({ title, link, children }: Readonly<{ title: string; link?: { href: string; label: string }; children: React.ReactNode }>) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {link && (
          <Link href={link.href} className="-my-2 py-2 text-sm text-blue hover:underline">
            {link.label}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function Track({ href, icon, tone, title, meta, body }: Readonly<{ href: string; icon: React.ReactNode; tone: string; title: string; meta: string; body: string }>) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-line bg-layer-1 p-5 shadow-card transition hover:-translate-y-px hover:border-line-strong hover:shadow-raised"
    >
      <span className={`mb-4 grid size-10 place-items-center rounded-xl ${tone}`}>{icon}</span>
      <span className="flex items-center gap-1.5 font-semibold">
        {title}
        <ArrowRight size={15} aria-hidden className="text-fg-3 transition-transform group-hover:translate-x-0.5" />
      </span>
      <span className="mt-0.5 text-xs text-fg-3">{meta}</span>
      <span className="mt-2 text-sm leading-relaxed text-fg-2">{body}</span>
    </Link>
  );
}
