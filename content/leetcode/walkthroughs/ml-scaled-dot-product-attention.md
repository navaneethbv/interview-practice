## Intuition

Attention is a soft lookup: the query is compared with every key, the comparisons become a probability distribution, and the output is the expected value row under that distribution. Dividing by sqrt(d) keeps the scores from growing with dimension, which would make the softmax nearly one-hot.

## Approach

1. Score each key: `dot(query, key) / sqrt(d)`.
2. Apply a numerically stable softmax: subtract the maximum score before exponentiating.
3. Return `sum_i weight_i * values[i]` component by component.

## Walkthrough

In Example 1, d = 2 and the scores are 1/sqrt(2), about 0.707, and 0. The weights are e^0.707 / (e^0.707 + 1), about 0.670, and 0.330, so the output is about `[6.70, 3.30]`.

## Complexity

- Time: O(n * (d + d_v)).
- Space: O(n + d_v).

## Edge cases

- One key gives weight 1 and returns its value row.
- Identical scores average the values.
- Large scores need the max-subtraction trick.

## Common mistakes

- Forgetting the 1/sqrt(d) scale.
- Scaling by d instead of sqrt(d).
- Applying softmax across value dimensions instead of across keys.
