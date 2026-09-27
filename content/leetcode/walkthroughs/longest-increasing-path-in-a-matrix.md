## Intuition

Every move goes to a strictly larger value, so the grid is a directed acyclic graph.
A cell can begin a path only after all smaller neighboring cells have been removed.
The queue processes cells in layers, where a cell's layer is one more than the largest layer among its smaller neighbors.

## Brute force

Starting a fresh depth-first search from every cell can take exponential time because each cell may branch to several neighbors.
Memoized DFS reduces the repeated work, but it still stores one result per cell and visits each edge.
The topological layer method used here has the same optimal asymptotic bounds while making the path length a queue level.

## Approach

1. Compute each cell's indegree, counting adjacent cells with smaller values.
2. Add all zero-indegree cells to the queue.
3. Remove one whole queue layer at a time.
4. For each removed cell, decrement the indegree of every larger neighbor.
5. Enqueue a neighbor when its indegree becomes zero, then return the number of layers.

## Walkthrough

Example 1 uses matrix = [[1, 2], [4, 3]].

| Layer | Cells removed | Newly available cells |
| --- | --- | --- |
| 1 | (0, 0) with value 1 | (0, 1) |
| 2 | (0, 1) with value 2 | (1, 1) |
| 3 | (1, 1) with value 3 | (1, 0) |
| 4 | (1, 0) with value 4 | none |

The four queue layers form the longest path length 4.

## Complexity

- Time: O(rows × columns), because each cell and each of its at most four edges is processed a constant number of times.
- Space: O(rows × columns), for indegree and the queue.

## Edge cases

A one-cell matrix starts in the queue and returns 1.
Equal neighbors do not create edges, so an all-equal matrix returns 1.
A row or column matrix is handled by the same bounded-neighbor checks.
Large values are compared directly without arithmetic on their magnitudes.

## Common mistakes

- Counting smaller neighbors in the wrong direction makes the queue start at peaks.
- Mixing queue levels loses the meaning of path_length.
- Allowing diagonal neighbors changes the graph.
- Treating equal values as increasing creates invalid paths.

## Language notes

Python yields valid neighbors through the _neighbors helper.
Java uses parallel step arrays and an isInside helper.
Both versions use Deque or deque as a level queue.
