from math import isqrt
class Solution:
    def getFactors(self, n):
        result = []

        def visit(remaining, smallest_factor, path):
            for factor in range(smallest_factor, isqrt(remaining) + 1):
                if remaining % factor != 0:
                    continue
                result.append(path + [factor, remaining // factor])
                visit(remaining // factor, factor, path + [factor])

        visit(n, 2, [])
        return result
