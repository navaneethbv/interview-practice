import math


class Solution:
    def softmax(self, logits):
        # Subtracting the maximum keeps every exponent at most 0, so nothing overflows.
        top = max(logits)
        exps = [math.exp(x - top) for x in logits]
        total = sum(exps)
        return [e / total for e in exps]
