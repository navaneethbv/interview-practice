class Solution:
    def maxMatrixSum(self, matrix):
        total = 0
        negative_count = 0
        minimum_magnitude = None
        for row in matrix:
            for value in row:
                magnitude = abs(value)
                total += magnitude
                negative_count += value < 0
                if minimum_magnitude is None or magnitude < minimum_magnitude:
                    minimum_magnitude = magnitude
        if negative_count % 2 == 0:
            return total
        return total - 2 * minimum_magnitude
