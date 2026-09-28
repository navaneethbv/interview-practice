import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LessonContent } from "@/components/LessonContent";
import { OnThisPage } from "@/components/design/OnThisPage";
import { designChapters, getDesignChapter, listDesignBooks } from "@/lib/content";
import type { Difficulty } from "@/lib/content-types";

export function generateStaticParams() {
  return listDesignBooks().flatMap((book) => designChapters(book).map((c) => ({ book: book.id, chapter: c.id })));
}

export const dynamicParams = false;

type PageProps = Readonly<{ params: Promise<{ book: string; chapter: string }> }>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { book, chapter } = await params;
  const page = getDesignChapter(book, chapter);
  return page ? { title: `${page.chapter.title} · ${page.book.short}`, description: page.chapter.lead } : {};
}

const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  easy: "text-easy",
  medium: "text-medium",
  hard: "text-hard",
};

export default async function ChapterPage({ params }: PageProps) {
  const { book: bookId, chapter: chapterId } = await params;
  const page = getDesignChapter(bookId, chapterId);
  if (!page) notFound();
  const { book, chapter, prev, next, html, headings, minutes } = page;

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-10">
      <article className="mx-auto w-full max-w-[46rem] min-w-0">
        <header className="mb-8 border-b border-line pb-6">
          <p className="mb-2 text-sm font-medium text-brand">{chapter.part}</p>
          <h1 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-[2.1rem]">
            {chapter.title}
          </h1>
          {chapter.lead && <p className="mt-3 text-lg leading-relaxed text-fg-2">{chapter.lead}</p>}
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fg-3">
            {chapter.difficulty && (
              <span>
                Difficulty{" "}
                <span className={`font-medium capitalize ${DIFFICULTY_STYLE[chapter.difficulty]}`}>
                  {chapter.difficulty}
                </span>
              </span>
            )}
            {chapter.similar && <span>Similar to {chapter.similar}</span>}
            <span>{minutes} min read</span>
          </p>
        </header>

        <LessonContent blocks={[{ t: "html", html }]} className="prose-reader" />

        <nav aria-label="Chapter navigation" className="mt-14 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/system-design/${book.id}/${prev.id}`}
              className="rounded-xl border border-line bg-layer-1 px-4 py-3 transition-colors hover:border-line-strong"
            >
              <span className="flex items-center gap-1 text-xs text-fg-3">
                <ArrowLeft size={13} /> Previous
              </span>
              <span className="mt-0.5 block font-medium text-fg-1">{prev.title}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link
              href={`/system-design/${book.id}/${next.id}`}
              className="rounded-xl border border-line bg-layer-1 px-4 py-3 text-right transition-colors hover:border-line-strong"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-fg-3">
                Next <ArrowRight size={13} />
              </span>
              <span className="mt-0.5 block font-medium text-fg-1">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>

      <aside className="hidden xl:block">
        <div className="sticky top-[4.25rem] max-h-[calc(100dvh-5.25rem)] overflow-y-auto pb-6">
          <OnThisPage headings={headings} />
        </div>
      </aside>
    </div>
  );
}
