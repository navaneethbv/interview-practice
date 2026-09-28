class Solution:
    def subgridMaximums(self, grid):
        rows, cols = len(grid), len(grid[0])
        best = [row[:] for row in grid]
        for r in range(rows - 1, -1, -1):
            for c in range(cols - 1, -1, -1):
                if r + 1 < rows:
                    best[r][c] = max(best[r][c], best[r + 1][c])
                if c + 1 < cols:
                    best[r][c] = max(best[r][c], best[r][c + 1])
        return best
