"use client";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { bookmarks } from "@/lib/learning-store";
export function BookmarkButton({
  href,
  title,
  section,
  className = "",
}: Readonly<{
  href: string;
  title: string;
  section: string;
  className?: string;
}>) {
  const saved = bookmarks.use();
  const exists = saved.some((b) => b.href === href);
  return (
    <button
      type="button"
      aria-pressed={exists}
      aria-label={`${exists ? "Remove bookmark for" : "Bookmark"} ${title}`}
      className={`inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm text-fg-2 hover:bg-layer-2 ${className}`}
      onClick={() =>
        bookmarks.write(
          exists
            ? saved.filter((b) => b.href !== href)
            : [...saved, { href, title, section }],
        )
      }
    >
      {exists ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}{" "}
      {exists ? "Saved" : "Save"}
    </button>
  );
}
export default BookmarkButton;
