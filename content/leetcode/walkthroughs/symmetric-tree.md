## Intuition

Two subtrees are mirror images when their roots have equal values and their opposite children are mirrors.
The stack stores pairs that must be compared, so the algorithm checks structure and values together.
Comparing nullness before child fields handles missing mirrored nodes cleanly.

## Brute force

Serializing the left subtree and a separately mirrored right subtree then comparing strings takes O(n) time and O(n) representation space.
Copying and reversing a subtree also creates avoidable nodes, while paired traversal can compare the original nodes directly.

## Approach

1. Push `(root.left, root.right)` onto `stack`.
2. Pop a pair as `left_node` and `right_node`.
3. If exactly one is null, return false; if both are null, continue.
4. Compare values, then push `(left_node.left, right_node.right)` and `(left_node.right, right_node.left)`.
5. Return true when every pair has passed.

## Walkthrough

Example 1 uses `[1, 2, 2, 3, 4, 4, 3]`.

| pair compared | result | new pairs |
| --- | --- | --- |
| roots 2 and 2 | equal | `(3, 3)`, `(4, 4)` |
| inner children 4 and 4 | equal | two `(null, null)` pairs |
| outer children 3 and 3 | equal | two `(null, null)` pairs |

The table follows Python and lists non-null comparisons; the stack processes the null pairs between these comparisons.
Every null pair matches, so the tree is symmetric.

## Complexity

- Time: O(n), because each tree node participates in one mirrored pair comparison.
- Space: Python uses O(h) for its depth-first stack, while Java uses O(w) for its breadth-first queue, where h is height and w is maximum level width.
Both are bounded by O(n).

## Edge cases

A single-node root has two null children and is symmetric.
One null child paired with a real node immediately fails.
Equal values with different shapes still fail at the nullness check.
Negative values compare just like positive values.

## Common mistakes

- Comparing left children with left children checks equality rather than reflection.
- Checking values before nullness can dereference a missing node.
- Comparing only traversal values can miss structural differences.

## Language notes

Python stores node pairs as tuples in a list stack.
Java stores pairs in `TreeNode[]` arrays inside an `ArrayDeque`.
The Java queue never inserts a null array, so only the array elements represent missing children.
