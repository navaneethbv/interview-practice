# Parallel Courses

Courses are numbered 1 through n.
Each relation `[before, after]` requires the first course to be finished in an earlier semester than the second.
During a semester, you may take any number of courses whose prerequisites are already finished.
Return the fewest semesters needed for all courses, or -1 if a prerequisite cycle prevents completion.

## Examples

### Example 1

```text
Input: n = 3, relations = [[1, 3], [2, 3]]
Output: 2
Explanation: Take 1 and 2 together, then take 3.
```

### Example 2

```text
Input: n = 3, relations = [[1, 2], [2, 3], [3, 1]]
Output: -1
Explanation: The prerequisite cycle cannot be started.
```

## Constraints

- 1 <= n <= 5000.
- 0 <= relations.length <= 5000.
- Relations contain distinct pairs of different valid course numbers.
