## Intuition
The walk expands by one step after every two directions: east, south, west, north.
The path may leave the grid, but every in-bounds coordinate is appended in visit order.

## Brute force
A naive method could repeatedly search the grid for the next unlisted cell.
That loses the required spiral ordering and can take O((RC)^2) time for R by C cells.
Simulating the prescribed path visits every needed coordinate once, along with outside positions on the expanding spiral.

## Approach
1. Append the starting coordinate.
2. Walk two sides at the current step length.
3. Append only coordinates inside the grid.
4. Increase the step length and repeat until R times C coordinates are collected.

## Walkthrough
Example 1 has one row and three columns, starting at `(0,0)`.
The initial coordinate `[0,0]` is recorded.
The first east step reaches `[0,1]`, which is inside the grid and is recorded.
The south leg of length one reaches `(1,1)` outside the grid.
The west leg of length two reaches `(1,0)` and `(1,-1)`, both outside.
The north leg of length two reaches `(0,-1)` and `(-1,-1)`, both outside.
The east leg of length three reaches `(-1,0)`, `(-1,1)`, and `(-1,2)`, all outside.
The next south leg reaches `(0,2)`, which is recorded and completes the output.

## Complexity
The returned output contains RC coordinate pairs, so output storage is O(RC).
Let M = max(R, C).
The expanding path can travel through O(M^2) outside coordinates before collecting the final in-bounds cells, so simulation time is O(M^2).
Python stores list pairs directly, while Java stores temporary coordinate arrays before copying their references into the result array.

## Edge cases
A one-cell grid returns the start immediately.
The walk can leave the board and later reenter it.
The starting coordinate is always inside the grid by the local contract.

## Common mistakes
Stopping after the first outside move misses later cells.
Increasing the step length after every direction produces the wrong spiral.
Appending outside coordinates violates the output contract.

## Language notes
Python returns a list of two-element lists.
Java accumulates `int[]` coordinate pairs and returns an `int[][]` with the same order.
