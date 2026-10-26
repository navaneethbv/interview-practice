/** One-based CLI shard numbers; every sorted fixture belongs to exactly one shard. */
export type ReferenceShard = { index: number; total: number };

export function parseReferenceShard(
  args: readonly string[],
): ReferenceShard | undefined {
  const flags = args.filter((arg) => arg.startsWith("--shard"));
  if (!flags.length) return undefined;
  const match = flags.length === 1 && /^--shard=(\d+)\/(\d+)$/.exec(flags[0]);
  if (!match)
    throw new Error(
      "Use --shard=INDEX/TOTAL (one-based), for example --shard=1/4",
    );
  const index = Number(match[1]);
  const total = Number(match[2]);
  if (
    !Number.isSafeInteger(index) ||
    !Number.isSafeInteger(total) ||
    index < 1 ||
    total < 1 ||
    index > total
  ) {
    throw new Error(
      "Shard INDEX and TOTAL must be positive integers with INDEX <= TOTAL",
    );
  }
  return { index, total };
}

export function selectReferenceShard(
  files: readonly string[],
  shard?: ReferenceShard,
): string[] {
  const sorted = [...files].sort();
  return shard
    ? sorted.filter((_, index) => index % shard.total === shard.index - 1)
    : sorted;
}
