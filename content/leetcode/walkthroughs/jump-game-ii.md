## Intuition

All positions reachable with the same number of jumps form a current range.
While scanning that range, track the farthest position any of its choices can reach.
When the scan reaches the range end, one jump is committed and the next range ends at that farthest position.

## Brute force

Trying every legal jump creates an exponential search tree in the worst case.
A shortest path breadth-first search avoids repeated depths but may still inspect many edges.
The greedy range scan compresses each BFS layer into two boundaries.

## Approach

1. Start with jumps = 0, current_end = 0, and farthest_reachable = 0.
2. Scan every index except the final one.
3. Extend farthest_reachable with the reach from the current index.
4. When index reaches current_end, increment jumps and make farthest_reachable the next boundary.
5. Return jumps after the final index is covered.

## Walkthrough

Example 1 uses nums = [2, 3, 1, 1, 4].

| index | farthest_reachable | current_end | jumps |
| --- | --- | --- | --- |
| 0 | 2 | 0 | 0 |
| 0 closes first range | 2 | 2 | 1 |
| 1 | 4 | 2 | 1 |
| 2 closes second range | 4 | 4 | 2 |

The second range reaches the final index, so the answer is 2.

## Complexity

- Time: O(n), because every index before the destination is scanned once.
- Space: O(1), using only three counters.

## Edge cases

A one-element array needs zero jumps.
A zero inside a reachable range is harmless when another index extends the range.
The problem guarantees the destination is reachable, so no failure sentinel is needed.
A direct first jump sets current_end beyond the destination and returns one.

## Common mistakes

- Counting a jump at the final index adds one unnecessarily.
- Resetting farthest_reachable when a range closes can lose a longer option.
- Greedily choosing the largest immediate jump is not the same as scanning the whole range.
- Using a strict inequality for the boundary skips the range-closing index.

## Language notes

Python and Java both use integer boundaries and the same range-greedy invariant.
Java Math.max and Python max update the farthest endpoint.
