## Intuition

Connecting every point with minimum total Manhattan distance is a minimum spanning tree problem.
Prim's algorithm grows one connected component and keeps the cheapest edge that can attach each unused point.
The next point with the smallest best edge is always safe to add.

## Brute force

Building all O(n²) point-to-point edges and sorting them for Kruskal's algorithm costs O(n² log n) time and O(n²) edge space.
Dense Prim's algorithm computes distances as needed and reaches the minimum tree in O(n²) time with O(n) extra space.
## Approach

1. Initialize best_edge to infinity and set point zero's cost to zero.
2. Repeatedly choose the unused point with the smallest best_edge.
3. Add its edge cost to total_cost and mark it connected.
4. Compare that point with every unconnected point and update their cheapest known edge.
5. Return total_cost after all points are connected.

The distance between two points is the absolute row difference plus the absolute column difference.
No explicit edge list is needed because every pairwise distance can be computed when an endpoint joins the tree.

## Walkthrough

Example 1 uses points = [[0, 0], [2, 0], [2, 3]].

| chosen point | best edge cost | updates |
| ---: | ---: | --- |
| 0 | 0 | point 1 gets 2, point 2 gets 5 |
| 1 | 2 | point 2 improves to 3 |
| 2 | 3 | all points connected |

The total is 0 + 2 + 3 = 5.

## Complexity

Let n be the number of points.
The implementation scans all unused points to choose one and all points to update edges in every round.
Its time is O(n²), and best_edge, connected, and the loop state use O(n) auxiliary space.

## Edge cases

One point needs no edge and returns zero.
Negative coordinates work because Manhattan distance uses absolute differences.
Equal edge costs can produce different trees with the same total cost.
Duplicate coordinates have distance zero and can be connected at no cost.

## Common mistakes

- Adding every edge greedily without tracking connectivity can create cycles.
- Using Euclidean distance changes the required metric.
- Forgetting to update all unconnected points misses a cheaper future edge.
- Adding the first point's artificial zero edge to the wrong total does not affect the answer, but omitting later edges does.

## Language notes

Python uses best_edge with a generator and min to choose the next point.
Java separates selection and edge updates into helpers for readable loops.
Both implement the dense O(n²) version of Prim's algorithm.
