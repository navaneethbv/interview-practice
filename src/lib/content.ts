import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { marked } from "marked";
import { createHighlighter, type Highlighter } from "shiki";
import type {
  Block,
  CourseIndex,
  CourseItem,
  Difficulty,
  LcMeta,
  Lesson,
  ProblemSet,
  SetRow,
} from "./content-types";
import type { ProblemSpec } from "./judge/types";

const ROOT = path.join(process.cwd(), "content");

function readJson<T>(file: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw e;
  }
}

/* ---------------------------------------------------------------- courses */

export const getCourse = cache((courseId: string = "grokking"): CourseIndex => {
  const course = readJson<CourseIndex>(path.join(ROOT, "courses", courseId, "course.json"));
  if (!course) throw new Error(`Course ${courseId} not found. Run the ingestion script first.`);
  return course;
});

export const getLesson = cache((id: string, courseId: string = "grokking"): Lesson | null => {
  if (!/^[a-z0-9-]+$/.test(id)) return null;
  return readJson<Lesson>(path.join(ROOT, "courses", courseId, "lessons", `${id}.json`));
});

export interface ProblemListItem extends CourseItem {
  number: number;
  difficulty: Difficulty;
  chapterId: string;
  chapterTitle: string;
  hasTests: boolean;
}

export const listProblems = cache((): ProblemListItem[] => {
  const course = getCourse();
  const out: ProblemListItem[] = [];
  for (const ch of course.chapters) {
    for (const item of ch.items) {
      if (item.type !== "problem") continue;
      out.push({
        ...item,
        number: out.length + 1,
        difficulty: item.difficulty ?? "medium",
        chapterId: ch.id,
        chapterTitle: ch.title.replace(/^Pattern:\s*/, ""),
        hasTests: fs.existsSync(path.join(ROOT, "problems", `${item.id}.json`)),
      });
    }
  }
  return out;
});

/** Flat reading order of the course, used for prev/next navigation. */
export const courseSequence = cache(() =>
  getCourse().chapters.flatMap((ch) => ch.items.map((it) => ({ ...it, chapterTitle: ch.title }))),
);

export function neighbors(id: string) {
  const seq = courseSequence();
  const i = seq.findIndex((x) => x.id === id);
  return { prev: i > 0 ? seq[i - 1] : null, next: i >= 0 && i < seq.length - 1 ? seq[i + 1] : null };
}

export function hrefFor(item: Pick<CourseItem, "id" | "type">) {
  return item.type === "problem" ? `/problems/${item.id}` : `/learn/${item.id}`;
}

/* ---------------------------------------------------------------- judge data */

export const getProblemSpec = cache((id: string): ProblemSpec | null => {
  if (!/^[a-z0-9-]+$/.test(id)) return null;
  return readJson<ProblemSpec>(path.join(ROOT, "problems", `${id}.json`));
});

export const getPythonReference = cache((id: string): string | null => {
  try {
    return fs.readFileSync(path.join(ROOT, "problems", `${id}.py`), "utf8");
  } catch {
    return null;
  }
});

/* ---------------------------------------------------------------- problem sets */

const LC_DIR = path.join(ROOT, "leetcode");
const SLUG = /^[a-z0-9-]+$/;

export const listSets = cache((): ProblemSet[] => readJson<ProblemSet[]>(path.join(ROOT, "sets", "sets.json")) ?? []);

export const getSet = cache((id: string): ProblemSet | null => listSets().find((s) => s.id === id) ?? null);

export const lcMetaAll = cache(
  (): Record<string, LcMeta> => readJson<Record<string, LcMeta>>(path.join(ROOT, "sets", "problems.json")) ?? {},
);

/** Publish a problem only when its statement, reference, and expected outputs exist. */
export const lcAuthored = cache((): Set<string> => {
  if (!fs.existsSync(LC_DIR)) return new Set(); // nosemgrep -- repo content directory; slugs are validated
  const files = new Set(fs.readdirSync(LC_DIR)); // nosemgrep -- repo content directory; slugs are validated
  return new Set(
    [...files].filter((f) => {
      if (!f.endsWith(".md")) return false;
      const slug = f.slice(0, -3);
      const spec = readJson<ProblemSpec>(path.join(LC_DIR, `${slug}.json`));
      return spec?.id === slug && files.has(`${slug}.${spec.kind === "sql" ? "sql" : "py"}`) &&
        spec.tests.length > 0 && spec.tests.every((test) => test.expected !== undefined);
    }).map((f) => f.slice(0, -3)),
  );
});

