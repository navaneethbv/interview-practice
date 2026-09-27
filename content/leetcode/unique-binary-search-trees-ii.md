# Unique Binary Search Trees II

Build every structurally different binary search tree containing each value from 1 through n exactly once.
Return the root nodes in any order.
The judge displays each tree as a level-order array, using null for a missing child.

## Examples

```text
Input: n = 2
Output: [[1,null,2],[2,1]]
Explanation: Either 1 or 2 can be the root.
```

```text
Input: n = 1
Output: [[1]]
Explanation: There is one tree with a single node.
```

## Constraints

- 1 <= n <= 8
- Every returned tree must satisfy strict binary search tree ordering.
