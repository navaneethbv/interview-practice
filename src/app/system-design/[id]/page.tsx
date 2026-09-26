import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { LessonContent } from "@/components/LessonContent";
import { DesignPractice } from "@/components/DesignPractice";
import { getDesignArticle, listDesignArticles, renderBlocks } from "@/lib/content";

export function generateStaticParams() {
  return listDesignArticles().map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  return { title: getDesignArticle((await params).id)?.title ?? "System Design" };
}

export default async function DesignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = getDesignArticle(id);
  if (!article) notFound();
  const [prompt, reference] = await Promise.all([renderBlocks(article.prompt), renderBlocks(article.reference)]);

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-4 text-sm text-fg-3" aria-label="Breadcrumb">
          <Link href="/system-design" className="hover:text-fg-1">
            System Design
          </Link>
          <span className="mx-1.5">/</span>
          <span>{article.title}</span>
        </nav>
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="min-w-0 rounded-2xl border border-line bg-layer-1 px-5 py-7 sm:px-8">
            <h1 className="mb-6 text-2xl font-semibold tracking-tight">{article.title}</h1>
            <LessonContent blocks={prompt} />
          </article>
          <DesignPractice id={article.id} reference={reference.length ? <LessonContent blocks={reference} /> : null} />
        </div>
      </main>
    </>
  );
}
