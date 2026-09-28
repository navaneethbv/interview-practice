# Shortest Supersequence

`shorter` holds distinct values, and `longer` is any array.
Find the shortest contiguous subarray of `longer` that contains every value in `shorter`, in any order.
Return `[start, end]` as inclusive indices; if several are equally short, return the one that starts earliest.
Return `[-1, -1]` when no subarray works.

## Examples

### Example 1

```text
Input: shorter = [1, 5, 9], longer = [7, 5, 9, 0, 2, 1, 3, 5, 7, 9, 1, 1, 5, 8, 8, 9, 7]
Output: [7, 10]
```

### Example 2

```text
Input: shorter = [4], longer = [1, 2, 3]
Output: [-1, -1]
```

## Constraints

- `1 <= shorter.length <= longer.length <= 100,000`
- Values of `shorter` are distinct.
