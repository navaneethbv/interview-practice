import { designChapters, hrefFor, lcAuthored, lcMetaAll, listDesignBooks, listProblems, listSets, setRows } from "./content";
import { COURSE_SCOPE, lcProgressId, type Difficulty, type SetKind } from "./content-types";

/** One problem list as shown on the hub and home pages. */
export interface ListSummary {
  id: string;
  title: string;
  href: string;
  /** Hub section: guided study plans, topic tracks, or company lists. */
  group: "plans" | "tracks" | "companies";
  kind: SetKind | "course";
  description: string;
  /** Progress ids of the problems that can be solved here, with their difficulties. */
  ids: string[];
  difficulties: Difficulty[];
  /** Scope used for list-specific progress. */
  scope: string;
}

const TRACKS = new Set(["sql-50", "concurrency", "object-oriented-design", "ml-coding"]);
/** Study plans from shortest to longest, then the book companions. */
const PLAN_ORDER = ["grokking", "blind-75", "grind-75", "neetcode-150", "grind-169", "ctci", "bctci"];

export function listSummaries(): ListSummary[] {
  const course = listProblems();
  const grokking: ListSummary = {
    id: "grokking",
    title: "Grokking Patterns",
    href: "/problems/grokking",
    group: "plans",
    kind: "course",
    description: "Every problem from the pattern course, in lesson order.",
    ids: course.map((p) => p.id),
    difficulties: course.map((p) => p.difficulty),
    scope: COURSE_SCOPE,
  };
  const sets = listSets().map((set): ListSummary => {
    const rows = setRows(set).filter((r) => r.available);
    return {
      id: set.id,
      title: set.title,
      href: `/problems/sets/${set.id}`,
      group: set.kind === "company" ? "companies" : TRACKS.has(set.id) ? "tracks" : "plans",
      kind: set.kind,
      description: set.description.split(/(?<=\.)\s/)[0],
      ids: rows.map((r) => lcProgressId(r.slug)),
      difficulties: rows.map((r) => r.difficulty),
      scope: set.id,
    };
  });
  const rank = (l: ListSummary) => (l.group === "plans" ? PLAN_ORDER.indexOf(l.id) >>> 0 : 0);
  return [grokking, ...sets].sort((a, b) => rank(a) - rank(b));
}

export interface SearchEntry {
  /** Display title. */
  t: string;
  /** Link. */
  h: string;
  /** Kind: problem, list, guide chapter, guide book, lesson or page. */
  k: "problem" | "list" | "chapter" | "book" | "lesson" | "page";
  /** Secondary text such as difficulty or book title. */
  s?: string;
}

/** Everything the command palette can jump to. */
export function searchIndex(): SearchEntry[] {
  const pages: SearchEntry[] = [
    { t: "Problem lists", h: "/problems", k: "page" },
    { t: "Practice: mock interview", h: "/practice#mock", k: "page" },
    { t: "Practice: review queue", h: "/practice#review", k: "page" },
    { t: "16-week study plan", h: "/practice/plan", k: "page" },
    { t: "Pattern lessons", h: "/learn", k: "page" },
    { t: "Interview guides", h: "/system-design", k: "page" },
  ];
  const lists = listSummaries().map((l): SearchEntry => ({ t: l.title, h: l.href, k: "list", s: `${l.ids.length} problems` }));
  const meta = lcMetaAll();
  const problems = [...lcAuthored()]
    .filter((slug) => meta[slug])
    .sort((a, b) => meta[a].number - meta[b].number)
    .map((slug): SearchEntry => ({ t: `${meta[slug].number}. ${meta[slug].title}`, h: `/problems/lc/${slug}`, k: "problem", s: meta[slug].difficulty }));
  const lessons = listProblems().map((p): SearchEntry => ({ t: p.title, h: hrefFor(p), k: "lesson", s: p.chapterTitle }));
  const guides = listDesignBooks().flatMap((book) => [
    { t: book.title, h: `/system-design/${book.id}`, k: "book" as const },
    ...designChapters(book).map((c): SearchEntry => ({ t: c.title, h: `/system-design/${book.id}/${c.id}`, k: "chapter", s: book.title })),
  ]);
  return [...pages, ...lists, ...problems, ...lessons, ...guides];
}

/** Options for the list switcher on list pages. */
export function switcherOptions() {
  return listSummaries().map(({ href, title, group }) => ({ href, title, group }));
}
