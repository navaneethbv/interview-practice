import type { PrepQuestion } from "./technical-prep";
export function filterPrepQuestions(
  questions: readonly PrepQuestion[],
  query: string,
  level: string,
) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return questions.filter(
    (q) =>
      (level === "All" || q.level === level) &&
      words.every((word) =>
        `${q.title} ${q.answer} ${q.example} ${q.complexity?.time ?? ""}`
          .toLowerCase()
          .includes(word),
      ),
  );
}
