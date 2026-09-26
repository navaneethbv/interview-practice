import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { CourseOutline } from "@/components/CourseOutline";
import { getCourse } from "@/lib/content";

export const metadata: Metadata = { title: "Coding Patterns" };

export default function LearnPage() {
  const course = getCourse();
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="mb-1 text-sm font-medium text-brand">Course</p>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">{course.title}</h1>
        <p className="mb-8 max-w-2xl text-fg-2">{course.description}</p>
        <CourseOutline course={course} />
      </main>
    </>
  );
}
