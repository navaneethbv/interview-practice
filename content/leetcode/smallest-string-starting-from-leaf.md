# Smallest String Starting From Leaf

Each node value from 0 through 25 represents a lowercase letter.
Return the lexicographically smallest string formed by walking from a leaf up to the root.

## Examples

### Example 1

```text
Input: root = [0, 1, 2, 3, 4, 3, 4]
Output: "dba"
Explanation: The path 3, 1, 0 spells dba.
```

### Example 2

```text
Input: root = [25, 0, 1]
Output: "az"
Explanation: The left leaf gives az.
```

## Constraints

- 1 <= number of nodes <= 8500
- 0 <= Node.val <= 25
