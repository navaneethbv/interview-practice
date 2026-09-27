# Capacity To Ship Packages Within D Days

Ship packages in their given order within at most `days` days.
Each day loads a contiguous next group whose total weight does not exceed the ship's fixed capacity.
Return the smallest capacity that allows all packages to be shipped.

## Examples

### Example 1

```text
Input: weights = [1, 2, 3, 4, 5], days = 3
Output: 6
Explanation: Use daily loads [1,2,3], [4], and [5].
```

### Example 2

```text
Input: weights = [3, 2, 2, 4, 1, 4], days = 3
Output: 6
Explanation: Capacity 6 supports loads [3,2], [2,4], and [1,4].
```

## Constraints

- 1 <= weights.length <= 50,000
- 1 <= weights[i] <= 500
- 1 <= days <= weights.length
