# Pairs with Sum

Pair up elements of `nums` whose values add to `target`, using each element in at most one pair.
Form as many pairs as possible.
Return the pairs as `[smaller, larger]` in any order; repeated pairs appear once per pair formed.

## Examples

### Example 1

```text
Input: nums = [1, 5, 3, 3, 3, 7, 5], target = 8
Output: [[1, 7], [3, 5], [3, 5]]
```

### Example 2

```text
Input: nums = [4, 4, 4], target = 8
Output: [[4, 4]]
```

## Constraints

- `0 <= nums.length <= 100,000`
- `-10^9 <= nums[i], target <= 10^9`
