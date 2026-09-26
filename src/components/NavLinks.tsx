"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/problems", label: "Problems" },
  { href: "/learn", label: "Patterns" },
  { href: "/system-design", label: "System Design" },
];

export function NavLinks() {
  const path = usePathname();
  return (
    <nav className="flex min-w-0 items-center gap-0.5 text-sm" aria-label="Main">
      {LINKS.map((l) => {
        const active = path === l.href || path.startsWith(`${l.href}/`);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap rounded-md px-2 py-1.5 transition-colors sm:px-2.5 ${
              active ? "font-medium text-fg-1" : "text-fg-2 hover:bg-layer-2 hover:text-fg-1"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
