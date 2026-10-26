"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export interface SwitcherOption {
  href: string;
  title: string;
  group: "plans" | "tracks" | "companies";
}

const GROUP_LABEL = { plans: "Study plans", tracks: "Topic tracks", companies: "Companies" };

/** Jumps between problem lists without going back to the hub. */
export function ListSwitcher({ options, current }: Readonly<{ options: SwitcherOption[]; current: string }>) {
  const router = useRouter();
  return (
    <label className="relative inline-flex min-w-0 max-w-full items-center">
      <span className="sr-only">Switch list</span>
      <select
        value={current}
        onChange={(e) => router.push(e.target.value)}
        className="h-9 w-full max-w-full appearance-none rounded-lg border border-line bg-layer-1 pr-8 pl-3 text-sm text-fg-1 shadow-card hover:border-line-strong sm:w-auto"
      >
        {(Object.keys(GROUP_LABEL) as SwitcherOption["group"][]).map((g) => (
          <optgroup key={g} label={GROUP_LABEL[g]}>
            {options.filter((o) => o.group === g).map((o) => (
              <option key={o.href} value={o.href}>{o.title}</option>
            ))}
          </optgroup>
        ))}
      </select>
      <ChevronDown size={15} aria-hidden className="pointer-events-none absolute right-2.5 text-fg-3" />
    </label>
  );
}
