"use client";

import Link from "next/link";
import {
  BookOpenText,
  ChevronLeft,
  ChevronRight,
  CloudUpload,
  Code2,
  FlaskConical,
  History,
  List,
  Minus,
  Play,
  Plus,
  RotateCcw,
  SquareTerminal,
  Terminal,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { CodeLang } from "@/lib/content-types";
import { compareNote } from "@/lib/judge/compare";
import { expectedFor, preloadPython, runCode } from "@/lib/judge/runner";
import type { AnyTestCase, ProblemSpec, RunOutcome } from "@/lib/judge/types";
import {
  addSubmission,
  loadRecovery,
  resetCode,
  restoreCode,
  loadCode,
  loadPrefs,
  loadSubmissions,
  recordSubmission,
  saveCode,
  savePrefs,
  totalOf,
  useProgress,
  type Submission,
} from "@/lib/progress";
import { AccessibleTab } from "../AccessibleTab";
import { PracticeVisit } from "../PracticeVisit";
import { downloadText } from "@/lib/download";
import { usePendingWrites } from "@/lib/storage";
import { ThemeToggle } from "../ThemeProvider";
import { CodeEditor } from "./CodeEditor";
import { ResultPanel, TestcaseEditor, type ResultView } from "./Console";
import { fieldNames, inputFields, isPristine, parseCase, toEditable, type EditableCase } from "./cases";

type LeftTab = "description" | "solution" | "submissions";
type ConsoleTab = "testcase" | "result";

const LANG_LABEL: Record<CodeLang, string> = { python: "Python3", java: "Java", sql: "SQLite" };

interface Props {
  id: string;
  title: string;
  spec: ProblemSpec | null;
  reference: string | null;
  starters: Partial<Record<CodeLang, string>>;
  /** Links for the header; list problems replace them with their list's order when opened with ?set=. */
  nav: WorkspaceNav;
  /** Set for list problems so the header can follow the list given in ?set=. */
  listSlug?: string;
  description: React.ReactNode;
  solution: React.ReactNode;
}

export interface WorkspaceNav {
  list: string;
  prev: string | null;
  next: string | null;
}

const SET_ID = /^[a-z0-9-]+$/;

/** Previous/next links within the problem list named in the page's ?set= parameter. */
function useListNav(initial: WorkspaceNav, slug: string | undefined): WorkspaceNav {
  const [nav, setNav] = useState(initial);
  useEffect(() => {
    const set = new URLSearchParams(window.location.search).get("set");
    if (!slug || !set || !SET_ID.test(set)) return;
    let cancelled = false;
    fetch(`/problems/sets/${set}/order`)
      .then((r) => (r.ok ? (r.json() as Promise<{ slugs: string[] }>) : null))
      .then((data) => {
        if (cancelled || !data) return;
        const i = data.slugs.indexOf(slug);
        const href = (s: string) => `/problems/lc/${s}?set=${set}`;
        setNav({
          list: `/problems/sets/${set}`,
          prev: i > 0 ? href(data.slugs[i - 1]) : null,
          next: i >= 0 && i < data.slugs.length - 1 ? href(data.slugs[i + 1]) : null,
        });
      })
      .catch(() => {
        // Keep the default links when the list order can't be loaded.
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);
  return nav;
}

const subscribeNoop = () => () => {};
const DESKTOP = "(min-width: 1024px)";
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(DESKTOP);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(DESKTOP).matches,
    () => true,
  );
}

/** A draggable split that stores the divider position as a fraction of its container. */
function useSplit(initial: number, axis: "x" | "y", min: number, max: number) {
  const [frac, setFrac] = useState(initial);
  const container = useRef<HTMLDivElement>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const el = container.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const move = (ev: PointerEvent) => {
      const f = axis === "x" ? (ev.clientX - rect.left) / rect.width : (ev.clientY - rect.top) / rect.height;
      setFrac(Math.min(max, Math.max(min, f)));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = axis === "x" ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    const dec = axis === "x" ? "ArrowLeft" : "ArrowUp";
    const inc = axis === "x" ? "ArrowRight" : "ArrowDown";
    if (e.key === dec) setFrac((f) => Math.max(min, f - 0.03));
    if (e.key === inc) setFrac((f) => Math.min(max, f + 0.03));
  };
  return [frac, container, { onPointerDown, onKeyDown }] as const;
}

function Handle({
  axis,
  label,
  onPointerDown,
  onKeyDown,
}: Readonly<{
  axis: "x" | "y";
  label: string;
  onPointerDown: (e: React.PointerEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}>) {
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      className={`group flex shrink-0 touch-none items-center justify-center outline-none ${
        axis === "x" ? "w-2 cursor-col-resize" : "h-2 cursor-row-resize"
      }`}
    >
      <span
        className={`rounded-full bg-line-strong transition-colors group-hover:bg-blue group-focus-visible:bg-blue ${
          axis === "x" ? "h-8 w-0.5" : "h-0.5 w-8"
        }`}
      />
    </button>
  );
}

function PanelTab({
  active,
  id,
  panelId,
  onClick,
  icon,
  children,
}: Readonly<{
  active: boolean;
  id: string;
  panelId: string;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <AccessibleTab
      id={id}
      panelId={panelId}
      selected={active}
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm transition-colors ${
        active ? "font-medium text-fg-1" : "text-fg-3 hover:bg-layer-2 hover:text-fg-1"
      }`}
    >
      {icon}
      {children}
    </AccessibleTab>
  );
}

function errorOutcome(message: string): RunOutcome {
  return { verdict: "Internal Error", message, cases: [], passed: 0, total: 0 };
}

function updateEditableCase(cases: EditableCase[], caseIndex: number, fieldIndex: number, value: string) {
  return cases.map((testCase, index) =>
    index === caseIndex ? { ...testCase, fields: testCase.fields.map((field, fieldIndexInCase) => (fieldIndexInCase === fieldIndex ? value : field)) } : testCase,
  );
}

/**
 * The workspace restores code, language and history from localStorage, which only exists in
 * the browser, so it renders a static shell on the server and mounts after hydration.
 */
export function Workspace(props: Readonly<Props>) {
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (!hydrated) {
    return (
      <output className="flex h-dvh items-center justify-center bg-bg text-sm text-fg-3" aria-live="polite">
        Loading workspace…
      </output>
    );
  }
  return <WorkspaceInner {...props} />;
}

function WorkspaceInner({ id, title, spec, reference, starters, nav: initialNav, listSlug, description, solution }: Readonly<Props>) {
  const isDesktop = useIsDesktop();
  const nav = useListNav(initialNav, listSlug);
  const [prefs] = useState(loadPrefs);
  const languages: CodeLang[] = spec?.kind === "sql" ? ["sql"] : ["python", "java"];
  const initialLang = languages.includes(prefs.lang) ? prefs.lang : languages[0];
  const [leftTab, setLeftTab] = useState<LeftTab>("description");
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>("testcase");
  const [lang, setLang] = useState<CodeLang>(initialLang);
  const pendingWrites = usePendingWrites();
  const [recovery, setRecovery] = useState(() => loadRecovery(id, initialLang));
  const [resetError, setResetError] = useState("");
  const [fontSize, setFontSize] = useState(prefs.fontSize);
  const [code, setCode] = useState(() => loadCode(id, initialLang) ?? starters[initialLang] ?? "");
  const [cases, setCases] = useState<EditableCase[]>(() =>
    spec ? spec.tests.flatMap((t, i) => (t.sample ? [toEditable(spec, t, i)] : [])) : [],
  );
  const [activeCase, setActiveCase] = useState(0);
  const [activeResult, setActiveResult] = useState(0);
  const [result, setResult] = useState<ResultView | null>(null);
  const [running, setRunning] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>(() => loadSubmissions(id));

  const [colFrac, colRef, colHandle] = useSplit(0.45, "x", 0.25, 0.75);
  const [rowFrac, rowRef, rowHandle] = useSplit(0.62, "y", 0.2, 0.85);

  // Start loading the Python runtime in the background so the first Run is quick.
  useEffect(() => {
    if (lang === "python" || lang === "sql") preloadPython();
  }, [lang]);

  const onCodeChange = useCallback(
    (value: string) => {
      setCode(value);
      saveCode(id, lang, value);
    },
    [id, lang],
  );

  function switchLang(nextLang: CodeLang) {
    setLang(nextLang);
    setRecovery(loadRecovery(id, nextLang));
    setResetError("");
    savePrefs({ lang: nextLang });
    setCode(loadCode(id, nextLang) ?? starters[nextLang] ?? "");
  }

  function changeFont(delta: number) {
    const size = Math.min(22, Math.max(11, fontSize + delta));
    setFontSize(size);
    savePrefs({ fontSize: size });
  }

  function reset() {
    const starter = starters[lang] ?? "";
    if (code === starter) return;
    if (!window.confirm("Reset to starter code? Your current draft will be saved as a recovery copy.")) return;
    if (!resetCode(id, lang, code, starter)) {
      setResetError("Could not save a recovery copy. Your draft has not been reset. Download it or free browser storage first.");
      return;
    }
    setRecovery(code);
    setResetError("");
    setCode(starter);
  }

  const names = useMemo(() => (spec ? fieldNames(spec) : []), [spec]);
  const note = spec && spec.kind !== "design" ? compareNote(spec.compare) : undefined;

  const onCaseChange = useCallback((caseIndex: number, fieldIndex: number, value: string) => {
    setCases((current) => updateEditableCase(current, caseIndex, fieldIndex, value));
  }, []);
  const onCaseAdd = useCallback(() => {
    setCases((current) => [...current, { id: crypto.randomUUID(), fields: [...(current[activeCase]?.fields ?? names.map(() => ""))] }]);
    setActiveCase(cases.length);
  }, [activeCase, cases.length, names]);
  const onCaseRemove = useCallback((caseIndex: number) => {
    setCases((current) => current.filter((_, index) => index !== caseIndex));
    setActiveCase((current) => Math.max(0, current >= caseIndex ? current - 1 : current));
  }, []);

  const inputsFor = useCallback(
    (tests: AnyTestCase[]) =>
      spec ? tests.map((t) => inputFields(spec, t).map((value, i) => ({ name: names[i], value }))) : [],
    [spec, names],
  );

  const run = useCallback(async () => {
    if (!spec || running) return;
    setConsoleTab("result");
    const tests: AnyTestCase[] = [];
    for (const c of cases) {
      const parsed = parseCase(spec, c);
      if ("error" in parsed) {
        setResult({ mode: "run", tests: [], inputs: [], outcome: errorOutcome(parsed.error) });
        return;
      }
      const expected = isPristine(spec, c) ? spec.tests[c.from!].expected : undefined;
      tests.push({ input: parsed.input, expected } as AnyTestCase);
    }
    try {
      const custom = tests.map((t, i) => ({ t, i })).filter(({ t }) => t.expected === undefined);
      if (custom.length) {
        if (!reference) throw new Error("No reference solution is available to check custom test cases.");
        setRunning("Computing expected output…");
        const exp = await expectedFor(spec, reference, custom.map(({ t }) => t));
        const bad = exp.find((e) => e.error);
        if (bad) throw new Error(bad.error);
        custom.forEach(({ i }, k) => (tests[i].expected = exp[k].output));
      }
      setRunning(lang === "java" ? "Compiling and running…" : "Running…");
      const outcome = await runCode(spec, lang, code, tests);
      setActiveResult(0);
      setResult({ mode: "run", outcome, tests, inputs: inputsFor(tests), note });
    } catch (e) {
      setResult({ mode: "run", tests: [], inputs: [], outcome: errorOutcome((e as Error).message) });
    } finally {
      setRunning(null);
    }
  }, [spec, running, cases, reference, lang, code, note, inputsFor]);

  const submit = useCallback(async () => {
    if (!spec || running) return;
    setConsoleTab("result");
    setRunning(lang === "java" ? "Judging: compiling and running all tests…" : "Judging all tests…");
    try {
      const tests = spec.tests as AnyTestCase[];
      const outcome = await runCode(spec, lang, code, tests);
      setActiveResult(outcome.cases.find((c) => !c.passed)?.index ?? 0);
      setResult({ mode: "submit", outcome, tests, inputs: inputsFor(tests), note });
      if (outcome.verdict !== "Internal Error") {
        const sub: Submission = {
          at: Date.now(),
          lang,
          verdict: outcome.verdict,
          passed: outcome.passed,
          total: outcome.total,
          runtimeMs: outcome.runtimeMs,
          code,
        };
        addSubmission(id, sub);
        setSubmissions((s) => [sub, ...s].slice(0, 30));
        recordSubmission(id, outcome.verdict === "Accepted");
      }
    } catch (e) {
      setResult({ mode: "submit", tests: [], inputs: [], outcome: errorOutcome((e as Error).message) });
    } finally {
      setRunning(null);
    }
  }, [spec, running, lang, code, id, note, inputsFor]);

  const left = (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-line bg-layer-1" aria-label="Problem">
      <div className="flex shrink-0 items-center gap-1 border-b border-line px-2 py-1.5" role="tablist" aria-label="Problem panels">
        <PanelTab
          id="workspace-description-tab"
          panelId="workspace-description-panel"
          active={leftTab === "description"}
          onClick={() => setLeftTab("description")}
          icon={<BookOpenText size={15} className="text-blue" />}
        >
          Description
        </PanelTab>
        <PanelTab
          id="workspace-solution-tab"
          panelId="workspace-solution-panel"
          active={leftTab === "solution"}
          onClick={() => setLeftTab("solution")}
          icon={<FlaskConical size={15} className="text-medium" />}
        >
          Solution
        </PanelTab>
        <PanelTab
          id="workspace-submissions-tab"
          panelId="workspace-submissions-panel"
          active={leftTab === "submissions"}
          onClick={() => setLeftTab("submissions")}
          icon={<History size={15} className="text-ok" />}
        >
          Submissions
        </PanelTab>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <div id="workspace-description-panel" role="tabpanel" aria-labelledby="workspace-description-tab" tabIndex={0} hidden={leftTab !== "description"}>{description}</div>
        <div id="workspace-solution-panel" role="tabpanel" aria-labelledby="workspace-solution-tab" tabIndex={0} hidden={leftTab !== "solution"}>
          <p className="mb-5 rounded-lg bg-brand-soft px-3 py-2 text-sm text-fg-2">
            Spoiler: this is the full walkthrough. Give the problem a real try first.
          </p>
          {solution}
        </div>
        <div id="workspace-submissions-panel" role="tabpanel" aria-labelledby="workspace-submissions-tab" tabIndex={0} hidden={leftTab !== "submissions"}>
          <SubmissionList
            id={id}
            submissions={submissions}
            onLoad={(s) => {
              setLang(s.lang);
              setCode(s.code);
              setRecovery(loadRecovery(id, s.lang));
              saveCode(id, s.lang, s.code);
            }}
          />
        </div>
      </div>
    </section>
  );

  const editorPanel = (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-line bg-layer-1" aria-label="Code editor">
      <div className="flex shrink-0 items-center gap-2 border-b border-line px-2 py-1.5">
        <span className="flex items-center gap-1.5 px-1.5 text-sm font-medium">
          <Code2 size={15} className="text-ok" /> Code
        </span>
        <label className="ml-1">
          <span className="sr-only">Language</span>
          <select
            value={lang}
            onChange={(e) => switchLang(e.target.value as CodeLang)}
            className="h-7 rounded-md border-0 bg-transparent px-1.5 text-sm text-fg-2 outline-none hover:bg-layer-2"
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                {LANG_LABEL[l]}
              </option>
            ))}
          </select>
        </label>
        <div className="ml-auto flex items-center gap-0.5 text-fg-3">
          <button
            onClick={() => changeFont(-1)}
            className="grid size-7 place-items-center rounded-md hover:bg-layer-2 hover:text-fg-1"
            aria-label="Decrease font size"
            title="Smaller font"
          >
            <Minus size={14} />
          </button>
          <span className="w-6 text-center text-xs tabular-nums">{fontSize}</span>
          <button
            onClick={() => changeFont(1)}
            className="grid size-7 place-items-center rounded-md hover:bg-layer-2 hover:text-fg-1"
            aria-label="Increase font size"
            title="Larger font"
          >
            <Plus size={14} />
          </button>
          <button
            onClick={reset}
            className="ml-1 grid size-7 place-items-center rounded-md hover:bg-layer-2 hover:text-fg-1"
            aria-label="Reset to starter code"
            title="Reset to starter code"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line px-3 py-1 text-xs text-fg-2">
        <output>{pendingWrites ? "Changes are not saved to this browser" : "Draft saves automatically"}</output>
        <button className="text-blue hover:underline" onClick={() => downloadText(`${id.replaceAll(":", "-")}.${lang === "python" ? "py" : lang}`, code)}>Download code</button>
        {recovery !== null && <button className="text-blue hover:underline" onClick={() => {
          if (code !== (starters[lang] ?? "") && !window.confirm("Replace this draft with the version saved before reset? Download your current draft first if you want to keep it.")) return;
          restoreCode(id, lang, recovery);
          setCode(recovery);
          setRecovery(loadRecovery(id, lang));
        }}>Restore pre-reset draft</button>}
      </div>
      {resetError && <p role="alert" className="px-3 py-2 text-sm text-bad">{resetError}</p>}
      <div className="min-h-0 flex-1">
        <CodeEditor value={code} lang={lang} fontSize={fontSize} onChange={onCodeChange} onRun={run} onSubmit={submit} />
      </div>
    </section>
  );

  const consolePanel = (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-line bg-layer-1" aria-label="Console">
      <div className="flex shrink-0 items-center gap-1 border-b border-line px-2 py-1.5" role="tablist" aria-label="Console panels">
        <PanelTab
          id="workspace-testcase-tab"
          panelId="workspace-console-panel"
          active={consoleTab === "testcase"}
          onClick={() => setConsoleTab("testcase")}
          icon={<SquareTerminal size={15} className="text-ok" />}
        >
          Testcase
        </PanelTab>
        <PanelTab
          id="workspace-result-tab"
          panelId="workspace-console-panel"
          active={consoleTab === "result"}
          onClick={() => setConsoleTab("result")}
          icon={<Terminal size={15} className="text-ok" />}
        >
          Test Result
        </PanelTab>
      </div>
      <div id="workspace-console-panel" role="tabpanel" aria-labelledby={`workspace-${consoleTab}-tab`} tabIndex={0} className="min-h-0 flex-1 overflow-y-auto">
        {(() => {
          if (!spec) return <p className="p-4 text-sm text-fg-3">Test cases for this problem are not available yet.</p>;
          if (consoleTab === "testcase") return <TestcaseEditor
            names={names}
            cases={cases}
            active={Math.min(activeCase, cases.length - 1)}
            onActive={setActiveCase}
            onChange={onCaseChange}
            onAdd={onCaseAdd}
            onRemove={onCaseRemove}
          />;
          return <ResultPanel view={result} active={activeResult} onActive={setActiveResult} running={running} />;
        })()}
      </div>
    </section>
  );

  const busy = !!running;
  return (
    <div className="flex h-dvh flex-col bg-bg">
      <PracticeVisit kind="problem" title={title} context={listSlug ? "Coding workbook" : "Grokking Patterns"} />
      <header className="flex h-12 shrink-0 items-center gap-1.5 px-3">
        <Link href="/" className="grid size-8 shrink-0 place-items-center rounded-md bg-brand text-white" aria-label="Home">
          <Code2 size={16} strokeWidth={2.5} />
        </Link>
        <Link
          href={nav.list}
          aria-label="Problem List"
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-fg-1 hover:bg-layer-2"
        >
          <List size={16} /> <span className="hidden sm:inline">Problem List</span>
        </Link>
        <div className="flex">
          <NavArrow href={nav.prev} label="Previous problem">
            <ChevronLeft size={17} />
          </NavArrow>
          <NavArrow href={nav.next} label="Next problem">
            <ChevronRight size={17} />
          </NavArrow>
        </div>

        <div className="mx-auto flex items-center gap-0.5">
          <button
            onClick={run}
            disabled={!spec || busy}
            className="flex h-8 items-center gap-1.5 rounded-l-lg bg-layer-1 px-3 text-sm font-medium text-fg-1 shadow-sm ring-1 ring-line transition-colors hover:bg-layer-2 disabled:opacity-50"
            title="Run (Ctrl/⌘ + ')"
          >
            <Play size={13} className="fill-current" /> Run
          </button>
          <button
            onClick={submit}
            disabled={!spec || busy}
            className="flex h-8 items-center gap-1.5 rounded-r-lg bg-layer-1 px-3 text-sm font-medium text-ok shadow-sm ring-1 ring-line transition-colors hover:bg-layer-2 disabled:opacity-50"
            title="Submit (Ctrl/⌘ + Enter)"
          >
            <CloudUpload size={15} /> Submit
          </button>
        </div>

        <span className="hidden max-w-[28%] truncate text-sm text-fg-3 xl:inline">{title}</span>
        <ThemeToggle />
      </header>

      {isDesktop ? (
        <div ref={colRef} className="flex min-h-0 flex-1 px-2 pb-2">
          <div className="flex min-h-0 flex-col" style={{ width: `${colFrac * 100}%` }}>
            {left}
          </div>
          <Handle axis="x" label="Resize problem and editor panels" {...colHandle} />
          <div ref={rowRef} className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="flex min-h-0 flex-col" style={{ height: `${rowFrac * 100}%` }}>
              {editorPanel}
            </div>
            <Handle axis="y" label="Resize editor and console panels" {...rowHandle} />
            <div className="flex min-h-0 flex-1 flex-col">{consolePanel}</div>
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-2 overflow-y-auto px-2 pb-2">
          <div className="flex max-h-[70vh] flex-col">{left}</div>
          <div className="flex h-[60vh] flex-col">{editorPanel}</div>
          <div className="flex min-h-72 flex-col">{consolePanel}</div>
        </div>
      )}
    </div>
  );
}

function NavArrow({ href, label, children }: Readonly<{ href: string | null; label: string; children: React.ReactNode }>) {
  if (!href) {
    return (
      <span className="grid size-8 place-items-center text-fg-3 opacity-40" aria-hidden>
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="grid size-8 place-items-center rounded-md text-fg-2 hover:bg-layer-2 hover:text-fg-1"
    >
      {children}
    </Link>
  );
}

function SubmissionList({ id, submissions, onLoad }: Readonly<{ id: string; submissions: Submission[]; onLoad: (s: Submission) => void }>) {
  const progress = useProgress();
  const [total, accepted] = totalOf(progress, id);
  if (!submissions.length) {
    return <p className="py-8 text-center text-sm text-fg-3">No submissions yet. Submit your code to see it here.</p>;
  }
  return (
    <>
      <p className="mb-3 text-sm text-fg-2">
        Your acceptance on this problem:{" "}
        <span className="font-medium text-fg-1 tabular-nums">
          {total ? Math.round((accepted / total) * 1000) / 10 : 0}%
        </span>{" "}
        ({accepted} of {total} submissions accepted; showing the latest {submissions.length})
      </p>
      <table className="w-full text-sm">
        <thead className="text-left text-xs text-fg-3">
          <tr>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium">Language</th>
            <th className="pb-2 font-medium">Tests</th>
            <th className="pb-2 font-medium">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s.at} className="border-t border-line">
              <td className="py-2.5">
                <div className={`font-medium ${s.verdict === "Accepted" ? "text-ok" : "text-bad"}`}>{s.verdict}</div>
                <div className="text-xs text-fg-3">{new Date(s.at).toLocaleString()}</div>
              </td>
              <td className="py-2.5 text-fg-2">{LANG_LABEL[s.lang]}</td>
              <td className="py-2.5 text-fg-2 tabular-nums">
                {s.passed}/{s.total}
              </td>
              <td className="py-2.5 text-right">
                <button onClick={() => onLoad(s)} className="rounded-md px-2 py-1 text-xs text-blue hover:bg-layer-2">
                  Load code
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
