# Magic Index

A magic index in array `A` is an index `i` with `A[i] == i`.
`A` is sorted in non-decreasing order and may contain repeated values.
Return the smallest magic index, or `-1` if none exists.

## Examples

### Example 1

```text
Input: A = [-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]
Output: 7
```

### Example 2

```text
Input: A = [-10, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13]
Output: 2
```

## Constraints

- `0 <= A.length <= 100,000`
- `-10^9 <= A[i] <= 10^9`
- Follow-up: first solve it when all values are distinct.
