## Intuition

A binary search tree orders entire subtrees relative to their root values.
When a node is at or below the lower bound, its left subtree cannot contribute; when it is at or above the upper bound, its right subtree cannot contribute.
This lets an ordinary traversal skip branches while still including the interval endpoints.

## Brute force

Traverse every node and add its value only when it lies inside the interval.
This takes O(n) time regardless of how narrow the requested range is.
Using the BST ordering can avoid irrelevant subtrees, although the worst case still visits all nodes.

## Approach

1. Initialize `stack` with the root and `total` with zero.
2. Pop a node and add its value when `low <= node.val <= high`.
3. Schedule its left child only when `node.val > low`.
4. Schedule its right child only when `node.val < high`.
5. Continue until no scheduled nodes remain, then return the total.

Strict branch comparisons are safe because node values are distinct.
The explicit stack avoids depending on the call-stack depth for a skewed tree.

## Walkthrough

Example 1 has `root = [10,5,15,3,7,null,18]`, `low = 7`, and `high = 15`.
Both references push left before right, so the right branch is processed first.

| Node | Action | Total |
| --- | --- | --- |
| 10 | include; schedule both branches | 10 |
| 15 | include; skip its right branch | 25 |
| 5 | exclude; skip its left branch | 25 |
| 7 | include | 32 |

Nodes 18 and 3 are excluded without visiting them because their subtrees are outside the range.
The returned sum is 32.

## Complexity

- Time: O(n) worst case; pruning can reduce the number of visited nodes.
- Space: O(h) for pending traversal nodes, where h is the tree height, and O(n) as a worst-case bound.

## Edge cases

Equal bounds select a single matching value if present.
A range outside all values returns zero.
A range covering the whole tree visits and includes every node.
A long chain remains safe because traversal is iterative in both languages.

## Common mistakes

- Using strict comparisons for inclusion drops values equal to either bound.
- Pruning without the BST guarantee is invalid for an arbitrary binary tree.
- Assuming O(log n) time ignores wide ranges and unbalanced trees.

## Language notes

Python may push null child references and skips them when popped.
Java checks children before pushing because `ArrayDeque` disallows null.
The given maximum node count and values bound the total by two billion, within Java `int`.
