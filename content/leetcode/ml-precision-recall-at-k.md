# Precision and Recall at K

A recommender returns item ids in `ranked`, best first. `relevant` holds the ids the user actually wanted.
Return `[precision@k, recall@k]`: the fraction of the top `k` items that are relevant, and the fraction of all relevant items that appear in the top `k`.

Use only the standard library; the point is to implement the computation yourself.

## Constraints

- 1 <= k <= ranked.length <= 1000
- Ids in each array are distinct.
- relevant is non-empty.
- Answers within 1e-5 are accepted.

## Examples

### Example 1

```text
Input: ranked = [7, 3, 9, 1, 4], relevant = [3, 4, 8], k = 3
Output: [0.33333, 0.33333]
Explanation: Only item 3 of the top three is relevant: precision 1/3, recall 1/3.
```

### Example 2

```text
Input: ranked = [5, 6], relevant = [5, 6], k = 2
Output: [1, 1]
Explanation: Both items are relevant and both are retrieved.
```
