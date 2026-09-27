# Parallel Courses III

Course i+1 takes time[i] months.
Each pair [a,b] requires course a to finish before b begins.
You may take any number of eligible courses simultaneously.
Return the minimum months needed to complete all courses.

## Examples

### Example 1

```text
Input: n = 3, relations = [[1, 3], [2, 3]], time = [3, 2, 5]
Output: 8
Explanation: Courses 1 and 2 run together; course 3 begins at month 3.
```

### Example 2

```text
Input: n = 2, relations = [], time = [4, 7]
Output: 7
Explanation: Both courses can start immediately.
```

## Constraints

- 1 <= n <= 50,000
- time.length == n; 1 <= time[i] <= 10,000
- Relations use valid distinct course numbers, contain no duplicate edges, and form a directed acyclic graph.
- At most 50,000 prerequisite pairs exist.
