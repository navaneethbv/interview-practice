"use client";
import { useState, useSyncExternalStore } from "react";
import type { PrepQuestion } from "@/lib/technical-prep";
import { filterPrepQuestions } from "@/lib/prep-filter";
import { ComplexityNote } from "./ComplexityNote";
const subscribeReady = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function QuestionBank({
  questions,
}: Readonly<{ questions: readonly PrepQuestion[] }>) {
  const ready = useSyncExternalStore(subscribeReady, clientReady, serverReady);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All");
  const matches = filterPrepQuestions(questions, query, level);
  return (
    <section aria-labelledby="question-bank">
      <h2 id="question-bank" className="text-2xl font-semibold">
        Interview questions
      </h2>
      <p className="mt-2 text-fg-2">
        Try answering aloud before opening an answer. Reading an answer is
        exposure, not proof of independent mastery. Save reflections in your
        mistake notebook.
      </p>
      <div className="my-5 flex flex-wrap gap-3">
        <label className="min-w-0 flex-1 text-sm">
          <span>Search questions and answers</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            disabled={!ready}
            className="mt-1 block w-full rounded-lg border border-line bg-layer-1 p-3"
          />
        </label>
        <label className="text-sm">
          <span id="prep-difficulty-label">Difficulty</span>
          <select
            disabled={!ready}
            aria-labelledby="prep-difficulty-label"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mt-1 block rounded-lg border border-line bg-layer-1 p-3"
          >
            {["All", "Beginner", "Intermediate", "Advanced"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <output aria-label="Question results" className="mb-4 block text-sm text-fg-3">
        {matches.length} of {questions.length} questions
      </output>
      {!matches.length && (
        <p className="rounded-xl border border-line p-5">
          No questions match. Try a broader search or another difficulty.
        </p>
      )}
      <div className="space-y-4">
        {matches.map((q) => (
          <article
            id={q.id}
            key={q.id}
            className="scroll-mt-20 rounded-2xl border border-line bg-layer-1 p-4 sm:p-6"
          >
            <p className="text-xs font-medium text-brand">{q.level}</p>
            <h3 className="mt-1 text-lg font-semibold">
              <a href={`#${q.id}`} className="hover:underline">
                {q.title}
              </a>
            </h3>
            <details className="mt-4">
              <summary className="cursor-pointer py-2 font-medium text-brand">
                Reveal answer and example
              </summary>
              <div className="space-y-3 leading-7 text-fg-2">
                <p>{q.answer}</p>
                <p>
                  <strong className="text-fg-1">Example: </strong>
                  {q.example}
                </p>
                {q.complexity && <ComplexityNote value={q.complexity} />}
                {!q.complexity && (
                  <p className="text-sm">
                    Big O is not intrinsic to this conceptual question. Define
                    the implementation, input size and operation before
                    assigning a complexity.
                  </p>
                )}
                <p>
                  <strong className="text-fg-1">Common mistake: </strong>
                  {q.pitfall}
                </p>
                <p>
                  <strong className="text-fg-1">Follow-up: </strong>
                  {q.followUp}
                </p>
              </div>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
