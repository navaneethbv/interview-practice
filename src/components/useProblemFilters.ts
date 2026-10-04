"use client";

import { useSearchParams } from "next/navigation";
import { readProblemFilters, updateProblemFilter, type GroupFilter } from "@/lib/problem-filters";

function updateFilter(key: string, value: string) {
  const search = updateProblemFilter(window.location.search, key, value);
  const suffix = search ? `?${search}` : "";
  const href = `${window.location.pathname}${suffix}${window.location.hash}`;
  if (href !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    // Next integrates native history with useSearchParams, including Back and Forward.
    if (key === "q") window.history.replaceState(null, "", href);
    else window.history.pushState(null, "", href);
  }
}

export function useProblemFilters(groupKey: GroupFilter, groups: readonly string[]) {
  const params = useSearchParams();
  const filters = readProblemFilters(params.toString(), groupKey, groups);

  return {
    ...filters,
    setQuery: (value: string) => updateFilter("q", value),
    setDifficulty: (value: string) => updateFilter("difficulty", value),
    setStatus: (value: string) => updateFilter("status", value),
    setGroup: (value: string) => updateFilter(groupKey, value),
  };
}
