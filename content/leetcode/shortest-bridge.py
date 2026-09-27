from collections import deque


class Solution:
    def shortestBridge(self, grid):
        start = next((row, column) for row in range(len(grid))
                     for column in range(len(grid)) if grid[row][column] == 1)
        island = self._island(grid, start)
        seen = set(island)
        queue = deque((row, column, 0) for row, column in island)
        while queue:
            row, column, distance = queue.popleft()
            for next_row, next_column in self._neighbors(grid, row, column):
                if (next_row, next_column) in seen:
                    continue
                if grid[next_row][next_column] == 1:
                    return distance
                seen.add((next_row, next_column))
                queue.append((next_row, next_column, distance + 1))
        return -1

    @staticmethod
    def _neighbors(grid, row, column):
        for next_row, next_column in ((row - 1, column), (row + 1, column),
                                      (row, column - 1), (row, column + 1)):
            if 0 <= next_row < len(grid) and 0 <= next_column < len(grid):
                yield next_row, next_column

    def _island(self, grid, start):
        stack = [start]
        seen = {start}
        island = []
        while stack:
            row, column = stack.pop()
            island.append((row, column))
            for neighbor in self._neighbors(grid, row, column):
                if grid[neighbor[0]][neighbor[1]] == 1 and neighbor not in seen:
                    seen.add(neighbor)
                    stack.append(neighbor)
        return island
