"use client";

import { Check } from "lucide-react";
import { setRead, useProgress } from "@/lib/progress";

export function MarkRead({ id }: { id: string }) {
  const progress = useProgress();
  const done = !!progress.read[id];
  return (
    <button
      onClick={() => setRead(id, !done)}
      aria-pressed={done}
      className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
        done ? "bg-ok-soft text-ok" : "bg-layer-2 text-fg-2 hover:text-fg-1"
      }`}
    >
      <Check size={16} /> {done ? "Completed" : "Mark as completed"}
    </button>
  );
}
