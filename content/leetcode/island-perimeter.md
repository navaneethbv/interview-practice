# Island Perimeter

In a rectangular grid, 1 is land and 0 is water.
All land belongs to one island connected by shared edges, and the island contains no enclosed water.
Return the number of unit edges on the island boundary, including edges against the outside of the grid.

## Constraints

- Both grid dimensions range from 1 to 100.
- At least one land cell exists.

## Examples

### Example 1

```text
Input: grid = [[1, 1], [1, 1]]
Output: 8
Explanation: A two-by-two square has eight outer edges.
```

### Example 2

```text
Input: grid = [[1, 0]]
Output: 4
Explanation: One land cell has four exposed edges.
```
