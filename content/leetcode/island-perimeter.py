class Solution:
    def islandPerimeter(self, grid):
        land_cells = 0
        shared_edges = 0
        for row in grid:
            for value in row:
                land_cells += value
            for left, right in zip(row, row[1:]):
                shared_edges += left and right
        for upper_row, lower_row in zip(grid, grid[1:]):
            for upper, lower in zip(upper_row, lower_row):
                shared_edges += upper and lower
        return 4 * land_cells - 2 * shared_edges