export function setRows(set: ProblemSet): SetRow[] {
  const meta = lcMetaAll();
  const authored = lcAuthored();
  return set.items.map((it) => ({ ...meta[it.slug], slug: it.slug, category: it.category, available: authored.has(it.slug) }));
}

/** The sets a problem belongs to, in set order. */
export function setsContaining(slug: string): ProblemSet[] {
  return listSets().filter((s) => s.items.some((it) => it.slug === slug));
}

export interface LcProblem {
  slug: string;
  meta: LcMeta;
  statementHtml: string;
  spec: ProblemSpec;
  /** Python or SQLite reference; the source of truth for expected outputs. */
  reference: string | null;
}

export const getLcProblem = cache((slug: string): LcProblem | null => {
  if (!SLUG.test(slug) || !lcAuthored().has(slug)) return null;
  const meta = lcMetaAll()[slug];
  const spec = readJson<ProblemSpec>(path.join(LC_DIR, `${slug}.json`));
  if (!meta || !spec) return null;
  // The page supplies the numbered heading; retain the standalone Markdown title on disk.
  const md = fs.readFileSync(path.join(LC_DIR, `${slug}.md`), "utf8").replace(/^# [^\n]+\r?\n/, ""); // nosemgrep -- repo content directory; slugs are validated
  const reference = spec.kind === "sql"
    ? fs.readFileSync(path.join(LC_DIR, `${slug}.sql`), "utf8") // nosemgrep -- repo content directory; slugs are validated
    : fs.readFileSync(path.join(LC_DIR, `${slug}.py`), "utf8"); // nosemgrep -- repo content directory; slugs are validated
  return { slug, meta, spec, reference, statementHtml: marked.parse(md, { async: false }) };
});

/* ---------------------------------------------------------------- system design */

export interface DesignArticle {
  id: string;
  title: string;
  summary?: string;
  source?: string;
  /** The prompt to practice against, shown first. */
  prompt: Block[];
  /** The reference design, hidden until revealed. */
  reference: Block[];
}

export const listDesignArticles = cache((): DesignArticle[] => {
  const dir = path.join(ROOT, "system-design");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readJson<DesignArticle>(path.join(dir, f))!)
    .sort((a, b) => a.title.localeCompare(b.title));
});

export const getDesignArticle = cache((id: string): DesignArticle | null => {
  if (!/^[a-z0-9-]+$/.test(id)) return null;
  return readJson<DesignArticle>(path.join(ROOT, "system-design", `${id}.json`));
});

/* ---------------------------------------------------------------- highlighting */

let highlighter: Promise<Highlighter> | null = null;

function getHighlighter() {
  highlighter ??= createHighlighter({ themes: ["github-light", "github-dark-dimmed"], langs: ["java", "python"] });
  return highlighter;
}

export async function highlight(code: string, lang: "java" | "python"): Promise<string> {
  const h = await getHighlighter();
  return h.codeToHtml(code.replace(/\n+$/, ""), {
    lang,
    themes: { light: "github-light", dark: "github-dark-dimmed" },
    defaultColor: "light",
  });
}

export type RenderedBlock =
  | { t: "html"; html: string }
  | { t: "code"; java?: string; python?: string; javaHtml?: string; pythonHtml?: string }
  | { t: "img"; src: string; w: number; h: number; alt?: string };

export async function renderBlocks(blocks: Block[] = []): Promise<RenderedBlock[]> {
  return Promise.all(
    blocks.map(async (b): Promise<RenderedBlock> => {
      if (b.t !== "code") return b;
      return {
        ...b,
        javaHtml: b.java ? await highlight(b.java, "java") : undefined,
        pythonHtml: b.python ? await highlight(b.python, "python") : undefined,
      };
    }),
  );
}
