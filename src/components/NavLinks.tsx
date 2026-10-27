"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

/** `short` replaces the label between the md and xl breakpoints so tablet headers keep every link beside search. */
const LINKS: { href: string; label: string; short?: string; blurb: string }[] = [
  { href: "/practice/today", label: "Today", blurb: "Your daily schedule, saved work and readiness" },
  { href: "/problems", label: "Problems", blurb: "Study plans, topic tracks and company lists" },
  { href: "/interview-prep", label: "Interview Prep", short: "Prep", blurb: "Theory, Java, Spring Boot, OOD and algorithm questions with Big O" },
  { href: "/learn", label: "Patterns", blurb: "Lessons on the patterns behind the problems" },
  { href: "/practice", label: "Practice", blurb: "Mock interviews, reviews and the study plan" },
  { href: "/system-design", label: "Guides", blurb: "System design, behavioral and more" },
  { href: "/business-analyst", label: "Business Analyst", short: "BA", blurb: "Step-by-step BA course with chapter quizzes" },
];

function isActive(path: string, href: string) {
  if (href === "/practice" && path.startsWith("/practice/today")) return false;
  return path === href || path.startsWith(`${href}/`);
}

export function NavLinks() {
  const path = usePathname();
  return (
    <nav className="hidden min-w-0 items-center gap-0.5 text-sm md:flex" aria-label="Main">
      {LINKS.map((l) => {
        const active = isActive(path, l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`relative whitespace-nowrap rounded-md px-2.5 py-1.5 transition-colors ${
              active ? "font-medium text-fg-1" : "text-fg-2 hover:bg-layer-2 hover:text-fg-1"
            }`}
          >
            {l.short ? (
              <>
                <span className="xl:hidden">{l.short}</span>
                <span className="hidden xl:inline">{l.label}</span>
              </>
            ) : l.label}
            {active && <span aria-hidden className="absolute inset-x-2.5 -bottom-[11px] h-0.5 rounded-full bg-brand" />}
          </Link>
        );
      })}
    </nav>
  );
}

/** Menu button and drop-down panel shown below the md breakpoint. */
export function MobileMenu() {
  const path = usePathname();
  const [openAt, setOpenAt] = useState<string | null>(null);
  // Closes itself on navigation because it is only open for the path it was opened on.
  const open = openAt === path;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpenAt(open ? null : path)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-8 place-items-center rounded-md text-fg-2 hover:bg-layer-2 hover:text-fg-1"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      {open && (
        <nav id="mobile-menu" aria-label="Main" className="absolute inset-x-0 top-full border-b border-line bg-layer-1 shadow-raised">
          <ul className="mx-auto max-w-6xl p-2">
            {LINKS.map((l) => {
              const active = isActive(path, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpenAt(null)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2.5 ${active ? "bg-layer-2" : "hover:bg-layer-2"}`}
                  >
                    <span className="block font-medium">{l.label}</span>
                    <span className="block text-sm text-fg-3">{l.blurb}</span>
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
