# Sliding Window Maximum

Slide a window of exactly k consecutive elements from the beginning of `nums` to the end.
Return the maximum value in each window, in the order the windows appear.

## Examples

### Example 1

```text
Input: nums = [2, 1, 4, 3, 5], k = 3
Output: [4, 4, 5]
Explanation: The three windows have maxima 4, 4, and 5.
```

### Example 2

```text
Input: nums = [-2, -1], k = 1
Output: [-2, -1]
Explanation: A one-element window contains only its own value.
```

## Constraints

- 1 <= nums.length <= 100000.
- 1 <= k <= nums.length.
- -10000 <= nums[i] <= 10000.
