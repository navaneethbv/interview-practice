## Intuition

A stop's optimal cost depends on the cheapest recent stop from which it can be reached without skipping more than k consecutive stops.
The start and destination behave like free virtual stops.
Thinking in terms of gaps between chosen stops makes the constraint local.

## Brute force

Try all subsets of rest stops and reject any choice with an excessive skipped run.
This takes exponential time and repeatedly recomputes the same cheapest prefixes.

## Approach

Store the minimum cost of stopping at index `stop` in `best[stop + 1]`.
The entry `best[0]` represents starting before all real stops at zero cost.
A real stop may follow any of the preceding k plus one positions, since a distance of k plus one skips exactly k stops.
For the first k plus one real stops, reaching directly from the start is legal.
For later stops, add the current detour time to the minimum allowed predecessor cost.
The destination can follow any of the final k plus one stored positions, so return the minimum of that suffix.

## Walkthrough

Example 1 uses k equal to 2.
The stored costs for real stops become `[8, 1, 2, 4, 10, 8, 6, 10]`.
For the stop costing 3 at index 3, the cheapest predecessor is index 1 with accumulated cost 1, producing 4.
Index 6 then follows index 3 for total cost 6.
Stopping at indices 1, 3, and 6 skips no run longer than two, and the final suffix minimum is 6.

## Complexity

The references examine up to k plus one predecessors per stop, taking O(n times min(n, k + 1)) time.
Both retain O(n) dynamic-programming storage.
Python also builds a temporary predecessor list of O(min(n, k + 1)) size; Java scans candidates directly.

## Edge cases

An empty route costs zero.
When n is at most k, passing every stop is legal and the virtual-start entry remains a final candidate.

## Common mistakes

Do not confuse skipped stops with distance between chosen indices.
The final answer need not include the last real stop.

## Language notes

Python's slice includes `best[n]` by ending at `n + 1`.
Java's final loop uses an inclusive upper bound for the same reason.
