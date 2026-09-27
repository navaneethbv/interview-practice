# Top K Frequent Elements

Return the `k` distinct values appearing most often in `nums`.
The selected set is guaranteed to be unique: when some values are excluded, the least frequent selected value occurs more often than every excluded value.
The output order is unrestricted.
Aim for a running time better than sorting the full input.

## Constraints

- `1 <= nums.length <= 100000`.
- `-10000 <= nums[i] <= 10000`.
- `1 <= k <= number of distinct values`.

## Examples

### Example 1

```text
Input: nums = [4, 4, 1, 2, 2, 2], k = 2
Output: [2, 4]
Explanation: 2 appears three times and 4 appears twice.
```

### Example 2

```text
Input: nums = [-1], k = 1
Output: [-1]
Explanation: The only distinct value is selected.
```
