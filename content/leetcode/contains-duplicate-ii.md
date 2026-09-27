# Contains Duplicate II

Return whether nums contains two equal values at distinct indices whose distance is at most k.

## Examples

### Example 1

```text
Input: nums = [1, 2, 1], k = 2
Output: true
Explanation: The two occurrences of 1 are two positions apart.
```

### Example 2

```text
Input: nums = [1, 2, 1], k = 1
Output: false
Explanation: Their index distance exceeds k.
```

## Constraints

- 1 <= nums.length <= 100000.
- -1000000000 <= nums[i] <= 1000000000.
- 0 <= k <= 100000.
