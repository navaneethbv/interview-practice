class Solution:
    def maxAreaOfIsland(self, grid):
        if not grid or not grid[0]:
            return 0

        best_area = 0
        rows, columns = len(grid), len(grid[0])
        for row in range(rows):
            for column in range(columns):
                if grid[row][column] == 1:
                    best_area = max(
                        best_area,
                        self._collect_island(grid, row, column),
                    )
        return best_area

    def _collect_island(self, grid, start_row, start_column):
        rows, columns = len(grid), len(grid[0])
        stack = [(start_row, start_column)]
        grid[start_row][start_column] = 0
        area = 0

        while stack:
            row, column = stack.pop()
            area += 1
            for next_row, next_column in (
                (row - 1, column),
                (row + 1, column),
                (row, column - 1),
                (row, column + 1),
            ):
                if (
                    0 <= next_row < rows
                    and 0 <= next_column < columns
                    and grid[next_row][next_column] == 1
                ):
                    grid[next_row][next_column] = 0
                    stack.append((next_row, next_column))

        return area
