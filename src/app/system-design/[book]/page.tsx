import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Download } from "lucide-react";
import { designChapters, getDesignBook } from "@/lib/content";

type PageProps = Readonly<{ params: Promise<{ book: string }> }>;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const book = getDesignBook((await params).book);
  return book ? { title: book.title, description: book.description } : {};
}

/** A book's contents page: every part and chapter with its one-line introduction. */
export default async function BookPage({ params }: PageProps) {
  const book = getDesignBook((await params).book);
  if (!book) notFound();
  const chapters = designChapters(book);
  const numbers = new Map(chapters.map((c, i) => [c.id, i + 1]));
  const sourceLinks = book.sourceLinks ?? (book.sourceUrl ? [{ label: book.sourceLabel ?? "Source", url: book.sourceUrl }] : []);

  return (
    <article className="mx-auto w-full max-w-[46rem]">
      <header className="mb-10 border-b border-line pb-8">
        <p className="mb-2 text-sm font-medium text-brand">Interview Guides</p>
        <h1 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-[2.1rem]">{book.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-fg-2">{book.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {chapters[0] && (
            <Link
              href={`/system-design/${book.id}/${chapters[0].id}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-neutral-950 hover:opacity-90"
            >
              Start reading <ArrowRight size={15} />
            </Link>
          )}
          {book.download && (
            <a
              href={book.download}
              download
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-fg-2 hover:bg-layer-2 hover:text-fg-1"
            >
              <Download size={15} /> Original document
            </a>
          )}
          {sourceLinks.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg px-3 py-2 text-sm text-fg-2 hover:bg-layer-2 hover:text-fg-1"
            >
              {source.label}
            </a>
          ))}
        </div>
      </header>

      <div className="space-y-10">
        {book.parts.map((part, index) => (
          <section key={part.title} aria-labelledby={`part-${index}`}>
            <h2 id={`part-${index}`} className="mb-3 text-lg font-semibold">
              {part.title}
            </h2>
            <ol className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-layer-1">
              {part.chapters.map((chapter) => (
                <li key={chapter.id}>
                  <Link
                    href={`/system-design/${book.id}/${chapter.id}`}
                    className="flex gap-4 px-4 py-3 transition-colors hover:bg-layer-2"
                  >
                    <span className="w-6 shrink-0 pt-px text-right text-sm text-fg-3 tabular-nums">
                      {numbers.get(chapter.id)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium text-fg-1">{chapter.title}</span>
                      {chapter.lead && <span className="mt-0.5 line-clamp-2 block text-sm text-fg-2">{chapter.lead}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </article>
  );
}
