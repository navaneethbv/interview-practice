import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { ChapterView } from "@/components/ba/ChapterView";
import { ContentFreshness } from "@/components/ContentFreshness";
import { getBaBank, getBaChapter, getBaIndex, getBaTips, type BaTrack } from "@/lib/ba-content";

type PageProps = Readonly<{ params: Promise<{ chapter: string }> }>;

const NOTES_HINTS: Record<string, string> = {
  "interview-prep": "Draft your 'Tell me about yourself' and STAR stories here: Situation, Task, Action, Result…",
};

/** Builds the shared Next.js route handlers for either BA learning track. */
export function createBaChapterRoute(track: BaTrack) {
  const index = getBaIndex(track);
  const routeBase = track === "senior" ? "/business-analyst/senior" : "/business-analyst";
  const courseTitle = track === "senior" ? "Senior BA Track" : "Business Analyst Prep";

  function generateStaticParams() {
    return index.chapters.map((chapter) => ({ chapter: chapter.id }));
  }

  async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const chapter = getBaChapter((await params).chapter, track);
    return chapter ? { title: `${chapter.title} · ${courseTitle}`, description: chapter.summary } : {};
  }

  async function Page({ params }: PageProps) {
    const chapter = getBaChapter((await params).chapter, track);
    if (!chapter) notFound();

    const ids = index.chapters.map((item) => item.id);
    const prevMeta = index.chapters[chapter.number - 2];
    const nextMeta = index.chapters[chapter.number];

    return (
      <>
        <NavBar />
        <main className="px-4 pt-6 pb-16 sm:pt-8">
          <div className="mx-auto max-w-[46rem]"><ContentFreshness contentId="business-analyst" /></div>
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
            bank={getBaBank(chapter.id, track)}
            chapterIds={ids}
            prev={prevMeta ? { id: prevMeta.id, title: prevMeta.title } : null}
            next={nextMeta ? { id: nextMeta.id, title: nextMeta.title } : null}
            quizSize={index.quizSize}
            passPercent={index.passPercent}
            tips={getBaTips(track)}
            routeBase={routeBase}
            notesPlaceholder={track === "beginner" ? NOTES_HINTS[chapter.id] : undefined}
          />
        </main>
        <SiteFooter />
      </>
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
