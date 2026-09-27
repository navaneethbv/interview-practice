# Total Hamming Distance

For every unordered pair of different indices in `nums`, count the bit positions where the two values differ.
Return the sum of those Hamming distances.

## Constraints

- `1 <= nums.length <= 10000`.
- `0 <= nums[i] <= 1000000000`.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3]
Output: 4
Explanation: The pair distances are 2, 1, and 1.
```

### Example 2

```text
Input: nums = [7, 7]
Output: 0
Explanation: Identical bit patterns contribute zero.
```
