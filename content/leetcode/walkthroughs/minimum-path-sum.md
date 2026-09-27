## Intuition

A path can enter each cell only from above or from the left.
The cheapest route to a cell is its value plus the smaller cheapest route reaching one of those predecessors.
A one-dimensional dynamic-programming row stores those costs while scanning the grid.

## Brute force

A recursive method could branch down and right from every cell.
Without memoization, the same suffix paths are recomputed exponentially many times.
The dynamic program computes each cell once and keeps only one row of costs.

## Approach

1. Initialize each column cost to infinity and set the first cost to zero.
2. Scan rows from top to bottom.
3. For each cell, read its previous top cost and the updated left cost.
4. Replace the column cost with the cell value plus the smaller predecessor cost.
5. Return the final column cost after the last row.

## Walkthrough

Example 1 is [[1,3,1],[1,5,1],[4,2,1]].
After the first row, costs are [1,4,5].
The second row updates them to [2,7,6].
The final row updates them to [6,8,7], so the minimum path sum is 7.
That cost follows 1,3,1,1,1 from the top-left to the bottom-right.

## Complexity

For R rows and C columns, every cell is processed once, giving O(RC) time.
The one-dimensional cost array uses O(C) auxiliary space.
The grid is updated only through separate costs, so its input values remain unchanged.
The returned minimum is a scalar.

## Edge cases

A one-cell grid returns its cell value.
A single row or column has only one possible path.
Positive cell values make the predecessor minimum valid without cycle concerns.
The nonempty rectangular-grid contract makes grid[0] available.

## Common mistakes

- Reading the left cost before updating it uses the previous row instead of the current row.
- Initializing every cost to zero allows paths to enter from outside the grid.
- Returning the last row's raw value ignores earlier route costs.
- Using a full table is correct but allocates more than the one-row reference.

## Language notes

Python uses infinity for unreachable top positions.
Java uses Integer.MAX_VALUE as the same sentinel under the bounded sum contract.
Both references keep the column costs aligned with the current row.
