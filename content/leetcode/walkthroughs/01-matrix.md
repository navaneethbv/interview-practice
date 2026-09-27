## Intuition

Distance to the nearest zero is shortest-path distance on a grid with unit edges.
Starting BFS simultaneously from every zero means the first time a one is reached is its shortest distance.
A multi-source queue avoids running a separate search from every cell.

## Brute force

A BFS from each one can revisit the whole matrix for every cell, taking quadratic time in the number of cells.
One multi-source BFS visits each cell once.

## Approach

1. Set zero cells to distance 0 and enqueue all of them.
2. Set every one cell to -1 as unvisited.
3. Remove cells from the queue in increasing distance order.
4. For each unvisited neighbor, assign current distance plus one and enqueue it.
5. Return the distance matrix.

## Walkthrough

Example 1 uses mat = [[0, 1], [1, 1]].
The queue starts with the zero at (0,0), whose distance is 0.
It enqueues (1,0) and then (0,1), both with distance 1.
When (1,0) is removed, it assigns distance 2 to (1,1).
The later visit from (0,1) leaves that already discovered distance unchanged.
The returned matrix is [[0,1],[1,2]].

## Complexity

- Time: O(rows × columns), because each cell enters and leaves the queue once.
- Space: O(rows × columns), for the output matrix and queue.

## Edge cases

An all-zero matrix returns zeros immediately.
A one-row or one-column matrix uses the same four-direction checks.
Multiple zeros compete naturally because the nearest source reaches first.
The guarantee of at least one zero ensures no -1 remains.

## Common mistakes

- Starting from ones reverses the search direction.
- Marking a cell only when dequeued can enqueue it repeatedly.
- Using diagonal moves changes the distance metric.
- Forgetting to initialize every zero as a source increases distances.

## Language notes

Python yields valid neighbors with a helper.
Java stores distance and queue entries in arrays and uses step arrays.
