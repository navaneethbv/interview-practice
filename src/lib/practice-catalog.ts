import { hrefFor, lcAuthored, lcMetaAll, listProblems, listSets } from "./content";
import { lcProgressId, type Difficulty } from "./content-types";

export interface CatalogEntry {
  title: string;
  href: string;
  difficulty: Difficulty;
}

export interface CatalogSource {
  id: string;
  title: string;
  ids: string[];
}

/** Every solvable problem keyed by progress id, plus the lists a mock interview can draw from. */
export function practiceCatalog(): { entries: Record<string, CatalogEntry>; sources: CatalogSource[] } {
  const entries: Record<string, CatalogEntry> = {};
  const meta = lcMetaAll();
  for (const slug of lcAuthored()) {
    const m = meta[slug];
    if (!m) continue;
    entries[lcProgressId(slug)] = { title: `${m.number}. ${m.title}`, href: `/problems/lc/${slug}`, difficulty: m.difficulty };
  }
  const course = listProblems().filter((p) => p.hasTests);
  for (const p of course) entries[p.id] = { title: p.title, href: hrefFor(p), difficulty: p.difficulty };

  const authored = lcAuthored();
  const sources: CatalogSource[] = listSets().map((set) => ({
    id: set.id,
    title: set.title,
    ids: set.items.filter((it) => authored.has(it.slug) && meta[it.slug]).map((it) => lcProgressId(it.slug)),
  }));
  sources.push({ id: "course", title: "Grokking Patterns", ids: course.map((p) => p.id) });
  return { entries, sources: sources.filter((s) => s.ids.length) };
}
