# Happy Students

Choose a group of students.
A selected student i is happy when the group size is strictly greater than nums[i]; an unselected student is happy when the group size is strictly smaller than nums[i].
Return how many choices of students make everyone happy.

## Examples

### Example 1

```text
Input: nums = [1, 1]
Output: 2
Explanation: Selecting nobody or selecting both students makes everyone happy.
```

### Example 2

```text
Input: nums = [0, 1]
Output: 1
Explanation: Only selecting both students works.
```

## Constraints

- 1 <= nums.length <= 100,000
- 0 <= nums[i] < nums.length
