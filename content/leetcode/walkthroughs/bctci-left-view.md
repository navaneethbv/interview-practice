## Intuition

The left view contains the first existing node on each level, even when that node belongs to a right subtree.
A breadth-first traversal already groups nodes by depth; preserving left-to-right order makes each level's first value the required answer.

## Brute force

One could record every node with its depth and position, then sort or group all records.
That uses extra storage and processing when the traversal itself can preserve the desired order directly.

## Approach

Python keeps the current `level` as an ordered list.
Append its first node's value to `view`, then construct the next level by visiting each parent's left child before its right child.
Java instead keeps a queue, records its front value, and processes exactly the queue size measured at that level's start.
Children appended during those removals form the next level.
Both approaches prevent nodes from different depths from being mixed when selecting the visible value.

## Walkthrough

Example 1 starts with root 1, so the first view value is 1.
The next level is `[2, 3]`, contributing 2.
Their existing children form `[5, 6]`, contributing 5.
The last level contains only 7, reached below the right-hand branch, so it contributes 7.
The returned view is `[1, 2, 5, 7]`.

## Complexity

Each of n nodes is visited once, giving O(n) time.
The level storage or queue uses O(w) auxiliary space for maximum tree width w.
The result uses O(h) space for the number of nonempty levels.

## Edge cases

An empty tree returns an empty list.
A chain contributes every node, even when all edges point right.
Missing left children do not end the traversal.

## Common mistakes

Do not simply follow root.left repeatedly.
In Java, do not use the changing queue size as the bound while adding children.

## Language notes

Python's comprehension filters null children while preserving parent and child order.
Java's `ArrayDeque` rejects null entries, so both child insertions have explicit null checks.
