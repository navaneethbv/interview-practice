import type { SearchEntry } from "./catalog";

const RANK: Record<SearchEntry["k"], number> = { page: 0, list: 1, problem: 2, book: 3, lesson: 4, chapter: 5 };
const LIMIT = 40;

/** Lower is better; null when the entry does not match every word of the query. */
function score(entry: SearchEntry, words: string[]): number | null {
  const title = entry.t.toLowerCase();
  const sub = (entry.s ?? "").toLowerCase();
  let total = RANK[entry.k];
  for (const w of words) {
    const i = title.indexOf(w);
    if (i === 0 || (i > 0 && /[\s.(-]/.test(title[i - 1]))) total += 0;
    else if (i > 0) total += 4;
    else if (sub.includes(w)) total += 8;
    else return null;
  }
  // Prefer titles that contain the whole query as a phrase.
  if (words.length > 1 && title.includes(words.join(" "))) total -= 3;
  return total + title.length / 100;
}

export function search(index: SearchEntry[], query: string): SearchEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return index.filter((e) => e.k === "page" || e.k === "list").slice(0, LIMIT);
  const hits: [number, SearchEntry][] = [];
  for (const e of index) {
    const s = score(e, words);
    if (s !== null) hits.push([s, e]);
  }
  hits.sort((a, b) => a[0] - b[0]);
  return hits.slice(0, LIMIT).map(([, e]) => e);
}
