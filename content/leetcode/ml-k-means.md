# K-Means Clustering

Run Lloyd's k-means algorithm on 2-D `points` and return each point's cluster label.
Initialize centroid `j` to `points[j]` for `j < k`. Then repeat at most `iterations` times:
assign every point to the nearest centroid by squared Euclidean distance (the lower centroid index wins ties),
then move each centroid to the mean of its assigned points. A centroid with no points stays where it is.
Stop early when an assignment step changes no label.

Use only the standard library; the point is to implement the computation yourself.

## Constraints

- 1 <= k <= points.length <= 100
- 1 <= iterations <= 50
- -1000 <= coordinates <= 1000

## Examples

### Example 1

```text
Input: points = [[0, 0], [10, 10], [1, 0], [9, 10], [0, 1]], k = 2, iterations = 5
Output: [0, 1, 0, 1, 0]
Explanation: Points near the origin form cluster 0 and points near (10, 10) form cluster 1.
```

### Example 2

```text
Input: points = [[1, 1], [1, 1], [5, 5]], k = 2, iterations = 3
Output: [1, 1, 0]
Explanation: Both centroids start at (1, 1), so ties put every point in cluster 0. Cluster 1 keeps its centroid at (1, 1) and takes back the duplicates once cluster 0 moves toward (5, 5).
```
