# Burst Balloons

Balloons stand in a row with values given by `nums`.
Bursting a balloon earns the product of its value and the values of its nearest remaining neighbors.
A missing neighbor beyond either end has value 1.
The burst balloon is removed, so neighbors change after each burst.
Return the largest total obtainable by bursting every balloon.

## Examples

### Example 1

```text
Input: nums = [3, 1, 5, 8]
Output: 167
Explanation: Burst values 1, 5, 3, then 8 to earn 15 + 120 + 24 + 8.
```

### Example 2

```text
Input: nums = [1, 5]
Output: 10
Explanation: Burst 1 first for 5, then 5 for another 5.
```

## Constraints

- 1 <= nums.length <= 300
- 0 <= nums[i] <= 100
