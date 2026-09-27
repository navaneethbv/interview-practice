# Unique Paths III

Count walks from the single starting cell 1 to the ending cell 2 that visit every non-obstacle cell exactly once.
Moves use four orthogonal directions; zero cells are empty and -1 cells are obstacles.

## Constraints

- The grid contains 1 to 20 cells, including exactly one start and one end.

## Examples

### Example 1

```text
Input: grid = [[1, 0, 2]]
Output: 1
Explanation: The sole route visits all three cells.
```

### Example 2

```text
Input: grid = [[1, 0], [0, 2]]
Output: 0
Explanation: Reaching the opposite corner cannot visit both other cells exactly once.
```
