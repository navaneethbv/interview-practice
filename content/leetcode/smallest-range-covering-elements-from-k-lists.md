# Smallest Range Covering Elements from K Lists

Each list in `nums` is sorted in nondecreasing order.
Return the shortest inclusive interval [a,b] containing at least one number from every list.
Compare intervals by b-a; break equal-length ties by smaller a.

## Examples

### Example 1

```text
Input: nums = [[4, 10, 15, 24, 26], [0, 9, 12, 20], [5, 18, 22, 30]]
Output: [20, 24]
Explanation: This interval covers values 24, 20, and 22.
```

### Example 2

```text
Input: nums = [[1], [3], [2]]
Output: [1, 3]
Explanation: Every single-entry list must be covered.
```

## Constraints

- 1 <= nums.length <= 3,500
- 1 <= nums[i].length <= 50
- -100,000 <= nums[i][j] <= 100,000
