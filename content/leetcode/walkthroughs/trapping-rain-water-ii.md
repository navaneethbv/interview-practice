## Intuition

Water can escape through the lowest boundary surrounding an interior cell.
Process boundary cells from lowest to highest with a min heap.
The current boundary level determines how much water a newly discovered neighbor can hold.

## Brute force

For every interior cell, repeatedly searching its surrounding boundary can revisit large portions of the map.
A per-cell flood simulation can take O(R squared C squared) or worse.
The heap frontier shares boundary work and visits each cell once.

## Approach

1. Add every boundary cell to a min heap and mark it visited.
2. Remove the lowest boundary cell.
3. Inspect its four unvisited neighbors.
4. Add water up to the current boundary level and push the neighbor at the raised level.
5. Continue until every cell has been processed.

## Walkthrough

Example 1 is a 3 by 3 map with boundary height 3 and center height 1.
All eight boundary cells enter the heap at level 3.
The center is reached from a boundary at level 3, so it traps 3 minus 1, which is 2.
The heap then empties and the method returns 2.

## Complexity

For R rows and C columns, each cell enters and leaves the heap once.
Heap operations give O(RC log(RC)) time.
The visited structure and heap use O(RC) auxiliary space.
The returned water amount is one integer.

## Edge cases

A map with no interior cells traps no water.
A boundary lower than an interior cell raises no water there.
Each cell is marked before insertion so it is processed once.
The statement supplies a rectangular map with valid boundary dimensions.

## Common mistakes

- Starting with only corners misses boundary leaks.
- Marking a cell after popping allows duplicate heap entries.
- Using the cell height instead of the current boundary level undercounts water.
- Processing neighbors without a min heap can seal a cell behind a higher boundary incorrectly.

## Language notes

Python stores visited coordinates in a set and heap tuples.
Java uses a boolean grid and a priority queue of integer triples.
Both raise the propagated level to the larger of boundary and neighbor height.
