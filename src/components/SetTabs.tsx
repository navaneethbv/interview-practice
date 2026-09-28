import Link from "next/link";
import type { ProblemSet } from "@/lib/content-types";

const COMPANIES_ID = "companies";

interface Tab {
  id: string;
  href: string;
  title: string;
}

/**
 * Switches between the course's problems and the imported problem lists.
 * Company lists share one "Companies" tab, and the active company is picked from a second row.
 */
export function SetTabs({ sets, active }: Readonly<{ sets: ProblemSet[]; active: string }>) {
  const companies = sets.filter((s) => s.kind === "company").map(toTab);
  const inCompanies = companies.some((c) => c.id === active);
  const tabs: Tab[] = [
    { id: "grokking", href: "/problems", title: "Grokking Patterns" },
    ...sets.filter((s) => s.kind !== "company").map(toTab),
  ];
  if (companies.length) tabs.push({ id: COMPANIES_ID, href: companies[0].href, title: "Companies" });
  const activeTab = inCompanies ? COMPANIES_ID : active;

  return (
    <div className="mb-6">
      <nav aria-label="Problem lists" className="-mx-4 overflow-x-auto px-4">
        <ul className="flex w-max gap-1.5 pb-1">
          {tabs.map((t) => {
            const current = t.id === activeTab;
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
      {inCompanies && (
        <nav aria-label="Companies" className="-mx-4 mt-2 overflow-x-auto border-b border-line px-4">
          <ul className="flex w-max gap-4">
            {companies.map((c) => {
              const current = c.id === active;
              return (
                <li key={c.id}>
                  <Link
                    href={c.href}
                    aria-current={current ? "page" : undefined}
                    className={`-mb-px block whitespace-nowrap border-b-2 py-2 text-sm transition-colors ${
                      current ? "border-fg-1 font-medium text-fg-1" : "border-transparent text-fg-2 hover:text-fg-1"
                    }`}
                  >
                    {c.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}

function toTab(set: ProblemSet): Tab {
  return { id: set.id, href: `/problems/sets/${set.id}`, title: set.title };
}
