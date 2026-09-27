# K-diff Pairs in an Array

Count distinct unordered value pairs from different indices whose absolute difference equals `k`.
Repeated index combinations for the same values count only once.
For k zero, a value needs at least two occurrences.

## Constraints

- `1 <= nums.length <= 10000`.
- `-10000000 <= nums[i] <= 10000000`.
- `0 <= k <= 10000000`.

## Examples

### Example 1

```text
Input: nums = [1, 3, 1, 5], k = 2
Output: 2
Explanation: The distinct pairs are 1,3 and 3,5.
```

### Example 2

```text
Input: nums = [2, 2, 2], k = 0
Output: 1
Explanation: Only the pair of values 2,2 qualifies.
```
