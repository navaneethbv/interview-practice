/** Choose only among the displayed, runnable problems, preferring unfinished ones. */
export function problemPool<T>(rows: readonly T[], available: (row: T) => boolean, solved: (row: T) => boolean): T[] {
  const runnable = rows.filter(available);
  const unfinished = runnable.filter((row) => !solved(row));
  return unfinished.length ? unfinished : runnable;
}

export function randomProblem<T>(pool: readonly T[]): T | undefined {
  if (!pool.length) return undefined;
  const range = 2 ** 32;
  const limit = range - (range % pool.length);
  const random = new Uint32Array(1);
  do {
    crypto.getRandomValues(random);
  } while (random[0] >= limit);
  return pool[random[0] % pool.length];
}
