import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { ChapterView } from "@/components/ba/ChapterView";
import { getBaBank, getBaChapter, getBaIndex, getBaTips } from "@/lib/ba-content";

export function generateStaticParams() {
  return getBaIndex().chapters.map((c) => ({ chapter: c.id }));
}

export const dynamicParams = false;

type PageProps = Readonly<{ params: Promise<{ chapter: string }> }>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const chapter = getBaChapter((await params).chapter);
  return chapter ? { title: `${chapter.title} · Business Analyst Prep`, description: chapter.summary } : {};
}

const NOTES_HINTS: Record<string, string> = {
  "interview-prep": "Draft your 'Tell me about yourself' and STAR stories here: Situation, Task, Action, Result…",
};

export default async function BaChapterPage({ params }: PageProps) {
  const chapter = getBaChapter((await params).chapter);
  if (!chapter) notFound();
  const index = getBaIndex();
  const ids = index.chapters.map((c) => c.id);
  const prevMeta = index.chapters[chapter.number - 2];
  const nextMeta = index.chapters[chapter.number];

  return (
    <>
      <NavBar />
      <main className="px-4 pt-6 pb-16 sm:pt-8">
        <ChapterView
          chapter={{
            id: chapter.id,
            number: chapter.number,
            title: chapter.title,
            summary: chapter.summary,
            introHtml: chapter.introHtml,
            lessons: chapter.lessons,
            minutes: chapter.minutes,
          }}
          bank={getBaBank(chapter.id)}
          chapterIds={ids}
          prev={prevMeta ? { id: prevMeta.id, title: prevMeta.title } : null}
          next={nextMeta ? { id: nextMeta.id, title: nextMeta.title } : null}
          quizSize={index.quizSize}
          passPercent={index.passPercent}
          tips={getBaTips()}
          notesPlaceholder={NOTES_HINTS[chapter.id]}
        />
      </main>
      <SiteFooter />
    </>
  );
}
