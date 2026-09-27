# Minimum Operations to Reduce X to Zero

One operation removes the leftmost or rightmost remaining array entry and subtracts its value from x.
Return the fewest operations needed to make x exactly zero, or -1 if impossible.

## Examples

### Example 1

```text
Input: nums = [1, 1, 4, 2, 3], x = 5
Output: 2
Explanation: Remove the two rightmost entries, 3 and 2.
```

### Example 2

```text
Input: nums = [5, 6, 7, 8, 9], x = 4
Output: -1
Explanation: Every removable value already exceeds x.
```

## Constraints

- 1 <= nums.length <= 100,000
- 1 <= nums[i] <= 10,000
- 1 <= x <= 10^9
