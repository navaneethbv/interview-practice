/** Resolve explicit bookmark navigation before the saved chapter position. */
export function resolveBaStep(
  fragment: string,
  saved: number | undefined,
  lessonCount: number,
): number {
  const quizStep = lessonCount + 1;
  if (fragment === "#quiz") return quizStep;
  const match = /^#lesson-([1-9]\d*)$/.exec(fragment);
  if (match) {
    const linked = Number(match[1]);
    if (linked <= lessonCount) return linked;
  }
  if (saved && Number.isInteger(saved) && saved > 0 && saved <= quizStep)
    return saved;
  return 1;
}
