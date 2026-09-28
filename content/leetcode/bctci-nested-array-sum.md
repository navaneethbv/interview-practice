# Nested Array Sum

A nested array contains integers and other nested arrays.
Its sum is the sum of every integer at any depth.
Return the sum; each element is a `NestedInteger` with `isInteger()`, `getInteger()`, and `getList()`.

## Examples

### Example 1

```text
Input: arr = [1, [2, 3], [4, [5]], 6]
Output: 21
```

### Example 2

```text
Input: arr = [[], [1, 2], [], [3]]
Output: 6
```

## Constraints

- Nesting depth is at most 500 and there are at most `10^5` integers.
- `-10^9 <= each integer <= 10^9`
