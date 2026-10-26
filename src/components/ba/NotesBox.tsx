"use client";

import { useEffect, useRef, useState } from "react";
import { NotebookPen } from "lucide-react";
import { saveNote, useBa, useHydrated } from "@/lib/ba-store";

/** Private notes for a chapter, saved to this browser shortly after typing stops. */
export function NotesBox({ chapter, placeholder }: Readonly<{ chapter: string; placeholder?: string }>) {
  const ba = useBa();
  const hydrated = useHydrated();
  const stored = ba.notes[chapter] ?? "";
  const [draft, setDraft] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const text = draft ?? stored;

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const change = (value: string) => {
    setDraft(value);
    setSaved(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      saveNote(chapter, value);
      setDraft(null);
      setSaved(true);
    }, 600);
  };

  return (
    <details className="group rounded-2xl border border-line bg-layer-1 shadow-card" open={!!stored || undefined}>
      <summary className="flex cursor-pointer items-center gap-2 px-5 py-4 font-medium">
        <NotebookPen size={17} className="text-fg-3" /> My notes
        <span className="ml-auto text-xs font-normal text-fg-3">{saved ? "Saved" : "Private to this browser"}</span>
      </summary>
      <div className="px-5 pb-5">
        <label htmlFor={`notes-${chapter}`} className="sr-only">My notes for this chapter</label>
        <textarea
          id={`notes-${chapter}`}
          value={text}
          disabled={!hydrated}
          onChange={(e) => change(e.target.value)}
          onBlur={() => {
            if (draft !== null) {
              if (timer.current) clearTimeout(timer.current);
              saveNote(chapter, draft);
              setDraft(null);
              setSaved(true);
            }
          }}
          rows={6}
          maxLength={20000}
          placeholder={placeholder ?? "Write key points in your own words, or an example from your own work…"}
          className="w-full resize-y rounded-xl border border-line bg-layer-2 px-3.5 py-3 text-[15px] leading-relaxed outline-none placeholder:text-fg-3 focus:border-blue"
        />
      </div>
    </details>
  );
}
