from bisect import bisect_left,insort
class Solution:
    def maxSumSubmatrix(self, matrix, k):
        rows = len(matrix)
        columns = len(matrix[0])
        best = -float("inf")
        for top in range(rows):
            column_sums = [0] * columns
            for bottom in range(top, rows):
                for column in range(columns):
                    column_sums[column] += matrix[bottom][column]
                prefix = 0
                seen = [0]
                for value in column_sums:
                    prefix += value
                    index = bisect_left(seen, prefix - k)
                    if index < len(seen):
                        best = max(best, prefix - seen[index])
                    insort(seen, prefix)
        return best
