import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { BookNav } from "@/components/design/BookNav";
import { getDesignBook, listDesignBooks } from "@/lib/content";

export function generateStaticParams() {
  return listDesignBooks().map((b) => ({ book: b.id }));
}

export const dynamicParams = false;

type LayoutProps = Readonly<{ children: React.ReactNode; params: Promise<{ book: string }> }>;

/** The reader shell: the book's contents stay on the left while chapters change on the right. */
export default async function BookLayout({ children, params }: LayoutProps) {
  const book = getDesignBook((await params).book);
  if (!book) notFound();
  const nav = {
    id: book.id,
    parts: book.parts.map((p) => ({ title: p.title, chapters: p.chapters.map(({ id, title }) => ({ id, title })) })),
  };
  const books = listDesignBooks().map(({ id, short }) => ({ id, short }));

  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-[88rem] px-4 pt-6 pb-16 lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-10 lg:pt-8">
        <BookNav book={nav} books={books} />
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
