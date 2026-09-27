## Intuition

When a path has already formed `path_number`, appending a digit `node.val` produces `path_number * 10 + node.val`.
The same rule works for a leading zero because decimal leading zeroes do not change the numeric value.
A path contributes to the answer only when its current node is a leaf.
An explicit stack carries each node together with the number formed above it.

## Brute force

A simple approach can build a digit string for every root-to-leaf path and convert it after reaching the leaf.
Copying the path string at every level can take O(N²) time on a skewed tree with N nodes.
It also creates temporary strings even though the decimal value can be updated incrementally.
The stack version carries one integer per pending path instead.

## Approach

1. Push the root with a previous path value of zero.
2. When removing a pair from the stack, calculate `current_number` by appending the current digit.
3. If the node is a leaf, add that number to `total`.
4. Otherwise, push each existing child with the current number as its parent value.
5. The Python and Java versions push the right child before the left child, so the left child is processed first, although the sum does not depend on traversal order.

## Walkthrough

For Example 1, the root 2 turns the initial value 0 into 2.
The left child 1 turns it into 21 and is a leaf, so 21 is added.
The right child 3 turns it into 23 and is a leaf, so 23 is added.
The final total is 44.
For Example 2, the root 0 gives 0, then the children form 1 and 2.
Their sum is 3 even though the root digit is zero.

## Complexity

Each of the N nodes is pushed and removed once, so the running time is O(N).
The explicit stack uses O(H) space for a tree of height H in a depth-first traversal.
The answer and path values fit the signed 32-bit result promised by the specification.

## Edge cases

A null root returns zero, although the provided tests contain at least one node.
A single node contributes its own digit.
A path containing zero digits still uses the same base-10 update.
An unbalanced tree is handled without relying on call-stack depth.

## Common mistakes

Do not add an internal node before reaching a leaf.
Do not pass only the parent digit, because all earlier digits are needed to form the number.
Do not treat a leading zero as invalid input.

## Language notes

The Python implementation stores `(node, path_number)` tuples.
The Java implementation uses parallel deques because the harness already provides the tree node type and collection imports.
The required method names and integer return type are unchanged.
