# Sum Root to Leaf Numbers

Each node stores one decimal digit.
Reading a path from the root to a leaf forms a base-10 integer.
Return the sum of the integers formed by all root-to-leaf paths.

## Examples

### Example 1

```text
Input: root = [2, 1, 3]
Output: 44
Explanation: The paths represent 21 and 23.
```

### Example 2

```text
Input: root = [0, 1, 2]
Output: 3
Explanation: Leading zeroes do not change the numbers 1 and 2.
```

## Constraints

- The tree contains 1 to 1000 nodes and has depth at most 10.
- 0 <= node.val <= 9.
- The final answer fits a signed 32-bit integer.
