## Intuition

The visible node at a depth is the last existing node when that level is listed from left to right.
It need not be reached by following only right-child pointers.
Breadth-first traversal makes each level available as a separate sequence.

## Brute force

One alternative scans the entire tree separately for each requested depth and remembers the rightmost match.
That costs O(nh) time for n nodes and height h, reaching O(n²) on a chain.
A single traversal avoids those repeated scans.

## Approach

1. Use breadth-first search with `level` containing the root, or an empty list for an empty tree.
2. Append the value of the final node in `level` to `result`.
3. Build the next level by visiting current nodes in order and appending each left child before its right child.
4. Replace `level` with the resulting children and repeat until no nodes remain.

The initial level is ordered trivially.
Appending children from left to right preserves that order at each later depth, so the final entry is always the visible one.
Missing children are omitted instead of occupying placeholder positions.

## Walkthrough

Example 1 is `[1, 2, 3, 4]`, with node 4 as the left child of node 2.

| `level` values | Appended value | Next level | `result` |
| --- | --- | --- | --- |
| `[1]` | 1 | `[2, 3]` | `[1]` |
| `[2, 3]` | 3 | `[4]` | `[1, 3]` |
| `[4]` | 4 | `[]` | `[1, 3, 4]` |

Although 4 belongs to the root's left subtree, nothing at its depth blocks the view.

## Complexity

- Time: O(n), because every node contributes its children exactly once.
- Space: O(w) auxiliary storage for adjacent levels, where w is maximum width, plus O(h) for the returned values.

## Edge cases

An empty root produces an empty result without indexing a level.
A chain exposes every node, whether its links go left or right.
Duplicate values are preserved when visible at different depths; this is a positional view, not a set of distinct values.

## Common mistakes

- Following only right pointers misses visible nodes in left subtrees.
- Adding right children first reverses the invariant used to choose the last node.
- Appending to the level currently being iterated mixes depths.

## Language notes

Python uses lists and `level[-1]`; Java uses `ArrayList` and `level.get(level.size() - 1)`.
Java's `nextLevel` helper isolates child collection, while Python keeps the same operation inside the main method.
Both avoid recursive call-stack growth.
