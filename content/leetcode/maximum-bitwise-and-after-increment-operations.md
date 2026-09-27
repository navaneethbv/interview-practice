# Maximum Bitwise AND After Increment Operations

Spend at most k unit increments across any array entries.
Then choose exactly m entries.
Return the largest bitwise AND their final values can achieve.

## Examples

### Example 1

```text
Input: nums = [1, 1], k = 3, m = 2
Output: 2
Explanation: Raise both values to 2 using two increments.
```

### Example 2

```text
Input: nums = [2, 5], k = 4, m = 1
Output: 9
Explanation: Choose the second entry and increment it four times.
```

## Constraints

- 1 <= nums.length <= 50000
- 1 <= nums[i], k <= 1000000000
- 1 <= m <= nums.length
