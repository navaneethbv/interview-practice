## Intuition

Connecting `n` computers needs at least `n - 1` cables.
When that count exists, every redundant edge inside a component can be moved to connect two components, so only the component count matters.

## Brute force

Trying possible cable reconnections directly creates many equivalent choices.
Disjoint set union counts components while processing the existing edges in near-linear time.

## Approach

1. Return `-1` immediately when fewer than `n - 1` cables exist.
2. Make each computer its own union-find parent.
3. Union the endpoints of each connection, decreasing `components` only when their roots differ.
4. Connect the remaining components with `components - 1` moved cables.

## Walkthrough

For Example 1, computers 0, 1, and 2 form a triangle, while 3 is isolated.
The first two useful edges reduce four components to two.
The third edge joins already connected computers and is redundant.
Moving that redundant edge to computer 3 needs one operation.

## Complexity

Union by component size with path compression processes `c` connections in `O((n + c) alpha(n))` amortized time.
The parent array uses `O(n)` space.

## Edge cases

When at least `n - 1` cables exist, redundant cables can be moved between any components, so even a disconnected arrangement can be fixed in `components - 1` operations.
For `n = 1`, no operation is needed.

## Common mistakes

- Counting edges rather than redundant edges misses disconnected components.
- Decreasing the component count for an edge inside one component overestimates available reconnections.
- Forgetting the early cable-count check can claim an impossible result.

## Language notes

Python uses a nested `find` closure over the parent list, while Java uses a private helper.
Both apply path compression and preserve the original connection contract.
