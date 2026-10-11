# Top-K Cosine Similarity Search

Each row of `docs` is a document embedding. Return the indices of the `k` documents most similar to `query` by cosine similarity,
most similar first. Break ties by the smaller index. Treat the similarity of a zero vector with anything as 0.

Use only the standard library; the point is to implement the computation yourself.

## Constraints

- 1 <= k <= docs.length <= 1000
- All vectors have the same dimension, at most 100.
- Similarities closer than 1e-9 count as equal.

## Examples

### Example 1

```text
Input: docs = [[1, 0], [0, 1], [1, 1]], query = [1, 0], k = 2
Output: [0, 2]
Explanation: Document 0 points the same way (1.0) and document 2 is at 45 degrees (0.707).
```

### Example 2

```text
Input: docs = [[0, 0], [2, 0], [-1, 0]], query = [3, 0], k = 3
Output: [1, 0, 2]
Explanation: The zero vector scores 0, between the parallel and opposite documents.
```
