import math


class Solution:
    def topK(self, docs, query, k):
        def cosine(a, b):
            na, nb = math.sqrt(sum(x * x for x in a)), math.sqrt(sum(x * x for x in b))
            return 0.0 if na == 0 or nb == 0 else sum(x * y for x, y in zip(a, b)) / (na * nb)

        scores = [cosine(doc, query) for doc in docs]
        # Round so that equal similarities computed with different floating-point error still tie.
        order = sorted(range(len(docs)), key=lambda i: (-round(scores[i], 9), i))
        return order[:k]
