## Intuition

A round must mark every qualifying run before changing any cell, because horizontal and vertical matches are removed simultaneously.
After marking, compact each column downward and repeat until a scan finds no crushable cell.

## Brute force

Removing one run at a time would require rescanning after every deletion and can change which runs are seen in the same round.
The mark-then-remove pass preserves the simultaneous-removal rule and uses predictable board scans.

## Approach

1. Scan every positive cell and mark horizontal or vertical triples in `crush` or `crushed`.
2. Set all marked cells to zero in one pass.
3. For each column, collect nonzero values and write them at the bottom, filling the remaining top cells with zero.
4. Repeat until no cell was marked.

## Walkthrough

For Example 1, the top row is `[1, 1, 1]`.
The horizontal scan marks all three top cells, while the other rows contain no matching triples.
Those cells become zero, and dropping each column leaves zeros at the top with rows `[2, 3, 4]` and `[5, 6, 7]` below.
The next scan finds no run, so the stable board is `[[0, 0, 0], [2, 3, 4], [5, 6, 7]]`.

## Complexity

One round scans and rewrites `R * C` cells, so it costs `O(RC)` time and `O(RC)` temporary space for the marks and column values.
The number of rounds depends on cascades and is bounded by the finite number of candies that can be removed.

## Edge cases

Zeros are empty cells and must never form a crush run.
A run longer than three is fully marked because each triple contributes its cells to the set or boolean grid.

## Common mistakes

- Mutating while scanning can hide a crossing run that should be removed in the same round.
- Moving candies upward instead of downward reverses the board physics.
- Stopping after one round misses cascades created by falling candies.

## Language notes

Python uses a set of coordinate tuples, while Java uses a boolean mark matrix because Java arrays cannot hold tuple keys directly.
Both mutate and return the supplied board, matching the judge's array contract.
