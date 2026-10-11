## Intuition

Softmax is unchanged when the same constant is subtracted from every logit, because the factor `exp(-c)` cancels between numerator and denominator. Choosing `c = max(logits)` makes the largest exponent `exp(0) = 1`, so nothing overflows and at least one term is not tiny.

## Approach

1. Find the maximum logit.
2. Compute `exp(x - max)` for each logit.
3. Divide each by their sum.

## Walkthrough

For `[1, 2, 3]`, the shifted logits are `[-2, -1, 0]`, whose exponentials 0.135, 0.368 and 1 sum to 1.503. Dividing gives about `[0.090, 0.245, 0.665]`.

## Complexity

- Time: O(n).
- Space: O(n).

## Edge cases

- A single logit has probability 1.
- Huge equal logits split the probability evenly instead of producing NaN.
- Very negative logits underflow to 0, which is the correct limit.

## Common mistakes

- Exponentiating raw logits: `exp(1000)` is infinite and the result becomes NaN.
- Subtracting the minimum instead of the maximum, which still overflows.
