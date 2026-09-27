## Intuition

A breadth-first traversal visits nodes in increasing distance from the root.
If each iteration processes exactly one level, its values can be appended as one result list.
Adding left children before right children preserves the required left-to-right order within the next level.

## Approach

1. Initialize the current `queue` with the root, or return an empty result for a null root.
2. Collect the values of every node belonging to the current level.
3. Add each node's nonnull left child and then its nonnull right child to the next level.
4. Append the collected values to `result`.
5. Repeat until no nodes remain.

Level separation is the important invariant.
Python uses a new list for each level, while Java records the queue's starting `width` before consuming it.
Children appended during that Java iteration belong to the following level and must not be included in the current width.
There is no need for a separate brute-force strategy for this direct traversal task.

## Walkthrough

Example 1 represents `[6, 2, 8, null, 4]`.

| Current nodes | Values appended | Next-level nodes |
| --- | --- | --- |
| Root 6 | `[6]` | 2, 8 |
| 2 and 8 | `[2, 8]` | 4 |
| 4 | `[4]` | None |

The missing left child of node 2 contributes no value or placeholder to the output.
The returned result is `[[6], [2, 8], [4]]`.
This differs from the fixture's flat level-order encoding because the requested output groups values by depth.

## Complexity

- Time: O(n), visiting each node once.
- Space: O(n) for the output plus O(w) traversal storage, where w is the maximum level width.

## Edge cases

An empty tree yields an empty outer list.
A singleton yields one inner list containing one value.
Sparse levels include only existing nodes.
Repeated values remain repeated because nodes, not unique values, are being traversed.

## Common mistakes

- Processing a dynamically growing queue without a level limit merges several depths.
- Enqueuing right children first reverses the required order within some levels.
- Returning one flat list loses the depth grouping.

## Language notes

Python's next-level comprehension builds a separate list after reading current values.
Java's `readLevel` helper removes exactly the saved number of nodes from `ArrayDeque` and appends their children at the back.
Both avoid recursion and retain the same left-before-right ordering.
