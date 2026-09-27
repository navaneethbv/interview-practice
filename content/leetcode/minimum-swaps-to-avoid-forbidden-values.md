# Minimum Swaps to Avoid Forbidden Values

Swap any two distinct positions in nums as often as needed.
The final value at each index must differ from forbidden at that same index.
Return the smallest required number of swaps, or -1 when no rearrangement can satisfy all positions.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3], forbidden = [1, 2, 3]
Output: 2
Explanation: A three-cycle removes all three conflicts using two swaps.
```

### Example 2

```text
Input: nums = [7, 7], forbidden = [8, 7]
Output: -1
Explanation: Every available value is 7, which is forbidden at the second position.
```

## Constraints

- 1 <= nums.length == forbidden.length <= 100000.
- 1 <= nums[i], forbidden[i] <= 1000000000.
