import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { LessonContent } from "@/components/LessonContent";
import { MarkRead } from "@/components/MarkRead";
import { getCourse, getLesson, hrefFor, neighbors, renderBlocks } from "@/lib/content";

export function generateStaticParams() {
  return getCourse()
    .chapters.flatMap((c) => c.items)
    .filter((i) => i.type === "lesson")
    .map((i) => ({ id: i.id }));
}

type PageProps = Readonly<{ params: Promise<{ id: string }> }>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lesson = getLesson((await params).id);
  return { title: lesson?.title ?? "Lesson" };
}

export default async function LessonPage({ params }: PageProps) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (lesson?.type !== "lesson") notFound();
  const chapter = getCourse().chapters.find((c) => c.id === lesson.chapterId);
  const blocks = await renderBlocks(lesson.body);
  const { prev, next } = neighbors(id);

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-sm text-fg-3" aria-label="Breadcrumb">
          <Link href="/learn" className="hover:text-fg-1">
            Patterns
          </Link>
          <span className="mx-1.5">/</span>
          <span>{chapter?.title}</span>
        </nav>
        <article className="rounded-2xl border border-line bg-layer-1 px-5 py-7 sm:px-10 sm:py-10">
          <h1 className="mb-6 text-3xl font-semibold tracking-tight">{lesson.title}</h1>
          <LessonContent blocks={blocks} />
          <div className="mt-10 border-t border-line pt-6">
            <MarkRead id={lesson.id} />
          </div>
        </article>
        <div className="mt-6 flex justify-between gap-4 text-sm">
          {prev ? (
            <Link
              href={hrefFor(prev)}
              className="flex min-w-0 items-center gap-1 rounded-lg px-3 py-2 text-fg-2 hover:bg-layer-2 hover:text-fg-1"
            >
              <ChevronLeft size={16} className="shrink-0" /> <span className="truncate">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={hrefFor(next)}
              className="flex min-w-0 items-center gap-1 rounded-lg px-3 py-2 text-fg-2 hover:bg-layer-2 hover:text-fg-1"
            >
              <span className="truncate">{next.title}</span> <ChevronRight size={16} className="shrink-0" />
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
