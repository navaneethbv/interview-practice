# Scaled Dot-Product Attention

Compute single-query scaled dot-product attention.
With `d = query.length`, the score of key `i` is `(query · keys[i]) / sqrt(d)`.
The attention weights are the softmax of the scores, and the output is the weighted sum of the `values` rows.

Use only the standard library; the point is to implement the computation yourself.

## Constraints

- 1 <= keys.length = values.length <= 100
- Every key has length d, 1 <= d <= 64; every value row has the same length.
- Answers within 1e-5 are accepted.

## Examples

### Example 1

```text
Input: query = [1, 0], keys = [[1, 0], [0, 1]], values = [[10, 0], [0, 10]]
Output: [6.69762, 3.30238]
Explanation: Scores are 1/sqrt(2) and 0, so the first value gets weight 0.670.
```

### Example 2

```text
Input: query = [0, 0], keys = [[3, 1], [-2, 5]], values = [[1, 2], [3, 4]]
Output: [2, 3]
Explanation: A zero query gives equal weights, averaging the values.
```
