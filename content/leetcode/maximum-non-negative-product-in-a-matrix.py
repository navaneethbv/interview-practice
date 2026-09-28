class Solution:
    def maxProductPath(self, grid):
        rows = len(grid)
        columns = len(grid[0])
        minimum = [[0] * columns for _ in range(rows)]
        maximum = [[0] * columns for _ in range(rows)]
        for row in range(rows):
            for column in range(columns):
                self._fill_cell(grid, minimum, maximum, row, column)
        result = maximum[-1][-1]
        return -1 if result < 0 else result % 1000000007

    def _fill_cell(self, grid, minimum, maximum, row, column):
        value = grid[row][column]
        if row == 0 and column == 0:
            minimum[row][column] = value
            maximum[row][column] = value
            return
        candidates = []
        if row > 0:
            candidates.extend((value * minimum[row - 1][column],
                               value * maximum[row - 1][column]))
        if column > 0:
            candidates.extend((value * minimum[row][column - 1],
                               value * maximum[row][column - 1]))
        minimum[row][column] = min(candidates)
        maximum[row][column] = max(candidates)
