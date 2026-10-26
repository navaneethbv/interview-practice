"use client";
import Link from "next/link";
import { useState } from "react";
import { bookmarks, mistakes, useLocalDay } from "@/lib/learning-store";
import { isMistake, type Mistake } from "@/lib/learning-data";
const field =
  "mt-1 w-full rounded-lg border border-line bg-layer-1 px-3 py-2 text-sm";
export function Notebook({
  initialQuestion = "",
  initialHref = "",
}: Readonly<{
  initialQuestion?: string;
  initialHref?: string;
}>) {
  const saved = bookmarks.use();
  const notes = mistakes.use();
  const today = useLocalDay();
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [showResolved, setShowResolved] = useState(false);
  function submit(data: FormData) {
    const id = editing ?? crypto.randomUUID();
    const field = (name: string): string => {
      const value = data.get(name);
      return typeof value === "string" ? value : "";
    };
    const note = {
      id,
      question: field("question").trim(),
      href: field("href").trim(),
      mistaken: field("mistaken"),
      corrected: field("corrected"),
      dueDate: field("dueDate"),
      resolved: notes.find((mistake) => mistake.id === id)?.resolved ?? false,
    };
    if (!isMistake(note)) {
      setError(
        "Enter a question, a valid review date, and an optional internal site link beginning with /.",
      );
      return;
    }
    if (!editing && notes.length >= 2000) {
      setError("Your notebook is full. Remove an old entry before adding one.");
      return;
    }
    mistakes.write(
      editing
        ? notes.map((mistake) => (mistake.id === id ? note : mistake))
        : [...notes, note],
    );
    setEditing(null);
    setError("");
  }
  const current = notes.find((m) => m.id === editing);
  return (
    <>
      <section className="rounded-2xl border border-line bg-layer-1 p-5">
        <h2 className="text-xl font-semibold">Bookmarks</h2>
        {saved.length === 0 ? (
          <p className="mt-3 text-sm text-fg-2">
            Use Save on a problem, lesson or daily task to keep it here.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-line">
            {saved.map((b) => (
              <li
                className="flex items-center justify-between gap-3 py-3"
                key={b.href}
              >
                <div>
                  <Link href={b.href} className="font-medium hover:text-brand">
                    {b.title}
                  </Link>
                  <p className="text-xs text-fg-3">{b.section}</p>
                </div>
                <button
                  type="button"
                  className="text-sm text-fg-2 hover:text-red"
                  onClick={() =>
                    bookmarks.write(saved.filter((x) => x.href !== b.href))
                  }
                  aria-label={`Remove bookmark ${b.title}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="rounded-2xl border border-line bg-layer-1 p-5">
        <h2 className="text-xl font-semibold">
          {editing ? "Edit mistake" : "Capture a mistake"}
        </h2>
        <form
          key={`${editing ?? "new"}:${notes.length}`}
          action={submit}
          className="mt-4 space-y-3"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span>Question or topic</span>
              <input
                name="question"
                required
                maxLength={1000}
                defaultValue={current?.question ?? initialQuestion}
                className={field}
              />
            </label>
            <label className="text-sm">
              <span>Internal link (optional)</span>
              <input
                name="href"
                maxLength={1000}
                placeholder="/problems/…"
                defaultValue={current?.href ?? initialHref}
                className={field}
              />
            </label>
          </div>
          <label className="block text-sm">
            <span>My mistaken reasoning</span>
            <textarea
              name="mistaken"
              maxLength={5000}
              rows={3}
              defaultValue={current?.mistaken}
              className={field}
            />
          </label>
          <label className="block text-sm">
            <span>Corrected reasoning / what to try next</span>
            <textarea
              name="corrected"
              maxLength={5000}
              rows={3}
              defaultValue={current?.corrected}
              className={field}
            />
          </label>
          <label className="block max-w-xs text-sm">
            <span>Review due date</span>
            <input
              name="dueDate"
              type="date"
              required
              defaultValue={current?.dueDate ?? today}
              className={field}
            />
          </label>
          <div className="flex gap-3">
            <button
              className="rounded-lg bg-fg-1 px-4 py-2 text-sm text-layer-1"
              type="submit"
            >
              {editing ? "Save changes" : "Add mistake"}
            </button>
            {editing && (
              <button
                type="button"
                className="text-sm text-fg-2"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            )}
          </div>
          <output className="block text-sm text-red">{error}</output>
        </form>
      </section>
      <section>
        <div className="flex flex-wrap justify-between gap-3">
          <h2 className="text-xl font-semibold">Mistake notebook</h2>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showResolved}
              onChange={(e) => setShowResolved(e.target.checked)}
            />
            <span>Show resolved</span>
          </label>
        </div>
        {notes.filter((m) => showResolved || !m.resolved).length === 0 && (
          <p className="mt-3 text-sm text-fg-2">
            No {showResolved ? "" : "unresolved "}mistakes saved.
          </p>
        )}
        <div className="mt-4 space-y-3">
          {notes
            .filter((m) => showResolved || !m.resolved)
            .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
            .map((m) => (
              <MistakeCard
                key={m.id}
                note={m}
                due={!!today && m.dueDate <= today && !m.resolved}
                onEdit={() => setEditing(m.id)}
                onResolve={() =>
                  mistakes.write(
                    notes.map((x) =>
                      x.id === m.id ? { ...x, resolved: !x.resolved } : x,
                    ),
                  )
                }
                onDelete={() => {
                  mistakes.write(notes.filter((x) => x.id !== m.id));
                  if (editing === m.id) setEditing(null);
                }}
              />
            ))}
        </div>
      </section>
    </>
  );
}
function MistakeCard({
  note: m,
  due,
  onEdit,
  onResolve,
  onDelete,
}: Readonly<{
  note: Mistake;
  due: boolean;
  onEdit: () => void;
  onResolve: () => void;
  onDelete: () => void;
}>) {
  return (
    <article className="rounded-xl border border-line bg-layer-1 p-5">
      <div className="flex flex-wrap justify-between gap-2">
        <h3 className="font-semibold">
          {m.href ? (
            <Link href={m.href} className="hover:text-brand">
              {m.question}
            </Link>
          ) : (
            m.question
          )}
        </h3>
        <span className={`text-xs ${due ? "text-red" : "text-fg-3"}`}>
          {mistakeReviewLabel(m.resolved, due)} · {m.dueDate}
        </span>
      </div>
      <dl className="mt-3 space-y-3 text-sm">
        <div>
          <dt className="text-fg-3">Mistaken reasoning</dt>
          <dd className="mt-1 whitespace-pre-wrap break-words">
            {m.mistaken || "No reasoning recorded."}
          </dd>
        </div>
        <div>
          <dt className="text-fg-3">Corrected reasoning</dt>
          <dd className="mt-1 whitespace-pre-wrap break-words">
            {m.corrected || "Add your correction after reviewing."}
          </dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-brand">
        <button type="button" onClick={onEdit}>
          Edit / reschedule
        </button>
        <button type="button" onClick={onResolve}>
          {m.resolved ? "Reopen" : "Mark resolved"}
        </button>
        <button type="button" className="text-fg-3" onClick={onDelete}>
          Delete
        </button>
      </div>
    </article>
  );
}

function mistakeReviewLabel(resolved: boolean, due: boolean): string {
  if (resolved) return "Resolved";
  if (due) return "Review due";
  return "Review";
}
