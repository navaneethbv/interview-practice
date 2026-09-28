# Evaluate Expression Tree

An N-ary tree represents an arithmetic expression; each node's `val` is its index into `kinds` and `nums`.
A node with `kinds[val] == "num"` is a number whose value is `nums[val]`.
Any other node has at least one child and evaluates to the `"sum"`, `"product"`, `"max"`, or `"min"` of its children's values.
Return the value of the root.

## Examples

### Example 1

```text
Input: root = [0, null, 1, 2, null, 3, 4, 5, null, 6, null, null, null, 7, 8, null, 9, 10], kinds = ["min", "max", "sum", "num", "num", "sum", "product", "num", "num", "num", "num"], nums = [0, 0, 0, 4, 6, 0, 0, 5, 7, 6, 8]
Output: 12
Explanation: min(max(4, 6, 5 + 7), 6 * 8) = 12.
```

### Example 2

```text
Input: root = [0], kinds = ["num"], nums = [-5]
Output: -5
```

## Constraints

- `1 <= number of nodes <= 10^5` and the height is at most 500.
- Every intermediate value is between `-10^4` and `10^4`.
