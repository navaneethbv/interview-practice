# Dot Product of Two Sparse Vectors

Implement `SparseVector(nums)` for a vector containing many zeros.
`dotProduct(vec)` returns the sum of coordinatewise products with another SparseVector of the same length.
Testcase constructor data and method arguments use dense arrays, which the judge converts into vector objects.

## Examples

### Example 1

```text
Input: constructor = [[1, 0, 0, 2, 3]], operations = ["dotProduct"], arguments = [[[0, 3, 0, 4, 0]]]
Output: [8]
Explanation: Only coordinate 3 contributes, with 2 times 4.
```

### Example 2

```text
Input: constructor = [[0, 0, 0]], operations = ["dotProduct"], arguments = [[[1, 2, 3]]]
Output: [0]
Explanation: A zero vector has zero dot product.
```

## Constraints

- 1 <= vector length <= 100,000
- 0 <= values <= 100
- Both vectors in a dot product have the same length.
