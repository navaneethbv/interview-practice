# Sum of All Subset XOR Totals

For every subset of input positions, compute the bitwise XOR of its selected values, using 0 for the empty subset.
Return the sum of all those XOR totals.
Equal input values at different positions still create different subsets.

## Examples

### Example 1

```text
Input: nums = [1, 3]
Output: 6
Explanation: The subset XOR totals are 0, 1, 3, and 2.
```

### Example 2

```text
Input: nums = [5]
Output: 5
Explanation: Only the nonempty subset contributes.
```

## Constraints

- 1 <= nums.length <= 12
- 1 <= nums[i] <= 20
