## Intuition
A legal route must remember which cells it has already used, because revisiting even one cell invalidates the walk.
Backtracking explores each possible next step, while a remaining-cell count determines whether reaching the end completes a valid route.
The small limit of twenty grid cells makes this exhaustive search practical.

## Brute force
Enumerate sequences of four-direction moves of length up to N and check afterward whether each visits every allowed cell exactly once.
This has a loose O(N*4^N) bound with repeated route validation.
Backtracking rejects obstacles and repeated cells immediately and checks completion using one counter.

## Approach
1. Scan the grid to locate the start and count all non-obstacle cells in `remaining`.
2. Reject recursive calls outside the grid or on a blocked cell.
3. At the end cell, contribute one only when exactly that cell remains unvisited.
4. Otherwise save the current cell value and temporarily mark the cell as blocked.
5. Sum all four neighboring searches with one fewer remaining cell, then restore the saved value.

Restoration is essential: a cell used by one candidate route must remain available to a different candidate route.
The end is never used as a passage to another cell, since a valid route must stop there.

## Walkthrough
Example 1 is `[[1,0,2]]`.
There are three non-obstacle cells, and the start is `(0,0)`.
Marking the start leaves two cells for the next call at `(0,1)`.
That cell is marked before moving right to the end with `remaining = 1`.
This route contributes one.
The other directions leave the board or revisit the temporarily blocked start, so they contribute zero.
Both modified cells are restored as the recursive calls return, and the final count is one.

## Complexity
Scanning an R by C grid costs O(RC).
With N non-obstacle cells, a conservative search bound is O(4^N), with constant work per attempted move.
The recursion stack uses O(N) auxiliary space; the input grid itself records visited cells and is restored before returning.

## Edge cases
Reaching the end too early contributes zero.
An obstacle can disconnect an unvisited region and eliminate every complete route.
A direct start-to-end step succeeds when those are the only non-obstacle cells.

## Common mistakes
- Counting any arrival at the end ignores the visit-every-cell requirement.
- Forgetting restoration contaminates later branches.
- Decrementing the counter twice for one cell causes valid routes to fail.

## Language notes
Python uses a class helper and Java a private method for recursive exploration.
The recursion depth is bounded by the local twenty-cell limit, so deep-tree recursion concerns do not apply here.
