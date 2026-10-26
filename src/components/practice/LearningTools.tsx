import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LEARNING_TOOLS } from "@/lib/platform-navigation";

export function LearningTools() {
  return (
    <nav
      aria-label="Study tools"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {LEARNING_TOOLS.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="rounded-2xl border border-line bg-layer-1 p-5 shadow-card transition-colors hover:border-line-strong hover:bg-layer-2"
        >
          <span className="flex items-center justify-between gap-3 font-semibold">
            {tool.title}
            <ArrowUpRight
              size={16}
              aria-hidden
              className="shrink-0 text-brand"
            />
          </span>
          <p className="mt-2 text-sm leading-relaxed text-fg-2">
            {tool.description}
          </p>
        </Link>
      ))}
    </nav>
  );
}
