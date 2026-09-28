class Solution:
    def maxSubmatrixSum(self, matrix):
        rows, cols = len(matrix), len(matrix[0])
        best = matrix[0][0]
        for top in range(rows):
            column_sums = [0] * cols
            for bottom in range(top, rows):
                for col in range(cols):
                    column_sums[col] += matrix[bottom][col]
                best = max(best, self._kadane(column_sums))
        return best

    def _kadane(self, values):
        best = current = values[0]
        for value in values[1:]:
            current = max(value, current + value)
            best = max(best, current)
        return best
