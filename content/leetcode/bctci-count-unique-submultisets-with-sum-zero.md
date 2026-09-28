# Count Unique Submultisets with Sum Zero

`S` is a multiset of integers.
Return how many distinct submultisets of `S` sum to 0, where submultisets that contain the same values the same number of times count once.
The empty submultiset counts.

## Examples

### Example 1

```text
Input: S = [1, 1, -1, -1]
Output: 3
```

### Example 2

```text
Input: S = [-1, 2, 1, 0, 3]
Output: 4
```

## Constraints

- `0 <= S.length <= 20`
- `-10^6 <= S[i] <= 10^6`
