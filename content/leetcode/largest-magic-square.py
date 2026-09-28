class Solution:
    def largestMagicSquare(self, grid):
        rows, columns = len(grid), len(grid[0])
        row_prefix = [[0] * (columns + 1) for _ in range(rows)]
        column_prefix = [[0] * columns for _ in range(rows + 1)]
        for row in range(rows):
            for column in range(columns):
                row_prefix[row][column + 1] = row_prefix[row][column] + grid[row][column]
                column_prefix[row + 1][column] = column_prefix[row][column] + grid[row][column]
        for size in range(min(rows, columns), 1, -1):
            for row in range(rows - size + 1):
                for column in range(columns - size + 1):
                    if self._magic(grid, row_prefix, column_prefix, row, column, size):
                        return size
        return 1

    def _magic(self, grid, rows, cols, r, c, size):
        """Checks every row, column and both diagonals of one square using prefix sums."""
        target = rows[r][c + size] - rows[r][c]
        for current_row in range(r, r + size):
            if rows[current_row][c + size] - rows[current_row][c] != target:
                return False
        for current_column in range(c, c + size):
            if cols[r + size][current_column] - cols[r][current_column] != target:
                return False
        main_diagonal = sum(grid[r + offset][c + offset] for offset in range(size))
        other_diagonal = sum(grid[r + offset][c + size - 1 - offset] for offset in range(size))
        return main_diagonal == target == other_diagonal
