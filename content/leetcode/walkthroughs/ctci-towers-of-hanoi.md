## Intuition

The largest disk cannot move to its destination until every smaller disk has been moved onto the spare peg.
After moving that largest disk once, the smaller stack must move from the spare peg onto it.
The same rule applies recursively to every smaller stack.

## Brute force

A search over all legal peg configurations could find a solution, but would store many states and repeatedly examine moves that the disk-order rule already determines.
The recursive decomposition directly produces the required optimal sequence.

## Approach

Call `_move(n, 1, 3, 2, moves)` to transfer n disks from peg 1 to peg 3.
For zero disks, do nothing.
Otherwise move the top n minus one disks from `source` to `spare`, using `target` temporarily.
Append the move `[source, target]` for the largest remaining disk.
Finally move the smaller stack from `spare` to `target`, now using `source` as the spare.
Each recursive call preserves the rule that a larger disk never sits above a smaller disk.

## Walkthrough

Example 1 has two disks.
First move the smaller disk from peg 1 to peg 2.
Then move the larger disk from peg 1 to peg 3.
Finally move the smaller disk from peg 2 to peg 3.
The emitted sequence is `[[1, 2], [1, 3], [2, 3]]`.
Peg 3 now contains the complete stack in its original size order.

## Complexity

The recurrence is T(n) equal to twice T(n minus one) plus one.
Exactly `2^n - 1` moves are generated, taking O(2^n) time and output space.
The recursion stack uses O(n) additional space.

## Edge cases

Zero disks return an empty move list.
One disk produces a single move from peg 1 to peg 3.
The maximum input is deliberately small because the output grows exponentially.

## Common mistakes

The peg roles change in each recursive call; merely decrementing the disk count without permuting those roles produces illegal moves.

## Language notes

Both languages append two-element lists for moves.
Python and Java mutate one shared output collection while recursive arguments describe the current source, target, and spare pegs.
