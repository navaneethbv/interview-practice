## Intuition

Each new land cell starts as one island, then may connect several existing islands.
Disjoint set union keeps the connected component representative for every land cell, so every successful union reduces the count by one.

## Brute force

After every addition, breadth-first search could visit all land cells and recount components.
With up to 10,000 additions, repeatedly scanning a grid can cost `O(kmn)`, which is wasteful when only local neighbors changed.

## Approach

1. Store only land cells in `parent`, keyed by their `(row, column)` coordinates.
2. For a new coordinate, make it its own parent and increment `island_count`.
3. Check its four edge neighbors, and union any neighboring land roots that differ.
4. Decrement the count once per successful union and append the current count.
5. If a coordinate already exists, append the unchanged count.

## Walkthrough

For Example 1, `m = 2`, `n = 2`, and positions are `[(0, 0), (1, 1), (0, 1)]`.

| addition | new component work | island count |
| --- | --- | --- |
| (0, 0) | create its own root | 1 |
| (1, 1) | create a separate root | 2 |
| (0, 1) | create root, union with (0, 0), union with (1, 1) | 1 |

The result is `[1, 2, 1]`.

## Complexity

With path compression and union by component size, each union-find operation is amortized `O(alpha(k))`, so all updates take `O(k alpha(k))` time.
The parent map stores `O(k)` land cells, and the output also stores `O(k)` counts.

## Edge cases

Repeated positions do not create a new root or change the count.
An addition at a corner has only two valid neighbors, and an addition can merge more than two prior components.

## Common mistakes

- Decrementing once for every neighboring land cell overcounts when those neighbors already share a root.
- Treating diagonal contact as connected violates the shared-edge rule.
- Allocating an `m` by `n` array is unnecessary when the coordinate bounds are large and additions are sparse.

## Language notes

Python uses tuple coordinates as dictionary keys, while Java packs a cell as `row * n + column` in a `Map<Integer, Integer>`.
Both references use path compression, and Java uses `long` for no arithmetic here because packed indices stay within the stated grid dimensions.
