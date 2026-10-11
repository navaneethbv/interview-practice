# ROC AUC

Return the area under the ROC curve for a binary classifier's `scores` against the true `labels`.
Equivalently, it is the probability that a randomly chosen positive example scores higher than a randomly chosen negative one,
counting a tie as one half.

Use only the standard library; the point is to implement the computation yourself.

## Constraints

- 2 <= scores.length = labels.length <= 10^5
- labels contains at least one 0 and at least one 1.
- Answers within 1e-5 are accepted.

## Examples

### Example 1

```text
Input: scores = [0.1, 0.4, 0.35, 0.8], labels = [0, 0, 1, 1]
Output: 0.75
Explanation: Three of the four positive-negative pairs are ordered correctly: 0.75.
```

### Example 2

```text
Input: scores = [0.5, 0.5, 0.5], labels = [1, 0, 1]
Output: 0.5
Explanation: Every pair is a tie, so the AUC is 0.5.
```
