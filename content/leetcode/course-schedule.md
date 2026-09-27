# Course Schedule

You must complete courses numbered from 0 through `numCourses - 1`.
Each pair `[a, b]` in `prerequisites` means course b must be completed before course a.
Return whether some ordering lets you complete every course.

## Examples

### Example 1

```text
Input: numCourses = 3, prerequisites = [[1, 0], [2, 1]]
Output: true
Explanation: Take courses 0, 1, and 2 in that order.
```

### Example 2

```text
Input: numCourses = 2, prerequisites = [[0, 1], [1, 0]]
Output: false
Explanation: Each course requires the other first.
```

## Constraints

- 1 <= numCourses <= 2000.
- 0 <= prerequisites.length <= 5000.
- Course indices are valid and prerequisite pairs are distinct.
