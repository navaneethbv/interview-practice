class Solution:
    def minFallingPathSum(self, matrix):
        previous = matrix[0][:]
        for row in matrix[1:]:
            current = []
            for column, value in enumerate(row):
                best_above = previous[column]
                if column > 0:
                    best_above = min(best_above, previous[column - 1])
                if column + 1 < len(previous):
                    best_above = min(best_above, previous[column + 1])
                current.append(value + best_above)
            previous = current
        return min(previous)
