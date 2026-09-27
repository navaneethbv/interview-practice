# Build Array from Permutation

Given a permutation of integers from 0 through n-1, return an array whose entry at i is nums[nums[i]].

## Examples

### Example 1

```text
Input: nums = [2, 0, 1]
Output: [1, 2, 0]
Explanation: Follow the index stored at each position once more.
```

### Example 2

```text
Input: nums = [0]
Output: [0]
Explanation: The only index points to itself.
```

## Constraints

- 1 <= nums.length <= 1000
- nums contains each integer from 0 through nums.length-1 exactly once.
