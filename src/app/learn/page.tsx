import type { Metadata } from "next";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import { CourseOutline } from "@/components/CourseOutline";
import { getCourse } from "@/lib/content";

export const metadata: Metadata = { title: "Coding Patterns" };

export default function LearnPage() {
  const course = getCourse();
  return (
    <>
      <NavBar />
      <PageHeader eyebrow="Pattern course" title={course.title}>
        {course.description}
      </PageHeader>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <CourseOutline course={course} />
      </main>
      <SiteFooter />
    </>
  );
}
