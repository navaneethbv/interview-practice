# Closest Equal Element Queries

The array is circular.
For each queried index, return the fewest steps around the circle to a different index holding the same value.
Return -1 for that query if the value occurs nowhere else.

## Examples

### Example 1

```text
Input: nums = [7, 2, 3, 7], queries = [0, 1, 3]
Output: [1, -1, 1]
Explanation: The two 7s are adjacent across the circular boundary.
```

### Example 2

```text
Input: nums = [4, 4, 4], queries = [1]
Output: [1]
Explanation: An equal neighbor is one step away.
```

## Constraints

- 1 <= queries.length <= nums.length <= 100000
- 1 <= nums[i] <= 1000000
- 0 <= queries[i] < nums.length
