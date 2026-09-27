from collections import deque
class Solution:
    def getFood(self, grid):
        rows = len(grid)
        columns = len(grid[0])
        start = next((row, column) for row in range(rows)
                     for column in range(columns) if grid[row][column] == '*')
        pending = deque([(start[0], start[1], 0)])
        seen = {start}
        while pending:
            row, column, distance = pending.popleft()
            if grid[row][column] == '#':
                return distance
            for next_row, next_column in ((row - 1, column), (row + 1, column),
                                          (row, column - 1), (row, column + 1)):
                in_bounds = (0 <= next_row < rows and 0 <= next_column < columns)
                next_cell = (next_row, next_column)
                if (in_bounds and grid[next_row][next_column] != 'X'
                        and next_cell not in seen):
                    seen.add(next_cell)
                    pending.append((next_row, next_column, distance + 1))
        return -1
