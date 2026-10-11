## Intuition

K-means minimizes the total squared distance from points to their centroids by alternating two steps that each can only lower that cost: choosing the best centroid for every point, and choosing the best point (the mean) for every cluster.

## Approach

1. Start with the first k points as centroids and every label at -1.
2. Assignment: give each point the index of its nearest centroid, breaking ties by lower index; note whether any label changed.
3. Stop if nothing changed.
4. Update: move each non-empty cluster's centroid to the mean of its points.
5. Repeat up to the iteration limit.

## Walkthrough

In Example 1, centroids start at (0, 0) and (10, 10). The first assignment puts (0, 0), (1, 0) and (0, 1) in cluster 0 and the others in cluster 1. The centroids move to (1/3, 1/3) and (9.5, 10), the next assignment changes nothing, and the labels are `[0, 1, 0, 1, 0]`.

## Complexity

- Time: O(iterations * n * k).
- Space: O(n + k).

## Edge cases

- Duplicate points can make two centroids identical; ties then go to the lower index, leaving the other cluster empty.
- An empty cluster keeps its centroid instead of dividing by zero.
- k equal to n gives every point its own cluster.

## Common mistakes

- Updating centroids while still assigning points, which mixes old and new centroids.
- Breaking ties by the later index.
- Using integer division for the means.
