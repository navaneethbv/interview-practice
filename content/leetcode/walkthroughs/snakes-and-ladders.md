## Intuition
Every square is a graph node, and one die roll creates edges to at most six next squares.
Breadth-first search finds the fewest turns because every roll has equal cost.

## Brute force
A depth-first search can enumerate all dice sequences, but it revisits squares and may be exponential in the board size.
Memoization can repair that, while BFS naturally records the first shortest distance.

## Approach
1. Convert a one-based square into alternating board coordinates.
2. Start BFS from square 1 with zero turns.
3. For each die destination, apply at most one snake or ladder.
4. Mark resulting squares visited and advance the turn level.

## Walkthrough
Example 1 is a 2 by 2 board with all cells `-1`.
The queue starts at square 1 with zero turns.
A die result of 3 reaches square 4, the final square, because it does not exceed 4.
BFS discovers square 4 at turn 1 and returns 1.
No jump is applied because the destination cell is `-1`.

## Complexity
There are n squared squares and at most six outgoing rolls per square.
The time is O(n^2), and the queue plus visited array use O(n^2) space.
Coordinate conversion is O(1) per edge.

## Edge cases
A jump is applied only once after landing.
Unreachable boards exhaust BFS and return -1.
The alternating row direction must be reversed for every other row from the bottom.

## Common mistakes
Reading rows from the top without converting square numbering maps jumps incorrectly.
Following a second jump in the same turn changes the game rules.
Marking the pre-jump square instead of the destination can cause repeated work.

## Language notes
Python stores `(square, turns)` tuples in a deque.
Java uses level-based BFS so each queue layer represents one turn and avoids tuple allocations.
