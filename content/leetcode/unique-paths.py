class Solution:
    def uniquePaths(self, m, n):
        row = [1] * n
        for _ in range(m - 1):
            for column in range(1, n):
                row[column] += row[column - 1]
        return row[-1]
