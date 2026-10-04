## Intuition

An operator's value depends only on its children's evaluated values.
A postorder traversal therefore evaluates nested expressions naturally, returning one numeric result from each subtree.

## Brute force

Repeatedly rescanning the tree for operators whose children are ready would revisit nodes unnecessarily.
Recursive evaluation follows dependencies directly and computes every subtree once.

## Approach

Use `root.val` as an index into `kinds` and `nums`.
For kind num, return the corresponding numeric literal.
Otherwise recursively evaluate the children and combine their values using sum, product, maximum, or minimum.
The statement guarantees every operator has at least one child.
Sum begins from zero and product from one; extrema must use actual child values rather than an arbitrary zero baseline.
By induction, each child result equals its expression value, so applying the parent operator produces the correct subtree result.

## Walkthrough

```text
Input: root = [0, null, 1, 2, null, 3, 4, 5, null, 6, null, null, null, 7, 8, null, 9, 10], kinds = ["min", "max", "sum", "num", "num", "sum", "product", "num", "num", "num", "num"], nums = [0, 0, 0, 4, 6, 0, 0, 5, 7, 6, 8]
Output: 12
Explanation: min(max(4, 6, 5 + 7), 6 * 8) = 12.
```

Example 1 first evaluates the nested sum 5 + 7 to 12.
The surrounding maximum compares 4, 6, and 12, returning 12.
The other root branch computes the product 6 times 8 = 48.
The root minimum compares 12 and 48 and returns 12.
The arrays' zero entries for operator nodes are placeholders, not literal operands.

## Complexity

Both references visit each node once, giving O(n) arithmetic work.
Java combines children incrementally and uses O(h) stack space.
Python materializes child-result lists, which can require O(n) space overall in addition to recursion.

## Edge cases

A numeric root returns its value directly.
Negative child values matter for min and max initialization.
A one-child operator returns that child's value.

## Common mistakes

Do not interpret node.val itself as the numeric literal.
Initializing a product to zero destroys every product result.

## Language notes

Python uses built-in sum, min, and max on evaluated lists.
Java treats the first child specially for extrema and dispatches subsequent combinations through a helper.
