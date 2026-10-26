import { LearningShell } from "@/components/learning/LearningShell";
import { Notebook } from "@/components/learning/Notebook";
import { validHref } from "@/lib/learning-data";
export const metadata = { title: "Bookmarks & mistake notebook" };
export default async function NotebookPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{
    question?: string | string[];
    href?: string | string[];
  }>;
}>) {
  const params = await searchParams;
  const question =
    typeof params.question === "string" ? params.question.slice(0, 1000) : "";
  const href = validHref(params.href) ? params.href : "";
  return (
    <LearningShell
      title="Bookmarks & mistake notebook"
      description="Keep useful resources close, capture mistaken reasoning and schedule a review of what you learned."
    >
      <Notebook initialQuestion={question} initialHref={href} />
    </LearningShell>
  );
}
