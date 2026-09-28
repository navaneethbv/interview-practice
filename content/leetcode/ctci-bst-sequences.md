# BST Sequences

A binary search tree was built by inserting distinct values one at a time into an initially empty tree.
Given the resulting tree, return every insertion order that could have produced exactly this tree.
The sequences may be returned in any order.
An empty tree has exactly one sequence, the empty sequence.

## Examples

### Example 1

```text
Input: root = [2, 1, 3]
Output: [[2, 1, 3], [2, 3, 1]]
```

### Example 2

```text
Input: root = [5, 3, null, 1]
Output: [[5, 3, 1]]
```

## Constraints

- `0 <= number of nodes <= 9`
- All values are distinct and the tree is a valid binary search tree.
