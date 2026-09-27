class Solution:
    def numSquares(self, n):
        squares = [value * value for value in range(1, int(n ** 0.5) + 1)]
        minimum_counts = [0] + [n] * n

        for value in range(1, n + 1):
            for square in squares:
                if square > value:
                    break
                minimum_counts[value] = min(
                    minimum_counts[value], 1 + minimum_counts[value - square]
                )
        return minimum_counts[n]
