import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Layers, Network, UserRound } from "lucide-react";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import { designChapters, listDesignBooks } from "@/lib/content";
import type { DesignBook } from "@/lib/content-types";

export const metadata: Metadata = { title: "Interview Guides" };

const TOPICS: { title: string; blurb: string; icon: React.ReactNode; tone: string; books: string[] }[] = [
  {
    title: "System design",
    blurb: "Frameworks, building blocks and worked designs for the classic round.",
    icon: <Network size={18} />,
    tone: "bg-brand-soft text-brand",
    books: ["grokking", "case-studies", "advanced", "alex-xu", "notes", "ctci", "data-systems", "domain-design", "linux-operations"],
  },
  {
    title: "Object-oriented and AI design",
    blurb: "Low-level design exercises, ML and LLM systems, and the AI-assisted coding round.",
    icon: <Brain size={18} />,
    tone: "bg-violet-soft text-violet",
    books: ["low-level-design", "ai-design", "ai-assisted"],
  },
  {
    title: "Fundamentals and craft",
    blurb: "CS fundamentals, frontend interviews, testing, debugging and code review.",
    icon: <Layers size={18} />,
    tone: "bg-blue-soft text-blue",
    books: ["fundamentals", "frontend", "testing-debugging"],
  },
  {
    title: "Behavioral and career",
    blurb: "Stories, leadership questions, resumes, the job search and offers.",
    icon: <UserRound size={18} />,
    tone: "bg-ok-soft text-ok",
    books: ["behavioral", "career"],
  },
];

export default function SystemDesignPage() {
  const books = listDesignBooks();
  const byId = new Map(books.map((b) => [b.id, b]));
  const grouped = new Set(TOPICS.flatMap((t) => t.books));
  const topics = [
    ...TOPICS.map((t) => ({ ...t, list: t.books.map((id) => byId.get(id)).filter((b): b is DesignBook => !!b) })),
    { title: "More guides", blurb: "", icon: <BookOpen size={18} />, tone: "bg-layer-2 text-fg-2", books: [], list: books.filter((b) => !grouped.has(b.id)) },
  ].filter((t) => t.list.length);
  const chapterCount = books.reduce((sum, b) => sum + designChapters(b).length, 0);

  return (
    <>
      <NavBar />
      <PageHeader eyebrow="Guides" title="Interview guides">
        {books.length} guides and {chapterCount} chapters beyond coding: system design, object-oriented and AI design, fundamentals, behavioral
        preparation and the job search. Read a worked example, practice the follow-ups, and review your reasoning.
      </PageHeader>
      <main className="mx-auto max-w-6xl px-4 py-8">
        {topics.length ? (
          topics.map((t) => (
            <section key={t.title} aria-labelledby={`topic-${t.title}`} className="mb-10">
              <div className="mb-4 flex items-start gap-3">
                <span className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ${t.tone}`}>{t.icon}</span>
                <div>
                  <h2 id={`topic-${t.title}`} className="text-lg font-semibold tracking-tight">{t.title}</h2>
                  {t.blurb && <p className="text-sm text-fg-2">{t.blurb}</p>}
                </div>
              </div>
              <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {t.list.map((book) => (
                  <li key={book.id}>
                    <BookCard book={book} />
                  </li>
                ))}
              </ul>
            </section>
          ))
        ) : (
          <p className="rounded-2xl border border-dashed border-line-strong bg-layer-1 px-6 py-12 text-center text-fg-2">
            No books yet. Import one with <code className="font-mono text-fg-1">npm run ingest:system-design</code>.
          </p>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

function BookCard({ book }: Readonly<{ book: DesignBook }>) {
  const chapters = designChapters(book);
  return (
    <article aria-labelledby={`book-${book.id}`} className="flex h-full flex-col rounded-2xl border border-line bg-layer-1 p-5 shadow-card">
      <p className="mb-2 text-xs text-fg-3">
        {chapters.length} chapters{book.parts.length > 1 && ` · ${book.parts.length} parts`}
      </p>
      <h3 id={`book-${book.id}`} className="leading-snug font-semibold tracking-tight">
        <Link href={`/system-design/${book.id}`} className="hover:text-blue">{book.title}</Link>
      </h3>
      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-fg-2">{book.description}</p>
      <div className="mt-auto flex items-center gap-1 pt-4">
        {chapters[0] && (
          <Link
            href={`/system-design/${book.id}/${chapters[0].id}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-neutral-950 hover:opacity-90"
          >
            Start reading <ArrowRight size={14} />
          </Link>
        )}
        <Link href={`/system-design/${book.id}`} className="rounded-lg px-3 py-1.5 text-sm text-fg-2 hover:bg-layer-2 hover:text-fg-1">
          Contents
        </Link>
      </div>
    </article>
  );
}
