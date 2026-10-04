## Intuition

The path may not revisit cells, so reaching the same coordinate through different histories creates different future possibilities.
Backtracking explicitly preserves that history while searching for the shortest complete clue collection.

## Brute force

The reference enumerates simple paths, suitable for the small room bounds.
Ordinary BFS keyed only by coordinates would discard necessary states because collected clues and previously used cells affect valid continuations.

## Approach

Count `clues`, then track `path`, `visited`, and `found` from `(0, 0)`.
Save a copy when all clues are collected.
Prune when the current length plus remaining clues cannot beat `best`.
Otherwise explore legal neighbors and undo each move afterward.

## Walkthrough

Example 1 can follow `(0,0)`, `(1,0)`, `(1,1)`, `(1,2)`, `(2,2)`.
The third and fifth cells collect the two clues, giving a five cell path.
Four moves are already necessary to reach `(2,2)`, so this complete path is shortest.

## Complexity

For N cells, a conservative worst case bound is O(N times 4^N), allowing for copying completed paths.
The path, visited state, best path, and recursion stack use O(N) space.
Pruning helps practice performance without removing the exponential worst case.

## Edge cases

A reachable clue can still be impossible to combine with another clue without revisiting a cell.
Obstacles are never entered.
If no complete path exists, return an empty list.
Any path with minimum length is accepted.

## Common mistakes

Do not continue exploring after all clues are collected.
Do not retain the mutable current path itself as `best`.
The lower bound counts remaining clues because each needs at least one additional cell, but it need not be achievable.

## Language notes

Python copies coordinate lists when saving the answer and uses a coordinate set.
Java stores immutable `List.of` coordinates and copies the outer path list.
The local `cluePath` validator accepts alternative optimal routes.
