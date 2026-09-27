# Validate Binary Search Tree

Check whether every node obeys the binary search tree rule: all values in its left subtree are strictly smaller and all values in its right subtree are strictly larger.
The rule applies to entire subtrees, and duplicate values are invalid.

## Constraints

- The tree contains 1 to 10000 nodes.
- Values fit in a signed 32-bit integer.

## Examples

### Example 1

```text
Input: root = [8, 4, 12, 2, 6, 10, 14]
Output: true
Explanation: Every value falls within its ancestors' bounds.
```

### Example 2

```text
Input: root = [8, 4, 12, null, null, 7, 14]
Output: false
Explanation: The 7 lies in the right subtree of 8.
```
