import type { Metadata } from "next";
import Link from "next/link";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import {
  PREP_TOPICS,
  prepChapters,
  prepQuestions,
  chaptersFor,
  questionsFor,
  COMPLEXITY_REFERENCE,
} from "@/lib/technical-prep";
export const metadata: Metadata = { title: "Technical interview prep" };
export default function TechnicalPrepPage() {
  return (
    <>
      <NavBar />
      <PageHeader
        eyebrow="Learn, explain, practice"
        title="Technical interview prep"
      >
        Start from first principles and build toward senior-level reasoning:{" "}
        {prepChapters.length} theory chapters and {prepQuestions.length}{" "}
        interview questions across five tracks.
      </PageHeader>
      <main className="mx-auto max-w-6xl space-y-12 px-4 py-8">
        <section aria-labelledby="contents">
          <h2 id="contents" className="mb-4 text-2xl font-semibold">
            Course contents
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {PREP_TOPICS.map((topic) => (
              <article
                key={topic.id}
                className="rounded-2xl border border-line bg-layer-1 p-5"
              >
                <h3 className="text-xl font-semibold">
                  <Link
                    className="text-brand hover:underline"
                    href={`/interview-prep/${topic.id}`}
                  >
                    {topic.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-fg-2">{topic.description}</p>
                <p className="mt-3 text-xs text-fg-3">
                  Before starting: {topic.prerequisite}
                </p>
                <ol className="mt-4 list-inside list-decimal space-y-2 text-sm">
                  {chaptersFor(topic.id).map((ch) => (
                    <li key={ch.id}>
                      <Link
                        className="hover:text-brand hover:underline"
                        href={`/interview-prep/${topic.id}/${ch.id}`}
                      >
                        {ch.title}
                      </Link>
                    </li>
                  ))}
                </ol>
                <Link
                  className="mt-4 inline-block text-sm text-brand underline"
                  href={`/interview-prep/${topic.id}#question-bank`}
                >
                  {questionsFor(topic.id).length} questions: beginner → advanced
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section
          id="study-schedule"
          className="scroll-mt-20 rounded-2xl border border-line bg-layer-1 p-5 sm:p-7"
        >
          <h2 className="text-2xl font-semibold">
            {prepChapters.length}-session study schedule
          </h2>
          <p className="mt-3 leading-7 text-fg-2">
            Plan 60–90 minutes per session: 25–35 minutes reading, 15–20 minutes
            tracing or writing the example, 10–15 minutes attempting the
            exercise, then 10–20 minutes answering three or four questions from
            that track. Repeat a session when you cannot explain it
            independently. Absolute beginners can split each session across two
            days; the schedule is a suggestion, not a completion guarantee.
          </p>
          <p className="mt-3 text-sm text-fg-2">
            Before session 1, learn Java variables, conditionals, loops and
            method syntax. Java chapters 1–2 can also be read first if the
            examples are unfamiliar. After each five-session track, attempt its
            remaining questions and revisit mistakes.
          </p>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2">
            {prepChapters.map((ch, index) => (
              <li
                key={`${ch.topic}-${ch.id}`}
                className="rounded-lg border border-line p-3 text-sm"
              >
                <span className="text-fg-3">
                  Session {index + 1} ·{" "}
                  {PREP_TOPICS.find((t) => t.id === ch.topic)?.title}
                </span>
                <Link
                  href={`/interview-prep/${ch.topic}/${ch.id}`}
                  className="mt-1 block font-medium hover:text-brand"
                >
                  {ch.title}
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <section id="big-o" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold">Big O quick reference</h2>
          <p className="my-3 text-fg-2">
            Define n, separate time from space, and name worst-case, expected or
            amortized assumptions. Output storage and recursion count too.
            Database and network latency require an additional cost model.
          </p>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Complexity growth and assumptions
              </caption>
              <thead className="bg-layer-2">
                <tr>
                  {["Growth", "Example", "Meaning"].map((h) => (
                    <th key={h} scope="col" className="p-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPLEXITY_REFERENCE.map(([growth, example, note]) => (
                  <tr key={growth} className="border-t border-line">
                    <th
                      scope="row"
                      className="whitespace-nowrap p-3 font-mono text-brand"
                    >
                      {growth}
                    </th>
                    <td className="p-3">{example}</td>
                    <td className="min-w-52 p-3 text-fg-2">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            href="/interview-prep/algorithms/complexity"
            className="mt-3 inline-block text-brand underline"
          >
            Read the full complexity chapter
          </Link>
        </section>
        <p className="text-sm text-fg-3">
          Examples use Java 21-era language and Spring Boot 3.5 concepts unless
          noted. JDK 24 virtual-thread changes and Boot release differences are
          called out explicitly. These are authored study materials, not claims
          of recently asked company questions. Each track links its reference
          documentation.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
