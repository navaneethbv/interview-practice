from collections import deque


class Solution:
    def shortestPathBinaryMatrix(self, grid):
        size = len(grid)
        if grid[0][0] or grid[-1][-1]:
            return -1
        queue = deque([(0, 0, 1)])
        seen = {(0, 0)}
        while queue:
            row, column, distance = queue.popleft()
            if row == size - 1 and column == size - 1:
                return distance
            for neighbor in self._open_neighbors(grid, row, column):
                if neighbor not in seen:
                    seen.add(neighbor)
                    queue.append((*neighbor, distance + 1))
        return -1

    @staticmethod
    def _open_neighbors(grid, row, column):
        for next_row in range(max(0, row - 1), min(len(grid), row + 2)):
            for next_column in range(max(0, column - 1), min(len(grid), column + 2)):
                if grid[next_row][next_column] == 0:
                    yield next_row, next_column
