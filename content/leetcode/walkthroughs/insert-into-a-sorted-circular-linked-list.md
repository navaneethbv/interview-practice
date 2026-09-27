## Intuition

A sorted circle has ordinary nondecreasing edges and, unless all values are equal, one edge from the maximum back to the minimum.
A new value either belongs between ordinary neighbors or at this wraparound edge.
The supplied `head` is only a starting point, so the search must preserve it and stop after one full circuit.

## Brute force

Copying all values into an array, inserting the new value, and sorting costs O(n log n) time and O(n) space.
Rebuilding nodes also risks violating the requirement to preserve the original list and head.
The existing cyclic order lets us find an insertion edge directly in one traversal.

## Approach

1. If `head` is absent, create a node and link it to itself.
2. Starting at `head`, inspect `node` and `node.next`.
3. Accept an ordinary edge when `node.val <= insertVal <= node.next.val`.
4. Accept a decreasing edge when the new value is at least its maximum or at most its minimum.
5. If no edge is accepted before returning to `head`, insert there; this covers equal-valued circles.
6. Link one new node between the selected neighbors and return the unchanged original head.

## Walkthrough

Example 1 starts at `head = [3,4,1]` and inserts 2.

| Edge examined | Decision |
| --- | --- |
| `3 -> 4` | 2 is outside the ordinary interval |
| `4 -> 1` | 2 is neither at least 4 nor at most 1 |
| `1 -> 3` | 2 belongs between these values |

The new node points to the old node containing 3, and the node containing 1 points to the new node.
Traversing from the original head now gives `[3,4,1,2]`.

## Complexity

- Time: O(n), because at most one complete circuit is examined.
- Space: O(1), with a constant number of pointers and one required output node.

## Edge cases

An empty list becomes a self-loop.
A one-node list accepts insertion without special comparisons beyond the general loop.
Duplicate values may fit more than one valid edge.
When every value is equal and the inserted value differs, any edge can become the unique wraparound boundary.

## Common mistakes

- Waiting for a null pointer never terminates in a valid circular list.
- Returning the minimum node changes the required original head.
- Forgetting the decreasing edge rejects new extrema.

## Language notes

Python uses object identity with `is` to detect the completed circuit; Java uses reference equality.
The harness provides `Node`, including its two-argument constructor.
Both versions compare values directly, avoiding overflow-prone subtraction of signed integer extremes.
