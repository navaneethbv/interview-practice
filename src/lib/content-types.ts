/** Shared content model produced by the ingestion scripts and read by the site. */

export type Difficulty = "easy" | "medium" | "hard";
export type LessonType = "lesson" | "problem";
export type CodeLang = "python" | "java" | "sql";

export type Block =
  | { t: "html"; html: string }
  | { t: "code"; java?: string; python?: string }
  | { t: "img"; src: string; w: number; h: number; alt?: string };

export interface CourseItem {
  id: string;
  title: string;
  type: LessonType;
  difficulty?: Difficulty;
}

export interface CourseIndex {
  id: string;
  title: string;
  description: string;
  chapters: { id: string; title: string; items: CourseItem[] }[];
}

export interface Lesson {
  id: string;
  courseId: string;
  chapterId: string;
  title: string;
  type: LessonType;
  difficulty?: Difficulty;
  /** Set for "Problem Challenge N" lessons. */
  challenge?: number;
  /** Lesson body (type === "lesson"). */
  body?: Block[];
  /** Problem statement, examples and constraints (type === "problem"). */
  statement?: Block[];
  /** Worked solution and complexity analysis (type === "problem"). */
  solution?: Block[];
  starter?: { java?: string; python?: string };
  reference?: { java?: string; python?: string };
}

/* ---------------------------------------------------------------- problem sets */

export type SetKind = "curated" | "company";

export interface ProblemSetItem {
  slug: string;
  category?: string;
}

/** A problem list such as Blind 75 or a company's frequently asked questions. */
export interface ProblemSet {
  id: string;
  title: string;
  kind: SetKind;
  description: string;
  items: ProblemSetItem[];
}

/** Metadata for a LeetCode problem, imported from the prep workbook. */
export interface LcMeta {
  number: number;
  title: string;
  difficulty: Difficulty;
  topics: string[];
  pattern?: string;
  hint?: string;
  time?: string;
  space?: string;
  /** LeetCode's acceptance rate in percent. */
  acceptance?: number;
  premium?: boolean;
}

/** One row of a problem set table. `available` is false until the problem's tests are authored. */
export interface SetRow extends LcMeta {
  slug: string;
  category?: string;
  available: boolean;
}

/** Scope used for the course's own problem list when resetting progress. */
export const COURSE_SCOPE = "grokking";

/** Progress key for a list problem, kept apart from course lesson ids, which can share slugs. */
export const lcProgressId = (slug: string) => `lc:${slug}`;

/* ---------------------------------------------------------------- system design books */

export interface DesignChapterMeta {
  id: string;
  title: string;
  /** The chapter's one-paragraph introduction. */
  lead?: string;
  difficulty?: Difficulty;
  /** Real products that solve the same problem, e.g. "bit.ly, goo.gl". */
  similar?: string;
}

/** A system design book, written by scripts/ingest/system_design.py as content/system-design/<id>/index.json. */
export interface DesignBook {
  id: string;
  title: string;
  short: string;
  description: string;
  source: string;
  /** Public URL of the original document, when it is published alongside the book. */
  download?: string;
  parts: { title: string; chapters: DesignChapterMeta[] }[];
}
