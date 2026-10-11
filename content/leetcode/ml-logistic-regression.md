# Train Logistic Regression

Train a logistic regression model with full-batch gradient descent and return `[bias, w_1, ..., w_d]`.
Start with the bias and all weights at 0. For each epoch, compute predictions `p_i = sigmoid(bias + w · X[i])` for every row with the current parameters,
then update every parameter at once using the gradient of the mean log loss:
`bias -= learningRate * mean(p_i - y_i)` and `w_j -= learningRate * mean((p_i - y_i) * X[i][j])`.

Use only the standard library; the point is to implement the computation yourself.

## Constraints

- 1 <= X.length <= 100 and every row has the same length d, 1 <= d <= 10
- y[i] is 0 or 1
- 1 <= epochs <= 1000
- Answers within 1e-5 are accepted.

## Examples

### Example 1

```text
Input: X = [[1], [2], [-1], [-2]], y = [1, 1, 0, 0], learningRate = 0.1, epochs = 1
Output: [0, 0.075]
Explanation: With all parameters at 0 every prediction is 0.5, so the bias gradient is 0 and w moves toward the positive examples.
```

### Example 2

```text
Input: X = [[0, 1], [1, 0]], y = [1, 0], learningRate = 0.5, epochs = 2
Output: [0, -0.2422, 0.2422]
Explanation: Two epochs of updates on two features.
```
