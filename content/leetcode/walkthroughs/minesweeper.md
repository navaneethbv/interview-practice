## Intuition

A clicked mine ends immediately by changing M to X.
For an empty click, count mines in all eight neighboring positions.
A positive count becomes a digit and stops expansion, while zero becomes B and adds unrevealed neighbors to the search.

## Brute force

A recursive reveal is natural, but a large open board can create deep recursion and language-specific stack failures.
Repeatedly scanning the whole board after each click is also wasteful.
A queue performs the same breadth first reveal and marks cells when they are scheduled.

## Approach

1. Handle a mine click by writing X and returning.
2. Enqueue the clicked E cell and mark it B so it cannot be scheduled twice.
3. Count M cells in its eight neighbors.
4. Write the count digit when it is positive.
5. Otherwise keep B and enqueue each neighboring E cell.
6. Return the mutated board.

## Walkthrough

Example 1 starts with a 2 by 2 board of E cells and click = [0,0].

| processed cell | adjacent mines | newly queued cells | board effect |
| --- | ---: | --- | --- |
| (0,0) | 0 | (0,1),(1,0),(1,1) | B |
| (0,1) | 0 | none | B |
| (1,0) | 0 | none | B |
| (1,1) | 0 | none | B |

All four cells become B, matching the example output.

## Complexity

Let R and C be board dimensions.
Each revealed cell examines at most eight neighbors, so time is O(R × C) in the worst case.
The queue or visited set can hold O(R × C) cells, while the board is mutated in place.

## Edge cases

Clicking M changes only that cell to X.
A positive neighboring mine count writes a digit from 1 through 8.
A board with no mines spreads B through every connected E component.
Already revealed cells are not expanded again.

## Common mistakes

- Counting the clicked cell as its own neighbor creates an incorrect mine count.
- Enqueuing an E cell without marking it can schedule it repeatedly.
- Revealing through a positive count incorrectly exposes unrelated cells.
- Recursing deeply through a large empty board risks stack overflow.

## Language notes

Python uses deque and a visited set before calculating each queued cell.
Java marks an E cell B when it is enqueued, then uses helper methods for bounds and mine counts.
The Java version is iterative, which keeps the reveal robust for deep open regions.
