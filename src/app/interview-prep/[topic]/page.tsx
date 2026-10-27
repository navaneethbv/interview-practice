import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import { QuestionBank } from "@/components/interview-prep/QuestionBank";
import {
  PREP_TOPICS,
  prepTopic,
  chaptersFor,
  questionsFor,
} from "@/lib/technical-prep";
type Props = Readonly<{ params: Promise<{ topic: string }> }>;
export function generateStaticParams() {
  return PREP_TOPICS.map((t) => ({ topic: t.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: prepTopic((await params).topic)?.title ?? "Interview prep" };
}
export default async function TopicPage({ params }: Props) {
  const topic = prepTopic((await params).topic);
  if (!topic) notFound();
  return (
    <>
      <NavBar />
      <PageHeader
        crumbs={[{ href: "/interview-prep", label: "Interview Prep" }]}
        eyebrow="Theory then practice"
        title={topic.title}
      >
        {topic.description}
      </PageHeader>
      <main className="mx-auto max-w-5xl space-y-10 px-4 py-8">
        <nav
          aria-label="Interview prep topics"
          className="flex flex-wrap gap-2"
        >
          {PREP_TOPICS.map((t) => (
            <Link
              key={t.id}
              aria-current={t.id === topic.id ? "page" : undefined}
              href={`/interview-prep/${t.id}`}
              className={`rounded-lg border border-line px-3 py-2 text-sm ${t.id === topic.id ? "bg-brand-soft text-brand" : "bg-layer-1 text-fg-2"}`}
            >
              {t.title}
            </Link>
          ))}
        </nav>
        <section>
          <h2 className="text-2xl font-semibold">Theory chapters</h2>
          <p className="mt-2 text-fg-2">Prerequisites: {topic.prerequisite}</p>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {chaptersFor(topic.id).map((ch, i) => (
              <li
                key={ch.id}
                className="rounded-xl border border-line bg-layer-1 p-5"
              >
                <span className="text-xs text-fg-3">Chapter {i + 1}</span>
                <Link
                  href={`/interview-prep/${topic.id}/${ch.id}`}
                  className="mt-1 block text-lg font-medium text-brand hover:underline"
                >
                  {ch.title}
                </Link>
                <p className="mt-2 text-sm text-fg-2">{ch.goal}</p>
              </li>
            ))}
          </ol>
        </section>
        <QuestionBank questions={questionsFor(topic.id)} />
        <section className="rounded-xl border border-line p-5">
          <h2 className="font-semibold">Reference documentation</h2>
          <ul className="mt-3 space-y-2">
            {topic.sources.map((s) => (
              <li key={s.url}>
                <a
                  className="text-brand underline"
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
