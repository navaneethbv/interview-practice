## Intuition

The no-revisit rule makes the complete visited-cell history relevant to future choices.
Search simple paths with backtracking, retaining the shortest one that has collected every clue.

## Brute force

A greedy route to the nearest clue can block access to later clues.
Ordinary BFS using only coordinates and collected clues also loses information about cells already forbidden by the current path.

## Approach

Count clues, initialize path and visited with `[0, 0]`, and recurse through legal unvisited neighbors.
Track `found`, incrementing it only when entering a clue cell.
Once all clues are found, copy the current path if it improves best.
Prune when current length plus the number of remaining clues cannot beat best, since each missing clue requires at least one new cell.
Undo both path and visited changes after every recursive branch.

## Walkthrough

```text
Input: room = [[0, 1, 0], [0, 2, 0], [0, 0, 2]]
Output: [[0, 0], [1, 0], [1, 1], [1, 2], [2, 2]]
```

Example 1 can follow `[0, 0]`, `[1, 0]`, `[1, 1]`, `[1, 2]`, `[2, 2]`.
The third cell collects the first clue and the fifth collects the second.
Four moves are necessary to reach the bottom-right clue from the start, so a five-cell path meeting both clues is optimal.
Another equal-length route may be returned depending on traversal order.

## Complexity

For N cells, a conservative bound is O(N times 4 to the power N), including copying successful paths.
Visited state, current path, best path, and recursion use O(N) space.
Pruning helps practical search but does not remove exponential worst-case behavior.

## Edge cases

An unreachable clue yields an empty result.
A reachable pair of clues can still be impossible to collect without revisiting a bottleneck.

## Common mistakes

Copy best rather than storing the mutable current path.
Do not globally mark cells across separate search branches.

## Language notes

Python copies coordinate lists when saving a result.
Java stores immutable coordinate pairs and copies the outer path list, so later backtracking cannot corrupt best.
