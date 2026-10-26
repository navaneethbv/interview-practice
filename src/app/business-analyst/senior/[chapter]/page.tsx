import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { ChapterView } from "@/components/ba/ChapterView";
import { getBaBank, getBaChapter, getBaIndex, getBaTips } from "@/lib/ba-content";

export function generateStaticParams() {
  return getBaIndex("senior").chapters.map((c) => ({ chapter: c.id }));
}

export const dynamicParams = false;

type PageProps = Readonly<{ params: Promise<{ chapter: string }> }>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const chapter = getBaChapter((await params).chapter, "senior");
  return chapter ? { title: `${chapter.title} · Senior BA Track`, description: chapter.summary } : {};
}

export default async function SeniorBaChapterPage({ params }: PageProps) {
  const chapter = getBaChapter((await params).chapter, "senior");
  if (!chapter) notFound();
  const index = getBaIndex("senior");
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
          bank={getBaBank(chapter.id, "senior")}
          chapterIds={ids}
          prev={prevMeta ? { id: prevMeta.id, title: prevMeta.title } : null}
          next={nextMeta ? { id: nextMeta.id, title: nextMeta.title } : null}
          quizSize={index.quizSize}
          passPercent={index.passPercent}
          tips={getBaTips("senior")}
          routeBase="/business-analyst/senior"
        />
      </main>
      <SiteFooter />
    </>
  );
}
