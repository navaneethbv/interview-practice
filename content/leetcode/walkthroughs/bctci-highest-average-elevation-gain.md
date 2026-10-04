## Intuition

The average belongs to an entire connected component, so first determine component membership.
Only after all unions are complete should edge gains be accumulated.
Otherwise later component merges would require carefully merging partial totals too.

## Brute force

For each component, repeatedly search the full edge list to find incident vertices and gains.
A direct implementation can redo substantial work for many vertices or components.

## Approach

Initialize `parent` so every vertex is its own disjoint-set root.
For every edge, union its endpoints by attaching one root to the other.
The `find` helper shortens paths by pointing each visited node to its grandparent.
Make a second edge pass and use the final root of either endpoint as the aggregation key.
Add the gain to `totals[root]` and one to `counts[root]`.
Take the maximum of total divided by count.
Initialize the answer to zero, which also covers isolated vertices because all gains are nonnegative.

## Walkthrough

Example 1 has four edges linking all four vertices into one component.
The second pass counts each input edge once, accumulating gains `3 + 2 + 1 + 2 = 8`.
Its edge count is 4, so its mean is `8 / 4 = 2.0`.
There is no other component with a larger mean, and the returned result is 2.0.

## Complexity

Space is O(V) for parents and component aggregates.
This reference uses path compression without union by rank; a conservative amortized time bound is O((V + E) log V), rather than claiming the ranked-union inverse-Ackermann guarantee.

## Edge cases

With no edges, all components have average zero.
A component's denominator counts edges, not vertices, including every input edge exactly once.

## Common mistakes

Do not average component averages together.
Do not count both directions of an undirected adjacency representation when the original edge list already stores each edge once.

## Language notes

Python dictionaries store only roots with edges.
Java uses long arrays for potentially large sums and converts to double before division, preventing integer truncation.
