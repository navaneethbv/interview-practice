## Intuition

The visible value at each depth is the first existing node from left to right.
A level-order traversal preserving child order exposes that node at the front of every level.

## Brute force

Following only left-child links fails when a level's leftmost node lies inside a right subtree.
Collecting and sorting nodes by depth and position would add unnecessary bookkeeping.

## Approach

Start with the root as the first level when it exists.
Append the first node's value from the current level.
Construct or enqueue the next level by visiting current nodes left to right and adding each left child before its right child.
Continue until no nodes remain.
This ordering guarantees the first entry of every level is its leftmost real node, even when earlier branches end.
Missing children do not occupy visible positions.

## Walkthrough

```text
Input: root = [1, 2, 3, null, 5, null, 6, null, null, null, 7]
Output: [1, 2, 5, 7]
```

Example 1 has levels `[1]`, `[2, 3]`, `[5, 6]`, and `[7]`.
Selecting the first value from each gives `[1, 2, 5, 7]`.
The final 7 comes from the right-side branch, but it is still visible because no node exists farther left at that depth.
This is why a simple left-child walk would miss part of the answer.

## Complexity

Every node is processed once, giving O(n) time.
Level storage uses O(w) space for maximum tree width w, and the returned view uses O(h) space for tree height h.
Both are O(n) in the worst case.

## Edge cases

An empty tree returns an empty view.
A right-only chain shows every node.
Duplicate values remain separate level entries.

## Common mistakes

Enqueueing right children before left children computes the right view instead.
In the queue version, fix the current level size before adding children.

## Language notes

Python builds a new list for each level.
Java retains one queue and processes exactly its saved initial size for that level.
