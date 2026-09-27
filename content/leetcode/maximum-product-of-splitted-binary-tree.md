# Maximum Product of Splitted Binary Tree

Remove one edge from the binary tree to form two components.
Multiply the sums of the values in the two components and maximize that product.
Choose the maximum before applying the required modulo 1000000007.

## Examples

### Example 1

```text
Input: root = [1, 2, 3, 4, 5, 6]
Output: 110
Explanation: Separating the subtree totaling 11 leaves another component totaling 10.
```

### Example 2

```text
Input: root = [1, 2]
Output: 2
Explanation: The only edge separates sums 1 and 2.
```

## Constraints

- The tree has 2 to 50000 nodes.
- 1 <= node.val <= 10000.
