## Intuition

The neighbor count depends on shortest paths, not just direct edges.
Floyd-Warshall progressively allows each city as an intermediate point, after which every pair distance is available for threshold counting.

## Brute force

Running a separate shortest-path search from every city is valid, but it repeats setup and can be less direct for the dense `n <= 100` bound.
Floyd-Warshall computes all pairs in a regular cubic loop.

## Approach

1. Initialize `distances` with zero diagonals, edge weights, and infinity elsewhere.
2. For each `middle`, relax every `first` to `second` path through it.
3. Count other cities within `distanceThreshold` for each city.
4. Update the answer on `<=` so a tie replaces the previous city with the larger index.

## Walkthrough

For Example 1, edges are `0-1` with weight 3, `1-2` with 1, `1-3` with 4, and `2-3` with 1.
The shortest paths show cities 0 and 3 have the fewest reachable neighbors within threshold 4.
City 3 has the larger index, and the `<=` tie rule replaces city 0 with 3.
The result is `3`.

## Complexity

Floyd-Warshall takes `O(n^3)` time, and counting neighbors adds `O(n^2)`.
The distance matrix uses `O(n^2)` space.

## Edge cases

With no edges, every city has zero neighbors and the largest index wins.
The diagonal is excluded from counts even though each city has distance zero to itself.

## Common mistakes

- Counting direct edges instead of shortest paths misses indirect routes.
- Using `<` when comparing counts keeps the smaller index on ties, violating the rule.
- Counting the diagonal makes every city's neighbor count at least one.

## Language notes

Python uses floating infinity for absent paths, while Java uses a large integer sentinel.
The Java sentinel is far above any possible path under the local bounds, so additions remain safe.
