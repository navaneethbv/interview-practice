# Course Schedule IV

Each prerequisite pair `[a, b]` means course a must be completed before course b.
For every query `[u, v]`, report whether u is a direct or indirect prerequisite of v.
Return the answers in query order.

## Examples

### Example 1

```text
Input: numCourses = 3, prerequisites = [[0, 1], [1, 2]], queries = [[0, 2], [2, 0], [0, 1]]
Output: [true, false, true]
Explanation: 0 reaches 2 through 1, while 2 does not precede 0.
```

### Example 2

```text
Input: numCourses = 2, prerequisites = [], queries = [[0, 1], [1, 0]]
Output: [false, false]
Explanation: No prerequisite relationship exists.
```

## Constraints

- 2 <= numCourses <= 100.
- The prerequisite graph is acyclic and contains no duplicate edges.
- 1 <= queries.length <= 10000.
- Each query contains two different valid course indices.
