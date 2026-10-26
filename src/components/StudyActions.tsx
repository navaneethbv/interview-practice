import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { BookmarkButton } from "@/components/learning/BookmarkButton";

export function StudyActions({
  href,
  title,
  section,
}: Readonly<{ href: string; title: string; section: string }>) {
  const query = new URLSearchParams({ question: title, href });
  return (
    <div className="reader-hide my-4 flex flex-wrap items-center gap-2">
      <BookmarkButton href={href} title={title} section={section} />
      <Link
        href={`/practice/notebook?${query}`}
        className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm text-fg-2 hover:bg-layer-2"
      >
        <NotebookPen size={16} aria-hidden />
        Record a mistake
      </Link>
    </div>
  );
}
