"use client";

import { useSearchParams } from "next/navigation";
import { readProblemFilters, updateProblemFilter, type GroupFilter } from "@/lib/problem-filters";

export function useProblemFilters(groupKey: GroupFilter, groups: readonly string[]) {
  const params = useSearchParams();
  const filters = readProblemFilters(params.toString(), groupKey, groups);

  function update(key: string, value: string) {
    const search = updateProblemFilter(window.location.search, key, value);
    const href = `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`;
    if (href !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      // Next integrates native history with useSearchParams, including Back and Forward.
      if (key === "q") window.history.replaceState(null, "", href);
      else window.history.pushState(null, "", href);
    }
  }

  return {
    ...filters,
    setQuery: (value: string) => update("q", value),
    setDifficulty: (value: string) => update("difficulty", value),
    setStatus: (value: string) => update("status", value),
    setGroup: (value: string) => update(groupKey, value),
  };
}
