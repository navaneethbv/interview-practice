# Count the Number of Incremovable Subarrays II

Count the nonempty contiguous subarrays whose removal leaves a strictly increasing array.
The remaining array may be empty, which qualifies.
Subarrays at different positions count separately.

## Constraints

- `1 <= nums.length <= 100000`.
- Values range from 1 to 1000000000.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3]
Output: 6
Explanation: Removing any of the six nonempty subarrays preserves increasing order.
```

### Example 2

```text
Input: nums = [3, 2, 1]
Output: 3
Explanation: Only removing the whole array or leaving one endpoint works.
```
