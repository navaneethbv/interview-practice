## Intuition

An O region is captured only when it cannot reach the boundary.
Instead of searching every interior region, mark all O cells connected to a boundary as safe.
After that search, every remaining O is surrounded and can be changed to X.

## Brute force

Starting a fresh search from every O cell, without sharing visited state between searches, can revisit one large component O(R × C) times and take O((R × C)²) time.
A component-by-component search with shared visited state is also linear, but must retain whether each component touches the boundary.
Starting only from boundary O cells marks all safe components in one traversal, leaving one final scan to capture the rest.
## Approach

1. Seed a traversal from boundary O cells.
2. Mark every reached O with # and explore its four edge neighbors.
   Python validates and marks candidates when popping; Java validates and marks them when enqueuing.
3. Scan the board again.
4. Convert # back to O for safe cells and convert every other cell to X.

The temporary marker separates safe regions from the interior regions that should be captured.
Python skips candidates that are out of bounds or already marked, so duplicates never expand twice.
Java prevents duplicate queue entries by marking on insertion.

## Walkthrough

Example 1 has one interior O in a three by three board.

| phase | board center | result |
| --- | --- | --- |
| boundary search | center is O, with all boundary cells X | stack is empty |
| flood fill | center remains O | no safe cells are marked |
| conversion | center O becomes X | all cells are X |

The final board is [["X", "X", "X"], ["X", "X", "X"], ["X", "X", "X"]].

## Complexity

Let R and C be the board dimensions.
Boundary traversal and final conversion each visit every cell at most a constant number of times, so time is O(R × C).
The stack can contain O(R × C) cells, giving that auxiliary space bound.

## Edge cases

An O on any boundary remains O.
A chain connected to a boundary through several turns also remains O.
An empty board returns without indexing a row.
A one-row or one-column board has no captured cells because every position is on the boundary.

## Common mistakes

- Flood filling only from the first boundary O misses other safe components.
- Searching from each interior O repeats work.
- Erasing the # marker before restoring safe cells loses which regions must remain O.
- Expanding an already marked cell again can repeatedly traverse cycles.

## Language notes

Python uses stack and extends it with the four neighbors.
Java seeds a queue and uses addBoundaryCell and addSafeCell helpers.
Both use # only as a temporary marker and restore the required O values at the end.
