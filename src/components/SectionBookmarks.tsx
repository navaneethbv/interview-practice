import { BookmarkButton } from "@/components/learning/BookmarkButton";

export function SectionBookmarks({
  href,
  section,
  headings,
}: Readonly<{
  href: string;
  section: string;
  headings: { id: string; text: string }[];
}>) {
  if (!headings.length) return null;
  return (
    <details className="reader-hide my-4 rounded-xl border border-line bg-layer-1 p-3 text-sm">
      <summary className="cursor-pointer font-medium text-fg-2">
        Save a specific section
      </summary>
      <ul className="mt-3 space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-2"
          >
            <a href={`#${heading.id}`} className="min-w-0 flex-1 text-fg-2">
              {heading.text}
            </a>
            <BookmarkButton
              href={`${href}#${heading.id}`}
              title={heading.text}
              section={section}
            />
          </li>
        ))}
      </ul>
    </details>
  );
}
