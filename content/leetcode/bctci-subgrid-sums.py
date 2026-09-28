class Solution:
    def subgridSums(self, grid):
        rows, cols = len(grid), len(grid[0])
        sums = [[0] * (cols + 1) for _ in range(rows + 1)]
        for r in range(rows - 1, -1, -1):
            for c in range(cols - 1, -1, -1):
                sums[r][c] = grid[r][c] + sums[r + 1][c] + sums[r][c + 1] - sums[r + 1][c + 1]
        return [row[:cols] for row in sums[:rows]]
