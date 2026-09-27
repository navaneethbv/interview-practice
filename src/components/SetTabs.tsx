import Link from "next/link";
import type { ProblemSet } from "@/lib/content-types";

/** Switches between the course's problems and the imported problem lists. */
export function SetTabs({ sets, active }: { sets: ProblemSet[]; active: string }) {
  const tabs = [
    { id: "grokking", href: "/problems", title: "Grokking Patterns" },
    ...sets.map((s) => ({ id: s.id, href: `/problems/sets/${s.id}`, title: s.title })),
  ];
  return (
    <nav aria-label="Problem lists" className="-mx-4 mb-6 overflow-x-auto px-4">
      <ul className="flex w-max gap-1.5 pb-1">
        {tabs.map((t) => {
          const current = t.id === active;
          return (
            <li key={t.id}>
              <Link
                href={t.href}
                aria-current={current ? "page" : undefined}
                className={`block whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  current
                    ? "border-fg-1 bg-fg-1 font-medium text-layer-1"
                    : "border-line bg-layer-1 text-fg-2 hover:border-line-strong hover:text-fg-1"
                }`}
              >
                {t.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
