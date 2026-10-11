## Intuition

Cosine similarity compares directions, not lengths: it is the dot product of the two vectors divided by both of their lengths. Ranking documents is then a sort by that score.

## Approach

1. For each document compute `dot(doc, query) / (|doc| * |query|)`, using 0 when either norm is 0.
2. Round scores to 9 decimals so equal similarities tie exactly.
3. Sort indices by score descending, then index ascending, and return the first k.

## Walkthrough

In Example 1, the query (1, 0) has similarity 1 with (1, 0), 0 with (0, 1), and 1/sqrt(2), about 0.707, with (1, 1). The top two are indices 0 and 2.

## Complexity

- Time: O(n * d + n log n).
- Space: O(n).

## Edge cases

- Opposite vectors score -1 and rank below a zero vector.
- Scaling a document does not change its score.
- A zero query makes every score 0, so the answer is the first k indices.

## Common mistakes

- Ranking by raw dot product, which favours long vectors.
- Dividing by zero for zero vectors.
- Comparing floating-point scores exactly, so mathematically equal scores order differently.

## Notes

Production systems normalize embeddings once and use an approximate nearest-neighbour index; with k much smaller than n, a size-k heap avoids the full sort.
