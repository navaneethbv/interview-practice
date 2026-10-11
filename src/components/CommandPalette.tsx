"use client";

import { BookOpen, Code2, FileText, GraduationCap, LayoutList, Search, Compass } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import type { SearchEntry } from "@/lib/catalog";
import { search } from "@/lib/search";

const KIND: Record<SearchEntry["k"], { label: string; icon: React.ReactNode }> = {
  page: { label: "Page", icon: <Compass size={15} /> },
  list: { label: "List", icon: <LayoutList size={15} /> },
  problem: { label: "Problem", icon: <Code2 size={15} /> },
  book: { label: "Guide", icon: <BookOpen size={15} /> },
  lesson: { label: "Lesson", icon: <GraduationCap size={15} /> },
  chapter: { label: "Chapter", icon: <FileText size={15} /> },
};

let indexPromise: Promise<SearchEntry[]> | null = null;
function loadIndex() {
  indexPromise ??= fetch("/search-index.json")
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => {
      indexPromise = null;
      return [];
    });
  return indexPromise;
}

/** Header search button that opens a site-wide jump-to dialog; also opens with Ctrl+K / ⌘K or "/". */
export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        onMouseEnter={loadIndex}
        onFocus={loadIndex}
        aria-label="Search"
        className="flex h-8 items-center gap-2 rounded-lg border border-line bg-layer-2 px-2 text-sm text-fg-3 transition-colors hover:border-line-strong hover:text-fg-2 sm:w-56 sm:px-2.5"
      >
        <Search size={15} />
        <span className="hidden sm:inline">Search…</span>
        <kbd className="ml-auto hidden rounded border border-line bg-layer-1 px-1.5 font-sans text-[11px] text-fg-3 sm:inline">Ctrl K</kbd>
      </button>
      {open && <PaletteDialog onClose={() => setOpen(false)} />}
    </>
  );
}

function PaletteDialog({ onClose }: Readonly<{ onClose: () => void }>) {
  const router = useRouter();
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const deferred = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreRef = useRef<Element | null>(null);

  useEffect(() => {
    restoreRef.current = document.activeElement;
    inputRef.current?.focus();
    let live = true;
    loadIndex().then((entries) => live && setIndex(entries));
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      live = false;
      document.body.style.overflow = overflow;
      if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus();
    };
  }, []);

  const results = useMemo(() => (index ? search(index, deferred) : []), [index, deferred]);
  const current = Math.min(active, Math.max(results.length - 1, 0));

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${current}"]`)?.scrollIntoView({ block: "nearest" });
  }, [current]);

  const go = useCallback(
    (entry: SearchEntry | undefined) => {
      if (!entry) return;
      onClose();
      router.push(entry.h);
    },
    [onClose, router],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") setActive((current + 1) % Math.max(results.length, 1));
    else if (e.key === "ArrowUp") setActive((current - 1 + results.length) % Math.max(results.length, 1));
    else if (e.key === "Enter") go(results[current]);
    else return;
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-[2px]" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-layer-1 shadow-overlay"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={17} className="shrink-0 text-fg-3" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search problems, lists and guides"
            aria-label="Search the site"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-activedescendant={results.length ? `palette-${current}` : undefined}
            className="h-13 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-fg-3 focus-visible:outline-none"
          />
          <kbd className="rounded border border-line px-1.5 text-[11px] text-fg-3">Esc</kbd>
        </div>
        <ul ref={listRef} id="palette-results" role="listbox" aria-label="Results" className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
          {index === null && <li className="px-3 py-6 text-center text-sm text-fg-3">Loading…</li>}
          {index !== null && !results.length && <li className="px-3 py-6 text-center text-sm text-fg-3">No matches for “{query}”</li>}
          {results.map((r, i) => (
            <li
              key={`${r.k}:${r.h}`}
              id={`palette-${i}`}
              data-index={i}
              role="option"
              aria-selected={i === current}
              onMouseMove={() => setActive(i)}
              onClick={() => go(r)}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm ${i === current ? "bg-layer-2" : ""}`}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-layer-2 text-fg-2">{KIND[r.k].icon}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-fg-1">{r.t}</span>
                {r.s && <span className="block truncate text-xs text-fg-3 capitalize">{r.s}</span>}
              </span>
              <span className="shrink-0 text-xs text-fg-3">{KIND[r.k].label}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 border-t border-line px-4 py-2 text-xs text-fg-3">
          <span>↑↓ to move</span>
          <span>Enter to open</span>
          <span className="ml-auto">{index ? `${index.length.toLocaleString()} entries` : ""}</span>
        </div>
      </div>
    </div>
  );
}
