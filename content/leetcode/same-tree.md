# Same Tree

Return whether `p` and `q` have identical shapes and equal values at corresponding nodes.
Two empty trees are equal.
Trees are represented by level-order arrays with `null` for missing children.

## Constraints

- Each tree contains 0 to 100 nodes.
- Node values fit in a signed 32-bit integer.

## Examples

### Example 1

```text
Input: p = [2, 1, 3], q = [2, 1, 3]
Output: true
Explanation: Every corresponding node agrees.
```

### Example 2

```text
Input: p = [2, 1], q = [2, null, 1]
Output: false
Explanation: The child is on a different side.
```
