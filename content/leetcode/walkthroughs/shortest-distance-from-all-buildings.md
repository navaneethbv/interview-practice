## Intuition

Run BFS from each building across empty land.
Accumulate distance and reachable-building count at every empty cell, then choose a cell reached from every building.

## Brute force

Trying every empty cell as a source and searching to each building repeats many traversals.
The building-centered BFS shares the candidate evaluation across all empty cells.

## Approach

1. Create distance and reach matrices.
2. BFS from each building through cells with value zero.
3. Add each shortest distance and increment its reach count.
4. Return the minimum accumulated distance among cells reached by all buildings.

## Walkthrough

Example 1:

For [[1,0,1]], BFS from the left building adds distance 1 to the middle cell.
BFS from the right building adds another distance 1.
The middle cell is reached by both buildings with total distance 2, so the answer is 2.

## Complexity

With B buildings and a grid of R times C cells, the BFS work is O(BRC).
Distance, reach, and each BFS visited structure use O(RC) space.
Python's deque and set hold the current traversal, while Java uses primitive matrices and an ArrayDeque.

## Edge cases

If no empty cell reaches every building, return -1.
Buildings and walls are never enqueued as walking cells.
A single building uses the nearest empty cell distance.

## Common mistakes

Reset visited state for each building.
Do not add a building's position as an empty-land candidate.
Require reach count to equal the total number of buildings.

## Language notes

Python tracks visited coordinates as tuples.
Java stores row, column, and distance in small primitive arrays.
