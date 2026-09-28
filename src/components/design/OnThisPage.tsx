"use client";

import { useEffect, useState } from "react";
import type { DesignHeading } from "@/lib/content";

/** Section links for the current chapter, highlighting the section being read. */
export function OnThisPage({ headings }: Readonly<{ headings: DesignHeading[] }>) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -70% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-2 text-xs font-semibold tracking-wide text-fg-3 uppercase">On this page</p>
      <ol className="space-y-1 border-l border-line">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={`-ml-px block border-l py-1 leading-snug transition-colors ${h.depth > 2 ? "pl-6" : "pl-3"} ${
                active === h.id ? "border-brand text-fg-1" : "border-transparent text-fg-3 hover:text-fg-1"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
