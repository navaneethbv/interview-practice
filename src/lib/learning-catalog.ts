import { practiceCatalog } from "./practice-catalog";
import { listBaChapters } from "./ba-content";
import { getCourse, getLesson, hrefFor } from "./content";
import { readingMinutes, type LearningTask } from "./learning-data";

export function learningCatalog(): LearningTask[] {
  const coding: LearningTask[] = Object.entries(practiceCatalog().entries).map(
    ([id, entry]) => ({
      id: `coding:${id}`,
      evidenceId: id,
      title: entry.title,
      href: entry.href,
      track: "coding",
      kind: "solve",
      minutes:
        entry.difficulty === "easy"
          ? 20
          : entry.difficulty === "hard"
            ? 45
            : 30,
    }),
  );
  const patternLessons: LearningTask[] = getCourse().chapters.flatMap(
    (chapter) =>
      chapter.items
        .filter((item) => item.type === "lesson")
        .map((item) => {
          const body = getLesson(item.id)?.body ?? [];
          const words = body
            .filter((block) => block.t === "html")
            .map((block) => block.html.replace(/<[^>]*>/g, " "))
            .join(" ")
            .trim()
            .split(/\s+/)
            .filter(Boolean).length;
          return {
            id: `coding:read:${item.id}`,
            evidenceId: item.id,
            title: `${chapter.title}: ${item.title}`,
            href: hrefFor(item),
            track: "coding" as const,
            kind: "read" as const,
            minutes: readingMinutes(words / 200),
          };
        }),
  );
  // Alternate reading with runnable practice instead of hiding lessons behind the
  // entire problem catalog. Learning exposes ideas; solving tests their application.
  const codingPath = Array.from(
    { length: Math.max(coding.length, patternLessons.length) },
    (_, index) =>
      [patternLessons[index], coding[index]].filter(
        (task): task is LearningTask => !!task,
      ),
  ).flat();
  const ba: LearningTask[] = listBaChapters().flatMap(
    (chapter, index, chapters) => {
      const prerequisite = index
        ? `ba:quiz:${chapters[index - 1].id}`
        : undefined;
      const lessons: LearningTask[] = chapter.lessons.map((lesson) => ({
        id: `ba:read:${chapter.id}:${lesson.n}`,
        evidenceId: `${chapter.id}:${lesson.n}`,
        title: `${chapter.title}: ${lesson.title}`,
        href: `/business-analyst/${chapter.id}#lesson-${lesson.n}`,
        track: "ba",
        kind: "read",
        minutes: readingMinutes(lesson.minutes),
        prerequisite,
      }));
      const quiz: LearningTask = {
        id: `ba:quiz:${chapter.id}`,
        evidenceId: chapter.id,
        title: `Quiz: ${chapter.title}`,
        href: `/business-analyst/${chapter.id}#quiz`,
        track: "ba",
        kind: "quiz",
        minutes: 15,
        prerequisite,
        prerequisites: lessons.map((lesson) => lesson.id),
      };
      return [...lessons, quiz];
    },
  );
  return [...codingPath, ...ba];
}
