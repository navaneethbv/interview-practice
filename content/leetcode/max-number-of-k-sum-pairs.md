# Max Number of K-Sum Pairs

In one operation, remove two distinct entries whose sum is k.
Return the maximum number of operations possible.
Each entry may be removed at most once.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3, 4], k = 5
Output: 2
Explanation: Remove pairs 1+4 and 2+3.
```

### Example 2

```text
Input: nums = [3, 1, 3, 4, 3], k = 6
Output: 1
Explanation: Only one pair of 3s can be formed.
```

## Constraints

- 1 <= nums.length <= 100000.
- 1 <= nums[i], k <= 1000000000.
