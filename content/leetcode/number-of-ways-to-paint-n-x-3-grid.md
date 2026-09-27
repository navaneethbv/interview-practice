# Number of Ways to Paint N by 3 Grid

Paint every cell of an n by 3 grid using three available colors.
Cells sharing a side must have different colors.
Return the number of valid colorings modulo 1000000007.

## Examples

### Example 1

```text
Input: n = 1
Output: 12
Explanation: Choose 3 colors for the first cell and 2 choices for each following cell.
```

### Example 2

```text
Input: n = 2
Output: 54
Explanation: Compatible choices for the second row yield 54 complete colorings.
```

## Constraints

- 1 <= n <= 5000.
