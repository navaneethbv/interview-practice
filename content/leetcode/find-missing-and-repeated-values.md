# Find Missing and Repeated Values

An n by n grid should contain every integer from 1 through n squared once.
Instead, one value appears twice and one value is absent.
Return [repeated, missing] in that order.

## Examples

### Example 1

```text
Input: grid = [[1, 2], [2, 4]]
Output: [2, 3]
Explanation: The value 2 appears twice and 3 never appears.
```

### Example 2

```text
Input: grid = [[4, 2], [3, 4]]
Output: [4, 1]
Explanation: The repeated value is 4 and the missing value is 1.
```

## Constraints

- 2 <= n <= 50; grid has n rows and n columns.
- 1 <= grid[i][j] <= n*n
- Exactly one value occurs twice, exactly one is missing, and all others occur once.
