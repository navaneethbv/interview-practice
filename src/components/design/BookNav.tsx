"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, List } from "lucide-react";

export interface BookNavData {
  id: string;
  parts: { title: string; chapters: { id: string; title: string }[] }[];
}

interface Props {
  book: BookNavData;
  books: { id: string; short: string }[];
}

/** The reader's table of contents: a sticky sidebar on large screens and a disclosure above the text on small ones. */
export function BookNav({ book, books }: Readonly<Props>) {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPath, setLastPath] = useState(path);
  if (path !== lastPath) {
    // Close the small-screen menu once a chapter is picked.
    setLastPath(path);
    setMobileOpen(false);
  }
  const current = path.split("/")[3] ?? "";
  const currentTitle = book.parts.flatMap((p) => p.chapters).find((c) => c.id === current)?.title;

  return (
    <>
      <div className="mb-5 lg:hidden">
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="book-nav-mobile"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex w-full items-center gap-2 rounded-xl border border-line bg-layer-1 px-4 py-3 text-left text-sm"
        >
          <List size={16} className="shrink-0 text-fg-3" />
          <span className="min-w-0 flex-1 truncate">
            <span className="text-fg-3">Contents</span>
            {currentTitle && <span className="text-fg-1"> · {currentTitle}</span>}
          </span>
          <ChevronDown size={16} className={`shrink-0 text-fg-3 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
        </button>
        {mobileOpen && (
          <div id="book-nav-mobile" className="mt-2 max-h-[70dvh] overflow-y-auto rounded-xl border border-line bg-layer-1 p-3">
            <NavTree book={book} books={books} current={current} />
          </div>
        )}
      </div>
      <aside className="sticky top-[4.25rem] hidden max-h-[calc(100dvh-5.25rem)] overflow-y-auto pr-2 pb-6 lg:block">
        <NavTree book={book} books={books} current={current} />
      </aside>
    </>
  );
}

function NavTree({ book, books, current }: Readonly<Props & { current: string }>) {
  const activePart = book.parts.findIndex((p) => p.chapters.some((c) => c.id === current));
  const [open, setOpen] = useState<Set<number>>(() => new Set([Math.max(0, activePart)]));
  const [lastActive, setLastActive] = useState(activePart);
  if (activePart !== lastActive) {
    // Following a prev/next link into another part opens that part.
    setLastActive(activePart);
    if (activePart >= 0 && !open.has(activePart)) setOpen(new Set(open).add(activePart));
  }
  const activeLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    activeLink.current?.scrollIntoView({ block: "nearest" });
  }, [current]);

  const toggle = (index: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  const collapsible = book.parts.length > 1;

  return (
    <nav aria-label="Book contents" className="text-sm">
      <ul aria-label="Books" className="mb-5 grid gap-1 rounded-xl bg-layer-2 p-1">
        {books.map((b) => {
          const active = b.id === book.id;
          return (
            <li key={b.id}>
              <Link
                href={`/system-design/${b.id}`}
                aria-current={active ? "true" : undefined}
                className={`block rounded-lg px-3 py-1.5 transition-colors ${
                  active ? "bg-layer-1 font-medium text-fg-1 shadow-sm" : "text-fg-2 hover:text-fg-1"
                }`}
              >
                {b.short}
              </Link>
            </li>
          );
        })}
      </ul>

      <ol className="space-y-1">
        {book.parts.map((part, index) => {
          const expanded = !collapsible || open.has(index);
          const listId = `part-${index}`;
          return (
            <li key={part.title}>
              {collapsible ? (
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={listId}
                  onClick={() => toggle(index)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left font-semibold text-fg-1 hover:bg-layer-2"
                >
                  <ChevronDown
                    size={14}
                    className={`shrink-0 text-fg-3 transition-transform ${expanded ? "" : "-rotate-90"}`}
                  />
                  <span className="min-w-0 flex-1">{part.title}</span>
                  <span className="text-xs font-normal text-fg-3">{part.chapters.length}</span>
                </button>
              ) : (
                <p className="px-2 py-1.5 font-semibold text-fg-1">{part.title}</p>
              )}
              {expanded && (
                <ol id={listId} className="mt-0.5 mb-2 ml-[0.9rem] border-l border-line">
                  {part.chapters.map((chapter) => {
                    const active = chapter.id === current;
                    return (
                      <li key={chapter.id}>
                        <Link
                          ref={active ? activeLink : undefined}
                          href={`/system-design/${book.id}/${chapter.id}`}
                          aria-current={active ? "page" : undefined}
                          className={`-ml-px block border-l py-1.5 pr-2 pl-3 leading-snug transition-colors ${
                            active
                              ? "border-brand font-medium text-fg-1"
                              : "border-transparent text-fg-2 hover:border-line-strong hover:text-fg-1"
                          }`}
                        >
                          {chapter.title}
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
