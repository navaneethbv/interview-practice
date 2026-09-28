class Solution:
    def maxPathSum(self, grid):
        best = [0] * len(grid[0])
        for r, row in enumerate(grid):
            for c, value in enumerate(row):
                from_left = best[c - 1] if c > 0 else 0
                from_above = best[c] if r > 0 else 0
                best[c] = value + max(from_left, from_above)
        return best[-1]
