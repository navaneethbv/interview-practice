import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { designChapters, listDesignBooks } from "@/lib/content";

export const metadata: Metadata = { title: "System Design" };

export default function SystemDesignPage() {
  const books = listDesignBooks();
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-10 max-w-2xl">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">System Design</h1>
          <p className="text-lg text-fg-2">
            A complete interview framework, distributed-systems references, engineering notes, focused CTCI material, and
            condensed review collections.
          </p>
        </header>

        {books.length ? (
          <div className="grid gap-5 md:grid-cols-3">
            {books.map((book) => {
              const chapters = designChapters(book);
              return (
                <section
                  key={book.id}
                  aria-labelledby={`book-${book.id}`}
                  className="flex flex-col rounded-2xl border border-line bg-layer-1 p-6"
                >
                  <p className="mb-3 flex items-center gap-2 text-sm text-fg-3">
                    <BookOpen size={15} className="text-brand" />
                    {chapters.length} chapters
                    {book.parts.length > 1 && <span>· {book.parts.length} parts</span>}
                  </p>
                  <h2 id={`book-${book.id}`} className="text-xl leading-snug font-semibold tracking-tight">
                    {book.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-2">{book.description}</p>
                  {book.parts.length > 1 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {book.parts.map((part) => (
                        <li key={part.title} className="rounded-md bg-layer-2 px-2 py-0.5 text-xs text-fg-2">
                          {part.title}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto flex items-center gap-2 pt-6">
                    {chapters[0] && (
                      <Link
                        href={`/system-design/${book.id}/${chapters[0].id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-sm font-medium text-neutral-950 hover:opacity-90"
                      >
                        Start reading <ArrowRight size={15} />
                      </Link>
                    )}
                    <Link
                      href={`/system-design/${book.id}`}
                      className="rounded-lg px-3 py-2 text-sm text-fg-2 hover:bg-layer-2 hover:text-fg-1"
                    >
                      Contents
                    </Link>
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line-strong bg-layer-1 px-6 py-12 text-center text-fg-2">
            No books yet. Import one with <code className="font-mono text-fg-1">npm run ingest:system-design</code>.
          </p>
        )}
      </main>
    </>
  );
}
