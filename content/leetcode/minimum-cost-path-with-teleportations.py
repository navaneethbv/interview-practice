INFINITY = 10**18


class Solution:
    def minCost(self, grid, k):
        rows = len(grid)
        columns = len(grid[0])
        distance = [[INFINITY] * columns for _ in range(rows)]
        distance[0][0] = 0
        self._relax_moves(grid, distance)
        levels = sorted({value for row in grid for value in row}, reverse=True)
        for _ in range(k):
            distance = self._apply_teleport(grid, distance, levels)
            self._relax_moves(grid, distance)
        return distance[-1][-1]

    def _relax_moves(self, grid, distance):
        """Propagate the cheapest right and down paths through the grid."""
        for row in range(len(grid)):
            for column in range(len(grid[0])):
                if row:
                    distance[row][column] = min(
                        distance[row][column], distance[row - 1][column] + grid[row][column]
                    )
                if column:
                    distance[row][column] = min(
                        distance[row][column], distance[row][column - 1] + grid[row][column]
                    )

    def _apply_teleport(self, grid, distance, levels):
        """Give every cell the best reachable distance from a no-cost teleport."""
        best_at_level = dict.fromkeys(levels, INFINITY)
        for row, values in enumerate(grid):
            for column, value in enumerate(values):
                best_at_level[value] = min(best_at_level[value], distance[row][column])
        best_so_far = INFINITY
        for value in levels:
            best_so_far = min(best_so_far, best_at_level[value])
            best_at_level[value] = best_so_far
        return [[best_at_level[value] for value in row] for row in grid]
