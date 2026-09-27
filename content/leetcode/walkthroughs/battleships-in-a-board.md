## Intuition

A battleship is counted exactly at its topmost and leftmost cell.
That cell contains X but has no X directly above or directly to its left.
Every other cell of the same horizontal or vertical ship has one of those predecessor cells, so it is skipped.

## Brute force

A flood fill from every unvisited X could mark an entire ship and count it once.
That visits every cell in O(R × C) time but needs a visited structure or mutates the board.
The predecessor test gets the same linear time with constant extra state.

## Approach

1. Scan the board row by row.
2. Skip every dot cell.
3. For an X, check whether an X is directly above or to the left.
4. Increment the count only when neither predecessor is part of a ship.
5. Return the number of starts.

## Walkthrough

Example 1 has one single-cell ship at (0,0) and a vertical ship in column 3.

| cell | above X | left X | count change |
| --- | --- | --- | ---: |
| (0,0) | no | no | +1 |
| (0,3) | no | no | +1 |
| (1,3) | yes | no | +0 |
| (2,3) | yes | no | +0 |

The final count is 2.

## Complexity

Let R and C be the board dimensions.
Every cell is checked once with constant neighbor work, so time is O(R × C).
The algorithm uses O(1) auxiliary space beyond the board and the output count.
It does not allocate a queue or visited matrix.

## Edge cases

A board of dots contains zero ships.
A one-cell X is a complete ship and is counted.
A horizontal run is counted at its left end.
A vertical run is counted at its top end.

## Common mistakes

- Counting every X overcounts the cells inside a ship.
- Checking diagonal neighbors invents a relationship not present in the rules.
- Mutating the board is unnecessary for the predecessor method.
- Forgetting the top row or left column boundary checks causes invalid indexing.

## Language notes

Python computes explicit booleans for the two predecessor cells.
Java uses the same conditions and increments an int counter.
Both rely on the statement guarantee that ships do not touch in a way that makes predecessor tests ambiguous.
