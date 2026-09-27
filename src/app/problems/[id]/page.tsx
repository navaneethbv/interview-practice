import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonContent } from "@/components/LessonContent";
import { Workspace } from "@/components/workspace/Workspace";
import { DifficultyPill, Tag } from "@/components/ui";
import {
  getCourse,
  getLesson,
  getProblemSpec,
  getPythonReference,
  listProblems,
  renderBlocks,
} from "@/lib/content";
import { generateStarter } from "@/lib/judge/starter";

export function generateStaticParams() {
  return listProblems().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const lesson = getLesson((await params).id);
  return { title: lesson?.title ?? "Problem" };
}

export default async function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson || lesson.type !== "problem") notFound();

  const problems = listProblems();
  const idx = problems.findIndex((p) => p.id === id);
  const item = problems[idx];
  const chapter = getCourse().chapters.find((c) => c.id === lesson.chapterId);
  const spec = getProblemSpec(id);
  const [statement, solution] = await Promise.all([renderBlocks(lesson.statement), renderBlocks(lesson.solution)]);

  const starters = spec
    ? { python: generateStarter(spec, "python"), java: generateStarter(spec, "java") }
    : { python: lesson.starter?.python ?? "", java: lesson.starter?.java ?? "" };

  return (
    <Workspace
      id={id}
      title={`${item.number}. ${lesson.title}`}
      spec={spec}
      reference={getPythonReference(id)}
      starters={starters}
      nav={{
        list: "/problems",
        prev: idx > 0 ? `/problems/${problems[idx - 1].id}` : null,
        next: idx < problems.length - 1 ? `/problems/${problems[idx + 1].id}` : null,
      }}
      description={
        <>
          <h1 className="mb-3 text-xl font-semibold tracking-tight">
            {item.number}. {lesson.title}
          </h1>
          <div className="mb-5 flex flex-wrap gap-2">
            <DifficultyPill difficulty={item.difficulty} />
            <Tag>{chapter?.title.replace(/^Pattern:\s*/, "")}</Tag>
          </div>
          <LessonContent blocks={statement} />
        </>
      }
      solution={
        solution.length ? (
          <LessonContent blocks={solution} />
        ) : (
          <p className="text-fg-3">No written solution for this problem.</p>
        )
      }
    />
  );
}
