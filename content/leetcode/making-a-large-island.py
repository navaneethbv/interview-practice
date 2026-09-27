class Solution:
    def largestIsland(self, grid):
        sizes = {0: 0}
        label = 2
        for row in range(len(grid)):
            for column in range(len(grid)):
                if grid[row][column] == 1:
                    sizes[label] = self._label(grid, row, column, label)
                    label += 1

        best = max(sizes.values())
        for row in range(len(grid)):
            for column in range(len(grid)):
                if grid[row][column] == 0:
                    best = max(best, self._joined(grid, sizes, row, column))
        return best

    @staticmethod
    def _neighbors(grid, row, column):
        for next_row, next_column in ((row - 1, column), (row + 1, column),
                                      (row, column - 1), (row, column + 1)):
            if 0 <= next_row < len(grid) and 0 <= next_column < len(grid):
                yield next_row, next_column

    def _label(self, grid, row, column, label):
        stack = [(row, column)]
        grid[row][column] = label
        size = 0
        while stack:
            row, column = stack.pop()
            size += 1
            for next_row, next_column in self._neighbors(grid, row, column):
                if grid[next_row][next_column] == 1:
                    grid[next_row][next_column] = label
                    stack.append((next_row, next_column))
        return size

    def _joined(self, grid, sizes, row, column):
        nearby = {grid[r][c] for r, c in self._neighbors(grid, row, column)}
        return 1 + sum(sizes[label] for label in nearby)
