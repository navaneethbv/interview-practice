# Detect Squares

Implement `DetectSquares`, initially storing no points.
`add(point)` stores one copy of the point.
`count(point)` returns how many ways three stored point occurrences can combine with the query point to form a square with positive area and sides parallel to the coordinate axes.
The query point does not need to be stored.
Duplicate stored points are distinct choices.
A count operation does not change the stored points.

## Examples

### Example 1

```text
Input: operations = ["add", "add", "add", "count"], arguments = [[[0, 1]], [[1, 0]], [[1, 1]], [[0, 0]]]
Output: [null, null, null, 1]
Explanation: The three stored points and the query form one unit square.
```

### Example 2

```text
Input: operations = ["add", "add", "add", "add", "count"], arguments = [[[0, 1]], [[1, 0]], [[1, 1]], [[1, 1]], [[0, 0]]]
Output: [null, null, null, null, 2]
Explanation: Either copy of [1,1] can serve as the opposite corner.
```

## Constraints

- Each point contains two integer coordinates from 0 through 1,000.
- At most 3,000 calls to add and count are made in one instance.
