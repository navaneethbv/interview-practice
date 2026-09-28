## Intuition

The number of leading hyphens gives a node's depth.
A stack stores the path from the root to the previous node, so removing entries deeper than the new depth exposes the new node's parent.

## Brute force

Searching the partially built tree for every parsed node can become quadratic on a skewed tree.
The depth stack finds the parent in O(1) amortized work.

## Approach

1. Read a run of hyphens and then the following integer.
2. Pop the stack until its size equals the node depth.
3. Attach the new node as the parent's left child when empty, otherwise its right child.
4. Push the node and continue.

## Walkthrough

For Example 1, the root `1` is depth 0, `2` is depth 1, and `3` and `4` are depth 2 children under 2.
When `5` at depth 1 appears, the stack pops back to the root and attaches 5 as its right child.
The later depth-2 nodes attach below 5, producing the expected level order.

## Complexity

For encoded length L, parsing and stack operations take O(L) time.
The stack uses O(h) nodes for tree height h, and the returned tree uses O(n) nodes.
Python splits parsing into depth and value helpers; Java scans the same characters inline.

## Edge cases

The root has no hyphens.
A one-child node is attached left under the valid encoding rule.
Values may contain multiple digits up to one billion.

## Common mistakes

Pop until stack size equals depth, not depth plus one.
Attach before pushing the new node.
Read all digits of a value before processing the next depth marker.

## Language notes

Both references use the provided `TreeNode` helper.
Python returns the first stack node after parsing; Java returns `stack.get(0)`.
