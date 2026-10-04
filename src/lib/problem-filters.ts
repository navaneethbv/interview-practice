import type { Difficulty } from "./content-types";

export type StatusFilter = "all" | "solved" | "attempted" | "todo";
export type GroupFilter = "pattern" | "category" | "topic";

export function readProblemFilters(search: string, groupKey: GroupFilter, groups: readonly string[]) {
  const params = new URLSearchParams(search);
  const difficulty = params.get("difficulty");
  const status = params.get("status");
  const group = params.get(groupKey);
  return {
    query: params.get("q") ?? "",
    difficulty: (["easy", "medium", "hard"].includes(difficulty ?? "") ? difficulty : "all") as Difficulty | "all",
    status: (["solved", "attempted", "todo"].includes(status ?? "") ? status : "all") as StatusFilter,
    group: group && groups.includes(group) ? group : "all",
  };
}

/** Preserve other URL state, removing default filters to keep links readable. */
export function updateProblemFilter(search: string, key: string, value: string): string {
  const params = new URLSearchParams(search);
  if (value === "" || (key !== "q" && value === "all")) params.delete(key);
  else params.set(key, value);
  return params.toString();
}
