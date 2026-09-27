# Set Mismatch

The array originally contained every integer from 1 through n exactly once.
One value was replaced by another, leaving one duplicate and one missing value.
Return `[duplicate, missing]`.

## Examples

### Example 1

```text
Input: nums = [1, 2, 2, 4]
Output: [2, 3]
Explanation: 2 appears twice and 3 is absent.
```

### Example 2

```text
Input: nums = [2, 2]
Output: [2, 1]
Explanation: The missing value is 1.
```

## Constraints

- 2 <= nums.length <= 10000.
- 1 <= nums[i] <= nums.length.
- Exactly one value is duplicated and exactly one is absent.
