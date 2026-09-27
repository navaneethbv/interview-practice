from collections import deque


class Solution:
    def numIslands(self, grid):
        seen = set()
        islands = 0
        for row in range(len(grid)):
            for column in range(len(grid[0])):
                if grid[row][column] == '1' and (row, column) not in seen:
                    islands += 1
                    self._flood(grid, row, column, seen)
        return islands

    def _flood(self, grid, row, column, seen):
        seen.add((row, column))
        queue = deque([(row, column)])
        while queue:
            row, column = queue.popleft()
            neighbors = ((row - 1, column), (row + 1, column),
                         (row, column - 1), (row, column + 1))
            for next_row, next_column in neighbors:
                if self._is_unseen_land(grid, next_row, next_column, seen):
                    seen.add((next_row, next_column))
                    queue.append((next_row, next_column))

    def _is_unseen_land(self, grid, row, column, seen):
        return (0 <= row < len(grid) and 0 <= column < len(grid[0])
                and grid[row][column] == '1' and (row, column) not in seen)
