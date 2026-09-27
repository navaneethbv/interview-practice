# Maximum Level Sum of a Binary Tree

Number tree levels starting at 1 for the root.
Return the smallest level number whose node values have the greatest sum.

## Examples

### Example 1

```text
Input: root = [1, 7, 0, 7, -8, null, null]
Output: 2
Explanation: The level sums are 1,7,-1.
```

### Example 2

```text
Input: root = [2, 1, 1]
Output: 1
Explanation: The first two levels tie at sum 2, so return the earlier one.
```

## Constraints

- The tree contains 1 to 10000 nodes.
- -100000 <= node.val <= 100000.
