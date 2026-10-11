# Numerically Stable Softmax

Return the softmax of `logits`: element `i` is `exp(logits[i]) / sum_j exp(logits[j])`.
Logits can be as large as 1000 in magnitude, where `exp` overflows a 64-bit float, so compute it in a numerically stable way.

Use only the standard library; the point is to implement the computation yourself.

## Constraints

- 1 <= logits.length <= 1000
- -1000 <= logits[i] <= 1000
- Answers within 1e-5 are accepted.

## Examples

### Example 1

```text
Input: logits = [1, 2, 3]
Output: [0.09003, 0.24473, 0.66524]
Explanation: exp(1), exp(2) and exp(3) normalized.
```

### Example 2

```text
Input: logits = [1000, 1000]
Output: [0.5, 0.5]
Explanation: Equal logits share the probability, even when exp(1000) would overflow.
```
