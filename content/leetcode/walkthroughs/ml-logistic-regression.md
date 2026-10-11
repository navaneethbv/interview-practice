## Intuition

For log loss the gradient with respect to a weight is simply the prediction error times the feature, averaged over rows. Full-batch descent computes all errors with the same parameters before changing any of them.

## Approach

1. Initialize bias and weights to 0.
2. Each epoch, compute `error_i = sigmoid(bias + w · x_i) - y_i` for every row.
3. Accumulate `sum(error_i)` for the bias and `sum(error_i * x_ij)` for each weight.
4. Subtract `learningRate * gradient / n` from every parameter.

## Walkthrough

In Example 1, all predictions start at 0.5, so the errors are `[-0.5, -0.5, 0.5, 0.5]`. Their sum is 0, leaving the bias at 0, and `sum(error * x) = -0.5 - 1 - 0.5 - 1 = -3`, so `w = 0 - 0.1 * (-3 / 4) = 0.075`.

## Complexity

- Time: O(epochs * n * d).
- Space: O(d).

## Edge cases

- One epoch from zeros always predicts 0.5 for every row.
- Perfectly separable data keeps growing the weights; the epoch limit bounds them.

## Common mistakes

- Updating weights row by row (stochastic descent) instead of once per epoch.
- Using parameters already updated this epoch for the remaining gradients.
- Forgetting to divide by n.
