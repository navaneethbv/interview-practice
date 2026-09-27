# Merge Triplets to Form Target Triplet

One operation chooses two different triplets and replaces one with the coordinatewise maximum of both.
Return whether repeated operations can make any triplet equal to `target`.
A triplet already matching the target also counts.

## Examples

### Example 1

```text
Input: triplets = [[2, 5, 3], [1, 8, 4], [1, 7, 5]], target = [2, 7, 5]
Output: true
Explanation: Merge [2,5,3] and [1,7,5] to reach the target.
```

### Example 2

```text
Input: triplets = [[3, 1, 1], [1, 3, 1]], target = [2, 2, 1]
Output: false
Explanation: Every candidate exceeds the target in some coordinate.
```

## Constraints

- 1 <= triplets.length <= 100,000
- Every triplet and target has exactly three entries.
- 1 <= triplets[i][j], target[j] <= 1,000
