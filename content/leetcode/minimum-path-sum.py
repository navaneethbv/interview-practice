class Solution:
    def minPathSum(self, grid):
        minimum_costs = [float("inf")] * len(grid[0])
        minimum_costs[0] = 0

        for row in grid:
            for column, value in enumerate(row):
                from_top = minimum_costs[column]
                from_left = minimum_costs[column - 1] if column > 0 else float("inf")
                minimum_costs[column] = value + min(from_top, from_left)

        return minimum_costs[-1]
