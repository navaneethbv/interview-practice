class Solution:

    def maxSum(self, grid, limits, k):
        values = []
        for row, limit in zip(grid, limits):
            values.extend(sorted(row, reverse=True)[:limit])
        return sum(sorted(values, reverse=True)[:k])
