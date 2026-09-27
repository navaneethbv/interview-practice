# Closest Binary Search Tree Value

Return the value in a binary search tree closest to target.
If two values are equally close, return the smaller one.

## Examples

### Example 1

```text
Input: root = [4, 2, 6, 1, 3, 5, 7], target = 3.6
Output: 4
Explanation: 4 is closer to 3.6 than the other values.
```

### Example 2

```text
Input: root = [2, 1, 3], target = 2.5
Output: 2
Explanation: The tie between 2 and 3 is resolved toward 2.
```

## Constraints

- The tree contains 1 to 10000 nodes.
- 0 <= node.val <= 1000000000.
- -1000000000 <= target <= 1000000000.
- The tree obeys strict binary search ordering.
