# Course Schedule II

Courses are numbered from 0 through `numCourses - 1`.
Each prerequisite pair [a, b] means course b must be taken before course a.
Return an ordering that includes every course exactly once and respects all prerequisites.
Any valid ordering is accepted; return an empty array when a cycle makes completion impossible.

## Examples

### Example 1

```text
Input: numCourses = 3, prerequisites = [[2, 1], [1, 0]]
Output: [0, 1, 2]
Explanation: Course 0 precedes 1, which precedes 2.
```

### Example 2

```text
Input: numCourses = 2, prerequisites = [[1, 0], [0, 1]]
Output: []
Explanation: The mutual prerequisites form a cycle.
```

## Constraints

- 1 <= numCourses <= 2,000
- 0 <= prerequisites.length <= numCourses * (numCourses - 1)
- Each pair contains distinct valid course indices; prerequisite pairs are unique.
