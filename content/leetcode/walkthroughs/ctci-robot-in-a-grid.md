## Intuition

A route can advance only right or down.
If a cell cannot lead to the destination, reaching it by a different prefix cannot make its remaining options better.
Remembering failed cells therefore prevents repeatedly exploring the same dead end while preserving the desired right-first path.

## Brute force

Backtrack through every right/down move sequence without remembering failures.
Blocked cells near the destination can make many different prefixes explore the same doomed suffix, causing exponential repeated work.

## Approach

The nested `reach` function rejects out-of-bounds coordinates, blocked cells, and known `dead_ends`.
Otherwise append the coordinate to `path`.
Succeed immediately at the destination, or recursively try right before down.
If neither continuation succeeds, remove the coordinate and record it as a dead end.
A successful recursion leaves its coordinates in `path`; complete failure returns an empty list.
The stored path always describes the currently explored prefix.

## Walkthrough

Example 1 starts at `(0, 0)`.
Move right to `(0, 1)`; its right neighbor `(0, 2)` is blocked, so move down to `(1, 1)`.
Continue right to `(1, 2)`, then down to `(2, 2)`.
The returned coordinates are `[[0, 0], [0, 1], [1, 1], [1, 2], [2, 2]]`.
Each step is legal and the ordering reflects the right-first search.

## Complexity

For r rows and c columns, time is O(rc), because failed cells are memoized and the successful route stops the search.
Dead-end storage is O(rc); path and recursion depth are O(r + c).

## Edge cases

A blocked start or destination cannot produce a route.
A free one-cell grid returns that single coordinate.
A grid with no route returns an empty list.

## Common mistakes

Forgetting to pop a failed coordinate leaves branches mixed into the answer.
Exploring down first may return a different path than the reference's deterministic ordering.

## Language notes

Python stores failed coordinate tuples in a set.
Java uses a boolean matrix, while both references maintain an ordered mutable path with append and backtrack operations.
