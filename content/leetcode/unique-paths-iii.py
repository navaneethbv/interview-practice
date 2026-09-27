class Solution:
    def uniquePathsIII(self, grid):
        remaining = 0
        start_row = 0
        start_column = 0
        for row in range(len(grid)):
            for column in range(len(grid[0])):
                if grid[row][column] != -1:
                    remaining += 1
                if grid[row][column] == 1:
                    start_row = row
                    start_column = column
        return self._visit(grid, start_row, start_column, remaining)

    def _visit(self, grid, row, column, remaining):
        if not (0 <= row < len(grid) and 0 <= column < len(grid[0])):
            return 0
        if grid[row][column] == -1:
            return 0
        if grid[row][column] == 2:
            return int(remaining == 1)
        original = grid[row][column]
        grid[row][column] = -1
        total = 0
        for row_step, column_step in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            total += self._visit(grid, row + row_step, column + column_step, remaining - 1)
        grid[row][column] = original
        return total
