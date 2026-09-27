# House Robber II

Houses form a circle, and `nums[i]` is the money in house `i`.
Choose houses with the largest total subject to never choosing neighboring houses.
The first and last houses are neighbors when there is more than one house.
Return the maximum total.

## Examples

### Example 1

```text
Input: nums = [4, 1, 3]
Output: 4
Explanation: All three houses are pairwise neighbors, so take only the house with 4.
```

### Example 2

```text
Input: nums = [2, 3, 2, 5]
Output: 8
Explanation: The houses containing 3 and 5 are not neighbors.
```

## Constraints

- 1 <= nums.length <= 100
- 0 <= nums[i] <= 1,000
