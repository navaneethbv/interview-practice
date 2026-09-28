class Solution:
    MOD = 1_000_000_007

    def _row_counts(self, row, previous, first_row):
        current = [0] * len(row)
        for column, cell in enumerate(row):
            if cell == 1:
                continue
            if first_row and column == 0:
                current[column] = 1
                continue
            ways = previous[column]
            if column > 0:
                ways += current[column - 1] + previous[column - 1]
            current[column] = ways % self.MOD
        return current

    def countZeroPaths(self, grid):
        previous = [0] * len(grid[0])
        for index, row in enumerate(grid):
            previous = self._row_counts(row, previous, index == 0)
        return previous[-1]
