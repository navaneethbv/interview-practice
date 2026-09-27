from collections import deque
class Solution:
    def shortestDistance(self, grid):
        rows = len(grid)
        columns = len(grid[0])
        distances = [[0] * columns for _ in range(rows)]
        reaches = [[0] * columns for _ in range(rows)]
        buildings = 0
        for row in range(rows):
            for column in range(columns):
                if grid[row][column] == 1:
                    buildings += 1
                    self._spread(grid, row, column, distances, reaches)
        candidates = [distances[row][column]
                      for row in range(rows)
                      for column in range(columns)
                      if grid[row][column] == 0 and reaches[row][column] == buildings]
        return min(candidates, default=-1)

    def _spread(self, grid, row, column, distances, reaches):
        rows = len(grid)
        columns = len(grid[0])
        queue = deque([(row, column, 0)])
        seen = {(row, column)}
        while queue:
            current_row, current_column, distance = queue.popleft()
            for next_row, next_column in ((current_row - 1, current_column),
                                           (current_row + 1, current_column),
                                           (current_row, current_column - 1),
                                           (current_row, current_column + 1)):
                if (0 <= next_row < rows and 0 <= next_column < columns
                        and grid[next_row][next_column] == 0
                        and (next_row, next_column) not in seen):
                    seen.add((next_row, next_column))
                    distances[next_row][next_column] += distance + 1
                    reaches[next_row][next_column] += 1
                    queue.append((next_row, next_column, distance + 1))
