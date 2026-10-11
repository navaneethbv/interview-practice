import math


class Solution:
    def attention(self, query, keys, values):
        scale = math.sqrt(len(query))
        scores = [sum(q * k for q, k in zip(query, key)) / scale for key in keys]
        top = max(scores)
        weights = [math.exp(s - top) for s in scores]
        total = sum(weights)
        return [sum(w * row[j] for w, row in zip(weights, values)) / total for j in range(len(values[0]))]
