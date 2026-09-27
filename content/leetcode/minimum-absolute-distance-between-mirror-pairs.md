# Minimum Absolute Distance Between Mirror Pairs

A pair i < j is a mirror pair when reversing the decimal digits of nums[i] yields nums[j].
Ignore leading zeroes in the reversed number.
Return the minimum j-i across mirror pairs, or -1 if there are none.

## Examples

### Example 1

```text
Input: nums = [30, 8, 3]
Output: 2
Explanation: Reversing the 30 at index 0 yields the 3 at index 2.
```

### Example 2

```text
Input: nums = [3, 30]
Output: -1
Explanation: Reversing the earlier 3 does not yield 30.
```

## Constraints

- 1 <= nums.length <= 100000
- 1 <= nums[i] <= 1000000000
