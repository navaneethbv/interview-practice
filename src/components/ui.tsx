import { CheckCircle2, CircleDashed } from "lucide-react";
import type { Difficulty } from "@/lib/content-types";

const DIFF_LABEL: Record<Difficulty, string> = { easy: "Easy", medium: "Med.", hard: "Hard" };
const DIFF_COLOR: Record<Difficulty, string> = { easy: "text-easy", medium: "text-medium", hard: "text-hard" };

export function DifficultyText({ difficulty, long = false }: Readonly<{ difficulty: Difficulty; long?: boolean }>) {
  return (
    <span className={`font-medium ${DIFF_COLOR[difficulty]}`}>
      {long ? difficulty[0].toUpperCase() + difficulty.slice(1) : DIFF_LABEL[difficulty]}
    </span>
  );
}

export function DifficultyPill({ difficulty }: Readonly<{ difficulty: Difficulty }>) {
  return (
    <span className={`rounded-full bg-layer-2 px-2.5 py-0.5 text-xs font-medium ${DIFF_COLOR[difficulty]}`}>
      {difficulty[0].toUpperCase() + difficulty.slice(1)}
    </span>
  );
}

export function StatusIcon({ status }: Readonly<{ status: "solved" | "attempted" | "none" }>) {
  if (status === "solved") return <CheckCircle2 size={17} className="text-ok" aria-label="Solved" />;
  if (status === "attempted") return <CircleDashed size={17} className="text-medium" aria-label="Attempted" />;
  return <span className="inline-block size-[17px]" aria-hidden />;
}

export function Tag({ children }: Readonly<{ children: React.ReactNode }>) {
  return <span className="rounded-full bg-layer-2 px-2.5 py-0.5 text-xs text-fg-2">{children}</span>;
}
