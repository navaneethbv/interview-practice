import math


class Solution:
    def train(self, X, y, learningRate, epochs):
        n, d = len(X), len(X[0])
        bias, w = 0.0, [0.0] * d
        for _ in range(epochs):
            errors = [1 / (1 + math.exp(-(bias + sum(wj * xj for wj, xj in zip(w, row))))) - label for row, label in zip(X, y)]
            bias -= learningRate * sum(errors) / n
            w = [w[j] - learningRate * sum(e * row[j] for e, row in zip(errors, X)) / n for j in range(d)]
        return [bias] + w
